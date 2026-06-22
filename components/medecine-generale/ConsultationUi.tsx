"use client";

import { ArrowDown, ArrowUp, ArrowUpDown, ArrowUpRight, CheckCircle2, Clock, Filter } from "lucide-react";
import { cn } from "@/lib/data/utils";
import { estFievre, EtatConsultation, IssueConsultation, TypePrestation } from "@/lib/data/consultations";
 

/* ---------------------------------- Tri ---------------------------------- */

export type SortDir = "asc" | "desc";
export interface SortConfig {
  key: string;
  dir: SortDir;
}

interface SortHeaderProps {
  label: string;
  sortKey: string;
  sort: SortConfig | null;
  onSort: (key: string) => void;
  /** Affiche une icône d'entonnoir (filtre) à côté du libellé. */
  filterable?: boolean;
}

export function SortHeader({ label, sortKey, sort, onSort, filterable }: SortHeaderProps) {
  const active = sort?.key === sortKey;
  return (
    <div className="flex items-center gap-2 whitespace-nowrap">
      <button
        type="button"
        onClick={() => onSort(sortKey)}
        className="inline-flex items-center gap-1.5 font-semibold text-slate-700 transition-colors hover:text-[#1DA1A6]"
      >
        {label}
        {active ? (
          sort?.dir === "asc" ? (
            <ArrowUp className="h-3.5 w-3.5 text-[#1DA1A6]" />
          ) : (
            <ArrowDown className="h-3.5 w-3.5 text-[#1DA1A6]" />
          )
        ) : (
          <ArrowUpDown className="h-3.5 w-3.5 text-slate-400" />
        )}
      </button>
      {filterable && <Filter className="h-3.5 w-3.5 text-slate-400" />}
    </div>
  );
}

/* -------------------------------- Badges --------------------------------- */

/** Température : rose/rouge si élevée (↑), vert si normale. */
export function TempBadge({ value }: { value: number }) {
  const fievre = estFievre(value);
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-sm font-medium",
        fievre ? "bg-[#FCDBDB] text-[#C97070]" : "bg-[#D8F3DE] text-[#2E9E54]",
      )}
    >
      {value} °C
      {fievre && <ArrowUpRight className="h-3.5 w-3.5" />}
    </span>
  );
}

const TYPE_LABEL: Record<TypePrestation, string> = {
  consultation: "Consultation",
};

/** Type de prestation : pastille verte avec coche. */
export function TypeBadge({ type }: { type: TypePrestation }) {
  return (
    <span className="inline-flex items-center gap-1.5 font-semibold text-[#1A9D4B]">
      <CheckCircle2 className="h-5 w-5 fill-[#23C756] text-white" />
      {TYPE_LABEL[type]}
    </span>
  );
}

/** État dans la file : "En attente" (rose) ou "En consultation" (vert). */
export function EtatBadge({ etat }: { etat: EtatConsultation }) {
  if (etat === "en-attente") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-md bg-[#FCDDE6] px-2.5 py-1 text-sm font-semibold text-[#DD4F86]">
        <Clock className="h-3.5 w-3.5" />
        En attente&nbsp;…
      </span>
    );
  }
  if (etat === "en-consultation") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-md bg-[#D8F3DE] px-2.5 py-1 text-sm font-semibold text-[#2E9E54]">
        <span className="h-2.5 w-2.5 rounded-full bg-[#23C756] ring-2 ring-[#A6E6BB]" />
        En consultation
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-100 px-2.5 py-1 text-sm font-semibold text-slate-500">
      Terminé
    </span>
  );
}

const ISSUE_STYLE: Record<IssueConsultation, { label: string; dot: string; text: string }> = {
  sortie: { label: "Sortie", dot: "bg-[#23C756] ring-[#A6E6BB]", text: "text-[#2E9E54]" },
  hospitalisation: { label: "Hospitalisation", dot: "bg-[#FFB020] ring-[#FFE0A6]", text: "text-[#C77A00]" },
  transfert: { label: "Transfert", dot: "bg-[#6367EF] ring-[#C3C5F7]", text: "text-[#5054D9]" },
};

/** Issue de la consultation : pastille colorée + libellé. */
export function IssueBadge({ issue }: { issue: IssueConsultation }) {
  const s = ISSUE_STYLE[issue];
  return (
    <span className={cn("inline-flex items-center gap-1.5 font-semibold", s.text)}>
      <span className={cn("h-2.5 w-2.5 rounded-full ring-2", s.dot)} />
      {s.label}
    </span>
  );
}