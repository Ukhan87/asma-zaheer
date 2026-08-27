"use client";

import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button
      type="button"
      className="no-print fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 bg-onyx px-5 py-3 text-[11px] uppercase tracking-[0.18em] text-porcelain shadow-[0_12px_40px_rgba(26,26,26,0.18)] transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne"
      onClick={() => window.print()}
    >
      <Printer size={14} aria-hidden />
      Download as PDF / Print
    </button>
  );
}
