// "use client";
// import { useState } from "react";
// import Topbar from "@/components/Topbar";
// import { Search, Plus, X, AlertTriangle, ChevronDown, Save, Info } from "lucide-react";

// const cim10Data = [
//   { code: "I21", label: "Infarctus aigu du myocarde" },
//   { code: "J18", label: "Pneumopathie, sans précision" },
//   { code: "E11", label: "Diabète sucré de type 2" },
//   { code: "I10", label: "Hypertension artérielle essentielle" },
//   { code: "J44", label: "Broncho-pneumopathie chronique obstructive" },
//   { code: "K29", label: "Gastrite et duodénite" },
//   { code: "M54", label: "Dorsalgie" },
//   { code: "N18", label: "Insuffisance rénale chronique" },
//   { code: "F32", label: "Épisode dépressif" },
//   { code: "G43", label: "Migraine" },
//   { code: "A15", label: "Tuberculose respiratoire" },
//   { code: "B50", label: "Paludisme à Plasmodium falciparum" },
// ];

// const graviteLevels = [
//   { label: "Légère", color: "#10b981", bg: "#d1fae5" },
//   { label: "Modérée", color: "#f59e0b", bg: "#fef3c7" },
//   { label: "Sévère", color: "#ef4444", bg: "#fee2e2" },
//   { label: "Critique", color: "#7c3aed", bg: "#ede9fe" },
// ];

// const urgenceTriages = [
//   { label: "Vert", desc: "Non urgent", color: "#10b981" },
//   { label: "Orange", desc: "Urgent", color: "#f59e0b" },
//   { label: "Rouge", desc: "Très urgent", color: "#ef4444" },
// ];

// export default function DiagnostiquePage() {
//   const [search, setSearch] = useState("");
//   const [diagPrincipal, setDiagPrincipal] = useState<{ code: string; label: string } | null>(null);
//   const [diagAssocies, setDiagAssocies] = useState<{ code: string; label: string }[]>([]);
//   const [diagDiff, setDiagDiff] = useState<string[]>([""]);
//   const [gravite, setGravite] = useState("Modérée");
//   const [triage, setTriage] = useState("Orange");
//   const [showResults, setShowResults] = useState(false);

//   const filtered = cim10Data.filter(d =>
//     d.code.toLowerCase().includes(search.toLowerCase()) ||
//     d.label.toLowerCase().includes(search.toLowerCase())
//   );

//   const addDiagAssocie = (d: { code: string; label: string }) => {
//     if (!diagAssocies.find(a => a.code === d.code) && d.code !== diagPrincipal?.code) {
//       setDiagAssocies(prev => [...prev, d]);
//     }
//     setShowResults(false);
//     setSearch("");
//   };

//   const removeDiagAssocie = (code: string) => {
//     setDiagAssocies(prev => prev.filter(a => a.code !== code));
//   };

//   const updateDiagDiff = (idx: number, val: string) => {
//     setDiagDiff(prev => prev.map((d, i) => i === idx ? val : d));
//   };

//   return (
//     <div>
//       <Topbar
//         title="Diagnostique"
//         subtitle="Patient : Diallo Ibrahim · Dossier N° 2024-0087"
//       />
//       <div className="p-8 space-y-6">

//         {/* Diagnostic Principal CIM-10 */}
//         <div className="card-dpi p-6">
//           <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, marginBottom: 16, color: "var(--text-primary)" }}>
//             Diagnostic Principal (CIM-10)
//           </h3>

//           {diagPrincipal ? (
//             <div className="flex items-center gap-4 p-4 rounded-2xl" style={{ background: "var(--primary-light)", border: "2px solid var(--primary)" }}>
//               <div className="px-3 py-1 rounded-lg" style={{ background: "var(--primary)" }}>
//                 <span style={{ color: "white", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14 }}>
//                   {diagPrincipal.code}
//                 </span>
//               </div>
//               <span style={{ flex: 1, fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 15, color: "var(--text-primary)" }}>
//                 {diagPrincipal.label}
//               </span>
//               <button onClick={() => setDiagPrincipal(null)}
//                 className="w-8 h-8 rounded-full flex items-center justify-center"
//                 style={{ background: "white" }}>
//                 <X size={14} color="var(--primary)" />
//               </button>
//             </div>
//           ) : (
//             <div className="relative">
//               <div className="relative">
//                 <Search size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
//                 <input
//                   className="input-dpi"
//                   style={{ paddingLeft: 40 }}
//                   placeholder="Rechercher par code CIM-10 ou libellé..."
//                   value={search}
//                   onChange={e => { setSearch(e.target.value); setShowResults(true); }}
//                   onFocus={() => setShowResults(true)}
//                 />
//               </div>
//               {showResults && search && (
//                 <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-xl border z-10"
//                   style={{ border: "1px solid var(--border)", maxHeight: 240, overflowY: "auto" }}>
//                   {filtered.map(d => (
//                     <div key={d.code}
//                       onClick={() => { setDiagPrincipal(d); setShowResults(false); setSearch(""); }}
//                       className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-teal-50 transition-colors">
//                       <span className="px-2 py-0.5 rounded text-xs font-bold"
//                         style={{ background: "var(--primary-light)", color: "var(--primary)" }}>{d.code}</span>
//                       <span style={{ fontSize: 14, color: "var(--text-primary)" }}>{d.label}</span>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           )}
//         </div>

//         <div className="grid grid-cols-2 gap-6">
//           {/* Diagnostics associés */}
//           <div className="card-dpi p-6">
//             <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, marginBottom: 16, color: "var(--text-primary)" }}>
//               Diagnostics Associés / Comorbidités
//             </h3>
//             <div className="space-y-2 mb-4">
//               {diagAssocies.map(d => (
//                 <div key={d.code} className="flex items-center gap-3 p-3 rounded-xl"
//                   style={{ background: "var(--bg-main)", border: "1px solid var(--border)" }}>
//                   <span className="px-2 py-0.5 rounded text-xs font-bold"
//                     style={{ background: "var(--primary-light)", color: "var(--primary)" }}>{d.code}</span>
//                   <span style={{ flex: 1, fontSize: 13, color: "var(--text-primary)" }}>{d.label}</span>
//                   <button onClick={() => removeDiagAssocie(d.code)}>
//                     <X size={14} color="var(--text-muted)" />
//                   </button>
//                 </div>
//               ))}
//             </div>
//             <div className="grid grid-cols-2 gap-2">
//               {cim10Data.slice(3, 9).map(d => (
//                 <button key={d.code} onClick={() => addDiagAssocie(d)}
//                   className="flex items-center gap-2 px-3 py-2 rounded-xl text-left transition-all"
//                   style={{ background: "var(--primary-light)", border: "1px dashed var(--primary)" }}>
//                   <Plus size={13} color="var(--primary)" />
//                   <span style={{ fontSize: 12, color: "var(--primary)", fontWeight: 600 }}>{d.code} - {d.label.slice(0, 20)}...</span>
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Diagnostic différentiel */}
//           <div className="card-dpi p-6">
//             <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, marginBottom: 16, color: "var(--text-primary)" }}>
//               Diagnostic Différentiel
//             </h3>
//             <div className="space-y-3">
//               {diagDiff.map((d, idx) => (
//                 <div key={idx} className="flex gap-2">
//                   <div className="w-7 h-10 flex items-center justify-center">
//                     <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14, color: "var(--primary)" }}>
//                       {idx + 1}.
//                     </span>
//                   </div>
//                   <input
//                     className="input-dpi flex-1"
//                     placeholder={`Diagnostic différentiel ${idx + 1}...`}
//                     value={d}
//                     onChange={e => updateDiagDiff(idx, e.target.value)}
//                   />
//                   {diagDiff.length > 1 && (
//                     <button onClick={() => setDiagDiff(prev => prev.filter((_, i) => i !== idx))}>
//                       <X size={16} color="var(--text-muted)" />
//                     </button>
//                   )}
//                 </div>
//               ))}
//             </div>
//             <button
//               onClick={() => setDiagDiff(prev => [...prev, ""])}
//               className="mt-4 flex items-center gap-2 px-4 py-2 rounded-xl"
//               style={{ border: "1.5px dashed var(--primary)", color: "var(--primary)", fontWeight: 600, fontSize: 13, width: "100%" }}>
//               <Plus size={16} /> Ajouter un diagnostic différentiel
//             </button>
//           </div>
//         </div>

//         <div className="grid grid-cols-2 gap-6">
//           {/* Échelle de gravité */}
//           <div className="card-dpi p-6">
//             <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, marginBottom: 16, color: "var(--text-primary)" }}>
//               Échelle de Gravité
//             </h3>
//             <div className="grid grid-cols-2 gap-3">
//               {graviteLevels.map(g => (
//                 <button key={g.label} onClick={() => setGravite(g.label)}
//                   className="p-4 rounded-2xl transition-all text-left"
//                   style={{
//                     background: gravite === g.label ? g.bg : "var(--bg-main)",
//                     border: `2px solid ${gravite === g.label ? g.color : "var(--border)"}`,
//                   }}>
//                   <div className="w-4 h-4 rounded-full mb-2" style={{ background: g.color }} />
//                   <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14, color: g.color }}>
//                     {g.label}
//                   </span>
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Triage urgences */}
//           <div className="card-dpi p-6">
//             <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, marginBottom: 4, color: "var(--text-primary)" }}>
//               Classification Patient — Urgences
//             </h3>
//             <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 16 }}>
//               Classification vert/orange/rouge
//             </p>
//             <div className="flex gap-4">
//               {urgenceTriages.map(t => (
//                 <button key={t.label} onClick={() => setTriage(t.label)}
//                   className="flex-1 p-4 rounded-2xl transition-all"
//                   style={{
//                     background: triage === t.label ? t.color + "22" : "var(--bg-main)",
//                     border: `2px solid ${triage === t.label ? t.color : "var(--border)"}`,
//                   }}>
//                   <div className="w-8 h-8 rounded-full mx-auto mb-2" style={{ background: t.color }} />
//                   <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: t.color, textAlign: "center" }}>{t.label}</p>
//                   <p style={{ fontSize: 12, color: "var(--text-secondary)", textAlign: "center" }}>{t.desc}</p>
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Save */}
//         <div className="flex justify-end gap-3">
//           <button className="btn-accent">Enregistrer brouillon</button>
//           <button className="btn-primary flex items-center gap-2">
//             <Save size={16} /> Valider le diagnostic
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }












"use client";
// Route : app/dossier_medical/diagnostique/page.tsx
// Liste des patients — module Diagnostique

import { useState } from "react";
import Link from "next/link";
import Topbar from "@/components/Topbar";


import {
  Search, ClipboardList, AlertTriangle, ChevronRight,
  User, Calendar, Plus, Activity,
} from "lucide-react";
import { patients } from "@/lib/patient";
import { diagnostiqueHistory } from "@/lib/history";

const statutConfig = {
  Hospitalisé: { bg: "#dbeafe", color: "#1e40af" },
  Urgent:      { bg: "#fee2e2", color: "#991b1b" },
  Ambulatoire: { bg: "#d1fae5", color: "#065f46" },
  Sorti:       { bg: "#f1f5f9", color: "#475569" },
};

const graviteBadge = {
  Légère:   { bg: "#d1fae5", color: "#065f46" },
  Modérée:  { bg: "#fef3c7", color: "#92400e" },
  Sévère:   { bg: "#fee2e2", color: "#991b1b" },
  Critique: { bg: "#ede9fe", color: "#6d28d9" },
};

const FILTERS = ["Tous", "Hospitalisé", "Urgent", "Ambulatoire", "Sorti"] as const;

export default function DiagnostiqueListPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<typeof FILTERS[number]>("Tous");

  const filtered = patients.filter((p) => {
    const matchSearch = `${p.nom} ${p.prenom} ${p.id} ${p.medecin}`
      .toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "Tous" || p.statut === filter;
    return matchSearch && matchFilter;
  });

  const lastDiag = (id: string) => diagnostiqueHistory[id]?.[0] ?? null;
  const diagCount = (id: string) => diagnostiqueHistory[id]?.length ?? 0;

  const avatarBg = (statut: string) =>
    statut === "Urgent" ? "#ef4444"
    : statut === "Hospitalisé" ? "#3b82f6"
    : "var(--primary)";

  return (
    <div>
      <Topbar title="Diagnostique" subtitle="Sélectionnez un patient pour accéder à ses diagnostics" />
      <div className="p-8">

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total patients", value: patients.length, color: "var(--primary)" },
            { label: "Hospitalisés",   value: patients.filter(p => p.statut === "Hospitalisé").length, color: "#3b82f6" },
            { label: "Urgents",        value: patients.filter(p => p.statut === "Urgent").length, color: "#ef4444" },
            { label: "Ambulatoires",   value: patients.filter(p => p.statut === "Ambulatoire").length, color: "#10b981" },
          ].map((s) => (
            <div key={s.label} className="card-dpi p-5 flex items-center gap-4">
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center"
                style={{ background: s.color + "18" }}>
                <ClipboardList size={20} color={s.color} />
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
              placeholder="Rechercher par nom, prénom, N° dossier, médecin..."
              value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="flex gap-2 p-1 rounded-xl" style={{ background: "white", border: "1px solid var(--border)" }}>
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="px-4 py-2 rounded-lg text-sm transition-all"
                style={{
                  background: filter === f ? "#22c55e" : "transparent", // Vert
                  color: filter === f ? "white" : "var(--text-secondary)",
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 16 }}>
          {filtered.length} patient{filtered.length > 1 ? "s" : ""}
        </p>

        {/* List */}
        <div className="space-y-3">
          {filtered.map((patient) => {
            const cfg  = statutConfig[patient.statut];
            const last = lastDiag(patient.id);
            const count = diagCount(patient.id);

            return (
              <Link key={patient.id} href={`/dossier_medical/diagnostique/${patient.id}`} className="block">
                <div className="card-dpi p-5 flex items-center gap-5 cursor-pointer transition-all hover:-translate-y-0.5"
                  style={{
                    borderLeft: patient.statut === "Urgent" ? "4px solid #ef4444"
                      : patient.statut === "Hospitalisé" ? "4px solid #3b82f6"
                      : "4px solid transparent",
                  }}>
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-base flex-shrink-0"
                    style={{ background: avatarBg(patient.statut), fontFamily: "var(--font-display)" }}>
                    {patient.nom[0]}{patient.prenom[0]}
                  </div>

                  {/* Identité */}
                  <div style={{ minWidth: 200 }}>
                    <div className="flex items-center gap-2">
                      <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, color: "var(--text-primary)" }}>
                        {patient.nom} {patient.prenom}
                      </p>
                      {patient.statut === "Urgent" && <AlertTriangle size={14} color="#ef4444" />}
                    </div>
                    <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>
                      {patient.id} · {patient.age} ans · {patient.sexe}
                    </p>
                  </div>

                  {/* Médecin */}
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 12, color: "var(--text-muted)" }}>Médecin référent</p>
                    <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>{patient.medecin}</p>
                  </div>

                  {/* Dernier diagnostic */}
                  {last ? (
                    <div style={{ minWidth: 220 }}>
                      <p style={{ fontSize: 12, color: "var(--text-muted)" }}>Dernier diagnostic</p>
                      <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>
                        <span className="text-xs font-bold mr-1"
                          style={{ color: "var(--primary)" }}>{last.diagPrincipal.code}</span>
                        {last.diagPrincipal.label}
                      </p>
                    </div>
                  ) : (
                    <div style={{ minWidth: 220 }}>
                      <p style={{ fontSize: 12, color: "var(--text-muted)" }}>Aucun diagnostic</p>
                    </div>
                  )}

                  {/* Gravité */}
                  {last && (
                    <div className="px-3 py-1 rounded-xl text-xs font-bold"
                      style={{ background: graviteBadge[last.gravite].bg, color: graviteBadge[last.gravite].color, whiteSpace: "nowrap" }}>
                      {last.gravite}
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
                  <div className="text-center" style={{ minWidth: 72 }}>
                    <p style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22, color: "var(--primary)", lineHeight: 1 }}>
                      {count}
                    </p>
                    <p style={{ fontSize: 11, color: "var(--text-muted)" }}>diagnostic{count > 1 ? "s" : ""}</p>
                  </div>

                  {/* Statut */}
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