// app/caisse/layout.tsx
// Route concernée : /caisse/* (layout commun à tout le module Caisse)
// Fond + sous-navigation. Couleurs via tokens et classes .caisse-tab du globals.css.

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ClipboardList, CheckCircle2, Wallet, Users } from "lucide-react";

const sousModules = [
  { href: "/caisse/paiement-en-attente", label: "Paiement en attente", icon: ClipboardList },
  { href: "/caisse/paiement-regle", label: "Paiement réglé", icon: CheckCircle2 },
  { href: "/caisse/bilan", label: "Caisse bilan", icon: Wallet },
  { href: "/caisse/vue-caissier", label: "Vue caissier", icon: Users },
];

export default function CaisseLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6">
      {/* Sous-navigation du module Caisse */}
      <nav className="mb-6 flex flex-wrap gap-2 rounded-2xl border border-border bg-card p-2 shadow-sm">
        {sousModules.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link key={href} href={href} className={`caisse-tab ${active ? "active" : ""}`}>
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="space-y-5">{children}</div>
    </div>
  );
}