import { createFileRoute, Outlet, useRouterState } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { MobileShell } from "@/components/MobileShell";
import { AppHeader } from "@/components/AppHeader";
import { LocalCard } from "@/components/LocalCard";
import { Section } from "@/components/Section";
import { localItems, REFERENCE_NOW, type LocalType } from "@/lib/mock-data";
import { useAppStore } from "@/lib/app-store";

type Filter = "All" | "Events" | "Campaigns" | "Notices" | "This Weekend";
const filters: Filter[] = ["All", "Events", "Campaigns", "Notices", "This Weekend"];

function isThisWeekend(iso: string) {
  const d = new Date(iso);
  const diff = (d.getTime() - REFERENCE_NOW.getTime()) / (1000 * 60 * 60 * 24);
  return diff >= 0 && diff <= 9;
}

export const Route = createFileRoute("/local")({
  head: () => ({
    meta: [
      { title: "Local Happenings — Pembina Hub" },
      { name: "description", content: "Events, campaigns and notices happening across the Pembina Valley." },
    ],
  }),
  component: LocalLayout,
});

const typeFor: Record<Filter, LocalType | null> = {
  All: null, Events: "event", Campaigns: "campaign", Notices: "notice", "This Weekend": null,
};

function LocalLayout() {
  const pathname = useRouterState({ select: s => s.location.pathname });
  if (pathname !== "/local") return <Outlet />;
  return <LocalIndex />;
}

function LocalIndex() {
  const { city } = useAppStore();
  const [f, setF] = useState<Filter>("All");
  const [q, setQ] = useState("");

  const inCity = useMemo(() => localItems.filter(i => i.city === city || i.city === "Surrounding Area"), [city]);
  const featured = useMemo(() => inCity.filter(i => i.featured), [inCity]);

  const items = useMemo(() => {
    let list = inCity;
    const t = typeFor[f];
    if (t) list = list.filter(i => i.type === t);
    if (f === "This Weekend") list = list.filter(i => isThisWeekend(i.date_start));
    if (q.trim()) {
      const s = q.toLowerCase();
      list = list.filter(i => i.title.toLowerCase().includes(s) || i.description.toLowerCase().includes(s));
    }
    return list.sort((a, b) => +new Date(a.date_start) - +new Date(b.date_start));
  }, [inCity, f, q]);

  const counts = {
    Events: inCity.filter(i => i.type === "event").length,
    Campaigns: inCity.filter(i => i.type === "campaign").length,
    Notices: inCity.filter(i => i.type === "notice").length,
  };

  return (
    <MobileShell>
      <AppHeader title="Local" />

      <div className="px-5 pt-4">
        <div className="flex items-center gap-2 rounded-2xl border border-border bg-surface px-4 py-3 shadow-sm">
          <Search className="h-5 w-5 text-muted-foreground" />
          <input
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="Search events, campaigns, updates…"
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-center">
          {(["Events", "Campaigns", "Notices"] as const).map(k => (
            <button
              key={k}
              onClick={() => setF(k as Filter)}
              className={`rounded-2xl border px-2 py-2 transition ${f === k ? "border-primary bg-primary/5" : "border-border bg-card"}`}
            >
              <p className="font-display text-lg font-extrabold">{counts[k]}</p>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{k}</p>
            </button>
          ))}
        </div>
      </div>

      {featured.length > 0 && (
        <Section title="Featured local">
          <div className="flex gap-3 overflow-x-auto px-5 pb-2 scrollbar-none">
            {featured.map(i => <LocalCard key={i.id} item={i} variant="featured" />)}
          </div>
        </Section>
      )}

      <div className="-mx-1 flex gap-2 overflow-x-auto px-5 pb-1 pt-4 scrollbar-none">
        {filters.map(x => (
          <button
            key={x}
            onClick={() => setF(x)}
            className={`shrink-0 rounded-full border px-3 py-1.5 text-sm font-medium transition ${
              f === x ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-foreground hover:border-primary/40"
            }`}
          >
            {x}
          </button>
        ))}
      </div>

      <div className="space-y-4 px-5 pt-4">
        {items.length === 0 && (
          <p className="rounded-2xl border border-dashed border-border bg-surface-muted p-6 text-center text-sm text-muted-foreground">
            Nothing here yet for {city}. Try another filter.
          </p>
        )}
        {items.map(i => <LocalCard key={i.id} item={i} />)}
      </div>
      <div className="h-6" />
    </MobileShell>
  );
}
