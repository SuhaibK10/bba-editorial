// ─────────────────────────────────────────────────────────────────────────
// Razorpay's checkout modal calls back into the browser on success, but
// that callback is NOT proof of payment — it's just the browser reporting
// "the modal closed successfully." The actual proof is an HMAC signature
// Razorpay computes using the key secret. We recompute it here, server
// side, and only mark the order 'paid' if it matches exactly.
//
// Uses the service-role client deliberately: marking an order 'paid' is
// something only verified server logic should be able to do, which is
// why there's no RLS UPDATE policy for regular users on `orders` at all.
// ─────────────────────────────────────────────────────────────────────────

import { NextResponse, type NextRequest } from "next/server";
import crypto from "crypto";
import { createClient, createServiceRoleClient, serviceRoleConfigured } from "@/lib/supabase/server";
import { razorpayConfigured } from "@/lib/razorpay";
import { sendOrderConfirmationEmail, sendOrderNotificationEmail } from "@/lib/email/send-order-emails";
import type { OrderEmailData } from "@/lib/email/types";

interface VerifyRequestBody {
  orderId: string; // our internal order UUID
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export async function POST(request: NextRequest) {
  if (!razorpayConfigured() || !serviceRoleConfigured()) {
    return NextResponse.json({ error: "Checkout isn't configured yet." }, { status: 503 });
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const body: VerifyRequestBody = await request.json();
  const { orderId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

  if (!orderId || !razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return NextResponse.json({ error: "Missing verification fields." }, { status: 400 });
  }

  const serviceClient = createServiceRoleClient();

  // Idempotency guard: a double-submit or page refresh after a successful
  // verify should return success again, not re-verify or re-send email.
  const { data: existing } = await serviceClient
    .from("orders")
    .select("status")
    .eq("id", orderId)
    .single();

  if (existing?.status === "paid") {
    return NextResponse.json({ success: true, orderId });
  }

  // ── Recompute the expected signature ──────────────────────────────────
  // Razorpay's documented formula: HMAC-SHA256 of "{order_id}|{payment_id}",
  // signed with the key secret. A mismatch means the payment claim isn't
  // trustworthy — a tampered request or a payment that never completed.
  // This check is the entire security model here.
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  const expected = Buffer.from(expectedSignature, "hex");
  const actual = Buffer.from(razorpay_signature, "hex");
  const signatureValid =
    expected.length === actual.length && crypto.timingSafeEqual(expected, actual);

  if (!signatureValid) {
    await serviceClient.from("orders").update({ status: "failed" }).eq("id", orderId);
    return NextResponse.json({ error: "Payment verification failed." }, { status: 400 });
  }

  const { data: order, error: updateError } = await serviceClient
    .from("orders")
    .update({
      status: "paid",
      razorpay_payment_id,
      updated_at: new Date().toISOString(),
    })
    .eq("id", orderId)
    .select()
    .single();

  if (updateError || !order) {
    console.error("Failed to mark order as paid:", updateError);
    return NextResponse.json(
      { error: "Payment succeeded but order update failed. Contact support." },
      { status: 500 }
    );
  }

  // ── Send order emails ──────────────────────────────────────────────────
  // Best-effort and awaited (so they finish before this function exits),
  // but a failure here never blocks the success response — the payment is
  // already verified and saved either way.
  const customerEmail: string | null = user?.email ?? order.guest_email;
  const customerPhone: string = order.phone;

  if (customerEmail) {
    const { data: orderItems } = await serviceClient
      .from("order_items")
      .select("product_name, price, quantity")
      .eq("order_id", orderId);

    const emailData: OrderEmailData = {
      orderId: order.id,
      items: (orderItems ?? []).map((i) => ({
        productName: i.product_name,
        price: i.price,
        quantity: i.quantity,
      })),
      subtotal: order.subtotal,
      shipping: order.shipping,
      total: order.total,
      shippingAddress: {
        fullName: order.full_name,
        phone: order.phone,
        addressLine1: order.address_line1,
        addressLine2: order.address_line2,
        city: order.city,
        state: order.state,
        pincode: order.pincode,
      },
    };

    await Promise.all([
      sendOrderConfirmationEmail(customerEmail, emailData).catch((err) =>
        console.error("Order confirmation email failed:", err)
      ),
      sendOrderNotificationEmail(emailData, {
        email: customerEmail,
        phone: customerPhone,
      }).catch((err) => console.error("Order notification email failed:", err)),
    ]);
  }

  return NextResponse.json({ success: true, orderId: order.id, total: order.total });
}
