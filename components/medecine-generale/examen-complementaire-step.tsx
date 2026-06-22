// components/medecine-generale/examen-complementaire-step.tsx
// Étape "Examens complémentaires" : sous-assistant à 2 sections (TDR + Autres
// examens). Construit d'après les modèles fournis. Gère son propre état interne.
"use client";

import { useState, type Dispatch, type SetStateAction } from "react";
import { Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/data/utils";
import {
  AddButton,
  MultiSelectChips,
  SelectField,
  TextAreaField,
} from "@/components/medecine-generale/form-fields";
import { ConsultationStepper } from "@/components/medecine-generale/consultation-stepper";
import {
  nouvelExamen,
  type ExamenComplementaire,
  type ExamRequest,
} from "@/lib/data/consultations";
import {
  ACTES_EXAMEN,
  NATURES_EXAMEN,
  PRIORITES_EXAMEN,
  SOUS_ETAPES_COMPLEMENTAIRE,
  TDR_RESULTATS,
  TDR_TESTS,
} from "@/lib/data/examen-complementaire-options";

const makeId = () => `ex-${Math.random().toString(36).slice(2, 9)}`;

interface Props {
  examenComplementaire: ExamenComplementaire;
}

export function ExamenComplementaireStep({ examenComplementaire }: Props) {
  const [sous, setSous] = useState(0);
  const [data, setData] = useState(examenComplementaire);

  return (
    <div className="space-y-6">
      <ConsultationStepper
        etapes={SOUS_ETAPES_COMPLEMENTAIRE}
        courante={sous}
        onSelect={setSous}
        variant="orange"
      />

      {sous === 0 && <TdrPanel data={data} setData={setData} />}
      {sous === 1 && <AutresExamensPanel data={data} setData={setData} />}
    </div>
  );
}

type PanelProps = {
  data: ExamenComplementaire;
  setData: Dispatch<SetStateAction<ExamenComplementaire>>;
};

/* ================================ TDR =================================== */

function TdrPanel({ data, setData }: PanelProps) {
  const [actif, setActif] = useState<string>(TDR_TESTS[0]);

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold text-slate-800">TDR</h2>

      {/* Onglets des tests */}
      <div className="flex flex-wrap overflow-hidden rounded-lg border border-slate-200">
        {TDR_TESTS.map((test) => {
          const active = test === actif;
          return (
            <button
              key={test}
              type="button"
              onClick={() => setActif(test)}
              className={cn(
                "border-r border-slate-200 px-4 py-3 text-sm font-semibold last:border-r-0",
                active ? "bg-[#DEF1FF] text-[#2D6CF6]" : "bg-white text-slate-700 hover:bg-slate-50",
              )}
            >
              {test}
            </button>
          );
        })}
      </div>

      {/* Résultat du test actif */}
      <SelectField
        label={`${actif} *`}
        required
        value={data.tdr[actif] ?? ""}
        onChange={(v) => setData((d) => ({ ...d, tdr: { ...d.tdr, [actif]: v } }))}
        options={TDR_RESULTATS}
        placeholder="-- Selectionnez le résultat --"
      />
    </div>
  );
}

/* =========================== Autres examens ============================= */

function AutresExamensPanel({ data, setData }: PanelProps) {
  const cle = data.vueAutres === "internes" ? "examensInternes" : "examensExternes";
  const liste = data[cle];

  const updateExam = (id: string, patch: Partial<ExamRequest>) =>
    setData((d) => ({
      ...d,
      [cle]: d[cle].map((e) => (e.id === id ? { ...e, ...patch } : e)),
    }));

  const removeExam = (id: string) =>
    setData((d) => ({ ...d, [cle]: d[cle].filter((e) => e.id !== id) }));

  const addExam = () =>
    setData((d) => ({ ...d, [cle]: [...d[cle], nouvelExamen(makeId())] }));

  return (
    <div className="space-y-6">
      {/* Onglets internes / externes */}
      <div className="flex gap-8 border-b border-slate-200">
        <TabBtn
          label="Examens internes ↓"
          active={data.vueAutres === "internes"}
          onClick={() => setData((d) => ({ ...d, vueAutres: "internes" }))}
        />
        <TabBtn
          label="Examens externes ↑"
          active={data.vueAutres === "externes"}
          onClick={() => setData((d) => ({ ...d, vueAutres: "externes" }))}
        />
      </div>

      <div>
        <h2 className="text-2xl font-bold text-slate-800">Demande d&apos;examens</h2>
        <p className="mt-1 text-sm font-semibold text-slate-500">
          ⓘ Si l&apos;élément souhaité n&apos;existe pas dans la liste cliquez sur le bouton plus (+)
          en face pour l&apos;ajouter à la liste.
        </p>
      </div>

      {liste.map((ex) => (
        <div key={ex.id} className="space-y-4">
          {/* Supprimer (bandeau rouge) */}
          <button
            type="button"
            onClick={() => removeExam(ex.id)}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#EF4848] py-2.5 font-semibold text-white hover:bg-[#e03a3a]"
          >
            <Trash2 className="h-4 w-4" />
            Supprimer
          </button>

          <div className="grid gap-4 md:grid-cols-2">
            {/* Colonne gauche */}
            <div className="space-y-4">
              <div className="space-y-2">
                <SelectField
                  label="Nature de l'examen"
                  value={ex.nature}
                  onChange={(v) => updateExam(ex.id, { nature: v })}
                  options={NATURES_EXAMEN}
                  placeholder="-- Selectionnez le Type --"
                />
                <PlusBar onClick={() => {/* TODO: ajouter une nature à la liste */}} />
              </div>

              <div className="space-y-2">
                <MultiSelectChips
                  label="Acte à poser"
                  value={ex.actes}
                  onChange={(v) => updateExam(ex.id, { actes: v })}
                  options={ACTES_EXAMEN}
                />
                <PlusBar light onClick={() => {/* TODO: ajouter un acte à la liste */}} />
              </div>

              <SelectField
                label="Priorité"
                value={ex.priorite}
                onChange={(v) => updateExam(ex.id, { priorite: v })}
                options={PRIORITES_EXAMEN}
                placeholder="Priorité de l'examen"
              />

              {/* Bilan coût */}
              <div className="inline-flex items-center gap-2 rounded-lg border-2 border-[#9BD6DC] bg-[#E6F7F9] px-3 py-2 text-sm">
                <span className="text-slate-700">Examen : x {ex.actes.length}</span>
                <span className="font-bold text-[#EF4848]">| Coût : 0 F CFA</span>
              </div>
            </div>

            {/* Colonne droite */}
            <div className="space-y-4">
              <TextAreaField
                label="Renseignement clinique"
                value={ex.renseignementClinique}
                onChange={(v) => updateExam(ex.id, { renseignementClinique: v })}
                placeholder="Renseignement clinique"
              />
              <TextAreaField
                label="Interpretation des resultats"
                value={ex.interpretation}
                onChange={(v) => updateExam(ex.id, { interpretation: v })}
                placeholder="Interpretation des resultats"
              />
              <div className="rounded-lg border-2 border-dashed border-slate-300 p-4">
                <p className="font-bold text-[#2D6CF6]">Bilan des examens choisis :</p>
                {ex.actes.length > 0 && (
                  <ul className="mt-2 list-disc pl-5 text-sm text-slate-600">
                    {ex.actes.map((a) => (
                      <li key={a}>{a}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          <hr className="border-slate-100" />
        </div>
      ))}

      <AddButton onClick={addExam}>Ajouter un autre examen</AddButton>
    </div>
  );
}

function TabBtn({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "-mb-px border-b-2 pb-2 text-lg font-bold transition-colors",
        active ? "border-[#6367EF] text-[#6367EF]" : "border-transparent text-slate-500 hover:text-slate-700",
      )}
    >
      {label}
    </button>
  );
}

function PlusBar({ onClick, light }: { onClick: () => void; light?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-center justify-center rounded-lg py-2.5 text-white transition-colors",
        light ? "bg-[#8FB4F7] hover:bg-[#7aa3f2]" : "bg-[#2D6CF6] hover:bg-[#2459d6]",
      )}
    >
      <Plus className="h-5 w-5" />
    </button>
  );
}