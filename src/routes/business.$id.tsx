import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { ArrowLeft, Bookmark, Globe, MapPin, Navigation, Phone, Share2, Shield, Star } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";
import { BusinessCard } from "@/components/BusinessCard";
import { businesses, similarBusinesses, type Offer } from "@/lib/mock-data";
import { useAppStore } from "@/lib/app-store";
import { formatHours, isOpenNow } from "@/lib/business-utils";

export const Route = createFileRoute("/business/$id")({
  head: ({ params }) => {
    const b = businesses.find(x => x.id === params.id);
    return {
      meta: [
        { title: `${b?.name ?? "Business"} — Pembina Hub` },
        { name: "description", content: b?.blurb ?? "Local business on Pembina Hub" },
      ],
    };
  },
  loader: ({ params }) => {
    const b = businesses.find(x => x.id === params.id);
    if (!b) throw notFound();
    return { b };
  },
  notFoundComponent: () => <MobileShell><div className="p-8 text-center">Business not found.</div></MobileShell>,
  errorComponent: () => <MobileShell><div className="p-8 text-center">Couldn't load this business.</div></MobileShell>,
  component: BusinessDetail,
});

function BusinessDetail() {
  const { b } = Route.useLoaderData();
  const { isSaved, toggleSave } = useAppStore();
  const router = useRouter();
  const open = isOpenNow(b);
  const saved = isSaved("business", b.id);
  const similar = similarBusinesses(b);

  const share = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (navigator.share) await navigator.share({ title: b.name, url });
      else await navigator.clipboard.writeText(url);
    } catch {}
  };

  return (
    <MobileShell>
      <div className="relative h-72 overflow-hidden">
        <img src={b.image} alt={b.name} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.6) 100%), linear-gradient(135deg, ${b.accent}66, transparent 65%)` }} />
        <button
          onClick={() => router.history.back()}
          className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-background/90 text-foreground shadow-md backdrop-blur"
          aria-label="Back"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="absolute right-4 top-4 flex gap-2">
          <button
            onClick={share}
            className="grid h-10 w-10 place-items-center rounded-full bg-background/90 shadow-md backdrop-blur"
            aria-label="Share"
          >
            <Share2 className="h-5 w-5" />
          </button>
          <button
            onClick={() => toggleSave("business", b.id)}
            className={`grid h-10 w-10 place-items-center rounded-full shadow-md backdrop-blur ${
              saved ? "bg-primary text-primary-foreground" : "bg-background/90 text-foreground"
            }`}
            aria-label="Save"
          >
            <Bookmark className={`h-5 w-5 ${saved ? "fill-current" : ""}`} />
          </button>
        </div>
        <div className="absolute inset-x-4 bottom-4 flex items-end justify-between text-white">
          <div className="flex items-center gap-2">
            {b.tier !== "basic" && (
              <span className="inline-flex items-center gap-1 rounded-full bg-primary px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground shadow">
                {b.tier === "club_plus" ? "VIP" : "Club"}
              </span>
            )}
            <span className="rounded-full bg-white/20 px-2 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur">{b.category}</span>
            {b.price && <span className="rounded-full bg-white/20 px-2 py-1 text-[10px] font-bold backdrop-blur">{b.price}</span>}
          </div>
          <span className="text-5xl drop-shadow">{b.emoji}</span>
        </div>
      </div>

      <div className="space-y-3 px-5 pt-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">{b.category}</span>
            <h1 className="font-display text-2xl font-extrabold leading-tight">{b.name}</h1>
            {b.verified && (
              <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                <Shield className="h-3 w-3" /> Verified business
              </span>
            )}
          </div>
          <div className="text-right">
            <span className="flex items-center gap-1 rounded-full bg-warning/15 px-2 py-1 text-sm font-bold text-warning">
              <Star className="h-3.5 w-3.5 fill-warning" /> {b.rating}
            </span>
            <p className="mt-1 text-[10px] text-muted-foreground">{b.reviews} reviews</p>
          </div>
        </div>
        <p className={`text-sm font-semibold ${open.open ? "text-success" : "text-destructive"}`}>{open.label}</p>
        <p className="text-sm text-foreground/85 leading-relaxed">{b.story ?? b.blurb}</p>
        <p className="flex items-start gap-2 text-sm text-muted-foreground">
          <MapPin className="mt-0.5 h-4 w-4 text-primary" /> {b.address} · {b.distance_km} km away
        </p>
        {b.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {b.tags.map((t: string) => (
              <span key={t} className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-semibold text-foreground/80">{t}</span>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 grid grid-cols-4 gap-2 px-5">
        {[
          { label: "Call", icon: Phone, href: `tel:${b.phone}` },
          { label: "Website", icon: Globe, href: b.website },
          { label: "Directions", icon: Navigation, href: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(b.address)}` },
        ].map(a => (
          <a key={a.label} href={a.href} target="_blank" rel="noreferrer"
             className="flex flex-col items-center gap-1 rounded-2xl bg-primary px-2 py-3 text-xs font-semibold text-primary-foreground shadow-[var(--shadow-pop)] active:scale-95">
            <a.icon className="h-5 w-5" /> {a.label}
          </a>
        ))}
        <button onClick={share} className="flex flex-col items-center gap-1 rounded-2xl border border-border bg-card px-2 py-3 text-xs font-semibold active:scale-95">
          <Share2 className="h-5 w-5" /> Share
        </button>
      </div>

      {b.gallery.length > 0 && (
        <section className="mt-6">
          <h2 className="mb-2 px-5 font-display text-base font-bold">Gallery</h2>
          <div className="flex gap-2 overflow-x-auto px-5 pb-2 scrollbar-none">
            {b.gallery.map((g: string, idx: number) => (
              <div key={idx} className="relative h-32 w-44 shrink-0 overflow-hidden rounded-2xl shadow-sm">
                <img src={g} alt={`${b.name} ${idx + 1}`} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </section>
      )}

      {b.offers && b.offers.length > 0 && (
        <section className="mt-6 px-5">
          <h2 className="mb-2 font-display text-base font-bold">Active offers</h2>
          <div className="space-y-2">
            {b.offers.map((o: Offer) => (
              <div key={o.id} className="overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 to-accent/10 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p className="font-display text-lg font-extrabold text-primary">{o.title}</p>
                    <p className="text-sm text-foreground/80">{o.description}</p>
                    <p className="mt-1 text-xs text-muted-foreground">Valid until {new Date(o.expires).toLocaleDateString("en-CA")}</p>
                  </div>
                  {o.badge && (
                    <span className="rounded-full bg-warning px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-warning-foreground">
                      {o.badge}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mt-6 px-5">
        <h2 className="mb-2 font-display text-base font-bold">Hours</h2>
        <ul className="overflow-hidden rounded-2xl border border-border bg-card">
          {formatHours(b.hours).map(h => (
            <li key={h.day} className="flex items-center justify-between border-b border-border/70 px-4 py-2 text-sm last:border-b-0">
              <span className="font-medium">{h.day}</span>
              <span className={h.label === "Closed" ? "text-muted-foreground" : "text-foreground"}>{h.label}</span>
            </li>
          ))}
        </ul>
      </section>

      {similar.length > 0 && (
        <section className="mt-6">
          <h2 className="mb-2 px-5 font-display text-base font-bold">Similar businesses</h2>
          <div className="space-y-3 px-5">
            {similar.map(s => <BusinessCard key={s.id} b={s} />)}
          </div>
        </section>
      )}

      <div className="px-5 pt-6">
        <Link to="/" className="text-sm font-medium text-primary">← Back to Explore</Link>
      </div>
      <div className="h-6" />
    </MobileShell>
  );
}
