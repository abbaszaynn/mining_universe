"use client";

import { useState, type FormEvent } from "react";
import { getInvestorDeskCompanies, type InvestorDeskCompany } from "@/lib/investor-desk-data";
import { cn } from "@/lib/utils";
import { SquareButton } from "@/components/ui/SquareButton";

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
        "Form is not configured yet. Email us directly at info@gbmines.com."
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
        window.gtag?.("event", "generate_lead", {
          form_name: "investor_desk",
          company: selectedCompany || "unspecified",
        });
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
    "w-full rounded-lg border border-graphite-950/10 bg-white px-4 py-3 text-sm font-light text-graphite-950 placeholder:text-graphite-400 outline-none transition focus:border-copper-500/40 focus:ring-1 focus:ring-copper-500/10";
  const labelClass =
    "mb-2 block text-[11px] font-medium uppercase tracking-[0.14em] text-graphite-500";

  if (status === "success") {
    return (
      <div
        className={cn(
          "rounded-2xl border border-copper-500/20 bg-gradient-to-br from-copper-500/10 to-transparent p-10 text-center md:p-14",
          className
        )}
      >
        <p className="font-[family-name:var(--font-display)] text-2xl font-semibold text-graphite-950">
          Inquiry received
        </p>
        <p className="mx-auto mt-4 max-w-md text-sm font-light leading-relaxed text-graphite-600">
          Thank you for reaching out. Our investor desk will review your details
          and respond within one to two business days.
        </p>
        <SquareButton
          type="button"
          onClick={() => setStatus("idle")}
          tone="accent"
          className="mt-8"
        >
          Submit another inquiry
        </SquareButton>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "rounded-2xl border border-graphite-950/[0.05] bg-bone-50/50 p-6 shadow-sm sm:p-8 md:p-10",
        className
      )}
    >
      <div className="mb-8 border-b border-graphite-950/[0.06] pb-6">
        <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-graphite-950 md:text-2xl">
          Initial inquiry form
        </h2>
        <p className="mt-2 text-sm font-light leading-relaxed text-graphite-600">
          Tell us about your interest and we will connect you with the right
          operator, site, and documentation package.
        </p>
      </div>

      <div className="space-y-8">
        <fieldset className="space-y-4">
          <legend className="mb-2 font-mono text-[10px] uppercase tracking-[0.28em] text-copper-600/80">
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
          <legend className="mb-2 font-mono text-[10px] uppercase tracking-[0.28em] text-copper-600/80">
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
          <legend className="mb-2 font-mono text-[10px] uppercase tracking-[0.28em] text-copper-600/80">
            Field visit
          </legend>
          <p className="text-sm font-light text-graphite-600">
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
                className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-graphite-950/10 bg-white px-4 py-2.5 text-sm font-light text-graphite-700 transition has-[:checked]:border-copper-500/40 has-[:checked]:bg-copper-500/10 has-[:checked]:text-copper-700"
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
          <p className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-600">
            {errorMessage}
          </p>
        )}

        <SquareButton
          type="submit"
          disabled={loading}
          tone="accent"
          className="w-full sm:w-auto justify-center"
        >
          {loading ? "Sending inquiry…" : "Submit inquiry"}
        </SquareButton>
      </div>
    </form>
  );
}
