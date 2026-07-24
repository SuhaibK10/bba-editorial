"use client";

import { useState } from "react";
import WhatsAppIcon from "@/components/shared/WhatsAppIcon";
import { whatsappUrl, emailHref, site } from "@/data/site";
import {
  validateB2BEnquiry,
  composeB2BWhatsAppMessage,
  type B2BEnquiryFields,
  type B2BEnquiryErrors,
} from "@/lib/b2b-enquiry";

const inputClass =
  "w-full rounded-lg border border-border bg-white px-4 py-3 font-body text-sm text-text-primary " +
  "placeholder:text-text-faint focus:border-accent focus:outline-none transition-colors duration-200";

export default function B2BEnquiryForm() {
  const [form, setForm] = useState<B2BEnquiryFields>({
    company: "",
    contactName: "",
    phone: "",
    email: "",
    requirement: "",
    volume: "",
    message: "",
  });
  const [errors, setErrors] = useState<B2BEnquiryErrors>({});
  const [sent, setSent] = useState(false);

  const set = (field: keyof B2BEnquiryFields) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [field]: e.target.value }));
      setErrors((err) => ({ ...err, [field]: undefined }));
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validateB2BEnquiry(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    window.open(whatsappUrl(composeB2BWhatsAppMessage(form)), "_blank", "noopener,noreferrer");
    setSent(true);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5 max-w-xl">

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="b2b-company" className="block font-body text-sm font-medium text-text-primary mb-1.5">
            Company name *
          </label>
          <input
            id="b2b-company"
            type="text"
            autoComplete="organization"
            value={form.company}
            onChange={set("company")}
            className={inputClass}
            placeholder="Your company"
            aria-invalid={!!errors.company}
          />
          {errors.company && (
            <p role="alert" className="mt-1.5 font-body text-xs text-red-600">{errors.company}</p>
          )}
        </div>

        <div>
          <label htmlFor="b2b-contact" className="block font-body text-sm font-medium text-text-primary mb-1.5">
            Contact person *
          </label>
          <input
            id="b2b-contact"
            type="text"
            autoComplete="name"
            value={form.contactName}
            onChange={set("contactName")}
            className={inputClass}
            placeholder="Full name"
            aria-invalid={!!errors.contactName}
          />
          {errors.contactName && (
            <p role="alert" className="mt-1.5 font-body text-xs text-red-600">{errors.contactName}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="b2b-phone" className="block font-body text-sm font-medium text-text-primary mb-1.5">
            Phone / WhatsApp *
          </label>
          <input
            id="b2b-phone"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={set("phone")}
            className={inputClass}
            placeholder="+91 98XXX XXXXX"
            aria-invalid={!!errors.phone}
          />
          {errors.phone && (
            <p role="alert" className="mt-1.5 font-body text-xs text-red-600">{errors.phone}</p>
          )}
        </div>

        <div>
          <label htmlFor="b2b-email" className="block font-body text-sm font-medium text-text-primary mb-1.5">
            Email
          </label>
          <input
            id="b2b-email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={set("email")}
            className={inputClass}
            placeholder="you@company.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="b2b-requirement" className="block font-body text-sm font-medium text-text-primary mb-1.5">
          What do you need? *
        </label>
        <input
          id="b2b-requirement"
          type="text"
          value={form.requirement}
          onChange={set("requirement")}
          className={inputClass}
          placeholder="e.g. Acrylic display stands for 40 retail outlets"
          aria-invalid={!!errors.requirement}
        />
        {errors.requirement && (
          <p role="alert" className="mt-1.5 font-body text-xs text-red-600">{errors.requirement}</p>
        )}
      </div>

      <div>
        <label htmlFor="b2b-volume" className="block font-body text-sm font-medium text-text-primary mb-1.5">
          Estimated volume
        </label>
        <input
          id="b2b-volume"
          type="text"
          value={form.volume}
          onChange={set("volume")}
          className={inputClass}
          placeholder="e.g. 500 units, recurring monthly"
        />
      </div>

      <div>
        <label htmlFor="b2b-message" className="block font-body text-sm font-medium text-text-primary mb-1.5">
          Anything else we should know?
        </label>
        <textarea
          id="b2b-message"
          rows={3}
          value={form.message}
          onChange={set("message")}
          className={inputClass}
          placeholder="Timeline, delivery locations, branding needs…"
        />
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
        <button type="submit" className="btn-primary">
          <WhatsAppIcon size={15} />
          Send Enquiry via WhatsApp
        </button>
        <p className="font-body text-xs text-text-faint">
          Opens WhatsApp with your enquiry pre-filled. Prefer email?{" "}
          <a href={emailHref} className="text-accent hover:text-accent-hover underline underline-offset-2">
            {site.email}
          </a>
        </p>
      </div>

      {sent && (
        <p role="status" className="font-body text-sm text-accent">
          WhatsApp opened in a new tab. Send the message to complete your enquiry.
        </p>
      )}
    </form>
  );
}
