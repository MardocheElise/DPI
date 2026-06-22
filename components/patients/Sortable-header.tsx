// Route: partagé par /accueil/patients et /accueil/paiements
// En-tête de colonne cliquable avec indicateur de tri (↑↓), façon template.

"use client";

import { ArrowUpDown, ArrowDown, ArrowUp, Filter } from "lucide-react";
import { cn } from "@/lib/data/utils";

export type SortDir = "asc" | "desc" | null;

interface SortableHeaderProps {
  label: string;
  active?: boolean;
  direction?: SortDir;
  onSort?: () => void;
  /** variante "filter" pour afficher une icône entonnoir (colonnes filtrables) */
  variant?: "sort" | "filter";
  className?: string;
}

export function SortableHeader({
  label,
  active = false,
  direction = null,
  onSort,
  variant = "sort",
  className,
}: SortableHeaderProps) {
  const Icon =
    variant === "filter"
      ? Filter
      : active && direction === "asc"
        ? ArrowUp
        : active && direction === "desc"
          ? ArrowDown
          : ArrowUpDown;

  return (
    <button
      type="button"
      onClick={onSort}
      className={cn(
        "flex items-center gap-1.5 text-sm font-semibold text-foreground transition-colors hover:text-primary",
        active && "text-primary",
        className
      )}
    >
      {label}
      <Icon className="h-3.5 w-3.5 opacity-70" />
    </button>
  );
}