// components/caisse/data-toolbar.tsx
// Route concernée : composant partagé — utilisé par /caisse/paiement-en-attente et /caisse/paiement-regle
// Sélecteur de colonnes + recherche. Couleurs via tokens du globals.css (shadcn).

"use client";

import { ChevronDown, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface ColumnOption {
  key: string;
  label: string;
}

interface DataToolbarProps {
  columns: ColumnOption[];
  visible: Record<string, boolean>;
  onToggle: (key: string) => void;
  search: string;
  onSearch: (value: string) => void;
  searchPlaceholder?: string;
}

export function DataToolbar({
  columns,
  visible,
  onToggle,
  search,
  onSearch,
  searchPlaceholder = "Rechercher un paiement",
}: DataToolbarProps) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Sélecteur de colonnes */}
      <DropdownMenu>
        <DropdownMenuTrigger className="flex w-full items-center justify-between gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-muted-foreground hover:border-primary/40 sm:w-72">
          Sélectionner colonne(s) à afficher
          <ChevronDown className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-64">
          <DropdownMenuLabel>Colonnes</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {columns.map((col) => (
            <DropdownMenuCheckboxItem
              key={col.key}
              checked={visible[col.key]}
              onCheckedChange={() => onToggle(col.key)}
            >
              {col.label}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Recherche */}
      <div className="relative w-full sm:w-80">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder={searchPlaceholder}
          className="pl-9"
        />
      </div>
    </div>
  );
}