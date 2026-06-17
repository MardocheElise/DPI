"use client";
import { useState } from "react";
import Topbar from "@/components/Topbar";
import { Plus, X, Target, Activity, Calendar, Clock, ChevronDown, Save, CheckCircle, HeartPulse } from "lucide-react";

const surveillanceItems = [
  { label: "Tension artérielle", freq: "2x/j" },
  { label: "Glycémie capillaire", freq: "3x/j" },
  { label: "Température", freq: "3x/j" },
  { label: "Poids", freq: "1x/j" },
  { label: "Diurèse", freq: "24h" },
  { label: "SpO2", freq: "Continue" },
  { label: "FC/Pouls", freq: "Continue" },
  { label: "Douleur EVA", freq: "4x/j" },
];

const protocolesPreconf = [
  { label: "Protocole HTA", color: "#3b82f6" },
  { label: "Protocole Diabète T2", color: "#8b5cf6" },
  { label: "Protocole Insuffisance cardiaque", color: "#ef4444" },
  { label: "Protocole Paludisme grave", color: "#10b981" },
  { label: "Soins palliatifs", color: "#6b7280" },
];

interface Objectif {
  id: string;
  text: string;
  echeance: string;
  done: boolean;
}

interface Surveillance {
  label: string;
  freq: string;
  active: boolean;
  custom?: string;
}

export default function PlanDeSoinsPage() {
  const [objectifs, setObjectifs] = useState<Objectif[]>([
    { id: "1", text: "Équilibrer la tension artérielle < 140/90 mmHg", echeance: "1 mois", done: false },
    { id: "2", text: "Réduire la glycémie à jeun < 1.26 g/L", echeance: "3 mois", done: false },
  ]);
  const [newObj, setNewObj] = useState("");
  const [newEcheance, setNewEcheance] = useState("1 mois");
  const [surveillances, setSurveillances] = useState<Surveillance[]>(
    surveillanceItems.map(s => ({ ...s, active: false }))
  );
  const [traitement, setTraitement] = useState("");
  const [examens, setExamens] = useState("");
  const [consultations, setConsultations] = useState("");
  const [palliatif, setPalliatif] = useState(false);

  const addObjectif = () => {
    if (!newObj.trim()) return;
    setObjectifs(prev => [...prev, { id: Date.now().toString(), text: newObj, echeance: newEcheance, done: false }]);
    setNewObj("");
  };

  const toggleSurveillance = (idx: number) => {
    setSurveillances(prev => prev.map((s, i) => i === idx ? { ...s, active: !s.active } : s));
  };

  const toggleObjectifDone = (id: string) => {
    setObjectifs(prev => prev.map(o => o.id === id ? { ...o, done: !o.done } : o));
  };

  return (
    <div>
      <Topbar title="Plan de Soins Médical" subtitle="Patient : Diallo Ibrahim · Dossier N° 2024-0087" />
      <div className="p-8 space-y-6">

        {/* Protocoles rapides */}
        <div className="card-dpi p-5">
          <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14, color: "var(--text-primary)", marginBottom: 12 }}>
            Protocoles Thérapeutiques Préconfigurés
          </p>
          <div className="flex gap-3 flex-wrap">
            {protocolesPreconf.map(p => (
              <button key={p.label} className="px-4 py-2 rounded-xl text-sm font-semibold transition-all"
                style={{ background: p.color + "18", color: p.color, border: `1.5px solid ${p.color}40`, fontFamily: "var(--font-display)" }}>
                + {p.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Objectifs thérapeutiques */}
          <div className="card-dpi p-6">
            <div className="flex items-center gap-2 mb-4">
              <Target size={18} color="var(--primary)" />
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, color: "var(--text-primary)" }}>
                Objectifs Thérapeutiques
              </h3>
            </div>

            <div className="space-y-3 mb-4">
              {objectifs.map(o => (
                <div key={o.id} className="flex items-start gap-3 p-3 rounded-xl transition-all"
                  style={{ background: o.done ? "var(--primary-light)" : "var(--bg-main)", border: `1.5px solid ${o.done ? "var(--primary)" : "var(--border)"}` }}>
                  <button onClick={() => toggleObjectifDone(o.id)} className="mt-0.5">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center"
                      style={{ background: o.done ? "var(--primary)" : "white", border: "2px solid var(--primary)" }}>
                      {o.done && <CheckCircle size={12} color="white" />}
                    </div>
                  </button>
                  <div className="flex-1">
                    <p style={{ fontSize: 14, color: o.done ? "var(--primary)" : "var(--text-primary)", fontWeight: 500, textDecoration: o.done ? "line-through" : "none" }}>
                      {o.text}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <Calendar size={11} color="var(--text-muted)" />
                      <span style={{ fontSize: 11, color: "var(--text-muted)" }}>Échéance : {o.echeance}</span>
                    </div>
                  </div>
                  <button onClick={() => setObjectifs(prev => prev.filter(x => x.id !== o.id))}>
                    <X size={14} color="var(--text-muted)" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input className="input-dpi flex-1" placeholder="Nouvel objectif..." value={newObj}
                onChange={e => setNewObj(e.target.value)}
                onKeyDown={e => e.key === "Enter" && addObjectif()} />
              <select className="input-dpi" style={{ width: "auto", minWidth: 100 }}
                value={newEcheance} onChange={e => setNewEcheance(e.target.value)}>
                {["1 semaine", "2 semaines", "1 mois", "3 mois", "6 mois"].map(d => <option key={d}>{d}</option>)}
              </select>
              <button onClick={addObjectif} className="btn-primary px-3">
                <Plus size={18} />
              </button>
            </div>
          </div>

          {/* Surveillance */}
          <div className="card-dpi p-6">
            <div className="flex items-center gap-2 mb-4">
              <Activity size={18} color="var(--primary)" />
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, color: "var(--text-primary)" }}>
                Plan de Surveillance
              </h3>
            </div>

            <div className="space-y-2">
              {surveillances.map((s, idx) => (
                <div key={s.label}
                  onClick={() => toggleSurveillance(idx)}
                  className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all"
                  style={{
                    background: s.active ? "var(--primary-light)" : "var(--bg-main)",
                    border: `1.5px solid ${s.active ? "var(--primary)" : "var(--border)"}`,
                  }}>
                  <div className="w-5 h-5 rounded-md flex items-center justify-center"
                    style={{ background: s.active ? "var(--primary)" : "white", border: "1.5px solid var(--primary)" }}>
                    {s.active && <span style={{ color: "white", fontSize: 11, fontWeight: 700 }}>✓</span>}
                  </div>
                  <span style={{ flex: 1, fontSize: 14, color: "var(--text-primary)", fontWeight: s.active ? 600 : 400 }}>
                    {s.label}
                  </span>
                  {s.active && (
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-lg" style={{ background: "var(--primary)", color: "white" }}>
                      <Clock size={11} />
                      <span style={{ fontSize: 11, fontWeight: 600 }}>{s.freq}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Plan traitement / examens / consultations */}
        <div className="grid grid-cols-3 gap-6">
          {[
            { label: "Plan de Traitement", placeholder: "Médicaments, dosages, durées... Intégrer les nouvelles prescriptions", value: traitement, onChange: setTraitement },
            { label: "Examens de Contrôle", placeholder: "Examens biologiques ou imagerie de suivi prévus...", value: examens, onChange: setExamens },
            { label: "Consultations de Suivi", placeholder: "Spécialistes à consulter, fréquence des rendez-vous...", value: consultations, onChange: setConsultations },
          ].map(field => (
            <div key={field.label} className="card-dpi p-5">
              <label className="label-dpi">{field.label}</label>
              <textarea className="input-dpi" rows={5} placeholder={field.placeholder}
                value={field.value} onChange={e => field.onChange(e.target.value)} style={{ resize: "vertical" }} />
            </div>
          ))}
        </div>

        {/* Soins palliatifs */}
        <div className="card-dpi p-5">
          <div className="flex items-center gap-3">
            <HeartPulse size={20} color={palliatif ? "#ef4444" : "var(--text-muted)"} />
            <div className="flex-1">
              <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, color: "var(--text-primary)" }}>
                Soins Palliatifs
              </p>
              <p style={{ fontSize: 13, color: "var(--text-muted)" }}>
                Activer si nécessaire — protocole de confort et de fin de vie
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={palliatif} onChange={e => setPalliatif(e.target.checked)} />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500" />
            </label>
          </div>
          {palliatif && (
            <div className="mt-4 p-4 rounded-xl" style={{ background: "#fee2e2", border: "1px solid #fca5a5" }}>
              <p style={{ fontSize: 13, color: "#991b1b", fontWeight: 600, marginBottom: 8 }}>
                ⚠️ Mode soins palliatifs activé — Protocole de confort engagé
              </p>
              <textarea className="input-dpi" rows={3} placeholder="Directives anticipées, souhaits du patient, mesures de confort..." />
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3">
          <button className="btn-accent">Enregistrer brouillon</button>
          <button className="btn-primary flex items-center gap-2">
            <Save size={16} /> Valider le plan de soins
          </button>
        </div>
      </div>
    </div>
  );
}
