import { Reveal } from "@/components/Reveal";

const packages = [
  {
    name: "Single UGC Ad Asset",
    summary: "Built for brand ad accounts.",
    includes: [
      "1 vertical 9:16 video",
      "3 dynamic hook variations",
      "Raw B-roll cuts",
    ],
  },
  {
    name: "Dedicated Organic Post",
    summary: "Posted to Asma’s channels, then licensed for Spark.",
    includes: [
      "1 TikTok / Instagram Reel, posted organically",
      "30-day Spark Ad whitelisting authorization",
    ],
  },
  {
    name: "Multi-Asset Campaign Bundle",
    summary: "A full story across three formats.",
    includes: [
      "ASMR / tactile demo",
      "Problem/solution hook",
      "Routine integration",
    ],
  },
] as const;

export function PricingPackages() {
  return (
    <section
      id="offerings"
      className="border-t border-champagne/30 bg-cream/40 py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.28em] text-blush">
            Collaboration
          </p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">How to work together</h2>
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {packages.map((item, index) => (
            <article
              key={item.name}
              className="flex flex-col bg-porcelain p-6 ring-1 ring-champagne/40"
            >
              <p className="font-display text-sm text-champagne">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 font-display text-2xl leading-snug">{item.name}</h3>
              <p className="mt-2 text-sm text-onyx/70">{item.summary}</p>
              <ul className="mt-6 flex-1 space-y-2 text-sm text-onyx/85">
                {item.includes.map((line) => (
                  <li key={line} className="border-t border-champagne/30 pt-2">
                    {line}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <p className="mt-8 text-sm italic text-onyx/65">
          Custom licensing, usage extensions, and whitelisting available upon
          request.
        </p>
      </div>
    </section>
  );
}
