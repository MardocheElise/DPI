// route: components/infirmerie/infirmerie-header.tsx
"use client"

import { Plus, RefreshCw } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

type InfirmerieHeaderProps = {
  title: string
  onRefresh?: () => void
  refreshing?: boolean
}

/**
 * Bandeau d'en-tête du module Infirmerie.
 * Fond "sky" PinHome (#DEF6FF), icône médicale cyan, bouton Rafraîchir coral.
 */
export function InfirmerieHeader({
  title,
  onRefresh,
  refreshing = false,
}: InfirmerieHeaderProps) {
  const router = useRouter()
  const handleRefresh = onRefresh ?? (() => router.refresh())
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl bg-[#DEF6FF] px-5 py-4 sm:px-6">
      <div className="flex items-center gap-3">
        <span className="flex size-9 items-center justify-center rounded-xl bg-white/70 text-[#0CB2DA] ring-1 ring-[#0CB2DA]/20">
          {/* croix médicale */}
          <Plus className="size-5 stroke-[3]" />
        </span>
        <h1 className="text-lg font-bold text-[#1f5f73] sm:text-xl">{title}</h1>
      </div>

      <Button
        type="button"
        onClick={handleRefresh}
        disabled={refreshing}
        className="gap-2 rounded-xl bg-[#F26161] px-4 font-semibold text-white shadow-sm hover:bg-[#e04f4f] disabled:opacity-70"
      >
        Rafraîchir
        <RefreshCw className={refreshing ? "size-4 animate-spin" : "size-4"} />
      </Button>
    </div>
  )
}