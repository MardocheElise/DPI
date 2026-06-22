// lib/data/consultation-options.ts
// Listes d'options des champs <Select> du formulaire de consultation.
// Données statiques — // TODO: charger les référentiels réels depuis l'API.

export const NATIONALITES = [
  "Côte d'Ivoire", "Mali", "Burkina Faso", "Ghana", "Sénégal",
  "Guinée", "Nigéria", "Autre",
] as const;

export const PROFESSIONS = [
  "instituteur retraité", "élève", "étudiant(e)", "fonctionnaire",
  "commerçant(e)", "agriculteur", "artisan", "ménagère", "sans emploi", "autre",
] as const;

export const TYPES_POPULATION = [
  "Civil", "Scolaire", "Militaire", "Détenu", "Réfugié", "Autre",
] as const;

export const VILLES_COMMUNES = [
  "GUEYO", "MADINANI", "ABIDJAN", "BOUAKÉ", "DALOA", "YAMOUSSOUKRO",
  "SAN-PÉDRO", "KORHOGO", "MAN",
] as const;

export const TYPES_VISITE = [
  "Première visite", "Visite de suivi", "Visite de contrôle", "Urgence",
] as const;

export const COMMUNES_LOCALITES = [
  "MADINANI", "GUEYO", "ABOBO", "YOPOUGON", "COCODY", "TREICHVILLE", "ADJAMÉ",
] as const;

export const MODES_ENTREE = [
  "Venu(e) de lui/elle-même", "Référé(e)", "Évacué(e)", "Transféré(e)",
] as const;

export const STATUTS_CONJUGAL = [
  "Célibataire", "Marié(e)", "Divorcé(e)", "Veuf/Veuve", "Union libre",
] as const;

export const SCOLARISATION = ["Oui", "Non"] as const;

export const PROTECTIONS_SOCIALES = [
  "CMU", "CNPS", "MUGEFCI", "Assurance privée", "Aucune",
] as const;

export const TRANCHES_AGE = [
  "0 - 4 ans", "5 - 9 ans", "8 - 14 ans", "15 - 19 ans",
  "20 - 24 ans", "25 - 49 ans", "50 ans +",
] as const;

/* --------------------------- Étape Constantes ---------------------------- */

export const ETATS_NUTRITIONNEL = [
  "Normal", "Maigreur", "Surpoids", "Obésité",
  "Malnutrition aiguë modérée", "Malnutrition aiguë sévère",
] as const;

export const FREQUENCES_CARDIAQUE = [
  "Normale", "Bradycardie", "Tachycardie", "Irrégulière",
] as const;

export const GROUPES_SANGUINS = [
  "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-",
] as const;

/** Étapes du formulaire de consultation (assistant multi-étapes). */
export const ETAPES_CONSULTATION = [
  "Identification du patient",
  "Constantes",
  "Interrogatoire",
  "Examen physique",
  "Examens complémentaires",
  "Conduite à tenir",
] as const;