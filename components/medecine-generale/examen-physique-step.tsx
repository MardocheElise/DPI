// components/medecine-generale/examen-physique-step.tsx
// Étape "Examens physiques" : sous-assistant à 10 sections (chevrons oranges),
// construit d'après les modèles fournis. Gère son propre état interne.
"use client";

import { useState, type Dispatch, type SetStateAction } from "react";
import {
  FieldLabel,
  MeasureInput,
  MultiSelectChips,
  OuiNonRow,
  PanelTitle,
  PercuRow,
  SelectField,
  TextAreaField,
  TextField,
} from "@/components/medecine-generale/form-fields";
import { ConsultationStepper } from "@/components/medecine-generale/consultation-stepper";
import type { ExamenPhysique, OuiNon, Percu } from "@/lib/data/consultations";
import {
  ABDOMEN_OPTIONS,
  BDC_OPTIONS,
  BORD_INFERIEUR_FOIE,
  CODIFICATIONS,
  CONJONCTIVES,
  CONSCIENCES,
  DIAGNOSTICS,
  ETATS_GENERAUX,
  ETATS_HYDRATATION,
  FOIE_OPTIONS,
  LANGUES,
  MURMURE_TYPES,
  OEDEMES,
  RATE_OPTIONS,
  REFLEXES_OSTEO,
  SIEGES_OEDEMES,
  SONORITES,
  SOUS_ETAPES_EXAMEN,
  TYPES_BATTEMENT,
  TYPES_RESPIRATOIRE,
} from "@/lib/data/examen-physique-options";

interface Props {
  examen: ExamenPhysique;
}

export function ExamenPhysiqueStep({ examen }: Props) {
  const [sous, setSous] = useState(0);
  const [data, setData] = useState(examen);

  const props = { data, setData };

  return (
    <div className="space-y-6">
      <ConsultationStepper
        etapes={SOUS_ETAPES_EXAMEN}
        courante={sous}
        onSelect={setSous}
        variant="orange"
      />

      {sous === 0 && <EtatGeneralPanel {...props} />}
      {sous === 1 && <CutaneoPanel {...props} />}
      {sous === 2 && <CardioPanel {...props} />}
      {sous === 3 && <DigestifPanel {...props} />}
      {sous === 4 && <PleuroPanel {...props} />}
      {sous === 5 && <OsteoPanel {...props} />}
      {sous === 6 && <NeuroPanel {...props} />}
      {sous === 7 && <GanglionsPanel {...props} />}
      {sous === 8 && <AutresExamensPanel {...props} />}
      {sous === 9 && <DiagnosticsPanel {...props} />}
    </div>
  );
}

type PanelProps = {
  data: ExamenPhysique;
  setData: Dispatch<SetStateAction<ExamenPhysique>>;
};

function useSet(setData: PanelProps["setData"]) {
  return <K extends keyof ExamenPhysique>(key: K, value: ExamenPhysique[K]) =>
    setData((d) => ({ ...d, [key]: value }));
}

function Pair({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-4 md:grid-cols-2">{children}</div>;
}

/* ============================ 1. Etat général =========================== */

function EtatGeneralPanel({ data, setData }: PanelProps) {
  const set = useSet(setData);
  return (
    <div className="space-y-5">
      <PanelTitle>Etat général</PanelTitle>
      <SelectField
        label="Etat général"
        required
        value={data.etatGeneral}
        onChange={(v) => set("etatGeneral", v)}
        options={ETATS_GENERAUX}
        placeholder="-- Selectionnez Etat --"
      />
    </div>
  );
}

/* ====================== 2. Cutanéo-muqueux ============================== */

function CutaneoPanel({ data, setData }: PanelProps) {
  const set = useSet(setData);
  return (
    <div className="space-y-5">
      <PanelTitle>Appareil cutanéo-muqueux</PanelTitle>
      <SelectField label="Conjonctives" value={data.conjonctives} onChange={(v) => set("conjonctives", v)} options={CONJONCTIVES} />
      <SelectField label="Langue" value={data.langue} onChange={(v) => set("langue", v)} options={LANGUES} />
      <TextField label="Autres lesions" value={data.autresLesions} onChange={(v) => set("autresLesions", v)} />
      <SelectField label="Etat d'hydratation" value={data.etatHydratation} onChange={(v) => set("etatHydratation", v)} options={ETATS_HYDRATATION} />
      <SelectField label="Oédèmes" value={data.oedemes} onChange={(v) => set("oedemes", v)} options={OEDEMES} />
      <SelectField label="Siège Oédèmes" value={data.siegeOedemes} onChange={(v) => set("siegeOedemes", v)} options={SIEGES_OEDEMES} />
    </div>
  );
}

/* ===================== 3. Cardio-vasculaire ============================= */

function CardioPanel({ data, setData }: PanelProps) {
  const set = useSet(setData);
  return (
    <div className="space-y-5">
      <PanelTitle>Appareil cardio-vasculaire</PanelTitle>

      <Pair>
        <SelectField label="BDC" value={data.bdc} onChange={(v) => set("bdc", v)} options={BDC_OPTIONS} />
        <SelectField label="Type de Battement" value={data.typeBattement} onChange={(v) => set("typeBattement", v)} options={TYPES_BATTEMENT} />
      </Pair>

      <Pair>
        <OuiNonRow label="Souffle systolique" value={data.souffleSystolique} onChange={(v) => set("souffleSystolique", v as OuiNon)} />
        <TextField label="L'intensité systolique" value={data.intensiteSystolique} onChange={(v) => set("intensiteSystolique", v)} />
      </Pair>

      <Pair>
        <OuiNonRow label="Souffle Diastolique" value={data.souffleDiastolique} onChange={(v) => set("souffleDiastolique", v as OuiNon)} />
        <TextField label="L'intensité diastolique" value={data.intensiteDiastolique} onChange={(v) => set("intensiteDiastolique", v)} />
      </Pair>

      <Pair>
        <OuiNonRow label="Frottement des cardiaux" value={data.frottementCardiaque} onChange={(v) => set("frottementCardiaque", v as OuiNon)} />
        <TextField label="Le siège du choc de la pointe" value={data.siegeChocPointe} onChange={(v) => set("siegeChocPointe", v)} />
      </Pair>

      <Pair>
        <TextField label="Siège de frottement" value={data.siegeFrottement} onChange={(v) => set("siegeFrottement", v)} />
        <OuiNonRow label="Harzer positif" value={data.harzerPositif} onChange={(v) => set("harzerPositif", v as OuiNon)} />
      </Pair>

      <Pair>
        <OuiNonRow label="Frémissement" value={data.fremissement} onChange={(v) => set("fremissement", v as OuiNon)} />
        <OuiNonRow label="Reflux hepatojugulaire" value={data.refluxHepatojugulaire} onChange={(v) => set("refluxHepatojugulaire", v as OuiNon)} />
      </Pair>

      <Pair>
        <OuiNonRow label="Hérétisme vasculaire" value={data.heretismeVasculaire} onChange={(v) => set("heretismeVasculaire", v as OuiNon)} />
        <PercuRow label="Pouls Fémoraux" value={data.poulsFemoraux} onChange={(v) => set("poulsFemoraux", v as Percu)} />
      </Pair>

      <Pair>
        <PercuRow label="Pouls Pédiaux" value={data.poulsPediaux} onChange={(v) => set("poulsPediaux", v as Percu)} />
        <PercuRow label="Pouls Tibaux" value={data.poulsTibaux} onChange={(v) => set("poulsTibaux", v as Percu)} />
      </Pair>
    </div>
  );
}

/* ========================= 4. Digestif ================================= */

function DigestifPanel({ data, setData }: PanelProps) {
  const set = useSet(setData);
  return (
    <div className="space-y-5">
      <PanelTitle>Appareil digestif</PanelTitle>
      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-5">
          <MultiSelectChips label="Abdomen" value={data.abdomen} onChange={(v) => set("abdomen", v)} options={ABDOMEN_OPTIONS} />
          <TextField label="Siège de la douleur" value={data.siegeDouleur} onChange={(v) => set("siegeDouleur", v)} />
          <SelectField label="Foie" value={data.foie} onChange={(v) => set("foie", v)} options={FOIE_OPTIONS} />
        </div>
        <div className="space-y-5">
          <SelectField label="Bord Inférieur du foie" value={data.bordInferieurFoie} onChange={(v) => set("bordInferieurFoie", v)} options={BORD_INFERIEUR_FOIE} />
          <TextField label="Surface du foie" value={data.surfaceFoie} onChange={(v) => set("surfaceFoie", v)} />
          <SelectField label="Rate" value={data.rate} onChange={(v) => set("rate", v)} options={RATE_OPTIONS} />
          <MeasureInput label="Taille Rate" value={data.tailleRate} onChange={(v) => set("tailleRate", v)} unit="CM" />
        </div>
      </div>
    </div>
  );
}

/* ====================== 5. Pleuro-pulmonaire ============================ */

function PleuroPanel({ data, setData }: PanelProps) {
  const set = useSet(setData);
  return (
    <div className="space-y-5">
      <PanelTitle>Appareil pleuro-pulmonaire</PanelTitle>
      <div className="grid gap-5 md:grid-cols-2">
        {/* Colonne gauche */}
        <div className="space-y-4">
          <SelectField label="Type Respiratoire" value={data.typeRespiratoire} onChange={(v) => set("typeRespiratoire", v)} options={TYPES_RESPIRATOIRE} />

          <OuiNonRow label="Rales crépitants" value={data.ralesCrepitants} onChange={(v) => set("ralesCrepitants", v as OuiNon)} />
          <TextField label="Siège Rales crépitants" value={data.siegeRalesCrepitants} onChange={(v) => set("siegeRalesCrepitants", v)} />

          <OuiNonRow label="Rales sous crépitante" value={data.ralesSousCrepitants} onChange={(v) => set("ralesSousCrepitants", v as OuiNon)} />
          <TextField label="Siège Rales sous crépitante" value={data.siegeRalesSousCrepitants} onChange={(v) => set("siegeRalesSousCrepitants", v)} />

          <OuiNonRow label="Sibilants" value={data.sibilants} onChange={(v) => set("sibilants", v as OuiNon)} />
          <TextField label="Siège sibilants" value={data.siegeSibilants} onChange={(v) => set("siegeSibilants", v)} />

          <OuiNonRow label="Frottement pleural" value={data.frottementPleural} onChange={(v) => set("frottementPleural", v as OuiNon)} />
          <TextField label="Siège Frottement Pleuro" value={data.siegeFrottementPleural} onChange={(v) => set("siegeFrottementPleural", v)} />

          <OuiNonRow label="Epanchement pleural" value={data.epanchementPleural} onChange={(v) => set("epanchementPleural", v as OuiNon)} />
          <TextField label="Siège Pleural" value={data.siegePleural} onChange={(v) => set("siegePleural", v)} />
        </div>

        {/* Colonne droite */}
        <div className="space-y-4">
          <OuiNonRow label="Murmure vésiculaires, bien perçus" value={data.murmureVesiculaire} onChange={(v) => set("murmureVesiculaire", v as OuiNon)} />
          <SelectField label="Type" value={data.murmureType} onChange={(v) => set("murmureType", v)} options={MURMURE_TYPES} />
          <TextField label="Siège" value={data.murmureSiege} onChange={(v) => set("murmureSiege", v)} />

          <OuiNonRow label="Vibrations vocales bien perçues" value={data.vibrationsVocales} onChange={(v) => set("vibrationsVocales", v as OuiNon)} />
          <SelectField label="Type" value={data.vibrationsType} onChange={(v) => set("vibrationsType", v)} options={MURMURE_TYPES} />

          <SelectField label="Sonorité" value={data.sonorite} onChange={(v) => set("sonorite", v)} options={SONORITES} />
          <TextField label="Siège Matité" value={data.siegeMatite} onChange={(v) => set("siegeMatite", v)} />
          <TextField label="Autres Types" value={data.autresTypes} onChange={(v) => set("autresTypes", v)} />
          <TextField label="Autre Appareil pleuro-pulmonaire" value={data.autrePleuroPulmonaire} onChange={(v) => set("autrePleuroPulmonaire", v)} />
        </div>
      </div>
    </div>
  );
}

/* ================== 6. Ostéo-articulaires et musculaires ================ */

function OsteoPanel({ data, setData }: PanelProps) {
  const set = useSet(setData);
  return (
    <div className="space-y-5">
      <PanelTitle>Appareil ostéo-articulaires et musculaires</PanelTitle>
      <SelectField label="Reflexes Ostéo-tendineux" value={data.reflexesOsteoTendineux} onChange={(v) => set("reflexesOsteoTendineux", v)} options={REFLEXES_OSTEO} />
      <TextField label="Type Reflex" value={data.typeReflex} onChange={(v) => set("typeReflex", v)} />
      <TextField label="Autre Appareil ostéo-articulaires et musculaires" value={data.autreOsteoArticulaire} onChange={(v) => set("autreOsteoArticulaire", v)} />
    </div>
  );
}

/* ===================== 7. Neuro musculaire ============================== */

function NeuroPanel({ data, setData }: PanelProps) {
  const set = useSet(setData);
  return (
    <div className="space-y-5">
      <PanelTitle>Appareil neuro musculaire</PanelTitle>
      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-4">
          <SelectField label="Conscience" value={data.conscience} onChange={(v) => set("conscience", v)} options={CONSCIENCES} />
          <OuiNonRow label="Déficit moteur" value={data.deficitMoteur} onChange={(v) => set("deficitMoteur", v as OuiNon)} />
          <TextField label="Siège Déficit moteur" value={data.siegeDeficitMoteur} onChange={(v) => set("siegeDeficitMoteur", v)} />
        </div>
        <div className="space-y-4">
          <OuiNonRow label="Déficit sensitif" value={data.deficitSensitif} onChange={(v) => set("deficitSensitif", v as OuiNon)} />
          <TextField label="Siège Déficit Sensitif" value={data.siegeDeficitSensitif} onChange={(v) => set("siegeDeficitSensitif", v)} />
          <TextField label="Autres Déficit" value={data.autresDeficit} onChange={(v) => set("autresDeficit", v)} />
          <SelectField label="Codification" value={data.codification} onChange={(v) => set("codification", v)} options={CODIFICATIONS} />
        </div>
      </div>
    </div>
  );
}

/* ===================== 8. Aires ganglionnaires ========================= */

function GanglionsPanel({ data, setData }: PanelProps) {
  const set = useSet(setData);
  return (
    <div className="space-y-5">
      <PanelTitle>Aires ganglionnaires</PanelTitle>
      <OuiNonRow label="Adénopathie" value={data.adenopathie} onChange={(v) => set("adenopathie", v as OuiNon)} />
      <TextField label="Nombre adenopathie" value={data.nombreAdenopathie} onChange={(v) => set("nombreAdenopathie", v)} />
      <TextField label="Caractéristique adenopathie" value={data.caracteristiqueAdenopathie} onChange={(v) => set("caracteristiqueAdenopathie", v)} />
    </div>
  );
}

/* ===================== 9. Autres examens cliniques ===================== */

function AutresExamensPanel({ data, setData }: PanelProps) {
  const set = useSet(setData);
  return (
    <div className="space-y-5">
      <PanelTitle>Autres examens cliniques</PanelTitle>
      <TextAreaField
        label="Autres examens cliniques"
        value={data.autresExamensCliniques}
        onChange={(v) => set("autresExamensCliniques", v)}
        placeholder="Autres examens cliniques"
        rows={5}
      />
    </div>
  );
}

/* ========================= 10. Diagnostics ============================= */

function DiagnosticsPanel({ data, setData }: PanelProps) {
  const set = useSet(setData);
  return (
    <div className="space-y-6">
      <PanelTitle>Diagnostics</PanelTitle>

      <section className="space-y-4">
        <h3 className="text-xl font-bold text-slate-800">
          Hypothèses du diagnostic <span className="text-[#F04444]">*</span>
        </h3>
        <SelectField label="Hypothèse 1 *" required value={data.hypothese1} onChange={(v) => set("hypothese1", v)} options={DIAGNOSTICS} placeholder="-- Selectionnez Hypothèse Diagnotics 1 ? --" />
        <SelectField label="Hypothèse 2" value={data.hypothese2} onChange={(v) => set("hypothese2", v)} options={DIAGNOSTICS} placeholder="-- Selectionnez Hypothèse Diagnotics 2 ? --" />
        <SelectField label="Hypothèse 3" value={data.hypothese3} onChange={(v) => set("hypothese3", v)} options={DIAGNOSTICS} placeholder="-- Selectionnez Hypothèse Diagnotics 3 ? --" />
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-bold text-slate-800">
          Diagnostic retenu <span className="text-[#F04444]">*</span>
        </h3>
        <SelectField label="Diagnostic retenu *" required value={data.diagnosticRetenu} onChange={(v) => set("diagnosticRetenu", v)} options={DIAGNOSTICS} placeholder="-- Selectionnez le diagnostic retenu --" />
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-bold text-slate-800">Autres pathologies associées</h3>
        <SelectField label="Pathologie 1" value={data.pathologie1} onChange={(v) => set("pathologie1", v)} options={DIAGNOSTICS} placeholder="-- Selectionnez Autres pathologies associées 1 ? --" />
        <SelectField label="Pathologie 2" value={data.pathologie2} onChange={(v) => set("pathologie2", v)} options={DIAGNOSTICS} placeholder="-- Selectionnez Autres pathologies associées 2 ? --" />
        <SelectField label="Pathologie 3" value={data.pathologie3} onChange={(v) => set("pathologie3", v)} options={DIAGNOSTICS} placeholder="-- Selectionnez Autres pathologies associées 3 ? --" />
      </section>
    </div>
  );
}