import { formatPrice } from "@/lib/pricing";
import { site } from "@/data/site";
import type { OrderEmailData } from "@/lib/email/types";

const itemRow = (name: string, price: number, quantity: number) => `
  <tr>
    <td style="padding:10px 0;border-bottom:1px solid #E7E0D4;font-family:sans-serif;font-size:14px;color:#23201B;">
      ${name} <span style="color:#7D766B;">× ${quantity}</span>
    </td>
    <td style="padding:10px 0;border-bottom:1px solid #E7E0D4;font-family:sans-serif;font-size:14px;color:#23201B;text-align:right;white-space:nowrap;">
      ${formatPrice(price * quantity)}
    </td>
  </tr>`;

export function buildOrderConfirmationEmail(order: OrderEmailData) {
  const { shippingAddress: addr } = order;
  const subject = `Order confirmed — ${site.name} (#${order.orderId.slice(0, 8)})`;

  const html = `
  <div style="max-width:560px;margin:0 auto;padding:32px 24px;font-family:sans-serif;background:#FBF9F5;">
    <p style="font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#1D5C3F;font-weight:700;margin:0 0 8px;">
      ${site.name}
    </p>
    <h1 style="font-size:22px;color:#23201B;margin:0 0 16px;">Thanks — your order is confirmed.</h1>
    <p style="font-size:14px;color:#7D766B;line-height:1.6;margin:0 0 24px;">
      Order #${order.orderId.slice(0, 8)}. We'll be in touch with despatch details shortly.
    </p>

    <table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
      ${order.items.map((i) => itemRow(i.productName, i.price, i.quantity)).join("")}
    </table>

    <table style="width:100%;border-collapse:collapse;font-family:sans-serif;font-size:14px;color:#23201B;">
      <tr>
        <td style="padding:4px 0;color:#7D766B;">Subtotal</td>
        <td style="padding:4px 0;text-align:right;">${formatPrice(order.subtotal)}</td>
      </tr>
      <tr>
        <td style="padding:4px 0;color:#7D766B;">Shipping</td>
        <td style="padding:4px 0;text-align:right;">${order.shipping === 0 ? "Free" : formatPrice(order.shipping)}</td>
      </tr>
      <tr>
        <td style="padding:8px 0;font-weight:700;">Total</td>
        <td style="padding:8px 0;text-align:right;font-weight:700;">${formatPrice(order.total)}</td>
      </tr>
    </table>

    <h2 style="font-size:13px;text-transform:uppercase;letter-spacing:0.06em;color:#23201B;margin:24px 0 8px;">
      Delivery address
    </h2>
    <p style="font-size:14px;color:#7D766B;line-height:1.6;margin:0;">
      ${addr.fullName}<br/>
      ${addr.addressLine1}${addr.addressLine2 ? `, ${addr.addressLine2}` : ""}<br/>
      ${addr.city}, ${addr.state} ${addr.pincode}<br/>
      ${addr.phone}
    </p>

    <p style="font-size:12px;color:#A8A093;margin-top:32px;">
      Questions? Reply to this email or write to ${site.email}.
    </p>
  </div>`;

  return { subject, html };
}
