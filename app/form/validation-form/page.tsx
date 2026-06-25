/* eslint-disable react-hooks/set-state-in-effect */
// // app/form/validation-form/page.tsx
// // Route : /form/validation-form?ref={reference}
// // Encaissement d'une fiche : saisie du Montant reçu, calcul de la Monnaie rendue,
// // rappel des informations (service, agent de caisse, date/heure).
// // Accès depuis "Valider" (/caisse/paiement-en-attente) et "Valider la fiche"
// // (/caisse/paiement-en-attente/consulter-fiche).
// // Styles : utilitaires Tailwind basés sur les tokens de app/globals.css.

// "use client";

// import { Suspense, useMemo, useState } from "react";
// import Link from "next/link";
// import { useRouter, useSearchParams } from "next/navigation";
// import { ArrowLeft, CheckCircle2 } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { getFicheDetail } from "@/lib/caisse/mock-data";
// import { formatDateLong, formatFCFA } from "@/lib/caisse/theme";

// function ValidationContent() {
//   const router = useRouter();
//   const params = useSearchParams();
//   const reference = params.get("ref") ?? "";
//   const fiche = getFicheDetail(reference);

//   const [montantRecu, setMontantRecu] = useState(0);
//   // Date/heure de la validation (figée au montage)
//   const maintenant = useMemo(() => new Date().toISOString(), []);

//   if (!fiche) {
//     return (
//       <div className="p-6">
//         <div className="mx-auto max-w-md rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
//           <p className="text-foreground">Fiche introuvable.</p>
//           <Button asChild variant="secondary" className="mt-4">
//             <Link href="/caisse/paiement-en-attente">
//               <ArrowLeft className="mr-2 h-4 w-4" /> Retour à la liste
//             </Link>
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   const totalAPayer = fiche.prestations.reduce((s, l) => s + l.montantTotal, 0);
//   const monnaieRendue = Math.max(0, montantRecu - totalAPayer);
//   const insuffisant = montantRecu > 0 && montantRecu < totalAPayer;
//   const peutValider = montantRecu >= totalAPayer;

//   function handleValider() {
//     // TODO API: POST /api/paiements/{reference}/regler { montantRecu }
//     router.push("/caisse/paiement-regle");
//   }

//   return (
//     <div className="p-4 sm:p-6">
//       <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
//         {/* Titre */}
//         <div className="border-b border-border px-6 py-4">
//           <h1 className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
//             Validation du paiement
//           </h1>
//         </div>

//         {/* Corps : 2 colonnes */}
//         <div className="grid gap-8 p-6 md:grid-cols-2">
//           {/* Colonne gauche : référence + saisie */}
//           <section className="space-y-4">
//             <h2 className="text-base font-semibold text-foreground">
//               Référence fiche de paiement
//             </h2>

//             <div className="rounded-xl bg-secondary/40 p-4">
//               <p className="text-sm text-muted-foreground">Numéro de reçu</p>
//               <p className="font-semibold text-foreground">{reference}</p>
//             </div>

//             {/* Montant reçu */}
//             <div className="space-y-1.5">
//               <label className="text-sm font-medium text-foreground">
//                 Montant reçu <span className="text-danger">*</span>
//               </label>
//               <div className="flex items-stretch gap-2">
//                 <input
//                   type="number"
//                   min={0}
//                   value={montantRecu}
//                   onChange={(e) => setMontantRecu(Number(e.target.value) || 0)}
//                   className="w-full rounded-xl border border-input bg-card px-4 py-2.5 text-lg text-foreground outline-none focus:border-transparent focus:ring-2 focus:ring-ring"
//                 />
//                 <span className="flex items-center rounded-xl border border-border bg-surface-2 px-4 font-bold text-foreground">
//                   F CFA
//                 </span>
//               </div>
//             </div>

//             {/* Monnaie rendue (calculée) */}
//             <div className="space-y-1.5">
//               <label className="text-sm font-medium text-foreground">
//                 Monnaie rendue <span className="text-danger">*</span>
//               </label>
//               <div className="flex items-stretch gap-2">
//                 <div className="w-full rounded-xl border border-border bg-muted px-4 py-2.5 text-lg text-muted-foreground">
//                   {monnaieRendue.toLocaleString("fr-FR")}
//                 </div>
//                 <span className="flex items-center rounded-xl border border-border bg-surface-2 px-4 font-bold text-foreground">
//                   F CFA
//                 </span>
//               </div>
//             </div>

//             <p className="text-sm text-muted-foreground">
//               Total à payer : <b className="text-foreground">{formatFCFA(totalAPayer)}</b>
//             </p>
//             {insuffisant && (
//               <p className="text-sm text-danger">
//                 Le montant reçu est inférieur au total à payer.
//               </p>
//             )}
//           </section>

//           {/* Colonne droite : informations complémentaires */}
//           <section className="space-y-5 rounded-2xl bg-secondary/30 p-6">
//             <h2 className="text-base font-semibold text-foreground">
//               Information complémentaire
//             </h2>
//             <div>
//               <p className="text-sm text-muted-foreground">Service de référence du reçu :</p>
//               <p className="font-semibold uppercase text-foreground">{fiche.service}</p>
//             </div>
//             <div>
//               <p className="text-sm text-muted-foreground">Agent de la Caisse</p>
//               <p className="text-lg font-semibold text-info">{fiche.caissier}</p>
//             </div>
//             <div>
//               <p className="text-sm text-muted-foreground">Date et Heure</p>
//               <p className="font-semibold text-foreground">{formatDateLong(maintenant)}</p>
//             </div>
//           </section>
//         </div>

//         {/* Pied : note + actions */}
//         <div className="flex flex-col gap-4 border-t border-border bg-secondary/40 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
//           <p className="max-w-md text-sm text-muted-foreground">
//             <span className="text-danger">*</span> Les champs marqués d'un astérisque sont
//             obligatoires pour valider votre enregistrement.
//           </p>
//           <div className="flex items-center gap-3">
//             <Button onClick={handleValider} disabled={!peutValider} className="rounded-full px-8">
//               <CheckCircle2 className="mr-2 h-4 w-4" /> Valider
//             </Button>
//             <Button asChild variant="destructive" className="rounded-full px-8">
//               <Link href="/caisse/paiement-en-attente">Annuler</Link>
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function ValidationFormPage() {
//   return (
//     <Suspense fallback={<div className="p-6 text-muted-foreground">Chargement…</div>}>
//       <ValidationContent />
//     </Suspense>
//   );
// }
























// // app/form/validation-form/page.tsx
// // Route : /form/validation-form?ref={reference}
// // Formulaire de règlement de la fiche de paiement (encaissement).
// // Accès : bouton "Valider" (/caisse/paiement-en-attente) et bouton "Régler"
// // (/accueil/paiement/voir-fiche). Données : backend NestJS via lib/caisse/api.
// // Styles : utilitaires Tailwind basés sur les tokens de app/globals.css.

// "use client";

// import { Suspense, useEffect, useMemo, useState } from "react";
// import Link from "next/link";
// import { useRouter, useSearchParams } from "next/navigation";
// import { Banknote, CheckCircle2 } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { getFiche, reglerFiche } from "@/lib/caisse/api";
// import { formatDateLong, formatFCFA, type FicheDetail } from "@/lib/caisse/theme";

// function ReglementContent() {
//   const router = useRouter();
//   const params = useSearchParams();
//   const reference = params.get("ref") ?? "";

//   const [fiche, setFiche] = useState<FicheDetail | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [montantRecu, setMontantRecu] = useState(0);
//   const [saving, setSaving] = useState(false);

//   // Date/heure du règlement (figée à l'ouverture)
//   const maintenant = useMemo(() => new Date().toISOString(), []);

//   useEffect(() => {
//     let actif = true;
//     (async () => {
//       try {
//         const f = await getFiche(reference);
//         if (actif) setFiche(f);
//       } catch (e) {
//         if (actif) setError(e instanceof Error ? e.message : "Erreur de chargement");
//       } finally {
//         if (actif) setLoading(false);
//       }
//     })();
//     return () => {
//       actif = false;
//     };
//   }, [reference]);

//   if (loading) return <div className="p-6 text-muted-foreground">Chargement…</div>;

//   if (error || !fiche) {
//     return (
//       <div className="p-6">
//         <div className="mx-auto max-w-md rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
//           <p className="text-danger">{error ?? "Fiche introuvable."}</p>
//           <Button asChild variant="secondary" className="mt-4">
//             <Link href="/caisse/paiement-en-attente">Retour à la liste</Link>
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   const montantAPayer = fiche.prestations.reduce((s, l) => s + l.montantTotal, 0);
//   const resteAPayer = Math.max(0, montantAPayer - montantRecu);
//   const monnaieRendue = Math.max(0, montantRecu - montantAPayer);
//   const peutEnregistrer = montantRecu >= montantAPayer;

//   async function handleEnregistrer() {
//     try {
//       setSaving(true);
//       await reglerFiche(fiche.reference);
//       router.push("/caisse/paiement-regle");
//     } catch (e) {
//       alert(e instanceof Error ? e.message : "Erreur lors de l'enregistrement");
//       setSaving(false);
//     }
//   }

//   return (
//     <div className="p-4 sm:p-6">
//       <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
//         {/* En-tête dégradé */}
//         <div className="bg-gradient-to-br from-info to-teal-primary px-6 py-7 text-center text-white">
//           <Banknote className="mx-auto h-10 w-10" />
//           <h1 className="mt-2 text-xl font-bold tracking-tight">
//             Formulaire de règlement de la fiche de paiement
//           </h1>
//         </div>

//         {/* Corps */}
//         <div className="space-y-5 p-6">
//           <h2 className="text-2xl font-semibold text-foreground">Reçu de paiement</h2>

//           {/* Référence du patient (lecture seule) */}
//           <div className="rounded-xl bg-muted px-4 py-3">
//             <p className="text-sm font-medium text-muted-foreground">
//               Référence du patient <span className="text-danger">*</span>
//             </p>
//             <p className="text-lg text-foreground">
//               {fiche.patient} <span className="text-muted-foreground">({fiche.matricule})</span>
//             </p>
//           </div>

//           {/* Montant à payer / Reste à payer */}
//           <div className="grid gap-4 sm:grid-cols-2">
//             <div className="rounded-2xl bg-info p-5 text-white">
//               <p className="text-sm/none opacity-90">Montant à payer</p>
//               <p className="mt-1 text-2xl font-bold">{formatFCFA(montantAPayer)}</p>
//             </div>
//             <div className="rounded-2xl bg-danger p-5 text-white">
//               <p className="text-sm/none opacity-90">Reste à payer</p>
//               <p className="mt-1 text-2xl font-bold">{formatFCFA(resteAPayer)}</p>
//             </div>
//           </div>

//           {/* 2 colonnes : saisie + infos */}
//           <div className="grid gap-6 md:grid-cols-2">
//             {/* Référence fiche + saisie */}
//             <section className="space-y-4">
//               <h3 className="font-semibold text-foreground">Référence fiche de paiement</h3>

//               <div className="rounded-xl bg-secondary/40 px-4 py-3">
//                 <p className="text-sm text-muted-foreground">Numéro de reçu</p>
//                 <p className="font-semibold text-foreground">{fiche.reference}</p>
//               </div>

//               <div className="space-y-1.5">
//                 <label className="text-sm font-medium text-foreground">
//                   Montant reçu <span className="text-danger">*</span>
//                 </label>
//                 <div className="flex items-stretch gap-2">
//                   <input
//                     type="number"
//                     min={0}
//                     value={montantRecu}
//                     onChange={(e) => setMontantRecu(Number(e.target.value) || 0)}
//                     className="w-full rounded-xl border border-input bg-card px-4 py-2.5 text-lg text-foreground outline-none focus:border-transparent focus:ring-2 focus:ring-ring"
//                   />
//                   <span className="flex items-center rounded-xl border border-border bg-surface-2 px-4 font-bold text-foreground">
//                     F CFA
//                   </span>
//                 </div>
//               </div>

//               <div className="space-y-1.5">
//                 <label className="text-sm font-medium text-foreground">
//                   Monnaie rendue <span className="text-danger">*</span>
//                 </label>
//                 <div className="flex items-stretch gap-2">
//                   <div className="w-full rounded-xl border border-border bg-muted px-4 py-2.5 text-lg text-muted-foreground">
//                     {monnaieRendue.toLocaleString("fr-FR")}
//                   </div>
//                   <span className="flex items-center rounded-xl border border-border bg-surface-2 px-4 font-bold text-foreground">
//                     F CFA
//                   </span>
//                 </div>
//               </div>
//             </section>

//             {/* Informations complémentaires */}
//             <section className="space-y-5">
//               <h3 className="font-semibold text-foreground">Information complémentaire</h3>
//               <div>
//                 <p className="text-sm text-muted-foreground">Service de référence du reçu :</p>
//                 <p className="font-semibold uppercase text-muted-foreground">{fiche.service}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-muted-foreground">Agent de la Caisse</p>
//                 <p className="text-lg font-semibold text-info">{fiche.caissier}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-muted-foreground">Date et Heure</p>
//                 <p className="font-semibold text-foreground">{formatDateLong(maintenant)}</p>
//               </div>
//             </section>
//           </div>
//         </div>

//         {/* Pied : actions */}
//         <div className="space-y-4 border-t border-border bg-secondary/30 px-6 py-6">
//           <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
//             <Button
//               onClick={handleEnregistrer}
//               disabled={!peutEnregistrer || saving}
//               className="rounded-full px-10 py-6 text-base sm:flex-1"
//             >
//               <CheckCircle2 className="mr-2 h-5 w-5" /> Enregistrer
//             </Button>
//             <Button
//               asChild
//               variant="destructive"
//               className="rounded-full px-10 py-6 text-base sm:flex-1"
//             >
//               <Link href="/caisse/paiement-en-attente">Annuler</Link>
//             </Button>
//           </div>
//           <p className="text-sm text-muted-foreground">
//             <span className="text-danger">*</span> Les champs marqués d'un astérisque sont
//             obligatoires pour valider votre enregistrement.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function ValidationFormPage() {
//   return (
//     <div className="min-h-screen bg-background">
//       <Suspense fallback={<div className="p-6 text-muted-foreground">Chargement…</div>}>
//         <ReglementContent />
//       </Suspense>
//     </div>
//   );
// }


















// // app/form/validation-form/page.tsx
// // Route : /form/validation-form?id={id}
// // Formulaire de règlement de la fiche de paiement (encaissement).
// // Accès :
// //   - bouton "Valider"  (/caisse/paiement-en-attente)
// //   - bouton "Régler"   (/accueil/paiement/voir-fiche)
// // Données : fichesPaiementApi.getById(id) via lib/caisse/api.

// "use client";

// import { Suspense, useEffect, useMemo, useState } from "react";
// import Link from "next/link";
// import { useRouter, useSearchParams } from "next/navigation";
// import { Banknote, CheckCircle2 } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { getFiche, reglerFiche } from "@/lib/caisse/api";
// import { formatDateLong, formatFCFA } from "@/lib/caisse/theme";
// import { fichesPaiementApi, type FicheDetail } from "@/lib/api/fiches-paiement";

// function ReglementContent() {
//   const router  = useRouter();
//   const params  = useSearchParams();
//   const id      = params.get("id") ?? "";

//   const [fiche,   setFiche]   = useState<FicheDetail | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error,   setError]   = useState<string | null>(null);
//   const [montantRecu, setMontantRecu] = useState(0);
//   const [saving,  setSaving]  = useState(false);

//   const maintenant = useMemo(() => new Date().toISOString(), []);

//   useEffect(() => {
//     let actif = true;
//     (async () => {
//       try {
//         const f = await getFiche(id);
//         if (actif) setFiche(f);
//       } catch (e) {
//         if (actif) setError(e instanceof Error ? e.message : "Erreur de chargement");
//       } finally {
//         if (actif) setLoading(false);
//       }
//     })();
//     return () => { actif = false; };
//   }, [id]);

//   if (loading) return <div className="p-6 text-muted-foreground">Chargement…</div>;

//   if (error || !fiche) {
//     return (
//       <div className="p-6">
//         <div className="mx-auto max-w-md rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
//           <p className="text-danger">{error ?? "Fiche introuvable."}</p>
//           <Button asChild variant="secondary" className="mt-4">
//             <Link href="/caisse/paiement-en-attente">Retour à la liste</Link>
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   const montantAPayer   = fiche.netAPayer;
//   const resteAPayer     = Math.max(0, montantAPayer - montantRecu);
//   const monnaieRendue   = Math.max(0, montantRecu - montantAPayer);
//   const peutEnregistrer = montantRecu >= montantAPayer;

//   const nomPatient = `${fiche.patient.nom}${fiche.patient.prenom ? " " + fiche.patient.prenom : ""}`;

// async function handleEnregistrer() {
//     if (!id) return;
//     try {
//       setSaving(true);
//       // Appel à l'API pour régler la fiche
//       await fichesPaiementApi.regler(id);
//       // Redirection vers la liste des paiements réglés (ou la liste générale)
//       router.push("/caisse/paiement-regle");
//       router.refresh(); // rafraîchit les données côté serveur
//     } catch (e) {
//       alert(e instanceof Error ? e.message : "Erreur lors de l'enregistrement");
//       setSaving(false);
//     }
//   }
//   return (
//     <div className="p-4 sm:p-6">
//       <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl border border-border bg-card shadow-sm">

//         {/* En-tête dégradé bleu → teal (fidèle à la maquette) */}
//         <div className="bg-gradient-to-br from-info to-teal-primary px-6 py-7 text-center text-white">
//           <Banknote className="mx-auto h-10 w-10" />
//           <h1 className="mt-2 text-xl font-bold tracking-tight">
//             Formulaire de règlement de la fiche de paiement
//           </h1>
//         </div>

//         {/* Corps */}
//         <div className="space-y-5 p-6">
//           <h2 className="text-2xl font-semibold text-foreground">Reçu de paiement</h2>

//           {/* Référence du patient (lecture seule) */}
//           <div className="rounded-xl bg-muted px-4 py-3">
//             <p className="text-sm font-medium text-muted-foreground">
//               Référence du patient <span className="text-danger">*</span>
//             </p>
//             <p className="text-lg text-foreground">{nomPatient}</p>
//           </div>

//           {/* Montant à payer / Reste à payer */}
//           <div className="grid gap-4 sm:grid-cols-2">
//             <div className="rounded-2xl bg-info p-5 text-white">
//               <p className="text-sm/none opacity-90">Montant à payer</p>
//               <p className="mt-1 text-2xl font-bold">{formatFCFA(montantAPayer)}</p>
//             </div>
//             <div className="rounded-2xl bg-danger p-5 text-white">
//               <p className="text-sm/none opacity-90">Reste à payer</p>
//               <p className="mt-1 text-2xl font-bold">{formatFCFA(resteAPayer)}</p>
//             </div>
//           </div>

//           {/* 2 colonnes */}
//           <div className="grid gap-6 md:grid-cols-2">

//             {/* Référence fiche + saisie */}
//             <section className="space-y-4">
//               <h3 className="font-semibold text-foreground">Référence fiche de paiement</h3>

//               <div className="rounded-xl bg-secondary/40 px-4 py-3">
//                 <p className="text-sm text-muted-foreground">Numéro de reçu</p>
//                 <p className="font-semibold text-foreground">{fiche.code}</p>
//               </div>

//               {/* Montant reçu */}
//               <div className="space-y-1.5">
//                 <label className="text-sm font-medium text-foreground">
//                   Montant reçu <span className="text-danger">*</span>
//                 </label>
//                 <div className="flex items-stretch gap-2">
//                   <input
//                     type="number"
//                     min={0}
//                     value={montantRecu}
//                     onChange={(e) => setMontantRecu(Number(e.target.value) || 0)}
//                     className="w-full rounded-xl border border-input bg-card px-4 py-2.5 text-lg text-foreground outline-none focus:border-transparent focus:ring-2 focus:ring-ring"
//                   />
//                   <span className="flex items-center rounded-xl border border-border bg-surface-2 px-4 font-bold text-foreground">
//                     F CFA
//                   </span>
//                 </div>
//               </div>

//               {/* Monnaie rendue */}
//               <div className="space-y-1.5">
//                 <label className="text-sm font-medium text-foreground">
//                   Monnaie rendue <span className="text-danger">*</span>
//                 </label>
//                 <div className="flex items-stretch gap-2">
//                   <div className="w-full rounded-xl border border-border bg-muted px-4 py-2.5 text-lg text-muted-foreground">
//                     {monnaieRendue.toLocaleString("fr-FR")}
//                   </div>
//                   <span className="flex items-center rounded-xl border border-border bg-surface-2 px-4 font-bold text-foreground">
//                     F CFA
//                   </span>
//                 </div>
//               </div>
//             </section>

//             {/* Informations complémentaires */}
//             <section className="space-y-5">
//               <h3 className="font-semibold text-foreground">Information complémentaire</h3>
//               <div>
//                 <p className="text-sm text-muted-foreground">Service de référence du reçu :</p>
//                 <p className="font-semibold uppercase text-muted-foreground">{fiche.service}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-muted-foreground">Agent de la Caisse</p>
//                 {/* TODO : récupérer le nom du caissier connecté via session/auth */}
//                 <p className="text-lg font-semibold text-info">FORM Form</p>
//               </div>
//               <div>
//                 <p className="text-sm text-muted-foreground">Date et Heure</p>
//                 <p className="font-semibold text-foreground">{formatDateLong(maintenant)}</p>
//               </div>
//             </section>
//           </div>
//         </div>

//         {/* Pied : Enregistrer + Annuler */}
//         <div className="space-y-4 border-t border-border bg-secondary/30 px-6 py-6">
//           <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
//             <Button
//               onClick={handleEnregistrer}
//               disabled={!peutEnregistrer || saving}
//               className="rounded-full px-10 py-6 text-base sm:flex-1"
//             >
//               <CheckCircle2 className="mr-2 h-5 w-5" />
//               {saving ? "Enregistrement…" : "Enregistrer"}
//             </Button>
//             <Button asChild variant="destructive" className="rounded-full px-10 py-6 text-base sm:flex-1">
//               <Link href="/caisse/paiement-en-attente">Annuler</Link>
//             </Button>
//           </div>
//           <p className="text-sm text-muted-foreground">
//             <span className="text-danger">*</span> Les champs marqués d&apos;un astérisque sont
//             obligatoires pour valider votre enregistrement.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function ValidationFormPage() {
//   return (
//     <div className="min-h-screen bg-background">
//       <Suspense fallback={<div className="p-6 text-muted-foreground">Chargement…</div>}>
//         <ReglementContent />
//       </Suspense>
//     </div>
//   );
// }













// app/form/validation-form/page.tsx
// Route : /form/validation-form?id={id}
// Formulaire de règlement — appelle fichesPaiementApi.regler(id) directement
// pour passer le statut de la fiche de EN_ATTENTE (impayee) → REGLE (payee) en BD.
// Plus de dépendance à lib/caisse/api.

"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Banknote, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  fichesPaiementApi,
  type FicheDetail,
} from "@/lib/api/fiches-paiement";
import { formatDateLong, formatFCFA } from "@/lib/caisse/theme";

/* ── Contenu du formulaire ──────────────────────────────────────────────── */
function ReglementContent() {
  const router = useRouter();
  const params = useSearchParams();
  const id     = params.get("id") ?? "";

  const [fiche,       setFiche]       = useState<FicheDetail | null>(null);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState<string | null>(null);
  const [montantRecu, setMontantRecu] = useState(0);
  const [saving,      setSaving]      = useState(false);

  // Date/heure figée à l'ouverture du formulaire
  const maintenant = useMemo(() => new Date().toISOString(), []);

  // Chargement de la fiche via fichesPaiementApi.getById
  useEffect(() => {
    if (!id) { setLoading(false); return; }
    let actif = true;
    fichesPaiementApi
      .getById(id)
      .then((f) => { if (actif) setFiche(f); })
      .catch((e) => { if (actif) setError(e instanceof Error ? e.message : "Erreur"); })
      .finally(() => { if (actif) setLoading(false); });
    return () => { actif = false; };
  }, [id]);

  if (loading) {
    return <div className="p-6 text-muted-foreground">Chargement…</div>;
  }

  if (error || !fiche) {
    return (
      <div className="p-6">
        <div className="mx-auto max-w-md rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
          <p className="text-danger">{error ?? "Fiche introuvable."}</p>
          <Button asChild variant="secondary" className="mt-4">
            <Link href="/caisse/paiement-en-attente">Retour à la liste</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Calculs
  const montantAPayer   = fiche.netAPayer;
  const resteAPayer     = Math.max(0, montantAPayer - montantRecu);
  const monnaieRendue   = Math.max(0, montantRecu - montantAPayer);
  const peutEnregistrer = montantRecu >= montantAPayer;
  const nomPatient      = `${fiche.patient.nom}${fiche.patient.prenom ? " " + fiche.patient.prenom : ""}`;

  // ── Enregistrer : passe la fiche à REGLE (statut "payee") en BD ──────────
  async function handleEnregistrer() {
    if (!id) return;
    try {
      setSaving(true);
      // Appel direct à fichesPaiementApi — PATCH /fiches-paiement/{id}/regler
      await fichesPaiementApi.regler(id);
      router.push("/caisse/paiement-regle");
      router.refresh(); // force le rechargement des données serveur
    } catch (e) {
      alert(e instanceof Error ? e.message : "Erreur lors de l'enregistrement");
      setSaving(false);
    }
  }

  return (
    <div className="p-4 sm:p-6">
      <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl border border-border bg-card shadow-sm">

        {/* En-tête dégradé bleu → teal */}
        <div className="bg-gradient-to-br from-info to-teal-primary px-6 py-7 text-center text-white">
          <Banknote className="mx-auto h-10 w-10" />
          <h1 className="mt-2 text-xl font-bold tracking-tight">
            Formulaire de règlement de la fiche de paiement
          </h1>
        </div>

        {/* Corps */}
        <div className="space-y-5 p-6">
          <h2 className="text-2xl font-semibold text-foreground">Reçu de paiement</h2>

          {/* Référence patient (lecture seule) */}
          <div className="rounded-xl bg-muted px-4 py-3">
            <p className="text-sm font-medium text-muted-foreground">
              Référence du patient <span className="text-danger">*</span>
            </p>
            <p className="text-lg text-foreground">{nomPatient}</p>
          </div>

          {/* Montant à payer / Reste à payer */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-info p-5 text-white">
              <p className="text-sm/none opacity-90">Montant à payer</p>
              <p className="mt-1 text-2xl font-bold">{formatFCFA(montantAPayer)}</p>
            </div>
            <div className="rounded-2xl bg-danger p-5 text-white">
              <p className="text-sm/none opacity-90">Reste à payer</p>
              <p className="mt-1 text-2xl font-bold">{formatFCFA(resteAPayer)}</p>
            </div>
          </div>

          {/* 2 colonnes */}
          <div className="grid gap-6 md:grid-cols-2">

            {/* Référence fiche + saisie */}
            <section className="space-y-4">
              <h3 className="font-semibold text-foreground">Référence fiche de paiement</h3>

              <div className="rounded-xl bg-secondary/40 px-4 py-3">
                <p className="text-sm text-muted-foreground">Numéro de reçu</p>
                <p className="font-semibold text-foreground">{fiche.code}</p>
              </div>

              {/* Montant reçu */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">
                  Montant reçu <span className="text-danger">*</span>
                </label>
                <div className="flex items-stretch gap-2">
                  <input
                    type="number"
                    min={0}
                    value={montantRecu}
                    onChange={(e) => setMontantRecu(Number(e.target.value) || 0)}
                    className="w-full rounded-xl border border-input bg-card px-4 py-2.5 text-lg text-foreground outline-none focus:border-transparent focus:ring-2 focus:ring-ring"
                  />
                  <span className="flex items-center rounded-xl border border-border bg-surface-2 px-4 font-bold text-foreground">
                    F CFA
                  </span>
                </div>
              </div>

              {/* Monnaie rendue (calculée automatiquement) */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">
                  Monnaie rendue <span className="text-danger">*</span>
                </label>
                <div className="flex items-stretch gap-2">
                  <div className="w-full rounded-xl border border-border bg-muted px-4 py-2.5 text-lg text-muted-foreground">
                    {monnaieRendue.toLocaleString("fr-FR")}
                  </div>
                  <span className="flex items-center rounded-xl border border-border bg-surface-2 px-4 font-bold text-foreground">
                    F CFA
                  </span>
                </div>
              </div>
            </section>

            {/* Informations complémentaires */}
            <section className="space-y-5">
              <h3 className="font-semibold text-foreground">Information complémentaire</h3>
              <div>
                <p className="text-sm text-muted-foreground">Service de référence du reçu :</p>
                <p className="font-semibold uppercase text-muted-foreground">{fiche.service}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Agent de la Caisse</p>
                {/* TODO : session/auth → nom du caissier connecté */}
                <p className="text-lg font-semibold text-info">FORM Form</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Date et Heure</p>
                <p className="font-semibold text-foreground">{formatDateLong(maintenant)}</p>
              </div>
            </section>
          </div>
        </div>

        {/* Pied : Enregistrer + Annuler */}
        <div className="space-y-4 border-t border-border bg-secondary/30 px-6 py-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              onClick={handleEnregistrer}
              disabled={!peutEnregistrer || saving}
              className="rounded-full px-10 py-6 text-base sm:flex-1"
            >
              <CheckCircle2 className="mr-2 h-5 w-5" />
              {saving ? "Enregistrement…" : "Enregistrer"}
            </Button>
            <Button
              asChild
              variant="destructive"
              className="rounded-full px-10 py-6 text-base sm:flex-1"
            >
              <Link href="/caisse/paiement-en-attente">Annuler</Link>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            <span className="text-danger">*</span> Les champs marqués d&apos;un astérisque sont
            obligatoires pour valider votre enregistrement.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ValidationFormPage() {
  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={<div className="p-6 text-muted-foreground">Chargement…</div>}>
        <ReglementContent />
      </Suspense>
    </div>
  );
}






 