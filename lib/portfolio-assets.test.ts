import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, test } from "node:test";

type Portfolio = {
  videos: { id: string; src: string; poster: string }[];
};

const root = join(import.meta.dirname, "..");

describe("portfolio assets", () => {
  const data = JSON.parse(
    readFileSync(join(root, "data/portfolio.json"), "utf8"),
  ) as Portfolio;

  test("every video src exists in public/", () => {
    for (const item of data.videos) {
      const path = join(root, "public", item.src.replace(/^\//, ""));
      assert.equal(existsSync(path), true, `missing video for ${item.id}: ${path}`);
    }
  });

  test("every poster exists in public/", () => {
    for (const item of data.videos) {
      const path = join(root, "public", item.poster.replace(/^\//, ""));
      assert.equal(existsSync(path), true, `missing poster for ${item.id}: ${path}`);
    }
  });

  test("hero portrait file exists and is referenced", () => {
    const portrait = join(root, "public/images/hero-portrait.jpg");
    assert.equal(existsSync(portrait), true, `missing hero portrait: ${portrait}`);

    const hero = readFileSync(join(root, "components/Hero.tsx"), "utf8");
    assert.match(
      hero,
      /hero-portrait\.jpg/,
      "Hero should import the hero portrait asset",
    );

    const layout = readFileSync(join(root, "app/layout.tsx"), "utf8");
    const sources = [...layout.matchAll(/["'](\/images\/[^"']+)["']/g)].map(
      (match) => match[1],
    );
    assert.ok(sources.length > 0, "layout should reference /images/ for OG");
    for (const src of sources) {
      const path = join(root, "public", src.replace(/^\//, ""));
      assert.equal(existsSync(path), true, `missing image for ${src}: ${path}`);
    }
  });
});
