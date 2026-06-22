"use client";

import { useMemo } from "react";
import {
  Brain,
  Check,
  Droplet,
  FilePlus,
  Menu,
  MoreHorizontal,
  Ruler,
  Scale,
  Stethoscope,
  Thermometer,
  User,
  Wind,
} from "lucide-react";
import { cn } from "@/lib/data/utils";
import {
  FieldLabel,
  MeasureInput,
  SelectField,
  TensionInput,
} from "@/components/medecine-generale/form-fields";
import { estFievre, type Constantes } from "@/lib/data/consultations";
import {
  ETATS_NUTRITIONNEL,
  FREQUENCES_CARDIAQUE,
  GROUPES_SANGUINS,
} from "@/lib/data/consultation-options";

interface Props {
  constantes: Constantes;
  set: <K extends keyof Constantes>(key: K, value: Constantes[K]) => void;
}

const ICON = "h-5 w-5";

export function ConstantesStep({ constantes: c, set }: Props) {
  // IMC calculé automatiquement à partir du poids (kg) et de la taille (cm).
  const imc = useMemo(() => {
    const p = parseFloat(c.poids);
    const t = parseFloat(c.taille);
    if (!p || !t) return "";
    return (p / Math.pow(t / 100, 2)).toFixed(2);
  }, [c.poids, c.taille]);

  const tempFievre = c.temperature ? estFievre(parseFloat(c.temperature)) : false;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800">
        Prise des constantes du patient
      </h2>

      <div className="grid gap-5 md:grid-cols-2">
        {/* ----------------------- Colonne gauche ----------------------- */}
        <div className="space-y-5">
          <MeasureInput
            label="Température"
            required
            icon={<Thermometer className={ICON} />}
            value={c.temperature}
            onChange={(v) => set("temperature", v)}
            unit="°C"
            highlight={tempFievre}
          />

          <div className="grid grid-cols-2 gap-3">
            <MeasureInput
              label="Poids"
              icon={<Scale className={ICON} />}
              value={c.poids}
              onChange={(v) => set("poids", v)}
              unit="KG"
            />
            <MeasureInput
              label="Taille"
              icon={<Ruler className={ICON} />}
              value={c.taille}
              onChange={(v) => set("taille", v)}
              unit="CM"
            />
          </div>

          <MeasureInput
            label="IMC"
            icon={<User className={ICON} />}
            value={imc}
            unit="kg/m²"
            readOnly
            placeholder="—"
          />

          <MeasureInput
            label="Z-score"
            icon={<Menu className={ICON} />}
            value={c.zscore}
            onChange={(v) => set("zscore", v)}
            unit={<MoreHorizontal className={ICON} />}
          />

          <SelectField
            label="Etat Nutritionnel"
            required
            value={c.etatNutritionnel}
            onChange={(v) => set("etatNutritionnel", v)}
            options={ETATS_NUTRITIONNEL}
          />

          <MeasureInput
            label="Pouls"
            icon={<Stethoscope className={ICON} />}
            value={c.pouls}
            onChange={(v) => set("pouls", v)}
            unit="Btt/mn"
          />

          <SelectField
            label="Fréquence cardiaque"
            required
            value={c.frequenceCardiaque}
            onChange={(v) => set("frequenceCardiaque", v)}
            options={FREQUENCES_CARDIAQUE}
          />

          <MeasureInput
            label="Fréquence respiratoire"
            icon={<Wind className={ICON} />}
            value={c.frequenceRespiratoire}
            onChange={(v) => set("frequenceRespiratoire", v)}
            unit="Cle/mn"
          />

          <TensionInput
            label="Bras gauche"
            tas={c.brasGaucheTAS}
            tad={c.brasGaucheTAD}
            onTas={(v) => set("brasGaucheTAS", v)}
            onTad={(v) => set("brasGaucheTAD", v)}
          />

          <TensionInput
            label="Bras droit"
            tas={c.brasDroitTAS}
            tad={c.brasDroitTAD}
            onTas={(v) => set("brasDroitTAS", v)}
            onTad={(v) => set("brasDroitTAD", v)}
          />
        </div>

        {/* ----------------------- Colonne droite ----------------------- */}
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-3">
            <MeasureInput
              label="Périmètre crânien"
              icon={<Brain className={ICON} />}
              value={c.perimetreCranien}
              onChange={(v) => set("perimetreCranien", v)}
              unit="CM"
            />
            <MeasureInput
              label="Périmètre brachial"
              icon={<Ruler className={ICON} />}
              value={c.perimetreBrachial}
              onChange={(v) => set("perimetreBrachial", v)}
              unit="CM"
            />
          </div>

          <MeasureInput
            label="Diurèse"
            icon={<User className={ICON} />}
            value={c.diurese}
            onChange={(v) => set("diurese", v)}
            unit="Ltre"
          />

          {/* Convulsions */}
          <div>
            <FieldLabel>Convulsions</FieldLabel>
            <div className="flex items-center gap-8 rounded-xl border-2 border-slate-200 bg-white px-4 py-3">
              <ConvulsionOption
                label="Oui"
                checked={c.convulsions === "oui"}
                onClick={() => set("convulsions", c.convulsions === "oui" ? "" : "oui")}
              />
              <ConvulsionOption
                label="Non"
                checked={c.convulsions === "non"}
                onClick={() => set("convulsions", c.convulsions === "non" ? "" : "non")}
              />
            </div>
          </div>

          <MeasureInput
            label="Saturation en oxygène"
            icon={<Wind className={ICON} />}
            value={c.saturationOxygene}
            onChange={(v) => set("saturationOxygene", v)}
            unit="%"
          />

          <MeasureInput
            label="Hémoglobine glyquée"
            icon={<Droplet className={ICON} />}
            value={c.hemoglobineGlyquee}
            onChange={(v) => set("hemoglobineGlyquee", v)}
            unit="%"
          />

          <MeasureInput
            label="Glycémie"
            icon={<Droplet className={ICON} />}
            value={c.glycemie}
            onChange={(v) => set("glycemie", v)}
            unit="g/l"
          />

          <SelectField
            label="Groupe Sanguin Rhésus"
            value={c.groupeSanguin}
            onChange={(v) => set("groupeSanguin", v)}
            options={GROUPES_SANGUINS}
            placeholder="-- Groupe Sanguin Rhésus --"
          />

          {/* Observations */}
          <div>
            <FieldLabel>Observations</FieldLabel>
            <div className="flex gap-2 rounded-xl border-2 border-slate-200 bg-white p-3">
              <FilePlus className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" />
              <textarea
                value={c.observations}
                onChange={(e) => set("observations", e.target.value)}
                rows={8}
                className="w-full resize-y bg-transparent text-slate-700 outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ConvulsionOption({
  label,
  checked,
  onClick,
}: {
  label: string;
  checked: boolean;
  onClick: () => void;
}) {
  return (
    <button type="button" onClick={onClick} className="flex items-center gap-2">
      <span
        className={cn(
          "flex h-5 w-5 items-center justify-center rounded border-2 transition-colors",
          checked ? "border-[#6367EF] bg-[#6367EF]" : "border-slate-300 bg-white",
        )}
      >
        {checked && <Check className="h-3.5 w-3.5 text-white" />}
      </span>
      <span className="font-medium text-slate-700">{label}</span>
    </button>
  );
}