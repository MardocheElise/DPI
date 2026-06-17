// app/caisse/paiement-en-attente/page.tsx
// Route : /caisse/paiement-en-attente
// Sous-module Caisse — liste toutes les fiches de paiement IMPAYÉES provenant de accueil/paiement.
// Actions par ligne : Afficher (détail), Valider (encaisser), Annuler.

"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, Banknote, X, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fichesEnAttente } from "@/lib/caisse/mock-data";
import { formatDateLong, formatFCFA } from "@/lib/caisse/theme";
import { ColumnOption, DataToolbar } from "@/components/caisse/DataToolbar";
import { CaissePageHeader } from "@/components/caisse/Pageheader";
import { StatusBadge } from "@/components/caisse/StatusBadge";

const COLUMNS: ColumnOption[] = [
  { key: "reference", label: "Référence" },
  { key: "patient", label: "Patient" },
  { key: "assure", label: "Assuré" },
  { key: "aPayer", label: "À payer" },
  { key: "dateCreation", label: "Date de création" },
  { key: "service", label: "Service" },
];

export default function PaiementEnAttentePage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [visible, setVisible] = useState<Record<string, boolean>>(
    Object.fromEntries(COLUMNS.map((c) => [c.key, true])),
  );

  // Ouvre le reçu de la fiche sélectionnée
  function ouvrirFiche(reference: string) {
    router.push(
      `/caisse/paiement-en-attente/consulter-fiche?ref=${encodeURIComponent(reference)}`,
    );
  }

  // Valide la fiche → formulaire de validation (encaissement)
  function validerFiche(reference: string) {
    router.push(`/form/validation-form?ref=${encodeURIComponent(reference)}`);
  }

  // TODO API: remplacer fichesEnAttente par GET /api/paiements?statut=en_attente
  const data = fichesEnAttente;

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return data;
    return data.filter(
      (f) =>
        f.reference.toLowerCase().includes(q) ||
        f.patient.toLowerCase().includes(q) ||
        f.matricule.toLowerCase().includes(q),
    );
  }, [data, search]);

  function handleRefresh() {
    setRefreshing(true);
    // TODO API: re-fetch des fiches en attente
    setTimeout(() => setRefreshing(false), 700);
  }

  return (
    <>
      <CaissePageHeader
        title="Liste des fiches de paiement"
        icon={<Stethoscope className="h-5 w-5" />}
        onRefresh={handleRefresh}
        refreshing={refreshing}
      />

      <DataToolbar
        columns={COLUMNS}
        visible={visible}
        onToggle={(key) => setVisible((v) => ({ ...v, [key]: !v[key] }))}
        search={search}
        onSearch={setSearch}
      />

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="caisse-thead hover:bg-surface-2">
              {visible.reference && <TableHead>Référence</TableHead>}
              {visible.patient && <TableHead>Patient</TableHead>}
              {visible.assure && <TableHead>Assuré</TableHead>}
              {visible.aPayer && <TableHead>À payer</TableHead>}
              {visible.dateCreation && <TableHead>Date de création</TableHead>}
              {visible.service && <TableHead>Service</TableHead>}
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filtered.map((f) => (
              <TableRow
                key={f.reference}
                onClick={() => ouvrirFiche(f.reference)}
                className="cursor-pointer border-border"
              >
                {visible.reference && (
                  <TableCell className="font-medium text-teal-primary">{f.reference}</TableCell>
                )}
                {visible.patient && (
                  <TableCell className="text-foreground">
                    {f.patient}{" "}
                    <span className="font-semibold">({f.matricule})</span>
                  </TableCell>
                )}
                {visible.assure && (
                  <TableCell>
                    <StatusBadge variant={f.assure ? "success" : "neutral"}>
                      {f.assure ? "OUI" : "NON"}
                    </StatusBadge>
                  </TableCell>
                )}
                {visible.aPayer && (
                  <TableCell className="font-semibold text-foreground">
                    {formatFCFA(f.aPayer)}
                  </TableCell>
                )}
                {visible.dateCreation && (
                  <TableCell className="text-muted-foreground">
                    {formatDateLong(f.dateCreation)}
                  </TableCell>
                )}
                {visible.service && <TableCell className="text-foreground">{f.service}</TableCell>}

                <TableCell>
                  <div className="flex items-center justify-end gap-2">
                    {/* Afficher → ouvre le reçu (route consulter-fiche) */}
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={(e) => {
                        e.stopPropagation();
                        ouvrirFiche(f.reference);
                      }}
                    >
                      <Eye className="mr-1.5 h-4 w-4" /> Afficher
                    </Button>
                    {/* Valider → formulaire de validation (encaissement) */}
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        validerFiche(f.reference);
                      }}
                    >
                      <Banknote className="mr-1.5 h-4 w-4" /> Valider
                    </Button>
                    {/* TODO API: POST /api/paiements/{ref}/annuler */}
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <X className="mr-1.5 h-4 w-4" /> Annuler
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}

            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="py-10 text-center text-muted-foreground">
                  Aucune fiche en attente ne correspond à la recherche.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
























// // app/caisse/paiement-en-attente/page.tsx
// // Route : /caisse/paiement-en-attente
// // Sous-module Caisse — liste toutes les fiches de paiement IMPAYÉES provenant de accueil/paiement.
// // Actions par ligne : Afficher (détail), Valider (encaisser), Annuler.

// "use client";

// import { useMemo, useState } from "react";
// import { Eye, Banknote, X, Stethoscope } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { fichesEnAttente } from "@/lib/caisse/mock-data";
// import { formatDateLong, formatFCFA } from "@/lib/caisse/theme";
// import { ColumnOption, DataToolbar } from "@/components/caisse/DataToolbar";
// import { CaissePageHeader } from "@/components/caisse/Pageheader";
// import { StatusBadge } from "@/components/caisse/StatusBadge";

// const COLUMNS: ColumnOption[] = [
//   { key: "reference", label: "Référence" },
//   { key: "patient", label: "Patient" },
//   { key: "assure", label: "Assuré" },
//   { key: "aPayer", label: "À payer" },
//   { key: "dateCreation", label: "Date de création" },
//   { key: "service", label: "Service" },
// ];

// export default function PaiementEnAttentePage() {
//   const [search, setSearch] = useState("");
//   const [refreshing, setRefreshing] = useState(false);
//   const [visible, setVisible] = useState<Record<string, boolean>>(
//     Object.fromEntries(COLUMNS.map((c) => [c.key, true])),
//   );

//   // TODO API: remplacer fichesEnAttente par GET /api/paiements?statut=en_attente
//   const data = fichesEnAttente;

//   const filtered = useMemo(() => {
//     const q = search.trim().toLowerCase();
//     if (!q) return data;
//     return data.filter(
//       (f) =>
//         f.reference.toLowerCase().includes(q) ||
//         f.patient.toLowerCase().includes(q) ||
//         f.matricule.toLowerCase().includes(q),
//     );
//   }, [data, search]);

//   function handleRefresh() {
//     setRefreshing(true);
//     // TODO API: re-fetch des fiches en attente
//     setTimeout(() => setRefreshing(false), 700);
//   }

//   return (
//     <>
//       <CaissePageHeader
//         title="Liste des fiches de paiement"
//         icon={<Stethoscope className="h-5 w-5" />}
//         onRefresh={handleRefresh}
//         refreshing={refreshing}
//       />

//       <DataToolbar
//         columns={COLUMNS}
//         visible={visible}
//         onToggle={(key) => setVisible((v) => ({ ...v, [key]: !v[key] }))}
//         search={search}
//         onSearch={setSearch}
//       />

//       <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
//         <Table>
//           <TableHeader>
//             <TableRow className="caisse-thead hover:bg-surface-2">
//               {visible.reference && <TableHead>Référence</TableHead>}
//               {visible.patient && <TableHead>Patient</TableHead>}
//               {visible.assure && <TableHead>Assuré</TableHead>}
//               {visible.aPayer && <TableHead>À payer</TableHead>}
//               {visible.dateCreation && <TableHead>Date de création</TableHead>}
//               {visible.service && <TableHead>Service</TableHead>}
//               <TableHead className="text-right">Actions</TableHead>
//             </TableRow>
//           </TableHeader>

//           <TableBody>
//             {filtered.map((f) => (
//               <TableRow key={f.reference} className="border-border">
//                 {visible.reference && (
//                   <TableCell className="font-medium text-teal-primary">{f.reference}</TableCell>
//                 )}
//                 {visible.patient && (
//                   <TableCell className="text-foreground">
//                     {f.patient}{" "}
//                     <span className="font-semibold">({f.matricule})</span>
//                   </TableCell>
//                 )}
//                 {visible.assure && (
//                   <TableCell>
//                     <StatusBadge variant={f.assure ? "success" : "neutral"}>
//                       {f.assure ? "OUI" : "NON"}
//                     </StatusBadge>
//                   </TableCell>
//                 )}
//                 {visible.aPayer && (
//                   <TableCell className="font-semibold text-foreground">
//                     {formatFCFA(f.aPayer)}
//                   </TableCell>
//                 )}
//                 {visible.dateCreation && (
//                   <TableCell className="text-muted-foreground">
//                     {formatDateLong(f.dateCreation)}
//                   </TableCell>
//                 )}
//                 {visible.service && <TableCell className="text-foreground">{f.service}</TableCell>}

//                 <TableCell>
//                   <div className="flex items-center justify-end gap-2">
//                     {/* TODO API: ouvrir le détail de la fiche */}
//                     <Button size="sm" variant="secondary">
//                       <Eye className="mr-1.5 h-4 w-4" /> Afficher
//                     </Button>
//                     {/* TODO API: POST /api/paiements/{ref}/valider */}
//                     <Button size="sm">
//                       <Banknote className="mr-1.5 h-4 w-4" /> Valider
//                     </Button>
//                     {/* TODO API: POST /api/paiements/{ref}/annuler */}
//                     <Button size="sm" variant="destructive">
//                       <X className="mr-1.5 h-4 w-4" /> Annuler
//                     </Button>
//                   </div>
//                 </TableCell>
//               </TableRow>
//             ))}

//             {filtered.length === 0 && (
//               <TableRow>
//                 <TableCell colSpan={8} className="py-10 text-center text-muted-foreground">
//                   Aucune fiche en attente ne correspond à la recherche.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>
//     </>
//   );
// }