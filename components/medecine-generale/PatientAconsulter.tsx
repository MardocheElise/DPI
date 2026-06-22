// components/medecine-generale/patients-a-consulter-table.tsx
// Tableau interactif des patients à consulter : filtres (dates + recherche),
// tri par colonne, rafraîchissement, et actions Transférer / Consulter / Terminer.
"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, RefreshCw, Search, Send, Stethoscope, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { formatDateHeureFr, type PatientAConsulter } from "@/lib/data/consultations";
import { EtatBadge, SortConfig, SortHeader, TempBadge, TypeBadge } from "./ConsultationUi";

interface Props {
  data: PatientAConsulter[];
}

export function PatientsAConsulterTable({ data }: Props) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [dateDebut, setDateDebut] = useState("2026-06-01");
  const [dateFin, setDateFin] = useState("2026-06-17");
  const [sort, setSort] = useState<SortConfig | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const handleSort = (key: string) =>
    setSort((prev) =>
      prev?.key === key
        ? { key, dir: prev.dir === "asc" ? "desc" : "asc" }
        : { key, dir: "asc" },
    );

  const handleRefresh = () => {
    setRefreshing(true);
    // TODO: relancer l'appel API des patients à consulter.
    setTimeout(() => setRefreshing(false), 700);
  };

  const rows = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = data.filter(
      (p) =>
        !q ||
        `${p.nom} ${p.prenom}`.toLowerCase().includes(q) ||
        p.numeroCarte.toLowerCase().includes(q),
    );

    if (sort) {
      const dir = sort.dir === "asc" ? 1 : -1;
      list = [...list].sort((a, b) => {
        let av: string | number = "";
        let bv: string | number = "";
        switch (sort.key) {
          case "patient":
            av = `${a.nom} ${a.prenom}`;
            bv = `${b.nom} ${b.prenom}`;
            break;
          case "affecteA":
            av = a.affecteA;
            bv = b.affecteA;
            break;
          case "arriveLe":
            av = a.arriveLe;
            bv = b.arriveLe;
            break;
          case "temperature":
            av = a.temperature;
            bv = b.temperature;
            break;
          case "etat":
            av = a.etat;
            bv = b.etat;
            break;
        }
        if (av < bv) return -1 * dir;
        if (av > bv) return 1 * dir;
        return 0;
      });
    }
    return list;
  }, [data, search, sort]);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* En-tête de la carte */}
      <div className="flex items-center justify-between gap-4 bg-[#DEF6FF] px-6 py-4">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0CB2DA]/10">
            <Plus className="h-5 w-5 text-[#0CB2DA]" strokeWidth={3} />
          </span>
          <h2 className="text-lg font-bold text-[#1DA1A6]">
            Liste des patients à consulter
          </h2>
        </div>
        <Button
          onClick={handleRefresh}
          className="gap-2 rounded-lg bg-[#EF4848] px-4 text-white shadow-sm hover:bg-[#e03a3a]"
        >
          Rafraîchir
          <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
        </Button>
      </div>

      {/* Barre de filtres */}
      <div className="flex flex-wrap items-end gap-4 px-6 py-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-slate-600">Date début</label>
          <Input
            type="date"
            value={dateDebut}
            onChange={(e) => setDateDebut(e.target.value)}
            className="w-44"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-slate-600">Date fin</label>
          <Input
            type="date"
            value={dateFin}
            onChange={(e) => setDateFin(e.target.value)}
            className="w-44"
          />
        </div>
        <p className="pb-2 text-lg font-bold leading-tight text-slate-700">
          <span className="text-[#EF4848]">{rows.length}</span> patient(s)
          <br />à consulter
        </p>
        <div className="relative ml-auto">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Rechercher un patient"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64 pl-9"
          />
        </div>
      </div>

      {/* Tableau */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-200 bg-[#F8FAFC] hover:bg-[#F8FAFC]">
              <TableHead className="py-3">
                <SortHeader label="Patient" sortKey="patient" sort={sort} onSort={handleSort} />
              </TableHead>
              <TableHead>
                <SortHeader label="Affecté(e) à" sortKey="affecteA" sort={sort} onSort={handleSort} />
              </TableHead>
              <TableHead>
                <SortHeader label="Arrivé(e) à" sortKey="arriveLe" sort={sort} onSort={handleSort} />
              </TableHead>
              <TableHead>
                <SortHeader label="Temp(°C)" sortKey="temperature" sort={sort} onSort={handleSort} />
              </TableHead>
              <TableHead>
                <SortHeader label="Type" sortKey="type" sort={sort} onSort={handleSort} />
              </TableHead>
              <TableHead>
                <SortHeader label="Etat" sortKey="etat" sort={sort} onSort={handleSort} />
              </TableHead>
              <TableHead className="text-slate-700">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="py-10 text-center text-slate-400">
                  Aucun patient à consulter.
                </TableCell>
              </TableRow>
            ) : (
              rows.map((p) => (
                <TableRow key={p.id} className="border-slate-100">
                  {/* Patient */}
                  <TableCell className="py-4">
                    <div className="flex items-start gap-2">
                      <span className="mt-1 h-4 w-1 shrink-0 rounded-full bg-[#F04444]" />
                      <span className="leading-tight text-slate-700">
                        {p.nom} {p.prenom}
                        <br />
                        <span className="font-bold">({p.numeroCarte})</span>
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-600">{p.affecteA}</TableCell>
                  <TableCell className="whitespace-nowrap text-slate-600">
                    {formatDateHeureFr(p.arriveLe)}
                  </TableCell>
                  <TableCell>
                    <TempBadge value={p.temperature} />
                  </TableCell>
                  <TableCell>
                    <TypeBadge type={p.type} />
                  </TableCell>
                  <TableCell>
                    <EtatBadge etat={p.etat} />
                  </TableCell>
                  {/* Actions */}
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {/* TODO: transférer le patient vers un autre service/médecin. */}
                      <Button
                        size="sm"
                        className="gap-1.5 rounded-lg bg-[#2EBE5E] px-3 text-white hover:bg-[#27a851]"
                      >
                        <Send className="h-4 w-4" />
                        Transférer
                      </Button>
                      {/* Ouvre le formulaire de consultation du patient. */}
                      <Button
                        size="sm"
                        onClick={() => router.push(`/medecine-generale/consultation/${p.id}`)}
                        className="gap-1.5 rounded-lg bg-[#6367EF] px-3 text-white hover:bg-[#5559e0]"
                      >
                        <Stethoscope className="h-4 w-4" />
                        Consulter
                      </Button>
                      {/* "Terminer" uniquement quand la consultation est en cours. */}
                      {p.etat === "en-consultation" && (
                        // TODO: clôturer la consultation.
                        <Button
                          size="sm"
                          className="gap-1.5 rounded-lg bg-[#F05151] px-3 text-white hover:bg-[#e04444]"
                        >
                          <Square className="h-4 w-4" />
                          Terminer
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}