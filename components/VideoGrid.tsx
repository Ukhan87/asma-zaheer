"use client";

import { useMemo, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { VideoCard } from "@/components/VideoCard";
import type { PortfolioItem, VideoCategory } from "@/lib/types";

const tabs: { id: "all" | VideoCategory; label: string }[] = [
  { id: "all", label: "All Formats" },
  { id: "ugc-demo", label: "UGC Product Demos" },
  { id: "tactile_asmr", label: "Tactile & ASMR Demos" },
  { id: "aesthetic_routines", label: "Aesthetic Routines" },
];

export function VideoGrid({ videos }: { videos: PortfolioItem[] }) {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("all");

  const filtered = useMemo(
    () => (tab === "all" ? videos : videos.filter((video) => video.category === tab)),
    [tab, videos],
  );

  return (
    <section id="work" className="border-t border-champagne/30 bg-cream/40 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.28em] text-blush">Selected work</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">9:16 that holds</h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-onyx/70">
            Face-to-camera demos, tactile close-ups, and ritual films built for
            Spark Ads and organic saves.
          </p>
        </Reveal>
        <div className="mt-8 flex gap-2 overflow-x-auto pb-2">
          {tabs.map((item) => {
            const active = item.id === tab;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className={`whitespace-nowrap border px-4 py-2 text-[11px] uppercase tracking-[0.16em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne ${
                  active
                    ? "border-onyx bg-onyx text-porcelain"
                    : "border-champagne/70 bg-porcelain text-onyx hover:border-onyx"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {filtered.map((item) => (
            <VideoCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
