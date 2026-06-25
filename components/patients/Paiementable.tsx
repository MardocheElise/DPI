
// // Route: /accueil/paiements
// // Tableau "Liste des fiches de paiements" — filtre par dates, recherche, tri, montants FCFA.
// // Connecté à l'API (les fiches viennent de la base via fichesPaiementApi.getAll()).

// "use client";

// import { useMemo, useState } from "react";
// import { Menu, UserPen, X, UserCog } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Badge } from "@/components/ui/badge";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { cn } from "@/lib/data/utils";
// import { formatFCFA, formatDateTimeFr } from "@/lib/data/format";
// import { FichePaiement, StatutFiche } from "@/lib/dataPatients/fichePaiement";
// import { SortableHeader, SortDir } from "./Sortable-header";

// type ColonneTri =
//   | "code"
//   | "patient"
//   | "service"
//   | "coutTotal"
//   | "coutAssure"
//   | "netAPayer"
//   | "creeLe";

// // Renvoie une date au format yyyy-mm-dd en heure locale (sans décalage UTC)
// function isoLocal(d: Date): string {
//   const tz = d.getTimezoneOffset() * 60000;
//   return new Date(d.getTime() - tz).toISOString().slice(0, 10);
// }

// export function FichesPaiementTable({ fiches }: { fiches: FichePaiement[] }) {
//   const [recherche, setRecherche] = useState("");

//   // Bornes par défaut DYNAMIQUES : du 1er du mois courant à aujourd'hui.
//   const maintenant = new Date();
//   const debutMois = new Date(maintenant.getFullYear(), maintenant.getMonth(), 1);
//   const [dateDebut, setDateDebut] = useState(isoLocal(debutMois));
//   const [dateFin, setDateFin] = useState(isoLocal(maintenant));

//   const [triColonne, setTriColonne] = useState<ColonneTri>("creeLe");
//   const [triDir, setTriDir] = useState<SortDir>("desc");

//   function trier(colonne: ColonneTri) {
//     if (triColonne === colonne) {
//       setTriDir((d) => (d === "asc" ? "desc" : "asc"));
//     } else {
//       setTriColonne(colonne);
//       setTriDir("asc");
//     }
//   }

//   const lignes = useMemo(() => {
//     const terme = recherche.trim().toLowerCase();
//     // Bornes optionnelles : vides => pas de filtrage sur cette borne.
//     const debut = dateDebut ? new Date(dateDebut).getTime() : -Infinity;
//     const fin = dateFin
//       ? new Date(dateFin).getTime() + 24 * 60 * 60 * 1000 // inclut le jour de fin
//       : Infinity;

//     const filtres = fiches.filter((f) => {
//       const t = new Date(f.creeLe).getTime();
//       const dansPeriode = t >= debut && t <= fin;
//       const correspond =
//         terme === "" ||
//         [f.code, f.patient, f.patientCode, f.service].some((v) =>
//           String(v ?? "").toLowerCase().includes(terme)
//         );
//       return dansPeriode && correspond;
//     });

//     return [...filtres].sort((a, b) => {
//       const dir = triDir === "desc" ? -1 : 1;
//       if (triColonne === "creeLe") {
//         return (new Date(a.creeLe).getTime() - new Date(b.creeLe).getTime()) * dir;
//       }
//       const va = a[triColonne];
//       const vb = b[triColonne];
//       if (typeof va === "number" && typeof vb === "number") return (va - vb) * dir;
//       return String(va).localeCompare(String(vb)) * dir;
//     });
//   }, [fiches, recherche, dateDebut, dateFin, triColonne, triDir]);

//   return (
//     <div className="space-y-4">
//       {/* Barre d'outils : dates + recherche */}
//       <div className="flex flex-wrap items-end gap-4">
//         <div className="space-y-1.5">
//           <Label htmlFor="date-debut" className="text-sm font-semibold">
//             Date de début :
//           </Label>
//           <Input
//             id="date-debut"
//             type="date"
//             value={dateDebut}
//             onChange={(e) => setDateDebut(e.target.value)}
//             className="w-44 bg-card"
//           />
//         </div>

//         <div className="space-y-1.5">
//           <Label htmlFor="date-fin" className="text-sm font-semibold">
//             Date de fin :
//           </Label>
//           <Input
//             id="date-fin"
//             type="date"
//             value={dateFin}
//             onChange={(e) => setDateFin(e.target.value)}
//             className="w-44 bg-card"
//           />
//         </div>

//         <Input
//           placeholder="Rechercher une fiche…"
//           value={recherche}
//           onChange={(e) => setRecherche(e.target.value)}
//           className="ml-auto w-full max-w-xs bg-card"
//           aria-label="Rechercher une fiche"
//         />
//       </div>

//       {/* Tableau */}
//       <div className="overflow-x-auto rounded-xl border border-border">
//         <Table>
//           <TableHeader>
//             <TableRow className="bg-brand-sky-soft/35 hover:bg-brand-sky-soft/35">
//               <TableHead>
//                 <SortableHeader
//                   label="Code"
//                   active={triColonne === "code"}
//                   direction={triDir}
//                   onSort={() => trier("code")}
//                 />
//               </TableHead>
//               <TableHead>
//                 <SortableHeader
//                   label="Patient"
//                   active={triColonne === "patient"}
//                   direction={triDir}
//                   onSort={() => trier("patient")}
//                 />
//               </TableHead>
//               <TableHead>
//                 <SortableHeader
//                   label="Service"
//                   active={triColonne === "service"}
//                   direction={triDir}
//                   onSort={() => trier("service")}
//                 />
//               </TableHead>
//               <TableHead className="text-right">
//                 <SortableHeader
//                   label="Coût Total"
//                   active={triColonne === "coutTotal"}
//                   direction={triDir}
//                   onSort={() => trier("coutTotal")}
//                   className="ml-auto"
//                 />
//               </TableHead>
//               <TableHead className="text-right">
//                 <SortableHeader
//                   label="Coût assuré"
//                   active={triColonne === "coutAssure"}
//                   direction={triDir}
//                   onSort={() => trier("coutAssure")}
//                   className="ml-auto"
//                 />
//               </TableHead>
//               <TableHead className="text-right">
//                 <SortableHeader
//                   label="Net à payer"
//                   active={triColonne === "netAPayer"}
//                   direction={triDir}
//                   onSort={() => trier("netAPayer")}
//                   className="ml-auto"
//                 />
//               </TableHead>
//               <TableHead>
//                 <SortableHeader label="Statut" variant="filter" />
//               </TableHead>
//               <TableHead>
//                 <SortableHeader
//                   label="Date de création"
//                   active={triColonne === "creeLe"}
//                   direction={triDir}
//                   onSort={() => trier("creeLe")}
//                 />
//               </TableHead>
//               <TableHead className="text-right">Action</TableHead>
//             </TableRow>
//           </TableHeader>

//           <TableBody>
//             {lignes.length === 0 ? (
//               <TableRow>
//                 <TableCell
//                   colSpan={9}
//                   className="py-10 text-center text-muted-foreground"
//                 >
//                   Aucune fiche de paiement sur cette période.
//                 </TableCell>
//               </TableRow>
//             ) : (
//               lignes.map((f) => (
//                 <TableRow key={f.id} className="hover:bg-brand-mint-soft/40">
//                   <TableCell>
//                     <button className="font-semibold text-primary hover:underline">
//                       {f.code}
//                     </button>
//                   </TableCell>
//                   <TableCell className="font-medium">
//                     {f.patient}{" "}
//                     <span className="text-muted-foreground">({f.patientCode})</span>
//                   </TableCell>
//                   <TableCell className="text-muted-foreground">{f.service}</TableCell>
//                   <TableCell className="text-right font-medium tabular-nums">
//                     {formatFCFA(f.coutTotal)}
//                   </TableCell>
//                   <TableCell className="text-right tabular-nums text-muted-foreground">
//                     {formatFCFA(f.coutAssure)}
//                   </TableCell>
//                   <TableCell className="text-right font-semibold tabular-nums text-brand-teal-deep">
//                     {formatFCFA(f.netAPayer)}
//                   </TableCell>
//                   <TableCell>
//                     <StatutBadge statut={f.statut} />
//                   </TableCell>
//                   <TableCell className="whitespace-nowrap text-muted-foreground">
//                     {formatDateTimeFr(f.creeLe)}
//                   </TableCell>
//                   <TableCell>
//                     <RowActions />
//                   </TableCell>
//                 </TableRow>
//               ))
//             )}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   );
// }

// /** Badge de statut : Impayée (rouge), Payée (vert), Partiel (orange) */
// function StatutBadge({ statut }: { statut: StatutFiche }) {
//   const styles: Record<StatutFiche, { label: string; className: string }> = {
//     impayee: { label: "Impayée", className: "bg-[#FFC1C4] text-[#D92D2D]" },
//     payee: { label: "Payée", className: "bg-[#C8F4D6] text-[#138A3E]" },
//     partiel: { label: "Partiel", className: "bg-[#FFE6B0] text-[#B26A00]" },
//   };
//   const s = styles[statut];
//   return (
//     <Badge className={cn("border-transparent font-semibold hover:opacity-100", s.className)}>
//       {s.label}
//     </Badge>
//   );
// }

// /** Boutons d'action circulaires — couleurs reprises de la maquette */
// function RowActions() {
//   const base =
//     "flex h-9 w-9 items-center justify-center rounded-full text-white shadow-sm transition-transform hover:scale-105";
//   return (
//     <div className="flex items-center justify-end gap-2">
//       <button className={cn(base, "bg-[#6367EF]")} title="Détails">
//         <Menu className="h-4 w-4" />
//       </button>
//       <button className={cn(base, "bg-[#23C756]")} title="Encaisser / Modifier">
//         <UserPen className="h-4 w-4" />
//       </button>
//       <button className={cn(base, "bg-[#F04444]")} title="Annuler la fiche">
//         <X className="h-4 w-4" />
//       </button>
//       <button className={cn(base, "bg-[#65758E]")} title="Réaffecter le patient">
//         <UserCog className="h-4 w-4" />
//       </button>
//     </div>
//   );
// }

























// Route: /accueil/paiements
// Tableau "Liste des fiches de paiements" — filtre par dates, recherche, tri, montants FCFA.
// Connecté à l'API (les fiches viennent de la base via fichesPaiementApi.getAll()).

"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
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
import { cn } from "@/lib/data/utils";
import { formatFCFA, formatDateTimeFr } from "@/lib/data/format";
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

// Renvoie une date au format yyyy-mm-dd en heure locale (sans décalage UTC)
function isoLocal(d: Date): string {
  const tz = d.getTimezoneOffset() * 60000;
  return new Date(d.getTime() - tz).toISOString().slice(0, 10);
}

export function FichesPaiementTable({ fiches }: { fiches: FichePaiement[] }) {
  const router = useRouter();
  const [recherche, setRecherche] = useState("");

  // Bornes par défaut DYNAMIQUES : du 1er du mois courant à aujourd'hui.
  const maintenant = new Date();
  const debutMois = new Date(maintenant.getFullYear(), maintenant.getMonth(), 1);
  const [dateDebut, setDateDebut] = useState(isoLocal(debutMois));
  const [dateFin, setDateFin] = useState(isoLocal(maintenant));

  const [triColonne, setTriColonne] = useState<ColonneTri>("creeLe");
  const [triDir, setTriDir] = useState<SortDir>("desc");

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
    // Bornes optionnelles : vides => pas de filtrage sur cette borne.
    const debut = dateDebut ? new Date(dateDebut).getTime() : -Infinity;
    const fin = dateFin
      ? new Date(dateFin).getTime() + 24 * 60 * 60 * 1000 // inclut le jour de fin
      : Infinity;

    const filtres = fiches.filter((f) => {
      const t = new Date(f.creeLe).getTime();
      const dansPeriode = t >= debut && t <= fin;
      const correspond =
        terme === "" ||
        [f.code, f.patient, f.patientCode, f.service].some((v) =>
          String(v ?? "").toLowerCase().includes(terme)
        );
      return dansPeriode && correspond;
    });

    return [...filtres].sort((a, b) => {
      const dir = triDir === "desc" ? -1 : 1;
      if (triColonne === "creeLe") {
        return (new Date(a.creeLe).getTime() - new Date(b.creeLe).getTime()) * dir;
      }
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
                <TableRow
                  key={f.id}
                  onClick={() => router.push(`/accueil/paiements/voir-fiche?id=${f.id}`)}
                  className="cursor-pointer hover:bg-brand-mint-soft/40"
                >
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
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <RowActions ficheId={f.id} />
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
    impayee: { label: "Impayée", className: "bg-[#FFC1C4] text-[#D92D2D]" },
    payee: { label: "Payée", className: "bg-[#C8F4D6] text-[#138A3E]" },
    partiel: { label: "Partiel", className: "bg-[#FFE6B0] text-[#B26A00]" },
  };
  const s = styles[statut];
  return (
    <Badge className={cn("border-transparent font-semibold hover:opacity-100", s.className)}>
      {s.label}
    </Badge>
  );
}

/** Boutons d'action circulaires — couleurs reprises de la maquette */
function RowActions({ ficheId }: { ficheId: number }) {
  const router = useRouter();
  const base =
    "flex h-9 w-9 items-center justify-center rounded-full text-white shadow-sm transition-transform hover:scale-105";
  return (
    <div className="flex items-center justify-end gap-2">
      {/* Détails -> reçu de la fiche */}
      <button
        type="button"
        onClick={() => router.push(`/accueil/paiements/voir-fiche?id=${ficheId}`)}
        className={cn(base, "bg-[#6367EF]")}
        title="Voir la fiche"
      >
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