// lib/data/examen-physique-options.ts
// Listes d'options et libellés du sous-assistant "Examens physiques".
// Données statiques — // TODO: charger les référentiels réels depuis l'API.

export const SOUS_ETAPES_EXAMEN = [
  "Etat général",
  "Appareil cutanéo-muqueux",
  "Appareil cardio-vasculaire",
  "Appareil digestif",
  "Appareil pleuro-pulmonaire",
  "Appareil ostéo-articulaires et musculaires",
  "Appareil neuro musculaire",
  "Aires ganglionnaires",
  "Autres examens cliniques",
  "Diagnostics",
] as const;

export const ETATS_GENERAUX = [
  "Excellent",
  "Bon",
  "Moyen",
  "Altéré",
  "Mauvais",
] as const;

export const CONJONCTIVES = [
  "Bien colorées",
  "Moyennement colorée",
  "Pâles",
  "Ictériques",
] as const;

export const LANGUES = ["Normale", "Saburrale", "Sèche", "Dépapillée"] as const;

export const ETATS_HYDRATATION = [
  "Normal",
  "DESHYDRATATION PLAN A",
  "DESHYDRATATION PLAN B",
  "DESHYDRATATION PLAN C",
] as const;

export const OEDEMES = ["Absents", "Présents"] as const;

export const SIEGES_OEDEMES = [
  "Visage",
  "Membres inférieurs",
  "Membres supérieurs",
  "Généralisés",
] as const;

export const BDC_OPTIONS = ["Normaux", "Assourdis", "Irréguliers"] as const;

export const TYPES_BATTEMENT = [
  "Régulier",
  "Tachycardie",
  "Bradycardie",
  "Arythmie",
] as const;

export const ABDOMEN_OPTIONS = [
  "Souple",
  "Balloné",
  "Distendu",
  "Sensible",
  "Défense",
  "Contracture",
] as const;

export const FOIE_OPTIONS = ["Normal", "Hépatomégalie"] as const;

export const BORD_INFERIEUR_FOIE = ["Normal", "Mousse", "Tranchant"] as const;

export const RATE_OPTIONS = [
  "Normal",
  "Splenomegalie type I",
  "Splenomegalie type II",
  "Splenomegalie type III",
  "Splenomegalie type IV",
] as const;

export const TYPES_RESPIRATOIRE = [
  "Eupnée",
  "Bradypnée",
  "Tachypnée",
  "Dyspnée",
] as const;

export const MURMURE_TYPES = [
  "Normaux",
  "Diminués",
  "Abolies",
  "Renforcés",
] as const;

export const SONORITES = [
  "Normale",
  "Matité",
  "Tympanisme",
  "Submatité",
] as const;

export const REFLEXES_OSTEO = [
  "Normaux",
  "Vifs",
  "Abolis",
  "Diminués",
] as const;

export const CONSCIENCES = [
  "Normale",
  "Obnubilation",
  "Confusion",
  "Coma",
] as const;

export const CODIFICATIONS = ["1", "2", "3", "4", "5"] as const;

// TODO: référentiel CIM des diagnostics.
export const DIAGNOSTICS = [
  "Séquelles d'autres causes externes",
  "Exposition à la fumée, au feu et aux flammes, intention non déterminée",
  "Paludisme",
  "Fièvre typhoïde",
  "Infection respiratoire aiguë",
  "Gastro-entérite",
  "Hypertension artérielle",
  "Diabète sucré",
  "Anémie",
  "Drépanocytose",
] as const;
