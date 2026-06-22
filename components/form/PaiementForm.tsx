// "use client";

// import { useMemo, useState } from "react";
// import { useRouter } from "next/navigation";
// import { Pencil, Plus, Trash2 } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { formatFCFA } from "@/lib/format";
// import { Patient } from "@/lib/dataPatients/patient";
// import { ASSURANCES, SERVICES, TYPES_PRESTATION } from "@/lib/dataPatients/paiementOption";
// import  Topbar  from '@/components/Topbar';

// interface LignePrestation {
//   id: number;
//   type: string;
//   quantite: number;
//   prixUnitaire: number;
// }

// function ligneVide(id: number): LignePrestation {
//   return { id, type: "", quantite: 1, prixUnitaire: 0 };
// }

// export function PaiementForm({ patient }: { patient: Patient | null }) {
//   const router = useRouter();

//   const [service, setService] = useState("");
//   const [assurance, setAssurance] = useState("aucune");
//   const [prestations, setPrestations] = useState<LignePrestation[]>([ligneVide(1)]);

//   function ajouterLigne() {
//     setPrestations((p) => [...p, ligneVide(Date.now())]);
//   }

//   function supprimerLigne(id: number) {
//     setPrestations((p) => (p.length === 1 ? p : p.filter((l) => l.id !== id)));
//   }

//   function majLigne(id: number, champ: keyof LignePrestation, valeur: string) {
//     setPrestations((p) =>
//       p.map((l) => {
//         if (l.id !== id) return l;
//         if (champ === "type") {
//           const t = TYPES_PRESTATION.find((x) => x.value === valeur);
//           return { ...l, type: valeur, prixUnitaire: t ? t.prixUnitaire : 0 };
//         }
//         if (champ === "quantite") return { ...l, quantite: Math.max(0, Number(valeur) || 0) };
//         if (champ === "prixUnitaire") return { ...l, prixUnitaire: Math.max(0, Number(valeur) || 0) };
//         return l;
//       })
//     );
//   }

//   // --- Récapitulatif ---
//   const { coutTotal, quantiteTotale, totalAssure, totalAPayer } = useMemo(() => {
//     const cout = prestations.reduce((s, l) => s + l.quantite * l.prixUnitaire, 0);
//     const qte = prestations.reduce((s, l) => s + l.quantite, 0);
//     const taux = ASSURANCES.find((a) => a.value === assurance)?.taux ?? 0;
//     const assure = Math.round(cout * taux);
//     return {
//       coutTotal: cout,
//       quantiteTotale: qte,
//       totalAssure: assure,
//       totalAPayer: cout - assure,
//     };
//   }, [prestations, assurance]);

//   const refPatient = patient
//     ? `${patient.code} — ${patient.nom} (${patient.contact})`
//     : "Aucun patient sélectionné";

//   return (
//     <>
//       <Topbar title="Paiement"/>
//       <div className="mx-auto max-w-6xl space-y-6 p-4 sm:p-6 lg:p-8">

//         {/* Header */}
//         <header className="rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 p-5 border border-blue-100">
//           <h1 className="text-2xl font-bold tracking-tight text-blue-900 sm:text-3xl">
//             Formulaire de création de fiche de paiement
//           </h1>
//           <p className="mt-1 text-sm text-blue-700">
//             Renseignez l&apos;identification du patient et les prestations à facturer.
//           </p>
//         </header>

//         {/* IDENTIFICATION */}
//         <section className="space-y-5 rounded-2xl border border-blue-200 bg-blue-50/40 p-5 shadow-sm sm:p-6">
//           <h2 className="text-lg font-semibold text-blue-900">Identification</h2>

//           {/* Référence patient */}
//           <div className="space-y-1.5">
//             <Label htmlFor="ref-patient" className="text-blue-700 font-medium">
//               Référence du patient <span className="text-destructive">*</span>
//             </Label>

//             <div className="flex gap-2">
//               <Input
//                 id="ref-patient"
//                 readOnly
//                 value={refPatient}
//                 className="bg-white border-blue-200 font-medium"
//               />

//               <Button
//                 type="button"
//                 variant="outline"
//                 className="shrink-0 gap-2 border-blue-300 text-blue-600 hover:bg-blue-50"
//               >
//                 <Pencil className="h-4 w-4" />
//                 Éditer
//               </Button>
//             </div>
//           </div>

//           {/* Service */}
//           <div className="space-y-1.5">
//             <Label className="text-blue-700 font-medium">
//               Service <span className="text-destructive">*</span>
//             </Label>

//             <Select value={service} onValueChange={setService}>
//               <SelectTrigger className="bg-white border-blue-200 focus:border-blue-500">
//                 <SelectValue placeholder="Sélectionner un service" />
//               </SelectTrigger>

//               <SelectContent>
//                 {SERVICES.map((s) => (
//                   <SelectItem key={s.value} value={s.value}>
//                     {s.label}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>

//           {/* Prestations */}
//           <div className="space-y-3">
//             <Label className="text-blue-700 font-medium">
//               Type de prestation <span className="text-destructive">*</span>
//             </Label>

//             {prestations.map((l) => {
//               const totalPartiel = l.quantite * l.prixUnitaire;

//               return (
//                 <div
//                   key={l.id}
//                   className="grid grid-cols-1 items-end gap-3 rounded-xl border border-blue-100 bg-white p-3 md:grid-cols-12"
//                 >
//                   {/* Type */}
//                   <div className="space-y-1 md:col-span-4">
//                     <span className="text-xs text-blue-600">Prestation</span>
//                     <Select
//                       value={l.type}
//                       onValueChange={(v) => majLigne(l.id, "type", v)}
//                     >
//                       <SelectTrigger className="bg-white border-blue-200">
//                         <SelectValue placeholder="Type de prestation" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         {TYPES_PRESTATION.map((t) => (
//                           <SelectItem key={t.value} value={t.value}>
//                             {t.label}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </div>

//                   {/* Quantité */}
//                   <div className="space-y-1 md:col-span-2">
//                     <span className="text-xs text-blue-600">Quantité</span>
//                     <Input
//                       type="number"
//                       min={0}
//                       value={l.quantite}
//                       onChange={(e) => majLigne(l.id, "quantite", e.target.value)}
//                       className="bg-white border-blue-200"
//                     />
//                   </div>

//                   {/* Prix */}
//                   <div className="space-y-1 md:col-span-2">
//                     <span className="text-xs text-blue-600">Prix unitaire</span>
//                     <Input
//                       type="number"
//                       min={0}
//                       value={l.prixUnitaire}
//                       onChange={(e) => majLigne(l.id, "prixUnitaire", e.target.value)}
//                       className="bg-white border-blue-200"
//                     />
//                   </div>

//                   {/* Total */}
//                   <div className="space-y-1 md:col-span-3">
//                     <span className="text-xs text-blue-600">Total</span>
//                     <Input
//                       readOnly
//                       value={formatFCFA(totalPartiel)}
//                       className="bg-blue-50 font-semibold"
//                     />
//                   </div>

//                   {/* Delete */}
//                   <div className="md:col-span-1 md:flex md:justify-end">
//                     <button
//                       type="button"
//                       onClick={() => supprimerLigne(l.id)}
//                       className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition"
//                     >
//                       <Trash2 className="h-4 w-4" />
//                     </button>
//                   </div>
//                 </div> 
//               );
//             })}

//             <Button
//               type="button"
//               className="gap-2 border-blue-300 text-blue-600 hover:bg-blue-50"
//               variant="outline"
//               onClick={ajouterLigne}
//             >
//               <Plus className="h-4 w-4" />
//               Ajouter une prestation
//             </Button>
//           </div>

//           {/* Assurance */}
//           <div className="space-y-1.5">
//             <Label className="text-blue-700 font-medium">Assurance patient</Label>

//             <Select value={assurance} onValueChange={setAssurance}>
//               <SelectTrigger className="bg-white border-blue-200">
//                 <SelectValue placeholder="Sélectionner une assurance" />
//               </SelectTrigger>

//               <SelectContent>
//                 {ASSURANCES.map((a) => (
//                   <SelectItem key={a.value} value={a.value}>
//                     {a.label} {a.taux > 0 ? `(${Math.round(a.taux * 100)}%)` : ""}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>
//         </section>

//         {/* RECAP */}
//         <section className="grid gap-4 md:grid-cols-2">

//           <div className="rounded-2xl border border-cyan-300 bg-cyan-50 p-5">
//             <h3 className="border-b border-cyan-200 pb-3 text-xl font-bold text-cyan-900">
//               Détails Prestations
//             </h3>

//             <div className="mt-4 grid grid-cols-2 gap-4 text-cyan-900">
//               <p className="font-semibold">
//                 Nombre Prestations<br />
//                 <span className="font-bold">{prestations.length}</span>
//               </p>

//               <p className="font-semibold">
//                 Quantité Totale<br />
//                 <span className="font-bold">{quantiteTotale}</span>
//               </p>
//             </div>
//           </div>

//           <div className="space-y-4">

//             <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-5 text-white">
//               <p className="text-sm opacity-90">Coût Total</p>
//               <p className="text-2xl font-bold">{formatFCFA(coutTotal)}</p>
//             </div>

//             <div className="grid grid-cols-2 gap-4">

//               <div className="rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 p-5 text-white">
//                 <p className="text-sm opacity-90">Total Assuré</p>
//                 <p className="text-xl font-bold">{formatFCFA(totalAssure)}</p>
//               </div>

//               <div className="rounded-2xl bg-gradient-to-r from-orange-500 to-rose-500 p-5 text-white">
//                 <p className="text-sm opacity-90">Total à payer</p>
//                 <p className="text-xl font-bold">{formatFCFA(totalAPayer)}</p>
//               </div>

//             </div>
//           </div>
//         </section>

//         {/* ACTIONS */}
//         <section className="rounded-2xl bg-blue-50 p-6">

//           <div className="grid gap-4 md:grid-cols-2">

//             <Button
//               type="submit"
//               className="h-12 w-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
//             >
//               Enregistrer
//             </Button>

//             <div className="space-y-3">

//               <Button
//                 type="button"
//                 onClick={() => router.back()}
//                 className="h-12 w-full rounded-full bg-gradient-to-r from-rose-500 to-red-500 text-white"
//               >
//                 Annuler
//               </Button>

//               <Button
//                 type="button"
//                 onClick={() => router.push("/accueil/paiements")}
//                 className="h-12 w-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 text-white"
//               >
//                 Liste des fiches
//               </Button>

//             </div>

//           </div>
//         </section>
//       </div>
//     </>
//   );
// }




// Route: /form/paiement-form
// Formulaire de création d'une fiche de paiement.
// Composant client : gestion des prestations dynamiques + calcul des totaux en temps réel.

"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Pencil,
  Plus,
  Trash2,
  ReceiptText,
  IdCard,
  Stethoscope,
  ClipboardList,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatFCFA } from "@/lib/data/format";
import { ASSURANCES, SERVICES, TYPES_PRESTATION } from "@/lib/dataPatients/paiementOption";
import { Patient } from "@/lib/dataPatients/patient";
interface LignePrestation {
  id: number;
  type: string;
  quantite: number;
  prixUnitaire: number;
}

function ligneVide(id: number): LignePrestation {
  return { id, type: "", quantite: 1, prixUnitaire: 0 };
}

export function PaiementForm({ patient }: { patient: Patient | null }) {
  const router = useRouter();

  const [service, setService] = useState("");
  const [assurance, setAssurance] = useState("aucune");
  const [prestations, setPrestations] = useState<LignePrestation[]>([ligneVide(1)]);

  function ajouterLigne() {
    setPrestations((p) => [...p, ligneVide(Date.now())]);
  }

  function supprimerLigne(id: number) {
    setPrestations((p) => (p.length === 1 ? p : p.filter((l) => l.id !== id)));
  }

  function majLigne(id: number, champ: keyof LignePrestation, valeur: string) {
    setPrestations((p) =>
      p.map((l) => {
        if (l.id !== id) return l;
        if (champ === "type") {
          const t = TYPES_PRESTATION.find((x) => x.value === valeur);
          return { ...l, type: valeur, prixUnitaire: t ? t.prixUnitaire : 0 };
        }
        if (champ === "quantite") return { ...l, quantite: Math.max(0, Number(valeur) || 0) };
        if (champ === "prixUnitaire") return { ...l, prixUnitaire: Math.max(0, Number(valeur) || 0) };
        return l;
      })
    );
  }

  // --- Récapitulatif ---
  const { coutTotal, quantiteTotale, totalAssure, totalAPayer } = useMemo(() => {
    const cout = prestations.reduce((s, l) => s + l.quantite * l.prixUnitaire, 0);
    const qte = prestations.reduce((s, l) => s + l.quantite, 0);
    const taux = ASSURANCES.find((a) => a.value === assurance)?.taux ?? 0;
    const assure = Math.round(cout * taux);
    return {
      coutTotal: cout,
      quantiteTotale: qte,
      totalAssure: assure,
      totalAPayer: cout - assure,
    };
  }, [prestations, assurance]);

  const refPatient = patient
    ? `${patient.code} — ${patient.nom} (${patient.contact})`
    : "Aucun patient sélectionné";

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Titre */}
      <header className="rounded-2xl border border-brand-sky-soft bg-card p-5 shadow-sm sm:p-6">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#0CB2DA] to-[#6367EF] text-white shadow">
            <ReceiptText className="h-5 w-5" />
          </span>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Formulaire de création de fiche de paiement
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Renseignez l&apos;identification du patient et les prestations à facturer.
            </p>
          </div>
        </div>
        <div className="mt-4 h-1 rounded-full bg-gradient-to-r from-[#0CB2DA] via-primary to-[#6367EF]" />
      </header>

      {/* 1 — Identification */}
      <section className="space-y-5 rounded-2xl border border-brand-sky-soft bg-card p-5 shadow-sm sm:p-6">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0CB2DA]/15 text-[#0CB2DA]">
            <IdCard className="h-4 w-4" />
          </span>
          <h2 className="text-lg font-semibold text-foreground">Identification</h2>
        </div>

        {/* Référence patient + Éditer */}
        <div className="space-y-1.5">
          <Label htmlFor="ref-patient">
            Référence du patient <span className="text-destructive">*</span>
          </Label>
          <div className="flex gap-2">
            <Input
              id="ref-patient"
              readOnly
              value={refPatient}
              className="bg-muted/40 font-medium"
            />
            <Button type="button" variant="outline" className="shrink-0 gap-2">
              <Pencil className="h-4 w-4" />
              Éditer
            </Button>
          </div>
        </div>

        {/* Service */}
        <div className="space-y-1.5">
          <Label className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#6367EF]/15 text-[#6367EF]">
              <Stethoscope className="h-3.5 w-3.5" />
            </span>
            Service <span className="text-destructive">*</span>
          </Label>
          <Select value={service} onValueChange={setService}>
            <SelectTrigger className="bg-card">
              <SelectValue placeholder="Sélectionner un service" />
            </SelectTrigger>
          <SelectContent className="border border-border bg-card text-foreground shadow-lg">
            {SERVICES.map((s) => (
              <SelectItem
                key={s.value}
                value={s.value}
                className="cursor-pointer focus:bg-primary/10 focus:text-primary data-[highlighted]:bg-primary/10 data-[highlighted]:text-primary data-[state=checked]:bg-primary/15 data-[state=checked]:font-medium data-[state=checked]:text-primary"
              >
                {s.label}
              </SelectItem>
            ))}
          </SelectContent>
          </Select>
        </div>

        {/* Type de prestation (lignes dynamiques) */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#23C756]/15 text-[#23C756]">
              <ClipboardList className="h-3.5 w-3.5" />
            </span>
            Type de prestation <span className="text-destructive">*</span>
          </Label>

          {prestations.map((l) => {
            const totalPartiel = l.quantite * l.prixUnitaire;
            return (
              <div
                key={l.id}
                className="grid grid-cols-1 items-end gap-3 rounded-xl border border-border border-l-4 border-l-[#23C756] bg-muted/20 p-3 md:grid-cols-12"
              >
                {/* Type */}
                <div className="space-y-1 md:col-span-4">
                  <span className="text-xs text-muted-foreground">Prestation</span>
                  <Select
                    value={l.type}
                    onValueChange={(v) => majLigne(l.id, "type", v)}
                  >
                    <SelectTrigger className="bg-card">
                      <SelectValue placeholder="Type de prestation" />
                    </SelectTrigger>
                    <SelectContent>
                      {TYPES_PRESTATION.map((t) => (
                        <SelectItem key={t.value} value={t.value}>
                          {t.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Quantité */}
                <div className="space-y-1 md:col-span-2">
                  <span className="text-xs text-muted-foreground">Quantité</span>
                  <Input
                    type="number"
                    min={0}
                    value={l.quantite}
                    onChange={(e) => majLigne(l.id, "quantite", e.target.value)}
                    className="bg-card"
                  />
                </div>

                {/* Prix unitaire */}
                <div className="space-y-1 md:col-span-2">
                  <span className="text-xs text-muted-foreground">Prix unitaire (F CFA)</span>
                  <Input
                    type="number"
                    min={0}
                    value={l.prixUnitaire}
                    onChange={(e) => majLigne(l.id, "prixUnitaire", e.target.value)}
                    className="bg-card"
                  />
                </div>

                {/* Total partiel (calculé) */}
                <div className="space-y-1 md:col-span-3">
                  <span className="text-xs text-muted-foreground">Total partiel (F CFA)</span>
                  <Input
                    readOnly
                    value={formatFCFA(totalPartiel)}
                    className="bg-muted/40 font-semibold tabular-nums"
                  />
                </div>

                {/* Supprimer */}
                <div className="md:col-span-1 md:flex md:justify-end">
                  <button
                    type="button"
                    onClick={() => supprimerLigne(l.id)}
                    title="Supprimer la prestation"
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10 text-destructive transition-colors hover:bg-destructive hover:text-white"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}

          <Button
            type="button"
            variant="outline"
            onClick={ajouterLigne}
            className="gap-2 border-primary/40 text-primary hover:bg-primary/10"
          >
            <Plus className="h-4 w-4" />
            Ajouter une prestation
          </Button>
        </div>

        {/* Assurance patient */}
        <div className="space-y-1.5">
          <Label className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#F5A524]/15 text-[#F5A524]">
              <ShieldCheck className="h-3.5 w-3.5" />
            </span>
            Assurance patient
          </Label>
          <Select value={assurance} onValueChange={setAssurance}>
            <SelectTrigger className="bg-card">
              <SelectValue placeholder="Sélectionner une assurance" />
            </SelectTrigger>
            <SelectContent>
              {ASSURANCES.map((a) => (
                <SelectItem key={a.value} value={a.value}>
                  {a.label}
                  {a.taux > 0 ? ` (${Math.round(a.taux * 100)} %)` : ""}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </section>

      {/* 5 — Récapitulatif (cf. maquette) */}
      <section className="grid gap-4 md:grid-cols-2">
        {/* Détails prestations */}
        <div className="rounded-2xl border-2 border-[#3CCBC9] bg-[#CBF7F6] p-5">
          <h3 className="border-b border-[#3CCBC9]/50 pb-3 text-xl font-bold text-[#361D32]">
            Détails Prestations
          </h3>
          <div className="mt-4 grid grid-cols-2 gap-4 text-[#361D32]">
            <p className="font-semibold">
              Nombre Prestations<br />
              <span className="text-base font-bold">( x {prestations.length} )</span>
            </p>
            <p className="font-semibold">
              Quantité Totale<br />
              <span className="text-base font-bold">( x {quantiteTotale} )</span>
            </p>
          </div>
        </div>

        {/* Cartes montants */}
        <div className="space-y-4">
          <div className="rounded-2xl bg-gradient-to-r from-[#316EFC] to-[#4F86FF] p-5 text-white shadow-md">
            <p className="text-sm opacity-90">Coût Total</p>
            <p className="text-2xl font-bold tabular-nums">{formatFCFA(coutTotal)}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-[#FD0100] p-5 text-white shadow-md">
              <p className="text-sm opacity-90">Total Assuré</p>
              <p className="text-2xl font-bold tabular-nums">{formatFCFA(totalAssure)}</p>
            </div>
            <div className="rounded-2xl bg-[#010000] p-5 text-white shadow-md">
              <p className="text-sm opacity-90">Total à payer</p>
              <p className="text-2xl font-bold tabular-nums">{formatFCFA(totalAPayer)}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Actions */}
      <section className="rounded-2xl bg-[#EAF0FF] p-6">
        <div className="grid items-start gap-4 md:grid-cols-2">
          <div className="space-y-3">
            <Button
              type="submit"
              className="h-12 w-full rounded-full bg-gradient-to-r from-[#009CB3] to-[#01A0BD] text-base font-semibold text-white hover:opacity-95"
            >
              Enregistrer
            </Button>
            <p className="text-sm text-muted-foreground">
              <span className="text-destructive">*</span> Les champs marqués d&apos;un astérisque
              sont obligatoires pour valider votre enregistrement.
            </p>
          </div>

          <div className="space-y-3">
            <Button
              type="button"
              onClick={() => router.back()}
              className="h-12 w-full rounded-full bg-gradient-to-r from-[#AE1E42] to-[#EC1E4F] text-base font-semibold text-white hover:opacity-95"
            >
              Annuler
            </Button>
            <Button
              type="button"
              onClick={() => router.push("/accueil/paiements")}
              className="h-12 w-full rounded-full bg-gradient-to-r from-[#EC1E4F] to-[#F0577A] text-base font-semibold text-white hover:opacity-95"
            >
              Liste des fiches de paiements
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}