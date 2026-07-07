import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell, CheckCircle2, Megaphone, Sparkles } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";
import { AppHeader } from "@/components/AppHeader";

export const Route = createFileRoute("/notifications")({
  head: () => ({ meta: [{ title: "Notifications — Pembina Hub" }] }),
  component: NotificationsPage,
});

const notifications = [
  { id: "n1", icon: CheckCircle2, color: "text-success", title: "Your business listing is approved", body: "Prairie Bean Coffee Co. is now live on Pembina Hub.", time: "2h ago" },
  { id: "n2", icon: Sparkles, color: "text-primary", title: "New offer near you", body: "Bloom & Petal: $10 OFF bouquets this week.", time: "Yesterday" },
  { id: "n3", icon: Megaphone, color: "text-accent", title: "Harvest Night Market starts Friday", body: "40+ vendors at Bethel Heritage Park.", time: "2 days ago" },
  { id: "n4", icon: Bell, color: "text-warning", title: "Reminder: claim your business", body: "Your invite link expires in 5 days.", time: "3 days ago" },
];

function NotificationsPage() {
  return (
    <MobileShell>
      <AppHeader title="Notifications" showCity={false} showBell={false} />
      <ul className="divide-y divide-border px-5 pt-2">
        {notifications.map(n => (
          <li key={n.id} className="flex gap-3 py-4">
            <span className={`mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-muted ${n.color}`}>
              <n.icon className="h-4 w-4" />
            </span>
            <div className="flex-1">
              <p className="text-sm font-semibold">{n.title}</p>
              <p className="text-xs text-muted-foreground">{n.body}</p>
              <p className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">{n.time}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="px-5 pt-4">
        <Link to="/" className="text-sm font-medium text-primary">← Back to Explore</Link>
      </div>
      <div className="h-6" />
    </MobileShell>
  );
}
