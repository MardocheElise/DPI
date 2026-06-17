// route: lib/data/infirmerie.ts
// Données du module Infirmerie (patients en attente de consultation + patients déjà consultés)
// TODO: remplacer les données statiques par les appels API/DB

export type TypeFiche = "Référencement Interne" | "Référencement Externe" | "Nouvelle Fiche"
export type Sexe = "masculin" | "feminin"

/** Patient prêt à être consulté : passé à l'accueil → fiche créée → paiement encaissé. */
export type PatientAttente = {
  id: string // identifiant numérique (route /infirmerie/constante/[id])
  referencePaiement: string
  patientNom: string
  patientCode: string
  sexe: Sexe
  age: number
  telephone: string
  service: string
  /** Date/heure d'enregistrement à l'accueil (ISO 8601). */
  date: string
  motif: string
  typeFiche: TypeFiche
  responsableCreation: string
  responsableInfirmier: string
}

/** Patient déjà passé en consultation : on ajoute l'horodatage et le praticien. */
export type PatientConsulte = PatientAttente & {
  /** Date/heure de fin de consultation (ISO 8601). */
  dateConsultation: string
  /** Praticien ayant pris en charge le patient. */
  praticien: string
}

/* ------------------------------------------------------------------ */
/*  Constantes / signes vitaux                                         */
/* ------------------------------------------------------------------ */
export type Constantes = {
  temperature: string // °C *
  perimetreCranien: string // cm
  perimetreBrachial: string // cm
  poids: string // kg
  taille: string // cm
  diurese: string // litre
  convulsions: "oui" | "non"
  zScore: string
  saturation: string // %
  etatNutritionnel: string // *
  hemoglobineGlyquee: string // %
  pouls: string // Btt/mn
  glycemie: string // g/l
  frequenceCardiaque: string // *
  groupeSanguin: string
  frequenceRespiratoire: string // Cle/mn
  brasGaucheTAS: string // mmHg
  brasGaucheTAD: string // mmHg
  brasDroitTAS: string // mmHg
  brasDroitTAD: string // mmHg
  observations: string
}

export const CONSTANTES_VIDES: Constantes = {
  temperature: "",
  perimetreCranien: "",
  perimetreBrachial: "",
  poids: "",
  taille: "",
  diurese: "",
  convulsions: "non",
  zScore: "",
  saturation: "",
  etatNutritionnel: "",
  hemoglobineGlyquee: "",
  pouls: "",
  glycemie: "",
  frequenceCardiaque: "",
  groupeSanguin: "",
  frequenceRespiratoire: "",
  brasGaucheTAS: "",
  brasGaucheTAD: "",
  brasDroitTAS: "",
  brasDroitTAD: "",
  observations: "",
}

/* ------------------------------------------------------------------ */
/*  Options de sélection                                               */
/* ------------------------------------------------------------------ */
export const ETATS_NUTRITIONNELS = [
  "Normal",
  "Dénutrition légère",
  "Dénutrition modérée",
  "Dénutrition sévère",
  "Surpoids",
  "Obésité",
]

export const FREQUENCES_CARDIAQUES = ["Normale", "Tachycardie", "Bradycardie", "Arythmie"]

export const GROUPES_SANGUINS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

export type Praticien = { id: string; nom: string; specialite: string }

// TODO: GET /api/praticiens
export const PRATICIENS: Praticien[] = [
  { id: "501", nom: "RUECKER LEATHA", specialite: "AGENT D'HYGIÈNE" },
  { id: "502", nom: "KOUASSI N'GUESSAN", specialite: "MÉDECIN GÉNÉRALISTE" },
  { id: "503", nom: "ADJOUA AFFOUÉ", specialite: "GYNÉCOLOGUE-OBSTÉTRICIEN" },
  { id: "504", nom: "KONÉ MARIAM", specialite: "PÉDIATRE" },
  { id: "505", nom: "YAO EMMANUEL", specialite: "CARDIOLOGUE" },
  { id: "506", nom: "BAMBA SALIMATA", specialite: "SAGE-FEMME" },
]

/* ------------------------------------------------------------------ */
/*  Génération d'identifiants / références                             */
/* ------------------------------------------------------------------ */
function randNum(len: number): string {
  let s = ""
  for (let i = 0; i < len; i++) s += Math.floor(Math.random() * 10)
  return s
}
function randAlpha(len: number): string {
  const L = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  let s = ""
  for (let i = 0; i < len; i++) s += L[Math.floor(Math.random() * L.length)]
  return s
}

/** Identifiant patient numérique (assez long). */
export function genPatientId(): string {
  return randNum(6)
}

/** Référence de fiche : FICHE-2026-PS47496-488361 (aléatoire, assez longue). */
export function genReferenceFiche(): string {
  const annee = new Date().getFullYear()
  return `FICHE-${annee}-${randAlpha(2)}${randNum(5)}-${randNum(6)}`
}

/* ------------------------------------------------------------------ */
/*  Utilitaire de formatage — "16 juin 2026 à 04:13:16"                */
/*  NOTE : peut être déplacé dans lib/format.ts                        */
/* ------------------------------------------------------------------ */
export function formatDateHeureFr(iso: string): string {
  const d = new Date(iso)
  const date = new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d)
  const heure = new Intl.DateTimeFormat("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(d)
  return `${date} à ${heure}`
}

/* ------------------------------------------------------------------ */
/*  Données statiques de démonstration                                 */
/* ------------------------------------------------------------------ */

// TODO: GET /api/infirmerie/attente
export const PATIENTS_ATTENTE: PatientAttente[] = [
  {
    id: "488361",
    referencePaiement: "FICHE-2026-PS47496-488361",
    patientNom: "KONAN KOFFI",
    patientCode: "D25G4006BBB",
    sexe: "feminin",
    age: 30,
    telephone: "(+225) 07 00 00 00 01",
    service: "MATERNITE",
    date: "2026-06-17T10:52:26",
    motif: "Consultation Gynécologue-Obstétrique",
    typeFiche: "Référencement Interne",
    responsableCreation: "FORM Form",
    responsableInfirmier: "FORM Form",
  },
  {
    id: "472210",
    referencePaiement: "FICHE-2026-OY16137-472210",
    patientNom: "KONE AWA FATIM",
    patientCode: "D26D2774CCC",
    sexe: "feminin",
    age: 4,
    telephone: "(+225) 07 00 00 00 02",
    service: "PEDIATRIE",
    date: "2026-06-16T05:02:41",
    motif: "Consultation pédiatrique de routine",
    typeFiche: "Nouvelle Fiche",
    responsableCreation: "FORM Form",
    responsableInfirmier: "FORM Form",
  },
  {
    id: "463084",
    referencePaiement: "FICHE-2026-OY16138-463084",
    patientNom: "TRAORE SEYDOU IBRAHIM",
    patientCode: "D26D2775DDD",
    sexe: "masculin",
    age: 58,
    telephone: "(+225) 07 00 00 00 03",
    service: "CARDIOLOGIE",
    date: "2026-06-16T06:21:09",
    motif: "Suivi tension artérielle",
    typeFiche: "Référencement Interne",
    responsableCreation: "FORM Form",
    responsableInfirmier: "FORM Form",
  },
  {
    id: "451937",
    referencePaiement: "FICHE-2026-OY16139-451937",
    patientNom: "DIALLO MARIAM AÏCHA",
    patientCode: "D26D2776EEE",
    sexe: "feminin",
    age: 25,
    telephone: "(+225) 07 00 00 00 04",
    service: "DERMATOLOGIE",
    date: "2026-06-16T07:45:33",
    motif: "Éruption cutanée persistante",
    typeFiche: "Référencement Externe",
    responsableCreation: "FORM Form",
    responsableInfirmier: "FORM Form",
  },
  {
    id: "447028",
    referencePaiement: "FICHE-2026-OY16140-447028",
    patientNom: "OUATTARA YACOUBA",
    patientCode: "D26D2777FFF",
    sexe: "masculin",
    age: 41,
    telephone: "(+225) 07 00 00 00 05",
    service: "GENERALE",
    date: "2026-06-16T08:10:00",
    motif: "Consultation générale",
    typeFiche: "Nouvelle Fiche",
    responsableCreation: "FORM Form",
    responsableInfirmier: "FORM Form",
  },
]

// TODO: GET /api/infirmerie/deja-consulte
export const PATIENTS_CONSULTES: PatientConsulte[] = [
  {
    id: "425001",
    referencePaiement: "FICHE-2026-OY16120-425001",
    patientNom: "BAMBA SALIMATA",
    patientCode: "D26D2760AAA",
    sexe: "feminin",
    age: 33,
    telephone: "(+225) 07 00 00 00 10",
    service: "GYNECOLOGIE",
    date: "2026-06-16T07:55:12",
    dateConsultation: "2026-06-16T08:40:55",
    motif: "Consultation Gynécologue-Obstétrique",
    typeFiche: "Référencement Interne",
    responsableCreation: "FORM Form",
    responsableInfirmier: "FORM Form",
    praticien: "Dr. KOUASSI N'Guessan",
  },
  {
    id: "424118",
    referencePaiement: "FICHE-2026-OY16121-424118",
    patientNom: "YAO KOFFI EMMANUEL",
    patientCode: "D26D2761BBB",
    sexe: "masculin",
    age: 47,
    telephone: "(+225) 07 00 00 00 11",
    service: "CARDIOLOGIE",
    date: "2026-06-16T08:05:30",
    dateConsultation: "2026-06-16T09:12:10",
    motif: "Bilan cardiaque annuel",
    typeFiche: "Nouvelle Fiche",
    responsableCreation: "FORM Form",
    responsableInfirmier: "FORM Form",
    praticien: "Inf. ADJOUA Affoué",
  },
  {
    id: "423765",
    referencePaiement: "FICHE-2026-OY16122-423765",
    patientNom: "COULIBALY ABOUBAKAR",
    patientCode: "D26D2762CCC",
    sexe: "masculin",
    age: 2,
    telephone: "(+225) 07 00 00 00 12",
    service: "PEDIATRIE",
    date: "2026-06-16T08:20:44",
    dateConsultation: "2026-06-16T09:48:02",
    motif: "Vaccination de rappel",
    typeFiche: "Référencement Interne",
    responsableCreation: "FORM Form",
    responsableInfirmier: "FORM Form",
    praticien: "Dr. KONÉ Mariam",
  },
]

/** Retrouve un patient en attente par son id. */
// TODO: GET /api/infirmerie/attente/:id
export function getPatientAttenteById(id: string): PatientAttente | undefined {
  return PATIENTS_ATTENTE.find((p) => p.id === id)
}