import { site } from "@/data/site";

export type B2BEnquiryFields = {
  company: string;
  contactName: string;
  phone: string;
  email: string;
  requirement: string;
  volume: string;
  message: string;
};

export type B2BEnquiryErrors = Partial<
  Pick<B2BEnquiryFields, "company" | "contactName" | "phone" | "requirement">
>;

export function validateB2BEnquiry(form: B2BEnquiryFields): B2BEnquiryErrors {
  const errors: B2BEnquiryErrors = {};
  if (!form.company.trim()) errors.company = "Please enter your company name.";
  if (!form.contactName.trim()) errors.contactName = "Please enter a contact name.";
  if (!/^[+\d][\d\s-]{7,15}$/.test(form.phone.trim()))
    errors.phone = "Please enter a valid phone number.";
  if (!form.requirement.trim()) errors.requirement = "Please tell us what you need.";
  return errors;
}

export function composeB2BWhatsAppMessage(form: B2BEnquiryFields): string {
  const lines: (string | null)[] = [
    `Hi ${site.name}, I'd like to submit a B2B enquiry.`,
    "",
    `Company: ${form.company.trim()}`,
    `Contact: ${form.contactName.trim()}`,
    `Phone: ${form.phone.trim()}`,
    form.email.trim() ? `Email: ${form.email.trim()}` : null,
    "",
    `Requirement: ${form.requirement.trim()}`,
    form.volume.trim() ? `Estimated volume: ${form.volume.trim()}` : null,
    form.message.trim() ? "" : null,
    form.message.trim() ? `Details: ${form.message.trim()}` : null,
  ];

  return lines.filter((line): line is string => line !== null).join("\n");
}
