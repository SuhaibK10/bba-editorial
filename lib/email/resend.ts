import { Resend } from "resend";

export function resendConfigured() {
  return Boolean(process.env.RESEND_API_KEY);
}

export function getResendClient() {
  return new Resend(process.env.RESEND_API_KEY!);
}
