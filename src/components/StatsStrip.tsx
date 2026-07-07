import { Sparkles, Store, Calendar, Heart } from "lucide-react";

export function StatsStrip({ city, biz, events, offers }: { city: string; biz: number; events: number; offers: number }) {
  const stats = [
    { icon: Store, label: "Local spots", value: biz, tint: "from-primary to-primary-glow" },
    { icon: Calendar, label: "Happenings", value: events, tint: "from-accent to-primary" },
    { icon: Sparkles, label: "Live offers", value: offers, tint: "from-warning to-accent" },
    { icon: Heart, label: "Loved", value: "9.8k", tint: "from-rose-400 to-fuchsia-500" },
  ];
  return (
    <div className="px-5 pt-4">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{city} · live pulse</p>
      <div className="grid grid-cols-4 gap-2">
        {stats.map(s => (
          <div key={s.label} className="overflow-hidden rounded-2xl border border-border bg-card p-2.5 shadow-[var(--shadow-card)]">
            <span className={`grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br ${s.tint} text-primary-foreground shadow-sm`}>
              <s.icon className="h-3.5 w-3.5" />
            </span>
            <p className="mt-1.5 font-display text-base font-extrabold leading-none">{s.value}</p>
            <p className="text-[10px] font-medium text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
