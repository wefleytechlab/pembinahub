import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, Sparkles, Store, TrendingUp, Star } from "lucide-react";
import { useMemo, useState } from "react";
import { MobileShell } from "@/components/MobileShell";
import { AppHeader } from "@/components/AppHeader";
import { Section } from "@/components/Section";
import { BusinessCard } from "@/components/BusinessCard";
import { OfferCard } from "@/components/OfferCard";
import { HeroBanner } from "@/components/HeroBanner";
import { Onboarding } from "@/components/Onboarding";
import { StatsStrip } from "@/components/StatsStrip";
import { WeatherStrip } from "@/components/WeatherStrip";
import { CollectionsRow } from "@/components/CollectionsRow";
import { CommunityVoices } from "@/components/CommunityVoices";
import { allOffers, businesses, categories, localItems, type Category } from "@/lib/mock-data";
import { useAppStore } from "@/lib/app-store";
import { isOpenNow } from "@/lib/business-utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Explore — Pembina Hub" },
      { name: "description", content: "Discover local businesses, offers and happenings in Winkler, Morden and the Pembina Valley." },
    ],
  }),
  component: Explore,
});

function Explore() {
  const { city } = useAppStore();
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<Category | null>(null);

  const cityBiz = useMemo(() => businesses.filter(b => b.city === city), [city]);
  const filtered = useMemo(() => {
    let list = cityBiz;
    if (cat) list = list.filter(b => b.category === cat);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(b => b.name.toLowerCase().includes(q) || b.blurb.toLowerCase().includes(q) || b.category.toLowerCase().includes(q));
    }
    return list;
  }, [cityBiz, cat, query]);

  const featured = cityBiz.filter(b => b.featured);
  const fresh = cityBiz.filter(b => b.new);
  const offers = allOffers().filter(o => o.business.city === city);
  const happening = localItems.filter(i => i.city === city || i.city === "Surrounding Area").slice(0, 4);
  const topRated = [...cityBiz].sort((a, b) => b.rating - a.rating).slice(0, 5);
  const openNow = cityBiz.filter(b => isOpenNow(b).open);

  const catCounts: Record<string, number> = {};
  cityBiz.forEach(b => { catCounts[b.category] = (catCounts[b.category] ?? 0) + 1; });

  return (
    <MobileShell>
      <Onboarding />
      <AppHeader />

      <HeroBanner city={city} />

      <StatsStrip city={city} biz={cityBiz.length} events={happening.length} offers={offers.length} />

      <WeatherStrip city={city} />

      <div className="px-5 pt-4">
        <div className="flex items-center gap-2 rounded-2xl border border-border bg-surface px-4 py-3 shadow-sm">
          <Search className="h-5 w-5 text-muted-foreground" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={`Search businesses, offers, services in ${city}…`}
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
        {/* Quick chips */}
        <div className="-mx-1 mt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {["Open now", "Top rated", "New", "Has offer", "Pet friendly", "Patio"].map(c => (
            <button
              key={c}
              onClick={() => setQuery(c.toLowerCase() === "open now" ? "" : c.toLowerCase())}
              className="shrink-0 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground/80 transition hover:border-primary/40"
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <Section title="Browse categories" action={<span className="text-xs font-medium text-muted-foreground">{cityBiz.length} nearby</span>}>
        <div className="grid grid-cols-4 gap-2 px-5">
          {categories.map(c => {
            const active = cat === c.key;
            const count = catCounts[c.key] ?? 0;
            return (
              <button
                key={c.key}
                onClick={() => setCat(active ? null : c.key)}
                className={`relative flex flex-col items-center gap-1 overflow-hidden rounded-2xl border px-2 py-3 text-xs font-semibold transition ${
                  active ? "border-primary text-primary-foreground shadow-[var(--shadow-pop)]" : "border-border bg-card hover:border-primary/40"
                }`}
              >
                {active && <span className={`absolute inset-0 -z-0 bg-gradient-to-br ${c.tint}`} />}
                <span className={`relative grid h-10 w-10 place-items-center rounded-xl text-xl ${active ? "bg-white/25" : `bg-gradient-to-br ${c.tint} text-white shadow-sm`}`}>
                  {c.emoji}
                </span>
                <span className="relative">{c.label}</span>
                {count > 0 && !active && (
                  <span className="relative text-[10px] font-bold text-muted-foreground">{count}</span>
                )}
              </button>
            );
          })}
        </div>
      </Section>

      {(query || cat) ? (
        <Section title={`Results · ${filtered.length}`}>
          <div className="space-y-3 px-5">
            {filtered.length === 0 && (
              <p className="rounded-2xl border border-dashed border-border bg-surface-muted p-6 text-center text-sm text-muted-foreground">
                No matches in {city}. Try a different category or area.
              </p>
            )}
            {filtered.map(b => <BusinessCard key={b.id} b={b} />)}
          </div>
        </Section>
      ) : (
        <>
          {featured.length > 0 && (
            <Section title="Featured businesses" action={<span className="inline-flex items-center gap-1 text-xs font-medium text-primary"><TrendingUp className="h-3 w-3" /> in {city}</span>}>
              <div className="flex gap-3 overflow-x-auto px-5 pb-2 scrollbar-none">
                {featured.map(b => <BusinessCard key={b.id} b={b} variant="tile" />)}
              </div>
            </Section>
          )}

          <Section title="Curated collections" action={<span className="text-xs font-medium text-muted-foreground">Editor's picks</span>}>
            <CollectionsRow />
          </Section>

          {offers.length > 0 && (
            <Section title="Featured offers" action={<Link to="/saved" className="text-xs font-medium text-primary">Save for later →</Link>}>
              <div className="flex gap-3 overflow-x-auto px-5 pb-2 scrollbar-none">
                {offers.map(o => <OfferCard key={o.id} offer={o} business={o.business} />)}
              </div>
            </Section>
          )}

          {openNow.length > 0 && (
            <Section title="Open right now" action={<span className="text-xs font-medium text-success">● Live</span>}>
              <div className="flex gap-3 overflow-x-auto px-5 pb-2 scrollbar-none">
                {openNow.slice(0, 8).map(b => <BusinessCard key={b.id} b={b} variant="tile" />)}
              </div>
            </Section>
          )}

          {topRated.length > 0 && (
            <Section title="Top rated this month" action={<span className="text-xs font-medium text-muted-foreground">★ 4.5+</span>}>
              <div className="space-y-2 px-5">
                {topRated.map((b, idx) => (
                  <Link
                    key={b.id}
                    to="/business/$id"
                    params={{ id: b.id }}
                    className="flex items-center gap-3 rounded-2xl border border-border bg-card p-2.5 shadow-sm active:scale-[0.99]"
                  >
                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent font-display text-sm font-extrabold text-primary-foreground">
                      {idx + 1}
                    </span>
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl">
                      <img src={b.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-1 font-display font-bold">{b.name}</p>
                      <p className="text-[11px] text-muted-foreground">{b.category} · {b.reviews} reviews</p>
                    </div>
                    <span className="flex items-center gap-0.5 rounded-full bg-warning/15 px-2 py-1 text-xs font-bold text-warning">
                      <Star className="h-3 w-3 fill-warning" /> {b.rating}
                    </span>
                  </Link>
                ))}
              </div>
            </Section>
          )}

          {fresh.length > 0 && (
            <Section title="New on Pembina Hub" action={<Link to="/local" className="text-xs font-medium text-primary">See all →</Link>}>
              <div className="space-y-3 px-5">
                {fresh.map(b => <BusinessCard key={b.id} b={b} />)}
              </div>
            </Section>
          )}

          {happening.length > 0 && (
            <Section title="Happening this week" action={<Link to="/local" className="text-xs font-medium text-primary">All local →</Link>}>
              <div className="flex gap-3 overflow-x-auto px-5 pb-2 scrollbar-none">
                {happening.map(i => (
                  <Link
                    key={i.id}
                    to="/local/$id"
                    params={{ id: i.id }}
                    className="group block w-60 shrink-0 overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]"
                  >
                    <div className="relative h-28 overflow-hidden">
                      <img src={i.image} alt={i.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                      <span className="absolute right-2 bottom-1 text-3xl drop-shadow">{i.emoji}</span>
                      <span className="absolute left-2 top-2 rounded-full bg-white/95 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-primary shadow">{i.type}</span>
                    </div>
                    <div className="p-3">
                      <p className="line-clamp-2 font-display text-sm font-bold leading-tight">{i.title}</p>
                      <p className="mt-0.5 line-clamp-1 text-[10px] text-muted-foreground">{i.location_text}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </Section>
          )}

          <Section title="Voices from the Valley" action={<span className="text-xs font-medium text-muted-foreground">Reviews</span>}>
            <CommunityVoices />
          </Section>

          <Section title={`All in ${city}`}>
            <div className="space-y-3 px-5">
              {cityBiz.map(b => <BusinessCard key={b.id} b={b} />)}
            </div>
          </Section>

          <div className="px-5 pt-6">
            <Link
              to="/plus/business"
              className="relative block overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-primary via-primary-glow to-accent p-5 text-primary-foreground shadow-[var(--shadow-pop)]"
            >
              <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-white/15 blur-2xl" />
              <div className="relative flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/20 backdrop-blur">
                  <Store className="h-6 w-6" />
                </span>
                <div className="flex-1">
                  <p className="font-display text-base font-extrabold">Own a business in the Valley?</p>
                  <p className="text-xs text-white/85">List it free on Pembina Hub in under 2 minutes.</p>
                </div>
                <Sparkles className="h-5 w-5" />
              </div>
            </Link>
          </div>
        </>
      )}

      <div className="h-6" />
    </MobileShell>
  );
}
