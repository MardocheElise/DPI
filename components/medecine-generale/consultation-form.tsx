// // components/medecine-generale/consultation-form.tsx
// // Formulaire de consultation (assistant multi-étapes) accessible via
// // /medecine-generale/consultation/[id]. Les étapes "Identification du patient"
// // et "Constantes" sont construites d'après les modèles fournis ; les autres
// // étapes restent à compléter.
// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { CalendarDays, Pencil, Stethoscope } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { ConsultationStepper } from "@/components/medecine-generale/consultation-stepper";
// import { ConstantesStep } from "@/components/medecine-generale/constantes-step";
// import { InterrogatoireStep } from "@/components/medecine-generale/interrogatoire-step";
// import { ExamenPhysiqueStep } from "@/components/medecine-generale/examen-physique-step";
// import { FieldLabel, SelectField } from "@/components/medecine-generale/form-fields";
// import {
//   formatDateHeureFr,
//   formatIdentitePatient,
//   type Constantes,
//   type ConsultationPrefill,
//   type ExamenPhysique,
//   type Interrogatoire,
// } from "@/lib/data/consultations";
// import {
//   COMMUNES_LOCALITES,
//   ETAPES_CONSULTATION,
//   MODES_ENTREE,
//   NATIONALITES,
//   PROFESSIONS,
//   PROTECTIONS_SOCIALES,
//   SCOLARISATION,
//   STATUTS_CONJUGAL,
//   TRANCHES_AGE,
//   TYPES_POPULATION,
//   TYPES_VISITE,
//   VILLES_COMMUNES,
// } from "@/lib/data/consultation-options";

// interface Props {
//   prefill: ConsultationPrefill;
//   constantes: Constantes;
//   interrogatoire: Interrogatoire;
//   examen: ExamenPhysique;
// }

// export function ConsultationForm({
//   prefill,
//   constantes: constantesInit,
//   interrogatoire,
//   examen,
// }: Props) {
//   const router = useRouter();
//   const [etape, setEtape] = useState(0);
//   const [form, setForm] = useState(prefill);
//   const [constantes, setConstantes] = useState(constantesInit);

//   const set = <K extends keyof ConsultationPrefill>(key: K, value: ConsultationPrefill[K]) =>
//     setForm((f) => ({ ...f, [key]: value }));

//   const setC = <K extends keyof Constantes>(key: K, value: Constantes[K]) =>
//     setConstantes((c) => ({ ...c, [key]: value }));

//   const dernier = etape === ETAPES_CONSULTATION.length - 1;

//   const handleSuivant = () => {
//     // TODO: valider l'étape courante avant de passer à la suivante.
//     if (!dernier) setEtape((e) => e + 1);
//   };

//   const handleEnregistrerTerminer = () => {
//     // TODO: enregistrer la consultation puis clôturer (API), avant de revenir à la liste.
//     router.push("/medecine-generale/patient-a-consulter");
//   };

//   return (
//     <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
//       {/* En-tête */}
//       <div className="bg-gradient-to-b from-[#1DA1A6] to-[#0d9488] px-6 py-7 text-center text-white">
//         <Stethoscope className="mx-auto mb-2 h-10 w-10" strokeWidth={2.2} />
//         <h1 className="text-2xl font-bold">Formulaire de consultation</h1>
//         <p className="mt-1 text-sm text-white/80">Détails de la consultation</p>
//       </div>

//       {/* Étapes */}
//       <div className="border-b border-slate-100 px-4 py-3">
//         <ConsultationStepper
//           etapes={ETAPES_CONSULTATION}
//           courante={etape}
//           onSelect={setEtape}
//         />
//       </div>

//       {/* Contenu de l'étape */}
//       <div className="px-6 py-6">
//         {etape === 0 && <IdentificationStep form={form} set={set} />}
//         {etape === 1 && <ConstantesStep constantes={constantes} set={setC} />}
//         {etape === 2 && <InterrogatoireStep interrogatoire={interrogatoire} />}
//         {etape === 3 && <ExamenPhysiqueStep examen={examen} />}
//         {etape > 3 && <PlaceholderStep titre={ETAPES_CONSULTATION[etape]} />}
//       </div>

//       {/* Pied de page : actions */}
//       <div className="bg-[#EDF1FB] px-6 py-6">
//         <div className="flex flex-wrap items-start justify-between gap-4">
//           <Button
//             onClick={handleSuivant}
//             disabled={dernier}
//             className="h-12 rounded-full bg-[#1DA1A6] px-10 text-base font-semibold text-white shadow-sm hover:bg-[#168a8e] disabled:opacity-50"
//           >
//             {etape === 2 || etape === 3 ? "Enregistrer les consultations" : "Suivant"}
//           </Button>

//           <div className="flex flex-col items-end gap-3">
//             <Button
//               onClick={() => router.push("/medecine-generale/patient-a-consulter")}
//               className="h-12 rounded-full bg-[#EF4848] px-8 text-base font-semibold text-white shadow-sm hover:bg-[#e03a3a]"
//             >
//               Retour à la liste
//             </Button>
//             <Button
//               onClick={handleEnregistrerTerminer}
//               className="h-12 rounded-full bg-[#2EBE5E] px-6 text-base font-semibold text-white shadow-sm hover:bg-[#27a851]"
//             >
//               Enregistrer et Terminer la consultation
//             </Button>
//           </div>
//         </div>
//         <p className="mt-4 text-sm text-slate-500">
//           <span className="text-[#F04444]">*</span> Les champs marqués d&apos;un astérisque
//           sont obligatoires pour valider votre enregistrement.
//         </p>
//       </div>
//     </div>
//   );
// }

// /* -------------------------- Étape Identification ------------------------- */

// function IdentificationStep({
//   form,
//   set,
// }: {
//   form: ConsultationPrefill;
//   set: <K extends keyof ConsultationPrefill>(key: K, value: ConsultationPrefill[K]) => void;
// }) {
//   return (
//     <div className="space-y-5">
//       <h2 className="text-2xl font-bold text-slate-800">Identification</h2>

//       {/* Nom et prénoms (lecture seule) */}
//       <div className="rounded-xl border-2 border-[#1DA1A6]/60 px-4 py-2.5">
//         <p className="text-xs font-semibold text-slate-400">
//           Nom et prénoms du patient <span className="text-[#F04444]">*</span>
//         </p>
//         <p className="text-slate-700">{formatIdentitePatient(form)}</p>
//       </div>

//       {/* Motif (lecture seule) */}
//       <div className="rounded-xl bg-slate-100 px-4 py-2.5">
//         <p className="text-xs font-semibold text-slate-400">
//           Motif de consultation <span className="text-[#F04444]">*</span>
//         </p>
//         <p className="text-slate-700">{form.motif}</p>
//       </div>

//       {/* Professionnel de santé */}
//       <div>
//         <FieldLabel required>Professionnel de santé</FieldLabel>
//         <Input
//           value={form.professionnel}
//           onChange={(e) => set("professionnel", e.target.value)}
//           className="h-12 rounded-xl border-2 border-[#1DA1A6]/60"
//         />
//       </div>

//       {/* Date/Heure de consultation (lecture seule) */}
//       <div className="flex items-center gap-3 rounded-xl bg-[#DEF6FF] px-4 py-2.5">
//         <CalendarDays className="h-5 w-5 text-[#0CB2DA]" />
//         <div>
//           <p className="text-xs font-semibold text-slate-400">
//             Date/Heure de consultation <span className="text-[#F04444]">*</span>
//           </p>
//           <p className="text-slate-700">{formatDateHeureFr(form.dateConsultation)}</p>
//         </div>
//       </div>

//       <SelectField
//         label="Nationalité"
//         required
//         value={form.nationalite}
//         onChange={(v) => set("nationalite", v)}
//         options={NATIONALITES}
//       />

//       <SelectField
//         label="Profession"
//         required
//         value={form.profession}
//         onChange={(v) => set("profession", v)}
//         options={PROFESSIONS}
//       />

//       {/* Date de naissance + âges */}
//       <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
//         <div className="col-span-2 sm:col-span-1">
//           <FieldLabel required>Date de naissance</FieldLabel>
//           <Input
//             type="date"
//             value={form.dateNaissance}
//             onChange={(e) => set("dateNaissance", e.target.value)}
//             className="h-12 rounded-xl"
//           />
//         </div>
//         <div>
//           <FieldLabel>Age (An(s))</FieldLabel>
//           <Input readOnly value={form.ageAns} className="h-12 rounded-xl bg-slate-50" />
//         </div>
//         <div>
//           <FieldLabel>Age (Mois)</FieldLabel>
//           <Input readOnly value={form.ageMois} className="h-12 rounded-xl bg-slate-50" />
//         </div>
//         <div>
//           <FieldLabel>Age (Jour(s))</FieldLabel>
//           <Input readOnly value={form.ageJours} className="h-12 rounded-xl bg-slate-50" />
//         </div>
//       </div>

//       <SelectField
//         label="Type de population"
//         required
//         value={form.typePopulation}
//         onChange={(v) => set("typePopulation", v)}
//         options={TYPES_POPULATION}
//       />

//       <SelectField
//         label="Ville ou Commune"
//         required
//         value={form.villeCommune}
//         onChange={(v) => set("villeCommune", v)}
//         options={VILLES_COMMUNES}
//       />

//       <SelectField
//         label="Type de visite"
//         required
//         value={form.typeVisite}
//         onChange={(v) => set("typeVisite", v)}
//         options={TYPES_VISITE}
//         placeholder="-- Type de visite --"
//       />

//       <SelectField
//         label="Commune ou Localité"
//         required
//         value={form.communeLocalite}
//         onChange={(v) => set("communeLocalite", v)}
//         options={COMMUNES_LOCALITES}
//       />

//       <div>
//         <FieldLabel required>Téléphone Mobile</FieldLabel>
//         <Input
//           value={form.telephone}
//           onChange={(e) => set("telephone", e.target.value)}
//           className="h-12 rounded-xl"
//         />
//       </div>

//       <div>
//         <FieldLabel required>Residence habituelle ou quartier</FieldLabel>
//         <Input
//           value={form.residenceHabituelle}
//           onChange={(e) => set("residenceHabituelle", e.target.value)}
//           className="h-12 rounded-xl"
//         />
//       </div>

//       <div>
//         <FieldLabel>Téléphone Mobile Autre</FieldLabel>
//         <Input
//           value={form.telephoneAutre}
//           onChange={(e) => set("telephoneAutre", e.target.value)}
//           className="h-12 rounded-xl"
//         />
//       </div>

//       <div>
//         <FieldLabel required>Residence Actuelle ou quartier</FieldLabel>
//         <Input
//           value={form.residenceActuelle}
//           onChange={(e) => set("residenceActuelle", e.target.value)}
//           className="h-12 rounded-xl"
//         />
//       </div>

//       <SelectField
//         label="Mode d'entrée"
//         required
//         value={form.modeEntree}
//         onChange={(v) => set("modeEntree", v)}
//         options={MODES_ENTREE}
//       />

//       <SelectField
//         label="Statut conjugal"
//         required
//         value={form.statutConjugal}
//         onChange={(v) => set("statutConjugal", v)}
//         options={STATUTS_CONJUGAL}
//       />

//       <SelectField
//         label="En cours de scolarisation"
//         required
//         value={form.scolarisation}
//         onChange={(v) => set("scolarisation", v)}
//         options={SCOLARISATION}
//       />

//       <SelectField
//         label="Protection sociale"
//         required
//         value={form.protectionSociale}
//         onChange={(v) => set("protectionSociale", v)}
//         options={PROTECTIONS_SOCIALES}
//         placeholder="Selectionnez protection sociale"
//       />

//       {/* Tranches d'âge */}
//       <div>
//         <h3 className="mb-3 text-lg font-bold text-slate-800">Tranches d&apos;âge :</h3>
//         <div className="flex flex-wrap gap-3">
//           {TRANCHES_AGE.map((t) => {
//             const active = form.trancheAge === t;
//             return (
//               <button
//                 key={t}
//                 type="button"
//                 onClick={() => set("trancheAge", t)}
//                 className={
//                   active
//                     ? "rounded-lg border-2 border-[#1DA1A6] bg-[#1DA1A6] px-4 py-2 text-sm font-semibold text-white"
//                     : "rounded-lg border-2 border-[#1DA1A6]/40 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-[#1DA1A6]"
//                 }
//               >
//                 {t}
//               </button>
//             );
//           })}
//         </div>
//       </div>

//       {/* Lien voir plus / modifier */}
//       <button
//         type="button"
//         className="inline-flex items-center gap-2 text-sm font-bold text-[#6367EF] hover:underline"
//         // TODO: ouvrir le panneau détaillé (champs additionnels) du dossier patient.
//       >
//         <Pencil className="h-4 w-4" />
//         Cliquez ici pour voir plus ou modifier
//       </button>
//     </div>
//   );
// }

// /* ----------------------- Étapes encore à construire ---------------------- */

// function PlaceholderStep({ titre }: { titre: string }) {
//   return (
//     <div className="flex min-h-[220px] flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 text-center">
//       <h2 className="text-xl font-bold text-slate-700">{titre}</h2>
//       <p className="max-w-md text-sm text-slate-400">
//         Étape à construire — envoie-moi le modèle de cette section et je la complète
//         dans le même style.
//       </p>
//     </div>
//   );
// }






























// components/medecine-generale/consultation-form.tsx
// Formulaire de consultation (assistant multi-étapes) accessible via
// /medecine-generale/consultation/[id]. Les étapes "Identification du patient"
// et "Constantes" sont construites d'après les modèles fournis ; les autres
// étapes restent à compléter.
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, Pencil, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ConsultationStepper } from "@/components/medecine-generale/consultation-stepper";
import { ConstantesStep } from "@/components/medecine-generale/constantes-step";
import { InterrogatoireStep } from "@/components/medecine-generale/interrogatoire-step";
import { ExamenPhysiqueStep } from "@/components/medecine-generale/examen-physique-step";
import { ExamenComplementaireStep } from "@/components/medecine-generale/examen-complementaire-step";
import { FieldLabel, SelectField } from "@/components/medecine-generale/form-fields";
import {
  formatDateHeureFr,
  formatIdentitePatient,
  type Constantes,
  type ConsultationPrefill,
  type ExamenComplementaire,
  type ExamenPhysique,
  type Interrogatoire,
} from "@/lib/data/consultations";
import {
  COMMUNES_LOCALITES,
  ETAPES_CONSULTATION,
  MODES_ENTREE,
  NATIONALITES,
  PROFESSIONS,
  PROTECTIONS_SOCIALES,
  SCOLARISATION,
  STATUTS_CONJUGAL,
  TRANCHES_AGE,
  TYPES_POPULATION,
  TYPES_VISITE,
  VILLES_COMMUNES,
} from "@/lib/data/consultation-options";

interface Props {
  prefill: ConsultationPrefill;
  constantes: Constantes;
  interrogatoire: Interrogatoire;
  examen: ExamenPhysique;
  examenComplementaire: ExamenComplementaire;
}

export function ConsultationForm({
  prefill,
  constantes: constantesInit,
  interrogatoire,
  examen,
  examenComplementaire,
}: Props) {
  const router = useRouter();
  const [etape, setEtape] = useState(0);
  const [form, setForm] = useState(prefill);
  const [constantes, setConstantes] = useState(constantesInit);

  const set = <K extends keyof ConsultationPrefill>(key: K, value: ConsultationPrefill[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const setC = <K extends keyof Constantes>(key: K, value: Constantes[K]) =>
    setConstantes((c) => ({ ...c, [key]: value }));

  const dernier = etape === ETAPES_CONSULTATION.length - 1;

  const handleSuivant = () => {
    // TODO: valider l'étape courante avant de passer à la suivante.
    if (!dernier) setEtape((e) => e + 1);
  };

  const handleEnregistrerTerminer = () => {
    // TODO: enregistrer la consultation puis clôturer (API), avant de revenir à la liste.
    router.push("/medecine-generale/patient-a-consulter");
  };

  return (
    <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* En-tête */}
      <div className="bg-gradient-to-b from-[#1DA1A6] to-[#0d9488] px-6 py-7 text-center text-white">
        <Stethoscope className="mx-auto mb-2 h-10 w-10" strokeWidth={2.2} />
        <h1 className="text-2xl font-bold">Formulaire de consultation</h1>
        <p className="mt-1 text-sm text-white/80">Détails de la consultation</p>
      </div>

      {/* Étapes */}
      <div className="border-b border-slate-100 px-4 py-3">
        <ConsultationStepper
          etapes={ETAPES_CONSULTATION}
          courante={etape}
          onSelect={setEtape}
        />
      </div>

      {/* Contenu de l'étape */}
      <div className="px-6 py-6">
        {etape === 0 && <IdentificationStep form={form} set={set} />}
        {etape === 1 && <ConstantesStep constantes={constantes} set={setC} />}
        {etape === 2 && <InterrogatoireStep interrogatoire={interrogatoire} />}
        {etape === 3 && <ExamenPhysiqueStep examen={examen} />}
        {etape === 4 && <ExamenComplementaireStep examenComplementaire={examenComplementaire} />}
        {etape > 4 && <PlaceholderStep titre={ETAPES_CONSULTATION[etape]} />}
      </div>

      {/* Pied de page : actions */}
      <div className="bg-[#EDF1FB] px-6 py-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <Button
            onClick={handleSuivant}
            disabled={dernier}
            className="h-12 rounded-full bg-[#1DA1A6] px-10 text-base font-semibold text-white shadow-sm hover:bg-[#168a8e] disabled:opacity-50"
          >
            {dernier ? "Suivant" : etape >= 2 ? "Enregistrer les consultations" : "Suivant"}
          </Button>

          <div className="flex flex-col items-end gap-3">
            <Button
              onClick={() => router.push("/medecine-generale/patient-a-consulter")}
              className="h-12 rounded-full bg-[#EF4848] px-8 text-base font-semibold text-white shadow-sm hover:bg-[#e03a3a]"
            >
              Retour à la liste
            </Button>
            <Button
              onClick={handleEnregistrerTerminer}
              className="h-12 rounded-full bg-[#2EBE5E] px-6 text-base font-semibold text-white shadow-sm hover:bg-[#27a851]"
            >
              Enregistrer et Terminer la consultation
            </Button>
          </div>
        </div>
        <p className="mt-4 text-sm text-slate-500">
          <span className="text-[#F04444]">*</span> Les champs marqués d&apos;un astérisque
          sont obligatoires pour valider votre enregistrement.
        </p>
      </div>
    </div>
  );
}

/* -------------------------- Étape Identification ------------------------- */

function IdentificationStep({
  form,
  set,
}: {
  form: ConsultationPrefill;
  set: <K extends keyof ConsultationPrefill>(key: K, value: ConsultationPrefill[K]) => void;
}) {
  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold text-slate-800">Identification</h2>

      {/* Nom et prénoms (lecture seule) */}
      <div className="rounded-xl border-2 border-[#1DA1A6]/60 px-4 py-2.5">
        <p className="text-xs font-semibold text-slate-400">
          Nom et prénoms du patient <span className="text-[#F04444]">*</span>
        </p>
        <p className="text-slate-700">{formatIdentitePatient(form)}</p>
      </div>

      {/* Motif (lecture seule) */}
      <div className="rounded-xl bg-slate-100 px-4 py-2.5">
        <p className="text-xs font-semibold text-slate-400">
          Motif de consultation <span className="text-[#F04444]">*</span>
        </p>
        <p className="text-slate-700">{form.motif}</p>
      </div>

      {/* Professionnel de santé */}
      <div>
        <FieldLabel required>Professionnel de santé</FieldLabel>
        <Input
          value={form.professionnel}
          onChange={(e) => set("professionnel", e.target.value)}
          className="h-12 rounded-xl border-2 border-[#1DA1A6]/60"
        />
      </div>

      {/* Date/Heure de consultation (lecture seule) */}
      <div className="flex items-center gap-3 rounded-xl bg-[#DEF6FF] px-4 py-2.5">
        <CalendarDays className="h-5 w-5 text-[#0CB2DA]" />
        <div>
          <p className="text-xs font-semibold text-slate-400">
            Date/Heure de consultation <span className="text-[#F04444]">*</span>
          </p>
          <p className="text-slate-700">{formatDateHeureFr(form.dateConsultation)}</p>
        </div>
      </div>

      <SelectField
        label="Nationalité"
        required
        value={form.nationalite}
        onChange={(v) => set("nationalite", v)}
        options={NATIONALITES}
      />

      <SelectField
        label="Profession"
        required
        value={form.profession}
        onChange={(v) => set("profession", v)}
        options={PROFESSIONS}
      />

      {/* Date de naissance + âges */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="col-span-2 sm:col-span-1">
          <FieldLabel required>Date de naissance</FieldLabel>
          <Input
            type="date"
            value={form.dateNaissance}
            onChange={(e) => set("dateNaissance", e.target.value)}
            className="h-12 rounded-xl"
          />
        </div>
        <div>
          <FieldLabel>Age (An(s))</FieldLabel>
          <Input readOnly value={form.ageAns} className="h-12 rounded-xl bg-slate-50" />
        </div>
        <div>
          <FieldLabel>Age (Mois)</FieldLabel>
          <Input readOnly value={form.ageMois} className="h-12 rounded-xl bg-slate-50" />
        </div>
        <div>
          <FieldLabel>Age (Jour(s))</FieldLabel>
          <Input readOnly value={form.ageJours} className="h-12 rounded-xl bg-slate-50" />
        </div>
      </div>

      <SelectField
        label="Type de population"
        required
        value={form.typePopulation}
        onChange={(v) => set("typePopulation", v)}
        options={TYPES_POPULATION}
      />

      <SelectField
        label="Ville ou Commune"
        required
        value={form.villeCommune}
        onChange={(v) => set("villeCommune", v)}
        options={VILLES_COMMUNES}
      />

      <SelectField
        label="Type de visite"
        required
        value={form.typeVisite}
        onChange={(v) => set("typeVisite", v)}
        options={TYPES_VISITE}
        placeholder="-- Type de visite --"
      />

      <SelectField
        label="Commune ou Localité"
        required
        value={form.communeLocalite}
        onChange={(v) => set("communeLocalite", v)}
        options={COMMUNES_LOCALITES}
      />

      <div>
        <FieldLabel required>Téléphone Mobile</FieldLabel>
        <Input
          value={form.telephone}
          onChange={(e) => set("telephone", e.target.value)}
          className="h-12 rounded-xl"
        />
      </div>

      <div>
        <FieldLabel required>Residence habituelle ou quartier</FieldLabel>
        <Input
          value={form.residenceHabituelle}
          onChange={(e) => set("residenceHabituelle", e.target.value)}
          className="h-12 rounded-xl"
        />
      </div>

      <div>
        <FieldLabel>Téléphone Mobile Autre</FieldLabel>
        <Input
          value={form.telephoneAutre}
          onChange={(e) => set("telephoneAutre", e.target.value)}
          className="h-12 rounded-xl"
        />
      </div>

      <div>
        <FieldLabel required>Residence Actuelle ou quartier</FieldLabel>
        <Input
          value={form.residenceActuelle}
          onChange={(e) => set("residenceActuelle", e.target.value)}
          className="h-12 rounded-xl"
        />
      </div>

      <SelectField
        label="Mode d'entrée"
        required
        value={form.modeEntree}
        onChange={(v) => set("modeEntree", v)}
        options={MODES_ENTREE}
      />

      <SelectField
        label="Statut conjugal"
        required
        value={form.statutConjugal}
        onChange={(v) => set("statutConjugal", v)}
        options={STATUTS_CONJUGAL}
      />

      <SelectField
        label="En cours de scolarisation"
        required
        value={form.scolarisation}
        onChange={(v) => set("scolarisation", v)}
        options={SCOLARISATION}
      />

      <SelectField
        label="Protection sociale"
        required
        value={form.protectionSociale}
        onChange={(v) => set("protectionSociale", v)}
        options={PROTECTIONS_SOCIALES}
        placeholder="Selectionnez protection sociale"
      />

      {/* Tranches d'âge */}
      <div>
        <h3 className="mb-3 text-lg font-bold text-slate-800">Tranches d&apos;âge :</h3>
        <div className="flex flex-wrap gap-3">
          {TRANCHES_AGE.map((t) => {
            const active = form.trancheAge === t;
            return (
              <button
                key={t}
                type="button"
                onClick={() => set("trancheAge", t)}
                className={
                  active
                    ? "rounded-lg border-2 border-[#1DA1A6] bg-[#1DA1A6] px-4 py-2 text-sm font-semibold text-white"
                    : "rounded-lg border-2 border-[#1DA1A6]/40 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-[#1DA1A6]"
                }
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>

      {/* Lien voir plus / modifier */}
      <button
        type="button"
        className="inline-flex items-center gap-2 text-sm font-bold text-[#6367EF] hover:underline"
        // TODO: ouvrir le panneau détaillé (champs additionnels) du dossier patient.
      >
        <Pencil className="h-4 w-4" />
        Cliquez ici pour voir plus ou modifier
      </button>
    </div>
  );
}

/* ----------------------- Étapes encore à construire ---------------------- */

function PlaceholderStep({ titre }: { titre: string }) {
  return (
    <div className="flex min-h-[220px] flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 text-center">
      <h2 className="text-xl font-bold text-slate-700">{titre}</h2>
      <p className="max-w-md text-sm text-slate-400">
        Étape à construire — envoie-moi le modèle de cette section et je la complète
        dans le même style.
      </p>
    </div>
  );
}