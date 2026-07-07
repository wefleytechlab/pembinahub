import { Quote } from "lucide-react";
import { testimonials } from "@/lib/mock-data";

export function CommunityVoices() {
  return (
    <div className="flex gap-3 overflow-x-auto px-5 pb-2 scrollbar-none">
      {testimonials.map(t => (
        <div
          key={t.id}
          className="relative w-72 shrink-0 overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-primary/5 via-card to-accent/5 p-4 shadow-[var(--shadow-card)]"
        >
          <Quote className="absolute -right-2 -top-2 h-16 w-16 text-primary/10" />
          <p className="relative font-display text-sm font-semibold leading-snug text-foreground/90">"{t.quote}"</p>
          <div className="relative mt-3 flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-primary to-accent text-lg text-primary-foreground">
              {t.emoji}
            </div>
            <div>
              <p className="text-xs font-bold leading-none">{t.name}</p>
              <p className="text-[11px] text-muted-foreground">{t.city}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
