// Route: /form/paiement-form (données statiques en attendant la BD)
// Listes de référence : services, types de prestation (avec prix unitaire) et assurances.

export interface ServiceOption {
  value: string;
  label: string;
}

export interface PrestationType {
  value: string;
  label: string;
  prixUnitaire: number; // F CFA — pré-rempli à la sélection
}

export interface AssuranceOption {
  value: string;
  label: string;
  taux: number; // part prise en charge (0 à 1)
}

export const SERVICES: ServiceOption[] = [
  { value: "medecine-generale", label: "MEDECINE GENERALE" },
  { value: "maternite", label: "MATERNITE" },
  { value: "cardiologie", label: "CARDIOLOGIE" },
  { value: "pediatrie", label: "PEDIATRIE" },
  { value: "chirurgie", label: "CHIRURGIE" },
  { value: "laboratoire", label: "LABORATOIRE" },
];

export const TYPES_PRESTATION: PrestationType[] = [
  { value: "visite-medicale", label: "Visite médicale", prixUnitaire: 5000 },
  { value: "injection", label: "Injection", prixUnitaire: 1500 },
  { value: "perfusion", label: "Perfusion", prixUnitaire: 3000 },
  { value: "pansement", label: "Pansement", prixUnitaire: 2000 },
  {
    value: "consultation-spe",
    label: "Consultation spécialisée",
    prixUnitaire: 10000,
  },
  { value: "analyse-sang", label: "Analyse sanguine", prixUnitaire: 8000 },
];

export const ASSURANCES: AssuranceOption[] = [
  { value: "aucune", label: "Aucune", taux: 0 },
  { value: "cnam", label: "CNAM", taux: 0.7 },
  { value: "mugef-ci", label: "MUGEF-CI", taux: 0.8 },
  { value: "privee", label: "Assurance privée", taux: 0.5 },
];
