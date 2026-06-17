// "use client";

// import Link from "next/link";
// import {
//   FlaskConical,
//   ImageIcon,
//   Microscope,
//   ArrowRight,
//   TrendingUp,
//   AlertTriangle,
//   CheckCircle2,
//   Clock,
// } from "lucide-react";
// import Topbar from "@/components/Topbar";

// const categories = [
//   {
//     href: "/resultats_examen/biologie",
//     icon: FlaskConical,
//     title: "Résultats Biologie",
//     description: "Compte-rendus biologiques, valeurs LOINC, alertes critiques et graphiques d'évolution",
//     color: "teal",
//     badge: "esante.gouv",
//     features: ["CR Biologie", "Valeurs normales", "Alertes critiques", "Graphiques évolution"],
//     stats: { total: 12, critical: 2, pending: 3 },
//   },
//   {
//     href: "/resultats_examen/imagerie",
//     icon: ImageIcon,
//     title: "Résultats Imagerie",
//     description: "Comptes-rendus imagerie, visualisation DICOM intégrée, outils zoom et mesure",
//     color: "blue",
//     badge: "esante.gouv",
//     features: ["CR Imagerie", "Viewer DICOM", "Radiologue", "Urgences"],
//     stats: { total: 8, critical: 1, pending: 2 },
//   },
//   {
//     href: "/resultats_examen/autres_examens",
//     icon: Microscope,
//     title: "Autres Examens",
//     description: "ECG, épreuves fonctionnelles respiratoires, anatomopathologie et génétique",
//     color: "yellow",
//     badge: null,
//     features: ["ECG", "EFR", "Anatomopathologie", "Génétique"],
//     stats: { total: 5, critical: 0, pending: 1 },
//   },
// ];

// const recentResults = [
//   { label: "NFS complète", type: "Biologie", date: "Aujourd'hui 09:30", status: "critique", value: "Hb: 6.2 g/dL" },
//   { label: "Radio Thorax", type: "Imagerie", date: "Aujourd'hui 08:15", status: "normal", value: "RAS" },
//   { label: "Glycémie à jeun", type: "Biologie", date: "Hier 14:00", status: "anormal", value: "7.8 mmol/L" },
//   { label: "ECG 12 dérivations", type: "Autre", date: "Hier 10:45", status: "normal", value: "Rythme sinusal" },
//   { label: "Scanner thoracique", type: "Imagerie", date: "22/05 11:00", status: "en_attente", value: "En lecture" },
// ];

// const statusConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
//   critique: { label: "Critique", color: "bg-red-100 text-red-700 border-red-200", icon: AlertTriangle },
//   anormal: { label: "Anormal", color: "bg-amber-100 text-amber-700 border-amber-200", icon: AlertTriangle },
//   normal: { label: "Normal", color: "bg-emerald-100 text-emerald-700 border-emerald-200", icon: CheckCircle2 },
//   en_attente: { label: "En attente", color: "bg-slate-100 text-slate-600 border-slate-200", icon: Clock },
// };

// export default function ResultatsExamenPage() {
//   return (
//      <>
//        <Topbar title="Resultats d'Examens" />
//        <div className="p-6 space-y-6">
//                {/* Header */}
//                <div className="mb-8">
//                <div className="flex items-center gap-3 mb-2">
//                     <div className="w-10 h-10 rounded-2xl bg-teal-600 flex items-center justify-center shadow-lg">
//                     <FlaskConical className="w-5 h-5 text-white" />
//                     </div>
//                     <div>
//                     <h1 className="text-2xl font-bold text-slate-800">Résultats Examens</h1>
//                     {/* <p className="text-sm text-slate-500">DPI Patient</p> */}
//                     </div>
//                </div>
//                </div>

//                {/* Summary stats */}
//                <div className="grid grid-cols-4 gap-4 mb-8">
//                {[
//                     { label: "Total examens", value: "25", icon: FlaskConical, color: "teal" },
//                     { label: "Critiques", value: "3", icon: AlertTriangle, color: "red" },
//                     { label: "En attente", value: "6", icon: Clock, color: "amber" },
//                     { label: "Validés", value: "16", icon: CheckCircle2, color: "emerald" },
//                ].map((stat) => (
//                     <div key={stat.label} className="bg-white rounded-2xl p-4 shadow-sm border border-white">
//                     <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${
//                     stat.color === "teal" ? "bg-teal-100" :
//                     stat.color === "red" ? "bg-red-100" :
//                     stat.color === "amber" ? "bg-amber-100" : "bg-emerald-100"
//                     }`}>
//                     <stat.icon className={`w-4 h-4 ${
//                          stat.color === "teal" ? "text-teal-600" :
//                          stat.color === "red" ? "text-red-600" :
//                          stat.color === "amber" ? "text-amber-600" : "text-emerald-600"
//                     }`} />
//                     </div>
//                     <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
//                     <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
//                     </div>
//                ))}
//                </div>

//                {/* Categories */}
//                <div className="grid grid-cols-3 gap-5 mb-8">
//                {categories.map((cat) => (
//                     <Link key={cat.href} href={cat.href}>
//                     <div className="bg-white rounded-2xl p-5 shadow-sm border border-white hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group h-full">
//                          <div className="flex items-start justify-between mb-4">
//                               <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${
//                               cat.color === "teal" ? "bg-teal-100" :
//                               cat.color === "blue" ? "bg-blue-100" : "bg-amber-100"
//                               }`}>
//                               <cat.icon className={`w-5 h-5 ${
//                                    cat.color === "teal" ? "text-teal-600" :
//                                    cat.color === "blue" ? "text-blue-600" : "text-amber-600"
//                               }`} />
//                               </div>
//                               {cat.badge && (
//                               <span className="text-[10px] bg-teal-50 text-teal-700 border border-teal-200 px-2 py-0.5 rounded-full font-medium">
//                                    {cat.badge}
//                               </span>
//                               )}
//                          </div>

//                          <h3 className="font-semibold text-slate-800 mb-1.5">{cat.title}</h3>
//                          <p className="text-xs text-slate-500 leading-relaxed mb-4">{cat.description}</p>

//                          <div className="flex flex-wrap gap-1.5 mb-4">
//                               {cat.features.map((f) => (
//                               <span key={f} className="text-[10px] bg-slate-50 text-slate-600 px-2 py-0.5 rounded-lg border border-slate-100">
//                                    {f}
//                               </span>
//                               ))}
//                          </div>

//                          <div className="flex items-center justify-between pt-3 border-t border-slate-50">
//                               <div className="flex gap-3">
//                               <span className="text-xs text-slate-500"><span className="font-semibold text-slate-800">{cat.stats.total}</span> examens</span>
//                               {cat.stats.critical > 0 && (
//                                    <span className="text-xs text-red-500"><span className="font-semibold">{cat.stats.critical}</span> critiques</span>
//                               )}
//                               </div>
//                               <ArrowRight className="w-4 h-4 text-teal-600 group-hover:translate-x-1 transition-transform" />
//                          </div>
//                     </div>
//                     </Link>
//                ))}
//                </div>

//                {/* Recent results */}
//                <div className="bg-white rounded-2xl shadow-sm border border-white p-5">
//                <div className="flex items-center justify-between mb-4">
//                     <h2 className="font-semibold text-slate-800 flex items-center gap-2">
//                     <TrendingUp className="w-4 h-4 text-teal-600" />
//                     Résultats récents
//                     </h2>
//                     <span className="text-xs text-teal-600 font-medium">Tous les résultats →</span>
//                </div>

//                <div className="space-y-2">
//                     {recentResults.map((r, i) => {
//                     const s = statusConfig[r.status];
//                     return (
//                     <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors">
//                          <div className="flex items-center gap-3">
//                          <div className="w-8 h-8 bg-teal-50 rounded-xl flex items-center justify-center">
//                               <FlaskConical className="w-3.5 h-3.5 text-teal-600" />
//                          </div>
//                          <div>
//                               <p className="text-sm font-medium text-slate-800">{r.label}</p>
//                               <p className="text-xs text-slate-400">{r.type} · {r.date}</p>
//                          </div>
//                          </div>
//                          <div className="flex items-center gap-3">
//                          <span className="text-sm font-medium text-slate-600">{r.value}</span>
//                          <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${s.color}`}>
//                               {s.label}
//                          </span>
//                          </div>
//                     </div>
//                     );
//                     })}
//                </div>
//                </div>
//        </div>
//      </>
//   );
// }













"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FlaskConical,
  ImageIcon,
  Microscope,
  AlertTriangle,
  Search,
  User,
  ArrowRight,
} from "lucide-react";
 
import Topbar from "@/components/Topbar";
import { getAllPatients, Patient } from "@/lib/patient";


const statutConfig: Record<string, { color: string; bg: string }> = {
  Hospitalisé: { color: "text-blue-700", bg: "bg-blue-50 border-blue-200" },
  Ambulatoire: { color: "text-teal-700", bg: "bg-teal-50 border-teal-200" },
  Urgent: { color: "text-red-700", bg: "bg-red-50 border-red-200" },
  Sorti: { color: "text-slate-600", bg: "bg-slate-50 border-slate-200" },
};

function getPatientExamSummary(patient: Patient) {
  const bio = patient.examens?.biologie?.results ?? [];
  const img = patient.examens?.imagerie ?? [];
  const autres = patient.examens?.autresExamens ?? [];
  const critiques = bio.filter((r) => r.criticity === "critique").length;
  const anormaux = bio.filter((r) => r.criticity === "anormal").length;
  const total = bio.length + img.length + autres.length;
  return { bio: bio.length, img: img.length, autres: autres.length, critiques, anormaux, total };
}

export default function ResultatsExamenPage() {
  const [search, setSearch] = useState("");
  const allPatients = getAllPatients();

  const filtered = allPatients
    .filter((p) => {
      const q = search.toLowerCase();
      return (
        p.nom.toLowerCase().includes(q) ||
        p.prenom.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q) ||
        p.medecin.toLowerCase().includes(q)
      );
    })
    .filter((p) => getPatientExamSummary(p).total > 0);

  const totalCritiques = allPatients.reduce(
    (acc, p) => acc + getPatientExamSummary(p).critiques,
    0
  );

  return (
    <>
      <Topbar title="Résultats d'Examens" />
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-2xl bg-teal-600 flex items-center justify-center shadow-lg">
              <FlaskConical className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Résultats Examens</h1>
              <p className="text-sm text-slate-500">
                Sélectionnez un patient pour consulter ses résultats
              </p>
            </div>
          </div>
        </div>

        {/* Global stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            {
              label: "Patients avec examens",
              value: filtered.length,
              icon: User,
              color: "teal",
            },
            {
              label: "Valeurs critiques",
              value: totalCritiques,
              icon: AlertTriangle,
              color: "red",
            },
            {
              label: "Analyses biologie",
              value: allPatients.reduce(
                (a, p) => a + (p.examens?.biologie?.results?.length ?? 0),
                0
              ),
              icon: FlaskConical,
              color: "blue",
            },
            {
              label: "Examens imagerie",
              value: allPatients.reduce(
                (a, p) => a + (p.examens?.imagerie?.length ?? 0),
                0
              ),
              icon: ImageIcon,
              color: "emerald",
            },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl p-4 shadow-sm">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${
                  s.color === "teal"
                    ? "bg-teal-100"
                    : s.color === "red"
                    ? "bg-red-100"
                    : s.color === "blue"
                    ? "bg-blue-100"
                    : "bg-emerald-100"
                }`}
              >
                <s.icon
                  className={`w-4 h-4 ${
                    s.color === "teal"
                      ? "text-teal-600"
                      : s.color === "red"
                      ? "text-red-600"
                      : s.color === "blue"
                      ? "text-blue-600"
                      : "text-emerald-600"
                  }`}
                />
              </div>
              <p className="text-2xl font-bold text-slate-800">{s.value}</p>
              <p className="text-xs text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Alert critiques */}
        {totalCritiques > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-5 flex items-center gap-3">
            <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" />
            <p className="text-sm text-red-800 font-medium">
              {totalCritiques} valeur(s) critique(s) sur l&apos;ensemble des patients · Vérification
              urgente requise
            </p>
          </div>
        )}

        {/* Search */}
        <div className="bg-white rounded-2xl p-3.5 shadow-sm mb-5 flex items-center gap-3">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Rechercher un patient (nom, ID, médecin)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="text-xs text-slate-400 hover:text-slate-600"
            >
              Effacer
            </button>
          )}
        </div>

        {/* Patient cards */}
        <div className="space-y-3">
          {filtered.map((patient) => {
            const summary = getPatientExamSummary(patient);
            const sc = statutConfig[patient.statut] ?? statutConfig.Ambulatoire;

            return (
              <div
                key={patient.id}
                className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-200 group"
              >
                {/* Patient header */}
                <div className="flex items-center gap-4 p-4 border-b border-slate-50">
                  <div className="w-11 h-11 rounded-2xl bg-teal-600 flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
                    {patient.nom[0]}
                    {patient.prenom[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-bold text-slate-800">
                        {patient.nom} {patient.prenom}
                      </p>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold ${sc.bg} ${sc.color}`}
                      >
                        {patient.statut}
                      </span>
                      {summary.critiques > 0 && (
                        <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-red-100 border border-red-200 text-red-700 font-semibold">
                          <AlertTriangle className="w-2.5 h-2.5" />
                          {summary.critiques} critique{summary.critiques > 1 ? "s" : ""}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="text-xs text-slate-400">{patient.id}</span>
                      <span className="text-slate-200">·</span>
                      <span className="text-xs text-slate-400">{patient.medecin}</span>
                      <span className="text-slate-200">·</span>
                      <span className="text-xs text-slate-400">
                        {patient.age} ans · {patient.sexe}
                      </span>
                    </div>
                  </div>
                  {patient.hospitalisation && (
                    <div className="text-right text-xs text-slate-400 hidden md:block">
                      <p className="font-medium text-slate-600">
                        {patient.hospitalisation.service}
                      </p>
                      <p>Lit {patient.hospitalisation.lit}</p>
                    </div>
                  )}
                </div>

                {/* Exam modules */}
                <div className="grid grid-cols-3 divide-x divide-slate-50">
                  {[
                    {
                      href: `/resultats_examen/biologie?patient=${patient.id}`,
                      icon: FlaskConical,
                      label: "Biologie",
                      count: summary.bio,
                      critiques: summary.critiques,
                      color: "teal",
                      available: summary.bio > 0,
                    },
                    {
                      href: `/resultats_examen/imagerie?patient=${patient.id}`,
                      icon: ImageIcon,
                      label: "Imagerie",
                      count: summary.img,
                      critiques: 0,
                      color: "blue",
                      available: summary.img > 0,
                    },
                    {
                      href: `/resultats_examen/autres_examens?patient=${patient.id}`,
                      icon: Microscope,
                      label: "Autres examens",
                      count: summary.autres,
                      critiques: 0,
                      color: "purple",
                      available: summary.autres > 0,
                    },
                  ].map((mod) =>
                    mod.available ? (
                      <Link key={mod.label} href={mod.href}>
                        <div className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors cursor-pointer group/mod">
                          <div
                            className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                              mod.color === "teal"
                                ? "bg-teal-100"
                                : mod.color === "blue"
                                ? "bg-blue-100"
                                : "bg-purple-100"
                            }`}
                          >
                            <mod.icon
                              className={`w-4 h-4 ${
                                mod.color === "teal"
                                  ? "text-teal-600"
                                  : mod.color === "blue"
                                  ? "text-blue-600"
                                  : "text-purple-600"
                              }`}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-slate-700">{mod.label}</p>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <span className="text-[11px] text-slate-400">
                                {mod.count} résultat{mod.count > 1 ? "s" : ""}
                              </span>
                              {mod.critiques > 0 && (
                                <span className="text-[10px] text-red-600 font-semibold">
                                  · ⚠ {mod.critiques} critique{mod.critiques > 1 ? "s" : ""}
                                </span>
                              )}
                            </div>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover/mod:text-teal-500 group-hover/mod:translate-x-0.5 transition-all" />
                        </div>
                      </Link>
                    ) : (
                      <div
                        key={mod.label}
                        className="flex items-center gap-3 px-4 py-3 opacity-40"
                      >
                        <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center">
                          <mod.icon className="w-4 h-4 text-slate-400" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-500">{mod.label}</p>
                          <p className="text-[11px] text-slate-400">Aucun résultat</p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
              <FlaskConical className="w-10 h-10 text-slate-200 mx-auto mb-3" />
              <p className="text-slate-500 font-medium">Aucun patient trouvé</p>
              <p className="text-slate-400 text-sm mt-1">Modifiez votre recherche</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}