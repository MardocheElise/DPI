// components/caisse/status-badge.tsx
// Route concernée : composant partagé — utilisé par les routes /caisse/* (listes & bilan)
// S'appuie uniquement sur les classes définies dans app/globals.css (.badge-approved, …).

import { cn } from "@/lib/utils";

type Variant = "success" | "pending" | "danger" | "info" | "neutral";

const classMap: Record<Variant, string> = {
  success: "badge-approved",
  pending: "badge-pending",
  danger: "badge-danger",
  info: "badge-info",
  neutral: "badge-neutral",
};

export function StatusBadge({
  variant = "neutral",
  children,
  className,
}: {
  variant?: Variant;
  children: React.ReactNode;
  className?: string;
}) {
  return <span className={cn(classMap[variant], className)}>{children}</span>;
}