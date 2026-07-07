import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { CalendarDays, Megaphone, Store, Tag } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";
import { AppHeader } from "@/components/AppHeader";

export const Route = createFileRoute("/plus")({
  head: () => ({ meta: [{ title: "Add to Pembina Hub" }] }),
  component: PlusLayout,
});

const tiles = [
  { to: "/plus/business", label: "Add a Business", desc: "List your place. Free.", icon: Store, color: "from-primary to-primary-glow" },
  { to: "/plus/offer", label: "Create an Offer", desc: "Attract more customers.", icon: Tag, color: "from-warning to-accent" },
  { to: "/plus/local", label: "Add an Event", desc: "Share what's happening.", icon: CalendarDays, color: "from-accent to-primary" },
  { to: "/plus/local", label: "Post an Update", desc: "News, notices & campaigns.", icon: Megaphone, color: "from-primary-glow to-accent" },
] as const;

function PlusLayout() {
  const pathname = useRouterState({ select: s => s.location.pathname });
  const onIndex = pathname === "/plus";
  return (
    <MobileShell>
      <AppHeader title="Add to Hub" showCity={false} />
      {onIndex ? (
        <div className="space-y-3 px-5 pt-5">
          <p className="text-sm text-muted-foreground">What would you like to share with the Pembina Valley?</p>
          {tiles.map(t => (
            <Link key={t.label} to={t.to} className="block rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] active:scale-[0.99]">
              <div className="flex items-center gap-3">
                <span className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${t.color} text-primary-foreground shadow-[var(--shadow-pop)]`}>
                  <t.icon className="h-6 w-6" />
                </span>
                <div className="flex-1">
                  <p className="font-display text-base font-bold">{t.label}</p>
                  <p className="text-xs text-muted-foreground">{t.desc}</p>
                </div>
                <span className="text-muted-foreground">›</span>
              </div>
            </Link>
          ))}
          <Link to="/packages" className="mt-4 block overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-accent p-5 text-primary-foreground shadow-[var(--shadow-pop)]">
            <p className="text-[11px] font-bold uppercase tracking-wider opacity-80">Membership</p>
            <p className="mt-1 font-display text-lg font-extrabold">Compare packages</p>
            <p className="mt-0.5 text-xs opacity-90">Basic, Club & Club Plus — pick what fits your business.</p>
          </Link>
        </div>
      ) : (
        <Outlet />
      )}
    </MobileShell>
  );
}
