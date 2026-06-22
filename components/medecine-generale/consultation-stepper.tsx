"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/data/utils";

interface Props {
  etapes: readonly string[];
  courante: number;
  onSelect: (index: number) => void;
  variant?: "teal" | "orange";
}

const STYLES = {
  teal: {
    active: "bg-[#1DA1A6] text-white",
    done: "bg-[#9BD6DC] text-[#0d6e72]",
  },
  orange: {
    active: "bg-[#F08C1E] text-white",
    done: "bg-[#F8C98A] text-[#92560A]",
  },
};

export function ConsultationStepper({ etapes, courante, onSelect, variant = "teal" }: Props) {
  const s = STYLES[variant];
  return (
    <div className="flex w-full overflow-x-auto py-1">
      {etapes.map((etape, i) => {
        const done = i < courante;
        const active = i === courante;
        const first = i === 0;
        const last = i === etapes.length - 1;

        // Chevron : pointe à droite, encoche à gauche (sauf 1ère / dernière).
        const clip = first
          ? "polygon(0 0, calc(100% - 14px) 0, 100% 50%, calc(100% - 14px) 100%, 0 100%)"
          : last
            ? "polygon(0 0, 100% 0, 100% 100%, 0 100%, 14px 50%)"
            : "polygon(0 0, calc(100% - 14px) 0, 100% 50%, calc(100% - 14px) 100%, 0 100%, 14px 50%)";

        return (
          <button
            key={etape}
            type="button"
            onClick={() => onSelect(i)}
            style={{ clipPath: clip, marginLeft: first ? 0 : -12 }}
            className={cn(
              "flex min-w-[140px] flex-1 items-center justify-center gap-1.5 px-5 py-2.5 text-center text-xs font-semibold leading-tight transition-colors",
              active && s.active,
              done && s.done,
              !active && !done && "bg-slate-100 text-slate-500 hover:bg-slate-200",
            )}
          >
            {done && <Check className="h-3.5 w-3.5 shrink-0" />}
            <span>{etape}</span>
          </button>
        );
      })}
    </div>
  );
}