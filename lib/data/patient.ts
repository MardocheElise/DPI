// lib/patients.ts
// Données statiques des patients du DPI

export type Criticity = "normal" | "anormal" | "critique";
export type Trend = "up" | "down" | "stable";
export type ExamStatus = "valide" | "en_attente";

export interface BiologieResult {
  id: string;
  code: string;
  label: string;
  value: number;
  unit: string;
  normalMin: number;
  normalMax: number;
  criticity: Criticity;
  trend: Trend;
  previousValue?: number;
  date: string;
  service: string;
  status: ExamStatus;
  biologiste?: string;
}

export interface Imagerie {
  id: string;
  label: string;
  type: string;
  date: string;
  radiologue?: string;
  service: string;
  status: ExamStatus;
  priority: string;
  conclusion: string;
  details: string;
  slices: number;
}

export interface AutreExamen {
  id: string;
  type: string;
  label: string;
  date: string;
  doctor?: string;
  service: string;
  status: ExamStatus;
  result: string;
  details: Record<string, string> | string;
}

export interface Antecedent {
  type: string;
  date: string;
  statut: string;
}

export interface AntecedentFamilial {
  parent: string;
  pathologie: string;
}

export interface Traitement {
  medicament: string;
  posologie: string;
  duree: string;
}

export interface ContactUrgence {
  nom: string;
  lien: string;
  tel: string;
}

export interface Hospitalisation {
  service: string;
  lit: string;
  dateEntree: string;
  dateSortie: string;
  type: string;
  motif: string;
  statut: string;
}

export interface Patient {
  id: string;
  nom: string;
  prenom: string;
  dateNaissance: string;
  age: number;
  sexe: string;
  ins: string;
  adresse: string;
  telephone: string;
  email: string;
  medecin: string;
  groupeSanguin: string;
  allergies: string[];
  contreIndications: string[];
  antecedentsPerso: Antecedent[];
  antecedentsFamiliaux: AntecedentFamilial[];
  traitements: Traitement[];
  urgences: ContactUrgence[];
  hospitalisation?: Hospitalisation;
  assurance: string;
  convention: string;
  statut: "Hospitalisé" | "Sorti" | "Urgent" | "Ambulatoire";
  dateAdmission: string;
  examens: {
    biologie: {
      results: BiologieResult[];
      evolution: Record<string, string | number>[];
    };
    imagerie: Imagerie[];
    autresExamens: AutreExamen[];
  };
}

// Historique de consultations simulées par patient
export const consultationsHistory: Record<
  string,
  {
    id: string;
    date: string;
    motif: string;
    medecin: string;
    diagnostic: string;
    statut: "Terminée" | "En cours" | "Brouillon";
    notes: string;
  }[]
> = {
  "DPI-2024-0891": [
    {
      id: "c1",
      date: "2025-06-01",
      motif: "Insuffisance cardiaque décompensée",
      medecin: "Dr. Konan Éric",
      diagnostic: "Insuffisance cardiaque gauche (I50)",
      statut: "Terminée",
      notes: "Patient hospitalisée en urgence. FE 32%. OAP radiologique.",
    },
    {
      id: "c2",
      date: "2025-05-15",
      motif: "Suivi HTA et diabète",
      medecin: "Dr. Konan Éric",
      diagnostic: "HTA + Diabète type 2 (I10, E11)",
      statut: "Terminée",
      notes: "TA 160/95. Glycémie 8.1 mmol/L. Adaptation thérapeutique.",
    },
    {
      id: "c3",
      date: "2025-04-02",
      motif: "Dyspnée d'effort",
      medecin: "Dr. Konan Éric",
      diagnostic: "Dyspnée à investiguer",
      statut: "Terminée",
      notes: "Echocardiographie prescrite. Bilan biologique complet.",
    },
  ],
  "DPI-2024-0742": [
    {
      id: "c1",
      date: "2025-06-02",
      motif: "Douleur fosse iliaque droite",
      medecin: "Dr. Bamba Sophie",
      diagnostic: "Appendicite aiguë (K37)",
      statut: "Terminée",
      notes: "Défense FID. GB 18.4. Chirurgie urgente indiquée.",
    },
    {
      id: "c2",
      date: "2025-05-10",
      motif: "Contrôle HTA",
      medecin: "Dr. Bamba Sophie",
      diagnostic: "HTA contrôlée (I10)",
      statut: "Terminée",
      notes: "TA 130/80 sous Amlodipine 10mg. Bonne tolérance.",
    },
  ],
  "DPI-2024-0633": [
    {
      id: "c1",
      date: "2025-05-28",
      motif: "Fièvre et toux",
      medecin: "Dr. Coulibaly René",
      diagnostic: "Pneumonie bactérienne (J18)",
      statut: "Terminée",
      notes:
        "T° 39.2°C. Opacité lobaire inférieure droite. Amoxicilline 250mg/3x/j.",
    },
    {
      id: "c2",
      date: "2025-06-01",
      motif: "Contrôle post-traitement",
      medecin: "Dr. Coulibaly René",
      diagnostic: "Pneumonie en voie de guérison",
      statut: "Terminée",
      notes:
        "Amélioration clinique. GB en baisse. Poursuite antibiothérapie 3j.",
    },
  ],
  "DPI-2024-0743": [
    {
      id: "c1",
      date: "2025-06-03",
      motif: "Polytraumatisme AVP",
      medecin: "Dr. Diallo Fatou",
      diagnostic: "Polytraumatisme — Fracture tibia gauche (S82)",
      statut: "En cours",
      notes:
        "Accidenté de la voie publique. Hémodynamique instable. Morphine en cours.",
    },
  ],
  "DPI-2024-0544": [
    {
      id: "c1",
      date: "2025-06-01",
      motif: "Suivi IRC + diabète",
      medecin: "Dr. Konan Éric",
      diagnostic: "IRC stade 4 + Diabète (N18, E11)",
      statut: "Terminée",
      notes: "DFG 22. Créatinine 248. Kaliémie 5.6. Ajustement furosémide.",
    },
    {
      id: "c2",
      date: "2025-05-15",
      motif: "Bilan trimestriel",
      medecin: "Dr. Konan Éric",
      diagnostic: "IRC stade 3-4 (N18)",
      statut: "Terminée",
      notes: "DFG stable à 28. Surveillance rapprochée préconisée.",
    },
    {
      id: "c3",
      date: "2025-04-10",
      motif: "Consultation néphrologue",
      medecin: "Dr. Konan Éric",
      diagnostic: "IRC évolutive — préparation dialyse à discuter",
      statut: "Terminée",
      notes:
        "Discussion multidisciplinaire programmée. Fistule AV à envisager.",
    },
    {
      id: "c4",
      date: "2025-02-20",
      motif: "Décompensation diabétique",
      medecin: "Dr. Konan Éric",
      diagnostic: "Déséquilibre diabète + HbA1c 8.2%",
      statut: "Terminée",
      notes: "Introduction Insuline Glargine 20UI/soir. Régime renforcé.",
    },
  ],
  "DPI-2024-0412": [
    {
      id: "c1",
      date: "2025-05-20",
      motif: "Fatigue intense + pâleur",
      medecin: "Dr. Bamba Sophie",
      diagnostic: "Anémie ferriprive sévère (D50)",
      statut: "Terminée",
      notes: "Hb 7.8. Ferritine 3. Sulfate de fer + Acide folique prescrits.",
    },
    {
      id: "c2",
      date: "2025-06-01",
      motif: "Contrôle bilan sanguin",
      medecin: "Dr. Bamba Sophie",
      diagnostic: "Anémie ferriprive en cours de correction",
      statut: "Terminée",
      notes: "Hb remontée à 9.4. Ferritine 6. Bonne tolérance au traitement.",
    },
  ],
};

export const patients: Patient[] = [
  {
    id: "DPI-2024-0891",
    nom: "KOUASSI",
    prenom: "Adjoua Marie",
    dateNaissance: "14/03/1985",
    age: 40,
    sexe: "Féminin",
    ins: "185036901234567",
    adresse: "Cocody Riviera 3, Abidjan",
    telephone: "+225 07 87 56 34 12",
    email: "adjoua.kouassi@email.com",
    medecin: "Dr. Konan Éric",
    groupeSanguin: "A+",
    allergies: ["Pénicilline", "Aspirine", "Arachides"],
    contreIndications: ["AINS", "Bêta-bloquants"],
    antecedentsPerso: [
      { type: "Diabète type 2", date: "2018", statut: "Chronique" },
      { type: "HTA", date: "2020", statut: "Contrôlé" },
      { type: "Appendicectomie", date: "2005", statut: "Résolu" },
    ],
    antecedentsFamiliaux: [
      { parent: "Mère", pathologie: "Diabète type 2" },
      { parent: "Père", pathologie: "HTA, Cardiopathie" },
      { parent: "Frère", pathologie: "Asthme" },
    ],
    traitements: [
      {
        medicament: "Metformine 500mg",
        posologie: "2x/jour",
        duree: "Continu",
      },
      {
        medicament: "Amlodipine 5mg",
        posologie: "1x/jour matin",
        duree: "Continu",
      },
      {
        medicament: "Paracétamol 1g",
        posologie: "Si douleur",
        duree: "Si besoin",
      },
    ],
    urgences: [
      {
        nom: "Kouassi Jean-Baptiste",
        lien: "Époux",
        tel: "+225 05 12 34 56 78",
      },
      { nom: "Bamba Adjoua Irène", lien: "Sœur", tel: "+225 07 98 76 54 32" },
    ],
    hospitalisation: {
      service: "Cardiologie",
      lit: "C-14A",
      dateEntree: "2025-06-01",
      dateSortie: "2025-06-08",
      type: "Complète",
      motif: "Insuffisance cardiaque décompensée",
      statut: "En cours",
    },
    assurance: "CNAM",
    convention: "Tiers payant total",
    statut: "Hospitalisé",
    dateAdmission: "2025-06-01",
    examens: {
      biologie: { results: [], evolution: [] },
      imagerie: [],
      autresExamens: [],
    },
  },
  {
    id: "DPI-2024-0742",
    nom: "TRAORÉ",
    prenom: "Moussa Ibrahima",
    dateNaissance: "22/08/1972",
    age: 52,
    sexe: "Masculin",
    ins: "172086901234568",
    adresse: "Yopougon Selmer, Abidjan",
    telephone: "+225 05 23 45 67 89",
    email: "moussa.traore@email.com",
    medecin: "Dr. Bamba Sophie",
    groupeSanguin: "O+",
    allergies: ["Sulfamides"],
    contreIndications: ["Morphine"],
    antecedentsPerso: [
      { type: "Appendicite aiguë", date: "2025", statut: "Résolu" },
      { type: "Hypertension", date: "2019", statut: "Contrôlé" },
    ],
    antecedentsFamiliaux: [{ parent: "Père", pathologie: "Diabète type 1" }],
    traitements: [
      { medicament: "Amlodipine 10mg", posologie: "1x/jour", duree: "Continu" },
    ],
    urgences: [
      { nom: "Traoré Aminata", lien: "Épouse", tel: "+225 07 34 56 78 90" },
    ],
    hospitalisation: {
      service: "Chirurgie",
      lit: "CH-07B",
      dateEntree: "2025-06-02",
      dateSortie: "2025-06-05",
      type: "Journée",
      motif: "Appendicite aiguë",
      statut: "En cours",
    },
    assurance: "MUGEFCI",
    convention: "Tiers payant partiel",
    statut: "Hospitalisé",
    dateAdmission: "2025-06-02",
    examens: {
      biologie: { results: [], evolution: [] },
      imagerie: [],
      autresExamens: [],
    },
  },
  {
    id: "DPI-2024-0633",
    nom: "BAMBA",
    prenom: "Fatou Mariam",
    dateNaissance: "05/11/2019",
    age: 5,
    sexe: "Féminin",
    ins: "219116901234569",
    adresse: "Abobo, Abidjan",
    telephone: "+225 01 45 67 89 01",
    email: "",
    medecin: "Dr. Coulibaly René",
    groupeSanguin: "B+",
    allergies: [],
    contreIndications: ["Tétracyclines"],
    antecedentsPerso: [
      { type: "Pneumonie bactérienne", date: "2025", statut: "Résolu" },
    ],
    antecedentsFamiliaux: [{ parent: "Mère", pathologie: "Asthme" }],
    traitements: [
      {
        medicament: "Amoxicilline 250mg",
        posologie: "3x/jour",
        duree: "7 jours",
      },
    ],
    urgences: [
      { nom: "Bamba Kofi", lien: "Père", tel: "+225 01 45 67 89 01" },
      { nom: "Bamba Aya", lien: "Mère", tel: "+225 07 56 78 90 12" },
    ],
    assurance: "Aucune",
    convention: "Aucune convention",
    statut: "Sorti",
    dateAdmission: "2025-05-28",
    examens: {
      biologie: { results: [], evolution: [] },
      imagerie: [],
      autresExamens: [],
    },
  },
  {
    id: "DPI-2024-0743",
    nom: "KONÉ",
    prenom: "Adama Sékou",
    dateNaissance: "17/07/1990",
    age: 34,
    sexe: "Masculin",
    ins: "190076901234570",
    adresse: "Plateau, Abidjan",
    telephone: "+225 07 67 89 01 23",
    email: "adama.kone@email.com",
    medecin: "Dr. Diallo Fatou",
    groupeSanguin: "AB-",
    allergies: ["Pénicilline", "Latex"],
    contreIndications: ["AINS", "Aspirine"],
    antecedentsPerso: [
      { type: "Polytraumatisme AVP", date: "2025", statut: "Chronique" },
      { type: "Fracture tibia gauche", date: "2025", statut: "Chronique" },
    ],
    antecedentsFamiliaux: [],
    traitements: [
      {
        medicament: "Morphine 10mg",
        posologie: "Perfusion continue",
        duree: "En cours",
      },
      {
        medicament: "Kétamine",
        posologie: "Si douleur intense",
        duree: "Si besoin",
      },
    ],
    urgences: [
      { nom: "Koné Mariame", lien: "Mère", tel: "+225 05 78 90 12 34" },
    ],
    hospitalisation: {
      service: "Urgences",
      lit: "URG-02",
      dateEntree: "2025-06-03",
      dateSortie: "—",
      type: "Urgent",
      motif: "Polytraumatisme AVP",
      statut: "Urgent",
    },
    assurance: "LONACI",
    convention: "Prise en charge totale",
    statut: "Urgent",
    dateAdmission: "2025-06-03",
    examens: {
      biologie: { results: [], evolution: [] },
      imagerie: [],
      autresExamens: [],
    },
  },
  {
    id: "DPI-2024-0544",
    nom: "DIABATÉ",
    prenom: "Issa Oumar",
    dateNaissance: "30/01/1965",
    age: 60,
    sexe: "Masculin",
    ins: "165016901234571",
    adresse: "Marcory, Abidjan",
    telephone: "+225 05 89 01 23 45",
    email: "issa.diabate@email.com",
    medecin: "Dr. Konan Éric",
    groupeSanguin: "A-",
    allergies: ["Céphalosporines"],
    contreIndications: ["Anticoagulants oraux"],
    antecedentsPerso: [
      {
        type: "Insuffisance rénale chronique",
        date: "2015",
        statut: "Chronique",
      },
      { type: "Diabète type 2", date: "2010", statut: "Contrôlé" },
      { type: "Infarctus du myocarde", date: "2022", statut: "Résolu" },
    ],
    antecedentsFamiliaux: [
      { parent: "Père", pathologie: "Insuffisance rénale" },
      { parent: "Mère", pathologie: "Diabète type 2" },
    ],
    traitements: [
      {
        medicament: "Insuline Glargine",
        posologie: "20UI/soir",
        duree: "Continu",
      },
      { medicament: "Furosémide 40mg", posologie: "1x/jour", duree: "Continu" },
      {
        medicament: "Atorvastatine 20mg",
        posologie: "1x/jour soir",
        duree: "Continu",
      },
    ],
    urgences: [
      { nom: "Diabaté Rokia", lien: "Épouse", tel: "+225 07 90 12 34 56" },
      { nom: "Diabaté Moussa", lien: "Fils", tel: "+225 01 23 45 67 89" },
    ],
    assurance: "CNAM",
    convention: "Tiers payant total",
    statut: "Ambulatoire",
    dateAdmission: "2025-05-15",
    examens: {
      biologie: { results: [], evolution: [] },
      imagerie: [],
      autresExamens: [],
    },
  },
  {
    id: "DPI-2024-0412",
    nom: "OUATTARA",
    prenom: "Aminata Cissé",
    dateNaissance: "12/09/1998",
    age: 26,
    sexe: "Féminin",
    ins: "198096901234572",
    adresse: "Treichville, Abidjan",
    telephone: "+225 07 01 23 45 67",
    email: "aminata.ouattara@email.com",
    medecin: "Dr. Bamba Sophie",
    groupeSanguin: "O-",
    allergies: [],
    contreIndications: [],
    antecedentsPerso: [
      { type: "Anémie ferriprive", date: "2024", statut: "Contrôlé" },
    ],
    antecedentsFamiliaux: [
      { parent: "Mère", pathologie: "Drépanocytose trait" },
    ],
    traitements: [
      {
        medicament: "Sulfate de fer 80mg",
        posologie: "2x/jour",
        duree: "3 mois",
      },
      {
        medicament: "Acide folique 5mg",
        posologie: "1x/jour",
        duree: "3 mois",
      },
    ],
    urgences: [
      { nom: "Ouattara Dramane", lien: "Père", tel: "+225 05 12 34 56 78" },
    ],
    assurance: "Privé",
    convention: "Convention entreprise",
    statut: "Ambulatoire",
    dateAdmission: "2025-05-20",
    examens: {
      biologie: { results: [], evolution: [] },
      imagerie: [],
      autresExamens: [],
    },
  },
];

// Helper functions — simule les futures fonctions d'accès à la BD
export function getAllPatients(): Patient[] {
  return patients;
}

export function getPatientById(id: string): Patient | undefined {
  return patients.find((p) => p.id === id);
}

export function searchPatients(query: string): Patient[] {
  const q = query.toLowerCase();
  return patients.filter(
    (p) =>
      p.nom.toLowerCase().includes(q) ||
      p.prenom.toLowerCase().includes(q) ||
      p.ins.includes(q) ||
      p.id.toLowerCase().includes(q) ||
      p.medecin.toLowerCase().includes(q),
  );
}
