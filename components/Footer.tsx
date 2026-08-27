import { Download, Mail } from "lucide-react";
import type { CreatorStats } from "@/lib/types";

const iconLink =
  "inline-flex text-neutral-800 transition-colors hover:text-neutral-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne";

function TikTokIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5 fill-current"
    >
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.98-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.69 2.58-4.82 1.36-1.06 3.1-1.54 4.75-1.36 1.07.13 2.1.58 2.96 1.26.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5 fill-none stroke-current"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function Footer({ stats }: { stats: CreatorStats }) {
  return (
    <footer className="border-t border-champagne/40 bg-cream/50">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 md:flex-row md:items-center md:justify-between md:px-8">
        <div>
          <p className="font-display text-2xl">{stats.name}</p>
          <p className="mt-1 text-sm text-onyx/65">{stats.handle}</p>
        </div>
        <div className="flex flex-wrap items-center gap-6 md:gap-8">
          <a
            href="/media-kit"
            className="inline-flex items-center gap-2 border border-onyx px-5 py-3 text-xs uppercase tracking-[0.18em] text-onyx transition-colors hover:bg-onyx hover:text-porcelain focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne"
          >
            <Download size={14} />
            Download media kit
          </a>
          <ul className="flex items-center gap-4">
            <li>
              <a
                href="https://www.tiktok.com/@itsasmazaheer"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className={iconLink}
              >
                <TikTokIcon />
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/itsasmazaheer/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className={iconLink}
              >
                <InstagramIcon />
              </a>
            </li>
            <li>
              <a
                href="mailto:asmazaheer.creates@gmail.com"
                aria-label="Email"
                className={iconLink}
              >
                <Mail className="h-5 w-5" strokeWidth={1.75} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
