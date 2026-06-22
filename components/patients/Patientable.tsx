// Route: /accueil/patients
// Tableau "Liste des patients" — recherche, tri, badges genre et actions par ligne.
// Données statiques pour l'instant (lib/data/patients.ts) ; la BD sera branchée plus tard.

"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { FileText, Menu, UserPen, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/data/utils";
import { calculerAge, formatDateFr, formatDateTimeFr } from "@/lib/data/format";
import { Patient } from "@/lib/dataPatients/patient";
import { SortableHeader, SortDir } from "./Sortable-header";
import { useRouter } from "next/navigation";

type ColonneTri = "id" | "code" | "nom";

export function PatientsTable({ patients }: { patients: Patient[] }) {
  const [recherche, setRecherche] = useState("");
  const [triColonne, setTriColonne] = useState<ColonneTri>("id");
  const [triDir, setTriDir] = useState<SortDir>("asc");
  const router = useRouter();
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
    const filtres = patients.filter((p) =>
      [p.code, p.nom, p.contact].some((v) => v.toLowerCase().includes(terme))
    );

    return [...filtres].sort((a, b) => {
      const dir = triDir === "desc" ? -1 : 1;
      if (triColonne === "id") return (a.id - b.id) * dir;
      return a[triColonne].localeCompare(b[triColonne]) * dir;
    });
  }, [patients, recherche, triColonne, triDir]);

  return (
    <div className="space-y-4">
      {/* Barre d'outils */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <Select>
          <SelectTrigger className="bg-card">
            <SelectValue placeholder="Sélectionner colonne(s) à afficher" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="code">Code patient</SelectItem>
            <SelectItem value="nom">Patient</SelectItem>
            <SelectItem value="genre">Genre</SelectItem>
            <SelectItem value="naissance">Date de naissance</SelectItem>
            <SelectItem value="contact">Contact</SelectItem>
          </SelectContent>
        </Select>

        <Input
          placeholder="(+225) 0…"
          className="bg-card"
          aria-label="Rechercher par contact"
          onChange={(e) => setRecherche(e.target.value)}
        />

        <Input
          placeholder="Recherche"
          className="bg-card"
          aria-label="Recherche"
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
        />
      </div>

      {/* Tableau */}
      <div className="overflow-x-auto rounded-xl border border-border">
        <Table>
          <TableHeader>
            <TableRow className="bg-brand-sky-soft/35 hover:bg-brand-sky-soft/35">
              <TableHead>
                <SortableHeader
                  label="N°"
                  active={triColonne === "id"}
                  direction={triDir}
                  onSort={() => trier("id")}
                />
              </TableHead>
              <TableHead>
                <SortableHeader
                  label="Code patient"
                  active={triColonne === "code"}
                  direction={triDir}
                  onSort={() => trier("code")}
                />
              </TableHead>
              <TableHead>
                <SortableHeader
                  label="Patient"
                  active={triColonne === "nom"}
                  direction={triDir}
                  onSort={() => trier("nom")}
                />
              </TableHead>
              <TableHead>
                <SortableHeader label="Genre" variant="filter" />
              </TableHead>
              <TableHead>
                <SortableHeader label="Date naissance" variant="filter" />
              </TableHead>
              <TableHead>
                <SortableHeader label="Contact" />
              </TableHead>
              <TableHead>
                <SortableHeader label="Enregistrée le" variant="filter" />
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {lignes.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="py-10 text-center text-muted-foreground"
                >
                  Aucun patient ne correspond à votre recherche.
                </TableCell>
              </TableRow>
            ) : (
              lignes.map((p) => (
                <TableRow key={p.id} onClick={() => router.push(`/profil/patient/${p.id}`)} className="cursor-pointer hover:bg-brand-mint-soft/40"
                >
                  <TableCell className="font-medium text-muted-foreground">
                    {p.id}
                  </TableCell>
                  <TableCell>
                    <button className="font-semibold text-primary hover:underline">
                      {p.code}
                    </button>
                  </TableCell>
                  <TableCell className="font-medium">{p.nom}</TableCell>
                  <TableCell>
                    <GenreBadge genre={p.genre} />
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <span>{formatDateFr(p.dateNaissance)}</span>{" "}
                    <span className="font-semibold text-foreground">
                      ({calculerAge(p.dateNaissance)})
                    </span>
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-muted-foreground">
                    {p.contact}
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-muted-foreground">
                    {formatDateTimeFr(p.enregistreLe)}
                  </TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <RowActions patient={p} />
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

/** Badge de genre adapté à la palette : masculin = teal, feminin = rose */
function GenreBadge({ genre }: { genre: Patient["genre"] }) {
  if (genre === "feminin") {
    return (
      <Badge className="border-transparent bg-brand-pink/40 text-brand-pink-deep hover:bg-brand-pink/40">
        feminin
      </Badge>
    );
  }
  return (
    <Badge className="border-transparent bg-brand-mint-soft text-brand-teal-deep hover:bg-brand-mint-soft">
      masculin
    </Badge>
  );
}

/** Boutons d'action circulaires — couleurs reprises de la maquette d'icônes */
function RowActions({ patient }: { patient: Patient }) {
  const base =
    "flex h-9 w-9 items-center justify-center rounded-full text-white shadow-sm transition-transform hover:scale-105";
  return (
    <div className="flex items-center justify-end gap-2">
      {/* Redirige vers /form/paiement-form avec le patient pré-sélectionné */}
      <Link
        href={`/form/paiement-form?ref=${encodeURIComponent(patient.code)}`}
        className={cn(base, "bg-[#0CB2DA]")}
        title="Créer une fiche de paiement"
      >
        <FileText className="h-4 w-4" />
      </Link>
      {/* Redirige vers la fiche profil détaillée du patient */}
      <Link
        href={`/profil/patient/${patient.id}`}
        className={cn(base, "bg-[#6367EF]")}
        title="Voir le profil"
      >
        <Menu className="h-4 w-4" />
      </Link>
      <button className={cn(base, "bg-[#23C756]")} title="Modifier">
        <UserPen className="h-4 w-4" />
      </button>
      <button className={cn(base, "bg-[#F04444]")} title="Supprimer">
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}









// // Route: /accueil/patients
// // Tableau "Liste des patients" — recherche, tri, badges genre et actions par ligne.
// // Données statiques pour l'instant (lib/data/patients.ts) ; la BD sera branchée plus tard.

// "use client";

// import { useMemo, useState } from "react";
// import { FileText, Menu, UserPen, X } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { cn } from "@/lib/utils";
// import { calculerAge, formatDateFr, formatDateTimeFr } from "@/lib/format";


// import { Patient } from "@/lib/dataPatients/patient";
// import { SortableHeader, SortDir } from "./Sortable-header";

// type ColonneTri = "id" | "code" | "nom";

// export function PatientsTable({ patients }: { patients: Patient[] }) {
//   const [recherche, setRecherche] = useState("");
//   const [triColonne, setTriColonne] = useState<ColonneTri>("id");
//   const [triDir, setTriDir] = useState<SortDir>("asc");

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
//     const filtres = patients.filter((p) =>
//       [p.code, p.nom, p.contact].some((v) => v.toLowerCase().includes(terme))
//     );

//     return [...filtres].sort((a, b) => {
//       const dir = triDir === "desc" ? -1 : 1;
//       if (triColonne === "id") return (a.id - b.id) * dir;
//       return a[triColonne].localeCompare(b[triColonne]) * dir;
//     });
//   }, [patients, recherche, triColonne, triDir]);

//   return (
//     <div className="space-y-4">
//       {/* Barre d'outils */}
//       <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
//         <Select>
//           <SelectTrigger className="bg-card">
//             <SelectValue placeholder="Sélectionner colonne(s) à afficher" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="code">Code patient</SelectItem>
//             <SelectItem value="nom">Patient</SelectItem>
//             <SelectItem value="genre">Genre</SelectItem>
//             <SelectItem value="naissance">Date de naissance</SelectItem>
//             <SelectItem value="contact">Contact</SelectItem>
//           </SelectContent>
//         </Select>
 
//         <Input
//           placeholder="(+225) 0…"
//           className="bg-card"
//           aria-label="Rechercher par contact"
//           onChange={(e) => setRecherche(e.target.value)}
//         />

//         <Input
//           placeholder="Recherche"
//           className="bg-card"
//           aria-label="Recherche"
//           value={recherche}
//           onChange={(e) => setRecherche(e.target.value)}
//         />
//       </div>

//       {/* Tableau */}
//       <div className="overflow-x-auto rounded-xl border border-border">
//         <Table>
//           <TableHeader>
//             <TableRow className="bg-[hsl(var(--brand-sky-soft)/0.35)] hover:bg-[hsl(var(--brand-sky-soft)/0.35)]">
//               <TableHead>
//                 <SortableHeader
//                   label="N°"
//                   active={triColonne === "id"}
//                   direction={triDir}
//                   onSort={() => trier("id")}
//                 />
//               </TableHead>
//               <TableHead>
//                 <SortableHeader
//                   label="Code patient"
//                   active={triColonne === "code"}
//                   direction={triDir}
//                   onSort={() => trier("code")}
//                 />
//               </TableHead>
//               <TableHead>
//                 <SortableHeader
//                   label="Patient"
//                   active={triColonne === "nom"}
//                   direction={triDir}
//                   onSort={() => trier("nom")}
//                 />
//               </TableHead>
//               <TableHead>
//                 <SortableHeader label="Genre" variant="filter" />
//               </TableHead>
//               <TableHead>
//                 <SortableHeader label="Date naissance" variant="filter" />
//               </TableHead>
//               <TableHead>
//                 <SortableHeader label="Contact" />
//               </TableHead>
//               <TableHead>
//                 <SortableHeader label="Enregistrée le" variant="filter" />
//               </TableHead>
//               <TableHead className="text-right">Actions</TableHead>
//             </TableRow>
//           </TableHeader>

//           <TableBody>
//             {lignes.length === 0 ? (
//               <TableRow>
//                 <TableCell
//                   colSpan={8}
//                   className="py-10 text-center text-muted-foreground"
//                 >
//                   Aucun patient ne correspond à votre recherche.
//                 </TableCell>
//               </TableRow>
//             ) : (
//               lignes.map((p) => (
//                 <TableRow key={p.id} className="hover:bg-brand-mint-soft/40">
//                   <TableCell className="font-medium text-muted-foreground">
//                     {p.id}
//                   </TableCell>
//                   <TableCell>
//                     <button className="font-semibold text-primary hover:underline">
//                       {p.code}
//                     </button>
//                   </TableCell>
//                   <TableCell className="font-medium">{p.nom}</TableCell>
//                   <TableCell>
//                     <GenreBadge genre={p.genre} />
//                   </TableCell>
//                   <TableCell className="whitespace-nowrap">
//                     <span>{formatDateFr(p.dateNaissance)}</span>{" "}
//                     <span className="font-semibold text-foreground">
//                       ({calculerAge(p.dateNaissance)})
//                     </span>
//                   </TableCell>
//                   <TableCell className="whitespace-nowrap text-muted-foreground">
//                     {p.contact}
//                   </TableCell>
//                   <TableCell className="whitespace-nowrap text-muted-foreground">
//                     {formatDateTimeFr(p.enregistreLe)}
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

// /** Badge de genre adapté à la palette : masculin = teal, feminin = rose */
// function GenreBadge({ genre }: { genre: Patient["genre"] }) {
//   if (genre === "feminin") {
//     return (
//       <Badge className="border-transparent bg-brand-pink/40 text-brand-pink-deep hover:bg-brand-pink/40">
//         feminin
//       </Badge>
//     );
//   }
//   return (
//     <Badge className="border-transparent bg-brand-mint-soft text-brand-teal-deep hover:bg-brand-mint-soft">
//       masculin
//     </Badge>
//   );
// }

// /** Boutons d'action circulaires — couleurs reprises de la maquette d'icônes */
// function RowActions() {
//   const base =
//     "flex h-9 w-9 items-center justify-center rounded-full text-white shadow-sm transition-transform hover:scale-105";
//   return (
//     <div className="flex items-center justify-end gap-2">
//       <button className={cn(base, "bg-[#0CB2DA]")} title="Créer fiche de paiement">
//         <FileText className="h-4 w-4" />
//       </button>
//       <button className={cn(base, "bg-[#6367EF]")} title="Détails">
//         <Menu className="h-4 w-4" />
//       </button>
//       <button className={cn(base, "bg-[#23C756]")} title="Modifier">
//         <UserPen className="h-4 w-4" />
//       </button>
//       <button className={cn(base, "bg-[#F04444]")} title="Supprimer">
//         <X className="h-4 w-4" />
//       </button>
//     </div>
//   );
// }



