import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import type { Business, Offer } from "@/lib/mock-data";

export function OfferCard({ offer, business }: { offer: Offer; business: Business }) {
  return (
    <Link
      to="/business/$id"
      params={{ id: business.id }}
      className="relative block w-72 shrink-0 overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]"
    >
      <div className="relative h-32 overflow-hidden">
        <img src={business.image} alt={business.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${business.accent}dd, transparent 70%)` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-warning px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-warning-foreground shadow-sm">
          <Sparkles className="h-3 w-3" /> {offer.badge ?? "Offer"}
        </span>
        <span className="absolute right-3 top-3 text-3xl drop-shadow">{business.emoji}</span>
        <p className="absolute inset-x-3 bottom-2 font-display text-xl font-extrabold leading-tight text-white drop-shadow">
          {offer.title}
        </p>
      </div>
      <div className="p-3">
        <p className="font-display text-sm font-semibold">{business.name}</p>
        <p className="line-clamp-1 text-xs text-muted-foreground">{offer.description}</p>
      </div>
    </Link>
  );
}
