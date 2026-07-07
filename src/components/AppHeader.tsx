import { Link } from "@tanstack/react-router";
import { Bell, ChevronDown, MapPin } from "lucide-react";
import { useAppStore } from "@/lib/app-store";
import { cities } from "@/lib/mock-data";
import { useState } from "react";

export function AppHeader({ title, showCity = true, showBell = true }: { title?: string; showCity?: boolean; showBell?: boolean }) {
  const { city, setCity } = useAppStore();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/85 px-5 pb-3 pt-5 backdrop-blur">
      <div className="flex items-center justify-between gap-2">
        <Link to="/" className="flex min-w-0 items-center gap-2">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary-glow text-primary-foreground shadow-[var(--shadow-pop)]">
            <span className="font-display text-lg font-bold">P</span>
          </span>
          <span className="truncate font-display text-lg font-bold tracking-tight">{title ?? "Pembina Hub"}</span>
        </Link>
        <div className="flex items-center gap-2">
          {showCity && (
            <div className="relative">
              <button
                onClick={() => setOpen(o => !o)}
                className="flex items-center gap-1 rounded-full border border-border bg-surface px-3 py-1.5 text-sm font-medium text-foreground shadow-sm"
              >
                <MapPin className="h-4 w-4 text-primary" />
                <span className="max-w-[110px] truncate">{city}</span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </button>
              {open && (
                <div className="absolute right-0 z-40 mt-2 w-52 overflow-hidden rounded-xl border border-border bg-popover shadow-[var(--shadow-pop)]">
                  {cities.map(c => (
                    <button
                      key={c}
                      onClick={() => { setCity(c); setOpen(false); }}
                      className={`block w-full px-4 py-2.5 text-left text-sm hover:bg-muted ${c === city ? "font-semibold text-primary" : ""}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
          {showBell && (
            <Link to="/notifications" className="relative grid h-9 w-9 place-items-center rounded-full border border-border bg-surface text-foreground" aria-label="Notifications">
              <Bell className="h-4 w-4" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive" />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
