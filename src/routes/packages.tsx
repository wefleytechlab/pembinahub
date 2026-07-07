import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Crown, Sparkles, Star } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";
import { AppHeader } from "@/components/AppHeader";

export const Route = createFileRoute("/packages")({
  head: () => ({ meta: [{ title: "Packages — Pembina Hub" }] }),
  component: PackagesPage,
});

const tiers = [
  {
    key: "basic", name: "Basic", price: "Free", tag: "Always free",
    icon: Sparkles, color: "from-muted to-secondary text-foreground",
    perks: [
      "Standard business listing",
      "Category & contact info",
      "Address & map",
      "Up to 5 photos",
      "1 active offer",
      "1 event promotion / month",
      "Email support",
    ],
    cta: "Continue free",
  },
  {
    key: "club", name: "Club", price: "$19.99", per: "/month",
    tag: "Most popular", popular: true,
    icon: Star, color: "from-primary to-primary-glow text-primary-foreground",
    perks: [
      "Everything in Basic",
      "Up to 15 photos",
      "Featured Club badge",
      "Priority in search",
      "3 active offers",
      "3 event promotions / month",
      "1 campaign / month",
      "Basic analytics",
      "50% OFF add-ons",
    ],
    cta: "Start Club",
  },
  {
    key: "club_plus", name: "VIP / Club Plus", price: "$39.99", per: "/month",
    tag: "Maximum visibility",
    icon: Crown, color: "from-accent to-primary text-accent-foreground",
    perks: [
      "Everything in Club",
      "Up to 30 photos",
      "VIP featured badge",
      "Top of search results",
      "Top category placement",
      "Unlimited offers",
      "Unlimited event promotions",
      "2 campaigns / month",
      "Advanced analytics",
      "70–100% OFF add-ons",
      "Priority support (fast track)",
    ],
    cta: "Go VIP",
  },
];

function PackagesPage() {
  return (
    <MobileShell>
      <AppHeader title="Packages" showCity={false} />
      <div className="px-5 pt-4">
        <p className="text-sm text-muted-foreground">All packages include core listing visibility — help locals find you.</p>
      </div>
      <div className="space-y-3 px-5 pt-4">
        {tiers.map(t => (
          <div key={t.key} className={`relative overflow-hidden rounded-3xl border ${t.popular ? "border-primary" : "border-border"} bg-card p-5 shadow-[var(--shadow-card)]`}>
            {t.popular && (
              <span className="absolute right-4 top-4 rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
                Most popular
              </span>
            )}
            <div className="flex items-center gap-3">
              <span className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${t.color} shadow-[var(--shadow-pop)]`}>
                <t.icon className="h-6 w-6" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t.tag}</p>
                <h2 className="font-display text-xl font-extrabold">{t.name}</h2>
              </div>
            </div>
            <p className="mt-3 font-display text-3xl font-black">
              {t.price}<span className="text-base font-semibold text-muted-foreground">{t.per ?? ""}</span>
            </p>
            <ul className="mt-3 space-y-1.5">
              {t.perks.map(p => (
                <li key={p} className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <button className={`mt-5 w-full rounded-xl py-3 font-bold ${t.popular ? "bg-primary text-primary-foreground shadow-[var(--shadow-pop)]" : "border border-border bg-card"}`}>
              {t.cta}
            </button>
          </div>
        ))}
        <div className="rounded-2xl border border-dashed border-border bg-surface-muted p-4 text-center text-xs text-muted-foreground">
          Cancel anytime. Upgrade, downgrade, or switch plans whenever you want.
        </div>
        <Link to="/plus" className="block py-2 text-center text-sm font-medium text-primary">← Back to Add</Link>
      </div>
      <div className="h-6" />
    </MobileShell>
  );
}
