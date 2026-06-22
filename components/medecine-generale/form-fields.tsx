// "use client";

// import type { ReactNode } from "react";
// import { cn } from "@/lib/data/utils";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// export function FieldLabel({
//   children,
//   required,
// }: {
//   children: ReactNode;
//   required?: boolean;
// }) {
//   return (
//     <label className="mb-1.5 block text-sm font-bold text-slate-700">
//       {children}
//       {required && <span className="text-[#F04444]"> *</span>}
//     </label>
//   );
// }

// export function SelectField({
//   label,
//   required,
//   value,
//   onChange,
//   options,
//   placeholder = "Sélectionnez",
// }: {
//   label: string;
//   required?: boolean;
//   value: string;
//   onChange: (v: string) => void;
//   options: readonly string[];
//   placeholder?: string;
// }) {
//   return (
//     <div>
//       <FieldLabel required={required}>{label}</FieldLabel>
//       <Select value={value || undefined} onValueChange={onChange}>
//         <SelectTrigger className="h-12 rounded-xl border-slate-200">
//           <SelectValue placeholder={placeholder} />
//         </SelectTrigger>
//         <SelectContent>
//           {options.map((opt) => (
//             <SelectItem key={opt} value={opt}>
//               {opt}
//             </SelectItem>
//           ))}
//         </SelectContent>
//       </Select>
//     </div>
//   );
// }

// /** Champ segmenté : [icône] [valeur] [unité]. */
// export function MeasureInput({
//   label,
//   required,
//   icon,
//   value,
//   onChange,
//   unit,
//   readOnly,
//   highlight,
//   placeholder,
// }: {
//   label?: string;
//   required?: boolean;
//   icon?: ReactNode;
//   value: string;
//   onChange?: (v: string) => void;
//   unit?: ReactNode;
//   readOnly?: boolean;
//   highlight?: boolean;
//   placeholder?: string;
// }) {
//   return (
//     <div>
//       {label && <FieldLabel required={required}>{label}</FieldLabel>}
//       <div
//         className={cn(
//           "flex items-stretch overflow-hidden rounded-xl border-2 bg-white",
//           highlight ? "border-[#F04444] bg-[#FDECEC]" : "border-slate-200",
//         )}
//       >
//         {icon && (
//           <div className="flex items-center justify-center bg-slate-50 px-3 text-slate-500">
//             {icon}
//           </div>
//         )}
//         <input
//           value={value}
//           onChange={(e) => onChange?.(e.target.value)}
//           readOnly={readOnly}
//           placeholder={placeholder}
//           className={cn(
//             "w-full min-w-0 flex-1 bg-transparent px-3 py-2.5 text-slate-700 outline-none",
//             readOnly && "text-slate-500",
//           )}
//         />
//         {unit != null && (
//           <div className="flex items-center justify-center border-l border-slate-200 bg-slate-50 px-4 font-bold text-slate-600">
//             {unit}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// /** Tension artérielle : [TAS] mmHg / [TAD] mmHg. */
// export function TensionInput({
//   label,
//   tas,
//   tad,
//   onTas,
//   onTad,
// }: {
//   label: string;
//   tas: string;
//   tad: string;
//   onTas: (v: string) => void;
//   onTad: (v: string) => void;
// }) {
//   return (
//     <div>
//       <FieldLabel>{label}</FieldLabel>
//       <div className="flex items-stretch overflow-hidden rounded-xl border-2 border-slate-200 bg-white">
//         <input
//           value={tas}
//           onChange={(e) => onTas(e.target.value)}
//           placeholder="TAS"
//           className="w-full min-w-0 flex-1 bg-transparent px-3 py-2.5 text-center text-slate-700 outline-none"
//         />
//         <div className="flex items-center bg-slate-50 px-3 text-sm font-semibold text-slate-500">
//           mmHg /
//         </div>
//         <input
//           value={tad}
//           onChange={(e) => onTad(e.target.value)}
//           placeholder="TAD"
//           className="w-full min-w-0 flex-1 bg-transparent px-3 py-2.5 text-center text-slate-700 outline-none"
//         />
//         <div className="flex items-center border-l border-slate-200 bg-slate-50 px-4 font-bold text-slate-600">
//           mmHg
//         </div>
//       </div>
//     </div>
//   );
// }












// components/medecine-generale/form-fields.tsx
// Primitives de champ réutilisables par les étapes du formulaire de consultation
// (libellé, select, champ mesuré "icône / valeur / unité", tension artérielle).
"use client";

import type { ReactNode } from "react";
import { Ban, Plus, ThumbsUp, Trash2, X } from "lucide-react";
import { cn } from "@/lib/data/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function FieldLabel({
  children,
  required,
}: {
  children: ReactNode;
  required?: boolean;
}) {
  return (
    <label className="mb-1.5 block text-sm font-bold text-slate-700">
      {children}
      {required && <span className="text-[#F04444]"> *</span>}
    </label>
  );
}

export function SelectField({
  label,
  required,
  value,
  onChange,
  options,
  placeholder = "Sélectionnez",
}: {
  label: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
  placeholder?: string;
}) {
  return (
    <div>
      <FieldLabel required={required}>{label}</FieldLabel>
      <Select value={value || undefined} onValueChange={onChange}>
        <SelectTrigger className="h-12 rounded-xl border-slate-200">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt} value={opt}>
              {opt}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

/** Champ segmenté : [icône] [valeur] [unité]. */
export function MeasureInput({
  label,
  required,
  icon,
  value,
  onChange,
  unit,
  readOnly,
  highlight,
  placeholder,
}: {
  label?: string;
  required?: boolean;
  icon?: ReactNode;
  value: string;
  onChange?: (v: string) => void;
  unit?: ReactNode;
  readOnly?: boolean;
  highlight?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      {label && <FieldLabel required={required}>{label}</FieldLabel>}
      <div
        className={cn(
          "flex items-stretch overflow-hidden rounded-xl border-2 bg-white",
          highlight ? "border-[#F04444] bg-[#FDECEC]" : "border-slate-200",
        )}
      >
        {icon && (
          <div className="flex items-center justify-center bg-slate-50 px-3 text-slate-500">
            {icon}
          </div>
        )}
        <input
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          readOnly={readOnly}
          placeholder={placeholder}
          className={cn(
            "w-full min-w-0 flex-1 bg-transparent px-3 py-2.5 text-slate-700 outline-none",
            readOnly && "text-slate-500",
          )}
        />
        {unit != null && (
          <div className="flex items-center justify-center border-l border-slate-200 bg-slate-50 px-4 font-bold text-slate-600">
            {unit}
          </div>
        )}
      </div>
    </div>
  );
}

/** Tension artérielle : [TAS] mmHg / [TAD] mmHg. */
export function TensionInput({
  label,
  tas,
  tad,
  onTas,
  onTad,
}: {
  label: string;
  tas: string;
  tad: string;
  onTas: (v: string) => void;
  onTad: (v: string) => void;
}) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <div className="flex items-stretch overflow-hidden rounded-xl border-2 border-slate-200 bg-white">
        <input
          value={tas}
          onChange={(e) => onTas(e.target.value)}
          placeholder="TAS"
          className="w-full min-w-0 flex-1 bg-transparent px-3 py-2.5 text-center text-slate-700 outline-none"
        />
        <div className="flex items-center bg-slate-50 px-3 text-sm font-semibold text-slate-500">
          mmHg /
        </div>
        <input
          value={tad}
          onChange={(e) => onTad(e.target.value)}
          placeholder="TAD"
          className="w-full min-w-0 flex-1 bg-transparent px-3 py-2.5 text-center text-slate-700 outline-none"
        />
        <div className="flex items-center border-l border-slate-200 bg-slate-50 px-4 font-bold text-slate-600">
          mmHg
        </div>
      </div>
    </div>
  );
}

/* ===================== Primitives partagées (interrogatoire / examens) ===================== */

export function PanelTitle({ children }: { children: ReactNode }) {
  return <h2 className="text-2xl font-bold text-slate-800">{children}</h2>;
}

export function Radio({ active }: { active: boolean }) {
  return (
    <span
      className={cn(
        "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2",
        active ? "border-[#2D6CF6]" : "border-slate-300",
      )}
    >
      {active && <span className="h-2 w-2 rounded-full bg-[#2D6CF6]" />}
    </span>
  );
}

function Seg({
  active,
  icon,
  text,
  onClick,
}: {
  active: boolean;
  icon?: ReactNode;
  text: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex min-w-[110px] items-center justify-center gap-2 px-4 py-3",
        active && "rounded-lg border-2 border-[#2D6CF6]",
      )}
    >
      {icon}
      <span className={cn("font-semibold", active ? "text-[#2D6CF6]" : "text-slate-600")}>
        {text}
      </span>
      <Radio active={active} />
    </button>
  );
}

interface BinOpt {
  value: string;
  label: string;
  icon?: ReactNode;
}

/** Ligne segmentée générique (label + options exclusives). */
export function BinaryRow({
  label,
  value,
  onChange,
  options,
}: {
  label: ReactNode;
  value: string;
  onChange: (v: string) => void;
  options: BinOpt[];
}) {
  return (
    <div className="flex flex-wrap items-stretch overflow-hidden rounded-xl border border-slate-200 bg-[#F4F9FF]">
      <div className="flex flex-1 items-center px-4 py-3 text-slate-700">{label}</div>
      {options.map((o) => (
        <Seg
          key={o.value}
          active={value === o.value}
          icon={o.icon}
          text={o.label}
          onClick={() => onChange(o.value)}
        />
      ))}
    </div>
  );
}

/** Ligne Oui / Non (/ NA). */
export function OuiNonRow({
  label,
  value,
  onChange,
  withNA,
}: {
  label: ReactNode;
  value: string;
  onChange: (v: string) => void;
  withNA?: boolean;
}) {
  const options: BinOpt[] = [
    { value: "oui", label: "Oui", icon: <ThumbsUp className="h-4 w-4" /> },
    { value: "non", label: "Non", icon: <Ban className="h-4 w-4" /> },
  ];
  if (withNA) {
    options.push({ value: "na", label: "NA", icon: <span className="h-3.5 w-3.5 rounded-sm bg-[#2D6CF6]" /> });
  }
  return <BinaryRow label={label} value={value} onChange={onChange} options={options} />;
}

/** Ligne Perçu / Non Perçu. */
export function PercuRow({
  label,
  value,
  onChange,
}: {
  label: ReactNode;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <BinaryRow
      label={label}
      value={value}
      onChange={onChange}
      options={[
        { value: "percu", label: "Perçu", icon: <ThumbsUp className="h-4 w-4" /> },
        { value: "non-percu", label: "Non Perçu", icon: <Ban className="h-4 w-4" /> },
      ]}
    />
  );
}

/** Bandeau "NA" (option large). */
export function NABanner({
  checked,
  onClick,
  sublabel,
}: {
  checked: boolean;
  onClick: () => void;
  sublabel?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-center justify-between rounded-xl border-2 px-5 py-4 transition-colors",
        checked ? "border-[#2D6CF6] bg-[#EFF5FF]" : "border-slate-200 bg-white",
      )}
    >
      <div className="flex items-center gap-3">
        <Ban className="h-6 w-6 text-[#2D6CF6]" />
        <div className="text-left">
          <span className="text-lg font-bold text-[#2D6CF6]">NA</span>
          {sublabel && <p className="text-sm text-slate-500">{sublabel}</p>}
        </div>
      </div>
      <Radio active={checked} />
    </button>
  );
}

/** Interrupteur on/off. */
export function ToggleSwitch({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={cn(
        "relative h-6 w-11 shrink-0 rounded-full transition-colors",
        checked ? "bg-[#1DA1A6]" : "bg-slate-300",
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all",
          checked ? "left-[22px]" : "left-0.5",
        )}
      />
    </button>
  );
}

export function HorsListeSwitch({
  label,
  checked,
  onChange,
}: {
  label: ReactNode;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-full border border-slate-200 bg-white px-5 py-2.5">
      <span className="text-slate-600">{label}</span>
      <ToggleSwitch checked={checked} onChange={onChange} />
    </div>
  );
}

export function SupprimerButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-1.5 rounded-md bg-[#EF4848] px-3 py-1.5 text-sm font-semibold text-white hover:bg-[#e03a3a]"
    >
      <Trash2 className="h-4 w-4" />
      Supprimer
    </button>
  );
}

export function AddButton({ onClick, children }: { onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mx-auto flex items-center gap-2 rounded-xl bg-[#2D6CF6] px-6 py-3 font-semibold text-white hover:bg-[#2459d6]"
    >
      <Plus className="h-5 w-5" />
      {children}
    </button>
  );
}

export function TextField({
  label,
  value,
  onChange,
  placeholder,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <FieldLabel required={required}>{label}</FieldLabel>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-12 w-full rounded-xl border-2 border-slate-200 bg-white px-3 text-slate-700 outline-none"
      />
    </div>
  );
}

export function TextAreaField({
  label,
  value,
  onChange,
  placeholder,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full resize-y rounded-xl border-2 border-slate-200 bg-white px-3 py-2.5 text-slate-700 outline-none"
      />
    </div>
  );
}

/** Multi-sélection avec puces retirables. */
export function MultiSelectChips({
  label,
  value,
  onChange,
  options,
  required,
}: {
  label: string;
  value: string[];
  onChange: (v: string[]) => void;
  options: readonly string[];
  required?: boolean;
}) {
  const remaining = options.filter((o) => !value.includes(o));
  return (
    <div>
      <FieldLabel required={required}>{label}</FieldLabel>
      <div className="flex min-h-12 flex-wrap items-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-3 py-2">
        {value.map((v) => (
          <span
            key={v}
            className="inline-flex items-center gap-1 rounded-md bg-[#EFF5FF] px-2 py-1 text-sm text-[#2D6CF6]"
          >
            {v}
            <button type="button" onClick={() => onChange(value.filter((x) => x !== v))}>
              <X className="h-3.5 w-3.5" />
            </button>
          </span>
        ))}
        <select
          value=""
          onChange={(e) => e.target.value && onChange([...value, e.target.value])}
          className="flex-1 bg-transparent text-slate-500 outline-none"
        >
          <option value="">Sélectionnez…</option>
          {remaining.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}