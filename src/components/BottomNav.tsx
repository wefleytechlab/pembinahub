import { Link, useRouterState } from "@tanstack/react-router";
import { Compass, CalendarDays, Plus, Bookmark, User } from "lucide-react";
import type { ComponentType } from "react";

const tabs: { to: string; label: string; icon: ComponentType<{ className?: string }>; primary?: boolean }[] = [
  { to: "/", label: "Explore", icon: Compass },
  { to: "/local", label: "Local", icon: CalendarDays },
  { to: "/plus", label: "Add", icon: Plus, primary: true },
  { to: "/saved", label: "Saved", icon: Bookmark },
  { to: "/me", label: "Me", icon: User },
];

export function BottomNav() {
  const pathname = useRouterState({ select: s => s.location.pathname });
  return (
    <nav className="pointer-events-none absolute bottom-0 left-0 right-0 z-40 px-3 pb-3">
      <ul className="pointer-events-auto grid grid-cols-5 items-end gap-1 rounded-2xl border border-border bg-card/95 px-2 py-2 shadow-[var(--shadow-card)] backdrop-blur">
        {tabs.map(t => {
          const active = t.to === "/" ? pathname === "/" : pathname.startsWith(t.to);
          const Icon = t.icon;
          if (t.primary) {
            return (
              <li key={t.to} className="flex justify-center">
                <Link
                  to={t.to}
                  className="-mt-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-pop)] ring-4 ring-background transition active:scale-95"
                  aria-label="Add"
                >
                  <Icon className="h-6 w-6" />
                </Link>
              </li>
            );
          }
          return (
            <li key={t.to}>
              <Link
                to={t.to}
                className={`flex flex-col items-center gap-1 rounded-xl px-2 py-1.5 text-[11px] font-medium transition ${
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className={`h-5 w-5 ${active ? "scale-110" : ""}`} />
                {t.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
