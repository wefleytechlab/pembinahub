import { Cloud, Sun, Wind } from "lucide-react";

export function WeatherStrip({ city }: { city: string }) {
  // Deterministic mock — keeps SSR/client consistent.
  return (
    <div className="px-5 pt-4">
      <div className="flex items-center justify-between overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-sky-50 to-white p-3 shadow-sm dark:from-slate-900 dark:to-slate-800">
        <div className="flex items-center gap-3">
          <div className="relative grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-amber-300 to-orange-500 text-white shadow-[var(--shadow-pop)]">
            <Sun className="h-6 w-6" />
            <Cloud className="absolute -bottom-1 -right-1 h-4 w-4 fill-white text-white" />
          </div>
          <div>
            <p className="font-display text-lg font-extrabold leading-none">24°C · Mostly sunny</p>
            <p className="text-[11px] text-muted-foreground">{city} · perfect for a patio coffee</p>
          </div>
        </div>
        <div className="hidden text-right text-[11px] text-muted-foreground sm:block">
          <p className="inline-flex items-center gap-1"><Wind className="h-3 w-3" /> 12 km/h NW</p>
          <p>UV index 6</p>
        </div>
      </div>
    </div>
  );
}
