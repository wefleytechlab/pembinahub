import { createFileRoute, Link } from "@tanstack/react-router";
import { Bookmark } from "lucide-react";
import { useState } from "react";
import { MobileShell } from "@/components/MobileShell";
import { AppHeader } from "@/components/AppHeader";
import { BusinessCard } from "@/components/BusinessCard";
import { LocalCard } from "@/components/LocalCard";
import { OfferCard } from "@/components/OfferCard";
import { useAppStore } from "@/lib/app-store";
import { allOffers, businesses, localItems } from "@/lib/mock-data";

const chips = ["All", "Businesses", "Offers", "Events", "Campaigns", "Notices"] as const;
type Chip = typeof chips[number];

export const Route = createFileRoute("/saved")({
  head: () => ({ meta: [{ title: "Saved — Pembina Hub" }] }),
  component: SavedPage,
});

function SavedPage() {
  const { saved } = useAppStore();
  const [filter, setFilter] = useState<Chip>("All");

  const savedBiz = saved.filter(s => s.kind === "business")
    .map(s => businesses.find(b => b.id === s.id)).filter(Boolean) as typeof businesses;
  const savedOffers = saved.filter(s => s.kind === "offer")
    .map(s => allOffers().find(o => o.id === s.id)).filter(Boolean);
  const savedLocal = (kind: "event" | "campaign" | "notice") =>
    saved.filter(s => s.kind === kind).map(s => localItems.find(i => i.id === s.id)).filter(Boolean) as typeof localItems;

  const empty = saved.length === 0;

  return (
    <MobileShell>
      <AppHeader title="Saved" showCity={false} />

      {empty ? (
        <div className="mx-5 mt-10 rounded-3xl border border-dashed border-border bg-card p-8 text-center">
          <div className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary">
            <Bookmark className="h-7 w-7" />
          </div>
          <h2 className="font-display text-lg font-bold">Nothing saved yet</h2>
          <p className="mt-1 text-sm text-muted-foreground">Save businesses, offers, events, and local posts to find them here later.</p>
          <div className="mt-5 flex flex-col gap-2">
            <Link to="/" className="rounded-xl bg-primary px-4 py-2.5 font-semibold text-primary-foreground">Explore Businesses</Link>
            <Link to="/local" className="rounded-xl border border-border bg-card px-4 py-2.5 font-semibold">See Local Happenings</Link>
          </div>
        </div>
      ) : (
        <>
          <div className="-mx-1 flex gap-2 overflow-x-auto px-5 pt-4 scrollbar-none">
            {chips.map(c => (
              <button key={c} onClick={() => setFilter(c)}
                className={`shrink-0 rounded-full border px-3 py-1.5 text-sm font-medium ${
                  filter === c ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card"
                }`}>{c}</button>
            ))}
          </div>

          <div className="space-y-6 px-5 pt-4">
            {(filter === "All" || filter === "Businesses") && savedBiz.length > 0 && (
              <div className="space-y-3">{savedBiz.map(b => <BusinessCard key={b.id} b={b} />)}</div>
            )}
            {(filter === "All" || filter === "Offers") && savedOffers.length > 0 && (
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
                {savedOffers.map(o => o && <OfferCard key={o.id} offer={o} business={o.business} />)}
              </div>
            )}
            {(filter === "All" || filter === "Events") && savedLocal("event").map(i => <LocalCard key={i.id} item={i} />)}
            {(filter === "All" || filter === "Campaigns") && savedLocal("campaign").map(i => <LocalCard key={i.id} item={i} />)}
            {(filter === "All" || filter === "Notices") && savedLocal("notice").map(i => <LocalCard key={i.id} item={i} />)}
          </div>
        </>
      )}
      <div className="h-6" />
    </MobileShell>
  );
}
