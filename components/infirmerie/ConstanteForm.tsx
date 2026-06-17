// route: components/infirmerie/constante-form.tsx
"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  ArrowRight,
  Activity,
  Baby,
  Brain,
  Building2,
  Clock,
  Droplet,
  Droplets,
  FileText,
  Gauge,
  HeartPulse,
  Pencil,
  Ruler,
  Save,
  Stethoscope,
  User,
  UserCog,
  Weight,
  Wind,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  CONSTANTES_VIDES,
  ETATS_NUTRITIONNELS,
  FREQUENCES_CARDIAQUES,
  GROUPES_SANGUINS,
  PRATICIENS,
  formatDateHeureFr,
  type Constantes,
  type PatientAttente,
} from "@/lib/dataInfirmerie/infirmerie"

/* ====================== Sous-composants ====================== */

const STEPS = [
  { key: "identification", label: "Identification du patient" },
  { key: "constantes", label: "Constantes du patient" },
  { key: "affectation", label: "Affectation du patient" },
] as const

const CHEVRON =
  "polygon(0 0, calc(100% - 14px) 0, 100% 50%, calc(100% - 14px) 100%, 0 100%, 14px 50%)"

/** Fil d'Ariane en chevrons (style PinHome teal). */
function Stepper({ current }: { current: number }) {
  return (
    <div className="flex w-full gap-1 overflow-hidden">
      {STEPS.map((s, i) => {
        const active = i === current
        const done = i < current
        return (
          <div
            key={s.key}
            className="flex-1 px-4 py-2 text-center text-xs font-bold leading-tight text-white sm:text-sm"
            style={{
              clipPath: i === 0 ? undefined : CHEVRON,
              backgroundColor: active ? "#0d9488" : done ? "#1DA1A6" : "#9BD6DC",
              color: active || done ? "#fff" : "#0d6e66",
            }}
          >
            {s.label}
          </div>
        )
      })}
    </div>
  )
}

/** Encadré gris en lecture seule (étape Identification). */
function InfoBox({
  icon,
  label,
  value,
  className,
}: {
  icon: React.ReactNode
  label: string
  value: string
  className?: string
}) {
  return (
    <div className={`flex items-stretch overflow-hidden rounded-xl bg-slate-100 ${className ?? ""}`}>
      <span className="flex w-12 shrink-0 items-center justify-center text-slate-500">
        {icon}
      </span>
      <div className="min-w-0 flex-1 bg-slate-50 px-3 py-2.5">
        <div className="text-xs font-medium text-slate-400">{label}</div>
        <div className="truncate text-sm font-medium text-slate-700">{value}</div>
      </div>
    </div>
  )
}

/** Champ mesure : icône à gauche, saisie au centre, unité à droite. */
function MeasureField({
  icon,
  label,
  unit,
  value,
  onChange,
  required,
  step,
  placeholder,
}: {
  icon: React.ReactNode
  label: string
  unit: string
  value: string
  onChange: (v: string) => void
  required?: boolean
  step?: string
  placeholder?: string
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-semibold text-slate-600">
        {label} {required && <span className="text-[#F04444]">*</span>}
      </Label>
      <div className="flex items-stretch overflow-hidden rounded-xl border border-slate-200 focus-within:ring-2 focus-within:ring-[#0d9488]/40">
        <span className="flex w-11 shrink-0 items-center justify-center bg-slate-50 text-slate-500">
          {icon}
        </span>
        <Input
          type="number"
          inputMode="decimal"
          step={step}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 rounded-none border-0 shadow-none focus-visible:ring-0"
        />
        <span className="flex shrink-0 items-center bg-slate-50 px-3 text-sm font-bold text-slate-500">
          {unit}
        </span>
      </div>
    </div>
  )
}

/** Tension d'un bras : TAS / TAD en mmHg. */
function TensionField({
  label,
  tas,
  tad,
  onTas,
  onTad,
}: {
  label: string
  tas: string
  tad: string
  onTas: (v: string) => void
  onTad: (v: string) => void
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-semibold text-slate-600">{label}</Label>
      <div className="flex items-center gap-2">
        <div className="flex flex-1 items-stretch overflow-hidden rounded-xl border border-slate-200">
          <span className="flex items-center bg-slate-50 px-2.5 text-xs font-bold text-slate-500">
            TAS
          </span>
          <Input
            type="number"
            inputMode="numeric"
            value={tas}
            onChange={(e) => onTas(e.target.value)}
            className="rounded-none border-0 shadow-none focus-visible:ring-0"
          />
        </div>
        <span className="text-sm font-bold text-slate-400">/</span>
        <div className="flex flex-1 items-stretch overflow-hidden rounded-xl border border-slate-200">
          <span className="flex items-center bg-slate-50 px-2.5 text-xs font-bold text-slate-500">
            TAD
          </span>
          <Input
            type="number"
            inputMode="numeric"
            value={tad}
            onChange={(e) => onTad(e.target.value)}
            className="rounded-none border-0 shadow-none focus-visible:ring-0"
          />
        </div>
        <span className="text-xs font-bold text-slate-500">mmHg</span>
      </div>
    </div>
  )
}

/** Select stylé PinHome. */
function PickField({
  label,
  placeholder,
  value,
  onChange,
  options,
  required,
}: {
  label: string
  placeholder: string
  value: string
  onChange: (v: string) => void
  options: string[]
  required?: boolean
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-semibold text-slate-600">
        {label} {required && <span className="text-[#F04444]">*</span>}
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="rounded-xl border-slate-200 focus:ring-[#0d9488]">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((o) => (
            <SelectItem key={o} value={o}>
              {o}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

/* ====================== Composant principal ====================== */

export function ConstanteForm({ patient }: { patient: PatientAttente }) {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [c, setC] = useState<Constantes>(CONSTANTES_VIDES)
  const [praticienId, setPraticienId] = useState("")
  const [saving, setSaving] = useState(false)

  function set(patch: Partial<Constantes>) {
    setC((prev) => ({ ...prev, ...patch }))
  }

  const imc = useMemo(() => {
    const p = parseFloat(c.poids)
    const t = parseFloat(c.taille) / 100
    if (!p || !t) return ""
    return (p / (t * t)).toFixed(1)
  }, [c.poids, c.taille])

  const identite = `${patient.patientNom}, Sexe : ${patient.sexe}, Age : ${patient.age} an(s), (code : ${patient.patientCode}), Tel: ${patient.telephone}`

  function next() {
    setStep((s) => Math.min(s + 1, STEPS.length - 1))
  }
  function prev() {
    setStep((s) => Math.max(s - 1, 0))
  }

  async function handleSave() {
    setSaving(true)
    // TODO: POST /api/infirmerie/constantes
    // { patientId: patient.id, reference: patient.referencePaiement, ...c, imc, praticienId }
    // puis basculer le patient vers "déjà consulté".
    console.log("Enregistrement constantes :", {
      patientId: patient.id,
      ...c,
      imc,
      praticienId,
    })
    setTimeout(() => {
      setSaving(false)
      router.push("/infirmerie")
    }, 600)
  }

  const isLast = step === STEPS.length - 1

  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-100">
      {/* En-tête teal + coeur */}
      <div className="bg-gradient-to-b from-[#1DA1A6] to-[#0d9488] px-6 py-6 text-center">
        <HeartPulse className="mx-auto mb-2 size-9 text-white" />
        <h1 className="text-lg font-bold text-white sm:text-xl">
          Formulaire de prise des constantes
        </h1>
      </div>

      {/* Stepper */}
      <div className="px-4 pt-4 sm:px-6">
        <Stepper current={step} />
        <div className="mt-4 h-1.5 w-full rounded-full bg-[#0d9488]" />
      </div>

      {/* Corps */}
      <div className="px-4 py-6 sm:px-6">
        {/* ---------- Étape 1 : Identification ---------- */}
        {step === 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-extrabold text-slate-800">Identification</h2>

            <InfoBox icon={<User className="size-5" />} label="Nom du patient" value={identite} />

            <div className="grid gap-4 sm:grid-cols-2">
              <InfoBox icon={<Building2 className="size-5" />} label="Service" value={patient.service} />
              <InfoBox icon={<Clock className="size-5" />} label="Date/Heure de prise" value={formatDateHeureFr(patient.date)} />
              <InfoBox icon={<FileText className="size-5" />} label="Référence fiche paiement" value={patient.referencePaiement} />
              <InfoBox icon={<UserCog className="size-5" />} label="Responsable Création Fiche" value={patient.responsableCreation} />
              <InfoBox icon={<UserCog className="size-5" />} label="Responsable infirmier" value={patient.responsableInfirmier} className="sm:col-span-2" />
            </div>

            <button
              type="button"
              onClick={() => router.push(`/profil/patient/${patient.id}`)}
              className="flex items-center gap-2 text-sm font-bold text-[#6367EF] hover:underline"
            >
              <Pencil className="size-4" />
              Cliquez ici pour voir plus ou modifier
            </button>
          </div>
        )}

        {/* ---------- Étape 2 : Constantes ---------- */}
        {step === 1 && (
          <div className="space-y-5">
            <h2 className="text-2xl font-extrabold text-slate-800">Constantes du patient</h2>

            <div className="grid gap-4 lg:grid-cols-2">
              <MeasureField icon={<Activity className="size-4" />} label="Température" unit="°C" required step="0.1" placeholder="37.0" value={c.temperature} onChange={(v) => set({ temperature: v })} />
              <MeasureField icon={<Brain className="size-4" />} label="Périmètre crânien" unit="CM" step="0.1" value={c.perimetreCranien} onChange={(v) => set({ perimetreCranien: v })} />
              <MeasureField icon={<Ruler className="size-4" />} label="Périmètre brachial" unit="CM" step="0.1" value={c.perimetreBrachial} onChange={(v) => set({ perimetreBrachial: v })} />
              <MeasureField icon={<Weight className="size-4" />} label="Poids" unit="KG" required step="0.1" value={c.poids} onChange={(v) => set({ poids: v })} />
              <MeasureField icon={<Ruler className="size-4" />} label="Taille" unit="CM" required value={c.taille} onChange={(v) => set({ taille: v })} />
              <MeasureField icon={<Droplets className="size-4" />} label="Diurèse" unit="Ltre" step="0.1" value={c.diurese} onChange={(v) => set({ diurese: v })} />

              {/* IMC calculé */}
              <div className="space-y-1.5">
                <Label className="text-sm font-semibold text-slate-600">IMC</Label>
                <div className="flex items-stretch overflow-hidden rounded-xl border border-dashed border-slate-200 bg-slate-50">
                  <span className="flex w-11 items-center justify-center text-slate-500">
                    <Baby className="size-4" />
                  </span>
                  <div className="flex flex-1 items-center px-3 text-sm font-bold text-slate-600">
                    {imc || "—"}
                  </div>
                  <span className="flex items-center px-3 text-sm font-bold text-slate-500">kg/m²</span>
                </div>
              </div>

              {/* Convulsions Oui / Non */}
              <div className="space-y-1.5">
                <Label className="text-sm font-semibold text-slate-600">Convulsions</Label>
                <div className="flex gap-2">
                  {(["oui", "non"] as const).map((opt) => {
                    const on = c.convulsions === opt
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => set({ convulsions: opt })}
                        className={`flex-1 rounded-xl border px-4 py-2 text-sm font-semibold capitalize transition-colors ${
                          on
                            ? "border-[#6367EF] bg-[#6367EF] text-white"
                            : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        {opt}
                      </button>
                    )
                  })}
                </div>
              </div>

              <MeasureField icon={<Gauge className="size-4" />} label="Z-score" unit="SD" step="0.1" value={c.zScore} onChange={(v) => set({ zScore: v })} />
              <MeasureField icon={<Wind className="size-4" />} label="Saturation en oxygène" unit="%" value={c.saturation} onChange={(v) => set({ saturation: v })} />

              <PickField label="État nutritionnel" placeholder="Select..." options={ETATS_NUTRITIONNELS} value={c.etatNutritionnel} onChange={(v) => set({ etatNutritionnel: v })}   />
              <MeasureField icon={<Droplet className="size-4" />} label="Hémoglobine glyquée" unit="%" step="0.1" value={c.hemoglobineGlyquee} onChange={(v) => set({ hemoglobineGlyquee: v })} />

              <MeasureField icon={<Stethoscope className="size-4" />} label="Pouls" unit="Btt/mn" value={c.pouls} onChange={(v) => set({ pouls: v })} />
              <MeasureField icon={<Droplet className="size-4" />} label="Glycémie" unit="g/l" step="0.01" value={c.glycemie} onChange={(v) => set({ glycemie: v })} />

              <PickField label="Fréquence cardiaque" placeholder="Select..." options={FREQUENCES_CARDIAQUES} value={c.frequenceCardiaque} onChange={(v) => set({ frequenceCardiaque: v })} />
              <PickField label="Groupe Sanguin Rhésus" placeholder="-- Sélectionnez --" options={GROUPES_SANGUINS} value={c.groupeSanguin} onChange={(v) => set({ groupeSanguin: v })} />

              <MeasureField icon={<Wind className="size-4" />} label="Fréquence respiratoire" unit="Cle/mn" value={c.frequenceRespiratoire} onChange={(v) => set({ frequenceRespiratoire: v })} />
              <div className="hidden lg:block" />

              <TensionField label="Bras gauche" tas={c.brasGaucheTAS} tad={c.brasGaucheTAD} onTas={(v) => set({ brasGaucheTAS: v })} onTad={(v) => set({ brasGaucheTAD: v })} />
              <TensionField label="Bras droit" tas={c.brasDroitTAS} tad={c.brasDroitTAD} onTas={(v) => set({ brasDroitTAS: v })} onTad={(v) => set({ brasDroitTAD: v })} />
            </div>

            {/* Observations */}
            <div className="space-y-1.5">
              <Label htmlFor="obs" className="text-sm font-semibold text-slate-600">Observations</Label>
              <div className="flex items-stretch overflow-hidden rounded-xl border border-slate-200 focus-within:ring-2 focus-within:ring-[#0d9488]/40">
                <span className="flex w-11 shrink-0 items-start justify-center pt-3 text-slate-500">
                  <FileText className="size-4" />
                </span>
                <Textarea
                  id="obs"
                  rows={5}
                  value={c.observations}
                  onChange={(e) => set({ observations: e.target.value })}
                  placeholder="Notes de l'infirmier·ère, état général, antécédents signalés…"
                  className="flex-1 rounded-none border-0 shadow-none focus-visible:ring-0"
                />
              </div>
            </div>
          </div>
        )}

        {/* ---------- Étape 3 : Affectation ---------- */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-extrabold text-slate-800">Affectation du patient au praticien</h2>
            <div className="space-y-1.5">
              <Label className="text-sm font-semibold text-slate-600">
                Choisir le Professionnel de santé <span className="text-[#F04444]">*</span>
              </Label>
              <Select value={praticienId} onValueChange={setPraticienId}>
                <SelectTrigger className="rounded-xl border-slate-200 focus:ring-[#0d9488]">
                  <SelectValue placeholder="-- Sélectionnez --" />
                </SelectTrigger>
                <SelectContent>
                  {PRATICIENS.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.nom} ( Spécialité: {p.specialite} )
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>

      {/* Pied : actions */}
      <div className="space-y-3 bg-[#E8EEFF] px-4 py-5 sm:px-6">
        <div className="flex flex-wrap items-center gap-3">
          {!isLast ? (
            <Button
              type="button"
              onClick={next}
              className="h-11 flex-1 gap-2 rounded-full bg-[#0d9488] text-base font-bold text-white hover:bg-[#0b7d72] sm:flex-none sm:px-12"
            >
              Suivant
              <ArrowRight className="size-4" />
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleSave}
              disabled={saving || !praticienId}
              className="h-11 flex-1 gap-2 rounded-full bg-[#0d9488] text-base font-bold text-white hover:bg-[#0b7d72] disabled:opacity-60 sm:flex-none sm:px-12"
            >
              {saving ? <Activity className="size-4 animate-pulse" /> : <Save className="size-4" />}
              Enregistrer
            </Button>
          )}

          <Button
            type="button"
            onClick={() => router.push("/infirmerie")}
            className="h-11 flex-1 rounded-full bg-[#D11F45] text-base font-bold text-white hover:bg-[#b91a3b] sm:flex-none sm:px-12"
          >
            Annuler
          </Button>

          {step > 0 && (
            <button
              type="button"
              onClick={prev}
              className="ml-auto flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-700"
            >
              <ArrowLeft className="size-4" />
              Précédent
            </button>
          )}
        </div>

        <p className="text-xs text-slate-500">
          <span className="text-[#F04444]">*</span> Les champs marqués d&apos;un astérisque sont
          obligatoires pour valider votre enregistrement.
        </p>
      </div>
    </div>
  )
}