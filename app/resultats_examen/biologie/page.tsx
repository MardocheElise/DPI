// Route : /app/resultats_examen/biologie/page.tsx
// Page Résultats Biologie — affiche les analyses biologiques d'un patient spécifique
// Accès : /resultats_examen/biologie?patient=DPI-XXXX-XXXX

"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  FlaskConical, AlertTriangle, CheckCircle2, ChevronDown, ChevronUp,
  Filter, Download, Search, TrendingUp, TrendingDown, Minus,
  Calendar, Pen, Clock, ArrowLeft, User,
} from "lucide-react";
import { getPatientById } from "@/lib/patient";
import Topbar from './../../../components/Topbar';

export default function BiologiePage() {
  const searchParams = useSearchParams();
  const patientId = searchParams.get("patient") ?? "";
  const patient = getPatientById(patientId);
  const results = patient?.examens?.biologie?.results ?? [];
  const evolution = patient?.examens?.biologie?.evolution ?? [];

  const [search, setSearch] = useState("");
  const [filterService, setFilterService] = useState("Tous");
  const [filterStatus, setFilterStatus] = useState("Tous");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"liste" | "graphique">("liste");

  const services = ["Tous", ...Array.from(new Set(results.map((r) => r.service)))];
  const statuses = ["Tous", "valide", "en_attente"];

  const filtered = results.filter((r) => {
    const matchSearch =
      r.label.toLowerCase().includes(search.toLowerCase()) ||
      r.code.toLowerCase().includes(search.toLowerCase());
    const matchService = filterService === "Tous" || r.service === filterService;
    const matchStatus = filterStatus === "Tous" || r.status === filterStatus;
    return matchSearch && matchService && matchStatus;
  });

  const critiques = results.filter((r) => r.criticity === "critique").length;
  const anormaux = results.filter((r) => r.criticity === "anormal").length;

  // Get keys for evolution chart (exclude 'date')
  const evoKeys = evolution.length > 0
    ? Object.keys(evolution[0]).filter((k) => k !== "date")
    : [];

  if (!patient) {
    return (
      <main className="min-h-screen bg-[#e8f4f8] p-6 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-10 text-center shadow-sm">
          <User className="w-10 h-10 text-slate-200 mx-auto mb-3" />
          <p className="text-slate-600 font-medium">Patient non trouvé</p>
          <Link href="/resultats_examen" className="text-teal-600 text-sm mt-2 inline-block hover:underline">
            ← Retour à la liste
          </Link>
        </div>
      </main>
    ); 
  }

  return (
    <>
    <Topbar title="Résultats Biologie" />
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link
            href="/resultats_examen"
            className="w-9 h-9 rounded-xl bg-white shadow-sm flex items-center justify-center hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-slate-600" />
          </Link>
          <div className="w-10 h-10 rounded-2xl bg-teal-600 flex items-center justify-center shadow-lg">
            <FlaskConical className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800">Résultats Biologie</h1>
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
        {patient.allergies.length > 0 && (
          <div className="flex gap-1.5 flex-wrap">
            {patient.allergies.map((a) => (
              <span key={a} className="text-[10px] bg-red-50 border border-red-200 text-red-700 px-2 py-0.5 rounded-full font-medium">
                ⚠ {a}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Alert critiques */}
      {critiques > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-5 flex items-center gap-3">
          <div className="w-9 h-9 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-4 h-4 text-red-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-red-800">
              {critiques} valeur(s) critique(s) — Action urgente requise
            </p>
            <p className="text-xs text-red-600">
              Alertes envoyées à {patient.medecin}
            </p>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total analyses", value: results.length, color: "teal", icon: FlaskConical },
          { label: "Critiques", value: critiques, color: "red", icon: AlertTriangle },
          { label: "Anormaux", value: anormaux, color: "amber", icon: AlertTriangle },
          { label: "Normaux", value: results.filter((r) => r.criticity === "normal").length, color: "emerald", icon: CheckCircle2 },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-4 shadow-sm">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center mb-2 ${
              s.color === "teal" ? "bg-teal-100" : s.color === "red" ? "bg-red-100" : s.color === "amber" ? "bg-amber-100" : "bg-emerald-100"
            }`}>
              <s.icon className={`w-4 h-4 ${
                s.color === "teal" ? "text-teal-600" : s.color === "red" ? "text-red-600" : s.color === "amber" ? "text-amber-600" : "text-emerald-600"
              }`} />
            </div>
            <p className="text-2xl font-bold text-slate-800">{s.value}</p>
            <p className="text-xs text-slate-500">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4 bg-white rounded-2xl p-1.5 shadow-sm w-fit">
        {(["liste", "graphique"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              activeTab === tab
                ? "bg-teal-600 text-white shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {tab === "liste" ? "Liste résultats" : "Graphique évolution"}
          </button>
        ))}
      </div>

      {activeTab === "liste" ? (
        <>
          {/* Filters */}
          <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm flex items-center gap-3">
            <div className="flex-1 flex items-center gap-2 bg-slate-50 rounded-xl px-3 py-2">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Rechercher une analyse..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={filterService}
                onChange={(e) => setFilterService(e.target.value)}
                className="text-sm bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 text-slate-600 outline-none"
              >
                {services.map((s) => <option key={s}>{s}</option>)}
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="text-sm bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 text-slate-600 outline-none"
              >
                {statuses.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-2">
            {filtered.map((r) => {
              const isExpanded = expandedId === r.id;
              const pctInRange = Math.min(100, Math.max(0,
                r.normalMax !== r.normalMin
                  ? ((r.value - r.normalMin) / (r.normalMax - r.normalMin)) * 100
                  : 50
              ));
              const isAbove = r.value > r.normalMax;
              const isBelow = r.value < r.normalMin;

              return (
                <div
                  key={r.id}
                  className={`bg-white rounded-2xl shadow-sm overflow-hidden border-l-4 ${
                    r.criticity === "critique"
                      ? "border-l-red-500"
                      : r.criticity === "anormal"
                      ? "border-l-amber-400"
                      : "border-l-emerald-400"
                  }`}
                >
                  <div
                    className="flex items-center gap-4 p-4 cursor-pointer hover:bg-slate-50 transition-colors"
                    onClick={() => setExpandedId(isExpanded ? null : r.id)}
                  >
                    <div className="w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-slate-600">{r.code}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-slate-800 text-sm">{r.label}</p>
                        <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">
                          {r.service}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span className="text-xs text-slate-400">{r.date}</span>
                        {r.status === "en_attente" && (
                          <span className="flex items-center gap-1 text-[10px] text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                            <Clock className="w-2.5 h-2.5" /> En attente
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="flex items-center gap-1.5 justify-end">
                        {r.trend === "up" ? (
                          <TrendingUp className="w-3.5 h-3.5 text-red-500" />
                        ) : r.trend === "down" ? (
                          <TrendingDown className="w-3.5 h-3.5 text-blue-500" />
                        ) : (
                          <Minus className="w-3.5 h-3.5 text-slate-400" />
                        )}
                        <span
                          className={`text-lg font-bold ${
                            r.criticity === "critique"
                              ? "text-red-600"
                              : r.criticity === "anormal"
                              ? "text-amber-600"
                              : "text-slate-800"
                          }`}
                        >
                          {r.value}
                        </span>
                        <span className="text-xs text-slate-400">{r.unit}</span>
                      </div>
                      {r.normalMax !== r.normalMin && (
                        <p className="text-xs text-slate-400">
                          N: {r.normalMin}–{r.normalMax}
                        </p>
                      )}
                    </div>
                    <div className="flex-shrink-0">
                      <span
                        className={`text-[10px] px-2.5 py-1 rounded-full border font-semibold ${
                          r.criticity === "critique"
                            ? "bg-red-100 text-red-700 border-red-200"
                            : r.criticity === "anormal"
                            ? "bg-amber-100 text-amber-700 border-amber-200"
                            : "bg-emerald-100 text-emerald-700 border-emerald-200"
                        }`}
                      >
                        {r.criticity === "critique"
                          ? "CRITIQUE"
                          : r.criticity === "anormal"
                          ? "ANORMAL"
                          : "NORMAL"}
                      </span>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </div>

                  {isExpanded && (
                    <div className="px-4 pb-4 border-t border-slate-50">
                      <div className="pt-4 grid grid-cols-2 gap-4">
                        {/* Range bar */}
                        {r.normalMax !== r.normalMin && (
                          <div>
                            <p className="text-xs font-semibold text-slate-600 mb-2">
                              Plage de référence
                            </p>
                            <div className="relative h-6 bg-slate-100 rounded-full overflow-hidden">
                              <div className="absolute inset-y-0 left-[20%] right-[20%] bg-emerald-100 rounded-full" />
                              <div
                                className={`absolute top-1.5 w-3 h-3 rounded-full transform -translate-x-1/2 ${
                                  isAbove || isBelow ? "bg-red-500" : "bg-emerald-500"
                                }`}
                                style={{ left: `${Math.min(95, Math.max(5, pctInRange))}%` }}
                              />
                            </div>
                            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                              <span>{r.normalMin}</span>
                              <span>Normal</span>
                              <span>
                                {r.normalMax} {r.unit}
                              </span>
                            </div>
                          </div>
                        )}
                        {/* Previous comparison */}
                        <div>
                          <p className="text-xs font-semibold text-slate-600 mb-2">
                            Comparaison précédente
                          </p>
                          {r.previousValue !== undefined ? (
                            <div className="flex items-center gap-3">
                              <div className="flex-1 bg-slate-50 rounded-xl p-2.5 text-center">
                                <p className="text-[10px] text-slate-400">Précédent</p>
                                <p className="text-sm font-bold text-slate-600">
                                  {r.previousValue} {r.unit}
                                </p>
                              </div>
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                  r.trend === "up" ? "bg-red-100" : "bg-blue-100"
                                }`}
                              >
                                {r.trend === "up" ? (
                                  <TrendingUp className="w-4 h-4 text-red-500" />
                                ) : (
                                  <TrendingDown className="w-4 h-4 text-blue-500" />
                                )}
                              </div>
                              <div className="flex-1 bg-slate-50 rounded-xl p-2.5 text-center">
                                <p className="text-[10px] text-slate-400">Actuel</p>
                                <p
                                  className={`text-sm font-bold ${
                                    r.criticity === "critique"
                                      ? "text-red-600"
                                      : r.criticity === "anormal"
                                      ? "text-amber-600"
                                      : "text-slate-800"
                                  }`}
                                >
                                  {r.value} {r.unit}
                                </p>
                              </div>
                            </div>
                          ) : (
                            <p className="text-xs text-slate-400">Première mesure</p>
                          )}
                        </div>
                      </div>

                      {r.biologiste && (
                        <div className="mt-3 flex items-center gap-2 bg-teal-50 rounded-xl px-3 py-2">
                          <Pen className="w-3.5 h-3.5 text-teal-600" />
                          <p className="text-xs text-teal-700">
                            Validé et signé par{" "}
                            <span className="font-semibold">{r.biologiste}</span>
                          </p>
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 ml-auto" />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            {filtered.length === 0 && (
              <div className="bg-white rounded-2xl p-10 text-center shadow-sm">
                <p className="text-slate-400 text-sm">Aucun résultat trouvé</p>
              </div>
            )}
          </div>
        </>
      ) : (
        /* ── Graphique évolution ── */
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <h2 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-teal-600" />
            Évolution des paramètres biologiques
          </h2>
          <p className="text-xs text-slate-400 mb-5">
            {patient.nom} {patient.prenom} · {evolution.length} point(s) de mesure
          </p>

          {evolution.length === 0 ? (
            <p className="text-sm text-slate-400 text-center py-8">
              Aucune donnée d&apos;évolution disponible
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-5">
              {evoKeys.map((key) => {
                const values = evolution.map((e) => e[key] as number);
                const maxVal = Math.max(...values) * 1.1;
                const result = results.find((r) => r.code === key);

                return (
                  <div key={key} className="bg-slate-50 rounded-2xl p-4">
                    <p className="text-xs font-semibold text-slate-700 mb-0.5">{key}</p>
                    {result && (
                      <p className="text-[10px] text-slate-400 mb-3">
                        {result.label} · Norme: {result.normalMin}–{result.normalMax}{" "}
                        {result.unit}
                      </p>
                    )}
                    <div className="flex items-end gap-2 h-20">
                      {evolution.map((d, i) => {
                        const val = d[key] as number;
                        const pct = (val / maxVal) * 100;
                        const isCrit =
                          result &&
                          (val > result.normalMax * 1.5 || val < result.normalMin * 0.5);
                        const isAbnormal =
                          result &&
                          (val > result.normalMax || val < result.normalMin);
                        return (
                          <div key={i} className="flex-1 flex flex-col items-center gap-1">
                            <span className="text-[9px] text-slate-500 font-medium">{val}</span>
                            <div
                              className={`w-full rounded-t-lg transition-all ${
                                isCrit
                                  ? "bg-red-400"
                                  : isAbnormal
                                  ? "bg-amber-400"
                                  : "bg-teal-400"
                              }`}
                              style={{ height: `${pct}%` }}
                            />
                            <span className="text-[9px] text-slate-400 text-center leading-tight">
                              {d.date}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="flex gap-4 mt-4 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-teal-400" />
              <span className="text-xs text-slate-500">Normal</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-amber-400" />
              <span className="text-xs text-slate-500">Anormal</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-red-400" />
              <span className="text-xs text-slate-500">Critique</span>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
}