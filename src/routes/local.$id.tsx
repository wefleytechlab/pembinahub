import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { ArrowLeft, Bookmark, CalendarDays, Mail, MapPin, Navigation, Share2 } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";
import { LocalCard } from "@/components/LocalCard";
import { localItems } from "@/lib/mock-data";
import { useAppStore } from "@/lib/app-store";

export const Route = createFileRoute("/local/$id")({
  head: ({ params }) => {
    const i = localItems.find(x => x.id === params.id);
    return {
      meta: [
        { title: `${i?.title ?? "Local item"} — Pembina Hub` },
        { name: "description", content: i?.description ?? "Local happening on Pembina Hub" },
      ],
    };
  },
  loader: ({ params }) => {
    const i = localItems.find(x => x.id === params.id);
    if (!i) throw notFound();
    return { i };
  },
  notFoundComponent: () => <MobileShell><div className="p-8 text-center">Not found.</div></MobileShell>,
  errorComponent: () => <MobileShell><div className="p-8 text-center">Couldn't load.</div></MobileShell>,
  component: LocalDetail,
});

function LocalDetail() {
  const { i } = Route.useLoaderData();
  const { isSaved, toggleSave } = useAppStore();
  const router = useRouter();
  const kind = i.type;
  const saved = isSaved(kind, i.id);
  const similar = localItems.filter(x => x.type === i.type && x.id !== i.id).slice(0, 3);

  const share = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try { if (navigator.share) await navigator.share({ title: i.title, url }); else await navigator.clipboard.writeText(url); } catch {}
  };

  return (
    <MobileShell>
      <div className="relative h-72 overflow-hidden">
        <img src={i.image} alt={i.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.65) 100%), ${i.cover}66` }} />
        <button onClick={() => router.history.back()} className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-background/90 shadow-md backdrop-blur" aria-label="Back">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="absolute right-4 top-4 flex gap-2">
          <button onClick={share} className="grid h-10 w-10 place-items-center rounded-full bg-background/90 shadow-md backdrop-blur" aria-label="Share">
            <Share2 className="h-5 w-5" />
          </button>
          <button onClick={() => toggleSave(kind, i.id)} className={`grid h-10 w-10 place-items-center rounded-full shadow-md backdrop-blur ${saved ? "bg-primary text-primary-foreground" : "bg-background/90"}`} aria-label="Save">
            <Bookmark className={`h-5 w-5 ${saved ? "fill-current" : ""}`} />
          </button>
        </div>
        <div className="absolute inset-x-4 bottom-4 flex items-end justify-between text-white">
          <div>
            <span className="inline-block rounded-full bg-white/20 px-2 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur">{i.type}</span>
            <h1 className="mt-1.5 font-display text-2xl font-extrabold leading-tight drop-shadow">{i.title}</h1>
          </div>
          <span className="text-5xl drop-shadow">{i.emoji}</span>
        </div>
      </div>

      <div className="space-y-3 px-5 pt-4">
        <div className="space-y-1 text-sm text-muted-foreground">
          <p className="flex items-center gap-2"><CalendarDays className="h-4 w-4 text-primary" /> {new Date(i.date_start).toLocaleString("en-CA", { dateStyle: "medium", timeStyle: "short", timeZone: "UTC" })}{i.date_end ? ` → ${new Date(i.date_end).toLocaleString("en-CA", { dateStyle: "medium", timeStyle: "short", timeZone: "UTC" })}` : ""}</p>
          <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> {i.location_text}</p>
        </div>
        <p className="text-sm text-foreground/85 leading-relaxed">{i.description}</p>

        {(i.organizer || i.organizer_contact) && (
          <div className="rounded-2xl border border-border bg-card p-4 text-sm">
            <p className="font-semibold">Organizer</p>
            <p className="text-foreground/80">{i.organizer}</p>
            {i.organizer_contact && (
              <a href={`mailto:${i.organizer_contact}`} className="mt-1 flex items-center gap-1 text-primary"><Mail className="h-4 w-4" /> {i.organizer_contact}</a>
            )}
          </div>
        )}

        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(i.location_text)}`}
          target="_blank" rel="noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 font-semibold text-primary-foreground shadow-[var(--shadow-pop)]"
        >
          <Navigation className="h-5 w-5" /> Get Directions
        </a>
        <button onClick={share} className="flex w-full items-center justify-center gap-2 rounded-2xl border border-border bg-card px-4 py-3 font-semibold">
          <Share2 className="h-5 w-5" /> Share
        </button>
      </div>

      {similar.length > 0 && (
        <section className="mt-6 px-5">
          <h2 className="mb-2 font-display text-base font-bold">Similar in the valley</h2>
          <div className="space-y-3">{similar.map(s => <LocalCard key={s.id} item={s} />)}</div>
        </section>
      )}

      <div className="px-5 pt-4"><Link to="/local" className="text-sm font-medium text-primary">← All happenings</Link></div>
      <div className="h-6" />
    </MobileShell>
  );
}
