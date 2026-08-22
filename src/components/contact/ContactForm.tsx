"use client";

import { useState, type FormEvent } from "react";
import { cn } from "@/lib/utils";

type ContactFormProps = {
  className?: string;
  companyName?: string;
  onSuccess?: () => void;
  variant?: "default" | "compact" | "modal";
};

export function ContactForm({
  className,
  companyName,
  onSuccess,
  variant = "default",
}: ContactFormProps) {
  const compact = variant === "compact";
  const modal = variant === "modal";
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
  const defaultSubject = companyName
    ? `Inquiry, ${companyName.split(" (")[0]}`
    : "General inquiry";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setStatus("idle");
    setErrorMessage("");

    if (!accessKey) {
      setStatus("error");
      setErrorMessage(
        "Contact form is not configured yet. Email us directly at info@gbmines.com."
      );
      setLoading(false);
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", accessKey);
    formData.append("from_name", "GOS Contact");
    if (companyName) {
      formData.append("company", companyName);
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(Object.fromEntries(formData)),
      });

      const result = await response.json();

      if (result.success) {
        setStatus("success");
        form.reset();
        onSuccess?.();
        window.gtag?.("event", "generate_lead", {
          form_name: "contact",
          company: companyName || "unspecified",
        });
      } else {
        throw new Error(result.message || "Unable to send message.");
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass = cn(
    "w-full rounded-md border border-white/10 bg-[#030712]/50 text-sm text-[#f0f4f7] placeholder:text-[#64748b] outline-none transition focus:border-[#d4af37]/45 focus:ring-1 focus:ring-[#d4af37]/20",
    modal || compact ? "px-3 py-2" : "px-4 py-3"
  );

  const labelClass = cn(
    "mb-1 block font-medium text-[#94a3b8]",
    modal || compact
      ? "text-[10px] uppercase tracking-[0.16em]"
      : "text-sm text-[#e2e8f0]"
  );

  if (status === "success") {
    return (
      <div
        className={cn(
          modal ? "py-6 text-center" : "rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 text-center",
          className
        )}
      >
        <p className="font-[family-name:var(--font-display)] text-lg font-semibold text-[#f0f4f7] sm:text-xl">
          Message sent
        </p>
        <p className="mt-2 text-sm text-[#94a3b8]">
          We&apos;ll reply to your email shortly.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm font-semibold text-[#d4af37] transition hover:text-[#f5e6a8]"
        >
          Send another
        </button>
      </div>
    );
  }

  if (modal) {
    return (
      <form onSubmit={handleSubmit} className={cn("space-y-3", className)}>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          <div>
            <label htmlFor="contact-name" className={labelClass}>
              Full name
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              placeholder="John Doe"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="contact-email" className={labelClass}>
              Email
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              placeholder="john@example.com"
              className={inputClass}
            />
          </div>
          <div className="col-span-2 md:col-span-1">
            <label htmlFor="contact-subject" className={labelClass}>
              Subject
            </label>
            <input
              id="contact-subject"
              name="subject"
              type="text"
              required
              defaultValue={defaultSubject}
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_8.5rem] sm:items-end">
          <div>
            <label htmlFor="contact-message" className={labelClass}>
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={2}
              placeholder="Your message…"
              className={cn(inputClass, "h-[3.25rem] resize-none leading-snug")}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="h-[3.25rem] w-full rounded-md bg-[#d4af37] text-sm font-semibold text-[#0f172a] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Sending…" : "Send"}
          </button>
        </div>

        {status === "error" && (
          <p className="text-sm text-red-300">{errorMessage}</p>
        )}
      </form>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(compact ? "space-y-3.5" : "space-y-5", className)}
    >
      <div className={cn(compact && "grid gap-3.5 sm:grid-cols-2")}>
        <div>
          <label htmlFor="contact-name" className={labelClass}>
            Full Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            placeholder="John Doe"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="contact-email" className={labelClass}>
            Email Address
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            placeholder="john@example.com"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-subject" className={labelClass}>
          Subject
        </label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          required
          defaultValue={defaultSubject}
          placeholder="Investment opportunity"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClass}>
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={compact ? 3 : 5}
          placeholder="Type your message here..."
          className={cn(
            inputClass,
            compact ? "min-h-[72px] resize-none" : "min-h-[120px] resize-y"
          )}
        />
      </div>

      {status === "error" && (
        <p className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2.5 text-sm text-red-300">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className={cn(
          "w-full rounded-lg bg-[#d4af37] text-sm font-semibold text-[#0f172a] shadow-[0_0_28px_rgba(212,175,55,0.2)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60",
          compact ? "py-2.5" : "py-3.5"
        )}
      >
        {loading ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
