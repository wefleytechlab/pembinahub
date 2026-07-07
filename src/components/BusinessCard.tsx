import { Link } from "@tanstack/react-router";
import { Star, MapPin } from "lucide-react";
import type { Business } from "@/lib/mock-data";
import { isOpenNow } from "@/lib/business-utils";

const tierBadge: Record<Business["tier"], string | null> = {
  basic: null,
  club: "Club",
  club_plus: "VIP",
};

export function BusinessCard({ b, variant = "wide" }: { b: Business; variant?: "wide" | "tile" }) {
  const open = isOpenNow(b);
  const offer = b.offers?.[0];

  if (variant === "tile") {
    return (
      <Link
        to="/business/$id"
        params={{ id: b.id }}
        className="group block w-64 shrink-0 overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] transition active:scale-[0.98]"
      >
        <div className="relative h-36 overflow-hidden">
          <img src={b.image} alt={b.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
          <span className="absolute right-2 top-2 rounded-full bg-background/95 px-2 py-0.5 text-[11px] font-semibold text-foreground shadow-sm">
            {b.category}
          </span>
          {tierBadge[b.tier] && (
            <span className="absolute left-2 top-2 rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary-foreground shadow-sm">
              {tierBadge[b.tier]}
            </span>
          )}
          <div className="absolute inset-x-2 bottom-2 flex items-end justify-between">
            <p className="font-display text-base font-bold leading-tight text-white drop-shadow">{b.name}</p>
            <span className="text-2xl drop-shadow">{b.emoji}</span>
          </div>
          {offer && (
            <span className="absolute right-2 top-9 rounded-full bg-warning px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-warning-foreground shadow-sm">
              {offer.badge ?? "Offer"}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between px-3 py-2 text-xs">
          <span className="text-muted-foreground">{b.city} · <span className={open.open ? "text-success" : "text-destructive"}>{open.open ? "Open" : "Closed"}</span></span>
          <span className="flex items-center gap-0.5 font-semibold">
            <Star className="h-3 w-3 fill-warning text-warning" /> {b.rating}
            <span className="ml-1 text-muted-foreground">({b.reviews})</span>
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to="/business/$id"
      params={{ id: b.id }}
      className="flex gap-3 rounded-2xl border border-border bg-card p-3 shadow-[var(--shadow-card)] transition active:scale-[0.99]"
    >
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl">
        <img src={b.image} alt={b.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <span className="absolute bottom-1 right-1 text-2xl drop-shadow">{b.emoji}</span>
        {tierBadge[b.tier] && (
          <span className="absolute left-1 top-1 rounded-full bg-primary px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-primary-foreground shadow">
            {tierBadge[b.tier]}
          </span>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-1 font-display font-semibold">{b.name}</h3>
          <span className="flex items-center gap-0.5 text-xs font-semibold">
            <Star className="h-3 w-3 fill-warning text-warning" /> {b.rating}
          </span>
        </div>
        <p className="text-xs font-medium text-muted-foreground">
          {b.category}{b.price ? ` · ${b.price}` : ""} · <span className={open.open ? "text-success" : "text-destructive"}>{open.open ? "Open now" : "Closed"}</span>
        </p>
        <p className="mt-1 line-clamp-2 text-xs text-foreground/80">{b.blurb}</p>
        <div className="mt-1.5 flex items-center gap-2 text-[11px] text-muted-foreground">
          <span className="inline-flex items-center gap-0.5"><MapPin className="h-3 w-3" /> {b.distance_km} km</span>
          <span className="text-muted-foreground/60">·</span>
          <span>{b.reviews} reviews</span>
          {offer && <span className="ml-auto rounded-full bg-warning/15 px-1.5 py-0.5 font-bold text-warning">{offer.badge ?? "Offer"}</span>}
        </div>
      </div>
    </Link>
  );
}
