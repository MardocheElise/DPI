"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ImageIcon, ZoomIn, ZoomOut, Move, Maximize2, AlertTriangle,
  CheckCircle2, Clock, Calendar, Pen, Download, Search, Filter,
  ChevronRight, ArrowLeft,
} from "lucide-react";
import { ExamPriority, ExamStatus, getPatientById, ImageExam } from "@/components/lib/patient";
import Topbar from "@/components/Topbar";


const priorityConfig: Record<ExamPriority, { label: string; color: string }> = {
  urgente: { label: "Urgente", color: "bg-red-100 text-red-700 border-red-200" },
  normale: { label: "Normale", color: "bg-slate-100 text-slate-600 border-slate-200" },
  differee: { label: "Différée", color: "bg-blue-100 text-blue-600 border-blue-200" },
};

const statusConfig: Record<ExamStatus, { label: string; color: string; icon: React.ElementType }> = {
  valide: { label: "Validé", color: "text-emerald-700 bg-emerald-50", icon: CheckCircle2 },
  en_attente: { label: "En attente", color: "text-amber-700 bg-amber-50", icon: Clock },
};

const typeColors: Record<string, string> = {
  TDM: "bg-purple-100 text-purple-700",
  RX: "bg-teal-100 text-teal-700",
  ECHO: "bg-blue-100 text-blue-700",
  IRM: "bg-indigo-100 text-indigo-700",
  SCINTI: "bg-orange-100 text-orange-700",
  PET: "bg-pink-100 text-pink-700",
};

function DicomViewer({ exam }: { exam: ImageExam }) {
  const [zoom, setZoom] = useState(100);
  const [tool, setTool] = useState<"zoom" | "move">("zoom");
  return (
    <div className="bg-black rounded-2xl overflow-hidden">
      <div className="bg-slate-900 px-4 py-2 flex items-center gap-3">
        <span className="text-white text-xs font-semibold">{exam.label}</span>
        <span className="text-slate-400 text-xs">
          · {exam.type} {exam.slices > 0 ? `· ${exam.slices} coupes` : ""}
        </span>
        <div className="ml-auto flex items-center gap-2">
          {[{ id: "zoom" as const, icon: ZoomIn }, { id: "move" as const, icon: Move }].map((t) => (
            <button
              key={t.id}
              onClick={() => setTool(t.id)}
              className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                tool === t.id ? "bg-teal-600" : "bg-slate-700 hover:bg-slate-600"
              }`}
            >
              <t.icon className="w-3.5 h-3.5 text-white" />
            </button>
          ))}
          <button onClick={() => setZoom(Math.min(200, zoom + 25))} className="w-7 h-7 rounded-lg bg-slate-700 hover:bg-slate-600 flex items-center justify-center">
            <ZoomIn className="w-3.5 h-3.5 text-white" />
          </button>
          <button onClick={() => setZoom(Math.max(50, zoom - 25))} className="w-7 h-7 rounded-lg bg-slate-700 hover:bg-slate-600 flex items-center justify-center">
            <ZoomOut className="w-3.5 h-3.5 text-white" />
          </button>
          <span className="text-slate-400 text-xs w-10 text-center">{zoom}%</span>
          <Maximize2 className="w-3.5 h-3.5 text-slate-400" />
        </div>
      </div>
      <div className="relative bg-black h-52 flex items-center justify-center overflow-hidden">
        <div className="relative transition-transform duration-200" style={{ transform: `scale(${zoom / 100})` }}>
          <svg width="200" height="160" viewBox="0 0 200 160" className="opacity-80">
            <ellipse cx="100" cy="80" rx="90" ry="70" fill="none" stroke="#334155" strokeWidth="2" />
            {[20, 35, 50, 65, 80, 95, 110].map((y, i) => (
              <ellipse key={i} cx="100" cy={y + 20} rx={60 - i * 3} ry="6" fill="none" stroke="#1e3a5f" strokeWidth="1.5" opacity="0.6" />
            ))}
            <ellipse cx="65" cy="80" rx="32" ry="45" fill="none" stroke="#0d9488" strokeWidth="1.5" opacity="0.7" />
            <ellipse cx="135" cy="80" rx="32" ry="45" fill="none" stroke="#0d9488" strokeWidth="1.5" opacity="0.7" />
            <ellipse cx="90" cy="85" rx="18" ry="22" fill="#1e3a5f" stroke="#334155" strokeWidth="1" opacity="0.8" />
            <rect x="96" y="20" width="8" height="120" rx="2" fill="#1e3a5f" opacity="0.9" />
          </svg>
          <div className="absolute top-8 left-6 w-16 h-px bg-yellow-400 opacity-70">
            <span className="absolute -top-4 left-0 text-yellow-400 text-[9px]">Mesure</span>
          </div>
        </div>
        <div className="absolute top-2 left-2 text-[9px] text-slate-400 font-mono leading-relaxed">
          <div>W:1500 L:-600</div>
          <div>2.0mm · {exam.type}</div>
        </div>
        <div className="absolute bottom-2 right-2 text-[9px] text-slate-500 font-mono">
          Zoom: {zoom}% · {exam.date}
        </div>
      </div>
    </div>
  );
}

export default function ImagériePage() {
  const searchParams = useSearchParams();
  const patientId = searchParams.get("patient") ?? "";
  const patient = getPatientById(patientId);
  const exams = patient?.examens?.imagerie ?? [];

  const [selectedId, setSelectedId] = useState<string>(exams[0]?.id ?? "");
  const [search, setSearch] = useState("");
  const [filterPriority, setFilterPriority] = useState("Toutes");
  const [showViewer, setShowViewer] = useState(false);

  const selectedExam = exams.find((e) => e.id === selectedId);
  const filtered = exams.filter((e) => {
    const matchSearch =
      e.label.toLowerCase().includes(search.toLowerCase()) ||
      e.type.toLowerCase().includes(search.toLowerCase());
    const matchPriority = filterPriority === "Toutes" || e.priority === filterPriority;
    return matchSearch && matchPriority;
  });

  const urgentes = exams.filter((e) => e.priority === "urgente").length;

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
    <>
      <Topbar title="Résultats Imagerie" />
      <div className="p-6 space-y-6">
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
              <ImageIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800">Résultats Imagerie</h1>
              <p className="text-xs text-slate-500">
                {patient.nom} {patient.prenom} · {patient.id} · {patient.medecin}
              </p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white text-sm rounded-xl hover:bg-teal-700 transition-colors shadow-sm">
            <Download className="w-4 h-4" />
            Exporter CR
          </button>
        </div>

        {/* Patient banner */}
        <div className="bg-white rounded-2xl p-3.5 mb-4 shadow-sm flex items-center gap-4">
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
          <div className="text-right text-xs text-slate-500">
            <p>{exams.length} examen{exams.length > 1 ? "s" : ""} d&apos;imagerie</p>
            {urgentes > 0 && <p className="text-red-600 font-semibold">{urgentes} urgente{urgentes > 1 ? "s" : ""}</p>}
          </div>
        </div>

        {urgentes > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-3.5 mb-4 flex items-center gap-3">
            <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" />
            <p className="text-sm text-red-700 font-medium">
              {urgentes} examen(s) priorité urgente · Lecture immédiate requise
            </p>
          </div>
        )}

        {exams.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
            <ImageIcon className="w-10 h-10 text-slate-200 mx-auto mb-3" />
            <p className="text-slate-500">Aucun examen d&apos;imagerie pour ce patient</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-5">
            {/* List */}
            <div className="space-y-3">
              <div className="bg-white rounded-2xl p-3 shadow-sm flex flex-col gap-2">
                <div className="flex items-center gap-2 bg-slate-50 rounded-xl px-3 py-2">
                  <Search className="w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Rechercher..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="w-3.5 h-3.5 text-slate-400" />
                  <select
                    value={filterPriority}
                    onChange={(e) => setFilterPriority(e.target.value)}
                    className="flex-1 text-xs bg-slate-50 border border-slate-100 rounded-lg px-2 py-1.5 text-slate-600 outline-none"
                  >
                    {["Toutes", "urgente", "normale", "differee"].map((p) => <option key={p}>{p}</option>)}
                  </select>
                </div>
              </div>

              {filtered.map((e) => {
                const s = statusConfig[e.status];
                const p = priorityConfig[e.priority];
                const isSelected = selectedId === e.id;
                return (
                  <div
                    key={e.id}
                    onClick={() => { setSelectedId(e.id); setShowViewer(false); }}
                    className={`bg-white rounded-2xl p-3.5 shadow-sm cursor-pointer transition-all duration-200 border-l-4 ${
                      isSelected ? "border-l-teal-500 ring-2 ring-teal-100" : "border-l-transparent hover:border-l-slate-200"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${typeColors[e.type] || "bg-slate-100 text-slate-600"}`}>
                        {e.type}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${p.color}`}>
                        {p.label}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-slate-800 leading-tight mb-1">{e.label}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span className="text-[11px] text-slate-400">{e.date}</span>
                      </div>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${s.color}`}>{s.label}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Detail */}
            <div className="col-span-2 space-y-4">
              {selectedExam && (
                <>
                  {selectedExam.slices > 0 && (
                    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                      <div className="flex items-center justify-between p-4 border-b border-slate-50">
                        <h3 className="font-semibold text-slate-800 text-sm">Visualisation DICOM</h3>
                        <button
                          onClick={() => setShowViewer(!showViewer)}
                          className="flex items-center gap-1.5 text-xs text-teal-600 font-medium hover:text-teal-700"
                        >
                          {showViewer ? "Masquer" : "Ouvrir le viewer"}
                          <ChevronRight className={`w-3.5 h-3.5 transition-transform ${showViewer ? "rotate-90" : ""}`} />
                        </button>
                      </div>
                      {showViewer && (
                        <div className="p-4">
                          <DicomViewer exam={selectedExam} />
                          <p className="text-xs text-slate-400 mt-2 text-center">
                            Viewer simulé · {selectedExam.slices} coupes · Outils: zoom, mesure, déplacement
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="bg-white rounded-2xl shadow-sm p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-slate-800">{selectedExam.label}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${typeColors[selectedExam.type]}`}>
                            {selectedExam.type}
                          </span>
                          <span className="text-xs text-slate-400">{selectedExam.service}</span>
                          <span className="text-xs text-slate-400">· {selectedExam.date}</span>
                        </div>
                      </div>
                      <span className={`text-[10px] px-2 py-1 rounded-full border font-semibold ${priorityConfig[selectedExam.priority].color}`}>
                        {priorityConfig[selectedExam.priority].label}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div className="bg-slate-50 rounded-xl p-3.5">
                        <p className="text-[11px] text-slate-500 font-semibold uppercase tracking-wide mb-1.5">Technique</p>
                        <p className="text-sm text-slate-700 leading-relaxed">{selectedExam.details}</p>
                      </div>
                      <div className={`rounded-xl p-3.5 ${selectedExam.status === "valide" ? "bg-teal-50 border border-teal-100" : "bg-slate-50"}`}>
                        <p className="text-[11px] text-slate-500 font-semibold uppercase tracking-wide mb-1.5">Conclusion</p>
                        <p className="text-sm text-slate-700 leading-relaxed">{selectedExam.conclusion}</p>
                      </div>
                    </div>

                    {selectedExam.radiologue && selectedExam.status === "valide" && (
                      <div className="mt-4 flex items-center gap-2 bg-teal-50 rounded-xl px-3 py-2.5">
                        <Pen className="w-3.5 h-3.5 text-teal-600" />
                        <p className="text-xs text-teal-700">
                          Signé par <span className="font-semibold">{selectedExam.radiologue}</span>
                        </p>
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 ml-auto" />
                      </div>
                    )}
                  </div>

                  {/* Historique */}
                  <div className="bg-white rounded-2xl shadow-sm p-4">
                    <h3 className="font-semibold text-slate-800 text-sm mb-3">Historique des examens</h3>
                    <div className="space-y-1.5">
                      {[...exams].sort((a, b) => b.date.localeCompare(a.date)).map((e) => (
                        <div
                          key={e.id}
                          onClick={() => setSelectedId(e.id)}
                          className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-colors ${
                            e.id === selectedId ? "bg-teal-50" : "hover:bg-slate-50"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className={`text-[9px] px-1 py-0.5 rounded font-bold ${typeColors[e.type]}`}>{e.type}</span>
                            <span className="text-xs text-slate-700">{e.label}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-400">{e.date}</span>
                            <span className={`text-[9px] px-1.5 py-0.5 rounded font-medium ${statusConfig[e.status].color}`}>
                              {statusConfig[e.status].label}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}