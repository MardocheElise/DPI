// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";
// import { useState } from "react";
// import Topbar from "@/components/Topbar";
// import { Plus, X, FlaskConical, Scan, Zap, Clock, AlertCircle, Save, CheckCircle } from "lucide-react";

// const biologie = {
//   "Hématologie": [
//     "NFS (Numération Formule Sanguine)", "VS (Vitesse de Sédimentation)", "TP/INR", "TCA",
//     "Groupe sanguin + Rhésus", "Frottis sanguin", "Réticulocytes"
//   ],
//   "Biochimie": [
//     "Glycémie à jeun", "HbA1c", "Urée", "Créatinine", "Ionogramme (Na, K, Cl, HCO3)",
//     "Bilan hépatique (ASAT, ALAT, GGT, PAL)", "Bilirubine totale/directe",
//     "Acide urique", "Cholestérol total", "Triglycérides", "HDL/LDL"
//   ],
//   "Infectious": [
//     "CRP (Protéine C Réactive)", "Procalcitonine", "Sérologie VIH", "Sérologie Hépatite B",
//     "Sérologie Hépatite C", "Goutte épaisse + Frottis (Paludisme)", "ECBU (Examen Cyto-Bactériologique Urinaire)"
//   ],
//   "Hormones": [
//     "TSH", "T3/T4 libre", "FSH/LH", "Cortisol", "PSA total/libre", "β-HCG"
//   ],
// };

// const imagerie = [
//   { type: "Radiographie", zones: ["Thorax", "Abdomen sans préparation", "Rachis cervical", "Rachis lombaire", "Membre supérieur", "Membre inférieur", "Crâne", "Bassin"] },
//   { type: "Échographie", zones: ["Abdominale", "Pelvienne", "Cardiaque (ETT)", "Thyroïde", "Membre", "Obstétricale", "Doppler vasculaire"] },
//   { type: "Scanner (TDM)", zones: ["Cérébral", "Thoracique", "Abdomino-pelvien", "Thoraco-abdomino-pelvien", "Membres", "Rachis"] },
//   { type: "IRM", zones: ["Cérébrale", "Rachis cervical", "Rachis lombaire", "Abdominale", "Pelvienne", "Articulaire", "Cardiaque"] },
// ];

// const autresExamens = ["ECG (12 dérivations)", "Holter ECG 24h", "EFR (Épreuves Fonctionnelles Respiratoires)", "Fibroscopie gastrique", "Coloscopie", "Biopsie"];

// interface ExamItem {
//   id: string;
//   label: string;
//   type: "biologie" | "imagerie" | "autre";
//   detail?: string;
//   urgence: boolean;
//   delai?: string;
//   contraste?: boolean;
// }

// export default function PrescriptionExamenPage() {
//   const [tab, setTab] = useState<"biologie" | "imagerie" | "autre">("biologie");
//   const [examens, setExamens] = useState<ExamItem[]>([]);
//   const [selectedImag, setSelectedImag] = useState<{ type: string; zone: string } | null>(null);
//   const [globalUrgence, setGlobalUrgence] = useState(false);

//   const addExam = (label: string, type: "biologie" | "imagerie" | "autre", detail?: string) => {
//     if (examens.find(e => e.label === label && e.detail === detail)) return;
//     setExamens(prev => [...prev, {
//       id: Date.now().toString(), label, type, detail, urgence: globalUrgence
//     }]);
//   };

//   const toggleUrgence = (id: string) => {
//     setExamens(prev => prev.map(e => e.id === id ? { ...e, urgence: !e.urgence } : e));
//   };

//   const removeExam = (id: string) => {
//     setExamens(prev => prev.filter(e => e.id !== id));
//   };

//   return (
//     <div>
//       <Topbar title="Prescription Examens" subtitle="Patient : Diallo Ibrahim · Dossier N° 2024-0087" />
//       <div className="p-8 space-y-6">

//         {/* Tab selector */}
//         <div className="grid grid-cols-3 gap-4">
//           {([
//             { id: "biologie", label: "Biologie Médicale", icon: FlaskConical, desc: "Analyses sanguines, urinaires..." },
//             { id: "imagerie", label: "Imagerie Médicale", icon: Scan, desc: "Radio, Echo, Scanner, IRM..." },
//             { id: "autre", label: "Autres Examens", icon: Zap, desc: "ECG, EFR, endoscopies..." },
//           ] as { id: "biologie" | "imagerie" | "autre"; label: string; icon: any; desc: string }[]).map(t => (
//             <button key={t.id} onClick={() => setTab(t.id)}
//               className="p-5 rounded-2xl text-left transition-all"
//               style={{
//                 background: tab === t.id ? "var(--primary)" : "white",
//                 border: `2px solid ${tab === t.id ? "var(--primary)" : "var(--border)"}`,
//                 boxShadow: tab === t.id ? "0 4px 20px rgba(13,148,136,0.25)" : "none",
//               }}>
//               <t.icon size={22} color={tab === t.id ? "white" : "var(--primary)"} />
//               <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, color: tab === t.id ? "var(--primary)" : "var(--text-primary)", marginTop: 8 }}>
//                 {t.label}
//               </p>
//               <p style={{ fontSize: 12, color: tab === t.id ? "rgba(255,255,255,0.7)" : "var(--text-muted)" }}>{t.desc}</p>
//             </button>
//           ))}
//         </div>

//         <div className="grid grid-cols-3 gap-6">
//           {/* Left panel - selector */}
//           <div className="col-span-2 card-dpi p-6">
//             {tab === "biologie" && (
//               <div>
//                 <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, marginBottom: 16, color: "var(--text-primary)" }}>
//                   Sélection des Examens Biologiques
//                 </h3>
//                 {Object.entries(biologie).map(([cat, items]) => (
//                   <div key={cat} className="mb-6">
//                     <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 13, color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 10 }}>
//                       {cat}
//                     </p>
//                     <div className="flex flex-wrap gap-2">
//                       {items.map(item => {
//                         const isAdded = examens.some(e => e.label === item);
//                         return (
//                           <button key={item} onClick={() => isAdded ? removeExam(examens.find(e => e.label === item)!.id) : addExam(item, "biologie")}
//                             className="px-3 py-2 rounded-xl text-sm transition-all"
//                             style={{
//                               background: isAdded ? "var(--primary)" : "var(--bg-main)",
//                               color: isAdded ? "red" : "var(--text-primary)",
//                               border: `1.5px solid ${isAdded ? "var(--primary)" : "var(--border)"}`,
//                               fontWeight: isAdded ? 600 : 400,
//                             }}>
//                             {isAdded ? "✓ " : ""}{item}
//                           </button>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {tab === "imagerie" && (
//               <div>
//                 <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, marginBottom: 16, color: "var(--text-primary)" }}>
//                   Sélection de l&apos;Imagerie Médicale
//                 </h3>
//                 {imagerie.map(({ type, zones }) => (
//                   <div key={type} className="mb-6">
//                     <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 13, color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 10 }}>
//                       {type}
//                     </p>
//                     <div className="flex flex-wrap gap-2">
//                       {zones.map(zone => {
//                         const isAdded = examens.some(e => e.label === type && e.detail === zone);
//                         return (
//                           <button key={zone}
//                             onClick={() => isAdded
//                               ? removeExam(examens.find(e => e.label === type && e.detail === zone)!.id)
//                               : addExam(type, "imagerie", zone)
//                             }
//                             className="px-3 py-2 rounded-xl text-sm transition-all"
//                             style={{
//                               background: isAdded ? "var(--primary)" : "var(--bg-main)",
//                               color: isAdded ? "red" : "var(--text-primary)",
//                               border: `1.5px solid ${isAdded ? "var(--primary)" : "var(--border)"}`,
//                               fontWeight: isAdded ? 600 : 400,
//                             }}>
//                             {isAdded ? "✓ " : ""}{zone}
//                           </button>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {tab === "autre" && (
//               <div>
//                 <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, marginBottom: 16, color: "var(--text-primary)" }}>
//                   Autres Examens Complémentaires
//                 </h3>
//                 <div className="grid grid-cols-2 gap-3">
//                   {autresExamens.map(item => {
//                     const isAdded = examens.some(e => e.label === item);
//                     return (
//                       <button key={item} onClick={() => isAdded ? removeExam(examens.find(e => e.label === item)!.id) : addExam(item, "autre")}
//                         className="p-4 rounded-xl text-left transition-all"
//                         style={{
//                           background: isAdded ? "var(--primary-light)" : "var(--bg-main)",
//                           border: `1.5px solid ${isAdded ? "var(--primary)" : "var(--border)"}`,
//                         }}>
//                         <Zap size={16} color={isAdded ? "var(--primary)" : "var(--text-muted)"} />
//                         <p style={{ fontFamily: "var(--font-display)", fontWeight: isAdded ? 700 : 500, fontSize: 13, color: isAdded ? "var(--primary)" : "var(--text-primary)", marginTop: 6 }}>
//                           {isAdded ? "✓ " : ""}{item}
//                         </p>
//                       </button>
//                     );
//                   })}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Right panel - prescription summary */}
//           <div className="space-y-4">
//             <div className="card-dpi p-5">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, color: "var(--text-primary)" }}>
//                   Examens prescrits ({examens.length})
//                 </h3>
//                 <label className="flex items-center gap-2 cursor-pointer">
//                   <input type="checkbox" style={{ accentColor: "var(--primary)" }}
//                     checked={globalUrgence} onChange={e => setGlobalUrgence(e.target.checked)} />
//                   <span style={{ fontSize: 12, fontWeight: 600, color: "#ef4444" }}>URGENT</span>
//                 </label>
//               </div>

//               {examens.length === 0 ? (
//                 <div className="text-center py-8">
//                   <FlaskConical size={32} color="var(--text-muted)" style={{ margin: "0 auto 8px" }} />
//                   <p style={{ fontSize: 13, color: "var(--text-muted)" }}>Aucun examen sélectionné</p>
//                 </div>
//               ) : (
//                 <div className="space-y-2">
//                   {examens.map(e => (
//                     <div key={e.id} className="flex items-center gap-2 p-2 rounded-lg"
//                       style={{ background: e.urgence ? "#fee2e2" : "var(--bg-main)", border: `1px solid ${e.urgence ? "#fca5a5" : "var(--border)"}` }}>
//                       <div className="flex-1">
//                         <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>
//                           {e.label} {e.detail && <span style={{ color: "var(--primary)" }}>· {e.detail}</span>}
//                         </p>
//                         {e.urgence && <span style={{ fontSize: 10, color: "#ef4444", fontWeight: 700 }}>⚡ URGENT</span>}
//                       </div>
//                       <button onClick={() => toggleUrgence(e.id)} title="Marquer urgent">
//                         <Zap size={13} color={e.urgence ? "#ef4444" : "var(--text-muted)"} />
//                       </button>
//                       <button onClick={() => removeExam(e.id)}>
//                         <X size={13} color="var(--text-muted)" />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Motif */}
//             <div className="card-dpi p-5">
//               <label className="label-dpi">Motif de prescription</label>
//               <textarea className="input-dpi" rows={3} placeholder="Indication clinique pour ces examens..." />
//             </div>

//             <button className="btn-primary w-full flex items-center justify-center gap-2">
//               <Save size={16} /> Valider la prescription
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }





















"use client";
// Route : app/dossier_medical/prescription_examen/page.tsx
// Liste des patients — module Prescription Examens

import { useState } from "react";
import Link from "next/link";
import Topbar from "@/components/Topbar";


import { Search, FlaskConical, AlertTriangle, ChevronRight, Calendar, Zap } from "lucide-react";
import { patients } from "@/lib/patient";
import { prescriptionExamenHistory } from "@/lib/history";


const statutConfig = {
  Hospitalisé: { bg: "#dbeafe", color: "#1e40af" },
  Urgent:      { bg: "#fee2e2", color: "#991b1b" },
  Ambulatoire: { bg: "#d1fae5", color: "#065f46" },
  Sorti:       { bg: "#f1f5f9", color: "#475569" },
};

const prescStatut: Record<string, { bg: string; color: string }> = {
  "Réalisée":   { bg: "#d1fae5", color: "#065f46" },
  "En attente": { bg: "#fef3c7", color: "#92400e" },
  "Urgente":    { bg: "#fee2e2", color: "#991b1b" },
  "Annulée":    { bg: "#f1f5f9", color: "#475569" },
};

const FILTERS = ["Tous", "Hospitalisé", "Urgent", "Ambulatoire", "Sorti"] as const;

export default function PrescriptionExamenListPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<typeof FILTERS[number]>("Tous");

  const filtered = patients.filter((p) => {
    const m = `${p.nom} ${p.prenom} ${p.id} ${p.medecin}`.toLowerCase().includes(search.toLowerCase());
    return m && (filter === "Tous" || p.statut === filter);
  });

  const lastPresc = (id: string) => prescriptionExamenHistory[id]?.[0] ?? null;
  const count     = (id: string) => prescriptionExamenHistory[id]?.length ?? 0;
  const avatarBg  = (s: string) => s === "Urgent" ? "#ef4444" : s === "Hospitalisé" ? "#3b82f6" : "var(--primary)";

  const totalUrgentes = Object.values(prescriptionExamenHistory).flat().filter(p => p.statut === "Urgente").length;
  const totalEnAttente = Object.values(prescriptionExamenHistory).flat().filter(p => p.statut === "En attente").length;

  return (
    <div>
      <Topbar title="Prescription Examens" subtitle="Sélectionnez un patient pour accéder à ses prescriptions d'examens" />
      <div className="p-8">

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total patients",    value: patients.length, color: "var(--primary)" },
            { label: "Prescriptions urgentes", value: totalUrgentes, color: "#ef4444" },
            { label: "En attente résultats",   value: totalEnAttente, color: "#f59e0b" },
            { label: "Patients hospitalisés",  value: patients.filter(p => p.statut === "Hospitalisé").length, color: "#3b82f6" },
          ].map((s) => (
            <div key={s.label} className="card-dpi p-5 flex items-center gap-4">
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ background: s.color + "18" }}>
                <FlaskConical size={20} color={s.color} />
              </div>
              <div>
                <p style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 24, color: "var(--text-primary)", lineHeight: 1 }}>
                  {s.value}
                </p>
                <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2" color="var(--text-muted)" />
            <input className="input-dpi" style={{ paddingLeft: 44 }}
              placeholder="Rechercher par nom, prénom, N° dossier..."
              value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="flex gap-2 p-1 rounded-xl" style={{ background: "white", border: "1px solid var(--border)" }}>
            {FILTERS.map((f) => (
              <button key={f} onClick={() => setFilter(f)}
                className="px-4 py-2 rounded-lg text-sm transition-all"
                style={{ background: filter === f ? "var(--primary)" : "transparent", color: filter === f ? "white" : "var(--text-secondary)", fontFamily: "var(--font-display)", fontWeight: 600 }}>
                {f}
              </button>
            ))}
          </div>
        </div>

        <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 16 }}>
          {filtered.length} patient{filtered.length > 1 ? "s" : ""}
        </p>

        <div className="space-y-3">
          {filtered.map((patient) => {
            const cfg  = statutConfig[patient.statut];
            const last = lastPresc(patient.id);
            const sc   = last ? (prescStatut[last.statut] ?? prescStatut["Réalisée"]) : null;
            const urgentCount = last?.examens.filter(e => e.urgence).length ?? 0;
            const critiqueCount = last?.examens.filter(e => e.resultat === "Critique").length ?? 0;

            return (
              <Link key={patient.id} href={`/dossier_medical/prescription_examen/${patient.id}`} className="block">
                <div className="card-dpi p-5 flex items-center gap-5 cursor-pointer transition-all hover:-translate-y-0.5"
                  style={{ borderLeft: patient.statut === "Urgent" ? "4px solid #ef4444" : patient.statut === "Hospitalisé" ? "4px solid #3b82f6" : "4px solid transparent" }}>

                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-base flex-shrink-0"
                    style={{ background: avatarBg(patient.statut), fontFamily: "var(--font-display)" }}>
                    {patient.nom[0]}{patient.prenom[0]}
                  </div>

                  <div style={{ minWidth: 200 }}>
                    <div className="flex items-center gap-2">
                      <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, color: "var(--text-primary)" }}>
                        {patient.nom} {patient.prenom}
                      </p>
                      {patient.statut === "Urgent" && <AlertTriangle size={14} color="#ef4444" />}
                    </div>
                    <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>
                      {patient.id} · {patient.age} ans
                    </p>
                  </div>

                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 12, color: "var(--text-muted)" }}>Médecin</p>
                    <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>{patient.medecin}</p>
                  </div>

                  {/* Motif */}
                  <div style={{ minWidth: 220 }}>
                    <p style={{ fontSize: 12, color: "var(--text-muted)" }}>Dernière prescription</p>
                    {last ? (
                      <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>
                        {last.examens.length} examen{last.examens.length > 1 ? "s" : ""} — {last.motif.slice(0, 28)}…
                      </p>
                    ) : (
                      <p style={{ fontSize: 13, color: "var(--text-muted)" }}>Aucune prescription</p>
                    )}
                  </div>

                  {/* Urgent exams */}
                  {urgentCount > 0 && (
                    <div className="flex items-center gap-1 px-2 py-1 rounded-lg" style={{ background: "#fee2e2" }}>
                      <Zap size={12} color="#ef4444" />
                      <span style={{ fontSize: 11, color: "#991b1b", fontWeight: 700 }}>
                        {urgentCount} urgent{urgentCount > 1 ? "s" : ""}
                      </span>
                    </div>
                  )}

                  {/* Critique */}
                  {critiqueCount > 0 && (
                    <div className="flex items-center gap-1 px-2 py-1 rounded-lg" style={{ background: "#ede9fe" }}>
                      <AlertTriangle size={12} color="#7c3aed" />
                      <span style={{ fontSize: 11, color: "#6d28d9", fontWeight: 700 }}>
                        {critiqueCount} critique{critiqueCount > 1 ? "s" : ""}
                      </span>
                    </div>
                  )}

                  {/* Date */}
                  {last && (
                    <div className="flex items-center gap-1" style={{ minWidth: 110 }}>
                      <Calendar size={12} color="var(--primary)" />
                      <span style={{ fontSize: 12, fontWeight: 600, color: "var(--primary)" }}>
                        {new Date(last.date).toLocaleDateString("fr-FR")}
                      </span>
                    </div>
                  )}

                  {/* Count */}
                  <div className="text-center" style={{ minWidth: 64 }}>
                    <p style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22, color: "var(--primary)", lineHeight: 1 }}>
                      {count(patient.id)}
                    </p>
                    <p style={{ fontSize: 11, color: "var(--text-muted)" }}>prescript.</p>
                  </div>

                  {sc && (
                    <div className="px-3 py-1 rounded-xl text-xs font-bold"
                      style={{ background: sc.bg, color: sc.color, whiteSpace: "nowrap" }}>{last?.statut}</div>
                  )}

                  <div className="px-3 py-1.5 rounded-xl text-xs font-bold"
                    style={{ background: cfg.bg, color: cfg.color, whiteSpace: "nowrap" }}>
                    {patient.statut}
                  </div>

                  <ChevronRight size={18} color="var(--text-muted)" className="flex-shrink-0" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}