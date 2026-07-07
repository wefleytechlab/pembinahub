import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Check } from "lucide-react";
import { useState, type ReactNode } from "react";
import { useAppStore } from "@/lib/app-store";
import { categories, cities } from "@/lib/mock-data";

export const Route = createFileRoute("/plus/business")({
  component: AddBusiness,
});

const steps = ["Details", "Contact", "Hours", "Tier", "Done"] as const;

const tiers = [
  { key: "basic", name: "Basic", price: "Free", perks: ["Public listing", "Map pin", "Phone & directions"] },
  { key: "club", name: "Club", price: "$19.99/mo", perks: ["Everything in Basic", "Photo gallery", "Offers & posts", "Analytics"] },
  { key: "club_plus", name: "VIP", price: "$39.99/mo", perks: ["Everything in Club", "Featured badge", "Top-of-explore boost", "Seasonal campaigns"] },
];

const inp = "w-full rounded-xl border border-border bg-surface px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20";

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold text-foreground/80">{label}</span>
      {children}
    </label>
  );
}

function AddBusiness() {
  const nav = useNavigate();
  const { addSubmission } = useAppStore();
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    name: "", category: "Food", city: "Winkler", address: "", phone: "", website: "",
    hours: "Mon–Fri 9–6", description: "", tier: "basic",
  });

  const update = (k: string, v: string) => setData(d => ({ ...d, [k]: v }));

  const submit = () => {
    addSubmission("Business", data.name || "New business");
    setStep(steps.length - 1);
  };

  return (
    <div className="px-5 pt-4">
      <Link to="/plus" className="mb-3 inline-flex items-center gap-1 text-sm font-medium text-primary"><ArrowLeft className="h-4 w-4" /> Back</Link>

      <div className="mb-4 flex gap-1.5">
        {steps.map((_, i) => (
          <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= step ? "bg-primary" : "bg-muted"}`} />
        ))}
      </div>

      {step === 0 && (
        <div className="space-y-3">
          <Field label="Business name"><input className={inp} value={data.name} onChange={e => update("name", e.target.value)} placeholder="Prairie Bean Coffee Co." /></Field>
          <Field label="Category">
            <select className={inp} value={data.category} onChange={e => update("category", e.target.value)}>
              {categories.map(c => <option key={c.key}>{c.label}</option>)}
            </select>
          </Field>
          <Field label="Description"><textarea rows={4} className={inp} value={data.description} onChange={e => update("description", e.target.value)} placeholder="A short blurb…" /></Field>
        </div>
      )}
      {step === 1 && (
        <div className="space-y-3">
          <Field label="City"><select className={inp} value={data.city} onChange={e => update("city", e.target.value)}>{cities.map(c => <option key={c}>{c}</option>)}</select></Field>
          <Field label="Address"><input className={inp} value={data.address} onChange={e => update("address", e.target.value)} placeholder="245 Main St" /></Field>
          <Field label="Phone"><input className={inp} value={data.phone} onChange={e => update("phone", e.target.value)} placeholder="+1 204…" /></Field>
          <Field label="Website"><input className={inp} value={data.website} onChange={e => update("website", e.target.value)} placeholder="https://" /></Field>
        </div>
      )}
      {step === 2 && (
        <div className="space-y-3">
          <Field label="Hours (free text)"><textarea rows={4} className={inp} value={data.hours} onChange={e => update("hours", e.target.value)} /></Field>
          <Field label="Cover image">
            <label className="flex h-28 cursor-pointer items-center justify-center rounded-xl border border-dashed border-border bg-surface-muted text-sm text-muted-foreground">
              Tap to upload photo
              <input type="file" className="hidden" />
            </label>
          </Field>
        </div>
      )}
      {step === 3 && (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">Choose a tier — or skip for now.</p>
          {tiers.map(t => {
            const active = data.tier === t.key;
            return (
              <button key={t.key} onClick={() => update("tier", t.key)}
                className={`w-full rounded-2xl border p-4 text-left transition ${active ? "border-primary bg-primary/5 shadow-[var(--shadow-pop)]" : "border-border bg-card"}`}>
                <div className="flex items-center justify-between">
                  <p className="font-display text-base font-bold">{t.name}</p>
                  <span className="text-sm font-semibold text-primary">{t.price}</span>
                </div>
                <ul className="mt-2 space-y-1 text-xs text-foreground/80">
                  {t.perks.map(p => <li key={p} className="flex items-center gap-1"><Check className="h-3 w-3 text-success" /> {p}</li>)}
                </ul>
              </button>
            );
          })}
        </div>
      )}
      {step === 4 && (
        <div className="space-y-4 py-8 text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-success/15 text-success"><Check className="h-8 w-8" /></div>
          <h2 className="font-display text-xl font-bold">Thanks, your submission is under review</h2>
          <p className="text-sm text-muted-foreground">We'll notify you once it's approved by our team.</p>
          <button onClick={() => nav({ to: "/" })} className="mt-2 rounded-full bg-primary px-5 py-2.5 font-semibold text-primary-foreground">Back to Explore</button>
        </div>
      )}

      {step < 4 && (
        <div className="mt-6 flex gap-2">
          {step > 0 && (
            <button onClick={() => setStep(s => s - 1)} className="flex-1 rounded-xl border border-border bg-card py-3 font-semibold">Back</button>
          )}
          {step < 3 && (
            <button onClick={() => setStep(s => s + 1)} className="flex-[2] rounded-xl bg-primary py-3 font-semibold text-primary-foreground shadow-[var(--shadow-pop)]">Continue</button>
          )}
          {step === 3 && (
            <>
              <button onClick={submit} className="flex-1 rounded-xl border border-border bg-card py-3 font-semibold">Skip for now</button>
              <button onClick={submit} className="flex-[2] rounded-xl bg-primary py-3 font-semibold text-primary-foreground shadow-[var(--shadow-pop)]">Submit</button>
            </>
          )}
        </div>
      )}
      <div className="h-8" />
    </div>
  );
}
