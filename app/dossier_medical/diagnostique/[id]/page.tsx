"use client";
// Route : app/dossier_medical/diagnostique/[id]/page.tsx
// Historique diagnostics d'un patient + nouveau diagnostic

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Topbar from "@/components/Topbar";
import {
  ChevronRight, ChevronDown, Plus, X, Save, Search,
  AlertTriangle, Calendar, FileText, ClipboardList,
} from "lucide-react";
import { patients } from "@/lib/patient";
import { diagnostiqueHistory } from "@/lib/history";

/* ── CIM-10 lookup ── */
const cim10Data = [
  { code: "I21", label: "Infarctus aigu du myocarde" },
  { code: "I50", label: "Insuffisance cardiaque" },
  { code: "J18", label: "Pneumopathie, sans précision" },
  { code: "E11", label: "Diabète sucré de type 2" },
  { code: "I10", label: "Hypertension artérielle essentielle" },
  { code: "J44", label: "Broncho-pneumopathie chronique obstructive" },
  { code: "K29", label: "Gastrite et duodénite" },
  { code: "M54", label: "Dorsalgie" },
  { code: "N18", label: "Insuffisance rénale chronique" },
  { code: "F32", label: "Épisode dépressif" },
  { code: "G43", label: "Migraine" },
  { code: "A15", label: "Tuberculose respiratoire" },
  { code: "B50", label: "Paludisme à Plasmodium falciparum" },
  { code: "K37", label: "Appendicite aiguë" },
  { code: "D50", label: "Anémie ferriprive" },
  { code: "S82", label: "Fracture de la jambe" },
];

const graviteLevels = [
  { label: "Légère",   color: "#10b981", bg: "#d1fae5" },
  { label: "Modérée",  color: "#f59e0b", bg: "#fef3c7" },
  { label: "Sévère",   color: "#ef4444", bg: "#fee2e2" },
  { label: "Critique", color: "#7c3aed", bg: "#ede9fe" },
] as const;

const triageOptions = [
  { label: "Vert",   desc: "Non urgent",   color: "#10b981" },
  { label: "Orange", desc: "Urgent",        color: "#f59e0b" },
  { label: "Rouge",  desc: "Très urgent",   color: "#ef4444" },
] as const;

const statutBadge: Record<string, { bg: string; color: string }> = {
  "Validé":      { bg: "#d1fae5", color: "#065f46" },
  "En révision": { bg: "#fef3c7", color: "#92400e" },
  "Brouillon":   { bg: "#f1f5f9", color: "#475569" },
};

const graviteBadge: Record<string, { bg: string; color: string }> = {
  Légère:   { bg: "#d1fae5", color: "#065f46" },
  Modérée:  { bg: "#fef3c7", color: "#92400e" },
  Sévère:   { bg: "#fee2e2", color: "#991b1b" },
  Critique: { bg: "#ede9fe", color: "#6d28d9" },
};

export default function DiagnostiquePatientPage() {
  const { id } = useParams<{ id: string }>();
  const patient  = patients.find((p) => p.id === id);
  const history  = diagnostiqueHistory[id] ?? [];

  const [view, setView] = useState<"history" | "new">("history");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  /* form state */
  const [search, setSearch]         = useState("");
  const [showDrop, setShowDrop]     = useState(false);
  const [diagPrincipal, setDiagPrincipal] = useState<{ code: string; label: string } | null>(null);
  const [diagAssocies, setDiagAssocies]   = useState<{ code: string; label: string }[]>([]);
  const [diagDiff, setDiagDiff]           = useState<string[]>([""]);
  const [gravite, setGravite]             = useState<string>("Modérée");
  const [triage, setTriage]               = useState<string>("Orange");
  const [notes, setNotes]                 = useState("");
  const [saved, setSaved]                 = useState(false);

  if (!patient) return (
    <div className="p-8 text-center">
      <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18 }}>Patient introuvable</p>
      <Link href="/dossier_medical/diagnostique">
        <button className="btn-primary mt-4">← Retour</button>
      </Link>
    </div>
  );

  const filtered = cim10Data.filter(
    (d) => d.code.toLowerCase().includes(search.toLowerCase()) ||
           d.label.toLowerCase().includes(search.toLowerCase())
  );

  const addAssoc = (d: { code: string; label: string }) => {
    if (!diagAssocies.find((a) => a.code === d.code) && d.code !== diagPrincipal?.code) {
      setDiagAssocies((prev) => [...prev, d]);
    }
  };

  /* ─── render ─── */
  return (
    <div>
      <Topbar title="Diagnostique" subtitle={`${patient.nom} ${patient.prenom} · ${patient.id}`} />
      <div className="p-8">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-6" style={{ color: "var(--text-muted)" }}>
          <Link href="/dossier_medical/diagnostique">
            <span className="cursor-pointer hover:text-teal-600 transition-colors">Diagnostique</span>
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
                <span className="px-2 py-0.5 rounded-lg text-xs font-semibold"
                  style={{ background: "#fff7ed", color: "#c2410c" }}>
                   {patient.allergies.join(", ")}
                </span>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setView("history")}
              className="px-4 py-2 rounded-xl text-sm font-semibold transition-all"
              style={{
                background: view === "history" ? "var(--primary)" : "var(--bg-main)",
                color: view === "history" ? "white" : "var(--text-secondary)",
                border: `1.5px solid ${view === "history" ? "var(--primary)" : "var(--border)"}`,
                fontFamily: "var(--font-display)",
              }}>
              Historique ({history.length})
            </button>
            <button onClick={() => setView("new")} className="btn-primary flex items-center gap-2">
              <Plus size={16} /> Nouveau diagnostic
            </button>
          </div>
        </div>

        {/* ── HISTORY ── */}
        {view === "history" && (
          <div className="space-y-3">
            {history.length === 0 ? (
              <div className="text-center py-16 card-dpi">
                <ClipboardList size={40} color="var(--text-muted)" style={{ margin: "0 auto 12px" }} />
                <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--text-secondary)" }}>
                  Aucun diagnostic enregistré
                </p>
                <button onClick={() => setView("new")} className="btn-primary mt-4">Créer le premier diagnostic</button>
              </div>
            ) : history.map((diag, idx) => {
              const isOpen = expandedId === diag.id;
              const sc = statutBadge[diag.statut] ?? statutBadge["Brouillon"];
              const gc = graviteBadge[diag.gravite] ?? graviteBadge["Modérée"];
              const triageColor = diag.triage === "Rouge" ? "#ef4444" : diag.triage === "Orange" ? "#f59e0b" : "#10b981";

              return (
                <div key={diag.id} className="card-dpi overflow-hidden">
                  <div className="flex items-center gap-4 p-5 cursor-pointer"
                    onClick={() => setExpandedId(isOpen ? null : diag.id)}>
                    {/* N° */}
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                      style={{ background: "var(--primary)", fontFamily: "var(--font-display)" }}>
                      {history.length - idx}
                    </div>
                    {/* Date */}
                    <div className="flex items-center gap-2" style={{ minWidth: 130 }}>
                      <Calendar size={14} color="var(--primary)" />
                      <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>
                        {new Date(diag.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                      </span>
                    </div>
                    {/* Diag principal */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-xs font-bold"
                          style={{ background: "var(--primary-light)", color: "var(--primary)" }}>
                          {diag.diagPrincipal.code}
                        </span>
                        <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14, color: "var(--text-primary)" }}>
                          {diag.diagPrincipal.label}
                        </p>
                      </div>
                      <p style={{ fontSize: 12, color: "var(--text-muted)" }}>{diag.medecin}</p>
                    </div>
                    {/* Triage dot */}
                    {/* <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ background: triageColor }} />
                      <span style={{ fontSize: 12, fontWeight: 600, color: triageColor }}>{diag.triage}</span>
                    </div> */}
                    {/* Gravité */}
                    <div className="px-3 py-1 rounded-xl text-xs font-bold"
                      style={{ background: gc.bg, color: gc.color }}>{diag.gravite}</div>
                    {/* Statut */}
                    {/* <div className="px-3 py-1 rounded-xl text-xs font-bold"
                      style={{ background: sc.bg, color: sc.color }}>{diag.statut}</div> */}
                    <ChevronDown size={18} color="var(--text-muted)"
                      style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
                  </div>

                  {/* Expanded */}
                  {isOpen && (
                    <div className="px-5 pb-5 border-t" style={{ borderColor: "var(--border)" }}>
                      <div className="mt-4 grid grid-cols-3 gap-4">
                        {/* Diag associés */}
                        <div className="p-4 rounded-2xl" style={{ background: "var(--bg-main)" }}>
                          <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 12, color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>
                            Diagnostics associés
                          </p>
                          {diag.diagAssocies.length === 0
                            ? <p style={{ fontSize: 13, color: "var(--text-muted)" }}>Aucun</p>
                            : diag.diagAssocies.map((a) => (
                              <div key={a.code} className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-bold px-1.5 py-0.5 rounded"
                                  style={{ background: "var(--primary-light)", color: "var(--primary)" }}>{a.code}</span>
                                <span style={{ fontSize: 13, color: "var(--text-primary)" }}>{a.label}</span>
                              </div>
                            ))}
                        </div>
                        {/* Diag diff */}
                        <div className="p-4 rounded-2xl" style={{ background: "var(--bg-main)" }}>
                          <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 12, color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>
                            Diagnostic différentiel
                          </p>
                          {diag.diagDiff.length === 0
                            ? <p style={{ fontSize: 13, color: "var(--text-muted)" }}>Aucun</p>
                            : diag.diagDiff.map((d, i) => (
                              <p key={i} style={{ fontSize: 13, color: "var(--text-primary)", marginBottom: 4 }}>
                                {i + 1}. {d}
                              </p>
                            ))}
                        </div>
                        {/* Notes */}
                        <div className="p-4 rounded-2xl" style={{ background: "var(--bg-main)" }}>
                          <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 12, color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>
                            Notes cliniques
                          </p>
                          <p style={{ fontSize: 13, color: "var(--text-primary)", lineHeight: 1.6 }}>{diag.notes}</p>
                        </div>
                      </div>
                      <div className="flex justify-end mt-4 gap-2">
                        <button className="px-4 py-2 rounded-xl text-sm font-semibold"
                          style={{ background: "var(--primary-light)", color: "var(--primary)", fontFamily: "var(--font-display)" }}>
                          Voir le CR complet
                        </button>
                        <button onClick={() => setView("new")} className="btn-primary text-sm">
                          Nouveau diagnostic
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ── NEW DIAGNOSTIC ── */}
        {view === "new" && (
          <div className="space-y-6">

            {/* Diag principal */}
            <div className="card-dpi p-6">
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, marginBottom: 16, color: "var(--text-primary)" }}>
                Diagnostic Principal (CIM-10)
              </h3>
              {diagPrincipal ? (
                <div className="flex items-center gap-4 p-4 rounded-2xl"
                  style={{ background: "var(--primary-light)", border: "2px solid var(--primary)" }}>
                  <div className="px-3 py-1 rounded-lg" style={{ background: "var(--primary)" }}>
                    <span style={{ color: "white", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14 }}>
                      {diagPrincipal.code}
                    </span>
                  </div>
                  <span style={{ flex: 1, fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 15, color: "var(--text-primary)" }}>
                    {diagPrincipal.label}
                  </span>
                  <button onClick={() => setDiagPrincipal(null)}
                    className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "white" }}>
                    <X size={14} color="var(--primary)" />
                  </button>
                </div>
              ) : (
                <div className="relative">
                  <Search size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                  <input className="input-dpi" style={{ paddingLeft: 40 }}
                    placeholder="Rechercher par code CIM-10 ou libellé..."
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); setShowDrop(true); }}
                    onFocus={() => setShowDrop(true)} />
                  {showDrop && search && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-xl z-10"
                      style={{ border: "1px solid var(--border)", maxHeight: 240, overflowY: "auto" }}>
                      {filtered.map((d) => (
                        <div key={d.code}
                          onClick={() => { setDiagPrincipal(d); setShowDrop(false); setSearch(""); }}
                          className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-teal-50 transition-colors">
                          <span className="px-2 py-0.5 rounded text-xs font-bold"
                            style={{ background: "var(--primary-light)", color: "var(--primary)" }}>{d.code}</span>
                          <span style={{ fontSize: 14, color: "var(--text-primary)" }}>{d.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Diag associés */}
              <div className="card-dpi p-6">
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, marginBottom: 16, color: "var(--text-primary)" }}>
                  Diagnostics Associés / Comorbidités
                </h3>
                <div className="space-y-2 mb-4">
                  {diagAssocies.map((d) => (
                    <div key={d.code} className="flex items-center gap-3 p-3 rounded-xl"
                      style={{ background: "var(--bg-main)", border: "1px solid var(--border)" }}>
                      <span className="px-2 py-0.5 rounded text-xs font-bold"
                        style={{ background: "var(--primary-light)", color: "var(--primary)" }}>{d.code}</span>
                      <span style={{ flex: 1, fontSize: 13, color: "var(--text-primary)" }}>{d.label}</span>
                      <button onClick={() => setDiagAssocies((prev) => prev.filter((a) => a.code !== d.code))}>
                        <X size={14} color="var(--text-muted)" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {cim10Data.slice(0, 8).map((d) => (
                    <button key={d.code} onClick={() => addAssoc(d)}
                      disabled={!!diagAssocies.find((a) => a.code === d.code) || diagPrincipal?.code === d.code}
                      className="flex items-center gap-1.5 px-2 py-2 rounded-xl text-left text-xs transition-all disabled:opacity-40"
                      style={{ background: "var(--primary-light)", border: "1px dashed var(--primary)", color: "var(--primary)", fontWeight: 600 }}>
                      <Plus size={12} />{d.code}
                    </button>
                  ))}
                </div>
              </div>

              {/* Diag diff */}
              <div className="card-dpi p-6">
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, marginBottom: 16, color: "var(--text-primary)" }}>
                  Diagnostic Différentiel
                </h3>
                <div className="space-y-3">
                  {diagDiff.map((d, idx) => (
                    <div key={idx} className="flex gap-2">
                      <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14, color: "var(--primary)", paddingTop: 10, minWidth: 20 }}>
                        {idx + 1}.
                      </span>
                      <input className="input-dpi flex-1" placeholder={`Diagnostic différentiel ${idx + 1}...`}
                        value={d} onChange={(e) => setDiagDiff((prev) => prev.map((x, i) => i === idx ? e.target.value : x))} />
                      {diagDiff.length > 1 && (
                        <button onClick={() => setDiagDiff((prev) => prev.filter((_, i) => i !== idx))}>
                          <X size={16} color="var(--text-muted)" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button onClick={() => setDiagDiff((prev) => [...prev, ""])}
                  className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl"
                  style={{ border: "1.5px dashed var(--primary)", color: "var(--primary)", fontWeight: 600, fontSize: 13 }}>
                  <Plus size={16} /> Ajouter
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Gravité */}
              <div className="card-dpi p-6">
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, marginBottom: 16, color: "var(--text-primary)" }}>
                  Échelle de Gravité
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {graviteLevels.map((g) => (
                    <button key={g.label} onClick={() => setGravite(g.label)}
                      className="p-4 rounded-2xl text-left transition-all"
                      style={{ background: gravite === g.label ? g.bg : "var(--bg-main)", border: `2px solid ${gravite === g.label ? g.color : "var(--border)"}` }}>
                      <div className="w-4 h-4 rounded-full mb-2" style={{ background: g.color }} />
                      <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14, color: g.color }}>
                        {g.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Triage */}
              <div className="card-dpi p-6">
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, marginBottom: 16, color: "var(--text-primary)" }}>
                  Triage Urgences
                </h3>
                <div className="flex gap-4">
                  {triageOptions.map((t) => (
                    <button key={t.label} onClick={() => setTriage(t.label)}
                      className="flex-1 p-4 rounded-2xl transition-all"
                      style={{ background: triage === t.label ? t.color + "22" : "var(--bg-main)", border: `2px solid ${triage === t.label ? t.color : "var(--border)"}` }}>
                      <div className="w-8 h-8 rounded-full mx-auto mb-2" style={{ background: t.color }} />
                      <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: t.color, textAlign: "center" }}>{t.label}</p>
                      <p style={{ fontSize: 12, color: "var(--text-secondary)", textAlign: "center" }}>{t.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="card-dpi p-6">
              <label className="label-dpi">Notes cliniques</label>
              <textarea className="input-dpi" rows={4}
                placeholder="Observations cliniques, éléments en faveur du diagnostic..."
                value={notes} onChange={(e) => setNotes(e.target.value)} style={{ resize: "vertical" }} />
            </div>

            {/* Save bar */}
            <div className="flex items-center justify-between p-5 rounded-2xl"
              style={{ background: "white", border: "1px solid var(--border)" }}>
              <button onClick={() => setView("history")}
                className="px-5 py-2 rounded-xl text-sm font-semibold"
                style={{ background: "var(--bg-main)", color: "var(--text-secondary)", border: "1px solid var(--border)", fontFamily: "var(--font-display)" }}>
                Annuler
              </button>
              <div className="flex gap-3">
                <button className="btn-accent">Enregistrer brouillon</button>
                <button className="btn-primary flex items-center gap-2"
                  onClick={() => { setSaved(true); setTimeout(() => { setSaved(false); setView("history"); }, 1500); }}>
                  <Save size={16} />
                  {saved ? "✓ Enregistré !" : "Valider le diagnostic"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}