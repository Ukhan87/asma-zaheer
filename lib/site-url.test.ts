import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { resolveSiteUrl } from "./site-url";

describe("resolveSiteUrl", () => {
  test("uses a valid explicit site URL", () => {
    assert.equal(
      resolveSiteUrl("https://itsasmazaheer.com/", undefined),
      "https://itsasmazaheer.com",
    );
  });

  test("ignores an empty explicit URL and uses Vercel host", () => {
    assert.equal(
      resolveSiteUrl("", "asma-zaheer-ukhan87.vercel.app"),
      "https://asma-zaheer-ukhan87.vercel.app",
    );
  });

  test("ignores an invalid explicit URL", () => {
    assert.equal(
      resolveSiteUrl("not-a-url", "example.vercel.app"),
      "https://example.vercel.app",
    );
  });

  test("falls back to localhost when nothing is set", () => {
    assert.equal(resolveSiteUrl("", undefined), "http://localhost:3000");
    assert.equal(resolveSiteUrl(undefined, undefined), "http://localhost:3000");
  });
});
