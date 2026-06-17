// Route: /accueil/paiements
// Tableau "Liste des fiches de paiements" — filtre par dates, recherche, tri, montants FCFA.
// Données statiques pour l'instant (lib/data/fiches-paiement.ts) ; la BD sera branchée plus tard.

"use client";

import { useMemo, useState } from "react";
import { Menu, UserPen, X, UserCog } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { formatFCFA, formatDateTimeFr } from "@/lib/format";
import { FichePaiement, StatutFiche } from "@/lib/dataPatients/fichePaiement";
import { SortableHeader, SortDir } from "./Sortable-header";
type ColonneTri =
  | "code"
  | "patient"
  | "service"
  | "coutTotal"
  | "coutAssure"
  | "netAPayer"
  | "creeLe";

export function FichesPaiementTable({ fiches }: { fiches: FichePaiement[] }) {
  const [recherche, setRecherche] = useState("");
  const [dateDebut, setDateDebut] = useState("2026-06-01");
  const [dateFin, setDateFin] = useState("2026-06-15");
  const [triColonne, setTriColonne] = useState<ColonneTri>("code");
  const [triDir, setTriDir] = useState<SortDir>("asc");

  function trier(colonne: ColonneTri) {
    if (triColonne === colonne) {
      setTriDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setTriColonne(colonne);
      setTriDir("asc");
    }
  }

  const lignes = useMemo(() => {
    const terme = recherche.trim().toLowerCase();
    const debut = new Date(dateDebut).getTime();
    const fin = new Date(dateFin).getTime() + 24 * 60 * 60 * 1000; // inclut le jour de fin

    const filtres = fiches.filter((f) => {
      const t = new Date(f.creeLe).getTime();
      const dansPeriode = t >= debut && t <= fin;
      const correspond = [f.code, f.patient, f.patientCode, f.service].some((v) =>
        v.toLowerCase().includes(terme)
      );
      return dansPeriode && correspond;
    });

    return [...filtres].sort((a, b) => {
      const dir = triDir === "desc" ? -1 : 1;
      const va = a[triColonne];
      const vb = b[triColonne];
      if (typeof va === "number" && typeof vb === "number") return (va - vb) * dir;
      return String(va).localeCompare(String(vb)) * dir;
    });
  }, [fiches, recherche, dateDebut, dateFin, triColonne, triDir]);

  return (
    <div className="space-y-4">
      {/* Barre d'outils : dates + recherche */}
      <div className="flex flex-wrap items-end gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="date-debut" className="text-sm font-semibold">
            Date de début :
          </Label>
          <Input
            id="date-debut"
            type="date"
            value={dateDebut}
            onChange={(e) => setDateDebut(e.target.value)}
            className="w-44 bg-card"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="date-fin" className="text-sm font-semibold">
            Date de fin :
          </Label>
          <Input
            id="date-fin"
            type="date"
            value={dateFin}
            onChange={(e) => setDateFin(e.target.value)}
            className="w-44 bg-card"
          />
        </div>

        <Input
          placeholder="Rechercher une fiche…"
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
          className="ml-auto w-full max-w-xs bg-card"
          aria-label="Rechercher une fiche"
        />
      </div>

      {/* Tableau */}
      <div className="overflow-x-auto rounded-xl border border-border">
        <Table>
          <TableHeader>
            <TableRow className="bg-brand-sky-soft/35 hover:bg-brand-sky-soft/35">
              <TableHead>
                <SortableHeader
                  label="Code"
                  active={triColonne === "code"}
                  direction={triDir}
                  onSort={() => trier("code")}
                />
              </TableHead>
              <TableHead>
                <SortableHeader
                  label="Patient"
                  active={triColonne === "patient"}
                  direction={triDir}
                  onSort={() => trier("patient")}
                />
              </TableHead>
              <TableHead>
                <SortableHeader
                  label="Service"
                  active={triColonne === "service"}
                  direction={triDir}
                  onSort={() => trier("service")}
                />
              </TableHead>
              <TableHead className="text-right">
                <SortableHeader
                  label="Coût Total"
                  active={triColonne === "coutTotal"}
                  direction={triDir}
                  onSort={() => trier("coutTotal")}
                  className="ml-auto"
                />
              </TableHead>
              <TableHead className="text-right">
                <SortableHeader
                  label="Coût assuré"
                  active={triColonne === "coutAssure"}
                  direction={triDir}
                  onSort={() => trier("coutAssure")}
                  className="ml-auto"
                />
              </TableHead>
              <TableHead className="text-right">
                <SortableHeader
                  label="Net à payer"
                  active={triColonne === "netAPayer"}
                  direction={triDir}
                  onSort={() => trier("netAPayer")}
                  className="ml-auto"
                />
              </TableHead>
              <TableHead>
                <SortableHeader label="Statut" variant="filter" />
              </TableHead>
              <TableHead>
                <SortableHeader
                  label="Date de création"
                  active={triColonne === "creeLe"}
                  direction={triDir}
                  onSort={() => trier("creeLe")}
                />
              </TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {lignes.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={9}
                  className="py-10 text-center text-muted-foreground"
                >
                  Aucune fiche de paiement sur cette période.
                </TableCell>
              </TableRow>
            ) : (
              lignes.map((f) => (
                <TableRow key={f.id} className="hover:bg-brand-mint-soft/40">
                  <TableCell>
                    <button className="font-semibold text-primary hover:underline">
                      {f.code}
                    </button>
                  </TableCell>
                  <TableCell className="font-medium">
                    {f.patient}{" "}
                    <span className="text-muted-foreground">({f.patientCode})</span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{f.service}</TableCell>
                  <TableCell className="text-right font-medium tabular-nums">
                    {formatFCFA(f.coutTotal)}
                  </TableCell>
                  <TableCell className="text-right tabular-nums text-muted-foreground">
                    {formatFCFA(f.coutAssure)}
                  </TableCell>
                  <TableCell className="text-right font-semibold tabular-nums text-brand-teal-deep">
                    {formatFCFA(f.netAPayer)}
                  </TableCell>
                  <TableCell>
                    <StatutBadge statut={f.statut} />
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-muted-foreground">
                    {formatDateTimeFr(f.creeLe)}
                  </TableCell>
                  <TableCell>
                    <RowActions />
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

/** Badge de statut : Impayée (rouge), Payée (vert), Partiel (orange) */
function StatutBadge({ statut }: { statut: StatutFiche }) {
  const styles: Record<StatutFiche, { label: string; className: string }> = {
    impayee: {
      label: "Impayée",
      className: "bg-[#FFC1C4] text-[#D92D2D]",
    },
    payee: {
      label: "Payée",
      className: "bg-[#C8F4D6] text-[#138A3E]",
    },
    partiel: {
      label: "Partiel",
      className: "bg-[#FFE6B0] text-[#B26A00]",
    },
  };
  const s = styles[statut];
  return (
    <Badge className={cn("border-transparent font-semibold hover:opacity-100", s.className)}>
      {s.label}
    </Badge>
  );
}

/** Boutons d'action circulaires — couleurs reprises de la maquette */
function RowActions() {
  const base =
    "flex h-9 w-9 items-center justify-center rounded-full text-white shadow-sm transition-transform hover:scale-105";
  return (
    <div className="flex items-center justify-end gap-2">
      <button className={cn(base, "bg-[#6367EF]")} title="Détails">
        <Menu className="h-4 w-4" />
      </button>
      <button className={cn(base, "bg-[#23C756]")} title="Encaisser / Modifier">
        <UserPen className="h-4 w-4" />
      </button>
      <button className={cn(base, "bg-[#F04444]")} title="Annuler la fiche">
        <X className="h-4 w-4" />
      </button>
      <button className={cn(base, "bg-[#65758E]")} title="Réaffecter le patient">
        <UserCog className="h-4 w-4" />
      </button>
    </div>
  );
}