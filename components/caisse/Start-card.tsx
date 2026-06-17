// components/caisse/stat-card.tsx
// Route concernée : composant partagé — utilisé par /caisse/vue-caissier et /caisse/bilan
// Carte chiffre-clé avec barre latérale colorée. Couleurs = tokens du globals.css.

import { cn } from "@/lib/utils";

type Accent = "teal" | "green" | "coral" | "yellow";

const accents: Record<Accent, { bar: string; value: string }> = {
  teal: { bar: "bg-teal-primary", value: "text-teal-primary" },
  green: { bar: "bg-success", value: "text-success" },
  coral: { bar: "bg-danger", value: "text-danger" },
  yellow: { bar: "bg-yellow-accent", value: "text-warning" },
};

export function StatCard({
  label,
  value,
  accent = "teal",
  hint,
}: {
  label: string;
  value: React.ReactNode;
  accent?: Accent;
  hint?: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm">
      <span className={cn("absolute left-0 top-0 h-full w-1.5", accents[accent].bar)} />
      <p className="text-sm font-semibold text-foreground">{label}</p>
      <p className={cn("mt-3 text-4xl font-bold tracking-tight", accents[accent].value)}>
        {value}
      </p>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}