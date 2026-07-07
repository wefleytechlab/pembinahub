import { Link } from "@tanstack/react-router";
import { ArrowRight, MapPin, Sparkles } from "lucide-react";

export function HeroBanner({ city }: { city: string }) {
  return (
    <div className="px-5 pt-4">
      <Link
        to="/local"
        className="relative block overflow-hidden rounded-3xl shadow-[var(--shadow-pop)] active:scale-[0.99]"
      >
        <img
          src="https://picsum.photos/seed/pembina-hero/1200/700"
          alt="Pembina Valley sunset"
          loading="eager"
          className="h-56 w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/55 to-accent/70 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <svg className="absolute inset-0 h-full w-full opacity-25" preserveAspectRatio="none" viewBox="0 0 400 200" aria-hidden>
          <defs>
            <pattern id="dots" width="14" height="14" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="white" />
            </pattern>
          </defs>
          <rect width="400" height="200" fill="url(#dots)" />
        </svg>

        <div className="absolute inset-0 flex flex-col justify-between p-5 text-white">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur">
              <Sparkles className="h-3 w-3" /> Featured this week
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-1 text-[10px] font-semibold backdrop-blur">
              <MapPin className="h-3 w-3" /> {city}
            </span>
          </div>
          <div>
            <h2 className="font-display text-2xl font-extrabold leading-tight drop-shadow">
              Summer Delights in {city}
            </h2>
            <p className="mt-1 max-w-[280px] text-sm text-white/90">
              Hand-picked offers, fresh events, and what's open right now.
            </p>
            <div className="mt-3 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-primary shadow">
                Explore happenings <ArrowRight className="h-3.5 w-3.5" />
              </span>
              <span className="inline-flex -space-x-2">
                {["🌻","🍦","🎶","🍕"].map((e,i) => (
                  <span key={i} className="grid h-7 w-7 place-items-center rounded-full border-2 border-white bg-white/95 text-sm shadow-sm">{e}</span>
                ))}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
