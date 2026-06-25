/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
// /* eslint-disable react-hooks/set-state-in-effect */
// // app/caisse/paiement-en-attente/page.tsx
// // Route : /caisse/paiement-en-attente
// // Liste TOUTE la table FichePaiement (backend NestJS via lib/caisse/api).
// // Actions par ligne :
// //   - Afficher → accueil/paiement/voir-fiche
// //   - Valider  → formulaire de règlement (/form/validation-form)
// //   - Annuler  → PATCH /caisse/fiches-paiement/{ref}/annuler

// "use client";

// import { useCallback, useEffect, useMemo, useState } from "react";
// import { useRouter } from "next/navigation";
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
// import { getFiches, annulerFiche } from "@/lib/caisse/api";
// import {
//   badgeVariant,
//   formatDateLong,
//   formatFCFA,
//   statutLabel,
//   type FichePaiement,
// } from "@/lib/caisse/theme";
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
//   { key: "statut", label: "Statut" },
// ];

// export default function PaiementEnAttentePage() {
//   const router = useRouter();
//   const [search, setSearch] = useState("");
//   const [data, setData] = useState<FichePaiement[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [refreshing, setRefreshing] = useState(false);
//   const [visible, setVisible] = useState<Record<string, boolean>>(
//     Object.fromEntries(COLUMNS.map((c) => [c.key, true])),
//   );

//   // Chargement depuis le backend NestJS
//   const load = useCallback(async () => {
//     try {
//       setError(null);
//       const fiches = await getFiches();
//       setData(fiches);
//     } catch (e) {
//       setError(e instanceof Error ? e.message : "Erreur de chargement");
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     load();
//   }, [load]);

//   async function handleRefresh() {
//     setRefreshing(true);
//     await load();
//     setRefreshing(false);
//   }

//   // Afficher → page de consultation de la fiche (module accueil)
//   function ouvrirFiche(reference: string) {
//     router.push(`/accueil/paiement/voir-fiche?ref=${encodeURIComponent(reference)}`);
//   }

//   // Valider → formulaire de règlement
//   function reglerFiche(reference: string) {
//     router.push(`/form/validation-form?ref=${encodeURIComponent(reference)}`);
//   }

//   // Annuler → API puis rechargement
//   async function handleAnnuler(reference: string) {
//     if (!confirm(`Annuler la fiche ${reference} ?`)) return;
//     try {
//       await annulerFiche(reference);
//       await load();
//     } catch (e) {
//       alert(e instanceof Error ? e.message : "Erreur lors de l'annulation");
//     }
//   }

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

//   const colSpan = COLUMNS.filter((c) => visible[c.key]).length + 1;

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
//               {visible.statut && <TableHead>Statut</TableHead>}
//               <TableHead className="text-right">Actions</TableHead>
//             </TableRow>
//           </TableHeader>

//           <TableBody>
//             {loading && (
//               <TableRow>
//                 <TableCell colSpan={colSpan} className="py-10 text-center text-muted-foreground">
//                   Chargement des fiches…
//                 </TableCell>
//               </TableRow>
//             )}

//             {!loading && error && (
//               <TableRow>
//                 <TableCell colSpan={colSpan} className="py-10 text-center text-danger">
//                   {error}
//                 </TableCell>
//               </TableRow>
//             )}

//             {!loading && !error &&
//               filtered.map((f) => (
//                 <TableRow
//                   key={f.reference}
//                   onClick={() => ouvrirFiche(f.reference)}
//                   className="cursor-pointer border-border"
//                 >
//                   {visible.reference && (
//                     <TableCell className="font-medium text-teal-primary">{f.reference}</TableCell>
//                   )}
//                   {visible.patient && (
//                     <TableCell className="text-foreground">
//                       {f.patient} <span className="font-semibold">({f.matricule})</span>
//                     </TableCell>
//                   )}
//                   {visible.assure && (
//                     <TableCell>
//                       <StatusBadge variant={f.assure ? "success" : "neutral"}>
//                         {f.assure ? "OUI" : "NON"}
//                       </StatusBadge>
//                     </TableCell>
//                   )}
//                   {visible.aPayer && (
//                     <TableCell className="font-semibold text-foreground">
//                       {formatFCFA(f.aPayer)}
//                     </TableCell>
//                   )}
//                   {visible.dateCreation && (
//                     <TableCell className="text-muted-foreground">
//                       {formatDateLong(f.dateCreation)}
//                     </TableCell>
//                   )}
//                   {visible.service && <TableCell className="text-foreground">{f.service}</TableCell>}
//                   {visible.statut && (
//                     <TableCell>
//                       <StatusBadge variant={badgeVariant(f.statut)}>
//                         {statutLabel(f.statut)}
//                       </StatusBadge>
//                     </TableCell>
//                   )}

//                   <TableCell>
//                     <div className="flex items-center justify-end gap-2">
//                       {/* Afficher → accueil/paiement/voir-fiche */}
//                       <Button
//                         size="sm"
//                         variant="secondary"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           ouvrirFiche(f.reference);
//                         }}
//                       >
//                         <Eye className="mr-1.5 h-4 w-4" /> Afficher
//                       </Button>
//                       {/* Valider → formulaire de règlement */}
//                       <Button
//                         size="sm"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           reglerFiche(f.reference);
//                         }}
//                       >
//                         <Banknote className="mr-1.5 h-4 w-4" /> Valider
//                       </Button>
//                       {/* Annuler → API */}
//                       <Button
//                         size="sm"
//                         variant="destructive"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleAnnuler(f.reference);
//                         }}
//                       >
//                         <X className="mr-1.5 h-4 w-4" /> Annuler
//                       </Button>
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               ))}

//             {!loading && !error && filtered.length === 0 && (
//               <TableRow>
//                 <TableCell colSpan={colSpan} className="py-10 text-center text-muted-foreground">
//                   Aucune fiche ne correspond à la recherche.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>
//     </>
//   );
// }















// // app/caisse/paiement-en-attente/page.tsx
// // Route : /caisse/paiement-en-attente
// // Liste TOUTES les fiches de la table FichePaiement via fichesPaiementApi.
// // Boutons :
// //   Afficher → /accueil/paiement/voir-fiche?id={id}
// //   Valider  → /form/validation-form?id={id}
// //   Annuler  → (TODO : endpoint à ajouter dans fichesPaiementApi si besoin)

// "use client";

// import { useCallback, useEffect, useMemo, useState } from "react";
// import { useRouter } from "next/navigation";
// import { Eye, Banknote, X, Stethoscope } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   Table, TableBody, TableCell, TableHead,
//   TableHeader, TableRow,
// } from "@/components/ui/table";
// import { getFiches }         from "@/lib/caisse/api";
// import { badgeVariant, formatDateLong, formatFCFA, statutLabel } from "@/lib/caisse/theme";
// import type { FichePaiement } from "@/lib/dataPatients/fichePaiement";
// import { ColumnOption, DataToolbar } from "@/components/caisse/DataToolbar";
// import { CaissePageHeader } from "@/components/caisse/Pageheader";
// import { StatusBadge } from "@/components/caisse/StatusBadge";

// const COLUMNS: ColumnOption[] = [
//   { key: "code",         label: "Référence"        },
//   { key: "patient",      label: "Patient"           },
//   { key: "service",      label: "Service"           },
//   { key: "netAPayer",    label: "Net à payer"       },
//   { key: "creeLe",       label: "Date de création"  },
//   { key: "statut",       label: "Statut"            },
// ];

// export default function PaiementEnAttentePage() {
//   const router = useRouter();
//   const [search, setSearch]     = useState("");
//   const [data, setData]         = useState<FichePaiement[]>([]);
//   const [loading, setLoading]   = useState(true);
//   const [error, setError]       = useState<string | null>(null);
//   const [refreshing, setRefreshing] = useState(false);
//   const [visible, setVisible]   = useState<Record<string, boolean>>(
//     Object.fromEntries(COLUMNS.map((c) => [c.key, true])),
//   );

//   const load = useCallback(async () => {
//     try {
//       setError(null);
//       const fiches = await getFiches();
//       setData(fiches);
//     } catch (e) {
//       setError(e instanceof Error ? e.message : "Erreur de chargement");
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => { load(); }, [load]);

//   async function handleRefresh() {
//     setRefreshing(true);
//     await load();
//     setRefreshing(false);
//   }

//   // Afficher → page de consultation du module Accueil
//   function ouvrirFiche(id: number) {
//     router.push(`/accueil/paiement/voir-fiche?id=${id}`);
//   }

//   // Valider → formulaire de règlement
//   function validerFiche(id: number) {
//     router.push(`/form/validation-form?id=${id}`);
//   }

//   const filtered = useMemo(() => {
//     const q = search.trim().toLowerCase();
//     if (!q) return data;
//     return data.filter(
//       (f) =>
//         f.code?.toLowerCase().includes(q) ||
//         (f.patient?.nom + " " + (f.patient?.prenom ?? "")).toLowerCase().includes(q),
//     );
//   }, [data, search]);

//   const colSpan = COLUMNS.filter((c) => visible[c.key]).length + 1;

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
//               {visible.code      && <TableHead>Référence</TableHead>}
//               {visible.patient   && <TableHead>Patient</TableHead>}
//               {visible.service   && <TableHead>Service</TableHead>}
//               {visible.netAPayer && <TableHead>Net à payer</TableHead>}
//               {visible.creeLe    && <TableHead>Date de création</TableHead>}
//               {visible.statut    && <TableHead>Statut</TableHead>}
//               <TableHead className="text-right">Actions</TableHead>
//             </TableRow>
//           </TableHeader>

//           <TableBody>
//             {loading && (
//               <TableRow>
//                 <TableCell colSpan={colSpan} className="py-10 text-center text-muted-foreground">
//                   Chargement des fiches…
//                 </TableCell>
//               </TableRow>
//             )}
//             {!loading && error && (
//               <TableRow>
//                 <TableCell colSpan={colSpan} className="py-10 text-center text-danger">
//                   {error}
//                 </TableCell>
//               </TableRow>
//             )}
//             {!loading && !error && filtered.map((f) => (
//               <TableRow
//                 key={f.id}
//                 onClick={() => ouvrirFiche(f.id)}
//                 className="cursor-pointer border-border"
//               >
//                 {visible.code    && (
//                   <TableCell className="font-medium text-teal-primary">{f.code}</TableCell>
//                 )}
//                 {visible.patient && (
//                   <TableCell className="text-foreground">
//                     {f.patient?.nom} {f.patient?.prenom}
//                   </TableCell>
//                 )}
//                 {visible.service && (
//                   <TableCell className="text-foreground">{f.service}</TableCell>
//                 )}
//                 {visible.netAPayer && (
//                   <TableCell className="font-semibold text-foreground">
//                     {formatFCFA(f.netAPayer)}
//                   </TableCell>
//                 )}
//                 {visible.creeLe && (
//                   <TableCell className="text-muted-foreground">
//                     {formatDateLong(f.creeLe)}
//                   </TableCell>
//                 )}
//                 {visible.statut && (
//                   <TableCell>
//                     <StatusBadge variant={badgeVariant(f.statut)}>
//                       {statutLabel(f.statut)}
//                     </StatusBadge>
//                   </TableCell>
//                 )}
//                 <TableCell>
//                   <div className="flex items-center justify-end gap-2">
//                     {/* Afficher → accueil/paiement/voir-fiche */}
//                     <Button size="sm" variant="secondary"
//                       onClick={(e) => { e.stopPropagation(); ouvrirFiche(f.id); }}>
//                       <Eye className="mr-1.5 h-4 w-4" /> Afficher
//                     </Button>
//                     {/* Valider → formulaire de règlement */}
//                     <Button size="sm"
//                       onClick={(e) => { e.stopPropagation(); validerFiche(f.id); }}>
//                       <Banknote className="mr-1.5 h-4 w-4" /> Valider
//                     </Button>
//                     {/* Annuler — TODO API si endpoint disponible */}
//                     <Button size="sm" variant="destructive"
//                       onClick={(e) => e.stopPropagation()}>
//                       <X className="mr-1.5 h-4 w-4" /> Annuler
//                     </Button>
//                   </div>
//                 </TableCell>
//               </TableRow>
//             ))}
//             {!loading && !error && filtered.length === 0 && (
//               <TableRow>
//                 <TableCell colSpan={colSpan} className="py-10 text-center text-muted-foreground">
//                   Aucune fiche ne correspond à la recherche.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>
//     </>
//   );
// }


















// "use client";

// import { useCallback, useEffect, useMemo, useState } from "react";
// import { useRouter } from "next/navigation";
// import { Eye, Banknote, X, Stethoscope } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   Table, TableBody, TableCell, TableHead,
//   TableHeader, TableRow,
// } from "@/components/ui/table";
// import { Badge } from "@/components/ui/badge";
// import { Input } from "@/components/ui/input";
// import { cn } from "@/lib/data/utils";
// import { formatDateTimeFr, formatFCFA } from "@/lib/data/format";
// import { fichesPaiementApi } from "@/lib/api/fiches-paiement";
// import type { FichePaiement } from "@/lib/dataPatients/fichePaiement";

// // ==================== Sous‑composants (simplifiés) ====================

// /** Badge de statut (identique à celui de la liste) */
// function StatusBadge({ statut }: { statut: FichePaiement['statut'] }) {
//   const styles = {
//     payee: { label: "Payée", className: "bg-[#C8F4D6] text-[#138A3E]" },
//     impayee: { label: "Impayée", className: "bg-[#FFC1C4] text-[#D92D2D]" },
//     partiel: { label: "Partiel", className: "bg-[#FFE6B0] text-[#B26A00]" },
//   };
//   const s = styles[statut] || styles.impayee;
//   return (
//     <Badge className={cn("border-transparent font-semibold", s.className)}>
//       {s.label}
//     </Badge>
//   );
// }

// /** En‑tête de page simplifié */
// function CaissePageHeader({ title, icon, onRefresh, refreshing }: any) {
//   return (
//     <div className="flex items-center justify-between rounded-2xl border border-border bg-card px-6 py-4 shadow-sm">
//       <div className="flex items-center gap-3">
//         <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0d9488]/10 text-[#0d9488]">
//           {icon}
//         </span>
//         <h1 className="text-xl font-bold">{title}</h1>
//       </div>
//       <Button variant="outline" onClick={onRefresh} disabled={refreshing}>
//         {refreshing ? "Actualisation…" : "Actualiser"}
//       </Button>
//     </div>
//   );
// }

// /** Barre d’outils (recherche + colonnes visibles) */
// function DataToolbar({ search, onSearch }: { search: string; onSearch: (v: string) => void }) {
//   return (
//     <div className="flex items-center gap-4 py-2">
//       <Input
//         placeholder="Rechercher (code, patient, service…)"
//         value={search}
//         onChange={(e) => onSearch(e.target.value)}
//         className="max-w-xs"
//       />
//       {/* Ici, on pourrait ajouter des boutons pour masquer/afficher des colonnes, mais on simplifie */}
//     </div>
//   );
// }

// // ==================== Page principale ====================

// export default function PaiementEnAttentePage() {
//   const router = useRouter();
//   const [search, setSearch] = useState("");
//   const [data, setData] = useState<FichePaiement[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [refreshing, setRefreshing] = useState(false);

//   const load = useCallback(async () => {
//     try {
//       setError(null);
//       // ✅ Utilisation de l'API commune
//       const fiches = await fichesPaiementApi.getAll();
//       setData(fiches);
//     } catch (e) {
//       setError(e instanceof Error ? e.message : "Erreur de chargement");
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => { load(); }, [load]);

//   async function handleRefresh() {
//     setRefreshing(true);
//     await load();
//     setRefreshing(false);
//   }

//   // ✅ Route corrigée : paiements (avec 's')
//   function ouvrirFiche(id: number) {
//     router.push(`/accueil/paiements/voir-fiche?id=${id}`);
//   }

//   function validerFiche(id: number) {
//     router.push(`/form/validation-form?id=${id}`);
//   }

//   // Fonction annuler – non implémentée pour l’instant
//   function annulerFiche(id: number) {
//     // TODO: appeler l'API d'annulation (PATCH /fiches-paiement/:id/annuler)
//     // On pourrait ajouter une confirmation avant d'appeler
//     alert(`Annulation de la fiche ${id} (non implémentée)`);
//   }

//   // Filtrage local (recherche)
//   const filtered = useMemo(() => {
//     const q = search.trim().toLowerCase();
//     if (!q) return data;
//     return data.filter((f) =>
//       f.code?.toLowerCase().includes(q) ||
//       f.patient?.toLowerCase().includes(q) ||
//       f.service?.toLowerCase().includes(q)
//     );
//   }, [data, search]);

//   return (
//     <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
//       <CaissePageHeader
//         title="Liste des fiches de paiement"
//         icon={<Stethoscope className="h-5 w-5" />}
//         onRefresh={handleRefresh}
//         refreshing={refreshing}
//       />

//       <DataToolbar search={search} onSearch={setSearch} />

//       <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
//         <Table>
//           <TableHeader>
//             <TableRow className="bg-muted/50">
//               <TableHead>Référence</TableHead>
//               <TableHead>Patient</TableHead>
//               <TableHead>Service</TableHead>
//               <TableHead className="text-right">Net à payer</TableHead>
//               <TableHead>Date de création</TableHead>
//               <TableHead>Statut</TableHead>
//               <TableHead className="text-right">Actions</TableHead>
//             </TableRow>
//           </TableHeader>

//           <TableBody>
//             {loading && (
//               <TableRow>
//                 <TableCell colSpan={7} className="py-10 text-center text-muted-foreground">
//                   Chargement des fiches…
//                 </TableCell>
//               </TableRow>
//             )}
//             {!loading && error && (
//               <TableRow>
//                 <TableCell colSpan={7} className="py-10 text-center text-destructive">
//                   {error}
//                 </TableCell>
//               </TableRow>
//             )}
//             {!loading && !error && filtered.map((f) => (
//               <TableRow key={f.id} className="cursor-pointer hover:bg-muted/30 border-border">
//                 <TableCell className="font-medium text-[#0d9488]">{f.code}</TableCell>
//                 <TableCell>
//                   <div className="flex flex-col">
//                     <span className="font-medium">{f.patient}</span>
//                     <span className="text-xs text-muted-foreground">{f.patientCode}</span>
//                   </div>
//                 </TableCell>
//                 <TableCell>{f.service}</TableCell>
//                 <TableCell className="text-right font-semibold">{formatFCFA(f.netAPayer)}</TableCell>
//                 <TableCell className="text-muted-foreground">
//                   {formatDateTimeFr(f.creeLe)}
//                 </TableCell>
//                 <TableCell><StatusBadge statut={f.statut} /></TableCell>
//                 <TableCell>
//                   <div className="flex items-center justify-end gap-2">
//                     <Button size="sm" variant="secondary"
//                       onClick={(e) => { e.stopPropagation(); ouvrirFiche(f.id); }}>
//                       <Eye className="mr-1.5 h-4 w-4" /> Afficher
//                     </Button>
//                     <Button size="sm"
//                       onClick={(e) => { e.stopPropagation(); validerFiche(f.id); }}>
//                       <Banknote className="mr-1.5 h-4 w-4" /> Valider
//                     </Button>
//                     <Button size="sm" variant="destructive"
//                       onClick={(e) => { e.stopPropagation(); annulerFiche(f.id); }}>
//                       <X className="mr-1.5 h-4 w-4" /> Annuler
//                     </Button>
//                   </div>
//                 </TableCell>
//               </TableRow>
//             ))}
//             {!loading && !error && filtered.length === 0 && (
//               <TableRow>
//                 <TableCell colSpan={7} className="py-10 text-center text-muted-foreground">
//                   Aucune fiche ne correspond à la recherche.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   );
// }




























// app/caisse/paiement-en-attente/page.tsx
// Route : /caisse/paiement-en-attente
// Liste les fiches au statut IMPAYÉ (statut=impayee) via GET /fiches-paiement?statut=impayee.
// Boutons :
//   Afficher → /accueil/paiement/voir-fiche?id={id}
//   Valider  → /form/validation-form?id={id}
//   Annuler  → PATCH /fiches-paiement/{id}/annuler

"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, Banknote, X, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell,
  TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { getFiches }         from "@/lib/caisse/api";
import { badgeVariant, formatDateLong, formatFCFA, statutLabel } from "@/lib/caisse/theme";
import { fichesPaiementApi } from "@/lib/api/fiches-paiement";
import type { FichePaiement } from "@/lib/dataPatients/fichePaiement";
import { ColumnOption, DataToolbar } from "@/components/caisse/DataToolbar";
import { CaissePageHeader } from "@/components/caisse/Pageheader";
import { StatusBadge } from "@/components/caisse/StatusBadge";

const COLUMNS: ColumnOption[] = [
  { key: "code",      label: "Référence"       },
  { key: "patient",   label: "Patient"          },
  { key: "service",   label: "Service"          },
  { key: "netAPayer", label: "Net à payer"      },
  { key: "creeLe",    label: "Date de création" },
  { key: "statut",    label: "Statut"           },
];

export default function PaiementEnAttentePage() {
  const router = useRouter();
  const [search, setSearch]         = useState("");
  const [data,   setData]           = useState<FichePaiement[]>([]);
  const [loading, setLoading]       = useState(true);
  const [error,   setError]         = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [visible, setVisible]       = useState<Record<string, boolean>>(
    Object.fromEntries(COLUMNS.map((c) => [c.key, true])),
  );

  // Charge UNIQUEMENT les fiches impayées
  const load = useCallback(async () => {
    try {
      setError(null);
      const fiches = await getFiches({ statut: "impayee" });
      setData(fiches);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur de chargement");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  async function handleRefresh() {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  }

  function ouvrirFiche(id: string) {
    router.push(`/accueil/paiement/voir-fiche?id=${id}`);
  }

  function validerFiche(id: string) {
    router.push(`/form/validation-form?id=${id}`);
  }

  async function handleAnnuler(id: string, code: string) {
    if (!confirm(`Annuler la fiche ${code} ?`)) return;
    try {
      await fichesPaiementApi.regler(id); // TODO: remplacer par annuler quand endpoint dispo
      await load();
    } catch (e) {
      alert(e instanceof Error ? e.message : "Erreur lors de l'annulation");
    }
  }

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return data;
    return data.filter(
      (f) =>
        f.code?.toLowerCase().includes(q) ||
        String(f.patient ?? "").toLowerCase().includes(q),
    );
  }, [data, search]);

  const colSpan = COLUMNS.filter((c) => visible[c.key]).length + 1;

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
              {visible.code      && <TableHead>Référence</TableHead>}
              {visible.patient   && <TableHead>Patient</TableHead>}
              {visible.service   && <TableHead>Service</TableHead>}
              {visible.netAPayer && <TableHead>Net à payer</TableHead>}
              {visible.creeLe    && <TableHead>Date de création</TableHead>}
              {visible.statut    && <TableHead>Statut</TableHead>}
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading && (
              <TableRow>
                <TableCell colSpan={colSpan} className="py-10 text-center text-muted-foreground">
                  Chargement des fiches…
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
            {!loading && !error && filtered.map((f) => (
              <TableRow
                key={f.id}
                onClick={() => ouvrirFiche(String(f.id))}
                className="cursor-pointer border-border"
              >
                {visible.code    && (
                  <TableCell className="font-medium text-teal-primary">{f.code}</TableCell>
                )}
                {visible.patient && (
                  <TableCell className="text-foreground">{String(f.patient ?? "")}</TableCell>
                )}
                {visible.service && (
                  <TableCell className="text-foreground">{f.service}</TableCell>
                )}
                {visible.netAPayer && (
                  <TableCell className="font-semibold text-foreground">
                    {formatFCFA(f.netAPayer)}
                  </TableCell>
                )}
                {visible.creeLe && (
                  <TableCell className="text-muted-foreground">
                    {formatDateLong(f.creeLe)}
                  </TableCell>
                )}
                {visible.statut && (
                  <TableCell>
                    <StatusBadge variant={badgeVariant(f.statut)}>
                      {statutLabel(f.statut)}
                    </StatusBadge>
                  </TableCell>
                )}
                <TableCell>
                  <div className="flex items-center justify-end gap-2">
                    <Button size="sm" variant="secondary"
                      onClick={(e) => { e.stopPropagation(); ouvrirFiche(String(f.id)); }}>
                      <Eye className="mr-1.5 h-4 w-4" /> Afficher
                    </Button>
                    <Button size="sm"
                      onClick={(e) => { e.stopPropagation(); validerFiche(String(f.id)); }}>
                      <Banknote className="mr-1.5 h-4 w-4" /> Valider
                    </Button>
                    <Button size="sm" variant="destructive"
                      onClick={(e) => { e.stopPropagation(); handleAnnuler(String(f.id), f.code ?? ""); }}>
                      <X className="mr-1.5 h-4 w-4" /> Annuler
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {!loading && !error && filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={colSpan} className="py-10 text-center text-muted-foreground">
                  Aucune fiche impayée.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}