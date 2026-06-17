// Route: global (utilitaires partagés par /accueil/patients et /accueil/paiements)
// Fonctions de formatage : montant FCFA, dates en français, calcul d'âge.

/** Formate un montant en FCFA : 1055 -> "1 055 FCFA" */
export function formatFCFA(montant: number): string {
  return `${montant.toLocaleString("fr-FR")} FCFA`;
}

/** Formate une date ISO -> "19 août 2009" */
export function formatDateFr(iso: string): string {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** Formate une date+heure ISO -> "15 juin 2026 à 04:17:22" */
export function formatDateTimeFr(iso: string): string {
  const d = new Date(iso);
  const date = d.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const heure = d.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  return `${date} à ${heure}`;
}

/** Calcule l'âge à partir d'une date de naissance -> "16 an(s) et 10 mois" */
export function calculerAge(dateNaissanceIso: string): string {
  const naissance = new Date(dateNaissanceIso);
  const maintenant = new Date();

  let annees = maintenant.getFullYear() - naissance.getFullYear();
  let mois = maintenant.getMonth() - naissance.getMonth();

  if (maintenant.getDate() < naissance.getDate()) mois -= 1;
  if (mois < 0) {
    annees -= 1;
    mois += 12;
  }
  return `${annees} an(s) et ${mois} mois`;
}
