// route: components/infirmerie/patients-attente-view.tsx
"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Activity, RefreshCcw } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatDateHeureFr, PatientAttente, PATIENTS_ATTENTE } from "@/lib/dataInfirmerie/infirmerie"
import { InfirmerieFilters, InfirmerieFiltersState } from "./InfirmerieFilters"
import { SortableTh, SortDirection } from "./SortableTH"


type SortKey = keyof Pick<
  PatientAttente,
  "referencePaiement" | "patientNom" | "service" | "date" | "motif" | "typeFiche"
>

const SERVICES = ["GENERALE", "GYNECOLOGIE", "PEDIATRIE", "CARDIOLOGIE", "DERMATOLOGIE"]

export function PatientsAttenteView() {
  const router = useRouter()

  const [filters, setFilters] = useState<InfirmerieFiltersState>({
    dateDebut: "",
    dateFin: "",
    service: "all",
    recherche: "",
  })
  const [sortKey, setSortKey] = useState<SortKey | null>("date")
  const [direction, setDirection] = useState<SortDirection>("asc")

  function handleSort(key: string) {
    if (sortKey === key) {
      setDirection((d) => (d === "asc" ? "desc" : "asc"))
    } else {
      setSortKey(key as SortKey)
      setDirection("asc")
    }
  }

  function patchFilters(patch: Partial<InfirmerieFiltersState>) {
    setFilters((f) => ({ ...f, ...patch }))
  }

  const rows = useMemo(() => {
    // TODO: déplacer le filtrage/tri côté API quand les données seront réelles
    let data = [...PATIENTS_ATTENTE]

    if (filters.service !== "all") {
      data = data.filter((p) => p.service === filters.service)
    }
    if (filters.recherche.trim()) {
      const q = filters.recherche.trim().toLowerCase()
      data = data.filter(
        (p) =>
          p.patientNom.toLowerCase().includes(q) ||
          p.patientCode.toLowerCase().includes(q) ||
          p.referencePaiement.toLowerCase().includes(q),
      )
    }
    if (filters.dateDebut) {
      data = data.filter((p) => p.date >= filters.dateDebut)
    }
    if (filters.dateFin) {
      data = data.filter((p) => p.date <= `${filters.dateFin}T23:59:59`)
    }

    if (sortKey) {
      data.sort((a, b) => {
        const va = String(a[sortKey]).toLowerCase()
        const vb = String(b[sortKey]).toLowerCase()
        const cmp = va < vb ? -1 : va > vb ? 1 : 0
        return direction === "asc" ? cmp : -cmp
      })
    }
    return data
  }, [filters, sortKey, direction])

  return (
    <div className="space-y-6">
      <InfirmerieFilters value={filters} onChange={patchFilters} services={SERVICES} />

      {/* Compteur */}
      <p className="text-2xl font-semibold text-slate-700">
        <span className="text-[#F04444]">{rows.length}</span>{" "}
        <span className="text-xl font-normal">patients en attente</span>
      </p>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-100">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/60 hover:bg-slate-50/60">
              <SortableTh label="Référence paiement" sortKey="referencePaiement" activeKey={sortKey} direction={direction} onSort={handleSort} />
              <SortableTh label="Patient" sortKey="patientNom" activeKey={sortKey} direction={direction} onSort={handleSort} />
              <SortableTh label="Service" sortKey="service" activeKey={sortKey} direction={direction} onSort={handleSort} />
              <SortableTh label="Date" sortKey="date" activeKey={sortKey} direction={direction} onSort={handleSort} />
              <SortableTh label="Motif" sortKey="motif" activeKey={sortKey} direction={direction} onSort={handleSort} />
              <SortableTh label="Type fiche" sortKey="typeFiche" activeKey={sortKey} direction={direction} onSort={handleSort} />
              <TableHead className="text-right text-xs font-bold uppercase tracking-wide text-slate-600">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="py-10 text-center text-slate-400">
                  Aucun patient en attente.
                </TableCell>
              </TableRow>
            ) : (
              rows.map((p) => (
                <TableRow
                  key={p.id}
                  onClick={() => router.push(`/infirmerie/constante/${p.id}`)} // TODO: route fiche de constantes
                  className="cursor-pointer transition-colors hover:bg-[#DEF6FF]/40"
                >
                  <TableCell className="font-medium text-slate-700">
                    {p.referencePaiement}
                  </TableCell>

                  <TableCell>
                    <div className="font-semibold uppercase text-slate-800">
                      {p.patientNom}
                    </div>
                    <div className="text-sm font-bold text-slate-400">
                      ({p.patientCode})
                    </div>
                  </TableCell>

                  <TableCell className="font-medium text-slate-700">
                    {p.service}
                  </TableCell>

                  <TableCell className="whitespace-nowrap text-slate-600">
                    {formatDateHeureFr(p.date)}
                  </TableCell>

                  <TableCell className="max-w-[220px] text-slate-600">
                    {p.motif}
                  </TableCell>

                  <TableCell>
                    <Badge className="rounded-md bg-[#9BD6DC]/30 font-medium text-[#0d9488] hover:bg-[#9BD6DC]/30">
                      {p.typeFiche}
                    </Badge>
                  </TableCell>

                  {/* Actions — stopPropagation pour ne pas déclencher la navigation de la ligne */}
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        size="sm"
                        onClick={() => router.push(`/infirmerie/constante/${p.id}`)} // TODO
                        className="gap-2 rounded-lg bg-[#6367EF] font-semibold text-white hover:bg-[#5054e0]"
                      >
                        <Activity className="size-4" />
                        constante
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => {
                          // TODO: ouvrir le flux de réorientation
                        }}
                        className="gap-2 rounded-lg bg-[#F04444] font-semibold text-white hover:bg-[#dd3a3a]"
                      >
                        <RefreshCcw className="size-4" />
                        réorientation
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}