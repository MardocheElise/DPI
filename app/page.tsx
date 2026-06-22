// "use client";

// import Topbar from "@/components/Topbar";
// import { Users, Bed, FileText, Activity, TrendingUp, AlertTriangle, CheckCircle2, Clock } from "lucide-react";

// const stats = [
//   { label: "Patients admis", value: "142", change: "+8 aujourd'hui", icon: Users, color: "teal" },
//   { label: "Lits occupés", value: "89/120", change: "74% d'occupation", icon: Bed, color: "blue" },
//   { label: "Dossiers actifs", value: "318", change: "+12 cette semaine", icon: FileText, color: "purple" },
//   { label: "Sorties prévues", value: "23", change: "Aujourd'hui", icon: Activity, color: "amber" },
// ];

// const recentAdmissions = [
//   { name: "Kouassi Adjoua Marie", dossier: "DPI-2024-0891", service: "Cardiologie", status: "Hospitalisé", time: "08:30" },
//   { name: "Traoré Moussa", dossier: "DPI-2024-0892", service: "Urgences", status: "En attente", time: "09:15" },
//   { name: "Bamba Fatou", dossier: "DPI-2024-0893", service: "Pédiatrie", status: "Hospitalisé", time: "10:00" },
//   { name: "Koné Adama", dossier: "DPI-2024-0894", service: "Chirurgie", status: "Sortie", time: "11:20" },
// ];

// export default function Home() {
//   return (
//     <>
//       <Topbar title="Tableau de bord" />
//       <div className="p-6 space-y-6">
//         {/* Page header */}
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-2xl font-bold text-slate-800">Tableau de bord</h1>
//             <p className="text-slate-500 text-sm mt-0.5">Mardi 3 juin 2025 • Vue d&apos;ensemble</p>
//           </div>
//           <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-xl">
//             <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
//             <span className="text-sm font-medium text-emerald-700">Système actif</span>
//           </div>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-4 gap-4">
//           {stats.map((stat) => (
//             <div key={stat.label} className="card hover:shadow-md transition-shadow">
//               <div className="flex items-start justify-between mb-3">
//                 <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center">
//                   <stat.icon className="w-5 h-5 text-teal-600" />
//                 </div>
//                 <TrendingUp className="w-4 h-4 text-emerald-500" />
//               </div>
//               <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
//               <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
//               <p className="text-xs text-teal-600 font-medium mt-1">{stat.change}</p>
//             </div>
//           ))}
//         </div>

//         {/* Alerts + Recent */}
//         <div className="grid grid-cols-3 gap-4">
//           {/* Alerts */}
//           <div className="card">
//             <h3 className="section-title flex items-center gap-2">
//               <AlertTriangle className="w-4 h-4 text-amber-500" />
//               Alertes du jour
//             </h3>
//             <div className="space-y-3">
//               {[
//                 { msg: "Patient Koné: allergie pénicilline", type: "danger", time: "08:12" },
//                 { msg: "Lit 14B: désinfection requise", type: "warning", time: "09:30" },
//                 { msg: "Résultats labo en attente (3)", type: "info", time: "10:45" },
//               ].map((a, i) => (
//                 <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-50">
//                   <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${a.type === "danger" ? "bg-red-500" : a.type === "warning" ? "bg-amber-500" : "bg-blue-500"}`} />
//                   <div className="flex-1 min-w-0">
//                     <p className="text-xs text-slate-700">{a.msg}</p>
//                     <p className="text-xs text-slate-400 mt-0.5">{a.time}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Recent admissions */}
//           <div className="card col-span-2">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="section-title mb-0">Admissions récentes</h3>
//               <button className="text-xs text-teal-600 font-medium hover:underline">Voir tout →</button>
//             </div>
//             <div className="space-y-2">
//               {recentAdmissions.map((p, i) => (
//                 <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
//                   <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
//                     {p.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <p className="text-sm font-semibold text-slate-800 truncate">{p.name}</p>
//                     <p className="text-xs text-slate-500">{p.dossier} • {p.service}</p>
//                   </div>
//                   <div className="text-right flex-shrink-0">
//                     <span className={p.status === "Hospitalisé" ? "badge-approved" : p.status === "En attente" ? "badge-pending" : "badge-info"}>
//                       {p.status}
//                     </span>
//                     <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1 justify-end">
//                       <Clock className="w-3 h-3" />{p.time}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }








"use client";

import Link from "next/link";
import {
  Users,
  FlaskConical,
  Stethoscope,
  FolderHeart,
  ArrowRight,
  Activity,
  BedDouble,
  AlertTriangle,
  CheckCircle2,
  UserRound,
  Receipt
} from "lucide-react";

const modules = [
{
  href: "/accueil/patients",
  label: "Accueil",
  description: "Profil patient, paiement et référencement",
  icon: UserRound,
  // teal #0d9488
  color: "from-[#0d9488] to-[#0f766e]",
  lightColor: "bg-teal-50 border-teal-200",
  textColor: "text-teal-700",
  // stat: "3 sous-modules",
  tags: ["Paiement", "Profil", "Référencement"],
},
{
  href: "/caisse/paiement-en-attente",
  label: "Caisse",
  description: "Paiement en attente/réglé, bilan caisse et vue caissier",
  icon: Receipt,
  // cyan #0CB2DA
  color: "from-[#0CB2DA] to-[#0891b2]",
  lightColor: "bg-cyan-50 border-cyan-200",
  textColor: "text-cyan-700",
  // stat: "3 sous-modules",
  tags: ["Paiement", "Caisse", "Vue caissier"],
},
{
  href: "/infirmerie",
  label: "Infirmerie",
  description: "Prise de constantes, consultations",
  icon: Activity,
  // indigo #6367EF
  color: "from-[#6367EF] to-[#4f46e5]",
  lightColor: "bg-indigo-50 border-indigo-200",
  textColor: "text-indigo-700",
  tags: ["Consultation", "Constantes"],
},
{
  href: "/medecine-generale/patient-a-consulter",
  label: "Médecine Générale",
  description: "Consultations, hospitalisation, ordonnance, examens...",
  icon: Stethoscope,
  // coral #F26161
  color: "from-[#F26161] to-[#dc2626]",
  lightColor: "bg-rose-50 border-rose-200",
  textColor: "text-rose-600",
  tags: ["Consultation", "Hospitalisation"],
},
{
  href: "/dossier_medical",
  label: "Dossier Médical",
  description: "Consultations, prescriptions, observations cliniques et suivi médical complet",
  icon: FolderHeart,
  // green #23C756
  color: "from-[#23C756] to-[#16a34a]",
  lightColor: "bg-green-50 border-green-200",
  textColor: "text-green-700",
  stat: "318 dossiers actifs",
  tags: ["Consultations", "Prescriptions", "Observations"],
},

// {
//     href: "/Gestion_administrative",
//     label: "Gestion Administrative",
//     description: "Admission, profil patient, hospitalisation et gestion des dossiers administratifs",
//     icon: ClipboardList,
//     color: "from-teal-500 to-teal-700",
//     lightColor: "bg-teal-50 border-teal-200",
//     textColor: "text-teal-700",
//     stat: "3 sous-modules",
//     tags: ["Admission", "Profil", "Hospitalisation"],
// },
// {
//   href: "/collaboration_team",
//   label: "Équipe soignante",
//   description: "Coordination de l'équipe médicale, affectations, planning et communication",
//   icon: Users,
//   color: "from-blue-500 to-blue-700",
//   lightColor: "bg-blue-50 border-blue-200",
//   textColor: "text-blue-700",
//   stat: "24 praticiens actifs",
//   tags: ["Médecins", "Infirmiers", "Planning"],
// },
// {
//   href: "/doc_tracabilite",
//   label: "Doc & Traçabilité",
//   description: "Gestion documentaire, traçabilité des actes et archivage des comptes-rendus",
//   icon: FileSearch,
//   color: "from-violet-500 to-violet-700",
//   lightColor: "bg-violet-50 border-violet-200",
//   textColor: "text-violet-700",
//   stat: "1 248 documents",
//   tags: ["Comptes-rendus", "Archivage", "Traçabilité"],
// },

// {
//   href: "/resultats_examen",
//   label: "Résultats d'examens",
//   description: "Biologie, imagerie, anatomopathologie et interprétation des résultats",
//   icon: FlaskConical,
//   color: "from-amber-500 to-amber-600",
//   lightColor: "bg-amber-50 border-amber-200",
//   textColor: "text-amber-700",
//   stat: "47 en attente",
//   tags: ["Biologie", "Imagerie", "Anapath"],
// },
// {
//   href: "/securite_conformite",
//   label: "Sécurité & Conformité",
//   description: "Gestion des accès, audit, conformité RGPD et sécurité des données patients",
//   icon: Shield,
//   color: "from-rose-500 to-rose-700",
//   lightColor: "bg-rose-50 border-rose-200",
//   textColor: "text-rose-700",
//   stat: "Conformité 98%",
//   tags: ["Accès", "Audit", "RGPD"],
// },
];

const quickStats = [
  { label: "Patients admis", value: "142", icon: Users, color: "text-teal-600", bg: "bg-teal-50" },
  { label: "Lits occupés", value: "89/120", icon: BedDouble, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Examens en attente", value: "47", icon: FlaskConical, color: "text-amber-600", bg: "bg-amber-50" },
  { label: "Alertes actives", value: "3", icon: AlertTriangle, color: "text-rose-600", bg: "bg-rose-50" },
];

export default function HomePage() {
  return (
    <div className="p-6 space-y-8">
      {/* Hero */}
      <div className="flex items-center justify-between">
        <div>
          {/* <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Système actif</span>
          </div> */}
          <h1 className="text-3xl font-extrabold text-slate-800 leading-tight">
            Bienvenue sur le <span className="text-teal-600">DPI Clinique</span>
          </h1>
          <p className="text-slate-500 mt-1.5 text-sm max-w-xl">
            Dossier Patient Informatisé — Sélectionnez un module pour commencer votre session de travail.
          </p>
        </div>
        <div className="flex items-center gap-3 px-5 py-3 bg-white rounded-2xl border border-slate-100 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-bold shadow-sm">
            DM
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800">Dr. Martin</p>
            <p className="text-xs text-slate-400">Administrateur • Mardi 3 juin 2025</p>
          </div>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-4 gap-3">
        {quickStats.map((s) => (
          <div key={s.label} className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl ${s.bg} border border-white`}>
            <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shadow-sm flex-shrink-0">
              <s.icon className={`w-4 h-4 ${s.color}`} />
            </div>
            <div>
              <p className={`text-xl font-black ${s.color}`}>{s.value}</p>
              <p className="text-xs text-slate-500 font-medium leading-tight">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modules grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-slate-700">Modules disponibles</h2>
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            6 modules actifs
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {modules.map((mod) => (
            <Link key={mod.href} href={mod.href} className="group block">
              <div className="bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                {/* Icon + label */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${mod.color} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    <mod.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-xl border ${mod.lightColor} ${mod.textColor}`}>
                    {mod.stat}
                  </span>
                </div>

                {/* Text */}
                <h3 className="font-bold text-slate-800 text-base mb-1.5 leading-tight group-hover:text-teal-700 transition-colors">
                  {mod.label}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed flex-1 mb-4">
                  {mod.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {mod.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-slate-100 rounded-lg text-xs text-slate-500 font-medium">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className={`flex items-center gap-1.5 text-sm font-semibold ${mod.textColor} group-hover:gap-3 transition-all duration-200`}>
                  <Activity className="w-3.5 h-3.5" />
                  Accéder au module
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}