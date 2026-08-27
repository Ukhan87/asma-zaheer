import { Reveal } from "@/components/Reveal";
import type { CreatorStats, PercentRow } from "@/lib/types";

function MeterList({ title, rows }: { title: string; rows: PercentRow[] }) {
  return (
    <div className="bg-porcelain p-6 ring-1 ring-champagne/40">
      <h3 className="text-[11px] uppercase tracking-[0.22em] text-blush">{title}</h3>
      <ul className="mt-5 space-y-4">
        {rows.map((row) => (
          <li key={row.label}>
            <div className="flex items-baseline justify-between text-sm">
              <span>{row.label}</span>
              <span className="font-display text-lg">{row.percent}%</span>
            </div>
            <div className="mt-2 h-px bg-cream">
              <div
                className="h-px bg-champagne"
                style={{ width: `${row.percent}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function AnalyticsSection({ stats }: { stats: CreatorStats }) {
  return (
    <section id="audience" className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
      <Reveal>
        <p className="text-[11px] uppercase tracking-[0.28em] text-blush">
          Audience & performance
        </p>
        <h2 className="mt-3 font-display text-4xl md:text-5xl">Who is watching</h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-onyx/70">
          A concentrated beauty audience in the US, UK, and Canada — high save
          and share rates on product-first verticals.
        </p>
      </Reveal>
      <div className="mt-12 grid gap-4 md:grid-cols-3">
        <MeterList title="Gender" rows={stats.demographics.gender} />
        <MeterList title="Age" rows={stats.demographics.age} />
        <MeterList title="Top locations" rows={stats.demographics.locations} />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.kpis.map((kpi) => (
          <div key={kpi.label} className="bg-cream px-5 py-6 ring-1 ring-champagne/40">
            <p className="font-display text-3xl text-onyx">{kpi.value}</p>
            <p className="mt-2 text-[11px] uppercase tracking-[0.16em] text-onyx/60">
              {kpi.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
