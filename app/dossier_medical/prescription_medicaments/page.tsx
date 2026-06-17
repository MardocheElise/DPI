// "use client";
// import { useState } from "react";
// import Topbar from "@/components/Topbar";
// import { Search, Plus, X, AlertTriangle, CheckCircle, Pill, Save, Info, Shield } from "lucide-react";

// const medicamentsList = [
//   { dci: "Amoxicilline", commercial: "Clamoxyl", classe: "Antibiotique", formes: ["500mg cp", "1g cp", "250mg/5ml sus"] },
//   { dci: "Paracétamol", commercial: "Doliprane", classe: "Antalgique/Antipyrétique", formes: ["500mg cp", "1g cp", "250mg supp", "100mg/ml sol"] },
//   { dci: "Ibuprofène", commercial: "Brufen", classe: "AINS", formes: ["200mg cp", "400mg cp", "600mg cp"] },
//   { dci: "Metformine", commercial: "Glucophage", classe: "Antidiabétique", formes: ["500mg cp", "850mg cp", "1000mg cp"] },
//   { dci: "Amlodipine", commercial: "Amlor", classe: "Antihypertenseur", formes: ["5mg cp", "10mg cp"] },
//   { dci: "Atorvastatine", commercial: "Tahor", classe: "Hypolipémiant", formes: ["10mg cp", "20mg cp", "40mg cp"] },
//   { dci: "Oméprazole", commercial: "Mopral", classe: "IPP", formes: ["20mg gél", "40mg gél"] },
//   { dci: "Salbutamol", commercial: "Ventoline", classe: "Bronchodilatateur", formes: ["100μg inh", "2mg cp", "4mg cp"] },
//   { dci: "Artéméther", commercial: "Coartem", classe: "Antipaludique", formes: ["20/120mg cp"] },
// ];

// const voies = ["Orale", "Injectable IV", "Injectable IM", "Sous-cutanée", "Intranasale", "Rectale", "Transdermique", "Inhalée", "Sublinguale"];
// const frequences = ["1x/j", "2x/j", "3x/j", "4x/j", "Toutes les 6h", "Toutes les 8h", "Toutes les 12h", "Si besoin"];
// const durees = ["3 jours", "5 jours", "7 jours", "10 jours", "14 jours", "1 mois", "3 mois", "6 mois", "Chronique"];

// interface Prescription {
//   id: string;
//   dci: string;
//   commercial: string;
//   forme: string;
//   voie: string;
//   posologie: string;
//   frequence: string;
//   duree: string;
//   instructions: string;
//   alerte?: string;
// }

// const interactions: { [key: string]: string } = {
//   "Ibuprofène": "⚠️ Interaction avec Amlodipine — surveiller la tension",
//   "Metformine": "⚠️ Contre-indication si insuffisance rénale sévère",
// };

// export default function PrescriptionMedicamentsPage() {
//   const [search, setSearch] = useState("");
//   const [showDrop, setShowDrop] = useState(false);
//   const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
//   const [current, setCurrent] = useState<Partial<Prescription>>({});
//   const [selectedMed, setSelectedMed] = useState<typeof medicamentsList[0] | null>(null);
//   const [validated, setValidated] = useState(false);

//   const filtered = medicamentsList.filter(m =>
//     m.dci.toLowerCase().includes(search.toLowerCase()) ||
//     m.commercial.toLowerCase().includes(search.toLowerCase())
//   );

//   const selectMed = (m: typeof medicamentsList[0]) => {
//     setSelectedMed(m);
//     setCurrent(c => ({ ...c, dci: m.dci, commercial: m.commercial, alerte: interactions[m.dci] }));
//     setSearch(m.dci + " — " + m.commercial);
//     setShowDrop(false);
//   };

//   const addPrescription = () => {
//     if (!current.dci) return;
//     const p: Prescription = {
//       id: Date.now().toString(),
//       dci: current.dci || "",
//       commercial: current.commercial || "",
//       forme: current.forme || (selectedMed?.formes[0] || ""),
//       voie: current.voie || "Orale",
//       posologie: current.posologie || "",
//       frequence: current.frequence || "1x/j",
//       duree: current.duree || "7 jours",
//       instructions: current.instructions || "",
//       alerte: current.alerte,
//     };
//     setPrescriptions(prev => [...prev, p]);
//     setSelectedMed(null);
//     setCurrent({});
//     setSearch("");
//   };

//   const removePrescription = (id: string) => {
//     setPrescriptions(prev => prev.filter(p => p.id !== id));
//   };

//   return (
//     <div>
//       <Topbar title="Prescription Médicaments" subtitle="Patient : Diallo Ibrahim · Dossier N° 2024-0087" />
//       <div className="p-8 space-y-6">

//         {/* Alert */}
//         <div className="flex items-center gap-3 p-4 rounded-2xl"
//           style={{ background: "#fff7ed", border: "1.5px solid #fed7aa" }}>
//           <Shield size={20} color="#f97316" />
//           <div>
//             <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14, color: "#c2410c" }}>
//               Vérification automatique des interactions
//             </p>
//             <p style={{ fontSize: 13, color: "#9a3412" }}>
//               Le système vérifie les interactions, contre-indications et doses pédiatriques en temps réel
//             </p>
//           </div>
//           <div className="ml-auto flex items-center gap-2">
//             <CheckCircle size={16} color="#10b981" />
//             <span style={{ fontSize: 13, color: "#065f46", fontWeight: 600 }}>Vidal/Base Claude Bernard</span>
//           </div>
//         </div>

//         {/* Add prescription form */}
//         <div className="card-dpi p-6">
//           <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, marginBottom: 20, color: "var(--text-primary)" }}>
//             Ajouter un Médicament
//           </h3>

//           <div className="grid grid-cols-3 gap-4 mb-4">
//             {/* Search DCI */}
//             <div className="col-span-2 relative">
//               <label className="label-dpi">Médicament (DCI / Nom commercial)</label>
//               <div className="relative">
//                 <Search size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
//                 <input className="input-dpi" style={{ paddingLeft: 40 }}
//                   placeholder="Rechercher DCI ou commercial..."
//                   value={search}
//                   onChange={e => { setSearch(e.target.value); setShowDrop(true); }}
//                   onFocus={() => setShowDrop(true)}
//                 />
//               </div>
//               {showDrop && search && (
//                 <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-xl z-10"
//                   style={{ border: "1px solid var(--border)", maxHeight: 240, overflowY: "auto" }}>
//                   {filtered.map(m => (
//                     <div key={m.dci} onClick={() => selectMed(m)}
//                       className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-teal-50 transition-colors">
//                       <Pill size={16} color="var(--primary)" />
//                       <div>
//                         <p style={{ fontWeight: 600, fontSize: 14, color: "var(--text-primary)" }}>{m.dci}</p>
//                         <p style={{ fontSize: 12, color: "var(--text-muted)" }}>{m.commercial} · {m.classe}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Forme */}
//             <div>
//               <label className="label-dpi">Forme pharmaceutique</label>
//               <select className="input-dpi"
//                 value={current.forme || ""}
//                 onChange={e => setCurrent(c => ({ ...c, forme: e.target.value }))}>
//                 <option value="">Choisir...</option>
//                 {selectedMed?.formes.map(f => <option key={f}>{f}</option>)}
//               </select>
//             </div>
//           </div>

//           {/* Alert interaction */}
//           {current.alerte && (
//             <div className="flex items-center gap-2 p-3 rounded-xl mb-4"
//               style={{ background: "#fff7ed", border: "1.5px solid #fed7aa" }}>
//               <AlertTriangle size={16} color="#f97316" />
//               <span style={{ fontSize: 13, color: "#c2410c", fontWeight: 500 }}>{current.alerte}</span>
//             </div>
//           )}

//           <div className="grid grid-cols-4 gap-4 mb-4">
//             <div>
//               <label className="label-dpi">Posologie</label>
//               <input className="input-dpi" placeholder="Ex: 500mg"
//                 value={current.posologie || ""}
//                 onChange={e => setCurrent(c => ({ ...c, posologie: e.target.value }))} />
//             </div>
//             <div>
//               <label className="label-dpi">Voie d&apos;administration</label>
//               <select className="input-dpi"
//                 value={current.voie || "Orale"}
//                 onChange={e => setCurrent(c => ({ ...c, voie: e.target.value }))}>
//                 {voies.map(v => <option key={v}>{v}</option>)}
//               </select>
//             </div>
//             <div>
//               <label className="label-dpi">Fréquence</label>
//               <select className="input-dpi"
//                 value={current.frequence || "1x/j"}
//                 onChange={e => setCurrent(c => ({ ...c, frequence: e.target.value }))}>
//                 {frequences.map(f => <option key={f}>{f}</option>)}
//               </select>
//             </div>
//             <div>
//               <label className="label-dpi">Durée</label>
//               <select className="input-dpi"
//                 value={current.duree || "7 jours"}
//                 onChange={e => setCurrent(c => ({ ...c, duree: e.target.value }))}>
//                 {durees.map(d => <option key={d}>{d}</option>)}
//               </select>
//             </div>
//           </div>

//           <div className="mb-4">
//             <label className="label-dpi">Instructions particulières</label>
//             <input className="input-dpi" placeholder="Ex: Prendre pendant les repas, éviter l'alcool..."
//               value={current.instructions || ""}
//               onChange={e => setCurrent(c => ({ ...c, instructions: e.target.value }))} />
//           </div>

//           {/* Protocole rapide */}
//           <div className="mb-6">
//             <p style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 600, color: "var(--text-secondary)", marginBottom: 10 }}>
//               Protocoles préconfigurés
//             </p>
//             <div className="flex gap-2 flex-wrap">
//               {["Paludisme simple", "HTA stade 1", "Diabète type 2", "Angine bactérienne", "Douleur légère"].map(proto => (
//                 <button key={proto} className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
//                   style={{ background: "var(--primary-light)", color: "var(--primary)", border: "1px solid var(--primary-muted)" }}>
//                   {proto}
//                 </button>
//               ))}
//             </div>
//           </div>

//           <button onClick={addPrescription} className="btn-primary flex items-center gap-2">
//             <Plus size={16} /> Ajouter à l&apos;ordonnance
//           </button>
//         </div>

//         {/* Prescription list */}
//         {prescriptions.length > 0 && (
//           <div className="card-dpi p-6">
//             <div className="flex items-center justify-between mb-4">
//               <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, color: "var(--text-primary)" }}>
//                 Ordonnance ({prescriptions.length} médicament{prescriptions.length > 1 ? "s" : ""})
//               </h3>
//               <div className="flex gap-2">
//                 <span className="badge-info">En cours de rédaction</span>
//               </div>
//             </div>

//             <div className="space-y-3">
//               {prescriptions.map((p, idx) => (
//                 <div key={p.id} className="p-4 rounded-2xl flex items-start gap-4 transition-all"
//                   style={{ background: "var(--bg-main)", border: "1.5px solid var(--border)" }}>
//                   <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold text-sm"
//                     style={{ background: "var(--primary)", minWidth: 32 }}>
//                     {idx + 1}
//                   </div>
//                   <div className="flex-1">
//                     <div className="flex items-center gap-2 mb-1">
//                       <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, color: "var(--text-primary)" }}>
//                         {p.dci}
//                       </span>
//                       <span style={{ fontSize: 12, color: "var(--text-muted)" }}>({p.commercial})</span>
//                       {p.alerte && <AlertTriangle size={14} color="#f97316" />}
//                     </div>
//                     <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>
//                       {p.forme} · {p.posologie} · {p.voie} · {p.frequence} · {p.duree}
//                     </p>
//                     {p.instructions && (
//                       <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2, fontStyle: "italic" }}>
//                         {p.instructions}
//                       </p>
//                     )}
//                   </div>
//                   <button onClick={() => removePrescription(p.id)} className="mt-1">
//                     <X size={16} color="var(--text-muted)" />
//                   </button>
//                 </div>
//               ))}
//             </div>

//             {/* Validation pharmacist */}
//             <div className="mt-4 p-4 rounded-xl flex items-center gap-3"
//               style={{ background: "#d1fae5", border: "1px solid #6ee7b7" }}>
//               <CheckCircle size={18} color="#065f46" />
//               <div>
//                 <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14, color: "#065f46" }}>
//                   Validation pharmaceutique automatisée activée
//                 </p>
//                 <p style={{ fontSize: 12, color: "#047857" }}>
//                   Vérification des doses, interactions et contre-indications effectuée
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Save bar */}
//         <div className="flex justify-end gap-3">
//           <button className="btn-accent">Aperçu ordonnance</button>
//           <button className="btn-primary flex items-center gap-2"
//             onClick={() => setValidated(true)}>
//             <Save size={16} />
//             {validated ? "✓ Ordonnance validée" : "Valider et imprimer"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }











"use client";
// Route : app/dossier_medical/prescription_medicaments/page.tsx
// Liste des patients — module Prescription Médicaments

import { useState } from "react";
import Link from "next/link";
import Topbar from "@/components/Topbar";

 
import { Search, Pill, AlertTriangle, ChevronRight, Calendar } from "lucide-react";
import { patients } from "@/lib/patient";
import { prescriptionMedsHistory } from "@/lib/history";


const statutConfig = {
  Hospitalisé: { bg: "#dbeafe", color: "#1e40af" },
  Urgent:      { bg: "#fee2e2", color: "#991b1b" },
  Ambulatoire: { bg: "#d1fae5", color: "#065f46" },
  Sorti:       { bg: "#f1f5f9", color: "#475569" },
};

const prescStatut: Record<string, { bg: string; color: string }> = {
  "En cours":   { bg: "#dbeafe", color: "#1e40af" },
  "Validée":    { bg: "#d1fae5", color: "#065f46" },
  "Terminée":   { bg: "#f1f5f9", color: "#475569" },
  "Suspendue":  { bg: "#fee2e2", color: "#991b1b" },
};

const FILTERS = ["Tous", "Hospitalisé", "Urgent", "Ambulatoire", "Sorti"] as const;

export default function PrescriptionMedsListPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<typeof FILTERS[number]>("Tous");

  const filtered = patients.filter((p) => {
    const m = `${p.nom} ${p.prenom} ${p.id} ${p.medecin}`.toLowerCase().includes(search.toLowerCase());
    return m && (filter === "Tous" || p.statut === filter);
  });

  const lastPresc = (id: string) => prescriptionMedsHistory[id]?.[0] ?? null;
  const count = (id: string) => prescriptionMedsHistory[id]?.length ?? 0;
  const medCount = (id: string) => prescriptionMedsHistory[id]?.[0]?.medicaments.length ?? 0;
  const avatarBg = (s: string) => s === "Urgent" ? "#ef4444" : s === "Hospitalisé" ? "#3b82f6" : "var(--primary)";

  return (
    <div>
      <Topbar title="Prescription Médicaments" subtitle="Sélectionnez un patient pour accéder à ses prescriptions" />
      <div className="p-8">

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total patients",  value: patients.length, color: "var(--primary)" },
            { label: "Prescriptions actives", value: patients.filter(p => prescriptionMedsHistory[p.id]?.[0]?.statut === "En cours").length, color: "#3b82f6" },
            { label: "Avec allergies",  value: patients.filter(p => p.allergies.length > 0).length, color: "#f97316" },
            { label: "Urgents",         value: patients.filter(p => p.statut === "Urgent").length, color: "#ef4444" },
          ].map((s) => (
            <div key={s.label} className="card-dpi p-5 flex items-center gap-4">
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ background: s.color + "18" }}>
                <Pill size={20} color={s.color} />
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
            const sc   = last ? (prescStatut[last.statut] ?? prescStatut["Terminée"]) : null;

            return (
              <Link key={patient.id} href={`/dossier_medical/prescription_medicaments/${patient.id}`} className="block">
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

                  {/* Dernière ordonnance */}
                  <div style={{ minWidth: 220 }}>
                    <p style={{ fontSize: 12, color: "var(--text-muted)" }}>Dernière ordonnance</p>
                    {last ? (
                      <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>
                        {medCount(patient.id)} médicament{medCount(patient.id) > 1 ? "s" : ""}
                        {last.notes && <span style={{ color: "var(--text-muted)", fontWeight: 400 }}> — {last.notes.slice(0, 30)}…</span>}
                      </p>
                    ) : (
                      <p style={{ fontSize: 13, color: "var(--text-muted)" }}>Aucune prescription</p>
                    )}
                  </div>

                  {/* Date */}
                  {last && (
                    <div className="flex items-center gap-1" style={{ minWidth: 110 }}>
                      <Calendar size={12} color="var(--primary)" />
                      <span style={{ fontSize: 12, fontWeight: 600, color: "var(--primary)" }}>
                        {new Date(last.date).toLocaleDateString("fr-FR")}
                      </span>
                    </div>
                  )}

                  {/* Count ordonnances */}
                  <div className="text-center" style={{ minWidth: 72 }}>
                    <p style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22, color: "var(--primary)", lineHeight: 1 }}>
                      {count(patient.id)}
                    </p>
                    <p style={{ fontSize: 11, color: "var(--text-muted)" }}>ordonnance{count(patient.id) > 1 ? "s" : ""}</p>
                  </div>

                  {/* Presc statut */}
                  {sc && (
                    <div className="px-3 py-1 rounded-xl text-xs font-bold"
                      style={{ background: sc.bg, color: sc.color, whiteSpace: "nowrap" }}>
                      {last?.statut}
                    </div>
                  )}

                  {/* Patient statut */}
                  <div className="px-3 py-1.5 rounded-xl text-xs font-bold"
                    style={{ background: cfg.bg, color: cfg.color, whiteSpace: "nowrap" }}>
                    {patient.statut}
                  </div>

                  {/* Allerg */}
                  {patient.allergies.length > 0 && (
                    <div className="flex items-center gap-1 px-2 py-1 rounded-lg" style={{ background: "#fff7ed" }}>
                      <AlertTriangle size={12} color="#f97316" />
                      <span style={{ fontSize: 11, color: "#c2410c", fontWeight: 600 }}>
                        {patient.allergies.length} allergie{patient.allergies.length > 1 ? "s" : ""}
                      </span>
                    </div>
                  )}

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