import { formatPrice } from "@/lib/pricing";
import { site } from "@/data/site";
import type { OrderEmailData } from "@/lib/email/types";

const itemRow = (name: string, price: number, quantity: number) => `
  <tr>
    <td style="padding:6px 0;border-bottom:1px solid #E7E0D4;font-family:sans-serif;font-size:13px;">${name}</td>
    <td style="padding:6px 0;border-bottom:1px solid #E7E0D4;font-family:sans-serif;font-size:13px;text-align:center;">× ${quantity}</td>
    <td style="padding:6px 0;border-bottom:1px solid #E7E0D4;font-family:sans-serif;font-size:13px;text-align:right;">${formatPrice(price * quantity)}</td>
  </tr>`;

// Internal, ops-facing — recipient is site.ordersEmail, not the customer.
export function buildOrderNotificationEmail(
  order: OrderEmailData,
  customerContact: { email: string; phone: string }
) {
  const { shippingAddress: addr } = order;
  const subject = `New paid order #${order.orderId.slice(0, 8)} — ${formatPrice(order.total)}`;

  const html = `
  <div style="max-width:560px;margin:0 auto;padding:24px;font-family:sans-serif;">
    <h1 style="font-size:18px;margin:0 0 4px;">New order — ${formatPrice(order.total)}</h1>
    <p style="font-size:13px;color:#7D766B;margin:0 0 20px;">Order #${order.orderId.slice(0, 8)} · ${site.name}</p>

    <table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
      ${order.items.map((i) => itemRow(i.productName, i.price, i.quantity)).join("")}
    </table>

    <p style="font-size:13px;margin:0 0 4px;"><strong>Customer:</strong> ${addr.fullName}</p>
    <p style="font-size:13px;margin:0 0 4px;"><strong>Email:</strong> ${customerContact.email}</p>
    <p style="font-size:13px;margin:0 0 12px;"><strong>Phone:</strong> ${customerContact.phone}</p>

    <p style="font-size:13px;margin:0 0 4px;"><strong>Ship to:</strong></p>
    <p style="font-size:13px;color:#23201B;line-height:1.6;margin:0;">
      ${addr.addressLine1}${addr.addressLine2 ? `, ${addr.addressLine2}` : ""}<br/>
      ${addr.city}, ${addr.state} ${addr.pincode}<br/>
      ${addr.phone}
    </p>
  </div>`;

  return { subject, html };
}
