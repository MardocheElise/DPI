"use client";
// Route : app/dossier_medical/prescription_medicaments/[id]/page.tsx
// Historique prescriptions médicaments + nouvelle prescription

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Topbar from "@/components/Topbar";
 
import {
  ChevronRight, ChevronDown, Plus, X, Save, Search,
  AlertTriangle, Shield, CheckCircle, Pill, Calendar,
} from "lucide-react";
import { patients } from "@/lib/patient";
import { prescriptionMedsHistory } from "@/lib/history";


const voies     = ["Orale", "Injectable IV", "Injectable IM", "Sous-cutanée", "Inhalée", "Rectale", "Transdermique", "Sublinguale"];
const frequences = ["1x/j", "2x/j", "3x/j", "4x/j", "Toutes les 6h", "Toutes les 8h", "Toutes les 12h", "Si besoin", "Continue"];
const durees    = ["3 jours", "5 jours", "7 jours", "10 jours", "14 jours", "1 mois", "3 mois", "Continu", "Si besoin", "Post-op"];

const medicamentsList = [
  { dci: "Amoxicilline",     commercial: "Clamoxyl",          classe: "Antibiotique",      formes: ["500mg cp", "1g cp", "250mg/5mL sus"] },
  { dci: "Paracétamol",      commercial: "Doliprane",         classe: "Antalgique",         formes: ["500mg cp", "1g cp", "250mg supp"] },
  { dci: "Ibuprofène",       commercial: "Brufen",            classe: "AINS",               formes: ["200mg cp", "400mg cp"] },
  { dci: "Metformine",       commercial: "Glucophage",        classe: "Antidiabétique",     formes: ["500mg cp", "850mg cp", "1000mg cp"] },
  { dci: "Amlodipine",       commercial: "Amlor",             classe: "Antihypertenseur",   formes: ["5mg cp", "10mg cp"] },
  { dci: "Atorvastatine",    commercial: "Tahor",             classe: "Hypolipémiant",      formes: ["10mg cp", "20mg cp", "40mg cp"] },
  { dci: "Oméprazole",       commercial: "Mopral",            classe: "IPP",                formes: ["20mg gél", "40mg gél"] },
  { dci: "Furosémide",       commercial: "Lasilix",           classe: "Diurétique",         formes: ["40mg cp", "20mg/2mL inj"] },
  { dci: "Artéméther",       commercial: "Coartem",           classe: "Antipaludique",      formes: ["20/120mg cp"] },
  { dci: "Morphine",         commercial: "Morphine Aguettant", classe: "Antalgique palier III", formes: ["10mg cp", "10mg/mL inj"] },
  { dci: "Sulfate de fer",   commercial: "Tardyferon",        classe: "Hématinique",        formes: ["80mg cp"] },
  { dci: "Insuline Glargine",commercial: "Lantus",            classe: "Insuline basale",    formes: ["100UI/mL stylo"] },
];

const interactions: Record<string, string> = {
  "Ibuprofène":  "⚠️ Interaction avec Amlodipine — surveiller la TA",
  "Metformine":  "⚠️ Contre-indication si IRC stade 4 (DFG < 30)",
  "Morphine":    "⚠️ Dépression respiratoire — scope continu requis",
};

const prescStatut: Record<string, { bg: string; color: string }> = {
  "En cours":  { bg: "#dbeafe", color: "#1e40af" },
  "Validée":   { bg: "#d1fae5", color: "#065f46" },
  "Terminée":  { bg: "#f1f5f9", color: "#475569" },
  "Suspendue": { bg: "#fee2e2", color: "#991b1b" },
};

interface MedLine {
  id: string; dci: string; commercial: string;
  forme: string; posologie: string; voie: string;
  frequence: string; duree: string; instructions: string;
  alerte?: string;
}

export default function PrescriptionMedsPatientPage() {
  const { id }   = useParams<{ id: string }>();
  const patient  = patients.find((p) => p.id === id);
  const history  = prescriptionMedsHistory[id] ?? [];

  const [view, setView]           = useState<"history" | "new">("history");
  const [expandedId, setExpanded] = useState<string | null>(null);

  /* form */
  const [search, setSearch]       = useState("");
  const [showDrop, setShowDrop]   = useState(false);
  const [lines, setLines]         = useState<MedLine[]>([]);
  const [current, setCurrent]     = useState<Partial<MedLine>>({});
  const [selectedMed, setSelected] = useState<typeof medicamentsList[0] | null>(null);
  const [saved, setSaved]         = useState(false);

  if (!patient) return (
    <div className="p-8 text-center">
      <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18 }}>Patient introuvable</p>
      <Link href="/dossier_medical/prescription_medicaments">
        <button className="btn-primary mt-4">← Retour</button>
      </Link>
    </div>
  );

  const filtered = medicamentsList.filter((m) =>
    m.dci.toLowerCase().includes(search.toLowerCase()) ||
    m.commercial.toLowerCase().includes(search.toLowerCase())
  );

  const selectMed = (m: typeof medicamentsList[0]) => {
    setSelected(m);
    setCurrent((c) => ({ ...c, dci: m.dci, commercial: m.commercial, forme: m.formes[0], alerte: interactions[m.dci] }));
    setSearch(`${m.dci} — ${m.commercial}`);
    setShowDrop(false);
  };

  const addLine = () => {
    if (!current.dci) return;
    setLines((prev) => [...prev, {
      id: Date.now().toString(),
      dci: current.dci!, commercial: current.commercial!,
      forme: current.forme || selectedMed?.formes[0] || "",
      posologie: current.posologie || "",
      voie: current.voie || "Orale",
      frequence: current.frequence || "1x/j",
      duree: current.duree || "7 jours",
      instructions: current.instructions || "",
      alerte: current.alerte,
    }]);
    setSelected(null); setCurrent({}); setSearch("");
  };

  return (
    <div>
      <Topbar title="Prescription Médicaments" subtitle={`${patient.nom} ${patient.prenom} · ${patient.id}`} />
      <div className="p-8">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-6" style={{ color: "var(--text-muted)" }}>
          <Link href="/dossier_medical/prescription_medicaments">
            <span className="cursor-pointer hover:text-teal-600 transition-colors">Prescription Médicaments</span>
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
              {patient.allergies.length > 0 && (
                <span className="px-2 py-0.5 rounded-lg text-xs font-semibold" style={{ background: "#fff7ed", color: "#c2410c" }}>
                  ⚠️ ALLERGIES : {patient.allergies.join(", ")}
                </span>
              )}
              {patient.contreIndications.length > 0 && (
                <span className="px-2 py-0.5 rounded-lg text-xs font-semibold" style={{ background: "#fee2e2", color: "#991b1b" }}>
                  🚫 CI : {patient.contreIndications.join(", ")}
                </span>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setView("history")}
              className="px-4 py-2 rounded-xl text-sm font-semibold transition-all"
              style={{ background: view === "history" ? "var(--primary)" : "var(--bg-main)", color: view === "history" ? "white" : "var(--text-secondary)", border: `1.5px solid ${view === "history" ? "var(--primary)" : "var(--border)"}`, fontFamily: "var(--font-display)" }}>
              Historique ({history.length})
            </button>
            <button onClick={() => setView("new")} className="btn-primary flex items-center gap-2">
              <Plus size={16} /> Nouvelle ordonnance
            </button>
          </div>
        </div>

        {/* ── HISTORY ── */}
        {view === "history" && (
          <div className="space-y-3">
            {history.length === 0 ? (
              <div className="text-center py-16 card-dpi">
                <Pill size={40} color="var(--text-muted)" style={{ margin: "0 auto 12px" }} />
                <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--text-secondary)" }}>Aucune ordonnance</p>
                <button onClick={() => setView("new")} className="btn-primary mt-4">Créer la première ordonnance</button>
              </div>
            ) : history.map((presc, idx) => {
              const isOpen = expandedId === presc.id;
              const sc = prescStatut[presc.statut] ?? prescStatut["Terminée"];
              return (
                <div key={presc.id} className="card-dpi overflow-hidden">
                  <div className="flex items-center gap-4 p-5 cursor-pointer"
                    onClick={() => setExpanded(isOpen ? null : presc.id)}>
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                      style={{ background: "var(--primary)", fontFamily: "var(--font-display)" }}>
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
                        {presc.medicaments.length} médicament{presc.medicaments.length > 1 ? "s" : ""} prescrits
                      </p>
                      <p style={{ fontSize: 12, color: "var(--text-muted)" }}>{presc.medecin}</p>
                    </div>
                    {/* Med pills preview */}
                    <div className="flex gap-1.5 flex-wrap" style={{ maxWidth: 300 }}>
                      {presc.medicaments.slice(0, 3).map((m, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-lg text-xs font-semibold"
                          style={{ background: "var(--primary-light)", color: "var(--primary)" }}>
                          {m.dci}
                        </span>
                      ))}
                      {presc.medicaments.length > 3 && (
                        <span className="px-2 py-0.5 rounded-lg text-xs font-semibold"
                          style={{ background: "var(--bg-main)", color: "var(--text-muted)" }}>
                          +{presc.medicaments.length - 3}
                        </span>
                      )}
                    </div>
                    <div className="px-3 py-1 rounded-xl text-xs font-bold"
                      style={{ background: sc.bg, color: sc.color, whiteSpace: "nowrap" }}>{presc.statut}</div>
                    <ChevronDown size={18} color="var(--text-muted)"
                      style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
                  </div>

                  {isOpen && (
                    <div className="px-5 pb-5 border-t" style={{ borderColor: "var(--border)" }}>
                      <div className="mt-4 space-y-2">
                        {presc.medicaments.map((m, i) => (
                          <div key={i} className="flex items-start gap-4 p-4 rounded-2xl"
                            style={{ background: "var(--bg-main)", border: "1px solid var(--border)" }}>
                            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                              style={{ background: "var(--primary)" }}>{i + 1}</div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14, color: "var(--text-primary)" }}>{m.dci}</span>
                                <span style={{ fontSize: 12, color: "var(--text-muted)" }}>({m.commercial})</span>
                              </div>
                              <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>
                                {m.forme} · {m.posologie} · {m.voie} · {m.frequence} · {m.duree}
                              </p>
                              {m.instructions && (
                                <p style={{ fontSize: 12, color: "var(--text-muted)", fontStyle: "italic", marginTop: 2 }}>ℹ️ {m.instructions}</p>
                              )}
                            </div>
                          </div>
                        ))}
                        {presc.notes && (
                          <div className="p-4 rounded-xl mt-2" style={{ background: "var(--primary-light)", border: "1px solid var(--primary-muted)" }}>
                            <p style={{ fontSize: 13, color: "var(--primary)", fontWeight: 500 }}>📋 {presc.notes}</p>
                          </div>
                        )}
                      </div>
                      <div className="flex justify-end mt-4 gap-2">
                        <button className="px-4 py-2 rounded-xl text-sm font-semibold"
                          style={{ background: "var(--primary-light)", color: "var(--primary)", fontFamily: "var(--font-display)" }}>
                          Imprimer l&apos;ordonnance
                        </button>
                        <button onClick={() => setView("new")} className="btn-primary text-sm">Nouvelle ordonnance</button>
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

            {/* Alert vidal */}
            <div className="flex items-center gap-3 p-4 rounded-2xl"
              style={{ background: "#fff7ed", border: "1.5px solid #fed7aa" }}>
              <Shield size={20} color="#f97316" />
              <div className="flex-1">
                <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14, color: "#c2410c" }}>
                  Vérification automatique des interactions
                </p>
                <p style={{ fontSize: 13, color: "#9a3412" }}>
                  Interactions, contre-indications et doses pédiatriques vérifiées en temps réel — Base Vidal / Claude Bernard
                </p>
              </div>
              <CheckCircle size={16} color="#10b981" />
            </div>

            {/* Add form */}
            <div className="card-dpi p-6">
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, marginBottom: 20, color: "var(--text-primary)" }}>
                Ajouter un Médicament
              </h3>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="col-span-2 relative">
                  <label className="label-dpi">Médicament (DCI / Commercial)</label>
                  <div className="relative">
                    <Search size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                    <input className="input-dpi" style={{ paddingLeft: 40 }}
                      placeholder="Rechercher DCI ou commercial..."
                      value={search}
                      onChange={(e) => { setSearch(e.target.value); setShowDrop(true); }}
                      onFocus={() => setShowDrop(true)} />
                  </div>
                  {showDrop && search && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-xl z-10"
                      style={{ border: "1px solid var(--border)", maxHeight: 240, overflowY: "auto" }}>
                      {filtered.map((m) => (
                        <div key={m.dci} onClick={() => selectMed(m)}
                          className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-teal-50 transition-colors">
                          <Pill size={16} color="var(--primary)" />
                          <div>
                            <p style={{ fontWeight: 600, fontSize: 14, color: "var(--text-primary)" }}>{m.dci}</p>
                            <p style={{ fontSize: 12, color: "var(--text-muted)" }}>{m.commercial} · {m.classe}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div>
                  <label className="label-dpi">Forme</label>
                  <select className="input-dpi" value={current.forme || ""}
                    onChange={(e) => setCurrent((c) => ({ ...c, forme: e.target.value }))}>
                    <option value="">Choisir...</option>
                    {selectedMed?.formes.map((f) => <option key={f}>{f}</option>)}
                  </select>
                </div>
              </div>

              {current.alerte && (
                <div className="flex items-center gap-2 p-3 rounded-xl mb-4"
                  style={{ background: "#fff7ed", border: "1.5px solid #fed7aa" }}>
                  <AlertTriangle size={16} color="#f97316" />
                  <span style={{ fontSize: 13, color: "#c2410c", fontWeight: 500 }}>{current.alerte}</span>
                </div>
              )}

              <div className="grid grid-cols-4 gap-4 mb-4">
                <div>
                  <label className="label-dpi">Posologie</label>
                  <input className="input-dpi" placeholder="Ex: 500mg"
                    value={current.posologie || ""}
                    onChange={(e) => setCurrent((c) => ({ ...c, posologie: e.target.value }))} />
                </div>
                <div>
                  <label className="label-dpi">Voie</label>
                  <select className="input-dpi" value={current.voie || "Orale"}
                    onChange={(e) => setCurrent((c) => ({ ...c, voie: e.target.value }))}>
                    {voies.map((v) => <option key={v}>{v}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label-dpi">Fréquence</label>
                  <select className="input-dpi" value={current.frequence || "1x/j"}
                    onChange={(e) => setCurrent((c) => ({ ...c, frequence: e.target.value }))}>
                    {frequences.map((f) => <option key={f}>{f}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label-dpi">Durée</label>
                  <select className="input-dpi" value={current.duree || "7 jours"}
                    onChange={(e) => setCurrent((c) => ({ ...c, duree: e.target.value }))}>
                    {durees.map((d) => <option key={d}>{d}</option>)}
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label className="label-dpi">Instructions particulières</label>
                <input className="input-dpi" placeholder="Ex: Prendre pendant les repas..."
                  value={current.instructions || ""}
                  onChange={(e) => setCurrent((c) => ({ ...c, instructions: e.target.value }))} />
              </div>

              <button onClick={addLine} className="btn-primary flex items-center gap-2">
                <Plus size={16} /> Ajouter à l&apos;ordonnance
              </button>
            </div>

            {/* Ordonnance en cours */}
            {lines.length > 0 && (
              <div className="card-dpi p-6">
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, marginBottom: 16, color: "var(--text-primary)" }}>
                  Ordonnance ({lines.length} médicament{lines.length > 1 ? "s" : ""})
                </h3>
                <div className="space-y-3">
                  {lines.map((line, idx) => (
                    <div key={line.id} className="flex items-start gap-4 p-4 rounded-2xl"
                      style={{ background: "var(--bg-main)", border: "1.5px solid var(--border)" }}>
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                        style={{ background: "var(--primary)" }}>{idx + 1}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14, color: "var(--text-primary)" }}>{line.dci}</span>
                          <span style={{ fontSize: 12, color: "var(--text-muted)" }}>({line.commercial})</span>
                          {line.alerte && <AlertTriangle size={14} color="#f97316" />}
                        </div>
                        <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>
                          {line.forme} · {line.posologie} · {line.voie} · {line.frequence} · {line.duree}
                        </p>
                        {line.instructions && (
                          <p style={{ fontSize: 12, color: "var(--text-muted)", fontStyle: "italic" }}>ℹ️ {line.instructions}</p>
                        )}
                      </div>
                      <button onClick={() => setLines((prev) => prev.filter((l) => l.id !== line.id))}>
                        <X size={16} color="var(--text-muted)" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Save bar */}
            <div className="flex items-center justify-between p-5 rounded-2xl"
              style={{ background: "white", border: "1px solid var(--border)" }}>
              <button onClick={() => setView("history")}
                className="px-5 py-2 rounded-xl text-sm font-semibold"
                style={{ background: "var(--bg-main)", color: "var(--text-secondary)", border: "1px solid var(--border)", fontFamily: "var(--font-display)" }}>
                Annuler
              </button>
              <div className="flex gap-3">
                <button className="btn-accent">Aperçu ordonnance</button>
                <button className="btn-primary flex items-center gap-2"
                  onClick={() => { setSaved(true); setTimeout(() => { setSaved(false); setView("history"); }, 1500); }}>
                  <Save size={16} />
                  {saved ? "✓ Validée !" : "Valider l'ordonnance"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}