import type { Metadata } from "next";
import Link from "next/link";
import { PrintButton } from "@/components/PrintButton";
import heroPortrait from "@/public/images/hero-portrait.jpg";

export const metadata: Metadata = {
  title: "Media Kit — Asma Zaheer",
  description:
    "One-page media kit for Asma Zaheer (@itsasmazaheer): luxury beauty & skincare UGC, audience, content pillars, and collaboration packages.",
};

const stats = [
  { value: "375K+", label: "60-Day Post Views" },
  { value: "13.8%", label: "Engagement / Like Rate" },
  { value: "5.4K", label: "Profile Intent Visits" },
] as const;

const brands = [
  "Dyson USA",
  "Jo Malone London",
  "SKINFOOD",
  "Color Wow",
  "SEKKISEI",
  "Thayers",
] as const;

const pillars = [
  {
    name: "Tactile & ASMR Demos",
    detail: "Close-up textures, unboxings, and sensory product proof.",
  },
  {
    name: "Direct-Response UGC Ads",
    detail: "Hook-led 9:16 assets built for paid performance.",
  },
  {
    name: "Aesthetic Routines (GRWM / Night Reset)",
    detail: "Ritual storytelling that places product inside a lived luxury routine.",
  },
] as const;

const packages = [
  {
    name: "Single UGC Ad Asset",
    includes: ["1 × 9:16 video", "3 dynamic hooks", "Raw B-roll"],
  },
  {
    name: "Dedicated Organic Post",
    includes: ["1 TikTok / Reel", "30-day Spark Ads whitelisting"],
  },
  {
    name: "Multi-Asset Campaign Bundle",
    includes: ["ASMR", "Problem / Solution", "Routine"],
  },
] as const;

export default function MediaKitPage() {
  return (
    <div className="media-kit-page min-h-full bg-porcelain text-onyx">
      <PrintButton />
      <Link
        href="/"
        className="no-print mx-auto mt-6 block max-w-[8.5in] px-5 text-[11px] uppercase tracking-[0.2em] text-blush hover:text-onyx focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne md:px-0"
      >
        ← Asma Zaheer
      </Link>

      <article className="media-kit-sheet mx-auto mt-4 mb-16 flex flex-col bg-porcelain px-[0.55in] py-[0.48in] text-onyx md:mt-6">
        <header className="border-b-[3px] border-double border-champagne pb-5">
          <div className="flex items-center justify-between gap-5">
            <div className="flex min-w-0 items-center gap-4">
              <img
                src={heroPortrait.src}
                alt="Asma Zaheer"
                width={96}
                height={96}
                className="h-20 w-20 shrink-0 rounded-full object-cover ring-1 ring-champagne/85 ring-offset-2 ring-offset-porcelain sm:h-24 sm:w-24"
              />
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-[0.32em] text-blush">
                  Media Kit
                </p>
                <h1 className="mt-1.5 font-display text-[2.35rem] leading-[0.92] tracking-tight sm:text-[2.65rem]">
                  Asma Zaheer
                </h1>
                <p className="mt-1.5 text-[13px] tracking-wide text-onyx/70">
                  @itsasmazaheer
                </p>
              </div>
            </div>
            <div className="hidden text-right sm:block">
              <p className="font-display text-[15px] italic leading-snug text-onyx/85">
                Luxury Beauty &amp; Skincare
                <br />
                UGC Creator
              </p>
            </div>
          </div>
          <p className="mt-3 font-display text-lg italic text-onyx/90 sm:hidden">
            Luxury Beauty &amp; Skincare UGC Creator
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-[12px] tracking-wide">
            <li>
              <a
                href="https://itsasmazaheer.com"
                className="border-b border-champagne/70 pb-px hover:text-blush"
              >
                itsasmazaheer.com
              </a>
            </li>
            <li>
              <a
                href="mailto:asmazaheer.creates@gmail.com"
                className="border-b border-champagne/70 pb-px hover:text-blush"
              >
                asmazaheer.creates@gmail.com
              </a>
            </li>
          </ul>
        </header>

        <section className="mt-5">
          <h2 className="text-[10px] uppercase tracking-[0.28em] text-blush">
            Audience &amp; Stats
          </h2>
          <div className="mt-3 grid grid-cols-3 gap-px bg-champagne/50">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-porcelain px-3 py-3">
                <p className="font-display text-[1.45rem] leading-none sm:text-[1.55rem]">
                  {stat.value}
                </p>
                <p className="mt-2 text-[10px] uppercase tracking-[0.14em] text-onyx/60">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-3 border border-champagne/45 bg-cream/60 px-3 py-2.5 text-[11px] leading-relaxed tracking-wide text-onyx/75">
            <span className="uppercase tracking-[0.16em] text-blush">
              Core Demographic
            </span>
            <span className="mx-2 text-champagne">·</span>
            85%+ Female (Ages 18–34)
            <span className="mx-2 text-champagne">|</span>
            US, UK &amp; Canada
          </p>
        </section>

        <section className="mt-5">
          <h2 className="text-[10px] uppercase tracking-[0.28em] text-blush">
            Content Pillars
          </h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {pillars.map((pillar) => (
              <div
                key={pillar.name}
                className="border-t border-champagne pt-3"
              >
                <h3 className="font-display text-[1.05rem] leading-snug">
                  {pillar.name}
                </h3>
                <p className="mt-1.5 text-[12px] leading-relaxed text-onyx/70">
                  {pillar.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-5">
          <h2 className="text-[10px] uppercase tracking-[0.28em] text-blush">
            Collaboration Packages
          </h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {packages.map((pkg, index) => (
              <article
                key={pkg.name}
                className="flex flex-col bg-cream/70 px-4 py-4 ring-1 ring-champagne/45"
              >
                <p className="font-display text-sm text-champagne">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-1.5 font-display text-[1.15rem] leading-snug">
                  {pkg.name}
                </h3>
                <ul className="mt-3 space-y-1.5 text-[12px] text-onyx/80">
                  {pkg.includes.map((line) => (
                    <li key={line} className="border-t border-champagne/35 pt-1.5">
                      {line}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <footer className="mt-auto border-t border-champagne/50 pt-4">
          <h2 className="text-[10px] uppercase tracking-[0.28em] text-blush">
            Selected Brand Mentions
          </h2>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {brands.map((brand) => (
              <li
                key={brand}
                className="border border-champagne/55 bg-porcelain px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-onyx/70"
              >
                {brand}
              </li>
            ))}
          </ul>
          <p className="mt-4 max-w-[36rem] text-[12px] leading-relaxed text-onyx/75">
            Spark Ads whitelisting &amp; extended usage rights available upon
            request.
          </p>
          <p className="mt-3 font-display text-sm italic text-onyx/55">
            Asma Zaheer · @itsasmazaheer · itsasmazaheer.com
          </p>
        </footer>
      </article>
    </div>
  );
}
