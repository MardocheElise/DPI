//  "use client";

// import { useState } from "react";
// import {
//   ChevronRight, User, Heart, AlertTriangle, Pill, Phone,
//   Edit, Camera, Droplets, Activity, FileText, Plus, X
// } from "lucide-react";
// import Topbar from "@/components/Topbar";

// const mockProfile = {
//   id: "DPI-2024-0891",
//   nom: "KOUASSI",
//   prenom: "Adjoua Marie",
//   dateNaissance: "14/03/1985",
//   age: 40,
//   sexe: "Féminin",
//   ins: "185036901234567",
//   adresse: "Cocody Riviera 3, Abidjan",
//   telephone: "+225 07 87 56 34 12",
//   email: "adjoua.kouassi@email.com",
//   medecin: "Dr. Konan Éric",
//   groupeSanguin: "A+",
//   allergies: ["Pénicilline", "Aspirine", "Arachides"],
//   contreIndications: ["AINS", "Bêta-bloquants"],
//   antecedentsPerso: [
//     { type: "Diabète type 2", date: "2018", statut: "Chronique" },
//     { type: "HTA", date: "2020", statut: "Contrôlé" },
//     { type: "Appendicectomie", date: "2005", statut: "Résolu" },
//   ],
//   antecedentsFamiliaux: [
//     { parent: "Mère", pathologie: "Diabète type 2" },
//     { parent: "Père", pathologie: "HTA, Cardiopathie" },
//     { parent: "Frère", pathologie: "Asthme" },
//   ],
//   traitements: [
//     { medicament: "Metformine 500mg", posologie: "2x/jour", duree: "Continu" },
//     { medicament: "Amlodipine 5mg", posologie: "1x/jour matin", duree: "Continu" },
//     { medicament: "Paracétamol 1g", posologie: "Si douleur", duree: "Si besoin" },
//   ],
//   urgences: [
//     { nom: "Kouassi Jean-Baptiste", lien: "Époux", tel: "+225 05 12 34 56 78" },
//     { nom: "Bamba Adjoua Irène", lien: "Sœur", tel: "+225 07 98 76 54 32" },
//   ],
// };

// type TabKey = "synthese" | "antecedents" | "traitements" | "urgences";

// export default function ProfilPatientPage() {
//   const [activeTab, setActiveTab] = useState<TabKey>("synthese");
//   const [editMode, setEditMode] = useState(false);

//   const tabs = [
//     { key: "synthese" as TabKey, label: "Vue synthétique", icon: Activity },
//     { key: "antecedents" as TabKey, label: "Antécédents", icon: FileText },
//     { key: "traitements" as TabKey, label: "Traitements", icon: Pill },
//     { key: "urgences" as TabKey, label: "Contacts urgences", icon: Phone },
//   ];

//   return (
//     <>
//       <Topbar title="Profil patient" />
//       <div className="p-6 space-y-6">
//         {/* Breadcrumb */}
//         <div className="flex items-center gap-2 text-sm text-slate-400">
//           <span>Gestion Administrative</span>
//           <ChevronRight className="w-3 h-3" />
//           <span className="text-teal-600 font-medium">Profil patient</span>
//         </div>

//         {/* Patient header card */}
//         <div className="card">
//           <div className="flex items-start gap-5">
//             {/* Avatar */}
//             <div className="relative flex-shrink-0">
//               <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-400 to-teal-700 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
//                 {mockProfile.prenom[0]}{mockProfile.nom[0]}
//               </div>
//               <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full border-2 border-teal-500 flex items-center justify-center shadow-sm hover:bg-teal-50 transition-colors">
//                 <Camera className="w-3 h-3 text-teal-600" />
//               </button>
//             </div>

//             {/* Info principale */}
//             <div className="flex-1">
//               <div className="flex items-start justify-between">
//                 <div>
//                   <h2 className="text-xl font-bold text-slate-800">{mockProfile.prenom} {mockProfile.nom}</h2>
//                   <p className="text-sm text-slate-500">{mockProfile.age} ans • {mockProfile.sexe} • Né(e) le {mockProfile.dateNaissance}</p>
//                   <div className="flex items-center gap-2 mt-2 flex-wrap">
//                     <span className="badge-approved">{mockProfile.id}</span>
//                     <span className="badge-info">INS: {mockProfile.ins}</span>
//                     <span className="badge-pending">{mockProfile.medecin}</span>
//                   </div>
//                 </div>
//                 <button
//                   onClick={() => setEditMode(!editMode)}
//                   className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
//                     editMode ? "bg-teal-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
//                   }`}
//                 >
//                   <Edit className="w-3.5 h-3.5" />
//                   {editMode ? "Sauvegarder" : "Modifier"}
//                 </button>
//               </div>

//               {/* Quick info row */}
//               <div className="grid grid-cols-4 gap-3 mt-4">
//                 {[
//                   { label: "Groupe sanguin", value: mockProfile.groupeSanguin, color: "bg-red-50 text-red-700 border-red-200", icon: Droplets },
//                   { label: "Allergies", value: `${mockProfile.allergies.length} connues`, color: "bg-amber-50 text-amber-700 border-amber-200", icon: AlertTriangle },
//                   { label: "Traitements", value: `${mockProfile.traitements.length} en cours`, color: "bg-blue-50 text-blue-700 border-blue-200", icon: Pill },
//                   { label: "Téléphone", value: mockProfile.telephone, color: "bg-teal-50 text-teal-700 border-teal-200", icon: Phone },
//                 ].map((item) => (
//                   <div key={item.label} className={`px-3 py-2.5 rounded-xl border ${item.color} flex items-center gap-2`}>
//                     <item.icon className="w-4 h-4 flex-shrink-0" />
//                     <div>
//                       <p className="text-xs opacity-70">{item.label}</p>
//                       <p className="text-xs font-bold">{item.value}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Tabs */}
//         <div className="flex gap-1 bg-white p-1.5 rounded-2xl shadow-sm border border-slate-100 w-fit">
//           {tabs.map((tab) => (
//             <button
//               key={tab.key}
//               onClick={() => setActiveTab(tab.key)}
//               className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
//                 activeTab === tab.key ? "bg-teal-600 text-white shadow-sm" : "text-slate-500 hover:bg-slate-50"
//               }`}
//             >
//               <tab.icon className="w-4 h-4" />
//               {tab.label}
//             </button>
//           ))}
//         </div>

//         {/* Tab: Synthèse */}
//         {activeTab === "synthese" && (
//           <div className="grid grid-cols-2 gap-4">
//             {/* Identité */}
//             <div className="card">
//               <h3 className="section-title flex items-center gap-2">
//                 <User className="w-4 h-4 text-teal-600" />Identité complète
//               </h3>
//               <div className="space-y-2.5">
//                 {[
//                   { label: "Nom complet", value: `${mockProfile.prenom} ${mockProfile.nom}` },
//                   { label: "Date de naissance", value: `${mockProfile.dateNaissance} (${mockProfile.age} ans)` },
//                   { label: "Sexe", value: mockProfile.sexe },
//                   { label: "INS", value: mockProfile.ins },
//                   { label: "Adresse", value: mockProfile.adresse },
//                   { label: "Téléphone", value: mockProfile.telephone },
//                   { label: "Email", value: mockProfile.email },
//                   { label: "Médecin traitant", value: mockProfile.medecin },
//                 ].map((item) => (
//                   <div key={item.label} className="flex justify-between py-2 border-b border-slate-50 last:border-0">
//                     <span className="text-xs text-slate-400 font-medium">{item.label}</span>
//                     <span className="text-xs text-slate-700 font-semibold text-right max-w-[55%]">{item.value}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Allergies & Contre-indications */}
//             <div className="space-y-4">
//               <div className="card">
//                 <h3 className="section-title flex items-center gap-2">
//                   <AlertTriangle className="w-4 h-4 text-amber-500" />Allergies & Contre-indications
//                 </h3>
//                 <div className="mb-3">
//                   <p className="text-xs font-semibold text-slate-500 mb-2">ALLERGIES CONNUES</p>
//                   <div className="flex flex-wrap gap-2">
//                     {mockProfile.allergies.map((a) => (
//                       <span key={a} className="px-3 py-1.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-1">
//                         <AlertTriangle className="w-3 h-3" />{a}
//                         {editMode && <X className="w-3 h-3 ml-1 cursor-pointer hover:text-red-900" />}
//                       </span>
//                     ))}
//                     {editMode && (
//                       <button className="px-3 py-1.5 rounded-xl border-2 border-dashed border-red-300 text-red-400 text-xs font-medium flex items-center gap-1 hover:bg-red-50">
//                         <Plus className="w-3 h-3" /> Ajouter
//                       </button>
//                     )}
//                   </div>
//                 </div>
//                 <div>
//                   <p className="text-xs font-semibold text-slate-500 mb-2">CONTRE-INDICATIONS</p>
//                   <div className="flex flex-wrap gap-2">
//                     {mockProfile.contreIndications.map((ci) => (
//                       <span key={ci} className="px-3 py-1.5 rounded-xl bg-orange-50 border border-orange-200 text-orange-700 text-xs font-semibold">
//                         {ci}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               {/* Groupe sanguin */}
//               <div className="card flex items-center gap-4">
//                 <div className="w-16 h-16 rounded-2xl bg-red-50 border-2 border-red-200 flex items-center justify-center flex-shrink-0">
//                   <span className="text-2xl font-black text-red-600">{mockProfile.groupeSanguin}</span>
//                 </div>
//                 <div>
//                   <p className="text-sm font-semibold text-slate-700">Groupe sanguin</p>
//                   <p className="text-xs text-slate-400">Rhésus positif (+)</p>
//                   <div className="flex items-center gap-1 mt-1">
//                     <Droplets className="w-3 h-3 text-red-500" />
//                     <span className="text-xs text-red-600 font-medium">Compatible: O+, O-, A+, A-</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Tab: Antécédents */}
//         {activeTab === "antecedents" && (
//           <div className="grid grid-cols-2 gap-4">
//             <div className="card">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="section-title mb-0 flex items-center gap-2">
//                   <Heart className="w-4 h-4 text-teal-600" />Antécédents personnels
//                 </h3>
//                 <button className="btn-primary text-xs py-1.5 flex items-center gap-1"><Plus className="w-3 h-3" /> Ajouter</button>
//               </div>
//               <div className="space-y-2">
//                 {mockProfile.antecedentsPerso.map((a, i) => (
//                   <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-teal-50 transition-colors">
//                     <div className="w-2 h-2 rounded-full bg-teal-500 flex-shrink-0" />
//                     <div className="flex-1">
//                       <p className="text-sm font-semibold text-slate-700">{a.type}</p>
//                       <p className="text-xs text-slate-400">Depuis {a.date}</p>
//                     </div>
//                     <span className={`text-xs px-2 py-1 rounded-lg font-medium ${
//                       a.statut === "Chronique" ? "bg-orange-100 text-orange-700" :
//                       a.statut === "Contrôlé" ? "bg-blue-100 text-blue-700" : "badge-approved"
//                     }`}>{a.statut}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div className="card">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="section-title mb-0">Antécédents familiaux</h3>
//                 <button className="btn-primary text-xs py-1.5 flex items-center gap-1"><Plus className="w-3 h-3" /> Ajouter</button>
//               </div>
//               <div className="space-y-2">
//                 {mockProfile.antecedentsFamiliaux.map((a, i) => (
//                   <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">
//                     <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center text-teal-600 font-bold text-xs flex-shrink-0">
//                       {a.parent[0]}
//                     </div>
//                     <div>
//                       <p className="text-xs font-bold text-slate-600">{a.parent}</p>
//                       <p className="text-xs text-slate-500">{a.pathologie}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Tab: Traitements */}
//         {activeTab === "traitements" && (
//           <div className="card">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="section-title mb-0 flex items-center gap-2">
//                 <Pill className="w-4 h-4 text-teal-600" />Traitements en cours avant hospitalisation
//               </h3>
//               <button className="btn-primary text-xs py-1.5 flex items-center gap-1"><Plus className="w-3 h-3" /> Ajouter</button>
//             </div>
//             <div className="space-y-2">
//               {mockProfile.traitements.map((t, i) => (
//                 <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-teal-200 hover:bg-teal-50 transition-all">
//                   <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
//                     <Pill className="w-5 h-5 text-blue-600" />
//                   </div>
//                   <div className="flex-1">
//                     <p className="font-semibold text-slate-800 text-sm">{t.medicament}</p>
//                     <p className="text-xs text-slate-500">{t.posologie}</p>
//                   </div>
//                   <span className={`text-xs px-3 py-1 rounded-lg font-medium ${t.duree === "Continu" ? "bg-teal-100 text-teal-700" : "bg-slate-100 text-slate-600"}`}>
//                     {t.duree}
//                   </span>
//                   {editMode && <button className="w-7 h-7 rounded-lg hover:bg-red-50 flex items-center justify-center"><X className="w-3.5 h-3.5 text-red-400" /></button>}
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Tab: Urgences */}
//         {activeTab === "urgences" && (
//           <div className="card">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="section-title mb-0 flex items-center gap-2">
//                 <Phone className="w-4 h-4 text-teal-600" />Contacts d&apos;urgence
//               </h3>
//               <button className="btn-primary text-xs py-1.5 flex items-center gap-1"><Plus className="w-3 h-3" /> Ajouter</button>
//             </div>
//             <div className="grid grid-cols-2 gap-3">
//               {mockProfile.urgences.map((u, i) => (
//                 <div key={i} className="p-4 rounded-xl border border-slate-100 hover:border-teal-200 transition-colors">
//                   <div className="flex items-center gap-3 mb-2">
//                     <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-bold text-sm">
//                       {u.nom.split(" ").map(n => n[0]).join("").slice(0, 2)}
//                     </div>
//                     <div>
//                       <p className="font-semibold text-slate-800 text-sm">{u.nom}</p>
//                       <span className="badge-info text-xs">{u.lien}</span>
//                     </div>
//                   </div>
//                   <a href={`tel:${u.tel}`} className="flex items-center gap-2 text-teal-600 hover:text-teal-700 text-sm font-medium">
//                     <Phone className="w-3.5 h-3.5" /> {u.tel}
//                   </a>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }




















"use client";

import { useState } from "react";
import Link from "next/link";
import Topbar from "@/components/Topbar";

import {
  Search, UserPlus, ChevronRight, AlertTriangle,
  Droplets, Pill, Phone, Eye, Filter, Users,
  BedDouble, Activity, Stethoscope,
} from "lucide-react";
import { getAllPatients, Patient, searchPatients } from "@/lib/patient";


const statusConfig: Record<string, { label: string; class: string }> = {
  Hospitalisé: { label: "Hospitalisé", class: "badge-approved" },
  Ambulatoire: { label: "Ambulatoire", class: "badge-info" },
  Sorti:       { label: "Sorti",       class: "bg-slate-100 text-slate-600 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold" },
  Urgent:      { label: "Urgent",      class: "badge-danger" },
};
// statutFilter retiré "Ambulatoire",
const statutFilters = ["Tous", "Hospitalisé", "Sorti", "Urgent"];

export default function ProfilPatientListPage() {
  const allPatients = getAllPatients();
  const [query, setQuery] = useState("");
  const [filterStatut, setFilterStatut] = useState("Tous");

  const filtered = (query ? searchPatients(query) : allPatients).filter(
    (p) => filterStatut === "Tous" || p.statut === filterStatut
  );

  const stats = [
    { label: "Total patients",    value: allPatients.length,                                               icon: Users,       bg: "bg-teal-50",   color: "text-teal-600" },
    { label: "Hospitalisés",      value: allPatients.filter((p) => p.statut === "Hospitalisé").length,    icon: BedDouble,   bg: "bg-emerald-50",color: "text-emerald-600" },
    // { label: "Ambulatoires",      value: allPatients.filter((p) => p.statut === "Ambulatoire").length,    icon: Activity,    bg: "bg-blue-50",   color: "text-blue-600" },
    { label: "Cas urgents",       value: allPatients.filter((p) => p.statut === "Urgent").length,         icon: AlertTriangle, bg: "bg-red-50",  color: "text-red-600" },
  ];

  return (
    <>
      <Topbar title="Profils patients" />
      <div className="p-6 space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-slate-400 mb-1">
              <span>Gestion Administrative</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-teal-600 font-medium">Profil patient</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-800">Liste des patients</h1>
          </div>
          <Link href="/Gestion_administrative/admission" className="btn-primary flex items-center gap-2">
            <UserPlus className="w-4 h-4" /> Nouveau patient
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-3">
          {stats.map((s) => (
            <div key={s.label} className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl ${s.bg} border border-white`}>
              <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shadow-sm flex-shrink-0">
                <s.icon className={`w-4 h-4 ${s.color}`} />
              </div>
              <div>
                <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
                <p className="text-xs text-slate-500 font-medium">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="card">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Rechercher par nom, prénom, INS, N° dossier, médecin..."
                className="input-field pl-10"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <div className="flex gap-1">
                {statutFilters.map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilterStatut(f)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                      filterStatut === f
                        ? "bg-teal-600 text-white border-teal-600"
                        : "bg-white text-slate-500 border-slate-200 hover:border-teal-300"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
            <span className="text-xs text-slate-400 font-medium ml-auto">
              {filtered.length} résultat{filtered.length > 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {/* Patient list */}
        <div className="card p-0 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                {/* retiré de la liste "Service / Médecin", "Alertes médicales" */}
                {["Patient", "N° Dossier / INS", "Admission", "Statut", ""].map((h) => (
                  <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((patient) => (
                <PatientRow key={patient.id} patient={patient} />
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <Stethoscope className="w-10 h-10 text-slate-200 mx-auto mb-3" />
              <p className="text-slate-400 font-medium">Aucun patient trouvé</p>
              <p className="text-xs text-slate-300 mt-1">Modifiez votre recherche ou créez un nouveau dossier</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function PatientRow({ patient }: { patient: Patient }) {
  const initials = `${patient.prenom[0]}${patient.nom[0]}`;
  const cfg = statusConfig[patient.statut];

  return (
    <tr className="border-b border-slate-50 hover:bg-teal-50/40 transition-colors group">
      {/* Patient */}
      <td className="py-3.5 px-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-teal-700 flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-sm">
            {initials}
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800">{patient.prenom} {patient.nom}</p>
            <p className="text-xs text-slate-400">{patient.sexe} • {patient.age} ans</p>
          </div>
        </div>
      </td>

      {/* Dossier / INS */}
      <td className="py-3.5 px-4">
        <p className="text-xs font-mono font-semibold text-teal-700">{patient.id}</p>
        <p className="text-xs text-slate-400 mt-0.5">INS: {patient.ins}</p>
      </td>

      {/* Service / Médecin */}
      {/* <td className="py-3.5 px-4">
        <p className="text-xs font-semibold text-slate-700">
          {patient.hospitalisation?.service ?? "—"}
          {patient.hospitalisation && (
            <span className="text-slate-400 font-normal"> • {patient.hospitalisation.lit}</span>
          )}
        </p>
        <p className="text-xs text-slate-400 mt-0.5">{patient.medecin}</p>
      </td> */}

      {/* Alertes */}
      {/* <td className="py-3.5 px-4">
        <div className="flex flex-wrap gap-1">
          {patient.allergies.length > 0 && (
            <span className="flex items-center gap-0.5 px-2 py-0.5 rounded-lg bg-red-50 text-red-600 text-xs font-semibold">
              <AlertTriangle className="w-3 h-3" />
              {patient.allergies.length} allergie{patient.allergies.length > 1 ? "s" : ""}
            </span>
          )}
          {patient.traitements.length > 0 && (
            <span className="flex items-center gap-0.5 px-2 py-0.5 rounded-lg bg-blue-50 text-blue-600 text-xs font-semibold">
              <Pill className="w-3 h-3" />
              {patient.traitements.length} traitement{patient.traitements.length > 1 ? "s" : ""}
            </span>
          )}
          {patient.allergies.length === 0 && patient.traitements.length === 0 && (
            <span className="text-xs text-slate-300">—</span>
          )}
        </div>
      </td> */}

      {/* Date admission */}
      <td className="py-3.5 px-4">
        <p className="text-xs text-slate-600">{patient.dateAdmission}</p>
        {/* <p className="text-xs text-slate-400">{patient.assurance}</p> */}
      </td>

      {/* Statut */}
      <td className="py-3.5 px-4">
        <span className={cfg.class}>{cfg.label}</span>
      </td>

      {/* Action */}
      <td className="py-3.5 px-4">
        <Link
          href={`/Gestion_administrative/profil_patient/${patient.id}`}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-50 text-teal-600 hover:bg-teal-100 text-xs font-semibold transition-colors opacity-0 group-hover:opacity-100"
        >
          <Eye className="w-3.5 h-3.5" /> Voir profil
        </Link>
      </td>
    </tr>
  );
}