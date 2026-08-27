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

function row(label: string, value: string): string {
  return `<tr>
    <td style="padding:10px 0;border-bottom:1px solid #e8dfd0;width:160px;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#6b4f4f;">${escapeHtml(label)}</td>
    <td style="padding:10px 0;border-bottom:1px solid #e8dfd0;font-size:15px;color:#1a1a1a;">${escapeHtml(value).replace(/\n/g, "<br/>")}</td>
  </tr>`;
}

export function buildInquiryEmail(data: InquiryPayload): string {
  return `<!DOCTYPE html>
<html>
  <body style="margin:0;background:#faf9f6;padding:32px;font-family:Georgia,'Times New Roman',serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background:#ffffff;padding:32px;border:1px solid #c5a880;">
      <tr>
        <td>
          <p style="margin:0;font-size:11px;letter-spacing:0.28em;text-transform:uppercase;color:#6b4f4f;">New collaboration brief</p>
          <h1 style="margin:12px 0 24px;font-weight:400;font-size:28px;color:#1a1a1a;">${escapeHtml(data.brandName)}</h1>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            ${row("Brand website", data.website)}
            ${row("Contact", data.contactName)}
            ${row("Work email", data.email)}
            ${row("Budget", data.budget)}
            ${row("Deliverables", data.deliverables.join(", "))}
            ${row("Timeline", data.timeline || "Not specified")}
            ${row("Brief", data.brief)}
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
