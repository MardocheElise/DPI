// components/caisse/caisse-page-header.tsx
// Route concernée : composant partagé — utilisé par toutes les routes /caisse/*
// En-tête bleu (classe .caisse-header du globals.css) + bouton Rafraîchir (shadcn Button).

"use client";

import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CaissePageHeaderProps {
  title: string;
  icon: React.ReactNode;
  onRefresh?: () => void;
  refreshing?: boolean;
  actions?: React.ReactNode;
}

export function CaissePageHeader({
  title,
  icon,
  onRefresh,
  refreshing,
  actions,
}: CaissePageHeaderProps) {
  return (
    <div className="caisse-header">
      <div className="flex items-center gap-3">
        <span className="caisse-header__icon">{icon}</span>
        <h1 className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-2">
        {actions}
        {onRefresh && (
          <Button onClick={onRefresh} disabled={refreshing}>
            <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
            Rafraîchir
          </Button>
        )}
      </div>
    </div>
  );
}