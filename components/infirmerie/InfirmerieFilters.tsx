// route: components/infirmerie/infirmerie-filters.tsx
"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export type InfirmerieFiltersState = {
  dateDebut: string
  dateFin: string
  service: string
  recherche: string
}

type InfirmerieFiltersProps = {
  value: InfirmerieFiltersState
  onChange: (patch: Partial<InfirmerieFiltersState>) => void
  services: string[]
}

/**
 * Barre de filtres réutilisée par les deux sous-modules Infirmerie.
 * Mise en page calquée sur les maquettes : Date début / Date fin / Services + recherche.
 */
export function InfirmerieFilters({
  value,
  onChange,
  services,
}: InfirmerieFiltersProps) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Date début */}
        <div className="space-y-1.5">
          <Label htmlFor="date-debut" className="text-sm font-semibold text-slate-600">
            Date début
          </Label>
          <Input
            id="date-debut"
            type="date"
            value={value.dateDebut}
            onChange={(e) => onChange({ dateDebut: e.target.value })}
            className="rounded-xl border-slate-200 focus-visible:ring-[#0d9488]"
          />
        </div>

        {/* Date fin */}
        <div className="space-y-1.5">
          <Label htmlFor="date-fin" className="text-sm font-semibold text-slate-600">
            Date fin
          </Label>
          <Input
            id="date-fin"
            type="date"
            value={value.dateFin}
            onChange={(e) => onChange({ dateFin: e.target.value })}
            className="rounded-xl border-slate-200 focus-visible:ring-[#0d9488]"
          />
        </div>

        {/* Services */}
        <div className="space-y-1.5">
          <Label className="text-sm font-semibold text-slate-600">Service</Label>
          <Select
            value={value.service}
            onValueChange={(v) => onChange({ service: v })}
          >
            <SelectTrigger className="rounded-xl border-slate-200 focus:ring-[#0d9488]">
              <SelectValue placeholder="Services" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les services</SelectItem>
              {services.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Recherche */}
      <div className="relative max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
        <Input
          value={value.recherche}
          onChange={(e) => onChange({ recherche: e.target.value })}
          placeholder="Rechercher un patient"
          className="rounded-xl border-slate-200 pl-9 focus-visible:ring-[#0d9488]"
        />
      </div>
    </div>
  )
}