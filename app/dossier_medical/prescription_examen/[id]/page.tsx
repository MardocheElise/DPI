/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
// Route : app/dossier_medical/prescription_examen/[id]/page.tsx
// Historique prescriptions examens + nouvelle prescription

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Topbar from "@/components/Topbar";

import {
  ChevronRight, ChevronDown, Plus, X, Save, Zap,
  AlertTriangle, FlaskConical, Scan, Calendar,
} from "lucide-react";
import { prescriptionExamenHistory } from "@/lib/history";
import { patients } from "@/lib/patient";


/* ── static data ── */
const biologie: Record<string, string[]> = {
  "Hématologie": ["NFS (Numération Formule Sanguine)", "VS", "TP/INR", "TCA", "Groupe sanguin + Rhésus", "Frottis sanguin"],
  "Biochimie":   ["Glycémie à jeun", "HbA1c", "Créatinine + DFG", "Ionogramme", "Bilan hépatique complet", "Bilirubine", "Cholestérol + Triglycérides", "Ferritine + bilan martial"],
  "Infectieux":  ["CRP", "Procalcitonine", "Sérologie VIH", "Sérologie Hépatite B/C", "Goutte épaisse (Paludisme)", "ECBU"],
  "Hormones":    ["TSH", "T3/T4 libre", "Cortisol", "PSA total/libre", "β-HCG"],
};

const imagerie = [
  { type: "Radiographie", zones: ["Thorax", "Abdomen sans préparation", "Rachis cervical", "Rachis lombaire", "Membre supérieur", "Membre inférieur", "Crâne", "Bassin"] },
  { type: "Échographie",  zones: ["Abdominale", "Pelvienne", "Cardiaque (ETT)", "Thyroïde", "Rénale bilatérale", "Obstétricale", "Doppler vasculaire"] },
  { type: "Scanner (TDM)", zones: ["Cérébral", "Thoracique", "Abdomino-pelvien", "Corps entier trauma", "Rachis", "Membres"] },
  { type: "IRM",           zones: ["Cérébrale", "Rachis cervical", "Rachis lombaire", "Abdominale", "Pelvienne", "Articulaire"] },
];

const autresExamens = ["ECG 12 dérivations", "Holter ECG 24h", "EFR — Spirométrie", "Fibroscopie gastrique", "Coloscopie", "Myélogramme", "Électrophorèse Hb", "Biopsie"];

const resultBadge: Record<string, { bg: string; color: string }> = {
  "Normal":     { bg: "#d1fae5", color: "#065f46" },
  "Anormal":    { bg: "#fef3c7", color: "#92400e" },
  "Critique":   { bg: "#fee2e2", color: "#991b1b" },
  "En attente": { bg: "#f1f5f9", color: "#475569" },
};

const prescStatut: Record<string, { bg: string; color: string }> = {
  "Réalisée":   { bg: "#d1fae5", color: "#065f46" },
  "En attente": { bg: "#fef3c7", color: "#92400e" },
  "Urgente":    { bg: "#fee2e2", color: "#991b1b" },
  "Annulée":    { bg: "#f1f5f9", color: "#475569" },
};

interface ExamLine { id: string; label: string; type: "biologie" | "imagerie" | "autre"; detail?: string; urgence: boolean; }

type TabType = "biologie" | "imagerie" | "autre";

export default function PrescriptionExamenPatientPage() {
  const { id }   = useParams<{ id: string }>();
  const patient  = patients.find((p) => p.id === id);
  const history  = prescriptionExamenHistory[id] ?? [];

  const [view, setView]           = useState<"history" | "new">("history");
  const [expandedId, setExpanded] = useState<string | null>(null);

  /* form */
  const [tab, setTab]           = useState<TabType>("biologie");
  const [lines, setLines]       = useState<ExamLine[]>([]);
  const [globalUrg, setGlobalUrg] = useState(false);
  const [motif, setMotif]       = useState("");
  const [saved, setSaved]       = useState(false);

  if (!patient) return (
    <div className="p-8 text-center">
      <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18 }}>Patient introuvable</p>
      <Link href="/dossier_medical/prescription_examen">
        <button className="btn-primary mt-4">← Retour</button>
      </Link>
    </div>
  );

  const isAdded = (label: string, detail?: string) =>
    lines.some((l) => l.label === label && l.detail === detail);

  const toggleExam = (label: string, type: TabType, detail?: string) => {
    if (isAdded(label, detail)) {
      setLines((prev) => prev.filter((l) => !(l.label === label && l.detail === detail)));
    } else {
      setLines((prev) => [...prev, { id: Date.now().toString(), label, type, detail, urgence: globalUrg }]);
    }
  };

  const toggleUrgence = (id: string) =>
    setLines((prev) => prev.map((l) => l.id === id ? { ...l, urgence: !l.urgence } : l));

  /* ─── render ─── */
  return (
    <div>
      <Topbar title="Prescription Examens" subtitle={`${patient.nom} ${patient.prenom} · ${patient.id}`} />
      <div className="p-8">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-6" style={{ color: "var(--text-muted)" }}>
          <Link href="/dossier_medical/prescription_examen">
            <span className="cursor-pointer hover:text-teal-600 transition-colors">Prescription Examens</span>
          </Link>
          <ChevronRight size={14} />
          <span style={{ color: "var(--primary)", fontWeight: 600 }}>{patient.nom} {patient.prenom}</span>
        </div>

        {/* Patient card */}
        <div className="card-dpi p-5 mb-6 flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0"
            style={{ background: patient.statut === "Urgent" ? "#ef4444" : patient.statut === "Hospitalisé" ? "#3b82f6" : "var(--primary)", fontFamily: "var(--font-display)" }}>
            {patient.nom[0]}{patient.prenom[0]}
          </div>
          <div className="flex-1">
            <p style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 18, color: "var(--text-primary)" }}>
              {patient.nom} {patient.prenom}
            </p>
            <div className="flex gap-4 mt-1 flex-wrap">
              {[`👤 ${patient.sexe} · ${patient.age} ans`, `🩸 ${patient.groupeSanguin}`, `👨‍⚕️ ${patient.medecin}`].map((i) => (
                <span key={i} style={{ fontSize: 12, color: "var(--text-secondary)" }}>{i}</span>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setView("history")}
              className="px-4 py-2 rounded-xl text-sm font-semibold transition-all"
              style={{ background: view === "history" ? "var(--primary)" : "var(--bg-main)", color: view === "history" ? "white" : "var(--text-secondary)", border: `1.5px solid ${view === "history" ? "var(--primary)" : "var(--border)"}`, fontFamily: "var(--font-display)" }}>
              Historique ({history.length})
            </button>
            <button onClick={() => setView("new")} className="btn-primary flex items-center gap-2">
              <Plus size={16} /> Nouvelle prescription
            </button>
          </div>
        </div>

        {/* ── HISTORY ── */}
        {view === "history" && (
          <div className="space-y-3">
            {history.length === 0 ? (
              <div className="text-center py-16 card-dpi">
                <FlaskConical size={40} color="var(--text-muted)" style={{ margin: "0 auto 12px" }} />
                <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--text-secondary)" }}>Aucune prescription d&apos;examens</p>
                <button onClick={() => setView("new")} className="btn-primary mt-4">Créer la première prescription</button>
              </div>
            ) : history.map((presc, idx) => {
              const isOpen = expandedId === presc.id;
              const sc = prescStatut[presc.statut] ?? prescStatut["Réalisée"];
              const critiques = presc.examens.filter(e => e.resultat === "Critique").length;
              const urgents   = presc.examens.filter(e => e.urgence).length;

              return (
                <div key={presc.id} className="card-dpi overflow-hidden">
                  <div className="flex items-center gap-4 p-5 cursor-pointer"
                    onClick={() => setExpanded(isOpen ? null : presc.id)}>
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                      style={{ background: presc.statut === "Urgente" ? "#ef4444" : "var(--primary)", fontFamily: "var(--font-display)" }}>
                      {history.length - idx}
                    </div>
                    <div className="flex items-center gap-2" style={{ minWidth: 130 }}>
                      <Calendar size={14} color="var(--primary)" />
                      <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>
                        {new Date(presc.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14, color: "var(--text-primary)" }}>
                        {presc.examens.length} examen{presc.examens.length > 1 ? "s" : ""} prescrit{presc.examens.length > 1 ? "s" : ""}
                      </p>
                      <p style={{ fontSize: 12, color: "var(--text-muted)" }}>{presc.motif} · {presc.medecin}</p>
                    </div>

                    {/* Exam type pills */}
                    <div className="flex gap-1.5 flex-wrap" style={{ maxWidth: 260 }}>
                      {presc.examens.slice(0, 3).map((e, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-lg text-xs font-semibold"
                          style={{
                            background: e.type === "biologie" ? "var(--primary-light)" : e.type === "imagerie" ? "#dbeafe" : "#f3e8ff",
                            color: e.type === "biologie" ? "var(--primary)" : e.type === "imagerie" ? "#1e40af" : "#7c3aed",
                          }}>
                          {e.label.slice(0, 15)}{e.label.length > 15 ? "…" : ""}
                        </span>
                      ))}
                      {presc.examens.length > 3 && (
                        <span className="px-2 py-0.5 rounded-lg text-xs" style={{ background: "var(--bg-main)", color: "var(--text-muted)" }}>
                          +{presc.examens.length - 3}
                        </span>
                      )}
                    </div>

                    {urgents > 0 && (
                      <div className="flex items-center gap-1 px-2 py-1 rounded-lg" style={{ background: "#fee2e2" }}>
                        <Zap size={12} color="#ef4444" />
                        <span style={{ fontSize: 11, color: "#991b1b", fontWeight: 700 }}>{urgents} urgent{urgents > 1 ? "s" : ""}</span>
                      </div>
                    )}
                    {critiques > 0 && (
                      <div className="flex items-center gap-1 px-2 py-1 rounded-lg" style={{ background: "#ede9fe" }}>
                        <AlertTriangle size={12} color="#7c3aed" />
                        <span style={{ fontSize: 11, color: "#6d28d9", fontWeight: 700 }}>{critiques} critique{critiques > 1 ? "s" : ""}</span>
                      </div>
                    )}

                    <div className="px-3 py-1 rounded-xl text-xs font-bold"
                      style={{ background: sc.bg, color: sc.color, whiteSpace: "nowrap" }}>{presc.statut}</div>
                    <ChevronDown size={18} color="var(--text-muted)"
                      style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
                  </div>

                  {isOpen && (
                    <div className="px-5 pb-5 border-t" style={{ borderColor: "var(--border)" }}>
                      <div className="mt-4 space-y-2">
                        {presc.examens.map((e, i) => {
                          const rc = e.resultat ? (resultBadge[e.resultat] ?? resultBadge["En attente"]) : null;
                          return (
                            <div key={i} className="flex items-center gap-3 p-3 rounded-xl"
                              style={{ background: e.urgence ? "#fff7ed" : "var(--bg-main)", border: `1px solid ${e.urgence ? "#fed7aa" : "var(--border)"}` }}>
                              <div className="w-2 h-2 rounded-full flex-shrink-0"
                                style={{ background: e.type === "biologie" ? "var(--primary)" : e.type === "imagerie" ? "#3b82f6" : "#8b5cf6" }} />
                              <div className="flex-1">
                                <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 13, color: "var(--text-primary)" }}>
                                  {e.label}
                                </span>
                                {e.detail && <span style={{ fontSize: 12, color: "var(--text-muted)" }}> · {e.detail}</span>}
                                {e.urgence && <span style={{ fontSize: 11, color: "#ef4444", fontWeight: 700, marginLeft: 6 }}>⚡ URGENT</span>}
                              </div>
                              <span className="text-xs px-1.5 py-0.5 rounded font-semibold"
                                style={{ background: e.type === "biologie" ? "var(--primary-light)" : e.type === "imagerie" ? "#dbeafe" : "#f3e8ff", color: e.type === "biologie" ? "var(--primary)" : e.type === "imagerie" ? "#1e40af" : "#7c3aed" }}>
                                {e.type}
                              </span>
                              {rc && (
                                <span className="text-xs px-2 py-0.5 rounded-lg font-bold"
                                  style={{ background: rc.bg, color: rc.color }}>{e.resultat}</span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                      <div className="flex justify-end mt-4 gap-2">
                        <button className="px-4 py-2 rounded-xl text-sm font-semibold"
                          style={{ background: "var(--primary-light)", color: "var(--primary)", fontFamily: "var(--font-display)" }}>
                          Voir les résultats
                        </button>
                        <button onClick={() => setView("new")} className="btn-primary text-sm">Nouvelle prescription</button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ── NEW PRESCRIPTION ── */}
        {view === "new" && (
          <div className="space-y-6">

            {/* Type tabs */}
            <div className="grid grid-cols-3 gap-4">
              {([
                { id: "biologie", label: "Biologie Médicale", icon: FlaskConical, desc: "Analyses sanguines, urinaires..." },
                { id: "imagerie", label: "Imagerie Médicale", icon: Scan, desc: "Radio, Écho, Scanner, IRM..." },
                { id: "autre",    label: "Autres Examens",    icon: Zap, desc: "ECG, EFR, endoscopies..." },
              ] as { id: TabType; label: string; icon: any; desc: string }[]).map((t) => (
                <button key={t.id} onClick={() => setTab(t.id)}
                  className="p-5 rounded-2xl text-left transition-all"
                  style={{
                    background: tab === t.id ? "var(--primary)" : "white",
                    border: `2px solid ${tab === t.id ? "var(--primary)" : "var(--border)"}`,
                    boxShadow: tab === t.id ? "0 4px 20px rgba(13,148,136,0.25)" : "none",
                  }}>
                  <t.icon size={22} color={tab === t.id ? "white" : "var(--primary)"} />
                  <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, color: tab === t.id ? "white" : "var(--text-primary)", marginTop: 8 }}>{t.label}</p>
                  <p style={{ fontSize: 12, color: tab === t.id ? "rgba(255,255,255,0.7)" : "var(--text-muted)" }}>{t.desc}</p>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-6">
              {/* Selector */}
              <div className="col-span-2 card-dpi p-6">

                {/* BIOLOGIE */}
                {tab === "biologie" && (
                  <div>
                    <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, marginBottom: 16, color: "var(--text-primary)" }}>
                      Examens Biologiques
                    </h3>
                    {Object.entries(biologie).map(([cat, items]) => (
                      <div key={cat} className="mb-5">
                        <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 12, color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>
                          {cat}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {items.map((item) => (
                            <button key={item} onClick={() => toggleExam(item, "biologie")}
                              className="px-3 py-2 rounded-xl text-sm transition-all"
                              style={{
                                background: isAdded(item) ? "var(--primary)" : "var(--bg-main)",
                                color: isAdded(item) ? "white" : "var(--text-primary)",
                                border: `1.5px solid ${isAdded(item) ? "var(--primary)" : "var(--border)"}`,
                                fontWeight: isAdded(item) ? 600 : 400,
                              }}>
                              {isAdded(item) ? "✓ " : ""}{item}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* IMAGERIE */}
                {tab === "imagerie" && (
                  <div>
                    <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, marginBottom: 16, color: "var(--text-primary)" }}>
                      Imagerie Médicale
                    </h3>
                    {imagerie.map(({ type, zones }) => (
                      <div key={type} className="mb-5">
                        <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 12, color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>
                          {type}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {zones.map((zone) => (
                            <button key={zone} onClick={() => toggleExam(type, "imagerie", zone)}
                              className="px-3 py-2 rounded-xl text-sm transition-all"
                              style={{
                                background: isAdded(type, zone) ? "var(--primary)" : "var(--bg-main)",
                                color: isAdded(type, zone) ? "white" : "var(--text-primary)",
                                border: `1.5px solid ${isAdded(type, zone) ? "var(--primary)" : "var(--border)"}`,
                                fontWeight: isAdded(type, zone) ? 600 : 400,
                              }}>
                              {isAdded(type, zone) ? "✓ " : ""}{zone}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* AUTRES */}
                {tab === "autre" && (
                  <div>
                    <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, marginBottom: 16, color: "var(--text-primary)" }}>
                      Autres Examens Complémentaires
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {autresExamens.map((item) => (
                        <button key={item} onClick={() => toggleExam(item, "autre")}
                          className="p-4 rounded-xl text-left transition-all"
                          style={{
                            background: isAdded(item) ? "var(--primary-light)" : "var(--bg-main)",
                            border: `1.5px solid ${isAdded(item) ? "var(--primary)" : "var(--border)"}`,
                          }}>
                          <Zap size={16} color={isAdded(item) ? "var(--primary)" : "var(--text-muted)"} />
                          <p style={{ fontFamily: "var(--font-display)", fontWeight: isAdded(item) ? 700 : 500, fontSize: 13, color: isAdded(item) ? "var(--primary)" : "var(--text-primary)", marginTop: 6 }}>
                            {isAdded(item) ? "✓ " : ""}{item}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Summary panel */}
              <div className="space-y-4">
                <div className="card-dpi p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, color: "var(--text-primary)" }}>
                      Examens sélectionnés ({lines.length})
                    </h3>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" style={{ accentColor: "var(--primary)" }}
                        checked={globalUrg} onChange={(e) => setGlobalUrg(e.target.checked)} />
                      <span style={{ fontSize: 12, fontWeight: 700, color: "#ef4444" }}>URGENT</span>
                    </label>
                  </div>
                  {lines.length === 0 ? (
                    <div className="text-center py-8">
                      <FlaskConical size={28} color="var(--text-muted)" style={{ margin: "0 auto 8px" }} />
                      <p style={{ fontSize: 13, color: "var(--text-muted)" }}>Aucun examen sélectionné</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {lines.map((l) => (
                        <div key={l.id} className="flex items-center gap-2 p-2 rounded-lg"
                          style={{ background: l.urgence ? "#fff7ed" : "var(--bg-main)", border: `1px solid ${l.urgence ? "#fed7aa" : "var(--border)"}` }}>
                          <div className="flex-1">
                            <p style={{ fontSize: 12, fontWeight: 600, color: "var(--text-primary)" }}>
                              {l.label} {l.detail && <span style={{ color: "var(--primary)" }}>· {l.detail}</span>}
                            </p>
                            {l.urgence && <span style={{ fontSize: 10, color: "#ef4444", fontWeight: 700 }}>⚡ URGENT</span>}
                          </div>
                          <button onClick={() => toggleUrgence(l.id)} title="Marquer urgent">
                            <Zap size={12} color={l.urgence ? "#ef4444" : "var(--text-muted)"} />
                          </button>
                          <button onClick={() => setLines((prev) => prev.filter((x) => x.id !== l.id))}>
                            <X size={12} color="var(--text-muted)" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="card-dpi p-5">
                  <label className="label-dpi">Motif de prescription</label>
                  <textarea className="input-dpi" rows={3}
                    placeholder="Indication clinique..."
                    value={motif} onChange={(e) => setMotif(e.target.value)} />
                </div>

                <button className="btn-primary w-full flex items-center justify-center gap-2"
                  onClick={() => { setSaved(true); setTimeout(() => { setSaved(false); setView("history"); }, 1500); }}>
                  <Save size={16} />
                  {saved ? "✓ Validée !" : "Valider la prescription"}
                </button>
              </div>
            </div>

            {/* Bottom cancel bar */}
            <div className="flex justify-between p-5 rounded-2xl"
              style={{ background: "white", border: "1px solid var(--border)" }}>
              <button onClick={() => setView("history")}
                className="px-5 py-2 rounded-xl text-sm font-semibold"
                style={{ background: "var(--bg-main)", color: "var(--text-secondary)", border: "1px solid var(--border)", fontFamily: "var(--font-display)" }}>
                Annuler
              </button>
              <button className="btn-accent">Enregistrer brouillon</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}