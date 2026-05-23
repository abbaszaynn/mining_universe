"use client";

import { useState, type FormEvent } from "react";
import { getInvestorDeskCompanies, type InvestorDeskCompany } from "@/lib/investor-desk-data";
import { cn } from "@/lib/utils";

type InvestorDeskFormProps = {
  companies?: InvestorDeskCompany[];
  className?: string;
};

export function InvestorDeskForm({
  companies: companiesProp,
  className,
}: InvestorDeskFormProps) {
  const companies = companiesProp ?? getInvestorDeskCompanies();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");

  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
  const minesForCompany =
    companies.find(
      (c) => c.name.split(" (")[0] === selectedCompany
    )?.mines ?? [];
  const allMines = companies.flatMap((c) => c.mines);
  const showAllMines =
    !selectedCompany ||
    selectedCompany === "Multiple operators" ||
    selectedCompany === "Not sure yet";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setStatus("idle");
    setErrorMessage("");

    if (!accessKey) {
      setStatus("error");
      setErrorMessage(
        "Form is not configured yet. Email us directly at abbaszayn08@gmail.com."
      );
      setLoading(false);
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", accessKey);
    formData.append("from_name", "GOS Investor Desk");
    formData.append("subject", "Investor desk inquiry");

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
        setSelectedCompany("");
      } else {
        throw new Error(result.message || "Unable to send inquiry.");
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

  const inputClass =
    "w-full rounded-lg border border-white/10 bg-[#030712]/40 px-4 py-3 text-sm font-light text-[#f0f4f7] placeholder:text-[#64748b] outline-none transition focus:border-[#d4af37]/45 focus:ring-1 focus:ring-[#d4af37]/15";
  const labelClass =
    "mb-2 block text-[11px] font-medium uppercase tracking-[0.14em] text-[#94a3b8]";

  if (status === "success") {
    return (
      <div
        className={cn(
          "rounded-2xl border border-[#d4af37]/20 bg-gradient-to-br from-[#d4af37]/[0.08] to-transparent p-10 text-center md:p-14",
          className
        )}
      >
        <p className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[#f0f4f7]">
          Inquiry received
        </p>
        <p className="mx-auto mt-4 max-w-md text-sm font-light leading-relaxed text-[#94a3b8]">
          Thank you for reaching out. Our investor desk will review your details
          and respond within one to two business days.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 text-sm font-semibold text-[#d4af37] transition hover:text-[#f5e6a8]"
        >
          Submit another inquiry
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-8 md:p-10",
        className
      )}
    >
      <div className="mb-8 border-b border-white/[0.06] pb-6">
        <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[#f0f4f7] md:text-2xl">
          Initial inquiry form
        </h2>
        <p className="mt-2 text-sm font-light leading-relaxed text-[#94a3b8]">
          Tell us about your interest and we will connect you with the right
          operator, site, and documentation package.
        </p>
      </div>

      <div className="space-y-8">
        <fieldset className="space-y-4">
          <legend className="mb-2 font-mono text-[10px] uppercase tracking-[0.28em] text-[#d4af37]/80">
            Your details
          </legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="inv-name" className={labelClass}>
                Full name
              </label>
              <input
                id="inv-name"
                name="name"
                type="text"
                required
                placeholder="Your name"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="inv-entity" className={labelClass}>
                Company or entity
              </label>
              <input
                id="inv-entity"
                name="entity"
                type="text"
                required
                placeholder="Fund, firm, or individual entity"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="inv-country" className={labelClass}>
                Country
              </label>
              <input
                id="inv-country"
                name="country"
                type="text"
                required
                placeholder="Where are you based?"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="inv-email" className={labelClass}>
                Email (Gmail preferred)
              </label>
              <input
                id="inv-email"
                name="email"
                type="email"
                required
                placeholder="you@company.com"
                className={inputClass}
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="inv-phone" className={labelClass}>
                Phone / WhatsApp
              </label>
              <input
                id="inv-phone"
                name="phone"
                type="tel"
                required
                placeholder="+1 000 000 0000"
                className={inputClass}
              />
            </div>
          </div>
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="mb-2 font-mono text-[10px] uppercase tracking-[0.28em] text-[#d4af37]/80">
            Investment interest
          </legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="inv-company" className={labelClass}>
                Interested company
              </label>
              <select
                id="inv-company"
                name="interested_company"
                required
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(e.target.value)}
                className={cn(inputClass, "cursor-pointer")}
              >
                <option value="" disabled>
                  Select an operator
                </option>
                {companies.map((company) => (
                  <option key={company.id} value={company.name.split(" (")[0]}>
                    {company.name.split(" (")[0]}
                  </option>
                ))}
                <option value="Multiple operators">Multiple operators</option>
                <option value="Not sure yet">Not sure yet</option>
              </select>
            </div>
            <div>
              <label htmlFor="inv-mines" className={labelClass}>
                Interested mine or site
              </label>
              <select
                id="inv-mines"
                name="interested_mines"
                required
                className={cn(inputClass, "cursor-pointer")}
                defaultValue=""
              >
                <option value="" disabled>
                  Select a site
                </option>
                {(showAllMines ? allMines : minesForCompany).map((mine) => (
                  <option key={mine} value={mine}>
                    {mine}
                  </option>
                ))}
                <option value="multiple sites">Multiple sites</option>
                <option value="general portfolio">General portfolio review</option>
              </select>
            </div>
          </div>
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="mb-2 font-mono text-[10px] uppercase tracking-[0.28em] text-[#d4af37]/80">
            Field visit
          </legend>
          <p className="text-sm font-light text-[#94a3b8]">
            We arrange guided site visits across Gilgit Baltistan with full safety
            and government clearance support.
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              { value: "yes", label: "Yes, I want a field visit" },
              { value: "maybe", label: "Maybe, tell me more" },
              { value: "no", label: "Not at this stage" },
            ].map((option) => (
              <label
                key={option.value}
                className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-[#030712]/30 px-4 py-2.5 text-sm font-light text-[#cbd5e1] transition has-[:checked]:border-[#d4af37]/40 has-[:checked]:bg-[#d4af37]/10 has-[:checked]:text-[#f0f4f7]"
              >
                <input
                  type="radio"
                  name="field_visit"
                  value={option.value}
                  required
                  className="sr-only"
                />
                {option.label}
              </label>
            ))}
          </div>
        </fieldset>

        <div>
          <label htmlFor="inv-details" className={labelClass}>
            Additional details and queries
          </label>
          <textarea
            id="inv-details"
            name="message"
            required
            rows={5}
            placeholder="Share your investment timeline, capital range, due diligence needs, or any specific questions about geology, permits, or logistics."
            className={cn(inputClass, "min-h-[120px] resize-y leading-relaxed")}
          />
        </div>

        {status === "error" && (
          <p className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {errorMessage}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-[#d4af37] py-3.5 text-sm font-semibold text-[#0f172a] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-12"
        >
          {loading ? "Sending inquiry…" : "Submit inquiry"}
        </button>
      </div>
    </form>
  );
}
