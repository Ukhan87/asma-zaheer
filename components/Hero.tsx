import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import type { CreatorStats } from "@/lib/types";
import heroPortrait from "@/public/images/hero-portrait.jpg";

export function Hero({ stats }: { stats: CreatorStats }) {
  return (
    <section id="top" className="mx-auto max-w-6xl px-5 pb-20 pt-10 md:px-8 md:pb-28 md:pt-16">
      <Reveal>
        <div className="grid items-end gap-10 md:grid-cols-12 md:gap-12">
          <div className="relative md:col-span-5">
            <div className="absolute -inset-3 border border-champagne/70" aria-hidden />
            <div className="relative aspect-[3/4] overflow-hidden bg-cream">
              <Image
                src={heroPortrait}
                alt={`${stats.name} editorial portrait`}
                fill
                priority
                className="object-cover"
                sizes="(min-width: 768px) 40vw, 100vw"
              />
            </div>
          </div>
          <div className="md:col-span-7 md:pb-4">
            <p className="text-[11px] uppercase tracking-[0.28em] text-blush">
              Beauty · Skincare · UGC
            </p>
            <h1 className="mt-4 font-display text-5xl leading-[0.95] tracking-tight text-onyx md:text-7xl">
              {stats.name}
            </h1>
            <p className="mt-3 text-sm tracking-wide text-onyx/70">{stats.handle}</p>
            <p className="mt-6 max-w-xl font-display text-xl italic leading-snug text-onyx/90 md:text-2xl">
              {stats.tagline}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              {stats.pills.map((pill) => (
                <div
                  key={pill.label}
                  className="border border-champagne/60 bg-cream/80 px-4 py-3"
                >
                  <p className="font-display text-xl text-onyx">{pill.value}</p>
                  <p className="mt-1 max-w-[10rem] text-[11px] uppercase tracking-[0.16em] text-onyx/60">
                    {pill.label}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href="#work"
                className="inline-flex items-center justify-center bg-onyx px-6 py-3 text-xs uppercase tracking-[0.2em] text-porcelain transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne"
              >
                Explore Portfolio
              </a>
              <a
                href="#inquire"
                className="inline-flex items-center justify-center border border-onyx px-6 py-3 text-xs uppercase tracking-[0.2em] text-onyx transition-colors hover:bg-cream focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne"
              >
                Book a Collaboration
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
