import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Check } from "lucide-react";
import { useState, type ReactNode } from "react";
import { useAppStore } from "@/lib/app-store";

export const Route = createFileRoute("/plus/local")({
  component: AddLocal,
});

const types = ["event", "campaign", "notice"] as const;
const inp = "w-full rounded-xl border border-border bg-surface px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20";

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold text-foreground/80">{label}</span>
      {children}
    </label>
  );
}

function AddLocal() {
  const nav = useNavigate();
  const { addSubmission } = useAppStore();
  const [done, setDone] = useState(false);
  const [data, setData] = useState({
    type: "event" as typeof types[number],
    title: "", when: "", location: "", description: "",
  });
  const update = <K extends keyof typeof data>(k: K, v: (typeof data)[K]) => setData(d => ({ ...d, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    addSubmission(data.type, data.title || "New local item");
    setDone(true);
  };

  if (done) {
    return (
      <div className="space-y-4 px-8 py-12 text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-success/15 text-success"><Check className="h-8 w-8" /></div>
        <h2 className="font-display text-xl font-bold">Sent to review</h2>
        <p className="text-sm text-muted-foreground">Our admins will check it shortly and publish it to Local.</p>
        <button onClick={() => nav({ to: "/local" })} className="rounded-full bg-primary px-5 py-2.5 font-semibold text-primary-foreground">Go to Local</button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-3 px-5 pt-4">
      <Link to="/plus" className="mb-1 inline-flex items-center gap-1 text-sm font-medium text-primary"><ArrowLeft className="h-4 w-4" /> Back</Link>

      <div className="grid grid-cols-3 gap-2">
        {types.map(t => (
          <button key={t} type="button" onClick={() => update("type", t)}
            className={`rounded-xl border px-2 py-2 text-sm font-semibold capitalize ${data.type === t ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card"}`}>
            {t}
          </button>
        ))}
      </div>

      <Field label="Title"><input required className={inp} value={data.title} onChange={e => update("title", e.target.value)} placeholder="Harvest Night Market" /></Field>
      <Field label="Date & time"><input required type="datetime-local" className={inp} value={data.when} onChange={e => update("when", e.target.value)} /></Field>
      <Field label="Location"><input required className={inp} value={data.location} onChange={e => update("location", e.target.value)} placeholder="Bethel Heritage Park" /></Field>
      <Field label="Description"><textarea rows={4} required className={inp} value={data.description} onChange={e => update("description", e.target.value)} /></Field>
      <Field label="Cover image">
        <label className="flex h-28 cursor-pointer items-center justify-center rounded-xl border border-dashed border-border bg-surface-muted text-sm text-muted-foreground">
          Tap to upload photo
          <input type="file" className="hidden" />
        </label>
      </Field>

      <button type="submit" className="mt-3 w-full rounded-xl bg-primary py-3 font-semibold text-primary-foreground shadow-[var(--shadow-pop)]">Submit for review</button>
      <div className="h-6" />
    </form>
  );
}
