import { useAppStore } from "@/lib/app-store";
import { cities } from "@/lib/mock-data";
import { MapPin, Sparkles } from "lucide-react";

export function Onboarding() {
  const { hydrated, onboarded, setOnboarded, setCity } = useAppStore();
  if (!hydrated || onboarded) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-foreground/40 backdrop-blur-sm sm:items-center">
      <div className="w-full max-w-[440px] rounded-t-3xl bg-background p-6 shadow-2xl sm:rounded-3xl">
        <div className="mb-4 flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary to-primary-glow text-primary-foreground shadow-[var(--shadow-pop)]">
            <Sparkles className="h-6 w-6" />
          </span>
          <div>
            <h2 className="font-display text-xl font-extrabold">Welcome to Pembina Hub</h2>
            <p className="text-xs text-muted-foreground">Local discovery for the Pembina Valley.</p>
          </div>
        </div>
        <p className="mb-3 text-sm font-semibold">Pick your area</p>
        <div className="grid gap-2">
          {cities.map(c => (
            <button
              key={c}
              onClick={() => { setCity(c); setOnboarded(true); }}
              className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 text-left transition active:scale-[0.99] hover:border-primary"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                <MapPin className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display font-bold">{c}</p>
                <p className="text-xs text-muted-foreground">
                  {c === "Winkler" ? "Downtown, Main St & beyond" : c === "Morden" ? "Stephen St & Thornhill" : "Plum Coulee, Schanzenfeld & more"}
                </p>
              </div>
            </button>
          ))}
        </div>
        <button onClick={() => setOnboarded(true)} className="mt-4 w-full text-center text-xs font-semibold text-muted-foreground">
          Skip for now
        </button>
      </div>
    </div>
  );
}
