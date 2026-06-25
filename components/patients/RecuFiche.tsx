// Route: /accueil/paiements/voir-fiche
// Reçu compact (ticket) — 3 exemplaires tiennent sur une A4. Sans filigrane ni texte légal.
// Données patient + fiche issues de la base (FicheDetail).

import { calculerAge, formatDateTimeFr, formatFCFA } from "@/lib/data/format";
import type { FicheDetail } from "@/lib/api/fiches-paiement";

// Coordonnées de l'établissement (à adapter)
const CLINIQUE = {
  nom: "CENTRE DE TEST 2 (À NE PAS UTILISER)",
  email: "bassam@gmail.com",
  tel: "(+225) 07 0000 0000",
};

const STATUT = {
  payee: { label: "montant reglé", className: "text-[#138A3E]" },
  partiel: { label: "montant partiellement reglé", className: "text-[#B26A00]" },
  impayee: { label: "montant non reglé", className: "text-destructive" },
} as const;

export function RecuFiche({ fiche }: { fiche: FicheDetail }) {
  const p = fiche.patient;
  const nomComplet = p.prenom ? `${p.nom} ${p.prenom}` : p.nom;
  const sexe = p.genre === "feminin" ? "F" : "M";
  const taux = fiche.coutTotal > 0 ? fiche.coutAssure / fiche.coutTotal : 0;
  const tauxPct = Math.round(taux * 100);
  const statut = STATUT[fiche.statut];

  return (
    <article className="break-inside-avoid rounded-md border border-border bg-white px-3 py-2 text-[11px] leading-tight text-foreground print:text-[9px]">
      {/* En-tête : établissement + n° reçu */}
      <div className="flex items-start justify-between gap-3 border-b border-border pb-1.5">
        <div className="flex items-start gap-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-brand-mint-soft text-[8px] font-semibold text-brand-teal-deep">
            logo
          </div>
          <div>
            <p className="font-bold">{CLINIQUE.nom}</p>
            <p className="text-muted-foreground">
              {CLINIQUE.email} · {CLINIQUE.tel}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-bold">
            Reçu N°: <span className="text-primary">{fiche.code}</span>
          </p>
          <p className="font-bold">{nomComplet}</p>
        </div>
      </div>

      {/* Ligne d'identité patient */}
      <div className="flex flex-wrap gap-x-3 gap-y-0.5 border-b border-border py-1.5">
        <span>CODE : <strong>{p.code}</strong></span>
        <span>ASSURÉ(E) : <strong>{p.assuranceNom ?? "—"}</strong></span>
        <span>SEXE : <strong>{sexe}</strong></span>
        <span>ÂGE : <strong>{calculerAge(p.dateNaissance)}</strong></span>
        <span>ÉDITÉE LE : <strong>{formatDateTimeFr(fiche.creeLe)}</strong></span>
      </div>

      {/* Tableau des prestations */}
      <table className="mt-1.5 w-full border-collapse">
        <thead>
          <tr className="border-b border-border bg-brand-sky-soft/40 text-left text-[9px] uppercase text-muted-foreground">
            <th className="px-1.5 py-1">Service</th>
            <th className="px-1.5 py-1">Prestations</th>
            <th className="px-1.5 py-1 text-right">Mt acte</th>
            <th className="px-1.5 py-1 text-center">Qté</th>
            <th className="px-1.5 py-1 text-center">Taux %</th>
            <th className="px-1.5 py-1 text-right">Mt total</th>
          </tr>
        </thead>
        <tbody>
          {fiche.prestations.map((l) => {
            const montantTotal = Math.round(l.prixUnitaire * l.quantite * (1 - taux));
            return (
              <tr key={l.id} className="border-b border-border/60">
                <td className="px-1.5 py-1 font-medium">{fiche.service}</td>
                <td className="px-1.5 py-1">{l.type}</td>
                <td className="px-1.5 py-1 text-right tabular-nums">{formatFCFA(l.prixUnitaire)}</td>
                <td className="px-1.5 py-1 text-center tabular-nums">{l.quantite}</td>
                <td className="px-1.5 py-1 text-center tabular-nums">{tauxPct}</td>
                <td className="px-1.5 py-1 text-right font-semibold tabular-nums">{formatFCFA(montantTotal)}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={5} className="px-1.5 py-1 text-right font-bold uppercase">Total à payer :</td>
            <td className="px-1.5 py-1 text-right font-bold tabular-nums text-brand-teal-deep">
              {formatFCFA(fiche.netAPayer)}
            </td>
          </tr>
        </tfoot>
      </table>

      {/* Cases + statut */}
      <div className="mt-1.5 flex items-center justify-between border-t border-border pt-1.5">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <Case label="Cas social" />
          <Case label="Tarif réduit" />
          <Case label="Réorientation" />
        </div>
        <p className="text-muted-foreground">Éditée par : —</p>
      </div>
      <p className="mt-1">
        Statut : <strong className={statut.className}>{statut.label}</strong>
      </p>
    </article>
  );
}

function Case({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="inline-block h-3 w-3 rounded-sm border border-muted-foreground/50" />
      <span>{label}</span>
    </span>
  );
}