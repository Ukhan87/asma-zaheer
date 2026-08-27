import {
  BUDGET_RANGES,
  DELIVERABLE_OPTIONS,
  type BudgetRange,
  type Deliverable,
  type InquiryPayload,
} from "@/lib/types";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isBudget(value: unknown): value is BudgetRange {
  return (
    typeof value === "string" &&
    (BUDGET_RANGES as readonly string[]).includes(value)
  );
}

function isDeliverable(value: unknown): value is Deliverable {
  return (
    typeof value === "string" &&
    (DELIVERABLE_OPTIONS as readonly string[]).includes(value)
  );
}

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function isUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function parseInquiry(
  input: unknown,
):
  | { ok: true; spam: true }
  | { ok: true; spam: false; data: InquiryPayload }
  | { ok: false; error: string } {
  if (!input || typeof input !== "object") {
    return { ok: false, error: "Send a valid inquiry." };
  }

  const body = input as Record<string, unknown>;
  const honeypot = asString(body.honeypot);
  if (honeypot !== "") {
    return { ok: true, spam: true };
  }

  const brandName = asString(body.brandName);
  const website = asString(body.website);
  const contactName = asString(body.contactName);
  const email = asString(body.email).toLowerCase();
  const timeline = asString(body.timeline);
  const brief = asString(body.brief);
  const rawDeliverables = Array.isArray(body.deliverables)
    ? body.deliverables
    : [];
  const deliverables = rawDeliverables.filter(isDeliverable);

  if (!brandName || !contactName || !brief) {
    return { ok: false, error: "Check the highlighted fields and try again." };
  }
  if (!isUrl(website)) {
    return { ok: false, error: "Use a full website URL, including https://" };
  }
  if (!EMAIL_RE.test(email)) {
    return { ok: false, error: "Use a valid work email." };
  }
  if (!isBudget(body.budget)) {
    return { ok: false, error: "Choose a campaign budget range." };
  }
  if (deliverables.length === 0) {
    return { ok: false, error: "Choose at least one deliverable." };
  }

  return {
    ok: true,
    spam: false,
    data: {
      brandName,
      website,
      contactName,
      email,
      budget: body.budget,
      deliverables,
      timeline,
      brief,
      honeypot: "",
    },
  };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function buildInquiryTelegramMessage(data: InquiryPayload): string {
  const timeline = data.timeline || "Not specified";
  return [
    "📩 <b>New Brand Collab Inquiry</b>",
    "",
    `<b>Brand:</b> ${escapeHtml(data.brandName)} (${escapeHtml(data.website)})`,
    `<b>Contact:</b> ${escapeHtml(data.contactName)} (${escapeHtml(data.email)})`,
    `<b>Budget Tier:</b> ${escapeHtml(data.budget)}`,
    `<b>Deliverables:</b> ${escapeHtml(data.deliverables.join(", "))}`,
    `<b>Timeline:</b> ${escapeHtml(timeline)}`,
    `<b>Brief:</b> ${escapeHtml(data.brief)}`,
  ].join("\n");
}
