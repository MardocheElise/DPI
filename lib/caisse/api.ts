// lib/caisse/api.ts
// Route concernée : module Caisse (/caisse/*)
// Délègue à fichesPaiementApi en ajoutant le filtre statut.

import { apiFetch } from "@/lib/api/clients";
import type { FichePaiement } from "@/lib/dataPatients/fichePaiement";
import type { FicheDetail } from "@/lib/api/fiches-paiement";

export type { FichePaiement, FicheDetail };

export type StatutFiltreType = "impayee" | "payee" | "partiel";

interface GetFichesParams {
  statut?: StatutFiltreType;
  debut?: string; // "2026-06-01"
  fin?: string; // "2026-06-30"
  search?: string;
}

/**
 * Liste les fiches avec filtres.
 * /fiches-paiement?statut=impayee  → fiches impayées (paiement-en-attente)
 * /fiches-paiement?statut=payee    → fiches réglées  (paiement-regle)
 */
export function getFiches(params?: GetFichesParams): Promise<FichePaiement[]> {
  return apiFetch<FichePaiement[]>("/fiches-paiement", {
    params: {
      statut: params?.statut,
      debut: params?.debut,
      fin: params?.fin,
      search: params?.search,
    },
  });
}

/** Détail d'une fiche par son id (cuid string). */
export async function getFiche(id: string): Promise<FicheDetail | null> {
  try {
    return await apiFetch<FicheDetail>(`/fiches-paiement/${id}`);
  } catch (e: unknown) {
    if (e instanceof Error && e.message.includes("404")) return null;
    throw e;
  }
}
