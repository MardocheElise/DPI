// lib/data/interrogatoire-options.ts
// Listes d'options et libellés du sous-assistant "Interrogatoire".
// Données statiques — // TODO: charger les référentiels réels depuis l'API.

/** Sous-étapes de l'interrogatoire (chevrons oranges). */
export const SOUS_ETAPES_INTERROGATOIRE = [
  "Consultation & Histoire de la maladie",
  "Antécédents médicaux",
  "Antécédents chirurgicaux",
  "Antécédents gynéco-obstétricaux",
  "Antécédents médicamenteux",
  "Mode de vie",
  "Antécédents familiaux",
] as const;

// TODO: référentiel CIM des maladies.
export const MALADIES = [
  "Troubles respiratoires au cours de maladies classées ailleurs",
  "Autres troubles respiratoires",
  "Insuffisance respiratoire, non classée ailleurs",
  "Troubles respiratoires après un acte à visée diagnostique et thérapeutique, non classés ailleurs",
  "Autres affections pleurales",
  "Pneumothorax",
  "Hypertension artérielle",
  "Diabète",
  "Asthme",
  "Drépanocytose",
] as const;

// TODO: référentiel des actes chirurgicaux.
export const ACTES_CHIRURGICAUX = [
  "Utérus Cicatriciel",
  "Ulcere Gastrie",
  "Appendicetomie",
  "Greffe De Peau",
  "Cataracte",
  "Chirurgie Maxillo Farciale",
  "Césarienne",
  "Hernie",
] as const;

// TODO: référentiel des médicaments.
export const MEDICAMENTS = [
  "SALBUTAMOL SPRAY",
  "DJEKA",
  "KIT CORDON",
  "YEKAFER SIROP",
  "PARACETAMOL 1G SACHET",
  "ARTEMETHER LUMEFANTRINE 20/120 B/24",
  "LAIT PLUS SOLUTION",
] as const;

export const NATURES_DROGUE = [
  "Cannabis", "Cocaïne", "Héroïne", "Tabac à chiquer", "Autre",
] as const;