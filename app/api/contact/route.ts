import { NextResponse } from "next/server";
import { Resend } from "resend";
import { buildInquiryEmail, parseInquiry } from "@/lib/inquiry";

const CONTACT_TO = process.env.CONTACT_TO ?? "asmazaheer08@gmail.com";
const RESEND_FROM =
  process.env.RESEND_FROM ?? "Asma Zaheer <beth.t@example.com>";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Send a valid inquiry." },
      { status: 400 },
    );
  }

  const parsed = parseInquiry(body);
  if (!parsed.ok) {
    return NextResponse.json({ ok: false, error: parsed.error }, { status: 400 });
  }
  if (parsed.spam) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Could not send right now. Email asmazaheer08@gmail.com directly.",
      },
      { status: 500 },
    );
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: RESEND_FROM,
    to: CONTACT_TO,
    replyTo: parsed.data.email,
    subject: `Brand inquiry from ${parsed.data.brandName}`,
    html: buildInquiryEmail(parsed.data),
  });

  if (error) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Could not send right now. Email asmazaheer08@gmail.com directly.",
      },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
