// Route : /app/resultats_examen/autres_examens/page.tsx
"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Microscope, Activity, Wind, Dna, Heart, ChevronDown, ChevronUp,
  CheckCircle2, Clock, AlertTriangle, Download, Pen, ArrowLeft,
} from "lucide-react";
import { getPatientById } from "@/lib/patient";
 


const typeConfig: Record<OtherExamType, { icon: React.ElementType; color: string; bgColor: string; label: string }> = {
  ecg: { icon: Heart, color: "text-red-600", bgColor: "bg-red-100", label: "ECG" },
  efr: { icon: Wind, color: "text-blue-600", bgColor: "bg-blue-100", label: "EFR" },
  anapath: { icon: Microscope, color: "text-purple-600", bgColor: "bg-purple-100", label: "Anapath" },
  genetique: { icon: Dna, color: "text-emerald-600", bgColor: "bg-emerald-100", label: "Génétique" },
};

const borderColors: Record<OtherExamType, string> = {
  ecg: "border-l-red-400",
  efr: "border-l-blue-400",
  anapath: "border-l-purple-400",
  genetique: "border-l-emerald-400",
};

function EcgWave() {
  return (
    <svg viewBox="0 0 400 80" className="w-full h-16" preserveAspectRatio="none">
      <polyline
        points="0,40 30,40 40,40 50,20 60,60 70,15 80,65 90,40 120,40 130,40 140,40 150,20 160,60 170,15 180,65 190,40 220,40 230,40 240,40 250,20 260,60 270,15 280,65 290,40 320,40 330,40 340,40 350,20 360,60 370,15 380,65 390,40 400,40"
        fill="none"
        stroke="#0d9488"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function EfrChart() {
  const bars = [
    { label: "CV", value: 78, color: "bg-teal-400" },
    { label: "VEMS", value: 80, color: "bg-teal-400" },
    { label: "DEP", value: 72, color: "bg-amber-400" },
  ];
  return (
    <div className="flex items-end gap-6 h-24 pt-2">
      {bars.map((b) => (
        <div key={b.label} className="flex-1 flex flex-col items-center gap-1">
          <span className="text-[10px] font-semibold text-slate-600">{b.value}%</span>
          <div className="w-full bg-slate-100 rounded-t-lg relative" style={{ height: "60px" }}>
            <div className="absolute bottom-0 w-full rounded-t-lg" style={{ height: `${b.value}%` }}>
              <div className={`w-full h-full rounded-t-lg ${b.color}`} />
            </div>
            <div className="absolute left-0 right-0 border-t-2 border-dashed border-emerald-500" style={{ bottom: "70%" }} />
          </div>
          <span className="text-[9px] text-slate-500">{b.label}</span>
        </div>
      ))}
    </div>
  );
}

export default function AutresExamensPage() {
  const searchParams = useSearchParams();
  const patientId = searchParams.get("patient") ?? "";
  const patient = getPatientById(patientId);
  const exams = patient?.examens?.autresExamens ?? [];

  const [expandedId, setExpandedId] = useState<string | null>(exams[0]?.id ?? null);
  const [filterType, setFilterType] = useState<"tous" | OtherExamType>("tous");

  const filtered = exams.filter(
    (e) => filterType === "tous" || e.type === filterType
  );

  const typesPresents = Array.from(new Set(exams.map((e) => e.type))) as OtherExamType[];

  if (!patient) {
    return (
      <main className="min-h-screen bg-[#e8f4f8] p-6 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-10 text-center shadow-sm">
          <p className="text-slate-600 font-medium">Patient non trouvé</p>
          <Link href="/resultats_examen" className="text-teal-600 text-sm mt-2 inline-block hover:underline">
            ← Retour
          </Link>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-[#e8f4f8] p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <Link
            href="/resultats_examen"
            className="w-9 h-9 rounded-xl bg-white shadow-sm flex items-center justify-center hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-slate-600" />
          </Link>
          <div className="w-10 h-10 rounded-2xl bg-teal-600 flex items-center justify-center shadow-lg">
            <Microscope className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800">Autres Examens</h1>
            <p className="text-xs text-slate-500">
              {patient.nom} {patient.prenom} · {patient.id} · ECG · EFR · Anatomopathologie · Génétique
            </p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white text-sm rounded-xl hover:bg-teal-700 transition-colors shadow-sm">
          <Download className="w-4 h-4" />
          Exporter
        </button>
      </div>

      {/* Patient banner */}
      <div className="bg-white rounded-2xl p-3.5 mb-5 shadow-sm flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
          {patient.nom[0]}{patient.prenom[0]}
        </div>
        <div className="flex-1">
          <p className="font-semibold text-slate-800">{patient.nom} {patient.prenom}</p>
          <p className="text-xs text-slate-400">
            {patient.age} ans · {patient.sexe} · {patient.groupeSanguin} ·{" "}
            {patient.hospitalisation
              ? `${patient.hospitalisation.service} — Lit ${patient.hospitalisation.lit}`
              : patient.statut}
          </p>
        </div>
        <span className="text-xs text-slate-500">{exams.length} examen{exams.length > 1 ? "s" : ""}</span>
      </div>

      {/* Type filters */}
      <div className="flex gap-2 mb-5 flex-wrap">
        <button
          onClick={() => setFilterType("tous")}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            filterType === "tous" ? "bg-teal-600 text-white shadow-sm" : "bg-white text-slate-600 hover:bg-slate-50"
          }`}
        >
          Tous ({exams.length})
        </button>
        {typesPresents.map((key) => {
          const cfg = typeConfig[key];
          const count = exams.filter((e) => e.type === key).length;
          return (
            <button
              key={key}
              onClick={() => setFilterType(key)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                filterType === key ? "bg-teal-600 text-white shadow-sm" : "bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              <cfg.icon className="w-3.5 h-3.5" />
              {cfg.label} ({count})
            </button>
          );
        })}
      </div>

      {exams.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
          <Microscope className="w-10 h-10 text-slate-200 mx-auto mb-3" />
          <p className="text-slate-500">Aucun autre examen pour ce patient</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((exam) => {
            const cfg = typeConfig[exam.type];
            const isExpanded = expandedId === exam.id;

            return (
              <div
                key={exam.id}
                className={`bg-white rounded-2xl shadow-sm overflow-hidden border-l-4 ${borderColors[exam.type]}`}
              >
                <div
                  className="flex items-center gap-4 p-4 cursor-pointer hover:bg-slate-50 transition-colors"
                  onClick={() => setExpandedId(isExpanded ? null : exam.id)}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${cfg.bgColor}`}>
                    <cfg.icon className={`w-5 h-5 ${cfg.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-slate-800 text-sm">{exam.label}</p>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${cfg.bgColor} ${cfg.color}`}>
                        {cfg.label}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {exam.service} · {exam.date}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {exam.status === "valide" ? (
                      <span className="flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" /> Validé
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                        <Clock className="w-3 h-3" /> En attente
                      </span>
                    )}
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-4 pb-4 border-t border-slate-50">
                    <div className="pt-4 space-y-4">
                      {/* Visualisation spécifique */}
                      {exam.type === "ecg" && (
                        <div className="bg-slate-900 rounded-2xl p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Activity className="w-3.5 h-3.5 text-teal-400" />
                            <span className="text-xs text-teal-400 font-medium">
                              Tracé ECG · 25 mm/s · 10 mm/mV
                            </span>
                          </div>
                          <EcgWave />
                          <div className="flex justify-between mt-1">
                            {["I", "II", "III", "aVR", "aVL", "aVF"].map((d) => (
                              <span key={d} className="text-[8px] text-slate-500">{d}</span>
                            ))}
                          </div>
                        </div>
                      )}
                      {exam.type === "efr" && (
                        <div className="bg-slate-50 rounded-2xl p-4">
                          <p className="text-xs font-semibold text-slate-600 mb-2">
                            Spirométrie — % du théorique
                          </p>
                          <EfrChart />
                          <div className="flex items-center gap-4 mt-2">
                            <div className="flex items-center gap-1.5">
                              <div className="w-2 h-2 rounded-full bg-teal-400" />
                              <span className="text-[9px] text-slate-500">Normal (≥70%)</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <div className="w-2 h-2 rounded-full bg-amber-400" />
                              <span className="text-[9px] text-slate-500">Abaissé</span>
                            </div>
                          </div>
                        </div>
                      )}
                      {exam.type === "anapath" && (
                        <div className="bg-purple-50 rounded-2xl p-3.5 flex items-center gap-3">
                          <AlertTriangle className="w-4 h-4 text-purple-500 flex-shrink-0" />
                          <p className="text-xs text-purple-700 font-medium">
                            Examen anatomopathologique · Analyse microscopique
                          </p>
                        </div>
                      )}
                      {exam.type === "genetique" && (
                        <div className="bg-emerald-50 rounded-2xl p-3.5 flex items-center gap-3">
                          <Dna className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                          <p className="text-xs text-emerald-700 font-medium">
                            Analyse génétique moléculaire
                          </p>
                        </div>
                      )}

                      {/* Conclusion */}
                      <div className="bg-teal-50 rounded-xl p-3.5 border border-teal-100">
                        <p className="text-[11px] text-teal-700 font-semibold uppercase tracking-wide mb-1.5">
                          Conclusion
                        </p>
                        <p className="text-sm text-slate-700 leading-relaxed">{exam.result}</p>
                      </div>

                      {/* Details */}
                      {Object.keys(exam.details).length > 0 && (
                        <div className="grid grid-cols-3 gap-2">
                          {Object.entries(exam.details).map(([k, v]) => (
                            <div key={k} className="bg-slate-50 rounded-xl p-2.5">
                              <p className="text-[10px] text-slate-400 mb-0.5">{k}</p>
                              <p className="text-xs font-semibold text-slate-700">{v}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Validation */}
                      {exam.doctor && exam.status === "valide" && (
                        <div className="flex items-center gap-2 bg-teal-50 rounded-xl px-3 py-2.5">
                          <Pen className="w-3.5 h-3.5 text-teal-600" />
                          <p className="text-xs text-teal-700">
                            Signé par{" "}
                            <span className="font-semibold">{exam.doctor}</span>
                          </p>
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 ml-auto" />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}