import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Check } from "lucide-react";
import { useState, type ReactNode } from "react";
import { useAppStore } from "@/lib/app-store";
import { businesses } from "@/lib/mock-data";

export const Route = createFileRoute("/plus/offer")({
  component: AddOffer,
});

const inp = "w-full rounded-xl border border-border bg-surface px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20";

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold text-foreground/80">{label}</span>
      {children}
    </label>
  );
}

function AddOffer() {
  const nav = useNavigate();
  const { addSubmission } = useAppStore();
  const [done, setDone] = useState(false);
  const [data, setData] = useState({ business: businesses[0].id, title: "", description: "", expires: "", terms: "" });
  const update = <K extends keyof typeof data>(k: K, v: (typeof data)[K]) => setData(d => ({ ...d, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    addSubmission("Offer", data.title || "New offer");
    setDone(true);
  };

  if (done) {
    return (
      <div className="space-y-4 px-8 py-12 text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-success/15 text-success"><Check className="h-8 w-8" /></div>
        <h2 className="font-display text-xl font-bold">Sent to review</h2>
        <p className="text-sm text-muted-foreground">Once approved, your offer will appear in Featured Offers.</p>
        <button onClick={() => nav({ to: "/" })} className="rounded-full bg-primary px-5 py-2.5 font-semibold text-primary-foreground">Done</button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-3 px-5 pt-4">
      <Link to="/plus" className="mb-1 inline-flex items-center gap-1 text-sm font-medium text-primary"><ArrowLeft className="h-4 w-4" /> Back</Link>
      <p className="text-sm text-muted-foreground">Only approved business owners can create offers.</p>
      <Field label="Your business">
        <select className={inp} value={data.business} onChange={e => update("business", e.target.value)}>
          {businesses.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
        </select>
      </Field>
      <Field label="Offer title"><input required className={inp} placeholder="15% OFF Your Order" value={data.title} onChange={e => update("title", e.target.value)} /></Field>
      <Field label="Description"><textarea required rows={3} className={inp} placeholder="Show this screen at checkout." value={data.description} onChange={e => update("description", e.target.value)} /></Field>
      <Field label="Expires"><input required type="date" className={inp} value={data.expires} onChange={e => update("expires", e.target.value)} /></Field>
      <Field label="Terms (optional)"><textarea rows={2} className={inp} value={data.terms} onChange={e => update("terms", e.target.value)} /></Field>
      <button type="submit" className="mt-3 w-full rounded-xl bg-primary py-3 font-semibold text-primary-foreground shadow-[var(--shadow-pop)]">Submit for review</button>
      <div className="h-6" />
    </form>
  );
}
