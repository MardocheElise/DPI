// lib/store.ts

import { Patient } from "./patient";



// Données de services et lits
 

// Patients de démo
export const patientsData: Patient[] = [
  {
    id: "PAT-0001",
    numeroDossier: "DOS-2025-0001",
    nom: "MARTIN",
    prenom: "Jean",
    dateNaissance: "1965-03-15",
    sexe: "M",
    adresse: "12 Rue de la Paix, 75002 Paris",
    telephone: "01 42 33 44 55",
    email: "jean.martin@email.com",
    assurance: {
      type: "mutuelle",
      nom: "MGEN",
      numeroPolicе: "MG-2025-78945",
      dateExpiration: "2025-12-31",
    },
    dmp: {
      consentement: true,
      dateConsentement: "2025-01-10",
      ins: "1650375002123456",
    },
    profilMedical: {
      groupeSanguin: "A",
      rhesus: "+",
      allergies: [
        {
          id: "all-1",
          nom: "Pénicilline",
          type: "medicamenteuse",
          severite: "severe",
          reaction: "Choc anaphylactique",
        },
        {
          id: "all-2",
          nom: "Arachides",
          type: "alimentaire",
          severite: "moderee",
          reaction: "Urticaire, œdème",
        },
      ],
      contreIndications: ["IRM (pacemaker)", "Aspirine"],
      antecedentsPersonnels: [
        {
          id: "ant-1",
          description: "Infarctus du myocarde",
          date: "2020-06-15",
          type: "medical",
          details: "Pose de 2 stents coronariens",
        },
        {
          id: "ant-2",
          description: "Appendicectomie",
          date: "1985-09-20",
          type: "chirurgical",
        },
      ],
      antecedentsFamiliaux: [
        {
          id: "antf-1",
          description: "Diabète type 2 (père)",
          date: "",
          type: "medical",
        },
        {
          id: "antf-2",
          description: "Cancer du sein (mère)",
          date: "",
          type: "medical",
        },
      ],
      traitementsEnCours: [
        {
          id: "trt-1",
          medicament: "Clopidogrel",
          dosage: "75mg",
          frequence: "1x/jour",
          dateDebut: "2020-07-01",
          prescripteur: "Dr. Dupont",
        },
        {
          id: "trt-2",
          medicament: "Bisoprolol",
          dosage: "5mg",
          frequence: "1x/jour",
          dateDebut: "2020-07-01",
          prescripteur: "Dr. Dupont",
        },
        {
          id: "trt-3",
          medicament: "Atorvastatine",
          dosage: "40mg",
          frequence: "1x/jour le soir",
          dateDebut: "2020-07-01",
          prescripteur: "Dr. Dupont",
        },
      ],
    },
    medecinTraitant: {
      nom: "DUPONT",
      prenom: "Marie",
      telephone: "01 45 67 89 00",
      adresse: "45 Avenue Victor Hugo, 75016 Paris",
    },
    contactsUrgence: [
      {
        id: "cu-1",
        nom: "MARTIN",
        prenom: "Sophie",
        relation: "Épouse",
        telephone: "06 12 34 56 78",
      },
      {
        id: "cu-2",
        nom: "MARTIN",
        prenom: "Pierre",
        relation: "Fils",
        telephone: "06 98 76 54 32",
      },
    ],
    hospitalisations: [
      {
        id: "hosp-1",
        patientId: "PAT-0001",
        service: "Cardiologie",
        lit: "102",
        dateEntree: "2025-01-20",
        datePrevueSortie: "2025-01-27",
        typeHospitalisation: "complete",
        motif: "Douleurs thoraciques récurrentes",
        diagnosticPrincipal: "Angor instable",
        diagnosticsAssocies: ["Hypertension artérielle", "Dyslipidémie"],
        transferts: [],
        statut: "en_cours",
      },
    ],
    dateCreation: "2025-01-10T09:00:00",
    dateMiseAJour: "2025-01-20T14:30:00",
    statut: "actif",
  },
  {
    id: "PAT-0002",
    numeroDossier: "DOS-2025-0002",
    nom: "BERNARD",
    prenom: "Marie",
    dateNaissance: "1978-11-22",
    sexe: "F",
    adresse: "8 Boulevard Haussmann, 75009 Paris",
    telephone: "01 53 22 11 33",
    email: "marie.bernard@email.com",
    assurance: {
      type: "convention",
      nom: "CPAM Paris",
      numeroPolicе: "2781175002456",
      dateExpiration: "2025-12-31",
    },
    dmp: {
      consentement: true,
      dateConsentement: "2025-01-12",
      ins: "2781175002456789",
    },
    profilMedical: {
      groupeSanguin: "O",
      rhesus: "-",
      allergies: [
        {
          id: "all-3",
          nom: "Latex",
          type: "environnementale",
          severite: "moderee",
          reaction: "Dermatite de contact",
        },
      ],
      contreIndications: ["Produits iodés"],
      antecedentsPersonnels: [
        {
          id: "ant-3",
          description: "Asthme chronique",
          date: "1990-01-01",
          type: "medical",
          details: "Diagnostiqué à l'âge de 12 ans",
        },
      ],
      antecedentsFamiliaux: [
        {
          id: "antf-3",
          description: "Asthme (mère)",
          date: "",
          type: "medical",
        },
      ],
      traitementsEnCours: [
        {
          id: "trt-4",
          medicament: "Symbicort",
          dosage: "200/6µg",
          frequence: "2x/jour",
          dateDebut: "2023-03-15",
          prescripteur: "Dr. Lambert",
        },
      ],
    },
    medecinTraitant: {
      nom: "LAMBERT",
      prenom: "François",
      telephone: "01 42 88 99 00",
      adresse: "22 Rue de Rivoli, 75004 Paris",
    },
    contactsUrgence: [
      {
        id: "cu-3",
        nom: "BERNARD",
        prenom: "Luc",
        relation: "Époux",
        telephone: "06 55 44 33 22",
      },
    ],
    hospitalisations: [
      {
        id: "hosp-2",
        patientId: "PAT-0002",
        service: "Pneumologie",
        lit: "203",
        dateEntree: "2025-01-22",
        datePrevueSortie: "2025-01-25",
        typeHospitalisation: "complete",
        motif: "Exacerbation asthme sévère",
        diagnosticPrincipal: "Crise d'asthme aigu grave",
        diagnosticsAssocies: ["Surinfection bronchique"],
        transferts: [],
        statut: "en_cours",
      },
    ],
    dateCreation: "2025-01-12T10:30:00",
    dateMiseAJour: "2025-01-22T08:15:00",
    statut: "actif",
  },
  {
    id: "PAT-0003",
    numeroDossier: "DOS-2025-0003",
    nom: "DUBOIS",
    prenom: "Pierre",
    dateNaissance: "1990-07-08",
    sexe: "M",
    adresse: "56 Rue de Lyon, 75012 Paris",
    telephone: "06 11 22 33 44",
    assurance: {
      type: "mutuelle",
      nom: "Harmonie Mutuelle",
      numeroPolicе: "HM-2025-12345",
      dateExpiration: "2026-03-31",
    },
    dmp: {
      consentement: false,
    },
    profilMedical: {
      groupeSanguin: "B",
      rhesus: "+",
      allergies: [],
      contreIndications: [],
      antecedentsPersonnels: [],
      antecedentsFamiliaux: [],
      traitementsEnCours: [],
    },
    medecinTraitant: {
      nom: "MOREAU",
      prenom: "Claire",
      telephone: "01 43 55 66 77",
      adresse: "10 Place de la Nation, 75012 Paris",
    },
    contactsUrgence: [
      {
        id: "cu-4",
        nom: "DUBOIS",
        prenom: "Anne",
        relation: "Mère",
        telephone: "06 77 88 99 00",
      },
    ],
    hospitalisations: [],
    dateCreation: "2025-01-18T14:00:00",
    dateMiseAJour: "2025-01-18T14:00:00",
    statut: "actif",
  },
];

// Fonctions utilitaires pour le store
let patients = [...patientsData];
let services = [...servicesData];
let nextPatientId = 4;

export function getPatients(): Patient[] {
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
      p.numeroDossier.toLowerCase().includes(q) ||
      p.dmp.ins?.includes(q)
  );
}

export function addPatient(patient: Omit<Patient, "id" | "numeroDossier" | "dateCreation" | "dateMiseAJour">): Patient {
  const newPatient: Patient = {
    ...patient,
    id: `PAT-${String(nextPatientId).padStart(4, "0")}`,
    numeroDossier: `DOS-2025-${String(nextPatientId).padStart(4, "0")}`,
    dateCreation: new Date().toISOString(),
    dateMiseAJour: new Date().toISOString(),
  };
  nextPatientId++;
  patients.push(newPatient);
  return newPatient;
}

export function updatePatient(id: string, updates: Partial<Patient>): Patient | undefined {
  const index = patients.findIndex((p) => p.id === id);
  if (index === -1) return undefined;
  patients[index] = {
    ...patients[index],
    ...updates,
    dateMiseAJour: new Date().toISOString(),
  };
  return patients[index];
}

export function getServices(): Service[] {
  return services;
}

export function getLitsLibres(serviceId: string) {
  const service = services.find((s) => s.id === serviceId);
  return service?.lits.filter((l) => l.statut === "libre") || [];
}

export function attribuerLit(serviceId: string, litId: string, patientId: string) {
  const service = services.find((s) => s.id === serviceId);
  if (!service) return;
  const lit = service.lits.find((l) => l.id === litId);
  if (lit) {
    lit.statut = "occupe";
    lit.patientId = patientId;
  }
}

export function libererLit(serviceId: string, litId: string) {
  const service = services.find((s) => s.id === serviceId);
  if (!service) return;
  const lit = service.lits.find((l) => l.id === litId);
  if (lit) {
    lit.statut = "libre";
    lit.patientId = undefined;
  }
}

export function generateNumeroDossier(): string {
  return `DOS-2025-${String(nextPatientId).padStart(4, "0")}`;
}