import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Check, MapPin, Search, Shield } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";
import { AppHeader } from "@/components/AppHeader";
import { businesses } from "@/lib/mock-data";
import { useAppStore } from "@/lib/app-store";

export const Route = createFileRoute("/claim/$code")({
  head: () => ({ meta: [{ title: "Claim your business — Pembina Hub" }] }),
  component: ClaimPage,
});

function ClaimPage() {
  const { code } = Route.useParams();
  const { setMerchant } = useAppStore();
  const nav = useNavigate();
  const [q, setQ] = useState("");
  const [chosen, setChosen] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const list = businesses.filter(b => !q || b.name.toLowerCase().includes(q.toLowerCase()) || b.address.toLowerCase().includes(q.toLowerCase()));

  if (submitted) {
    const b = businesses.find(x => x.id === chosen);
    return (
      <MobileShell>
        <AppHeader title="Claim sent" showCity={false} showBell={false} />
        <div className="space-y-4 px-6 py-10 text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-success/15 text-success"><Check className="h-8 w-8" /></div>
          <h2 className="font-display text-xl font-bold">Claim request received</h2>
          <p className="text-sm text-muted-foreground">Our team will verify <span className="font-semibold text-foreground">{b?.name}</span> and approve your access within 1–2 business days.</p>
          <p className="font-mono text-xs text-muted-foreground">Reference: {code}</p>
          <button
            onClick={() => { setMerchant(true); nav({ to: "/me" }); }}
            className="mx-auto rounded-full bg-primary px-5 py-2.5 font-semibold text-primary-foreground shadow-[var(--shadow-pop)]"
          >
            Preview merchant dashboard
          </button>
        </div>
      </MobileShell>
    );
  }

  return (
    <MobileShell>
      <AppHeader title="Claim your business" showCity={false} showBell={false} />
      <div className="space-y-4 px-5 pt-4">
        <div className="rounded-2xl border border-primary/30 bg-primary/5 p-4">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary"><Shield className="h-3.5 w-3.5" /> Invite link</p>
          <p className="mt-1 font-mono text-xs break-all text-foreground/80">pembinahub.com/claim/{code}</p>
          <p className="mt-2 text-xs text-muted-foreground">
            This single-use link was issued by the Pembina Hub team. Find your business below to start the verification.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-2xl border border-border bg-surface px-4 py-3">
          <Search className="h-5 w-5 text-muted-foreground" />
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search business name or address" className="w-full bg-transparent text-sm outline-none" />
        </div>

        <div className="space-y-2">
          {list.slice(0, 8).map(b => (
            <button
              key={b.id}
              onClick={() => setChosen(b.id)}
              className={`flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition ${chosen === b.id ? "border-primary bg-primary/5" : "border-border bg-card"}`}
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl text-2xl" style={{ background: b.cover }}>{b.emoji}</span>
              <div className="flex-1">
                <p className="font-display font-semibold">{b.name}</p>
                <p className="flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="h-3 w-3" /> {b.address}</p>
              </div>
              {chosen === b.id && <Check className="h-5 w-5 text-primary" />}
            </button>
          ))}
        </div>

        <button
          disabled={!chosen}
          onClick={() => setSubmitted(true)}
          className="w-full rounded-xl bg-primary py-3 font-bold text-primary-foreground shadow-[var(--shadow-pop)] disabled:opacity-40"
        >
          Claim this business
        </button>

        <Link to="/plus/business" className="block py-2 text-center text-sm font-medium text-primary">I don't see my business — add it</Link>
      </div>
      <div className="h-6" />
    </MobileShell>
  );
}
