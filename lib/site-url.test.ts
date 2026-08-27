import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { PUBLIC_SITE_URL, resolveSiteUrl } from "./site-url";

describe("resolveSiteUrl", () => {
  test("uses a valid explicit site URL", () => {
    assert.equal(
      resolveSiteUrl("https://itsasmazaheer.com/", undefined),
      "https://itsasmazaheer.com",
    );
  });

  test("uses the public Vercel site when the explicit URL is empty", () => {
    assert.equal(
      resolveSiteUrl("", "asma-zaheer-abc.vercel.app"),
      PUBLIC_SITE_URL,
    );
  });

  test("ignores an invalid explicit URL and uses the public site on Vercel", () => {
    assert.equal(
      resolveSiteUrl("not-a-url", "example.vercel.app"),
      PUBLIC_SITE_URL,
    );
  });

  test("falls back to localhost when nothing is set", () => {
    assert.equal(resolveSiteUrl("", undefined), "http://localhost:3000");
    assert.equal(resolveSiteUrl(undefined, undefined), "http://localhost:3000");
  });
});
