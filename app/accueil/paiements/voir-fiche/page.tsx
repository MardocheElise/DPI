// // Route: /accueil/paiements/voir-fiche?id=ID
// // Affiche le reçu d'une fiche (patient + fiche depuis la base) en 3 exemplaires sur une A4.

// import { notFound } from "next/navigation";
// import { RecuFiche } from "@/components/patients/RecuFiche";
// import { FicheActions } from "@/components/patients/FicheActions";
// import { fichesPaiementApi, type FicheDetail } from "@/lib/api/fiches-paiement";

// export default async function VoirFichePage({
//   searchParams,
// }: {
//   searchParams: Promise<{ id?: string }>;
// }) {
//   const { id } = await searchParams;
//   if (!id) notFound();

//   let fiche: FicheDetail | null = null;
//   try {
//     fiche = await fichesPaiementApi.getById(id);
//   } catch {
//     fiche = null;
//   }
//   if (!fiche) notFound();

//   return (
//     <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
//       {/* Mise en page d'impression : A4, marges réduites, couleurs conservées */}
//       <style>{`
//         @media print {
//           @page { size: A4 portrait; margin: 8mm; }
//           html, body { background: #fff !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
//         }
//       `}</style>

//       <div className="mx-auto max-w-4xl space-y-5">
//         <FicheActions ficheId={fiche.id} dejaReglee={fiche.statut === "payee"} />

//         {/* 3 exemplaires sur la même page */}
//         <div className="space-y-4 print:space-y-3">
//           {[1, 2, 3].map((n) => (
//             <div key={n}>
//               <p className="mb-1 text-[10px] font-medium uppercase tracking-wide text-muted-foreground print:hidden">
//                 Exemplaire {n} / 3
//               </p>
//               <RecuFiche fiche={fiche!} />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }



// // app/accueil/paiement/voir-fiche/page.tsx
// // Route : /accueil/paiement/voir-fiche?ref={reference}
// // Consultation d'une fiche de paiement (données backend NestJS).
// // Bouton "Régler" → formulaire de règlement (/form/validation-form).

// "use client";

// import { Suspense, useEffect, useState } from "react";
// import Link from "next/link";
// import { useRouter, useSearchParams } from "next/navigation";
// import { ArrowLeft, Banknote, Printer } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { getFiche } from "@/lib/caisse/api";
// import {
//   badgeVariant,
//   formatDateLong,
//   formatFCFA,
//   statutLabel,
//   type FicheDetail,
// } from "@/lib/caisse/theme";
// import { StatusBadge } from "@/components/caisse/StatusBadge";

// function VoirFicheContent() {
//   const router = useRouter();
//   const params = useSearchParams();
//   const reference = params.get("ref") ?? "";

//   const [fiche, setFiche] = useState<FicheDetail | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

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

//   if (loading) {
//     return <div className="p-6 text-muted-foreground">Chargement de la fiche…</div>;
//   }

//   if (error || !fiche) {
//     return (
//       <div className="p-6">
//         <div className="mx-auto max-w-md rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
//           <p className="text-danger">{error ?? "Fiche introuvable."}</p>
//           <Button asChild variant="secondary" className="mt-4">
//             <Link href="/caisse/paiement-en-attente">
//               <ArrowLeft className="mr-2 h-4 w-4" /> Retour à la liste
//             </Link>
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   const total = fiche.prestations.reduce((s, l) => s + l.montantTotal, 0);
//   const reglable = fiche.statut !== "annule";

//   return (
//     <div className="p-4 sm:p-6">
//       <div className="mx-auto max-w-4xl space-y-5">
//         {/* Barre d'actions */}
//         <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
//           <div>
//             <h1 className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
//               Fiche de paiement
//             </h1>
//             <p className="text-sm text-muted-foreground">{fiche.reference}</p>
//           </div>
//           <div className="flex flex-wrap items-center gap-2">
//             {/* Régler → formulaire de règlement */}
//             <Button
//               disabled={!reglable}
//               onClick={() =>
//                 router.push(`/form/validation-form?ref=${encodeURIComponent(fiche.reference)}`)
//               }
//             >
//               <Banknote className="mr-2 h-4 w-4" /> Régler
//             </Button>
//             <Button asChild variant="secondary">
//               <Link href={`/caisse/paiement-en-attente/consulter-fiche?ref=${encodeURIComponent(fiche.reference)}`}>
//                 <Printer className="mr-2 h-4 w-4" /> Imprimer le reçu
//               </Link>
//             </Button>
//             <Button asChild variant="outline">
//               <Link href="/caisse/paiement-en-attente">
//                 <ArrowLeft className="mr-2 h-4 w-4" /> Retour
//               </Link>
//             </Button>
//           </div>
//         </div>

//         {/* Informations de la fiche */}
//         <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
//           <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
//             <Info label="Patient" value={`${fiche.patient} (${fiche.matricule})`} />
//             <Info label="Service" value={fiche.service} />
//             <Info label="Statut">
//               <StatusBadge variant={badgeVariant(fiche.statut)}>
//                 {statutLabel(fiche.statut)}
//               </StatusBadge>
//             </Info>
//             <Info label="Sexe / Âge" value={`${fiche.sexe} · ${fiche.age} ans`} />
//             <Info label="Assuré" value={fiche.assure ? "Oui" : "Non"} />
//             <Info label="Éditée le" value={formatDateLong(fiche.dateCreation)} />
//             <Info label="Édité par" value={fiche.caissier} />
//             <Info label="N° de reçu" value={fiche.numeroRecu} />
//           </div>
//         </div>

//         {/* Prestations */}
//         <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
//           <Table>
//             <TableHeader>
//               <TableRow className="caisse-thead hover:bg-surface-2">
//                 <TableHead>Service</TableHead>
//                 <TableHead>Prestation</TableHead>
//                 <TableHead className="text-right">Montant acte</TableHead>
//                 <TableHead className="text-center">Qte</TableHead>
//                 <TableHead className="text-center">Taux réduit</TableHead>
//                 <TableHead className="text-right">Montant total</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {fiche.prestations.map((l, i) => (
//                 <TableRow key={i} className="border-border">
//                   <TableCell className="text-foreground">{l.service}</TableCell>
//                   <TableCell className="text-foreground">{l.prestation}</TableCell>
//                   <TableCell className="text-right text-foreground">{formatFCFA(l.montantActe)}</TableCell>
//                   <TableCell className="text-center text-foreground">{l.qte}</TableCell>
//                   <TableCell className="text-center text-foreground">{l.tauxReduit} %</TableCell>
//                   <TableCell className="text-right font-semibold text-foreground">
//                     {formatFCFA(l.montantTotal)}
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//           <div className="flex justify-end border-t border-border bg-surface-2 px-4 py-3">
//             <p className="font-bold text-foreground">
//               TOTAL À PAYER : <span className="text-teal-primary">{formatFCFA(total)}</span>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function Info({
//   label,
//   value,
//   children,
// }: {
//   label: string;
//   value?: string;
//   children?: React.ReactNode;
// }) {
//   return (
//     <div>
//       <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
//       <div className="mt-0.5 font-medium text-foreground">{children ?? value}</div>
//     </div>
//   );
// }

// export default function VoirFichePage() {
//   return (
//     <div className="min-h-screen bg-background">
//       <Suspense fallback={<div className="p-6 text-muted-foreground">Chargement…</div>}>
//         <VoirFicheContent />
//       </Suspense>
//     </div>
//   );
// }
















// // app/accueil/paiement/voir-fiche/page.tsx
// // Route : /accueil/paiement/voir-fiche?id={id}
// // Consultation d'une fiche de paiement (données backend via fichesPaiementApi).
// // Bouton "Régler" → /form/validation-form?id={id}

// "use client";

// import { Suspense, useEffect, useState } from "react";
// import Link from "next/link";
// import { useRouter, useSearchParams } from "next/navigation";
// import { ArrowLeft, Banknote, Printer } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   Table, TableBody, TableCell,
//   TableHead, TableHeader, TableRow,
// } from "@/components/ui/table";
// import { getFiche }     from "@/lib/caisse/api";
// import {
//   badgeVariant, formatDateLong, formatFCFA, statutLabel,
// } from "@/lib/caisse/theme";
// import type { FicheDetail } from "@/lib/api/fiches-paiement";
// import { StatusBadge } from "@/components/caisse/StatusBadge";

// function VoirFicheContent() {
//   const router  = useRouter();
//   const params  = useSearchParams();
//   const id      = params.get("id") ?? "";

//   const [fiche,   setFiche]   = useState<FicheDetail | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error,   setError]   = useState<string | null>(null);

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

//   if (loading) return <div className="p-6 text-muted-foreground">Chargement de la fiche…</div>;

//   if (error || !fiche) {
//     return (
//       <div className="p-6">
//         <div className="mx-auto max-w-md rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
//           <p className="text-danger">{error ?? "Fiche introuvable."}</p>
//           <Button asChild variant="secondary" className="mt-4">
//             <Link href="/caisse/paiement-en-attente">
//               <ArrowLeft className="mr-2 h-4 w-4" /> Retour à la liste
//             </Link>
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   const nomPatient = `${fiche.patient.nom}${fiche.patient.prenom ? " " + fiche.patient.prenom : ""}`;

//   return (
//     <div className="p-4 sm:p-6">
//       <div className="mx-auto max-w-4xl space-y-5">
//         {/* Barre d'actions */}
//         <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
//           <div>
//             <h1 className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
//               Fiche de paiement
//             </h1>
//             <p className="text-sm text-muted-foreground">{fiche.code}</p>
//           </div>
//           <div className="flex flex-wrap items-center gap-2">
//             {/* Régler → formulaire de règlement */}
//             <Button
//               disabled={fiche.statut === "payee"}
//               onClick={() => router.push(`/form/validation-form?id=${id}`)}
//             >
//               <Banknote className="mr-2 h-4 w-4" /> Régler
//             </Button>
//             <Button asChild variant="secondary">
//               <Link href={`/caisse/paiement-en-attente/consulter-fiche?id=${id}`}>
//                 <Printer className="mr-2 h-4 w-4" /> Imprimer le reçu
//               </Link>
//             </Button>
//             <Button asChild variant="outline">
//               <Link href="/caisse/paiement-en-attente">
//                 <ArrowLeft className="mr-2 h-4 w-4" /> Retour
//               </Link>
//             </Button>
//           </div>
//         </div>

//         {/* Informations */}
//         <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
//           <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
//             <Info label="Patient"   value={nomPatient} />
//             <Info label="Contact"   value={fiche.patient.contact} />
//             <Info label="Assurance" value={fiche.patient.assuranceNom ?? "Non assuré"} />
//             <Info label="Service"   value={fiche.service} />
//             <Info label="Statut">
//               <StatusBadge variant={badgeVariant(fiche.statut)}>
//                 {statutLabel(fiche.statut)}
//               </StatusBadge>
//             </Info>
//             <Info label="Éditée le" value={formatDateLong(fiche.creeLe)} />
//           </div>
//         </div>

//         {/* Prestations */}
//         <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
//           <Table>
//             <TableHeader>
//               <TableRow className="caisse-thead hover:bg-surface-2">
//                 <TableHead>Type</TableHead>
//                 <TableHead className="text-center">Qté</TableHead>
//                 <TableHead className="text-right">Prix unitaire</TableHead>
//                 <TableHead className="text-right">Total</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {fiche.prestations.map((p) => (
//                 <TableRow key={p.id} className="border-border">
//                   <TableCell className="text-foreground">{p.type}</TableCell>
//                   <TableCell className="text-center text-foreground">{p.quantite}</TableCell>
//                   <TableCell className="text-right text-foreground">
//                     {formatFCFA(p.prixUnitaire)}
//                   </TableCell>
//                   <TableCell className="text-right font-semibold text-foreground">
//                     {formatFCFA(p.quantite * p.prixUnitaire)}
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>

//           {/* Récapitulatif financier */}
//           <div className="space-y-1 border-t border-border bg-surface-2 px-4 py-3 text-right">
//             <p className="text-sm text-muted-foreground">
//               Coût total : <span className="font-medium text-foreground">{formatFCFA(fiche.coutTotal)}</span>
//             </p>
//             <p className="text-sm text-muted-foreground">
//               Part assurance : <span className="font-medium text-foreground">{formatFCFA(fiche.coutAssure)}</span>
//             </p>
//             <p className="text-lg font-bold text-foreground">
//               NET À PAYER : <span className="text-teal-primary">{formatFCFA(fiche.netAPayer)}</span>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function Info({ label, value, children }: {
//   label: string; value?: string; children?: React.ReactNode;
// }) {
//   return (
//     <div>
//       <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
//       <div className="mt-0.5 font-medium text-foreground">{children ?? value}</div>
//     </div>
//   );
// }

// export default function VoirFichePage() {
//   return (
//     <div className="min-h-screen bg-background">
//       <Suspense fallback={<div className="p-6 text-muted-foreground">Chargement…</div>}>
//         <VoirFicheContent />
//       </Suspense>
//     </div>
//   );
// }






















"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Banknote, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell,
  TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { fichesPaiementApi, FicheDetail } from "@/lib/api/fiches-paiement";
import { formatFCFA, formatDateTimeFr } from "@/lib/data/format";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/data/utils";

// Définition du StatusBadge local ou import depuis un composant partagé
function StatusBadge({ statut }: { statut: FicheDetail['statut'] }) {
  const styles = {
    payee: { label: "Payée", className: "bg-[#C8F4D6] text-[#138A3E]" },
    impayee: { label: "Impayée", className: "bg-[#FFC1C4] text-[#D92D2D]" },
    partiel: { label: "Partiel", className: "bg-[#FFE6B0] text-[#B26A00]" },
  };
  const s = styles[statut];
  return (
    <Badge className={cn("border-transparent font-semibold", s.className)}>
      {s.label}
    </Badge>
  );
}

function VoirFicheContent() {
  const router = useRouter();
  const params = useSearchParams();
  const id = params.get("id") ?? "";

  const [fiche, setFiche] = useState<FicheDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let actif = true;
    (async () => {
      try {
        const f = await fichesPaiementApi.getById(id);
        if (actif) setFiche(f);
      } catch (e) {
        if (actif) setError(e instanceof Error ? e.message : "Erreur de chargement");
      } finally {
        if (actif) setLoading(false);
      }
    })();
    return () => { actif = false; };
  }, [id]);

  if (loading) return <div className="p-6 text-muted-foreground">Chargement de la fiche…</div>;

  if (error || !fiche) {
    return (
      <div className="p-6">
        <div className="mx-auto max-w-md rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
          <p className="text-destructive">{error ?? "Fiche introuvable."}</p>
          <Button asChild variant="secondary" className="mt-4">
            <Link href="/accueil/paiements">
              <ArrowLeft className="mr-2 h-4 w-4" /> Retour à la liste
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const nomPatient = `${fiche.patient.nom}${fiche.patient.prenom ? " " + fiche.patient.prenom : ""}`;

  return (
    <div className="p-4 sm:p-6">
      <div className="mx-auto max-w-4xl space-y-5">
        {/* Barre d'actions */}
        <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
              Fiche de paiement
            </h1>
            <p className="text-sm text-muted-foreground">{fiche.code}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button
              disabled={fiche.statut === "payee"}
              onClick={() => router.push(`/form/validation-form?id=${id}`)}
            >
              <Banknote className="mr-2 h-4 w-4" /> Régler
            </Button>
            <Button asChild variant="secondary">
              <Link href={`/accueil/paiements/voir-fiche/reçu?id=${id}`}>
                <Printer className="mr-2 h-4 w-4" /> Imprimer le reçu
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/accueil/paiements">
                <ArrowLeft className="mr-2 h-4 w-4" /> Retour
              </Link>
            </Button>
          </div>
        </div>

        {/* Informations */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Info label="Patient" value={nomPatient} />
            <Info label="Contact" value={fiche.patient.contact} />
            <Info label="Assurance" value={fiche.patient.assuranceNom ?? "Non assuré"} />
            <Info label="Service" value={fiche.service} />
            <Info label="Statut">
              <StatusBadge statut={fiche.statut} />
            </Info>
            <Info label="Éditée le" value={formatDateTimeFr(fiche.creeLe)} />
          </div>
        </div>

        {/* Prestations */}
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Type</TableHead>
                <TableHead className="text-center">Qté</TableHead>
                <TableHead className="text-right">Prix unitaire</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fiche.prestations.map((p) => (
                <TableRow key={p.id} className="border-border">
                  <TableCell className="text-foreground">{p.type}</TableCell>
                  <TableCell className="text-center text-foreground">{p.quantite}</TableCell>
                  <TableCell className="text-right text-foreground">
                    {formatFCFA(p.prixUnitaire)}
                  </TableCell>
                  <TableCell className="text-right font-semibold text-foreground">
                    {formatFCFA(p.quantite * p.prixUnitaire)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Récapitulatif financier */}
          <div className="space-y-1 border-t border-border bg-muted/30 px-4 py-3 text-right">
            <p className="text-sm text-muted-foreground">
              Coût total : <span className="font-medium text-foreground">{formatFCFA(fiche.coutTotal)}</span>
            </p>
            <p className="text-sm text-muted-foreground">
              Part assurance : <span className="font-medium text-foreground">{formatFCFA(fiche.coutAssure)}</span>
            </p>
            <p className="text-lg font-bold text-foreground">
              NET À PAYER : <span className="text-[#0d9488]">{formatFCFA(fiche.netAPayer)}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value, children }: {
  label: string; value?: string; children?: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
      <div className="mt-0.5 font-medium text-foreground">{children ?? value}</div>
    </div>
  );
}

export default function VoirFichePage() {
  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={<div className="p-6 text-muted-foreground">Chargement…</div>}>
        <VoirFicheContent />
      </Suspense>
    </div>
  );
}