// route: components/infirmerie/sortable-th.tsx
"use client"

import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react"
import { TableHead } from "@/components/ui/table"
import { cn } from "@/lib/data/utils"

export type SortDirection = "asc" | "desc" | null

type SortableThProps = {
  label: string
  sortKey: string
  activeKey: string | null
  direction: SortDirection
  onSort: (key: string) => void
  className?: string
}

/**
 * En-tête de colonne triable.
 * Reprend les flèches ↑↓ des maquettes Infirmerie.
 */
export function SortableTh({
  label,
  sortKey,
  activeKey,
  direction,
  onSort,
  className,
}: SortableThProps) {
  const isActive = activeKey === sortKey

  return (
    <TableHead className={cn("select-none", className)}>
      <button
        type="button"
        onClick={() => onSort(sortKey)}
        className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-slate-600 transition-colors hover:text-[#0d9488]"
      >
        {label}
        {isActive && direction === "asc" ? (
          <ArrowUp className="size-3.5 text-[#0d9488]" />
        ) : isActive && direction === "desc" ? (
          <ArrowDown className="size-3.5 text-[#0d9488]" />
        ) : (
          <ArrowUpDown className="size-3.5 text-slate-400" />
        )}
      </button>
    </TableHead>
  )
}