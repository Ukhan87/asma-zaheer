"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  { href: "#work", label: "Work" },
  { href: "#audience", label: "Audience" },
  { href: "#offerings", label: "Collaborate" },
] as const;

export function Navbar({ name }: { name: string }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-champagne/30 bg-porcelain/85 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
        <a
          href="#top"
          className="font-display text-lg tracking-tight text-onyx focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne"
        >
          {name}
        </a>
        <ul className="hidden items-center gap-8 text-sm tracking-wide text-onyx/80 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="transition-colors hover:text-onyx focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#inquire"
          className="hidden border border-champagne bg-transparent px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-onyx transition-colors hover:bg-champagne/20 md:inline-flex focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne"
        >
          Book a collab
        </a>
        <button
          type="button"
          className="inline-flex rounded-sm p-2 text-onyx md:hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>
      {open ? (
        <div className="border-t border-champagne/30 bg-porcelain px-5 py-4 md:hidden">
          <ul className="flex flex-col gap-4 text-sm">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#inquire"
                className="inline-block border border-champagne px-4 py-2 text-xs uppercase tracking-[0.18em]"
                onClick={() => setOpen(false)}
              >
                Book a collab
              </a>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
