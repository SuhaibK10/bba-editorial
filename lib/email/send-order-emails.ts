import { getResendClient, resendConfigured } from "@/lib/email/resend";
import { buildOrderConfirmationEmail } from "@/lib/email/templates/order-confirmation-customer";
import { buildOrderNotificationEmail } from "@/lib/email/templates/order-notification-internal";
import { site } from "@/data/site";
import type { OrderEmailData } from "@/lib/email/types";

// Sending domain — swap once bbappliances.in is verified in the Resend
// dashboard. Until then, Resend sandbox mode only delivers to the
// account owner's own verified address, regardless of `to`.
const FROM = `${site.name} <${site.ordersEmail}>`;

// Called only after payment is verified (never from order *creation*,
// which is still just "pending"). Failures here are caught by the
// caller — a Resend outage must never turn a paid order into a
// user-facing error, since the payment itself already succeeded.
export async function sendOrderConfirmationEmail(
  to: string,
  order: OrderEmailData
) {
  if (!resendConfigured()) return;
  const { subject, html } = buildOrderConfirmationEmail(order);
  await getResendClient().emails.send({ from: FROM, to, subject, html });
}

export async function sendOrderNotificationEmail(
  order: OrderEmailData,
  customerContact: { email: string; phone: string }
) {
  if (!resendConfigured()) return;
  const { subject, html } = buildOrderNotificationEmail(order, customerContact);
  await getResendClient().emails.send({
    from: FROM,
    to: site.ordersEmail,
    subject,
    html,
  });
}
