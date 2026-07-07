import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Bell, ChevronRight, CreditCard, HelpCircle, Image as ImageIcon, LogOut, Mail,
  Megaphone, MessageSquare, Settings, Shield, Sparkles, Store, Tag, TrendingUp,
} from "lucide-react";
import { MobileShell } from "@/components/MobileShell";
import { AppHeader } from "@/components/AppHeader";
import { useAppStore } from "@/lib/app-store";
import { useState, type ReactNode } from "react";

export const Route = createFileRoute("/me")({
  head: () => ({ meta: [{ title: "Me — Pembina Hub" }] }),
  component: MePage,
});

function MePage() {
  const { submissions, merchant, setMerchant } = useAppStore();
  const [notify, setNotify] = useState(true);

  return (
    <MobileShell>
      <AppHeader title="Me" showCity={false} />

      <div className="px-5 pt-4">
        <div className="overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary/10 via-card to-accent/5 p-5 shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-3">
            <div className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-primary to-primary-glow text-primary-foreground font-display text-xl font-bold shadow-[var(--shadow-pop)]">PL</div>
            <div className="flex-1">
              <p className="font-display text-lg font-bold">Pembina Local</p>
              <p className="text-xs text-muted-foreground">pembina.local@example.com</p>
              <p className="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-primary">
                <Shield className="h-3 w-3" /> {merchant ? "Verified Merchant" : "Verified User"}
              </p>
            </div>
            <button onClick={() => setMerchant(!merchant)} className="rounded-full bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary">
              {merchant ? "Switch to Guest" : "Try Merchant"}
            </button>
          </div>
        </div>
      </div>

      {merchant && <MerchantDashboard />}

      <Section title="My content">
        <List>
          <Row icon={<Store className="h-4 w-4" />} label="My Businesses" right={<Badge>{merchant ? 1 : 0}</Badge>} />
          <Row icon={<Tag className="h-4 w-4" />} label="My Offers" right={<Badge>{merchant ? 2 : 0}</Badge>} />
          <Row icon={<Sparkles className="h-4 w-4" />} label="My Events" right={<Badge>0</Badge>} />
          <Row icon={<Megaphone className="h-4 w-4" />} label="My Campaigns" right={<Badge>0</Badge>} />
          <Row icon={<ImageIcon className="h-4 w-4" />} label="My Updates" right={<Badge>0</Badge>} />
        </List>
      </Section>

      <Section title="My submissions" action={submissions.length > 0 ? <span className="text-xs text-muted-foreground">{submissions.length} total</span> : undefined}>
        {submissions.length === 0 ? (
          <p className="px-5 text-sm text-muted-foreground">You haven't submitted anything yet. Tap the <span className="font-semibold">+</span> button to get started.</p>
        ) : (
          <ul className="mx-5 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
            {submissions.map((s, idx) => (
              <li key={idx} className="flex items-center justify-between px-4 py-3 text-sm">
                <div>
                  <p className="font-semibold">{s.title}</p>
                  <p className="text-xs text-muted-foreground">{s.type} · {new Date(s.at).toLocaleDateString("en-CA")}</p>
                </div>
                <span className="rounded-full bg-warning/15 px-2 py-0.5 text-xs font-semibold text-warning">{s.status ?? "Under review"}</span>
              </li>
            ))}
          </ul>
        )}
      </Section>

      <Section title="Account">
        <List>
          <Row asLink to="/notifications" icon={<Bell className="h-4 w-4" />} label="Notifications" right={<span className="grid h-5 w-5 place-items-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">3</span>} />
          <Row icon={<MessageSquare className="h-4 w-4" />} label="Messages" />
          <Row asLink to="/packages" icon={<CreditCard className="h-4 w-4" />} label="Packages & billing" />
          <Row icon={<HelpCircle className="h-4 w-4" />} label="Help & support" />
          <Row icon={<Mail className="h-4 w-4" />} label="Contact us" />
        </List>
      </Section>

      <Section title="Settings">
        <List>
          <Row icon={<Bell className="h-4 w-4" />} label="Push notifications" right={
            <button onClick={() => setNotify(n => !n)} className={`relative h-6 w-11 rounded-full transition ${notify ? "bg-primary" : "bg-muted"}`}>
              <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${notify ? "left-5" : "left-0.5"}`} />
            </button>
          } />
          <Row icon={<Settings className="h-4 w-4" />} label="App settings" />
          <Row icon={<LogOut className="h-4 w-4" />} label="Log out" />
        </List>
      </Section>

      <p className="mt-6 px-5 text-center text-[11px] text-muted-foreground">Pembina Hub · v1.0 · Made in Winkler 🌾</p>
      <div className="h-10" />
    </MobileShell>
  );
}

function Section({ title, action, children }: { title: string; action?: ReactNode; children: ReactNode }) {
  return (
    <section className="mt-6">
      <div className="mb-2 flex items-center justify-between px-5">
        <h2 className="font-display text-base font-bold">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

function List({ children }: { children: ReactNode }) {
  return <ul className="mx-5 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">{children}</ul>;
}

function Badge({ children }: { children: ReactNode }) {
  return <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-bold text-foreground/70">{children}</span>;
}

function Row({ icon, label, right, asLink, to }: { icon: ReactNode; label: string; right?: ReactNode; asLink?: boolean; to?: string }) {
  const inner = (
    <>
      <span className="flex items-center gap-3"><span className="grid h-8 w-8 place-items-center rounded-lg bg-muted text-foreground">{icon}</span>{label}</span>
      {right ?? <ChevronRight className="h-4 w-4 text-muted-foreground" />}
    </>
  );
  if (asLink && to) {
    return (
      <li>
        <Link to={to} className="flex items-center justify-between px-4 py-3 text-sm">{inner}</Link>
      </li>
    );
  }
  return <li className="flex items-center justify-between px-4 py-3 text-sm">{inner}</li>;
}

function MerchantDashboard() {
  const data = Array.from({ length: 14 }, (_, i) => 12 + Math.round(Math.sin(i / 2) * 6 + i * 2));
  const max = Math.max(...data);
  const w = 320, h = 90;
  const path = data.map((v, i) => `${i === 0 ? "M" : "L"}${(i / (data.length - 1)) * w},${h - (v / max) * h}`).join(" ");
  const area = `${path} L${w},${h} L0,${h} Z`;

  return (
    <section className="mt-5 px-5">
      <div className="rounded-3xl border border-border bg-card p-4 shadow-[var(--shadow-card)]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">Merchant dashboard</p>
            <h2 className="font-display text-lg font-bold">Prairie Bean Coffee Co.</h2>
          </div>
          <span className="rounded-full bg-success/15 px-2 py-1 text-xs font-bold text-success">Verified</span>
        </div>

        <div className="mt-4 grid grid-cols-4 gap-2 text-center">
          {[
            { label: "Views", value: "1,284" },
            { label: "Calls", value: "63" },
            { label: "Dirs.", value: "211" },
            { label: "Saves", value: "92" },
          ].map(s => (
            <div key={s.label} className="rounded-xl bg-muted px-2 py-2">
              <p className="font-display text-lg font-bold">{s.value}</p>
              <p className="text-[11px] text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 p-3">
          <p className="mb-1 flex items-center gap-1 text-xs font-semibold text-primary"><TrendingUp className="h-3 w-3" /> Last 14 days · +18%</p>
          <svg viewBox={`0 0 ${w} ${h}`} className="h-24 w-full">
            <defs>
              <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.62 0.19 256)" stopOpacity="0.5" />
                <stop offset="100%" stopColor="oklch(0.62 0.19 256)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={area} fill="url(#g)" />
            <path d={path} fill="none" stroke="oklch(0.62 0.19 256)" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
          </svg>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
          {[
            { label: "Edit Info", icon: Store },
            { label: "Photos", icon: ImageIcon },
            { label: "New Offer", icon: Tag },
          ].map(a => (
            <button key={a.label} className="flex flex-col items-center gap-1 rounded-xl border border-border bg-surface px-2 py-3 font-semibold">
              <a.icon className="h-4 w-4 text-primary" /> {a.label}
            </button>
          ))}
        </div>

        <Link to="/packages" className="mt-4 block overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-primary-glow p-4 text-primary-foreground">
          <p className="font-display text-base font-bold">Upgrade to Club Plus</p>
          <p className="mt-0.5 text-xs opacity-90">Top-of-search placement, unlimited offers, 70–100% off add-ons.</p>
          <span className="mt-3 inline-block rounded-full bg-white/20 px-3 py-1.5 text-xs font-bold ring-1 ring-white/30">See packages →</span>
        </Link>
      </div>
    </section>
  );
}
