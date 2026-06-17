/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Topbar from "@/components/Topbar";
import {
  ChevronRight, ArrowLeft, Plus, Save, AlertTriangle, Clock, Calendar,
  CheckCircle, FileText, Stethoscope, Activity, Thermometer, Weight,
  Heart, Wind, Eye, X, ChevronDown, User, AlertCircle,
  Droplet,
  Phone,
} from "lucide-react";
 
import PatientInfoBar from "@/components/PatientInfoBar";
import { MotifCard } from "@/components/MotifCards";
import { CompteRenduTab } from "@/components/CompteRenduTab";
import { consultationsHistory, patients } from "@/lib/patient";

/* ─── helpers ─── */
const statutConsult = {
  "Terminée": { bg: "#d1fae5", color: "#065f46" },
  "En cours": { bg: "#dbeafe", color: "#1e40af" },
  "Brouillon": { bg: "#f1f5f9", color: "#475569" },
};

const motifOptions = [
  "Douleur thoracique", "Fièvre", "Dyspnée", "Céphalées",
  "Douleurs abdominales", "Consultation de suivi", "Bilan de santé",
  "Traumatisme", "Autres",
];

const antecedentsMedicaux = [
  "HTA", "Diabète type 2", "Asthme", "Cardiopathie",
  "Insuffisance rénale", "Dyslipidémie", "Hypothyroïdie",
  "Dépression", "Ulcère gastrique",
];

const etatConscience = ["Conscient et orienté", "Confus", "Somnolent", "Comateux"];
const voies = ["Orale", "Injectable IV", "Injectable IM"];
const echelleDouleur = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const TABS = [
  { id: "motif", label: "Motif & Anamnèse", icon: FileText },
  { id: "antecedents", label: "Antécédents", icon: Clock },
  { id: "examen", label: "Examen Clinique", icon: Stethoscope },
  // { id: "etats", label: "États Généraux", icon: Activity },
  { id: "compterendu", label: "Compte-rendu", icon: FileText },
] as const;



/* ─── component ─── */
export default function ConsultationPatientPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const patient = patients.find((p) => p.id === id);
  const history = consultationsHistory[id] ?? [];

  /* view state */
  const [view, setView] = useState<"history" | "new">("history");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  /* form state */
  const [activeTab, setActiveTab] = useState<typeof TABS[number]["id"]>("motif");
  const [motifsSelected, setMotifsSelected] = useState<string[]>([]);

  const [anamnese, setAnamnese] = useState("");
  const [antecedents, setAntecedents] = useState<string[]>([]);
  const [conscience, setConscience] = useState("Conscient et orienté");
  const [evaScore, setEvaScore] = useState(0);
  const [saved, setSaved] = useState(false);
  const [vitals, setVitals] = useState({
    ta_systolique: "", ta_diastolique: "", fc: "", fr: "",
    temperature: "", spo2: "", poids: "", taille: "", imc: "",
  });


  const toggleMotif = (m: string) => {
    setMotifsSelected((prev) =>
      prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]
    );
  }; 

  if (!patient) {
    return (
      <div className="p-8 text-center">
        <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, color: "var(--text-primary)" }}>
          Patient introuvable
        </p>
        <Link href="/dossier_medical/consultation">
          <button className="btn-primary mt-4">← Retour à la liste</button>
        </Link>
      </div>
    );
  }

  const initiales = `${patient.nom[0]}${patient.prenom[0]}`.toUpperCase();

  const calcIMC = () => {
    const p = parseFloat(vitals.poids);
    const t = parseFloat(vitals.taille) / 100;
    if (p && t) setVitals((v) => ({ ...v, imc: (p / (t * t)).toFixed(1) }));
  };

  const toggleAntecedent = (item: string) =>
    setAntecedents((prev) =>
      prev.includes(item) ? prev.filter((a) => a !== item) : [...prev, item]
    );

  const evaColor = evaScore <= 3 ? "#10b981" : evaScore <= 6 ? "#f59e0b" : "#ef4444";

  /* ─── render ─── */
  return (
    <div>
      <Topbar
        title="Consultation Médicale"
        subtitle={`${patient.nom} ${patient.prenom} · ${patient.id}`}
      />
      <div className="p-8">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-6" style={{ color: "var(--text-muted)" }}>
          <Link href="/dossier_medical/consultation">
            <span className="cursor-pointer hover:text-teal-600 transition-colors">Consultation</span>
          </Link>
          <ChevronRight size={14} />
          <span style={{ color: "var(--primary)", fontWeight: 600 }}>
            {patient.nom} {patient.prenom}
          </span>
        </div>

        {/* Patient identity card */}
        <div className="card-dpi p-5 mb-6 flex items-center gap-5">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0"
            style={{
              background:
                patient.statut === "Urgent" ? "#ef4444"
                : patient.statut === "Hospitalisé" ? "#3b82f6"
                : "var(--primary)",
              fontFamily: "var(--font-display)",
            }}
          >
            {initiales}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 18, color: "var(--text-primary)" }}>
                {patient.nom} {patient.prenom}
              </p>
            </div>
            <div className="flex gap-4 mt-1.5 flex-wrap">
               <PatientInfoBar patient={patient} />
            </div> 
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={() => { setView("history"); setSaved(false); }}
              className="px-4 py-2 rounded-xl text-sm font-semibold transition-all"
              style={{
                background: view === "history" ? "#50C878" : "var(--bg-main)",
                color: view === "history" ? "white" : "var(--text-secondary)",
                border: `1.5px solid ${view === "history" ? "var(--primary)" : "var(--border)"}`,
                fontFamily: "var(--font-display)",
              }}
            >
              Historique ({history.length})
            </button>
            <button
              onClick={() => setView("new")}
              className="btn-primary flex items-center gap-2"
            >
              <Plus size={16} /> Nouvelle consultation
            </button>
          </div>
        </div>

        {/* ── HISTORY VIEW ── */}
        {view === "history" && (
          <div className="space-y-3">
            {history.length === 0 ? (
              <div className="text-center py-16 card-dpi">
                <FileText size={40} color="var(--text-muted)" style={{ margin: "0 auto 12px" }} />
                <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--text-secondary)" }}>
                  Aucune consultation enregistrée
                </p>
                <button onClick={() => setView("new")} className="btn-primary mt-4">
                  Créer la première consultation
                </button>
              </div>
            ) : (
              history.map((consult, idx) => {
                const cfg = statutConsult[consult.statut];
                const isExpanded = expandedId === consult.id;
                return (
                  <div key={consult.id} className="card-dpi overflow-hidden">
                    {/* Header row */}
                    <div
                      className="flex items-center gap-4 p-5 cursor-pointer"
                      onClick={() => setExpandedId(isExpanded ? null : consult.id)}
                    >
                      {/* Number */}
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                        style={{ background: "var(--primary)", fontFamily: "var(--font-display)" }}>
                        {history.length - idx}
                      </div>

                      {/* Date */}
                      <div className="flex items-center gap-2" style={{ minWidth: 120 }}>
                        <Calendar size={14} color="var(--primary)" />
                        <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>
                          {new Date(consult.date).toLocaleDateString("fr-FR", {
                            day: "numeric", month: "long", year: "numeric",
                          })}
                        </span>
                      </div>

                      {/* Motif */}
                      <div className="flex-1">
                        <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14, color: "var(--text-primary)" }}>
                          {consult.motif}
                        </p>
                        <p style={{ fontSize: 12, color: "var(--text-muted)" }}>{consult.medecin}</p>
                      </div>

                      {/* Diagnostic */}
                      <div style={{ minWidth: 200 }}>
                        <p style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 2 }}>Diagnostic</p>
                        <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>
                          {consult.diagnostic}
                        </p>
                      </div>

                      {/* Statut */}
                      <div className="px-3 py-1 rounded-xl text-xs font-bold"
                        style={{ background: cfg.bg, color: cfg.color }}>
                        {consult.statut}
                      </div>

                      <ChevronDown
                        size={18}
                        color="var(--text-muted)"
                        style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}
                      />
                    </div>

                    {/* Expanded detail */}
                    {isExpanded && (
                      <div className="px-5 pb-5 border-t" style={{ borderColor: "var(--border)" }}>
                        <div className="mt-4 grid grid-cols-2 gap-4">
                          <div className="p-4 rounded-2xl" style={{ background: "var(--bg-main)" }}>
                            <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 13, color: "var(--primary)", marginBottom: 8 }}>
                              Notes cliniques
                            </p>
                            <p style={{ fontSize: 14, color: "var(--text-primary)", lineHeight: 1.6 }}>
                              {consult.notes}
                            </p>
                          </div>
                          <div className="p-4 rounded-2xl" style={{ background: "var(--bg-main)" }}>
                            <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 13, color: "var(--primary)", marginBottom: 8 }}>
                              Récapitulatif
                            </p>
                            <div className="space-y-2">
                              {[
                                { label: "Médecin", value: consult.medecin },
                                { label: "Diagnostic", value: consult.diagnostic },
                                { label: "Statut", value: consult.statut },
                              ].map((row) => (
                                <div key={row.label} className="flex justify-between">
                                  <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{row.label}</span>
                                  <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text-primary)" }}>{row.value}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-end mt-4 gap-2">
                          <button className="px-4 py-2 rounded-xl text-sm font-semibold"
                            style={{ background: "var(--primary-light)", color: "var(--primary)", fontFamily: "var(--font-display)" }}>
                            Voir le CR complet
                          </button>
                          <button onClick={() => setView("new")} className="btn-primary text-sm">
                            Nouvelle consultation
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* ── NEW CONSULTATION VIEW ── */}
        {view === "new" && (
          <div>
            {/* Tabs */}
            <div className="flex gap-2 mb-6 p-1 rounded-xl flex-wrap"
              style={{ background: "white", border: "1px solid var(--border)", display: "inline-flex" }}>
              {TABS.map((tab) => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all"
                  style={{
                    background: activeTab === tab.id ? "#50C878" : "transparent",
                    color: activeTab === tab.id ? "white" : "var(--text-secondary)",
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                  }}
                >
                  <tab.icon size={14} />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* ── Tab: Motif ── */}
            {activeTab === "motif" && (
              <div className="grid grid-cols-2 gap-6">
                  <MotifCard/>
                <div className="card-dpi p-6">
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, marginBottom: 16, color: "var(--text-primary)" }}>
                    Anamnèse
                  </h3>
                  <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 8 }}>
                    Histoire de la maladie présente
                  </p>
                  <textarea className="input-dpi" rows={8} cols={60}
                    placeholder="Décrivez l'histoire de la maladie présente..."
                    value={anamnese} onChange={(e) => setAnamnese(e.target.value)}
                    style={{ resize: "vertical" }} />
                  {/* <div className="mt-3 flex gap-2 flex-wrap">
                    {["Début brutal", "Début progressif", "Évolution favorable", "Récidive"].map((tag) => (
                      <button key={tag} className="px-3 py-1 rounded-lg text-xs"
                        style={{ background: "var(--primary-light)", color: "var(--primary)", fontWeight: 600 }}>
                        + {tag}
                      </button>
                    ))}
                  </div> */}
                </div>
              </div>
            )}

            {/* ── Tab: Antécédents ── */}
            {activeTab === "antecedents" && (
              <div className="grid grid-cols-2 gap-6">
                <div className="card-dpi p-6">
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, marginBottom: 16, color: "var(--text-primary)" }}>
                    Antécédents Médicaux
                  </h3>
                  {/* Pre-filled from patient profile */}
                  {patient.antecedentsPerso.length > 0 && (
                    <div className="mb-4 p-3 rounded-xl" style={{ background: "var(--primary-light)", border: "1px solid var(--primary-muted)" }}>
                      <p style={{ fontSize: 11, fontWeight: 700, color: "var(--primary)", marginBottom: 6 }}>
                        Depuis le dossier patient
                      </p>
                      {patient.antecedentsPerso.map((a) => (
                        <div key={a.type} className="flex items-center justify-between mb-1">
                          <span style={{ fontSize: 12, color: "var(--text-primary)" }}>{a.type}</span>
                          <span className="text-xs px-2 py-0.5 rounded-lg"
                            style={{ background: "white", color: "var(--primary)", fontWeight: 600 }}>
                            {a.statut}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="space-y-2">
                    {antecedentsMedicaux.map((item) => (
                      <div key={item} onClick={() => toggleAntecedent(item)}
                        className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all"
                        style={{
                          background: antecedents.includes(item) ? "var(--primary-light)" : "var(--bg-main)",
                          border: `1.5px solid ${antecedents.includes(item) ? "var(--primary)" : "var(--border)"}`,
                        }}>
                        <div className="w-5 h-5 rounded-md flex items-center justify-center"
                          style={{ background: antecedents.includes(item) ? "var(--primary)" : "white", border: "1.5px solid var(--primary)" }}>
                          {antecedents.includes(item) && <span style={{ color: "white", fontSize: 12, fontWeight: 700 }}>✓</span>}
                        </div>
                        <span style={{ fontSize: 14, color: "var(--text-primary)", fontWeight: antecedents.includes(item) ? 600 : 400 }}>
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="card-dpi p-6">
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, marginBottom: 16, color: "var(--text-primary)" }}>
                    Allergies & Traitements en cours
                  </h3>
                  {/* Allergies from profile */}
                  {patient.allergies.length > 0 && (
                    <div className="mb-4 p-3 rounded-xl" style={{ background: "#fff7ed", border: "1px solid #fed7aa" }}>
                      <p style={{ fontSize: 11, fontWeight: 700, color: "#c2410c", marginBottom: 6 }}>
                         Allergies connues
                      </p>
                      <div className="flex gap-2 flex-wrap">
                        {patient.allergies.map((a) => (
                          <span key={a} className="px-2 py-0.5 rounded-lg text-xs font-semibold"
                            style={{ background: "#fee2e2", color: "#991b1b" }}>{a}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {/* Traitements */}
                  {patient.traitements.length > 0 && (
                    <div className="mb-4">
                      <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 13, color: "var(--text-secondary)", marginBottom: 8 }}>
                        Traitements en cours
                      </p>
                      {patient.traitements.map((t, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 rounded-xl mb-2"
                          style={{ background: "var(--bg-main)", border: "1px solid var(--border)" }}>
                          <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: "var(--primary)" }} />
                          <div>
                            <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>{t.medicament}</p>
                            <p style={{ fontSize: 11, color: "var(--text-muted)" }}>{t.posologie} · {t.duree}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                <div>
                  <label className="label-dpi" style={{ marginBottom: '8px', display: 'block', fontWeight: 'bold' }}>
                    Antécédents familiaux
                  </label>
                  <textarea 
                    className="input-dpi" 
                    rows={3}
                    defaultValue={patient.antecedentsFamiliaux.map(a => `${a.parent}: ${a.pathologie}`).join("\n")}
                    style={{ 
                      width: '100%', 
                      padding: '10px', 
                      borderRadius: '8px', 
                      border: '1px solid #ccc',
                      resize: "vertical",
                      fontFamily: 'inherit'
                    }} 
                  />
                </div>
                </div>
              </div>
            )}

            {/* ── Tab: Examen clinique ── */}
            {activeTab === "examen" && (
              <div className="grid grid-cols-3 gap-6">
                {/* TA */}
                <div className="card-dpi p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "var(--primary-light)" }}>
                      <Activity size={16} color="var(--primary)" />
                    </div>
                    <label className="label-dpi" style={{ marginBottom: 0 }}>Tension Artérielle</label>
                  </div>
                  <div className="flex gap-2 items-center">
                    <input className="input-dpi" placeholder="Systolique" value={vitals.ta_systolique}
                      onChange={(e) => setVitals((v) => ({ ...v, ta_systolique: e.target.value }))} />
                    <span style={{ color: "var(--text-muted)", fontWeight: 700 }}>/</span>
                    <input className="input-dpi" placeholder="Diastolique" value={vitals.ta_diastolique}
                      onChange={(e) => setVitals((v) => ({ ...v, ta_diastolique: e.target.value }))} />
                  </div>
                  <p style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 6 }}>Normal: 120/80 mmHg</p>
                </div>

                {[
                  { label: "Fréquence Cardiaque", unit: "bpm", icon: Heart, key: "fc", normal: "60-100 bpm", placeholder: "72" },
                  { label: "Fréquence Respiratoire", unit: "/min", icon: Wind, key: "fr", normal: "12-20 /min", placeholder: "16" },
                  { label: "Température", unit: "°C", icon: Thermometer, key: "temperature", normal: "36.5-37.5°C", placeholder: "37.0" },
                  { label: "SpO2", unit: "%", icon: Eye, key: "spo2", normal: "> 95%", placeholder: "98" },
                ].map((field) => (
                  <div key={field.key} className="card-dpi p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "var(--primary-light)" }}>
                        <field.icon size={16} color="var(--primary)" />
                      </div>
                      <label className="label-dpi" style={{ marginBottom: 0 }}>{field.label}</label>
                    </div>
                    <div className="flex gap-2 items-center">
                      <input className="input-dpi" placeholder={`Ex: ${field.placeholder}`}
                        value={(vitals as any)[field.key]}
                        onChange={(e) => setVitals((v) => ({ ...v, [field.key]: e.target.value }))} />
                      <span style={{ fontWeight: 700, color: "var(--primary)", minWidth: 36 }}>{field.unit}</span>
                    </div>
                    <p style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 6 }}>Normal: {field.normal}</p>
                  </div>
                ))}

                {/* IMC */}
                <div className="card-dpi p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "var(--primary-light)" }}>
                      <Weight size={16} color="var(--primary)" />
                    </div>
                    <label className="label-dpi" style={{ marginBottom: 0 }}>Poids & Taille</label>
                  </div>
                  <div className="space-y-2">
                    <div className="flex gap-2 items-center">
                      <input className="input-dpi" placeholder="Poids" value={vitals.poids}
                        onChange={(e) => setVitals((v) => ({ ...v, poids: e.target.value }))} />
                      <span style={{ fontWeight: 700, color: "var(--primary)", minWidth: 24 }}>kg</span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <input className="input-dpi" placeholder="Taille" value={vitals.taille}
                        onChange={(e) => setVitals((v) => ({ ...v, taille: e.target.value }))} />
                      <span style={{ fontWeight: 700, color: "var(--primary)", minWidth: 24 }}>cm</span>
                    </div>
                    <button onClick={calcIMC} className="btn-primary w-full mt-1" style={{ padding: "7px 0", fontSize: 13 }}>
                      Calculer IMC
                    </button>
                    {vitals.imc && (
                      <div className="mt-2 p-2 rounded-xl text-center" style={{ background: "var(--primary-light)" }}>
                        <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22, color: "var(--primary)" }}>
                          {vitals.imc}
                        </span>
                        <span style={{ fontSize: 12, color: "var(--primary)", marginLeft: 4 }}>IMC</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ── Tab: États généraux ── */}
            {/* {activeTab === "etats" && ( */}
              {/* // <div className="grid grid-cols-2 gap-6"> */}
                {/* <div className="card-dpi p-6">
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, marginBottom: 20, color: "var(--text-primary)" }}>
                    État de Conscience
                  </h3>
                  <div className="space-y-3">
                    {etatConscience.map((e) => (
                      <div key={e} onClick={() => setConscience(e)}
                        className="flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all"
                        style={{
                          background: conscience === e ? "var(--primary-light)" : "var(--bg-main)",
                          border: `1.5px solid ${conscience === e ? "var(--primary)" : "var(--border)"}`,
                        }}>
                        <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center"
                          style={{ borderColor: "var(--primary)", background: conscience === e ? "var(--primary)" : "transparent" }}>
                          {conscience === e && <div className="w-2 h-2 rounded-full bg-white" />}
                        </div>
                        <span style={{ fontSize: 14, color: "var(--text-primary)", fontWeight: conscience === e ? 600 : 400 }}>
                          {e}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="card-dpi p-6">
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, marginBottom: 20, color: "var(--text-primary)" }}>
                    Douleur — Échelle EVA
                  </h3>
                  <div className="flex justify-between items-center mb-3">
                    <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>Aucune</span>
                    <div className="px-4 py-2 rounded-xl" style={{ background: evaColor + "22" }}>
                      <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 24, color: evaColor }}>
                        {evaScore}/10
                      </span>
                    </div>
                    <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>Maximale</span>
                  </div>
                  <input type="range" min={0} max={10} value={evaScore}
                    onChange={(e) => setEvaScore(Number(e.target.value))}
                    className="w-full mb-2" style={{ accentColor: evaColor }} />
                  <div className="flex justify-between">
                    {echelleDouleur.map((n) => (
                      <span key={n} style={{ fontSize: 11, color: n === evaScore ? evaColor : "var(--text-muted)", fontWeight: n === evaScore ? 800 : 400 }}>
                        {n}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 space-y-3">
                    <div>
                      <label className="label-dpi">Localisation</label>
                      <input className="input-dpi" placeholder="Ex: thorax, abdomen..." />
                    </div>
                    <div>
                      <label className="label-dpi">Type de douleur</label>
                      <select className="input-dpi">
                        <option>Choisir...</option>
                        <option>Brûlure</option>
                        <option>Serrement</option>
                        <option>Pulsatile</option>
                        <option>Crampe</option>
                        <option>Irradiation</option>
                      </select>
                    </div>
                  </div>
                </div> */}
                {/* Signes associés */}
                {/* <div className="card-dpi p-6 col-span-2">
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, marginBottom: 12, color: "var(--text-primary)" }}>
                    Autres Signes Cliniques
                  </h3>
                  <div className="grid grid-cols-6 gap-2">
                    {["Pâleur", "Ictère", "Cyanose", "Œdèmes", "Dyspnée", "Toux", "Nausées", "Vomissements", "Fièvre", "Sueurs", "Amaigrissement", "Asthénie"].map((s) => (
                      <label key={s} className="flex items-center gap-2 cursor-pointer p-3 rounded-xl"
                        style={{ background: "var(--bg-main)", border: "1px solid var(--border)" }}>
                        <input type="checkbox" style={{ accentColor: "var(--primary)" }} />
                        <span style={{ fontSize: 12, color: "var(--text-primary)" }}>{s}</span>
                      </label>
                    ))}
                  </div>
                </div> */}
              {/* </div>
            )} */}

            {/* ── Tab: Compte-rendu ── */}
            {activeTab === "compterendu" && (
              <CompteRenduTab/>
            )}

            {/* Save bar */}
            <div className="mt-8 flex items-center justify-between p-5 rounded-2xl"
              style={{ background: "white", border: "1px solid var(--border)" }}>
              <div className="flex items-center gap-2">
                <AlertCircle size={16} color="var(--accent-yellow)" />
                <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>
                  Les données non enregistrées seront perdues
                </span>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setView("history")}
                  className="px-5 py-2 rounded-xl text-sm font-semibold"
                  style={{ background: "var(--bg-main)", color: "var(--text-secondary)", border: "1px solid var(--border)", fontFamily: "var(--font-display)" }}>
                  Annuler
                </button>
                <button className="btn-accent">Enregistrer brouillon</button>
                <button className="btn-primary flex items-center gap-2" onClick={() => { setSaved(true); setTimeout(() => { setSaved(false); setView("history"); }, 1500); }}>
                  <Save size={16} />
                  {saved ? "✓ Enregistré !" : "Valider la consultation"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}