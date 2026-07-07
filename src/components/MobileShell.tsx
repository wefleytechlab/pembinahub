import type { ReactNode } from "react";
import { BottomNav } from "./BottomNav";

export function MobileShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background">
      <div className="relative mx-auto flex min-h-screen max-w-[440px] flex-col bg-background shadow-2xl md:my-6 md:min-h-[860px] md:rounded-[2rem] md:overflow-hidden md:ring-1 md:ring-border">
        <main className="flex-1 overflow-y-auto pb-28">{children}</main>
        <BottomNav />
      </div>
    </div>
  );
}
