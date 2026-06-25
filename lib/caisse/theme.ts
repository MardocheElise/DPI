// // lib/caisse/theme.ts
// // Route concernée : librairie partagée du module — utilisée par toutes les routes /caisse/*
// // Types métier + helpers d'affichage (format FCFA, dates, variantes de badge).

// export type StatutPaiement = "en_attente" | "regle" | "annule";

// export type ModePaiement = "Direct" | "Assurance" | "Mobile Money" | "Cheque";

// export interface FichePaiement {
//   reference: string;
//   patient: string;
//   matricule: string;
//   assure: boolean;
//   aPayer: number; // en FCFA
//   dateCreation: string; // ISO
//   service: string;
//   statut: StatutPaiement;
// }

// export interface PaiementRegle extends FichePaiement {
//   numero: number;
//   datePaiement: string; // ISO
//   caissier: string;
//   montant: number;
//   modePaye: ModePaiement;
// }

// export type Sexe = "M" | "F";

// /** Une ligne du tableau du reçu (6 colonnes) */
// export interface LignePrestation {
//   service: string;
//   prestation: string;
//   montantActe: number; // FCFA
//   qte: number;
//   tauxReduit: number; // en %
//   montantTotal: number; // FCFA
// }

// /** Détail complet d'une fiche, pour l'affichage du reçu */
// export interface FicheDetail extends FichePaiement {
//   numeroRecu: string;
//   code: string; // utilité à définir plus tard
//   codePatient: string;
//   sexe: Sexe;
//   age: number;
//   caissier: string; // édité par
//   prestations: LignePrestation[];
// }

// export interface Caissier {
//   id: string;
//   nom: string;
//   poste: string;
//   ouvertDepuis: string; // ISO
//   ticketsValides: number;
//   recettes: number; // FCFA
// }

// /** Format monétaire de l'application : "1 055 FCFA" */
// export function formatFCFA(montant: number): string {
//   return `${montant.toLocaleString("fr-FR")} FCFA`;
// }

// /** "6 juin 2026 à 17:07:53" (format des écrans existants) */
// export function formatDateLong(iso: string): string {
//   const d = new Date(iso);
//   const date = d.toLocaleDateString("fr-FR", {
//     day: "numeric",
//     month: "long",
//     year: "numeric",
//   });
//   const heure = d.toLocaleTimeString("fr-FR", {
//     hour: "2-digit",
//     minute: "2-digit",
//     second: "2-digit",
//   });
//   return `${date} à ${heure}`;
// }

// /** "01/06/2026" pour les inputs date */
// export function formatDateCourt(iso: string): string {
//   return new Date(iso).toLocaleDateString("fr-FR");
// }

// /** "16 juin 2026" (jour d'édition du reçu, sans heure) */
// export function formatDateJour(iso: string): string {
//   return new Date(iso).toLocaleDateString("fr-FR", {
//     day: "numeric",
//     month: "long",
//     year: "numeric",
//   });
// }

// /** Variante de StatusBadge selon le statut métier */
// export function badgeVariant(
//   statut: StatutPaiement,
// ): "success" | "pending" | "danger" {
//   switch (statut) {
//     case "regle":
//       return "success";
//     case "annule":
//       return "danger";
//     default:
//       return "pending";
//   }
// }

// export function statutLabel(statut: StatutPaiement): string {
//   return { en_attente: "En attente", regle: "Réglé", annule: "Annulé" }[statut];
// }



// lib/caisse/theme.ts
// Route concernée : librairie partagée du module Caisse — /caisse/*
// Types alignés sur le vrai modèle backend (fichesPaiementApi / apiFetch).
// On réutilise FichePaiement et FicheDetail du module Accueil et on y ajoute
// les helpers d'affichage (FCFA, dates, badges).

// ─── Réexport des types du module Accueil (source de vérité unique) ──────────
export type { FichePaiement } from "@/lib/dataPatients/fichePaiement";
export type {
  FicheDetail,
  PrestationDetail,
} from "@/lib/api/fiches-paiement";

// ─── Types propres au module Caisse ──────────────────────────────────────────
export type StatutPaiement = "payee" | "impayee" | "partiel";

export type ModePaiement = "Direct" | "Assurance" | "Mobile Money" | "Cheque";

export interface Caissier {
  id: string;
  nom: string;
  poste: string;
  ouvertDepuis: string; // ISO
  ticketsValides: number;
  recettes: number; // FCFA
}

// ─── Helpers d'affichage ─────────────────────────────────────────────────────

/** "1 055 FCFA" */
export function formatFCFA(montant: number): string {
  return `${montant.toLocaleString("fr-FR")} FCFA`;
}

/** "6 juin 2026 à 17:07:53" */
export function formatDateLong(iso: string): string {
  const d = new Date(iso);
  return `${d.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })} à ${d.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })}`;
}

/** "16 juin 2026" (sans heure) */
export function formatDateJour(iso: string): string {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** Variante de StatusBadge */
export function badgeVariant(
  statut: StatutPaiement,
): "success" | "pending" | "danger" | "neutral" {
  switch (statut) {
    case "payee":    return "success";
    case "partiel":  return "pending";
    case "impayee":  return "danger";
    default:         return "neutral";
  }
}

export function statutLabel(statut: StatutPaiement): string {
  return { payee: "Payée", impayee: "Impayée", partiel: "Partiel" }[statut] ?? statut;
}












