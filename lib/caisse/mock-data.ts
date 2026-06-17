// lib/caisse/mock-data.ts
// Route concernée : données de démonstration — partagées par les routes /caisse/*
// À remplacer par tes appels API réels (voir commentaires "TODO API" dans chaque page).

import type { Caissier, FicheDetail, FichePaiement, PaiementRegle } from "./theme";

/** Nom de l'établissement affiché en en-tête du reçu */
export const ETABLISSEMENT = "CENTRE HOSPITALIER PINHOME";

export const fichesEnAttente: FichePaiement[] = [
  {
    reference: "CHE-2026-WO53076-71157",
    patient: "CISSE Aw1",
    matricule: "D26E7943BBB",
    assure: false,
    aPayer: 1055,
    dateCreation: "2026-06-06T17:07:53",
    service: "MEDECINE GENERALE",
    statut: "en_attente",
  },
  {
    reference: "CHE-2026-YT24016-48906",
    patient: "SEKA Apo Ella",
    matricule: "D26X0199BBB",
    assure: false,
    aPayer: 0,
    dateCreation: "2026-06-05T17:01:24",
    service: "MATERNITE",
    statut: "en_attente",
  },
  {
    reference: "CHE-2026-DJ17156-852479",
    patient: "Bosco AUTO Valentina",
    matricule: "D26B1248BBB",
    assure: false,
    aPayer: 100,
    dateCreation: "2026-06-03T04:15:17",
    service: "MEDECINE GENERALE",
    statut: "en_attente",
  },
  {
    reference: "CHE-2026-PL90233-114780",
    patient: "GOUANDI Colin",
    matricule: "D26Y2687BBB",
    assure: true,
    aPayer: 2500,
    dateCreation: "2026-06-02T09:42:10",
    service: "LABORATOIRE",
    statut: "en_attente",
  },
];

export const paiementsRegles: PaiementRegle[] = [
  {
    numero: 1,
    reference: "REF-2026-0918306-998142",
    patient: "GOUANDI Colin",
    matricule: "D26Y2687BBB",
    assure: false,
    aPayer: 2500,
    montant: 2500,
    dateCreation: "2026-06-16T08:55:00",
    datePaiement: "2026-06-16T09:30:18",
    service: "LABORATOIRE",
    caissier: "Form FORM",
    modePaye: "Direct",
    statut: "regle",
  },
  {
    numero: 2,
    reference: "REF-2026-0451221-770015",
    patient: "KONE Mariam",
    matricule: "D26K7781BBB",
    assure: true,
    aPayer: 12000,
    montant: 12000,
    dateCreation: "2026-06-15T11:02:00",
    datePaiement: "2026-06-15T11:20:42",
    service: "MATERNITE",
    caissier: "Form FORM",
    modePaye: "Assurance",
    statut: "regle",
  },
  {
    numero: 3,
    reference: "REF-2026-0712984-330948",
    patient: "TRAORE Issouf",
    matricule: "D26T0042BBB",
    assure: false,
    aPayer: 5000,
    montant: 5000,
    dateCreation: "2026-06-14T15:31:00",
    datePaiement: "2026-06-14T15:44:09",
    service: "MEDECINE GENERALE",
    caissier: "Form FORM",
    modePaye: "Mobile Money",
    statut: "regle",
  },
];

export const caissiersOuverts: Caissier[] = [
  {
    id: "C-001",
    nom: "Form FORM",
    poste: "Caisse principale",
    ouvertDepuis: "2026-06-16T07:30:00",
    ticketsValides: 178,
    recettes: 187500,
  },
  {
    id: "C-002",
    nom: "Adjoua N.",
    poste: "Caisse laboratoire",
    ouvertDepuis: "2026-06-16T08:00:00",
    ticketsValides: 64,
    recettes: 92300,
  },
];

/* ── Détails de reçu (CODE PATIENT, prestations…) par référence ──────────── */
type DetailExtra = Pick<
  FicheDetail,
  "numeroRecu" | "code" | "codePatient" | "sexe" | "age" | "caissier" | "prestations"
>;

const detailsByRef: Record<string, DetailExtra> = {
  "CHE-2026-WO53076-71157": {
    numeroRecu: "53076-71157",
    code: "PH-A1",
    codePatient: "D26E7943BBB",
    sexe: "F",
    age: 29,
    caissier: "Form FORM",
    prestations: [
      {
        service: "MEDECINE GENERALE",
        prestation: "Consultation",
        montantActe: 1000,
        qte: 1,
        tauxReduit: 0,
        montantTotal: 1000,
      },
      {
        service: "MEDECINE GENERALE",
        prestation: "Carnet",
        montantActe: 55,
        qte: 1,
        tauxReduit: 0,
        montantTotal: 55,
      },
    ],
  },
  "CHE-2026-DJ17156-852479": {
    numeroRecu: "17156-852479",
    code: "PH-A2",
    codePatient: "D26B1248BBB",
    sexe: "F",
    age: 4,
    caissier: "Form FORM",
    prestations: [
      {
        service: "MEDECINE GENERALE",
        prestation: "Pansement",
        montantActe: 100,
        qte: 1,
        tauxReduit: 0,
        montantTotal: 100,
      },
    ],
  },
  "CHE-2026-PL90233-114780": {
    numeroRecu: "90233-114780",
    code: "PH-A3",
    codePatient: "D26Y2687BBB",
    sexe: "M",
    age: 35,
    caissier: "Form FORM",
    prestations: [
      {
        service: "LABORATOIRE",
        prestation: "Hémogramme (NFS)",
        montantActe: 3000,
        qte: 1,
        tauxReduit: 20,
        montantTotal: 2400,
      },
      {
        service: "LABORATOIRE",
        prestation: "Glycémie",
        montantActe: 125,
        qte: 1,
        tauxReduit: 20,
        montantTotal: 100,
      },
    ],
  },
};

/**
 * Détail complet d'une fiche pour l'affichage du reçu.
 * TODO API: remplacer par GET /api/paiements/{reference}/detail
 */
export function getFicheDetail(reference: string): FicheDetail | null {
  const base = fichesEnAttente.find((f) => f.reference === reference);
  if (!base) return null;

  const extra: DetailExtra =
    detailsByRef[reference] ?? {
      numeroRecu: base.reference,
      code: "—",
      codePatient: base.matricule,
      sexe: "M",
      age: 0,
      caissier: "Form FORM",
      prestations: [
        {
          service: base.service,
          prestation: "Prestation",
          montantActe: base.aPayer,
          qte: 1,
          tauxReduit: 0,
          montantTotal: base.aPayer,
        },
      ],
    };

  return { ...base, ...extra };
}