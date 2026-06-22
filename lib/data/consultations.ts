// lib/data/consultations.ts
// Données & types du module "Médecine générale" (sous-modules Infirmerie).
// Données statiques pour l'instant — voir les // TODO pour le branchement API/DB.

/** État d'un patient dans la file de consultation. */
export type EtatConsultation = "en-attente" | "en-consultation" | "termine";

/** Type de prestation (extensible : consultation, suivi, urgence…). */
export type TypePrestation = "consultation";

/** Issue d'une consultation terminée. */
export type IssueConsultation = "sortie" | "hospitalisation" | "transfert";

/** Patient prêt à être consulté : passé à l'accueil → fiche de paiement créée
 *  → payé en caisse → constantes prises à l'infirmerie. */
export interface PatientAConsulter {
  id: string;
  nom: string;
  prenom: string;
  /** Numéro de carte patient (ex. D26W7127BBB). */
  numeroCarte: string;
  /** Agent / médecin auquel le patient est affecté. */
  affecteA: string;
  /** Date/heure d'arrivée à l'infirmerie (ISO). */
  arriveLe: string;
  /** Température relevée (°C). */
  temperature: number;
  type: TypePrestation;
  etat: EtatConsultation;
}

/** Patient déjà consulté (historique). */
export interface PatientDejaConsulte {
  id: string;
  nom: string;
  prenom: string;
  numeroCarte: string;
  age: number;
  /** Référence de la fiche de consultation. */
  ficheRef: string;
  /** Date/heure de la consultation (ISO). */
  dateConsultation: string;
  /** Nom du médecin ayant consulté. */
  medecin: string;
  type: TypePrestation;
  issue: IssueConsultation;
}

/** Seuil de fièvre : au-delà la température est affichée en "élevée". */
export const SEUIL_FIEVRE = 37.8;
export const estFievre = (temp: number) => temp >= SEUIL_FIEVRE;

const MOIS_FR = [
  "janvier",
  "février",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "août",
  "septembre",
  "octobre",
  "novembre",
  "décembre",
];

/** Format FR long avec heure : "17 juin 2026 à 10:26:30". */
export function formatDateHeureFr(iso: string): string {
  const d = new Date(iso);
  const jour = d.getDate();
  const mois = MOIS_FR[d.getMonth()];
  const annee = d.getFullYear();
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  const ss = String(d.getSeconds()).padStart(2, "0");
  return `${jour} ${mois} ${annee} à ${hh}:${mm}:${ss}`;
}

/** Données pré-remplies servant à amorcer le formulaire de consultation. */
export interface ConsultationPrefill {
  patientId: string;
  nomComplet: string;
  ageAns: number;
  ageMois: number;
  ageJours: number;
  sexe: "masculin" | "feminin";
  code: string;
  motif: string;
  professionnel: string;
  dateConsultation: string; // ISO
  nationalite: string;
  profession: string;
  dateNaissance: string; // ISO (yyyy-mm-dd)
  typePopulation: string;
  villeCommune: string;
  typeVisite: string;
  communeLocalite: string;
  telephone: string;
  residenceHabituelle: string;
  telephoneAutre: string;
  residenceActuelle: string;
  modeEntree: string;
  statutConjugal: string;
  scolarisation: string;
  protectionSociale: string;
  trancheAge: string;
}

/** Construit la chaîne d'identité affichée en lecture seule, ex. :
 *  "Ritchie AUTO Shaniya (Age: 30an(s) , 7mois et 28jour(s)), Sexe: masculin, Code: D26W7127BBB" */
export function formatIdentitePatient(p: ConsultationPrefill): string {
  return `${p.nomComplet} (Age: ${p.ageAns}an(s) , ${p.ageMois}mois et ${p.ageJours}jour(s)), Sexe: ${p.sexe}, Code: ${p.code}`;
}

// TODO: remplacer par un appel API (dossier patient complet à partir de l'id).
const PREFILLS: Record<string, ConsultationPrefill> = {
  "1": {
    patientId: "1",
    nomComplet: "Ritchie AUTO Shaniya",
    ageAns: 30,
    ageMois: 7,
    ageJours: 28,
    sexe: "masculin",
    code: "D26W7127BBB",
    motif: "CONSULTATION ELEVE",
    professionnel: "FORM Form",
    dateConsultation: "2026-06-17T15:41:49",
    nationalite: "Côte d'Ivoire",
    profession: "instituteur retraité",
    dateNaissance: "1995-10-20",
    typePopulation: "Scolaire",
    villeCommune: "GUEYO",
    typeVisite: "",
    communeLocalite: "MADINANI",
    telephone: "(+225) 01 2037 3938",
    residenceHabituelle: "MADINANI",
    telephoneAutre: "",
    residenceActuelle: "MADINANI",
    modeEntree: "",
    statutConjugal: "Célibataire",
    scolarisation: "",
    protectionSociale: "",
    trancheAge: "25 - 49 ans",
  },
};

/** Renvoie les données de pré-remplissage pour un patient à consulter.
 *  Si l'id n'a pas de dossier détaillé, on amorce avec les infos de la file. */
export function getConsultationPrefill(id: string): ConsultationPrefill | null {
  if (PREFILLS[id]) return PREFILLS[id];

  const patient = PATIENTS_A_CONSULTER.find((p) => p.id === id);
  if (!patient) return null;

  return {
    patientId: patient.id,
    nomComplet: `${patient.nom} ${patient.prenom}`,
    ageAns: 0,
    ageMois: 0,
    ageJours: 0,
    sexe: "masculin",
    code: patient.numeroCarte,
    motif: "CONSULTATION",
    professionnel: patient.affecteA,
    dateConsultation: new Date().toISOString(),
    nationalite: "Côte d'Ivoire",
    profession: "",
    dateNaissance: "",
    typePopulation: "",
    villeCommune: "",
    typeVisite: "",
    communeLocalite: "",
    telephone: "",
    residenceHabituelle: "",
    telephoneAutre: "",
    residenceActuelle: "",
    modeEntree: "",
    statutConjugal: "",
    scolarisation: "",
    protectionSociale: "",
    trancheAge: "",
  };
}

/** Constantes (signes vitaux) relevées à l'infirmerie. */
export interface Constantes {
  temperature: string;
  poids: string;
  taille: string;
  perimetreCranien: string;
  perimetreBrachial: string;
  zscore: string;
  diurese: string;
  etatNutritionnel: string;
  convulsions: "oui" | "non" | "";
  pouls: string;
  saturationOxygene: string;
  frequenceCardiaque: string;
  hemoglobineGlyquee: string;
  frequenceRespiratoire: string;
  glycemie: string;
  groupeSanguin: string;
  brasGaucheTAS: string;
  brasGaucheTAD: string;
  brasDroitTAS: string;
  brasDroitTAD: string;
  observations: string;
}

const CONSTANTES_VIDE: Constantes = {
  temperature: "",
  poids: "",
  taille: "",
  perimetreCranien: "",
  perimetreBrachial: "",
  zscore: "",
  diurese: "",
  etatNutritionnel: "",
  convulsions: "",
  pouls: "",
  saturationOxygene: "",
  frequenceCardiaque: "",
  hemoglobineGlyquee: "",
  frequenceRespiratoire: "",
  glycemie: "",
  groupeSanguin: "",
  brasGaucheTAS: "",
  brasGaucheTAD: "",
  brasDroitTAS: "",
  brasDroitTAD: "",
  observations: "",
};

// TODO: remplacer par un appel API (constantes saisies à l'infirmerie).
export function getConstantesPrefill(id: string): Constantes {
  if (id === "1") {
    return {
      ...CONSTANTES_VIDE,
      temperature: "45",
      poids: "47.4",
      taille: "160",
      zscore: "42",
      diurese: "2",
      convulsions: "non",
      pouls: "43",
      saturationOxygene: "40",
      hemoglobineGlyquee: "76",
      frequenceRespiratoire: "55",
      glycemie: "1",
    };
  }
  const patient = PATIENTS_A_CONSULTER.find((p) => p.id === id);
  return {
    ...CONSTANTES_VIDE,
    temperature: patient ? String(patient.temperature) : "",
  };
}

/* =============================== Interrogatoire =============================== */

export type OuiNon = "oui" | "non" | "";
export type OuiNonNA = "oui" | "non" | "na" | "";

export interface MaladieEntry {
  id: string;
  horsListe: boolean;
  maladie: string;
  anneeSurvenue: string;
  notes: string;
}

export interface ChirurgieEntry {
  id: string;
  horsListe: boolean;
  acte: string;
  motif: string;
  dateOperation: string;
  notes: string;
}

export interface GynecoEntry {
  id: string;
  horsListe: boolean;
  maladie: string;
  anneeDecouverte: string;
  notes: string;
}

export interface MedicamentEntry {
  id: string;
  horsListe: boolean;
  medicament: string;
  anneeSurvenue: string;
  commentaire: string;
}

export interface ModeDeVie {
  na: boolean;
  alcool: OuiNon;
  alcoolQte: string;
  tabac: OuiNon;
  tabacQte: string;
  drogue: OuiNon;
  drogueNature: string;
  sport: OuiNon;
  sportQte: string;
  autresInfos: string;
}

export interface AntecedentsFamiliaux {
  pere: OuiNon;
  mere: OuiNon;
  frere: OuiNon;
  soeur: OuiNon;
  conjoint: OuiNon;
  enfants: OuiNon;
}

export interface Interrogatoire {
  // Consultation & histoire de la maladie
  motif: string;
  histoireMaladie: string;
  tuberculose: OuiNonNA;
  // Antécédents médicaux
  hta: OuiNon;
  diabete: OuiNon;
  medicauxNA: boolean;
  medicaux: MaladieEntry[];
  autresMedicaux: string;
  // Antécédents chirurgicaux
  chirurgicauxNA: boolean;
  chirurgicaux: ChirurgieEntry[];
  autresChirurgicaux: string;
  // Antécédents gynéco-obstétricaux
  gynecoNA: boolean;
  gyneco: GynecoEntry[];
  autresGyneco: string;
  // Antécédents médicamenteux
  medicamenteuxNA: boolean;
  medicamenteux: MedicamentEntry[];
  autresMedicamenteux: string;
  // Mode de vie
  modeDeVie: ModeDeVie;
  // Antécédents familiaux
  familiaux: AntecedentsFamiliaux;
}

const maladieVide = (id: string): MaladieEntry => ({
  id,
  horsListe: false,
  maladie: "",
  anneeSurvenue: "",
  notes: "",
});
const chirurgieVide = (id: string): ChirurgieEntry => ({
  id,
  horsListe: false,
  acte: "",
  motif: "",
  dateOperation: "",
  notes: "",
});
const gynecoVide = (id: string): GynecoEntry => ({
  id,
  horsListe: false,
  maladie: "",
  anneeDecouverte: "",
  notes: "",
});
const medicamentVide = (id: string): MedicamentEntry => ({
  id,
  horsListe: false,
  medicament: "",
  anneeSurvenue: "",
  commentaire: "",
});

// TODO: remplacer par un appel API (antécédents déjà connus du patient).
export function getInterrogatoirePrefill(_id: string): Interrogatoire {
  return {
    motif: "",
    histoireMaladie: "",
    tuberculose: "na",
    hta: "non",
    diabete: "non",
    medicauxNA: true,
    medicaux: [maladieVide("med-1")],
    autresMedicaux: "",
    chirurgicauxNA: true,
    chirurgicaux: [chirurgieVide("chir-1")],
    autresChirurgicaux: "",
    gynecoNA: true,
    gyneco: [gynecoVide("gyn-1")],
    autresGyneco: "",
    medicamenteuxNA: true,
    medicamenteux: [medicamentVide("medic-1")],
    autresMedicamenteux: "",
    modeDeVie: {
      na: false,
      alcool: "non",
      alcoolQte: "",
      tabac: "non",
      tabacQte: "",
      drogue: "non",
      drogueNature: "",
      sport: "non",
      sportQte: "",
      autresInfos: "",
    },
    familiaux: {
      pere: "oui",
      mere: "oui",
      frere: "oui",
      soeur: "oui",
      conjoint: "oui",
      enfants: "oui",
    },
  };
}

/** Fabriques d'entrées vides exportées pour le bouton "Ajouter". */
export const nouvelleMaladie = maladieVide;
export const nouvelleChirurgie = chirurgieVide;
export const nouveauGyneco = gynecoVide;
export const nouveauMedicament = medicamentVide;

/* =============================== Examens physiques =============================== */

export type Percu = "percu" | "non-percu" | "";

export interface ExamenPhysique {
  // Etat général
  etatGeneral: string;
  // Appareil cutanéo-muqueux
  conjonctives: string;
  langue: string;
  autresLesions: string;
  etatHydratation: string;
  oedemes: string;
  siegeOedemes: string;
  // Appareil cardio-vasculaire
  bdc: string;
  typeBattement: string;
  souffleSystolique: OuiNon;
  intensiteSystolique: string;
  souffleDiastolique: OuiNon;
  intensiteDiastolique: string;
  frottementCardiaque: OuiNon;
  siegeChocPointe: string;
  siegeFrottement: string;
  harzerPositif: OuiNon;
  fremissement: OuiNon;
  refluxHepatojugulaire: OuiNon;
  heretismeVasculaire: OuiNon;
  poulsFemoraux: Percu;
  poulsPediaux: Percu;
  poulsTibaux: Percu;
  // Appareil digestif
  abdomen: string[];
  siegeDouleur: string;
  foie: string;
  bordInferieurFoie: string;
  surfaceFoie: string;
  rate: string;
  tailleRate: string;
  // Appareil pleuro-pulmonaire
  typeRespiratoire: string;
  ralesCrepitants: OuiNon;
  siegeRalesCrepitants: string;
  ralesSousCrepitants: OuiNon;
  siegeRalesSousCrepitants: string;
  sibilants: OuiNon;
  siegeSibilants: string;
  frottementPleural: OuiNon;
  siegeFrottementPleural: string;
  epanchementPleural: OuiNon;
  siegePleural: string;
  murmureVesiculaire: OuiNon;
  murmureType: string;
  murmureSiege: string;
  vibrationsVocales: OuiNon;
  vibrationsType: string;
  sonorite: string;
  siegeMatite: string;
  autresTypes: string;
  autrePleuroPulmonaire: string;
  // Appareil ostéo-articulaires et musculaires
  reflexesOsteoTendineux: string;
  typeReflex: string;
  autreOsteoArticulaire: string;
  // Appareil neuro musculaire
  conscience: string;
  deficitSensitif: OuiNon;
  siegeDeficitSensitif: string;
  deficitMoteur: OuiNon;
  siegeDeficitMoteur: string;
  autresDeficit: string;
  codification: string;
  // Aires ganglionnaires
  adenopathie: OuiNon;
  nombreAdenopathie: string;
  caracteristiqueAdenopathie: string;
  // Autres examens cliniques
  autresExamensCliniques: string;
  // Diagnostics
  hypothese1: string;
  hypothese2: string;
  hypothese3: string;
  diagnosticRetenu: string;
  pathologie1: string;
  pathologie2: string;
  pathologie3: string;
}

// TODO: remplacer par un appel API (examen physique déjà saisi, le cas échéant).
export function getExamenPhysiquePrefill(_id: string): ExamenPhysique {
  return {
    etatGeneral: "",
    conjonctives: "",
    langue: "",
    autresLesions: "",
    etatHydratation: "",
    oedemes: "",
    siegeOedemes: "",
    bdc: "",
    typeBattement: "",
    souffleSystolique: "",
    intensiteSystolique: "",
    souffleDiastolique: "",
    intensiteDiastolique: "",
    frottementCardiaque: "",
    siegeChocPointe: "",
    siegeFrottement: "",
    harzerPositif: "",
    fremissement: "",
    refluxHepatojugulaire: "",
    heretismeVasculaire: "",
    poulsFemoraux: "",
    poulsPediaux: "",
    poulsTibaux: "",
    abdomen: [],
    siegeDouleur: "",
    foie: "",
    bordInferieurFoie: "",
    surfaceFoie: "",
    rate: "",
    tailleRate: "",
    typeRespiratoire: "",
    ralesCrepitants: "",
    siegeRalesCrepitants: "",
    ralesSousCrepitants: "",
    siegeRalesSousCrepitants: "",
    sibilants: "",
    siegeSibilants: "",
    frottementPleural: "",
    siegeFrottementPleural: "",
    epanchementPleural: "",
    siegePleural: "",
    murmureVesiculaire: "",
    murmureType: "",
    murmureSiege: "",
    vibrationsVocales: "",
    vibrationsType: "",
    sonorite: "",
    siegeMatite: "",
    autresTypes: "",
    autrePleuroPulmonaire: "",
    reflexesOsteoTendineux: "",
    typeReflex: "",
    autreOsteoArticulaire: "",
    conscience: "",
    deficitSensitif: "",
    siegeDeficitSensitif: "",
    deficitMoteur: "",
    siegeDeficitMoteur: "",
    autresDeficit: "",
    codification: "",
    adenopathie: "",
    nombreAdenopathie: "",
    caracteristiqueAdenopathie: "",
    autresExamensCliniques: "",
    hypothese1: "",
    hypothese2: "",
    hypothese3: "",
    diagnosticRetenu: "",
    pathologie1: "",
    pathologie2: "",
    pathologie3: "",
  };
}

/* =============================== Examens complémentaires =============================== */

export interface ExamRequest {
  id: string;
  nature: string;
  actes: string[];
  priorite: string;
  renseignementClinique: string;
  interpretation: string;
}

export interface ExamenComplementaire {
  /** Résultat des TDR par test (Paludisme, VIH, …). */
  tdr: Record<string, string>;
  vueAutres: "internes" | "externes";
  examensInternes: ExamRequest[];
  examensExternes: ExamRequest[];
}

const examRequestVide = (id: string): ExamRequest => ({
  id,
  nature: "",
  actes: [],
  priorite: "",
  renseignementClinique: "",
  interpretation: "",
});

/** Fabrique d'une demande d'examen vide (bouton "Ajouter un autre examen"). */
export const nouvelExamen = examRequestVide;

// TODO: remplacer par un appel API (examens déjà demandés / résultats).
export function getExamenComplementairePrefill(
  _id: string,
): ExamenComplementaire {
  const tdr: Record<string, string> = {};
  for (const test of EXAMEN_COMPLEMENTAIRE_TESTS) tdr[test] = "Non réalisée";
  return {
    tdr,
    vueAutres: "internes",
    examensInternes: [examRequestVide("int-1")],
    examensExternes: [examRequestVide("ext-1")],
  };
}

// Liste des tests TDR pré-initialisés (doit rester alignée avec TDR_TESTS).
const EXAMEN_COMPLEMENTAIRE_TESTS = [
  "Paludisme",
  "Goutte Epaisse",
  "VIH",
  "Grossesse",
  "Dengue",
  "COVID",
  "GLYCEMIE",
  "EMILDA",
];

// TODO: remplacer par un appel API (patients ayant payé + constantes prises à l'infirmerie).
export const PATIENTS_A_CONSULTER: PatientAConsulter[] = [
  {
    id: "1",
    nom: "Ritchie AUTO",
    prenom: "Shaniya",
    numeroCarte: "D26W7127BBB",
    affecteA: "FORM Form",
    arriveLe: "2026-06-17T10:26:30",
    temperature: 45,
    type: "consultation",
    etat: "en-attente",
  },
  {
    id: "2",
    nom: "Schmidt AUTO",
    prenom: "Lawrence",
    numeroCarte: "D26Q5714BBB",
    affecteA: "KAKOU Stephane",
    arriveLe: "2026-06-17T04:16:50",
    temperature: 39,
    type: "consultation",
    etat: "en-consultation",
  },
  {
    id: "3",
    nom: "Bahoua AUTO",
    prenom: "Mariam",
    numeroCarte: "D26K3382BBB",
    affecteA: "KOUASSI Aya",
    arriveLe: "2026-06-17T08:42:12",
    temperature: 36,
    type: "consultation",
    etat: "en-consultation",
  },
  {
    id: "4",
    nom: "Diallo AUTO",
    prenom: "Ibrahim",
    numeroCarte: "D26P9051BBB",
    affecteA: "FORM Form",
    arriveLe: "2026-06-17T09:15:00",
    temperature: 37.2,
    type: "consultation",
    etat: "en-attente",
  },
  {
    id: "5",
    nom: "Koffi AUTO",
    prenom: "Estelle",
    numeroCarte: "D26B2204BBB",
    affecteA: "KAKOU Stephane",
    arriveLe: "2026-06-17T07:58:41",
    temperature: 38.6,
    type: "consultation",
    etat: "en-consultation",
  },
];

// TODO: remplacer par un appel API (historique des consultations).
export const PATIENTS_DEJA_CONSULTES: PatientDejaConsulte[] = [
  {
    id: "1",
    nom: "Hilpert AUTO",
    prenom: "Ansel",
    numeroCarte: "D26A6349BBB",
    age: 46,
    ficheRef: "FICHE-2026-CK40166-688962",
    dateConsultation: "2026-06-17T04:16:42",
    medecin: "Stephane KAKOU",
    type: "consultation",
    issue: "sortie",
  },
  {
    id: "2",
    nom: "Traoré AUTO",
    prenom: "Fanta",
    numeroCarte: "D26C1187BBB",
    age: 31,
    ficheRef: "FICHE-2026-CK40171-688990",
    dateConsultation: "2026-06-16T15:02:10",
    medecin: "Aya KOUASSI",
    type: "consultation",
    issue: "hospitalisation",
  },
  {
    id: "3",
    nom: "N'Guessan AUTO",
    prenom: "Marc",
    numeroCarte: "D26D7745BBB",
    age: 58,
    ficheRef: "FICHE-2026-CK40180-689044",
    dateConsultation: "2026-06-16T11:48:33",
    medecin: "Stephane KAKOU",
    type: "consultation",
    issue: "sortie",
  },
  {
    id: "4",
    nom: "Yao AUTO",
    prenom: "Patricia",
    numeroCarte: "D26E3320BBB",
    age: 27,
    ficheRef: "FICHE-2026-CK40193-689101",
    dateConsultation: "2026-06-15T09:21:05",
    medecin: "Aya KOUASSI",
    type: "consultation",
    issue: "transfert",
  },
];
