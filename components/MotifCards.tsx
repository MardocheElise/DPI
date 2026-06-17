import { useState } from "react";

export function MotifCard() {
  const motifOptions = [
    "Douleur thoracique", "Fièvre", "Dyspnée", "Céphalées",
    "Douleurs abdominales", "Consultation de suivi", "Bilan de santé",
    "Traumatisme", "Autres",
  ];
 
  // Multi-select : tableau de motifs sélectionnés
  const [motifsSelected, setMotifsSelected] = useState<string[]>([]);
 
  const toggleMotif = (m: string) => {
    setMotifsSelected((prev) =>
      prev.includes(m)
        ? prev.filter((x) => x !== m)   // décocher
        : [...prev, m]                   // cocher
    );
  };
 
  const clearAll = () => setMotifsSelected([]);
 
  return (
    <div className="card-dpi p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 style={{
          fontFamily: "var(--font-display)", fontWeight: 700,
          fontSize: 16, color: "var(--text-primary)",
        }}>
          Motif de Consultation
        </h3>
 
        {/* Badge compteur + bouton reset */}
        {motifsSelected.length > 0 && (
          <div className="flex items-center gap-2">
            <span
              className="px-2.5 py-0.5 rounded-full text-xs font-bold"
              style={{ background: "var(--primary)", color: "white" }}
            >
              {motifsSelected.length} sélectionné{motifsSelected.length > 1 ? "s" : ""}
            </span>
            <button
              onClick={clearAll}
              className="text-xs px-2 py-0.5 rounded-lg transition-all"
              style={{
                color: "var(--text-muted)",
                border: "1px solid var(--border)",
                fontFamily: "var(--font-body)",
              }}
            >
              Tout effacer
            </button>
          </div>
        )}
      </div>
 
      {/* Grid des motifs */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {motifOptions.map((m) => {
          const isSelected = motifsSelected.includes(m);
          return (
            <button
              key={m}
              onClick={() => toggleMotif(m)}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-left transition-all"
              style={{
                background: isSelected ? "var(--primary-light)" : "var(--bg-main)",
                color: isSelected ? "#90EE90" : "var(--text-primary)",
                border: `1.5px solid ${isSelected ? "var(--primary)" : "var(--border)"}`,
                fontWeight: isSelected ? 700 : 400,
              }}
            >
              {/* Checkbox visuelle */}
              <span
                className="flex-shrink-0 w-4 h-4 rounded flex items-center justify-center transition-all"
                style={{
                  background: isSelected ? "#90EE90" : "white",
                  border: `1.5px solid ${isSelected ? "var(--primary)" : "var(--border)"}`,
                }}
              >
                {isSelected && (
                  <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                    <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.8"
                      strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
              {m}
            </button>
          );
        })}
      </div>
 
      {/* Champ libre si "Autres" est sélectionné */}
      {motifsSelected.includes("Autres") && (
        <input
          className="input-dpi mt-1"
          placeholder="Préciser le motif..."
          autoFocus
        />
      )}
 
      {/* Récapitulatif pills des motifs sélectionnés */}
      {motifsSelected.length > 0 && (
        <div className="mt-4 pt-4 flex flex-wrap gap-2"
          style={{ borderTop: "1px solid var(--border)" }}>
          {motifsSelected.filter((m) => m !== "Autres").map((m) => (
            <span
              key={m}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
              style={{ background: "#90EE90", color: "white" }}
            >
              {m}
              <button
                onClick={() => toggleMotif(m)}
                className="ml-0.5 hover:opacity-70 transition-opacity"
                aria-label={`Retirer ${m}`}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 2L8 8M8 2L2 8" stroke="white" strokeWidth="1.8"
                    strokeLinecap="round" />
                </svg>
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}