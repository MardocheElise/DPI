/* eslint-disable react-hooks/static-components */
"use client";

import { useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
import {
  Activity,
  Ban,
  CalendarDays,
  Cigarette,
  Leaf,
  Plus,
  ThumbsUp,
  Trash2,
  Wine,
} from "lucide-react";
import { cn } from "@/lib/data/utils";
import { Input } from "@/components/ui/input";
import { FieldLabel, SelectField } from "@/components/medecine-generale/form-fields";
import {
  nouveauGyneco,
  nouveauMedicament,
  nouvelleChirurgie,
  nouvelleMaladie,
  type Interrogatoire,
  type OuiNon,
  type OuiNonNA,
} from "@/lib/data/consultations";
import {
  ACTES_CHIRURGICAUX,
  MALADIES,
  MEDICAMENTS,
  NATURES_DROGUE,
  SOUS_ETAPES_INTERROGATOIRE,
} from "@/lib/data/interrogatoire-options";
import { ConsultationStepper } from "@/components/medecine-generale/consultation-stepper";

const makeId = () => `e-${Math.random().toString(36).slice(2, 9)}`;

interface Props {
  interrogatoire: Interrogatoire;
}

export function InterrogatoireStep({ interrogatoire }: Props) {
  const [sous, setSous] = useState(0);
  const [data, setData] = useState(interrogatoire);

  return (
    <div className="space-y-6">
      {/* Sous-étapes (oranges) */}
      <ConsultationStepper
        etapes={SOUS_ETAPES_INTERROGATOIRE}
        courante={sous}
        onSelect={setSous}
        variant="orange"
      />

      {sous === 0 && <ConsultationHistoirePanel data={data} setData={setData} />}
      {sous === 1 && <MedicauxPanel data={data} setData={setData} />}
      {sous === 2 && <ChirurgicauxPanel data={data} setData={setData} />}
      {sous === 3 && <GynecoPanel data={data} setData={setData} />}
      {sous === 4 && <MedicamenteuxPanel data={data} setData={setData} />}
      {sous === 5 && <ModeDeViePanel data={data} setData={setData} />}
      {sous === 6 && <FamiliauxPanel data={data} setData={setData} />}
    </div>
  );
}

type PanelProps = {
  data: Interrogatoire;
  setData: Dispatch<SetStateAction<Interrogatoire>>;
};

/* =============================== Primitives =============================== */

function Radio({ active }: { active: boolean }) {
  return (
    <span
      className={cn(
        "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2",
        active ? "border-[#2D6CF6]" : "border-slate-300",
      )}
    >
      {active && <span className="h-2 w-2 rounded-full bg-[#2D6CF6]" />}
    </span>
  );
}

function Segment({
  active,
  icon,
  text,
  onClick,
}: {
  active: boolean;
  icon?: ReactNode;
  text: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex min-w-[110px] items-center justify-center gap-2 px-4 py-3",
        active && "rounded-lg border-2 border-[#2D6CF6]",
      )}
    >
      {icon}
      <span className={cn("font-semibold", active ? "text-[#2D6CF6]" : "text-slate-600")}>
        {text}
      </span>
      <Radio active={active} />
    </button>
  );
}

/** Ligne segmentée Oui / Non (/ NA). */
function OuiNonRow({
  label,
  value,
  onChange,
  withNA,
}: {
  label: ReactNode;
  value: OuiNon | OuiNonNA;
  onChange: (v: OuiNonNA) => void;
  withNA?: boolean;
}) {
  return (
    <div className="flex flex-wrap items-stretch overflow-hidden rounded-xl border border-slate-200 bg-[#F4F9FF]">
      <div className="flex flex-1 items-center px-4 py-3 text-slate-700">{label}</div>
      <Segment
        active={value === "oui"}
        icon={<ThumbsUp className="h-4 w-4" />}
        text="Oui"
        onClick={() => onChange("oui")}
      />
      <Segment
        active={value === "non"}
        icon={<Ban className="h-4 w-4" />}
        text="Non"
        onClick={() => onChange("non")}
      />
      {withNA && (
        <Segment
          active={value === "na"}
          icon={<span className="h-3.5 w-3.5 rounded-sm bg-[#2D6CF6]" />}
          text="NA"
          onClick={() => onChange("na")}
        />
      )}
    </div>
  );
}

/** Bandeau "NA" (option large). */
function NABanner({
  checked,
  onClick,
  sublabel,
}: {
  checked: boolean;
  onClick: () => void;
  sublabel?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-center justify-between rounded-xl border-2 px-5 py-4 transition-colors",
        checked ? "border-[#2D6CF6] bg-[#EFF5FF]" : "border-slate-200 bg-white",
      )}
    >
      <div className="flex items-center gap-3">
        <Ban className="h-6 w-6 text-[#2D6CF6]" />
        <div className="text-left">
          <span className="text-lg font-bold text-[#2D6CF6]">NA</span>
          {sublabel && <p className="text-sm text-slate-500">{sublabel}</p>}
        </div>
      </div>
      <Radio active={checked} />
    </button>
  );
}

/** Interrupteur "hors liste ?". */
function Switch({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={cn(
        "relative h-6 w-11 shrink-0 rounded-full transition-colors",
        checked ? "bg-[#1DA1A6]" : "bg-slate-300",
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all",
          checked ? "left-[22px]" : "left-0.5",
        )}
      />
    </button>
  );
}

function HorsListeSwitch({
  label,
  checked,
  onChange,
}: {
  label: ReactNode;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-full border border-slate-200 bg-white px-5 py-2.5">
      <span className="text-slate-600">{label}</span>
      <Switch checked={checked} onChange={onChange} />
    </div>
  );
}

function SupprimerButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-1.5 rounded-md bg-[#EF4848] px-3 py-1.5 text-sm font-semibold text-white hover:bg-[#e03a3a]"
    >
      <Trash2 className="h-4 w-4" />
      Supprimer
    </button>
  );
}

function AddButton({ onClick, children }: { onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mx-auto flex items-center gap-2 rounded-xl bg-[#2D6CF6] px-6 py-3 font-semibold text-white hover:bg-[#2459d6]"
    >
      <Plus className="h-5 w-5" />
      {children}
    </button>
  );
}

function TextField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-12 rounded-xl"
      />
    </div>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
  placeholder,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full resize-y rounded-xl border-2 border-slate-200 bg-white px-3 py-2.5 text-slate-700 outline-none"
      />
    </div>
  );
}

function PanelTitle({ children }: { children: ReactNode }) {
  return <h2 className="text-2xl font-bold text-slate-800">{children}</h2>;
}

/* ===================== 1. Consultation & histoire ======================== */

function ConsultationHistoirePanel({ data, setData }: PanelProps) {
  return (
    <div className="space-y-5">
      <TextAreaField
        label="Motif de la consultation *"
        value={data.motif}
        onChange={(v) => setData((d) => ({ ...d, motif: v }))}
        placeholder="Motif de la consultation"
      />
      <TextAreaField
        label="Histoire de la maladie *"
        value={data.histoireMaladie}
        onChange={(v) => setData((d) => ({ ...d, histoireMaladie: v }))}
        placeholder="Histoire de la maladie"
      />
      <OuiNonRow
        label="Recherche active de tuberculose :"
        value={data.tuberculose}
        onChange={(v) => setData((d) => ({ ...d, tuberculose: v }))}
        withNA
      />
    </div>
  );
}

/* ========================== 2. Médicaux ================================== */

function MedicauxPanel({ data, setData }: PanelProps) {
  return (
    <div className="space-y-5">
      <PanelTitle>Antécédents médicaux</PanelTitle>

      <OuiNonRow
        label="HTA"
        value={data.hta}
        onChange={(v) => setData((d) => ({ ...d, hta: v as OuiNon }))}
      />
      <OuiNonRow
        label="Diabète"
        value={data.diabete}
        onChange={(v) => setData((d) => ({ ...d, diabete: v as OuiNon }))}
      />

      <h3 className="pt-2 text-xl font-bold text-slate-800">Autres antécédents médicaux</h3>
      <NABanner
        checked={data.medicauxNA}
        onClick={() => setData((d) => ({ ...d, medicauxNA: !d.medicauxNA }))}
      />

      {data.medicaux.map((m, i) => {
        const upd = (patch: Partial<typeof m>) =>
          setData((d) => ({
            ...d,
            medicaux: d.medicaux.map((e) => (e.id === m.id ? { ...e, ...patch } : e)),
          }));
        return (
          <div key={m.id} className="space-y-4">
            {i > 0 && <hr className="border-slate-100" />}
            <div className="flex flex-col items-end gap-2">
              <HorsListeSwitch
                label="La maladie n'est-elle pas dans la liste ?"
                checked={m.horsListe}
                onChange={(v) => upd({ horsListe: v })}
              />
              <SupprimerButton
                onClick={() =>
                  setData((d) => ({ ...d, medicaux: d.medicaux.filter((e) => e.id !== m.id) }))
                }
              />
            </div>
            {m.horsListe ? (
              <TextField label="La maladie" value={m.maladie} onChange={(v) => upd({ maladie: v })} />
            ) : (
              <SelectField
                label="La maladie"
                value={m.maladie}
                onChange={(v) => upd({ maladie: v })}
                options={MALADIES}
                placeholder="-- Selectionnez la Maladie --"
              />
            )}
            <TextField
              label="Année de survenue"
              value={m.anneeSurvenue}
              onChange={(v) => upd({ anneeSurvenue: v })}
            />
            <TextAreaField label="Notes" value={m.notes} onChange={(v) => upd({ notes: v })} />
          </div>
        );
      })}

      <AddButton
        onClick={() => setData((d) => ({ ...d, medicaux: [...d.medicaux, nouvelleMaladie(makeId())] }))}
      >
        Ajouter un autre antécédents médicaux
      </AddButton>

      <TextAreaField
        label="Autres antécédents médicaux"
        value={data.autresMedicaux}
        onChange={(v) => setData((d) => ({ ...d, autresMedicaux: v }))}
        placeholder="Autres antécédents médicaux"
      />
    </div>
  );
}

/* ========================= 3. Chirurgicaux =============================== */

function ChirurgicauxPanel({ data, setData }: PanelProps) {
  return (
    <div className="space-y-5">
      <PanelTitle>Antécédents chirurgicaux</PanelTitle>
      <NABanner
        checked={data.chirurgicauxNA}
        onClick={() => setData((d) => ({ ...d, chirurgicauxNA: !d.chirurgicauxNA }))}
      />

      {data.chirurgicaux.map((c, i) => {
        const upd = (patch: Partial<typeof c>) =>
          setData((d) => ({
            ...d,
            chirurgicaux: d.chirurgicaux.map((e) => (e.id === c.id ? { ...e, ...patch } : e)),
          }));
        return (
          <div key={c.id} className="space-y-4">
            {i > 0 && <hr className="border-slate-100" />}
            <div className="flex flex-col items-end gap-2">
              <HorsListeSwitch
                label="La maladie n'existe pas dans la liste ?"
                checked={c.horsListe}
                onChange={(v) => upd({ horsListe: v })}
              />
              <SupprimerButton
                onClick={() =>
                  setData((d) => ({
                    ...d,
                    chirurgicaux: d.chirurgicaux.filter((e) => e.id !== c.id),
                  }))
                }
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-4">
                {c.horsListe ? (
                  <TextField
                    label="L'acte chirurgical"
                    value={c.acte}
                    onChange={(v) => upd({ acte: v })}
                  />
                ) : (
                  <SelectField
                    label="L'acte chirurgical"
                    value={c.acte}
                    onChange={(v) => upd({ acte: v })}
                    options={ACTES_CHIRURGICAUX}
                    placeholder="Selectionnez Acte"
                  />
                )}
                <div>
                  <FieldLabel>Date d&apos;opération</FieldLabel>
                  <div className="flex items-stretch overflow-hidden rounded-xl border-2 border-slate-200 bg-white">
                    <div className="flex items-center justify-center bg-slate-50 px-3 text-slate-500">
                      <CalendarDays className="h-5 w-5" />
                    </div>
                    <Input
                      type="date"
                      value={c.dateOperation}
                      onChange={(e) => upd({ dateOperation: e.target.value })}
                      className="h-12 rounded-none border-0"
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <TextField label="Motif" value={c.motif} onChange={(v) => upd({ motif: v })} />
                <TextAreaField label="Notes" value={c.notes} onChange={(v) => upd({ notes: v })} />
              </div>
            </div>
          </div>
        );
      })}

      <AddButton
        onClick={() =>
          setData((d) => ({ ...d, chirurgicaux: [...d.chirurgicaux, nouvelleChirurgie(makeId())] }))
        }
      >
        Ajouter un autre antécédent chirurgical
      </AddButton>

      <TextAreaField
        label="Autres antécédents chirurgicaux"
        value={data.autresChirurgicaux}
        onChange={(v) => setData((d) => ({ ...d, autresChirurgicaux: v }))}
        placeholder="Autres antécédents chirurgicaux"
      />
    </div>
  );
}

/* ===================== 4. Gynéco-obstétricaux ============================ */

function GynecoPanel({ data, setData }: PanelProps) {
  return (
    <div className="space-y-5">
      <PanelTitle>Antécédents gynéco-obstétricaux</PanelTitle>
      <NABanner
        checked={data.gynecoNA}
        onClick={() => setData((d) => ({ ...d, gynecoNA: !d.gynecoNA }))}
      />

      {data.gyneco.map((g, i) => {
        const upd = (patch: Partial<typeof g>) =>
          setData((d) => ({
            ...d,
            gyneco: d.gyneco.map((e) => (e.id === g.id ? { ...e, ...patch } : e)),
          }));
        return (
          <div key={g.id} className="space-y-4">
            {i > 0 && <hr className="border-slate-100" />}
            <div className="flex justify-end">
              <SupprimerButton
                onClick={() =>
                  setData((d) => ({ ...d, gyneco: d.gyneco.filter((e) => e.id !== g.id) }))
                }
              />
            </div>
            <SelectField
              label="La maladie"
              value={g.maladie}
              onChange={(v) => upd({ maladie: v })}
              options={MALADIES}
              placeholder="-- Selectionnez la Maladie --"
            />
            <TextField
              label="Année de découverte"
              value={g.anneeDecouverte}
              onChange={(v) => upd({ anneeDecouverte: v })}
            />
            <TextAreaField label="Notes" value={g.notes} onChange={(v) => upd({ notes: v })} />
          </div>
        );
      })}

      <AddButton
        onClick={() => setData((d) => ({ ...d, gyneco: [...d.gyneco, nouveauGyneco(makeId())] }))}
      >
        Ajouter un autre gynéco-obstétrical
      </AddButton>

      <TextAreaField
        label="Autres antécédents gynéco-obstétricaux"
        value={data.autresGyneco}
        onChange={(v) => setData((d) => ({ ...d, autresGyneco: v }))}
        placeholder="Autres antécédents gynéco-obstétricaux"
      />
    </div>
  );
}

/* ====================== 5. Médicamenteux ================================= */

function MedicamenteuxPanel({ data, setData }: PanelProps) {
  return (
    <div className="space-y-5">
      <PanelTitle>Antécédents médicamenteux</PanelTitle>
      <NABanner
        checked={data.medicamenteuxNA}
        onClick={() => setData((d) => ({ ...d, medicamenteuxNA: !d.medicamenteuxNA }))}
      />

      {data.medicamenteux.map((m, i) => {
        const upd = (patch: Partial<typeof m>) =>
          setData((d) => ({
            ...d,
            medicamenteux: d.medicamenteux.map((e) => (e.id === m.id ? { ...e, ...patch } : e)),
          }));
        return (
          <div key={m.id} className="space-y-4">
            {i > 0 && <hr className="border-slate-100" />}
            <div className="flex justify-end">
              <SupprimerButton
                onClick={() =>
                  setData((d) => ({
                    ...d,
                    medicamenteux: d.medicamenteux.filter((e) => e.id !== m.id),
                  }))
                }
              />
            </div>
            <HorsListeSwitch
              label={
                <span>
                  Médicament : <strong>Le médicament n&apos;est pas dans la liste ?</strong>
                </span>
              }
              checked={m.horsListe}
              onChange={(v) => upd({ horsListe: v })}
            />
            {m.horsListe ? (
              <TextField
                label="Médicament"
                value={m.medicament}
                onChange={(v) => upd({ medicament: v })}
              />
            ) : (
              <SelectField
                label="Médicament"
                value={m.medicament}
                onChange={(v) => upd({ medicament: v })}
                options={MEDICAMENTS}
                placeholder="-- Selectionnez le Médicament --"
              />
            )}
            <TextField
              label="Année de survenue"
              value={m.anneeSurvenue}
              onChange={(v) => upd({ anneeSurvenue: v })}
            />
            <TextAreaField
              label="Commentaire"
              value={m.commentaire}
              onChange={(v) => upd({ commentaire: v })}
            />
          </div>
        );
      })}

      <AddButton
        onClick={() =>
          setData((d) => ({ ...d, medicamenteux: [...d.medicamenteux, nouveauMedicament(makeId())] }))
        }
      >
        Ajouter un autre antécédent médicamenteux
      </AddButton>

      <TextAreaField
        label="Autres antécédents médicamenteux"
        value={data.autresMedicamenteux}
        onChange={(v) => setData((d) => ({ ...d, autresMedicamenteux: v }))}
        placeholder="Autres antécédents médicamenteux"
      />
    </div>
  );
}

/* ========================== 6. Mode de vie ============================== */

function ModeVieRow({
  question,
  ouiIcon,
  ouiDesc,
  nonDesc,
  value,
  onChange,
  detail,
}: {
  question: string;
  ouiIcon: ReactNode;
  ouiDesc: string;
  nonDesc: string;
  value: OuiNon;
  onChange: (v: OuiNon) => void;
  detail?: ReactNode;
}) {
  const oui = value === "oui";
  const non = value === "non";
  return (
    <div>
      <p className="mb-2 font-semibold text-slate-700">{question}</p>
      <div className="grid gap-3 md:grid-cols-2">
        <div
          className={cn(
            "flex items-center gap-3 rounded-xl border-2 p-3",
            oui ? "border-[#2D6CF6] bg-[#EFF5FF]" : "border-slate-200 bg-[#F4F9FF]",
          )}
        >
          <button type="button" onClick={() => onChange("oui")} className="flex items-center gap-2">
            {ouiIcon}
            <span className="text-left">
              <span className="block font-bold text-slate-700">OUI</span>
              <span className="block text-xs text-slate-500">{ouiDesc}</span>
            </span>
            <Radio active={oui} />
          </button>
          {oui && detail}
        </div>
        <button
          type="button"
          onClick={() => onChange("non")}
          className={cn(
            "flex items-center gap-2 rounded-xl border-2 p-3 text-left",
            non ? "border-[#2D6CF6] bg-[#EFF5FF]" : "border-slate-200 bg-white",
          )}
        >
          <Ban className="h-6 w-6 text-[#2D6CF6]" />
          <span className="flex-1">
            <span className="block font-bold text-slate-700">NON</span>
            <span className="block text-xs text-slate-500">{nonDesc}</span>
          </span>
          <Radio active={non} />
        </button>
      </div>
    </div>
  );
}

function QtyInput({
  value,
  onChange,
  unit,
}: {
  value: string;
  onChange: (v: string) => void;
  unit: string;
}) {
  return (
    <div className="flex items-stretch overflow-hidden rounded-lg border border-slate-200 bg-white">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Qté"
        className="w-16 min-w-0 bg-transparent px-2 py-1.5 text-slate-700 outline-none"
      />
      <span className="flex items-center bg-slate-50 px-2 text-sm font-bold text-slate-600">{unit}</span>
    </div>
  );
}

function ModeDeViePanel({ data, setData }: PanelProps) {
  const mv = data.modeDeVie;
  const setMV = (patch: Partial<typeof mv>) =>
    setData((d) => ({ ...d, modeDeVie: { ...d.modeDeVie, ...patch } }));

  return (
    <div className="space-y-5">
      <PanelTitle>Mode de vie</PanelTitle>
      <NABanner checked={mv.na} onClick={() => setMV({ na: !mv.na })} sublabel="Mode de vie" />

      <ModeVieRow
        question="Le patient boit-il de l'alcool ?"
        ouiIcon={<Wine className="h-6 w-6 text-slate-600" />}
        ouiDesc="Le patient boit de l'alcool"
        nonDesc="Le patient ne boit pas d'alcool"
        value={mv.alcool}
        onChange={(v) => setMV({ alcool: v })}
        detail={
          <QtyInput value={mv.alcoolQte} onChange={(v) => setMV({ alcoolQte: v })} unit="Litre/J" />
        }
      />

      <ModeVieRow
        question="Le patient utilise-t-il le tabac ?"
        ouiIcon={<Cigarette className="h-6 w-6 text-slate-600" />}
        ouiDesc="Le patient utilise le tabac"
        nonDesc="Le patient n'utilise pas le tabac"
        value={mv.tabac}
        onChange={(v) => setMV({ tabac: v })}
        detail={
          <QtyInput value={mv.tabacQte} onChange={(v) => setMV({ tabacQte: v })} unit="Nombre/J" />
        }
      />

      <ModeVieRow
        question="Le patient utilise-t-il de la drogue ?"
        ouiIcon={<Leaf className="h-6 w-6 text-slate-600" />}
        ouiDesc="Le patient utilise la drogue"
        nonDesc="Le patient n'utilise pas la drogue"
        value={mv.drogue}
        onChange={(v) => setMV({ drogue: v })}
        detail={
          <select
            value={mv.drogueNature}
            onChange={(e) => setMV({ drogueNature: e.target.value })}
            className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-sm text-slate-700 outline-none"
          >
            <option value="">Nature drogue</option>
            {NATURES_DROGUE.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        }
      />

      <ModeVieRow
        question="Le patient pratique-t-il le sport ?"
        ouiIcon={<Activity className="h-6 w-6 text-slate-600" />}
        ouiDesc="Le patient pratique le sport"
        nonDesc="Le patient ne pratique pas le sport"
        value={mv.sport}
        onChange={(v) => setMV({ sport: v })}
        detail={
          <QtyInput value={mv.sportQte} onChange={(v) => setMV({ sportQte: v })} unit="Fois/Mois" />
        }
      />

      <TextAreaField
        label="Autres infos"
        value={mv.autresInfos}
        onChange={(v) => setMV({ autresInfos: v })}
        placeholder="Autres infos"
        rows={4}
      />
    </div>
  );
}

/* ========================= 7. Familiaux ================================= */

function FamiliauxPanel({ data, setData }: PanelProps) {
  const f = data.familiaux;
  const setMembre = (key: keyof typeof f, v: OuiNon) =>
    setData((d) => ({ ...d, familiaux: { ...d.familiaux, [key]: v } }));

  const Membre = ({ nom, k }: { nom: string; k: keyof typeof f }) => (
    <div className="space-y-1.5">
      <p className="font-bold text-slate-700">{nom}</p>
      <OuiNonRow
        label="Vivant · Bonne santé · Apparent"
        value={f[k]}
        onChange={(v) => setMembre(k, v as OuiNon)}
      />
    </div>
  );

  return (
    <div className="space-y-6">
      <PanelTitle>Antécédents familiaux</PanelTitle>

      <section className="space-y-4">
        <h3 className="text-xl font-bold text-slate-800">Antécédents ascendants</h3>
        <Membre nom="Père" k="pere" />
        <Membre nom="Mère" k="mere" />
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-bold text-slate-800">Antécédents collatéraux</h3>
        <Membre nom="Frère" k="frere" />
        <Membre nom="Soeur" k="soeur" />
        <Membre nom="Conjoint(e)" k="conjoint" />
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-bold text-slate-800">Antécédents descendants</h3>
        <Membre nom="Enfants" k="enfants" />
      </section>
    </div>
  );
}