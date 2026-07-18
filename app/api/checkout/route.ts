// ─────────────────────────────────────────────────────────────────────────
// Creates a Razorpay order + a 'pending' row in our own `orders` table.
//
// Supports both a logged-in session and guest checkout. If a session
// exists, the order is attached to user_id. If not, the request must
// include guestContact instead — enforced here AND by the DB check
// constraint (orders_user_or_guest_check) in supabase/schema.sql.
//
// CRITICAL: prices are NEVER trusted from the client. The client sends a
// product slug + quantity — this route looks up the real price from
// data/catalog.ts itself. Trusting a client-sent price would let anyone
// edit the request in devtools and pay whatever they want.
// ─────────────────────────────────────────────────────────────────────────

import { NextResponse, type NextRequest } from "next/server";
import { createClient, createServiceRoleClient, serviceRoleConfigured } from "@/lib/supabase/server";
import { getRazorpayClient, razorpayConfigured } from "@/lib/razorpay";
import { getCatalogItem } from "@/data/catalog";

const MAX_QUANTITY = 500;

interface CheckoutLineInput {
  slug: string;
  quantity: number;
}

interface CheckoutRequestBody {
  items: CheckoutLineInput[];
  shipping: {
    fullName: string;
    phone: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    pincode: string;
  };
  // Required only if there's no logged-in session. Ignored entirely if a
  // session exists — a logged-in user's contact info comes from their
  // account, not a client-supplied field that could otherwise be spoofed.
  guestContact?: {
    email: string;
    phone: string;
  };
}

export async function POST(request: NextRequest) {
  if (!razorpayConfigured() || !serviceRoleConfigured()) {
    return NextResponse.json(
      { error: "Checkout isn't configured yet. Missing Razorpay or Supabase service-role credentials." },
      { status: 503 }
    );
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const body: CheckoutRequestBody = await request.json();
  const { items, shipping, guestContact } = body;

  if (!items || items.length === 0) {
    return NextResponse.json({ error: "Cart is empty." }, { status: 400 });
  }

  if (!user && (!guestContact?.email || !guestContact?.phone)) {
    return NextResponse.json(
      { error: "Email and phone are required for guest checkout." },
      { status: 400 }
    );
  }

  const requiredShippingFields: (keyof CheckoutRequestBody["shipping"])[] = [
    "fullName", "phone", "addressLine1", "city", "state", "pincode",
  ];
  for (const field of requiredShippingFields) {
    if (!shipping?.[field]) {
      return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
    }
  }
  if (!/^\d{6}$/.test(shipping.pincode)) {
    return NextResponse.json({ error: "Pincode must be 6 digits." }, { status: 400 });
  }

  // ── Recalculate every line item server-side — the actual trust boundary ──
  const orderItems: {
    product_id: string;
    product_name: string;
    product_slug: string;
    image: string | null;
    price: number;
    quantity: number;
  }[] = [];

  let subtotal = 0;
  const outOfStock: string[] = [];

  for (const line of items) {
    const item = getCatalogItem(line.slug);
    if (!item) {
      return NextResponse.json({ error: `Product not found: ${line.slug}` }, { status: 400 });
    }

    if (!Number.isInteger(line.quantity) || line.quantity < 1 || line.quantity > MAX_QUANTITY) {
      return NextResponse.json(
        { error: `Invalid quantity for ${item.name}.` },
        { status: 400 }
      );
    }

    if (item.stock === "out-of-stock") {
      outOfStock.push(item.name);
      continue;
    }

    const lineTotal = item.price * line.quantity;
    subtotal += lineTotal;

    orderItems.push({
      product_id: item.sku,
      product_name: item.name,
      product_slug: item.slug,
      image: item.image ?? null,
      price: item.price,
      quantity: line.quantity,
    });
  }

  // All-or-nothing: reject the whole checkout if anything in the cart is
  // out of stock, rather than silently dropping a line the customer
  // thought they were buying.
  if (outOfStock.length > 0) {
    return NextResponse.json(
      { error: `Currently out of stock: ${outOfStock.join(", ")}` },
      { status: 409 }
    );
  }

  // Free shipping on every order right now.
  const shippingCost = 0;
  const total = subtotal + shippingCost;

  const orderPayload = {
    user_id: user?.id ?? null,
    guest_email: user ? null : guestContact!.email,
    guest_phone: user ? null : guestContact!.phone,
    full_name: shipping.fullName,
    phone: shipping.phone,
    address_line1: shipping.addressLine1,
    address_line2: shipping.addressLine2 ?? null,
    city: shipping.city,
    state: shipping.state,
    pincode: shipping.pincode,
    subtotal,
    shipping: shippingCost,
    total,
    status: "pending" as const,
  };

  const { data: orderRow, error: insertError } = await supabase
    .from("orders")
    .insert(orderPayload)
    .select()
    .single();

  if (insertError || !orderRow) {
    console.error("Failed to create order row:", insertError);
    return NextResponse.json({ error: "Could not create order. Please try again." }, { status: 500 });
  }

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItems.map((item) => ({ ...item, order_id: orderRow.id })));

  if (itemsError) {
    console.error("Failed to insert order items:", itemsError);
    const serviceClient = createServiceRoleClient();
    await serviceClient.from("orders").update({ status: "failed" }).eq("id", orderRow.id);
    return NextResponse.json({ error: "Could not create order. Please try again." }, { status: 500 });
  }

  try {
    const razorpay = getRazorpayClient();
    const razorpayOrder = await razorpay.orders.create({
      amount: total * 100, // paise
      currency: "INR",
      receipt: orderRow.id,
      notes: { orderId: orderRow.id, userId: user?.id ?? "guest" },
    });

    const serviceClient = createServiceRoleClient();
    await serviceClient
      .from("orders")
      .update({ razorpay_order_id: razorpayOrder.id })
      .eq("id", orderRow.id);

    return NextResponse.json({
      orderId: orderRow.id,
      razorpayOrderId: razorpayOrder.id,
      amount: total * 100,
      currency: "INR",
    });
  } catch (razorpayError) {
    console.error("Razorpay order creation failed:", razorpayError);
    const serviceClient = createServiceRoleClient();
    await serviceClient.from("orders").update({ status: "failed" }).eq("id", orderRow.id);
    return NextResponse.json({ error: "Payment gateway error. Please try again." }, { status: 502 });
  }
}
