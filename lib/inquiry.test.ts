import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { buildInquiryTelegramMessage, parseInquiry } from "./inquiry";
import type { InquiryPayload } from "./types";

const sample: InquiryPayload = {
  brandName: "Acme Beauty",
  website: "https://acme.example",
  contactName: "Jane Doe",
  email: "jane@acme.example",
  budget: "$1,000–$2,500",
  deliverables: ["UGC Ad", "Organic Post"],
  timeline: "Shoot by 12 Sep",
  brief: "Need a serum demo this month.",
  honeypot: "",
};

describe("parseInquiry honeypot", () => {
  test("filled honeypot is treated as spam without echoing it", () => {
    const result = parseInquiry({
      brandName: "Bot Co",
      website: "https://bot.example",
      contactName: "Bot",
      email: "bot@bot.example",
      budget: "$500–$1,000",
      deliverables: ["UGC Ad"],
      timeline: "",
      brief: "spam",
      honeypot: "http://spam",
    });
    assert.equal(result.ok, true);
    if (result.ok) {
      assert.equal(result.spam, true);
    }
  });
});

describe("buildInquiryTelegramMessage", () => {
  test("formats a brand inquiry in Telegram HTML", () => {
    const text = buildInquiryTelegramMessage(sample);
    assert.match(text, /📩 <b>New Brand Collab Inquiry<\/b>/);
    assert.match(text, /<b>Brand:<\/b> Acme Beauty \(https:\/\/acme\.example\)/);
    assert.match(
      text,
      /<b>Contact:<\/b> Jane Doe \(jane@acme\.example\)/,
    );
    assert.match(text, /<b>Budget Tier:<\/b> \$1,000–\$2,500/);
    assert.match(text, /<b>Deliverables:<\/b> UGC Ad, Organic Post/);
    assert.match(text, /<b>Timeline:<\/b> Shoot by 12 Sep/);
    assert.match(text, /<b>Brief:<\/b> Need a serum demo this month\./);
  });

  test("escapes HTML in user-provided fields", () => {
    const text = buildInquiryTelegramMessage({
      ...sample,
      brandName: "A <script>alert(1)</script>",
      brief: "Hello <b>world</b> & friends",
    });
    assert.equal(text.includes("<script>"), false);
    assert.match(text, /A &lt;script&gt;alert\(1\)&lt;\/script&gt;/);
    assert.match(text, /Hello &lt;b&gt;world&lt;\/b&gt; &amp; friends/);
  });

  test("uses a fallback when timeline is empty", () => {
    const text = buildInquiryTelegramMessage({ ...sample, timeline: "" });
    assert.match(text, /<b>Timeline:<\/b> Not specified/);
  });
});
