import { NextResponse } from "next/server";
import { buildInquiryTelegramMessage, parseInquiry } from "@/lib/inquiry";

const SEND_ERROR =
  "Could not send right now. Email asmazaheer.creates@gmail.com directly.";

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

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    return NextResponse.json({ ok: false, error: SEND_ERROR }, { status: 500 });
  }

  try {
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: buildInquiryTelegramMessage(parsed.data),
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
      },
    );
    const payload = (await telegramResponse.json()) as { ok?: boolean };
    if (!telegramResponse.ok || payload.ok !== true) {
      return NextResponse.json({ ok: false, error: SEND_ERROR }, { status: 500 });
    }
  } catch {
    return NextResponse.json({ ok: false, error: SEND_ERROR }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
