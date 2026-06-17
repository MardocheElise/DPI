// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";
// import { useState } from "react";
// import Topbar from "@/components/Topbar";
// import {
//   Stethoscope, User, Activity, Thermometer, Weight,
//   Heart, Wind, Eye, Save, Plus, ChevronDown, AlertCircle,
//   Clock, Calendar, FileText
// } from "lucide-react";

// const motifOptions = [
//   "Douleur thoracique", "Fièvre", "Dyspnée", "Céphalées", "Douleurs abdominales",
//   "Consultation de suivi", "Bilan de santé", "Traumatisme", "Autres"
// ];

// const antecedentsMedicaux = [
//   "HTA", "Diabète type 2", "Asthme", "Cardiopathie", "Insuffisance rénale",
//   "Dyslipidémie", "Hypothyroïdie", "Dépression", "Ulcère gastrique"
// ];

// const etatConscience = ["Conscient et orienté", "Confus", "Somnolent", "Comateux"];
// const echelleDouleur = [0,1,2,3,4,5,6,7,8,9,10];

// export default function ConsultationPage() {
//   const [activeTab, setActiveTab] = useState("motif");
//   const [motifSelected, setMotifSelected] = useState("");
//   const [anamnese, setAnamnese] = useState("");
//   const [antecedents, setAntecedents] = useState<string[]>([]);
//   const [evaScore, setEvaScore] = useState(0);
//   const [conscience, setConscience] = useState("Conscient et orienté");
//   const [vitals, setVitals] = useState({
//     ta_systolique: "", ta_diastolique: "", fc: "", fr: "", temperature: "",
//     spo2: "", poids: "", taille: "", imc: ""
//   });
//   const [saved, setSaved] = useState(false);

//   const tabs = [
//     { id: "motif", label: "Motif & Anamnèse", icon: FileText },
//     { id: "antecedents", label: "Antécédents", icon: Clock },
//     { id: "examen", label: "Examen Clinique", icon: Stethoscope },
//     { id: "etats", label: "États Généraux", icon: Activity },
//     { id: "compterendu", label: "Compte-rendu", icon: FileText },
//   ];

//   const calcIMC = () => {
//     const p = parseFloat(vitals.poids);
//     const t = parseFloat(vitals.taille) / 100;
//     if (p && t) {
//       const imc = (p / (t * t)).toFixed(1);
//       setVitals(v => ({ ...v, imc }));
//     }
//   };

//   const toggleAntecedent = (item: string) => {
//     setAntecedents(prev =>
//       prev.includes(item) ? prev.filter(a => a !== item) : [...prev, item]
//     );
//   };

//   const handleSave = () => {
//     setSaved(true);
//     setTimeout(() => setSaved(false), 2000);
//   };

//   const evaColor = evaScore <= 3 ? "#10b981" : evaScore <= 6 ? "#f59e0b" : "#ef4444";

//   return (
//     <div>
//       <Topbar
//         title="Consultation Médicale"
//         subtitle="Patient : Diallo Ibrahim · Né le 12/04/1978 · Dossier N° 2024-0087"
//       />
//       <div className="p-8">

//         {/* Patient Info Banner */}
//         <div className="card-dpi p-5 mb-6 flex items-center gap-6">
//           <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-xl"
//             style={{ background: "var(--primary)" }}>DI</div>
//           <div className="flex-1">
//             <p style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 18, color: "var(--text-primary)" }}>
//               Diallo Ibrahim
//             </p>
//             <div className="flex gap-4 mt-1">
//               <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>👤 Homme · 46 ans</span>
//               <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>📍 Abidjan, Cocody</span>
//               <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>🩸 Groupe A+</span>
//               <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>📞 +225 07 12 34 567</span>
//             </div>
//           </div>
//           <div className="flex items-center gap-2 px-4 py-2 rounded-xl" style={{ background: "var(--primary-light)" }}>
//             <Calendar size={16} color="var(--primary)" />
//             <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 13, color: "var(--primary)" }}>
//               {new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
//             </span>
//           </div>
//         </div>

//         {/* Tabs */}
//         <div className="flex gap-2 mb-6 p-1 rounded-xl" style={{ background: "white", border: "1px solid var(--border)", display: "inline-flex" }}>
//           {tabs.map(tab => (
//             <button
//               key={tab.id}
//               onClick={() => setActiveTab(tab.id)}
//               className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all"
//               style={{
//                 background: activeTab === tab.id ? "var(--primary)" : "transparent",
//                 color: activeTab === tab.id ? "black" : "var(--text-secondary)",
//                 fontFamily: "var(--font-display)",
//                 fontWeight: 600,
//               }}
//             >
//               <tab.icon size={15} />
//               {tab.label}
//             </button>
//           ))}
//         </div>

//         {/* Tab Content */}
//         {activeTab === "motif" && (
//           <div className="grid grid-cols-2 gap-6">
//             <div className="card-dpi p-6">
//               <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, marginBottom: 16, color: "var(--text-primary)" }}>
//                 Motif de Consultation
//               </h3>
//               <div className="grid grid-cols-2 gap-2 mb-4">
//                 {motifOptions.map(m => (
//                   <button
//                     key={m}
//                     onClick={() => setMotifSelected(m)}
//                     className="px-3 py-2.5 rounded-xl text-sm text-left transition-all"
//                     style={{
//                       background: motifSelected === m ? "var(--primary)" : "var(--bg-main)",
//                       color: motifSelected === m ? "white" : "var(--text-primary)",
//                       fontFamily: "var(--font-body)",
//                       border: `1.5px solid ${motifSelected === m ? "var(--primary)" : "var(--border)"}`,
//                       fontWeight: motifSelected === m ? 600 : 400,
//                     }}
//                   >
//                     {m}
//                   </button>
//                 ))}
//               </div>
//               {motifSelected === "Autres" && (
//                 <input className="input-dpi" placeholder="Préciser le motif..." />
//               )}
//             </div>

//             <div className="card-dpi p-6">
//               <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, marginBottom: 16, color: "var(--text-primary)" }}>
//                 Anamnèse
//               </h3>
//               <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 8 }}>
//                 Histoire de la maladie présente — symptômes, début, évolution
//               </p>
//               <textarea
//                 className="input-dpi"
//                 rows={8}
//                 placeholder="Décrivez l'histoire de la maladie présente, les symptômes, leur début et leur évolution..."
//                 value={anamnese}
//                 onChange={e => setAnamnese(e.target.value)}
//                 style={{ resize: "vertical" }}
//               />
//               <div className="mt-3 flex gap-2 flex-wrap">
//                 {["Début brutal", "Début progressif", "Évolution favorable", "Évolution défavorable", "Récidive"].map(tag => (
//                   <button key={tag} className="px-3 py-1 rounded-lg text-xs"
//                     style={{ background: "var(--primary-light)", color: "var(--primary)", fontWeight: 600 }}>
//                     + {tag}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {activeTab === "antecedents" && (
//           <div className="grid grid-cols-2 gap-6">
//             <div className="card-dpi p-6">
//               <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, marginBottom: 16, color: "var(--text-primary)" }}>
//                 Antécédents Médicaux Récents
//               </h3>
//               <div className="space-y-2">
//                 {antecedentsMedicaux.map(item => (
//                   <div
//                     key={item}
//                     onClick={() => toggleAntecedent(item)}
//                     className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all"
//                     style={{
//                       background: antecedents.includes(item) ? "var(--primary-light)" : "var(--bg-main)",
//                       border: `1.5px solid ${antecedents.includes(item) ? "var(--primary)" : "var(--border)"}`,
//                     }}
//                   >
//                     <div className="w-5 h-5 rounded-md flex items-center justify-center"
//                       style={{ background: antecedents.includes(item) ? "var(--primary)" : "white", border: "1.5px solid var(--primary)" }}>
//                       {antecedents.includes(item) && <span style={{ color: "white", fontSize: 12, fontWeight: 700 }}>✓</span>}
//                     </div>
//                     <span style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text-primary)", fontWeight: antecedents.includes(item) ? 600 : 400 }}>
//                       {item}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="card-dpi p-6">
//               <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, marginBottom: 16, color: "var(--text-primary)" }}>
//                 Antécédents Chirurgicaux & Familiaux
//               </h3>
//               <div className="space-y-4">
//                 <div>
//                   <label className="label-dpi">Antécédents chirurgicaux</label>
//                   <textarea className="input-dpi" rows={3} placeholder="Interventions chirurgicales passées..." />
//                 </div>
//                 <div>
//                   <label className="label-dpi">Antécédents familiaux</label>
//                   <textarea className="input-dpi" rows={3} placeholder="Maladies héréditaires, antécédents familiaux significatifs..." />
//                 </div>
//                 <div>
//                   <label className="label-dpi">Allergies connues</label>
//                   <input className="input-dpi" placeholder="Pénicilline, Aspirine, Arachides..." />
//                 </div>
//                 <div>
//                   <label className="label-dpi">Traitements en cours</label>
//                   <textarea className="input-dpi" rows={3} placeholder="Médicaments actuellement pris..." />
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {activeTab === "examen" && (
//           <div className="grid grid-cols-3 gap-6">
//             {/* Vitals */}
//             {[
//               { label: "Tension Artérielle (mmHg)", icon: Activity, key1: "ta_systolique", key2: "ta_diastolique", dual: true },
//             ].map(() => (
//               <div key="ta" className="card-dpi p-5">
//                 <div className="flex items-center gap-2 mb-4">
//                   <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "var(--primary-light)" }}>
//                     <Activity size={16} color="var(--primary)" />
//                   </div>
//                   <label className="label-dpi" style={{ marginBottom: 0 }}>Tension Artérielle</label>
//                 </div>
//                 <div className="flex gap-2 items-center">
//                   <input className="input-dpi" placeholder="Systolique" value={vitals.ta_systolique}
//                     onChange={e => setVitals(v => ({ ...v, ta_systolique: e.target.value }))} />
//                   <span style={{ color: "var(--text-muted)", fontWeight: 700 }}>/</span>
//                   <input className="input-dpi" placeholder="Diastolique" value={vitals.ta_diastolique}
//                     onChange={e => setVitals(v => ({ ...v, ta_diastolique: e.target.value }))} />
//                 </div>
//                 <p style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 6 }}>Normal: 120/80 mmHg</p>
//               </div>
//             ))}

//             {[
//               { label: "Fréquence Cardiaque", unit: "bpm", icon: Heart, key: "fc", normal: "60-100 bpm" },
//               { label: "Fréquence Respiratoire", unit: "/min", icon: Wind, key: "fr", normal: "12-20 /min" },
//               { label: "Température", unit: "°C", icon: Thermometer, key: "temperature", normal: "36.5-37.5°C" },
//               { label: "SpO2", unit: "%", icon: Eye, key: "spo2", normal: "> 95%" },
//             ].map(field => (
//               <div key={field.key} className="card-dpi p-5">
//                 <div className="flex items-center gap-2 mb-4">
//                   <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "var(--primary-light)" }}>
//                     <field.icon size={16} color="var(--primary)" />
//                   </div>
//                   <label className="label-dpi" style={{ marginBottom: 0 }}>{field.label}</label>
//                 </div>
//                 <div className="flex gap-2 items-center">
//                   <input
//                     className="input-dpi"
//                     placeholder={`Ex: ${field.unit === "bpm" ? "72" : field.unit === "/min" ? "16" : field.unit === "°C" ? "37.0" : "98"}`}
//                     value={(vitals as any)[field.key]}
//                     onChange={e => setVitals(v => ({ ...v, [field.key]: e.target.value }))}
//                   />
//                   <span style={{ fontWeight: 700, color: "var(--primary)", minWidth: 36 }}>{field.unit}</span>
//                 </div>
//                 <p style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 6 }}>Normal: {field.normal}</p>
//               </div>
//             ))}

//             {/* Poids/Taille/IMC */}
//             <div className="card-dpi p-5">
//               <div className="flex items-center gap-2 mb-4">
//                 <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "var(--primary-light)" }}>
//                   <Weight size={16} color="var(--primary)" />
//                 </div>
//                 <label className="label-dpi" style={{ marginBottom: 0 }}>Poids & Taille</label>
//               </div>
//               <div className="space-y-2">
//                 <div className="flex gap-2 items-center">
//                   <input className="input-dpi" placeholder="Poids" value={vitals.poids}
//                     onChange={e => setVitals(v => ({ ...v, poids: e.target.value }))} />
//                   <span style={{ fontWeight: 700, color: "var(--primary)", minWidth: 24 }}>kg</span>
//                 </div>
//                 <div className="flex gap-2 items-center">
//                   <input className="input-dpi" placeholder="Taille" value={vitals.taille}
//                     onChange={e => setVitals(v => ({ ...v, taille: e.target.value }))} />
//                   <span style={{ fontWeight: 700, color: "var(--primary)", minWidth: 24 }}>cm</span>
//                 </div>
//                 <button onClick={calcIMC} className="btn-primary w-full mt-1" style={{ padding: "7px 0", fontSize: 13 }}>
//                   Calculer IMC
//                 </button>
//                 {vitals.imc && (
//                   <div className="mt-2 p-2 rounded-xl text-center" style={{ background: "var(--primary-light)" }}>
//                     <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 20, color: "var(--primary)" }}>
//                       {vitals.imc}
//                     </span>
//                     <span style={{ fontSize: 12, color: "var(--primary)", marginLeft: 4 }}>IMC</span>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}

//         {activeTab === "etats" && (
//           <div className="grid grid-cols-2 gap-6">
//             <div className="card-dpi p-6">
//               <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, marginBottom: 20, color: "var(--text-primary)" }}>
//                 État de Conscience
//               </h3>
//               <div className="space-y-3">
//                 {etatConscience.map(e => (
//                   <div key={e} onClick={() => setConscience(e)}
//                     className="flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all"
//                     style={{
//                       background: conscience === e ? "var(--primary-light)" : "var(--bg-main)",
//                       border: `1.5px solid ${conscience === e ? "var(--primary)" : "var(--border)"}`,
//                     }}>
//                     <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center"
//                       style={{ borderColor: "var(--primary)", background: conscience === e ? "var(--primary)" : "transparent" }}>
//                       {conscience === e && <div className="w-2 h-2 rounded-full bg-white" />}
//                     </div>
//                     <span style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text-primary)", fontWeight: conscience === e ? 600 : 400 }}>
//                       {e}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="card-dpi p-6">
//               <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, marginBottom: 20, color: "var(--text-primary)" }}>
//                 Douleur - Échelle EVA
//               </h3>
//               <div className="mb-6">
//                 <div className="flex justify-between items-center mb-3">
//                   <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>Aucune douleur</span>
//                   <div className="px-4 py-2 rounded-xl" style={{ background: evaColor + "22" }}>
//                     <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 24, color: evaColor }}>
//                       {evaScore}/10
//                     </span>
//                   </div>
//                   <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>Douleur maximale</span>
//                 </div>
//                 <input
//                   type="range" min={0} max={10} value={evaScore}
//                   onChange={e => setEvaScore(Number(e.target.value))}
//                   className="w-full" style={{ accentColor: evaColor }}
//                 />
//                 <div className="flex justify-between mt-1">
//                   {echelleDouleur.map(n => (
//                     <span key={n} style={{ fontSize: 11, color: n === evaScore ? evaColor : "var(--text-muted)", fontWeight: n === evaScore ? 800 : 400 }}>
//                       {n}
//                     </span>
//                   ))}
//                 </div>
//               </div>

//               <div className="mt-4">
//                 <label className="label-dpi">Localisation de la douleur</label>
//                 <input className="input-dpi mb-4" placeholder="Ex: thorax, abdomen, membres inférieurs..." />
//                 <label className="label-dpi">Description</label>
//                 <select className="input-dpi">
//                   <option>Choisir un type...</option>
//                   <option>Brûlure</option>
//                   <option>Serrement</option>
//                   <option>Irradiation</option>
//                   <option>Pulsatile</option>
//                   <option>Crampe</option>
//                   <option>Picotements</option>
//                 </select>
//               </div>
//             </div>

//             <div className="card-dpi p-6 col-span-2">
//               <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, marginBottom: 16, color: "var(--text-primary)" }}>
//                 Autres Signes Cliniques
//               </h3>
//               <div className="grid grid-cols-4 gap-3">
//                 {[
//                   "Pâleur", "Ictère", "Cyanose", "Œdèmes", "Dyspnée", "Toux", "Nausées", "Vomissements",
//                   "Fièvre subjective", "Sueurs nocturnes", "Amaigrissement", "Asthénie"
//                 ].map(signe => (
//                   <label key={signe} className="flex items-center gap-2 cursor-pointer p-3 rounded-xl"
//                     style={{ background: "var(--bg-main)", border: "1px solid var(--border)" }}>
//                     <input type="checkbox" style={{ accentColor: "var(--primary)" }} />
//                     <span style={{ fontSize: 13, color: "var(--text-primary)" }}>{signe}</span>
//                   </label>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {activeTab === "compterendu" && (
//           <div className="grid grid-cols-2 gap-6">
//             <div className="card-dpi p-6 col-span-2">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, color: "var(--text-primary)" }}>
//                   Compte-rendu de Consultation Structuré
//                 </h3>
//                 <div className="flex gap-2">
//                   <span className="badge-info">Brouillon</span>
//                 </div>
//               </div>

//               <div className="space-y-4">
//                 {["Motif de consultation", "Résumé de l'anamnèse", "Examen clinique", "Synthèse et conduite à tenir"].map(section => (
//                   <div key={section}>
//                     <label className="label-dpi">{section}</label>
//                     <textarea className="input-dpi" rows={4}
//                       placeholder={`${section}...`} style={{ resize: "vertical" }} />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Save Bar */}
//         <div className="mt-8 flex items-center justify-between p-5 rounded-2xl"
//           style={{ background: "white", border: "1px solid var(--border)" }}>
//           <div className="flex items-center gap-2">
//             <AlertCircle size={16} color="var(--accent-yellow)" />
//             <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>
//               Les données non enregistrées seront perdues
//             </span>
//           </div>
//           <div className="flex gap-3">
//             <button className="btn-accent">Enregistrer brouillon</button>
//             <button className="btn-primary flex items-center gap-2" onClick={handleSave}>
//               <Save size={16} />
//               {saved ? "✓ Enregistré !" : "Valider la consultation"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }









"use client";
// Route : app/dossier_medical/consultation/page.tsx
// Liste des patients — point d'entrée du module Consultation

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Topbar from "@/components/Topbar";

import {
  Search, Filter, ChevronRight, User, AlertTriangle,
  Clock, CheckCircle, Activity, Plus, Calendar,
} from "lucide-react";
import { patients } from "@/lib/patient";


const statutConfig = {
  Hospitalisé: { label: "Hospitalisé", bg: "#dbeafe", color: "#1e40af" },
  Urgent: { label: "Urgent", bg: "#fee2e2", color: "#991b1b" },
  Ambulatoire: { label: "Ambulatoire", bg: "#d1fae5", color: "#065f46" },
  Sorti: { label: "Sorti", bg: "#f1f5f9", color: "#475569" },
};
//enleve de la liste  "Ambulatoire", 
const FILTERS = ["Tous", "Hospitalisé", "Urgent","Sorti"] as const;

export default function ConsultationListPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<typeof FILTERS[number]>("Tous");

  const filtered = patients.filter((p) => {
    const matchSearch =
      `${p.nom} ${p.prenom} ${p.id} ${p.medecin}`.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "Tous" || p.statut === filter;
    return matchSearch && matchFilter;
  });

  const initiales = (p: typeof patients[0]) =>
    `${p.nom[0]}${p.prenom[0]}`.toUpperCase();

  const avatarBg = (statut: string) =>
    statut === "Urgent"
      ? "#ef4444"
      : statut === "Hospitalisé"
      ? "#3b82f6"
      : statut === "Ambulatoire"
      ? "#0d9488"
      : "#94a3b8";

  return (
    <div>
      <Topbar
        title="Consultation Médicale"
        subtitle="Sélectionnez un patient pour accéder à ses consultations"
      />

      <div className="p-8">
        {/* Stats bar */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total patients", value: patients.length, icon: User, color: "var(--primary)" },
            { label: "Hospitalisés", value: patients.filter(p => p.statut === "Hospitalisé").length, icon: Activity, color: "#3b82f6" },
            { label: "Urgents", value: patients.filter(p => p.statut === "Urgent").length, icon: AlertTriangle, color: "#ef4444" },
            // { label: "Ambulatoires", value: patients.filter(p => p.statut === "Ambulatoire").length, icon: CheckCircle, color: "#10b981" },
          ].map((stat) => (
            <div key={stat.label} className="card-dpi p-5 flex items-center gap-4">
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center"
                style={{ background: stat.color + "18" }}>
                <stat.icon size={20} color={stat.color} />
              </div>
              <div>
                <p style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 24, color: "var(--text-primary)", lineHeight: 1 }}>
                  {stat.value}
                </p>
                <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Search + filter toolbar */}
        <div className="flex items-center gap-8 mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: "var(--text-muted)" }}
            />

            <input
              className="w-full rounded-xl border transition-all outline-none"
              style={{
                paddingLeft: 44,
                paddingRight: 16,
                height: 42,
                border: "1px solid var(--border)",
                background: "white",
                color: "var(--text-primary)",
                fontFamily: "var(--font-display)",
              }}
              placeholder="Rechercher par nom, prénom, N° dossier, médecin..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Status filters */}
          <div
            className="flex gap-2 p-1 rounded-xl"
            style={{
              background: "white",
              border: "1px solid var(--border)",
            }}
          >
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

          {/* New consultation */}
          <Link href="/dossier_medical/consultation/nouveau">
            <button className="btn-primary flex items-center gap-2 whitespace-nowrap">
              <Plus size={16} /> Nouvelle consultation
            </button>
          </Link>
        </div>

        {/* Patient count */}
        <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 16 }}>
          {filtered.length} patient{filtered.length > 1 ? "s" : ""} trouvé{filtered.length > 1 ? "s" : ""}
        </p>

        {/* Patient list */}
        <div className="space-y-3">
          {filtered.map((patient) => {
            const cfg = statutConfig[patient.statut];
            const consultations = [3, 2, 2, 1, 4, 2]; // simulated counts
            const patientIdx = patients.findIndex(p => p.id === patient.id);
            const consultCount = [3, 2, 2, 1, 4, 2][patientIdx] ?? 0;

            return (
              <Link
                key={patient.id}
                href={`/dossier_medical/consultation/${patient.id}`}
                className="block"
              >
                <div
                  className="card-dpi p-5 flex items-center gap-5 cursor-pointer transition-all hover:-translate-y-0.5"
                  style={{
                    borderLeft: patient.statut === "Urgent"
                      ? "4px solid #ef4444"
                      : patient.statut === "Hospitalisé"
                      ? "4px solid #3b82f6"
                      : "4px solid transparent",
                  }}
                >
                  {/* Avatar */}
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-base flex-shrink-0"
                    style={{ background: avatarBg(patient.statut), fontFamily: "var(--font-display)" }}
                  >
                    {initiales(patient)}
                  </div>

                  {/* Identity */}
                  <div style={{ minWidth: 200 }}>
                    <div className="flex items-center gap-2">
                      <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, color: "var(--text-primary)" }}>
                        {patient.nom} {patient.prenom}
                      </p>
                      {patient.statut === "Urgent" && (
                        <AlertTriangle size={14} color="#ef4444" />
                      )}
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

                  {/* Service */}
                  {patient.hospitalisation && (
                    <div style={{ minWidth: 120 }}>
                      <p style={{ fontSize: 12, color: "var(--text-muted)" }}>Service</p>
                      <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>
                        {patient.hospitalisation.service}
                      </p>
                    </div>
                  )}

                  {/* Dernière consultation */}
                  <div style={{ minWidth: 130 }}>
                    <p style={{ fontSize: 12, color: "var(--text-muted)" }}>Dernière consult.</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Calendar size={12} color="var(--primary)" />
                      <p style={{ fontSize: 13, fontWeight: 600, color: "var(--primary)" }}>
                        {new Date(patient.dateAdmission).toLocaleDateString("fr-FR")}
                      </p>
                    </div>
                  </div>

                  {/* Consultations count */}
                  <div className="text-center" style={{ minWidth: 80 }}>
                    <p style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22, color: "var(--primary)", lineHeight: 1 }}>
                      {consultCount}
                    </p>
                    <p style={{ fontSize: 11, color: "var(--text-muted)" }}>consultation{consultCount > 1 ? "s" : ""}</p>
                  </div>

                  {/* Statut badge */}
                  {/* <div className="px-3 py-1.5 rounded-xl text-xs font-bold"
                    style={{ background: cfg.bg, color: cfg.color, whiteSpace: "nowrap" }}>
                    {cfg.label}
                  </div> */}

                  {/* Allergies warning */}
                  {/* {patient.allergies.length > 0 && (
                    <div className="flex items-center gap-1 px-2 py-1 rounded-lg"
                      style={{ background: "#fff7ed" }}>
                      <AlertTriangle size={12} color="#f97316" />
                      <span style={{ fontSize: 11, color: "#c2410c", fontWeight: 600 }}>
                        {patient.allergies.length} allergie{patient.allergies.length > 1 ? "s" : ""}
                      </span>
                    </div>
                  )} */}

                  {/* Arrow */}
                  <ChevronRight size={18} color="var(--text-muted)" className="flex-shrink-0" />
                </div>
              </Link>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <User size={48} color="var(--text-muted)" style={{ margin: "0 auto 12px" }} />
            <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, color: "var(--text-secondary)" }}>
              Aucun patient trouvé
            </p>
            <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>
              Modifiez vos critères de recherche
            </p>
          </div>
        )}
      </div>
    </div>
  );
}