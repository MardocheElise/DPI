/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
// // app/caisse/paiement-regle/page.tsx
// // Route : /caisse/paiement-regle
// // Sous-module Caisse — liste tous les paiements RÉGLÉS (encaissés depuis /caisse/paiement-en-attente).
// // Filtres : période (date début / date fin) + recherche. Actions : Consulter, Annuler.

// "use client";

// import { useMemo, useState } from "react";
// import { Eye, X, Receipt } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { paiementsRegles } from "@/lib/caisse/mock-data";
// import { formatDateLong, formatFCFA } from "@/lib/caisse/theme";
// import { CaissePageHeader } from "@/components/caisse/Pageheader";
// import { StatusBadge } from "@/components/caisse/StatusBadge";

// export default function PaiementReglePage() {
//   const [debut, setDebut] = useState("2026-06-01");
//   const [fin, setFin] = useState("2026-06-16");
//   const [search, setSearch] = useState("");
//   const [refreshing, setRefreshing] = useState(false);

//   // TODO API: GET /api/paiements?statut=regle&debut={debut}&fin={fin}
//   const data = paiementsRegles;

//   const filtered = useMemo(() => {
//     const q = search.trim().toLowerCase();
//     return data.filter((p) => {
//       const dans =
//         new Date(p.datePaiement) >= new Date(debut) &&
//         new Date(p.datePaiement) <= new Date(`${fin}T23:59:59`);
//       const match =
//         !q ||
//         p.reference.toLowerCase().includes(q) ||
//         p.patient.toLowerCase().includes(q) ||
//         p.caissier.toLowerCase().includes(q);
//       return dans && match;
//     });
//   }, [data, debut, fin, search]);

//   function handleRefresh() {
//     setRefreshing(true);
//     setTimeout(() => setRefreshing(false), 700);
//   }

//   return (
//     <>
//       <CaissePageHeader
//         title="Liste des fiches de paiement reçus"
//         icon={<Receipt className="h-5 w-5" />}
//         onRefresh={handleRefresh}
//         refreshing={refreshing}
//       />

//       {/* Filtres de période + recherche */}
//       <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
//         <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
//           <div className="flex flex-col gap-4 sm:flex-row">
//             <div className="space-y-1.5">
//               <Label>Date début</Label>
//               <Input type="date" value={debut} onChange={(e) => setDebut(e.target.value)} />
//             </div>
//             <div className="space-y-1.5">
//               <Label>Date fin</Label>
//               <Input type="date" value={fin} onChange={(e) => setFin(e.target.value)} />
//             </div>
//           </div>

//           <div className="w-full sm:w-80">
//             <Input
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Rechercher un paiement"
//             />
//           </div>
//         </div>

//         <p className="mt-5 border-t border-border pt-4 text-2xl font-bold text-foreground">
//           <span className="text-danger">{filtered.length}</span>{" "}
//           <span className="text-xl font-medium text-muted-foreground">
//             fiches de paiement réglées
//           </span>
//         </p>
//       </div>

//       {/* Tableau */}
//       <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
//         <Table>
//           <TableHeader>
//             <TableRow className="caisse-thead hover:bg-surface-2">
//               <TableHead>N°</TableHead>
//               <TableHead>Référence</TableHead>
//               <TableHead>Patient</TableHead>
//               <TableHead>Date paiement</TableHead>
//               <TableHead>Service</TableHead>
//               <TableHead>Caissier</TableHead>
//               <TableHead>Montant</TableHead>
//               <TableHead>Mode</TableHead>
//               <TableHead className="text-right">Actions</TableHead>
//             </TableRow>
//           </TableHeader>

//           <TableBody>
//             {filtered.map((p) => (
//               <TableRow key={p.reference} className="border-border">
//                 <TableCell className="text-muted-foreground">{p.numero}</TableCell>
//                 <TableCell className="font-medium text-teal-primary">{p.reference}</TableCell>
//                 <TableCell className="text-foreground">
//                   {p.patient} <span className="font-semibold">({p.matricule})</span>
//                 </TableCell>
//                 <TableCell className="text-muted-foreground">
//                   {formatDateLong(p.datePaiement)}
//                 </TableCell>
//                 <TableCell className="text-foreground">{p.service}</TableCell>
//                 <TableCell className="text-foreground">{p.caissier}</TableCell>
//                 <TableCell className="font-semibold text-foreground">
//                   {formatFCFA(p.montant)}
//                 </TableCell>
//                 <TableCell>
//                   <StatusBadge variant="info">{p.modePaye}</StatusBadge>
//                 </TableCell>
//                 <TableCell>
//                   <div className="flex items-center justify-end gap-2">
//                     {/* TODO API: ouvrir le reçu / détail du paiement */}
//                     <Button size="sm" variant="secondary">
//                       <Eye className="mr-1.5 h-4 w-4" /> Consulter
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
//                 <TableCell colSpan={9} className="py-10 text-center text-muted-foreground">
//                   Aucun paiement réglé sur cette période.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>
//     </>
//   );
// }












// app/caisse/paiement-regle/page.tsx
// Route : /caisse/paiement-regle
// Liste toutes les fiches au statut PAYÉ via GET /fiches-paiement?statut=payee&debut=&fin=
// Remplace les données mock (paiementsRegles) par l'API backend.

"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, X, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input }  from "@/components/ui/input";
import { Label }  from "@/components/ui/label";
import {
  Table, TableBody, TableCell,
  TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { getFiches }        from "@/lib/caisse/api";
import { formatDateLong, formatFCFA } from "@/lib/caisse/theme";
import type { FichePaiement } from "@/lib/dataPatients/fichePaiement";
import { CaissePageHeader } from "@/components/caisse/Pageheader";
import { StatusBadge } from "@/components/caisse/StatusBadge";

export default function PaiementReglePage() {
  const router = useRouter();

  // Période par défaut : mois courant
  const today    = new Date();
  const firstDay = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-01`;
  const todayStr = today.toISOString().slice(0, 10);

  const [debut, setDebut]           = useState(firstDay);
  const [fin,   setFin]             = useState(todayStr);
  const [search, setSearch]         = useState("");
  const [data,   setData]           = useState<FichePaiement[]>([]);
  const [loading, setLoading]       = useState(true);
  const [error,   setError]         = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  // Charge les fiches PAYÉES filtrées par période
  const load = useCallback(async () => {
    try {
      setError(null);
      const fiches = await getFiches({ statut: "payee", debut, fin });
      setData(fiches);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur de chargement");
    } finally {
      setLoading(false);
    }
  }, [debut, fin]);

  // Recharge si la période change
  useEffect(() => { load(); }, [load]);

  async function handleRefresh() {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  }

  // Filtre texte côté client (recherche sur code, patient, service, caissier)
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return data;
    return data.filter(
      (f) =>
        f.code?.toLowerCase().includes(q) ||
        String(f.patient ?? "").toLowerCase().includes(q) ||
        f.service?.toLowerCase().includes(q) ||
        (f as any).caissier?.toLowerCase().includes(q),
    );
  }, [data, search]);

  const colSpan = 8;

  return (
    <>
      <CaissePageHeader
        title="Liste des fiches de paiement reçus"
        icon={<Receipt className="h-5 w-5" />}
        onRefresh={handleRefresh}
        refreshing={refreshing}
      />

      {/* Filtres période + recherche */}
      <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="space-y-1.5">
              <Label>Date début</Label>
              <Input
                type="date" value={debut}
                onChange={(e) => { setDebut(e.target.value); setLoading(true); }}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Date fin</Label>
              <Input
                type="date" value={fin}
                onChange={(e) => { setFin(e.target.value); setLoading(true); }}
              />
            </div>
          </div>
          <div className="w-full sm:w-80">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher un paiement"
            />
          </div>
        </div>

        {/* Compteur */}
        <p className="mt-5 border-t border-border pt-4 text-2xl font-bold text-foreground">
          <span className="text-danger">{filtered.length}</span>{" "}
          <span className="text-xl font-medium text-muted-foreground">
            fiches de paiement réglées
          </span>
        </p>
      </div>

      {/* Tableau */}
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="caisse-thead hover:bg-surface-2">
              <TableHead>N°</TableHead>
              <TableHead>Référence</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead>Date règlement</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Net à payer</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading && (
              <TableRow>
                <TableCell colSpan={colSpan} className="py-10 text-center text-muted-foreground">
                  Chargement des paiements réglés…
                </TableCell>
              </TableRow>
            )}
            {!loading && error && (
              <TableRow>
                <TableCell colSpan={colSpan} className="py-10 text-center text-danger">
                  {error}
                </TableCell>
              </TableRow>
            )}
            {!loading && !error && filtered.map((f, i) => (
              <TableRow key={f.id} className="border-border">
                <TableCell className="text-muted-foreground">{i + 1}</TableCell>
                <TableCell className="font-medium text-teal-primary">{f.code}</TableCell>
                <TableCell className="text-foreground">{String(f.patient ?? "")}</TableCell>
                <TableCell className="text-muted-foreground">
                  {formatDateLong(f.creeLe)}
                </TableCell>
                <TableCell className="text-foreground">{f.service}</TableCell>
                <TableCell className="font-semibold text-foreground">
                  {formatFCFA(f.netAPayer)}
                </TableCell>
                <TableCell>
                  <StatusBadge variant="success">Payée</StatusBadge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-2">
                    {/* Consulter → voir-fiche */}
                    <Button size="sm" variant="secondary"
                      onClick={() => router.push(`/accueil/paiement/voir-fiche?id=${f.id}`)}>
                      <Eye className="mr-1.5 h-4 w-4" /> Consulter
                    </Button>
                    {/* Annuler → PATCH /fiches-paiement/{id}/annuler */}
                    <Button size="sm" variant="destructive"
                      onClick={async () => {
                        if (!confirm(`Annuler la fiche ${f.code} ?`)) return;
                        try {
                          await fetch(
                            `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/fiches-paiement/${f.id}/annuler`,
                            { method: "PATCH" },
                          );
                          await load();
                        } catch { alert("Erreur lors de l'annulation"); }
                      }}>
                      <X className="mr-1.5 h-4 w-4" /> Annuler
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {!loading && !error && filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={colSpan} className="py-10 text-center text-muted-foreground">
                  Aucun paiement réglé sur cette période.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}