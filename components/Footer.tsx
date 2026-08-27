import { Download } from "lucide-react";
import type { CreatorStats } from "@/lib/types";

export function Footer({ stats }: { stats: CreatorStats }) {
  return (
    <footer className="border-t border-champagne/40 bg-cream/50">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 md:flex-row md:items-center md:justify-between md:px-8">
        <div>
          <p className="font-display text-2xl">{stats.name}</p>
          <p className="mt-1 text-sm text-onyx/65">{stats.handle}</p>
        </div>
        <a
          href="/media-kit"
          className="inline-flex items-center gap-2 border border-onyx px-5 py-3 text-xs uppercase tracking-[0.18em] text-onyx transition-colors hover:bg-onyx hover:text-porcelain focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne"
        >
          <Download size={14} />
          Download media kit
        </a>
        <ul className="flex flex-wrap gap-6 text-sm tracking-wide">
          <li>
            <a
              href={stats.socials.tiktok}
              target="_blank"
              rel="noreferrer"
              className="hover:text-blush"
            >
              TikTok
            </a>
          </li>
          <li>
            <a
              href={stats.socials.instagram}
              target="_blank"
              rel="noreferrer"
              className="hover:text-blush"
            >
              Instagram
            </a>
          </li>
          <li>
            <a href={`mailto:${stats.email}`} className="hover:text-blush">
              Email
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
