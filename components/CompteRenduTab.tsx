"use client";
import { useState } from "react";
import {
  FileText, Stethoscope, ClipboardList, Lightbulb,
  ChevronDown, CheckCircle, Copy, Printer, Download,
  Sparkles, Clock, User,
} from "lucide-react";

// ── Config des sections ───────────────────────────────────────────────────────
const sections = [
  {
    id: "motif",
    label: "Motif de consultation",
    icon: FileText,
    color: "#3b82f6",
    placeholder: "Ex : Patient de 46 ans consulte pour une douleur thoracique oppressive apparue brutalement il y a 3 heures...",
    hint: "Décrivez le motif principal ayant amené le patient à consulter",
    rows: 3,
  },
  {
    id: "anamnese",
    label: "Résumé de l'anamnèse",
    icon: Clock,
    color: "#8b5cf6",
    placeholder: "Ex : Histoire de la maladie, début des symptômes, facteurs déclenchants, évolution, traitements déjà pris...",
    hint: "Synthèse de l'histoire de la maladie présente",
    rows: 5,
  },
  {
    id: "examen",
    label: "Examen clinique",
    icon: Stethoscope,
    color: "var(--primary)",
    placeholder: "Ex : TA 145/90 mmHg, FC 88 bpm, T° 37.2°C, SpO2 97%. Auscultation cardiaque : souffle systolique 2/6 en foyer aortique. Poumons clairs...",
    hint: "Résultats de l'examen physique complet",
    rows: 5,
  },
  {
    id: "synthese",
    label: "Synthèse et conduite à tenir",
    icon: Lightbulb,
    color: "#f59e0b",
    placeholder: "Ex : Conclusion diagnostique, examens complémentaires demandés, traitement instauré, orientation du patient, rendez-vous de contrôle...",
    hint: "Conclusion, décisions thérapeutiques et plan de suivi",
    rows: 5,
  },
];

// ── Composant ─────────────────────────────────────────────────────────────────
export function CompteRenduTab() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [expanded, setExpanded] = useState<Record<string, boolean>>(
    Object.fromEntries(sections.map((s) => [s.id, true]))
  );
  const [copied, setCopied] = useState(false);

  const setValue = (id: string, val: string) =>
    setValues((prev) => ({ ...prev, [id]: val }));

  const toggleSection = (id: string) =>
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  const filledCount = sections.filter((s) => values[s.id]?.trim()).length;
  const totalChars  = Object.values(values).join("").length;

  const copyAll = () => {
    const text = sections
      .map((s) => `## ${s.label}\n${values[s.id] || "—"}`)
      .join("\n\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">

      {/* ── Header barre de progression ── */}
      <div className="card-dpi p-5 flex items-center gap-6">
        {/* Progression circulaire */}
        <div className="relative w-14 h-14 flex-shrink-0">
          <svg viewBox="0 0 56 56" className="w-14 h-14 -rotate-90">
            <circle cx="28" cy="28" r="22" fill="none" stroke="var(--border)" strokeWidth="5" />
            <circle
              cx="28" cy="28" r="22" fill="none"
              stroke="var(--primary)" strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 22}`}
              strokeDashoffset={`${2 * Math.PI * 22 * (1 - filledCount / sections.length)}`}
              style={{ transition: "stroke-dashoffset 0.4s ease" }}
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center"
            style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 14, color: "var(--primary)" }}>
            {filledCount}/{sections.length}
          </span>
        </div>

        <div className="flex-1">
          <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, color: "var(--text-primary)" }}>
            Compte-rendu de Consultation
          </p>
          <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>
            {filledCount === sections.length
              ? "✅ Toutes les sections sont complètes"
              : `${sections.length - filledCount} section${sections.length - filledCount > 1 ? "s" : ""} restante${sections.length - filledCount > 1 ? "s" : ""} à remplir`}
          </p>
          {/* Barre de progression linéaire */}
          <div className="mt-2.5 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${(filledCount / sections.length) * 100}%`,
                background: filledCount === sections.length
                  ? "#10b981"
                  : "var(--primary)",
              }}
            />
          </div>
        </div>

        {/* Compteur caractères */}
        {/* <div className="text-center px-4 py-2 rounded-xl" style={{ background: "var(--bg-main)", border: "1px solid var(--border)" }}>
          <p style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 20, color: "var(--primary)", lineHeight: 1 }}>
            {totalChars}
          </p>
          <p style={{ fontSize: 11, color: "var(--text-muted)" }}>caractères</p>
        </div> */}

        {/* Actions */}
        <div className="flex gap-2">
          <button onClick={copyAll}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all"
            style={{ background: copied ? "#d1fae5" : "var(--primary-light)", color: copied ? "#065f46" : "var(--primary)", fontFamily: "var(--font-display)" }}>
            {copied ? <CheckCircle size={15} /> : <Copy size={15} />}
            {copied ? "Copié !" : "Copier"}
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold"
            style={{ background: "var(--accent-yellow-light)", color: "#92400e", fontFamily: "var(--font-display)" }}>
            <Printer size={15} /> Imprimer
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold"
            style={{ background: "#dbeafe", color: "#1e40af", fontFamily: "var(--font-display)" }}>
            <Download size={15} /> PDF
          </button>
        </div>
      </div>

      {/* ── Sections ── */}
      {sections.map((section, idx) => {
        const isOpen  = expanded[section.id];
        const isFilled = !!values[section.id]?.trim();
        const Icon = section.icon;

        return (
          <div key={section.id} className="card-dpi overflow-hidden transition-all">

            {/* Section header */}
            <div
              className="flex items-center gap-4 p-5 cursor-pointer select-none"
              onClick={() => toggleSection(section.id)}
              style={{ borderLeft: `4px solid ${isFilled ? "#10b981" : section.color}` }}
            >
              {/* Numéro */}
              <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: section.color + "18" }}>
                <Icon size={16} color={section.color} strokeWidth={2} />
              </div>

              {/* Label */}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14, color: "var(--text-primary)" }}>
                    {idx + 1}. {section.label}
                  </span>
                  {isFilled && (
                    <CheckCircle size={14} color="#10b981" />
                  )}
                </div>
                {!isOpen && isFilled && (
                  <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}
                    className="truncate" >
                    {values[section.id].slice(0, 80)}…
                  </p>
                )}
                {!isOpen && !isFilled && (
                  <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2, fontStyle: "italic" }}>
                    {section.hint}
                  </p>
                )}
              </div>

              {/* Compteur chars de la section */}
              {isFilled && (
                <span className="px-2 py-0.5 rounded-lg text-xs font-semibold"
                  style={{ background: "#d1fae5", color: "#065f46" }}>
                  {values[section.id].length} car.
                </span>
              )}

              {/* Chevron */}
              <ChevronDown size={18} color="var(--text-muted)"
                style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s", flexShrink: 0 }} />
            </div>

            {/* Body */}
            {isOpen && (
              <div className="px-5 pb-5">
                {/* Hint */}
                <div className="flex items-start gap-2 mb-3 p-3 rounded-xl"
                  style={{ background: section.color + "0D", border: `1px solid ${section.color}22` }}>
                  <Sparkles size={13} color={section.color} style={{ marginTop: 1, flexShrink: 0 }} />
                  <p style={{ fontSize: 12, color: section.color, fontWeight: 500 }}>{section.hint}</p>
                </div>

                <textarea
                  className="input-dpi"
                  rows={section.rows}
                  cols={50}
                  placeholder={section.placeholder}
                  value={values[section.id] || ""}
                  onChange={(e) => setValue(section.id, e.target.value)}
                  style={{
                    resize: "vertical",
                    lineHeight: 1.7,
                    fontSize: 14,
                    borderColor: isFilled ? "#10b981" : undefined,
                  }}
                />

                {/* Footer barre */}
                <div className="flex items-center justify-between mt-2">
                  <p style={{ fontSize: 11, color: "var(--text-muted)" }}>
                    {values[section.id]?.length ?? 0} caractère{(values[section.id]?.length ?? 0) > 1 ? "s" : ""}
                  </p>
                  {isFilled && (
                    <button
                      onClick={() => setValue(section.id, "")}
                      className="text-xs px-2 py-0.5 rounded-lg transition-all"
                      style={{ color: "var(--text-muted)", border: "1px solid var(--border)" }}
                    >
                      Effacer
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* ── Footer statut ── */}
      {filledCount === sections.length && (
        <div className="flex items-center gap-3 p-4 rounded-2xl"
          style={{ background: "#d1fae5", border: "1.5px solid #6ee7b7" }}>
          <CheckCircle size={20} color="#065f46" />
          <div>
            <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14, color: "#065f46" }}>
              Compte-rendu complet
            </p>
            <p style={{ fontSize: 12, color: "#047857" }}>
              Toutes les sections sont renseignées — prêt à valider la consultation
            </p>
          </div>
        </div>
      )}
    </div>
  );
}