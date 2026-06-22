// lib/data/examen-complementaire-options.ts
// Listes d'options et libellés du sous-assistant "Examens complémentaires".
// Données statiques — // TODO: charger les référentiels réels depuis l'API.

export const SOUS_ETAPES_COMPLEMENTAIRE = ["TDR", "Autres examens"] as const;

export const TDR_TESTS = [
  "Paludisme",
  "Goutte Epaisse",
  "VIH",
  "Grossesse",
  "Dengue",
  "COVID",
  "GLYCEMIE",
  "EMILDA",
] as const;

export const TDR_RESULTATS = [
  "Non réalisée",
  "Positif",
  "Négatif",
  "Indéterminé",
] as const;

// TODO: référentiel des natures d'examen.
export const NATURES_EXAMEN = [
  "Biologie",
  "Imagerie médicale",
  "Échographie",
  "Radiologie",
  "Anatomopathologie",
  "Microbiologie",
] as const;

// TODO: référentiel des actes / examens.
export const ACTES_EXAMEN = [
  "NFS",
  "Goutte épaisse",
  "Glycémie à jeun",
  "Créatininémie",
  "Ionogramme sanguin",
  "Transaminases",
  "Radiographie du thorax",
  "Échographie abdominale",
  "ECBU",
  "Sérologie VIH",
  "Test de grossesse",
] as const;

export const PRIORITES_EXAMEN = ["Normal", "Urgent", "Très urgent"] as const;
