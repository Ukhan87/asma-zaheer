"use client";

import { useState, type FormEvent } from "react";
import { Reveal } from "@/components/Reveal";
import {
  BUDGET_RANGES,
  DELIVERABLE_OPTIONS,
  type BudgetRange,
  type Deliverable,
} from "@/lib/types";

const empty = {
  brandName: "",
  website: "",
  contactName: "",
  email: "",
  budget: BUDGET_RANGES[0] as BudgetRange,
  deliverables: [] as Deliverable[],
  timeline: "",
  brief: "",
  honeypot: "",
};

export function InquiryForm() {
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  function toggleDeliverable(option: Deliverable) {
    setForm((current) => {
      const has = current.deliverables.includes(option);
      return {
        ...current,
        deliverables: has
          ? current.deliverables.filter((item) => item !== option)
          : [...current.deliverables, option],
      };
    });
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (form.deliverables.length === 0) {
      setStatus("error");
      setMessage("Choose at least one deliverable.");
      return;
    }
    setStatus("sending");
    setMessage("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const payload = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !payload.ok) {
        setStatus("error");
        setMessage(
          payload.error ??
            "Could not send right now. Email asmazaheer08@gmail.com directly.",
        );
        return;
      }
      setStatus("sent");
      setForm(empty);
    } catch {
      setStatus("error");
      setMessage(
        "Could not send right now. Email asmazaheer08@gmail.com directly.",
      );
    }
  }

  if (status === "sent") {
    return (
      <section id="inquire" className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <p className="text-[11px] uppercase tracking-[0.28em] text-blush">Inquire</p>
        <h2 className="mt-3 font-display text-4xl">Brief received</h2>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-onyx/75">
          Thank you. Asma will reply to the work email you shared, usually within
          two business days.
        </p>
      </section>
    );
  }

  const field =
    "w-full border border-champagne/50 bg-porcelain px-4 py-3 text-sm text-onyx outline-none transition-colors placeholder:text-onyx/35 focus:border-onyx";

  return (
    <section id="inquire" className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
      <Reveal>
        <p className="text-[11px] uppercase tracking-[0.28em] text-blush">Inquire</p>
        <h2 className="mt-3 font-display text-4xl md:text-5xl">Send a brief</h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-onyx/70">
          Tell Asma the product, the usage, and the timeline. She replies from{" "}
          asmazaheer08@gmail.com.
        </p>
      </Reveal>
      <form onSubmit={onSubmit} className="relative mt-12 grid gap-5 md:grid-cols-2">
        <label className="block text-[11px] uppercase tracking-[0.16em] text-onyx/60">
          Brand name
          <input
            required
            className={`${field} mt-2`}
            value={form.brandName}
            onChange={(event) =>
              setForm((current) => ({ ...current, brandName: event.target.value }))
            }
          />
        </label>
        <label className="block text-[11px] uppercase tracking-[0.16em] text-onyx/60">
          Brand website
          <input
            required
            type="url"
            placeholder="https://"
            className={`${field} mt-2`}
            value={form.website}
            onChange={(event) =>
              setForm((current) => ({ ...current, website: event.target.value }))
            }
          />
        </label>
        <label className="block text-[11px] uppercase tracking-[0.16em] text-onyx/60">
          Contact name
          <input
            required
            className={`${field} mt-2`}
            value={form.contactName}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                contactName: event.target.value,
              }))
            }
          />
        </label>
        <label className="block text-[11px] uppercase tracking-[0.16em] text-onyx/60">
          Work email
          <input
            required
            type="email"
            className={`${field} mt-2`}
            value={form.email}
            onChange={(event) =>
              setForm((current) => ({ ...current, email: event.target.value }))
            }
          />
        </label>
        <label className="block text-[11px] uppercase tracking-[0.16em] text-onyx/60 md:col-span-2">
          Campaign budget
          <select
            required
            className={`${field} mt-2`}
            value={form.budget}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                budget: event.target.value as BudgetRange,
              }))
            }
          >
            {BUDGET_RANGES.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </label>
        <fieldset className="md:col-span-2">
          <legend className="text-[11px] uppercase tracking-[0.16em] text-onyx/60">
            Deliverable type
          </legend>
          <div className="mt-3 flex flex-wrap gap-3">
            {DELIVERABLE_OPTIONS.map((option) => {
              const checked = form.deliverables.includes(option);
              return (
                <label
                  key={option}
                  className={`cursor-pointer border px-3 py-2 text-sm ${
                    checked
                      ? "border-onyx bg-onyx text-porcelain"
                      : "border-champagne/60 bg-porcelain"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={checked}
                    onChange={() => toggleDeliverable(option)}
                  />
                  {option}
                </label>
              );
            })}
          </div>
        </fieldset>
        <label className="block text-[11px] uppercase tracking-[0.16em] text-onyx/60 md:col-span-2">
          Timeline
          <input
            className={`${field} mt-2`}
            placeholder="e.g. Shoot by 12 Sep, live 20 Sep"
            value={form.timeline}
            onChange={(event) =>
              setForm((current) => ({ ...current, timeline: event.target.value }))
            }
          />
        </label>
        <label className="block text-[11px] uppercase tracking-[0.16em] text-onyx/60 md:col-span-2">
          Brief details
          <textarea
            required
            rows={5}
            className={`${field} mt-2 resize-y`}
            value={form.brief}
            onChange={(event) =>
              setForm((current) => ({ ...current, brief: event.target.value }))
            }
          />
        </label>
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label>
            Company fax
            <input
              tabIndex={-1}
              autoComplete="off"
              value={form.honeypot}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  honeypot: event.target.value,
                }))
              }
            />
          </label>
        </div>
        {status === "error" ? (
          <p className="md:col-span-2 text-sm text-blush" role="alert">
            {message}
          </p>
        ) : null}
        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={status === "sending"}
            className="bg-onyx px-8 py-3 text-xs uppercase tracking-[0.2em] text-porcelain disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne"
          >
            {status === "sending" ? "Sending…" : "Send brief"}
          </button>
        </div>
      </form>
    </section>
  );
}
