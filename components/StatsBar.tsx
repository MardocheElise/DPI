"use client";

import { useState, useMemo } from "react";
 
import { ClipboardList, Calendar } from "lucide-react";
import { patients } from "@/components/lib/patient";

type Period = "today" | "yesterday" | "week" | "month" | "all";

const PERIODS: { id: Period; label: string; short: string }[] = [
  { id: "today",     label: "Aujourd'hui", short: "Auj." },
  { id: "yesterday", label: "Hier",        short: "Hier" },
  { id: "week",      label: "7 derniers jours", short: "7j" },
  { id: "month",     label: "Ce mois-ci",  short: "Mois" },
  { id: "all",       label: "Tous",        short: "Tous" },
];

function isInPeriod(dateStr: string, period: Period): boolean {
  const date  = new Date(dateStr);
  const now   = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  switch (period) {
    case "today":
      return date >= today;
    case "yesterday": {
      const yest = new Date(today);
      yest.setDate(today.getDate() - 1);
      return date >= yest && date < today;
    }
    case "week": {
      const week = new Date(today);
      week.setDate(today.getDate() - 6);
      return date >= week;
    }
    case "month": {
      const month = new Date(now.getFullYear(), now.getMonth(), 1);
      return date >= month;
    }
    case "all":
    default:
      return true;
  }
}

interface StatsBarProps {
  /** Icône à afficher dans les cartes stats (optionnel, défaut ClipboardList) */
  icon?: React.ElementType;
  /** Labels et couleurs des 4 stats (laisser vide pour utiliser les défauts) */
  stats?: { label: string; color: string; filter: (p: typeof patients[0]) => boolean }[];
  /** Callback quand la période change — reçoit les patients filtrés */
  onPeriodChange?: (filtered: typeof patients, period: Period) => void;
}

export default function StatsBar({ icon: Icon = ClipboardList, stats, onPeriodChange }: StatsBarProps) {
  const [period, setPeriod] = useState<Period>("all");

  const filteredPatients = useMemo(() => {
    return patients.filter((p) => isInPeriod(p.dateAdmission, period));
  }, [period]);

  const handlePeriod = (p: Period) => {
    setPeriod(p);
    onPeriodChange?.(patients.filter((pt) => isInPeriod(pt.dateAdmission, p)), p);
  };

  const defaultStats = [
    { label: "Total patients",  color: "var(--primary)", filter: () => true },
    { label: "Hospitalisés",    color: "#3b82f6",        filter: (p: typeof patients[0]) => p.statut === "Hospitalisé" },
    { label: "Urgents",         color: "#ef4444",        filter: (p: typeof patients[0]) => p.statut === "Urgent" },
    { label: "Ambulatoires",    color: "#10b981",        filter: (p: typeof patients[0]) => p.statut === "Ambulatoire" },
  ];

  const resolvedStats = stats ?? defaultStats;

  const periodLabel = PERIODS.find((p) => p.id === period)?.label ?? "Tous";

  return (
    <div className="flex items-stretch gap-4 mb-8">
      {/* ── Stat cards ── */}
      <div className="grid grid-cols-4 gap-4 flex-1">
        {resolvedStats.map((s) => {
          const value = filteredPatients.filter(s.filter).length;
          return (
            <div key={s.label} className="card-dpi p-5 flex items-center gap-4">
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: s.color + "18" }}>
                <Icon size={20} color={s.color} />
              </div>
              <div>
                <p style={{
                  fontFamily: "var(--font-display)", fontWeight: 800,
                  fontSize: 24, color: "var(--text-primary)", lineHeight: 1,
                }}>
                  {value}
                </p>
                <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>{s.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Period filter card ── */}
      <div className="card-dpi p-4 flex flex-col justify-between flex-shrink-0" style={{ minWidth: 180 }}>
        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-lg flex items-center justify-center"
            style={{ background: "var(--primary-light)" }}>
            <Calendar size={13} color="var(--primary)" />
          </div>
          <span style={{
            fontFamily: "var(--font-display)", fontWeight: 700,
            fontSize: 11, color: "var(--text-secondary)",
            textTransform: "uppercase", letterSpacing: "0.05em",
          }}>
            Période
          </span>
        </div>

        {/* Period buttons */}
        <div className="flex flex-col gap-1">
          {PERIODS.map((p) => (
            <button
              key={p.id}
              onClick={() => handlePeriod(p.id)}
              className="flex items-center justify-between px-3 py-1.5 rounded-lg transition-all text-left"
              style={{
                background: period === p.id ? "var(--primary)" : "transparent",
                color: period === p.id ? "white" : "var(--text-secondary)",
                fontFamily: "var(--font-display)",
                fontWeight: period === p.id ? 700 : 500,
                fontSize: 13,
              }}
            >
              <span>{p.label}</span>
              {period === p.id && (
                <span className="ml-2 px-1.5 py-0.5 rounded-md text-xs font-bold"
                  style={{ background: "rgba(255,255,255,0.25)", color: "white" }}>
                  {filteredPatients.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Active period pill */}
        <div className="mt-3 px-3 py-1.5 rounded-xl text-center"
          style={{ background: "var(--primary-light)" }}>
          <p style={{ fontSize: 11, color: "var(--primary)", fontWeight: 700 }}>
            {periodLabel}
          </p>
          <p style={{ fontSize: 10, color: "var(--primary)", opacity: 0.7 }}>
            {filteredPatients.length} patient{filteredPatients.length > 1 ? "s" : ""}
          </p>
        </div>
      </div>
    </div>
  );
}