// // Route: /accueil/paiements + /form/paiement-form (accès API fiches de paiement)
// import type { FichePaiement } from "@/lib/dataPatients/fichePaiement";
// import { apiFetch } from "./clients";

// export interface CreateFichePayload {
//   patientId: number;
//   service: string;
//   tauxAssurance?: number; // 0 à 1
//   prestations: { type: string; quantite: number; prixUnitaire: number }[];
// }

// export const fichesPaiementApi = {
//   getAll: (debut?: string, fin?: string) =>
//     apiFetch<FichePaiement[]>("/fiches-paiement", { params: { debut, fin } }),
//   create: (data: CreateFichePayload) =>
//     apiFetch<FichePaiement>("/fiches-paiement", {
//       method: "POST",
//       body: JSON.stringify(data),
//     }),
// };

// Route: /accueil/paiements + /accueil/paiements/voir-fiche + /form/paiement-form
// Accès API fiches de paiement (NestJS).

import type { FichePaiement } from "@/lib/dataPatients/fichePaiement";
import { apiFetch } from "./clients";

export interface CreateFichePayload {
  patientId: number;
  service: string;
  tauxAssurance?: number; // 0 à 1
  prestations: { type: string; quantite: number; prixUnitaire: number }[];
}

// Détail complet d'une fiche (pour le reçu)
export interface PrestationDetail {
  id: number;
  type: string;
  quantite: number;
  prixUnitaire: number;
}

// export interface FicheDetail {
//   id: number;
//   code: string;
//   service: string;
//   coutTotal: number;
//   coutAssure: number;
//   netAPayer: number;
//   statut: "payee" | "impayee" | "partiel";
//   creeLe: string;
//   patient: {
//     code: string;
//     nom: string;
//     prenom?: string | null;
//     genre: "masculin" | "feminin";
//     dateNaissance: string;
//     contact: string;
//     email?: string | null;
//     assuranceNom?: string | null;
//   };
//   prestations: PrestationDetail[];
// }

export interface FicheDetail {
  id: number;
  code: string;
  service: string;
  coutTotal: number;
  coutAssure: number;
  netAPayer: number;
  statut: "payee" | "impayee" | "partiel";
  creeLe: string;
  patient: {
    code: string;
    nom: string;
    prenom?: string | null;
    genre: "masculin" | "feminin";
    dateNaissance: string;
    contact: string;
    email?: string | null;
    assuranceNom?: string | null;
  };
  prestations: {
    id: number;
    type: string;
    quantite: number;
    prixUnitaire: number;
  }[];
}

export const fichesPaiementApi = {
  getAll: (debut?: string, fin?: string) =>
    apiFetch<FichePaiement[]>("/fiches-paiement", { params: { debut, fin } }),
  getById: (id: number | string) =>
    apiFetch<FicheDetail>(`/fiches-paiement/${id}`),
  regler: (id: number | string) =>
    apiFetch<FicheDetail>(`/fiches-paiement/${id}/regler`, { method: "PATCH" }),
  create: (data: CreateFichePayload) =>
    apiFetch<FichePaiement>("/fiches-paiement", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};

export interface FichePaiementComplete extends FichePaiement {
  prestations: PrestationDetail[];
}
