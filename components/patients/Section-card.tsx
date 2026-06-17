// Route: partagé par /accueil/patients et /accueil/paiements
// Carte de section façon PinHome : en-tête teinté sky + titre avec icône, zone d'actions à droite.

import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionCardProps {
  icon: React.ReactNode;
  title: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function SectionCard({
  icon,
  title,
  actions,
  children,
  className,
}: SectionCardProps) {
  return (
    <section
      className={cn(
        "overflow-hidden rounded-2xl border border-brand-sky-soft bg-card shadow-sm",
        className
      )}
    >
      {/* En-tête : dégradé sky doux */}
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-brand-sky-soft bg-brand-sky-soft/45 px-5 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
            {icon}
          </span>
          <h2 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
            {title}
          </h2>
        </div>
        {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
      </header>

      <div className="p-4 sm:p-5">{children}</div>
    </section>
  );
}