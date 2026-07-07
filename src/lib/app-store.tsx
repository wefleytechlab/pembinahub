import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { City } from "./mock-data";

type SavedKind = "business" | "offer" | "event" | "campaign" | "notice";
export interface SavedItem { kind: SavedKind; id: string; saved_at: string }

interface AppState {
  city: City;
  setCity: (c: City) => void;
  saved: SavedItem[];
  isSaved: (kind: SavedKind, id: string) => boolean;
  toggleSave: (kind: SavedKind, id: string) => void;
  submissions: { type: string; title: string; at: string; status?: string }[];
  addSubmission: (type: string, title: string) => void;
  merchant: boolean;
  setMerchant: (m: boolean) => void;
  onboarded: boolean;
  setOnboarded: (v: boolean) => void;
  hydrated: boolean;
}

const Ctx = createContext<AppState | null>(null);
const LS = "pembina-hub-state-v2";

export function AppStoreProvider({ children }: { children: ReactNode }) {
  const [city, setCityState] = useState<City>("Winkler");
  const [saved, setSaved] = useState<SavedItem[]>([]);
  const [submissions, setSubs] = useState<{ type: string; title: string; at: string; status?: string }[]>([]);
  const [merchant, setMerchant] = useState(false);
  const [onboarded, setOnboarded] = useState(true); // assume true on SSR; flip on client
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(LS) : null;
      if (raw) {
        const p = JSON.parse(raw);
        if (p.city) setCityState(p.city);
        if (Array.isArray(p.saved)) setSaved(p.saved);
        if (Array.isArray(p.submissions)) setSubs(p.submissions);
        if (typeof p.merchant === "boolean") setMerchant(p.merchant);
        setOnboarded(p.onboarded !== false);
      } else {
        setOnboarded(false);
      }
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem(LS, JSON.stringify({ city, saved, submissions, merchant, onboarded })); } catch {}
  }, [city, saved, submissions, merchant, onboarded, hydrated]);

  const value = useMemo<AppState>(() => ({
    city,
    setCity: setCityState,
    saved,
    isSaved: (k, id) => saved.some(s => s.kind === k && s.id === id),
    toggleSave: (k, id) => setSaved(prev =>
      prev.some(s => s.kind === k && s.id === id)
        ? prev.filter(s => !(s.kind === k && s.id === id))
        : [{ kind: k, id, saved_at: new Date().toISOString() }, ...prev]
    ),
    submissions,
    addSubmission: (type, title) => setSubs(prev => [{ type, title, at: new Date().toISOString(), status: "Under review" }, ...prev]),
    merchant,
    setMerchant,
    onboarded,
    setOnboarded,
    hydrated,
  }), [city, saved, submissions, merchant, onboarded, hydrated]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useAppStore = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error("AppStoreProvider missing");
  return v;
};
