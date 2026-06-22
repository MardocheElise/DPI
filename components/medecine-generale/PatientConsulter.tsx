// components/medecine-generale/patients-deja-consulter-table.tsx
// Tableau interactif des patients déjà consultés (historique) :
// filtres (dates + recherche), tri par colonne, et action "voir le détail".
"use client";

import { useMemo, useState } from "react";
import { Eye, RefreshCw, Search, UserCog } from "lucide-react";
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
import { formatDateHeureFr, PatientDejaConsulte } from "@/lib/data/consultations";
import { IssueBadge, SortConfig, SortHeader, TypeBadge } from "./ConsultationUi";

interface Props {
  data: PatientDejaConsulte[];
}

export function PatientsDejaConsulterTable({ data }: Props) {
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
    // TODO: relancer l'appel API de l'historique des consultations.
    setTimeout(() => setRefreshing(false), 700);
  };

  const rows = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = data.filter(
      (p) =>
        !q ||
        `${p.nom} ${p.prenom}`.toLowerCase().includes(q) ||
        p.numeroCarte.toLowerCase().includes(q) ||
        p.ficheRef.toLowerCase().includes(q),
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
          case "dateConsultation":
            av = a.dateConsultation;
            bv = b.dateConsultation;
            break;
          case "medecin":
            av = a.medecin;
            bv = b.medecin;
            break;
          case "issue":
            av = a.issue;
            bv = b.issue;
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
            <UserCog className="h-5 w-5 text-[#0CB2DA]" />
          </span>
          <h2 className="text-lg font-bold uppercase text-[#1DA1A6]">
            Liste des patients déjà consultés
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
      <div className="flex flex-wrap items-center gap-4 px-6 py-4">
        <div className="flex items-center gap-2">
          <label className="text-sm font-semibold text-slate-600">Date début&nbsp;:</label>
          <Input
            type="date"
            value={dateDebut}
            onChange={(e) => setDateDebut(e.target.value)}
            className="w-40"
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm font-semibold text-slate-600">Date fin&nbsp;:</label>
          <Input
            type="date"
            value={dateFin}
            onChange={(e) => setDateFin(e.target.value)}
            className="w-40"
          />
        </div>
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

      {/* Compteur */}
      <div className="px-6 pb-2">
        <p className="text-lg text-slate-700">
          <span className="font-bold text-[#EF4848]">{rows.length}</span> patients consultés
        </p>
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
                <SortHeader
                  label="Date de consultation"
                  sortKey="dateConsultation"
                  sort={sort}
                  onSort={handleSort}
                  filterable
                />
              </TableHead>
              <TableHead>
                <SortHeader label="Médecin consultant" sortKey="medecin" sort={sort} onSort={handleSort} />
              </TableHead>
              <TableHead>
                <SortHeader label="Type" sortKey="type" sort={sort} onSort={handleSort} />
              </TableHead>
              <TableHead>
                <SortHeader label="Issue" sortKey="issue" sort={sort} onSort={handleSort} filterable />
              </TableHead>
              <TableHead className="text-slate-700">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-10 text-center text-slate-400">
                  Aucun patient consulté sur cette période.
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
                        {p.nom} {p.prenom} ( <span className="font-bold">{p.numeroCarte}</span> )
                        <span className="font-bold">({p.age} ans)</span>
                        <br />
                        <span className="text-sm italic text-slate-500">{p.ficheRef}</span>
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-slate-600">
                    {formatDateHeureFr(p.dateConsultation)}
                  </TableCell>
                  <TableCell className="text-slate-600">{p.medecin}</TableCell>
                  <TableCell>
                    <TypeBadge type={p.type} />
                  </TableCell>
                  <TableCell>
                    <IssueBadge issue={p.issue} />
                  </TableCell>
                  {/* Actions */}
                  <TableCell>
                    {/* TODO: ouvrir le détail / le compte-rendu de la consultation. */}
                    <Button
                      size="icon"
                      className="h-10 w-10 rounded-full bg-[#3366E6] text-white hover:bg-[#2b58d4]"
                      aria-label="Voir le détail"
                    >
                      <Eye className="h-5 w-5" />
                    </Button>
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