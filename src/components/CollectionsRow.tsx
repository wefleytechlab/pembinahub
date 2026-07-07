import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { collections } from "@/lib/mock-data";

export function CollectionsRow() {
  return (
    <div className="flex gap-3 overflow-x-auto px-5 pb-2 scrollbar-none">
      {collections.map(c => (
        <Link
          key={c.id}
          to="/"
          className="group relative block h-44 w-72 shrink-0 overflow-hidden rounded-3xl border border-border shadow-[var(--shadow-card)] active:scale-[0.99]"
        >
          <img src={c.image} alt={c.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition group-hover:scale-105" />
          <div className={`absolute inset-0 bg-gradient-to-br ${c.tint}`} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
          <span className="absolute right-3 top-3 text-3xl drop-shadow">{c.emoji}</span>
          <div className="absolute inset-x-4 bottom-4 text-white">
            <p className="text-[10px] font-bold uppercase tracking-wider text-white/85">Collection · {c.businessIds.length} spots</p>
            <h3 className="mt-0.5 font-display text-xl font-extrabold leading-tight drop-shadow">{c.title}</h3>
            <p className="text-xs text-white/90">{c.subtitle}</p>
            <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold backdrop-blur">
              Open list <ArrowRight className="h-3 w-3" />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
