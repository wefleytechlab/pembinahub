import { Link } from "@tanstack/react-router";
import { CalendarDays, MapPin, Megaphone, AlertTriangle, Users } from "lucide-react";
import type { LocalItem } from "@/lib/mock-data";
import { fmtDate, fmtTime } from "@/lib/mock-data";

const typeMeta = {
  event: { label: "Event", icon: CalendarDays, tint: "bg-primary text-primary-foreground" },
  campaign: { label: "Campaign", icon: Megaphone, tint: "bg-accent text-accent-foreground" },
  notice: { label: "Notice", icon: AlertTriangle, tint: "bg-warning text-warning-foreground" },
} as const;

export function LocalCard({ item, variant = "default" }: { item: LocalItem; variant?: "default" | "featured" }) {
  const meta = typeMeta[item.type];
  const Icon = meta.icon;
  const dateLabel = item.date_end ? `${fmtDate(item.date_start)} – ${fmtDate(item.date_end)}` : fmtDate(item.date_start);
  const d = new Date(item.date_start);
  const day = d.toLocaleDateString("en-CA", { day: "2-digit", timeZone: "UTC" });
  const mon = d.toLocaleDateString("en-CA", { month: "short", timeZone: "UTC" });

  if (variant === "featured") {
    return (
      <Link
        to="/local/$id"
        params={{ id: item.id }}
        className="relative block w-72 shrink-0 overflow-hidden rounded-3xl border border-border shadow-[var(--shadow-card)] transition active:scale-[0.99]"
      >
        <img src={item.image} alt={item.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.75) 100%), ${item.cover}80` }} />
        <div className="relative h-60 p-4 text-white">
          <div className="flex items-start justify-between">
            <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${meta.tint}`}>
              <Icon className="h-3 w-3" /> {meta.label}
            </span>
            <div className="flex flex-col items-center rounded-xl bg-white/95 px-2 py-1 text-foreground shadow">
              <span className="font-display text-lg font-extrabold leading-none">{day}</span>
              <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">{mon}</span>
            </div>
          </div>
          <div className="absolute inset-x-4 bottom-4">
            <h3 className="font-display text-lg font-extrabold leading-tight drop-shadow">{item.title}</h3>
            <p className="mt-1 text-xs text-white/90">
              {dateLabel}{item.type === "event" ? ` · ${fmtTime(item.date_start)}` : ""}
            </p>
            <p className="text-xs text-white/80">{item.location_text}</p>
            {item.attendees && (
              <p className="mt-1 inline-flex items-center gap-1 rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold backdrop-blur">
                <Users className="h-3 w-3" /> {item.attendees.toLocaleString()} interested
              </p>
            )}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to="/local/$id"
      params={{ id: item.id }}
      className="block overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] transition active:scale-[0.99]"
    >
      <div className="relative h-44 overflow-hidden">
        <img src={item.image} alt={item.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/10" />
        <span className={`absolute left-3 top-3 inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${meta.tint}`}>
          <Icon className="h-3 w-3" /> {meta.label}
        </span>
        <div className="absolute right-3 top-3 flex flex-col items-center rounded-xl bg-white/95 px-2 py-1 text-foreground shadow">
          <span className="font-display text-lg font-extrabold leading-none">{day}</span>
          <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">{mon}</span>
        </div>
        <span className="absolute bottom-3 right-3 text-4xl drop-shadow">{item.emoji}</span>
      </div>
      <div className="space-y-2 p-4">
        <h3 className="font-display text-lg font-bold leading-tight">{item.title}</h3>
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1"><CalendarDays className="h-3 w-3" /> {dateLabel}{item.type === "event" ? ` · ${fmtTime(item.date_start)}` : ""}</span>
          <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" /> {item.location_text}</span>
          {item.attendees && <span className="inline-flex items-center gap-1"><Users className="h-3 w-3" /> {item.attendees.toLocaleString()}</span>}
        </div>
        <p className="line-clamp-2 text-sm text-foreground/80">{item.description}</p>
      </div>
    </Link>
  );
}
