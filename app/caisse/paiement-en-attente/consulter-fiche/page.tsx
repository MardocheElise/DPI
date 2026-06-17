"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Banknote, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ETABLISSEMENT, getFicheDetail } from "@/lib/caisse/mock-data";
import { formatDateJour, formatFCFA, type FicheDetail } from "@/lib/caisse/theme";

// Classes de cellules du tableau (réutilisées en-tête / corps)
const TH = "border border-border bg-surface-2 px-2 py-1.5 text-[11px] font-bold uppercase tracking-wide text-foreground";
const TD = "border border-border px-2 py-1.5 text-foreground";

/* ── Un exemplaire du reçu ──────────────────────────────────────────────── */
function Recu({ fiche }: { fiche: FicheDetail }) {
  const total = fiche.prestations.reduce((s, l) => s + l.montantTotal, 0);

  return (
    <div className="break-inside-avoid rounded-xl border border-border bg-card p-6 text-[13px] text-foreground print:rounded-none print:border-x-0 print:border-t-0 print:border-dashed">
      {/* En-tête : code à gauche, hôpital + N° centrés */}
      <header className="grid grid-cols-3 items-center gap-2 border-b border-dashed border-border pb-3">
        <div className="flex flex-col items-start justify-self-start rounded-lg border border-border px-2 py-1 leading-tight">
          <span className="text-[10px] uppercase text-muted-foreground">Code</span>
          <span className="font-mono font-semibold text-foreground">{fiche.code}</span>
        </div>
        <div className="text-center">
          <p className="text-base font-bold uppercase text-foreground">{ETABLISSEMENT}</p>
          <p className="text-sm font-semibold text-teal-primary">Reçu N° {fiche.numeroRecu}</p>
        </div>
        <div aria-hidden />
      </header>

      {/* Ligne patient + date d'édition */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 py-3">
        <span><b>CODE PATIENT :</b> {fiche.codePatient}</span>
        <span><b>SEXE :</b> {fiche.sexe}</span>
        <span><b>ÂGE :</b> {fiche.age} ans</span>
        <span className="ml-auto"><b>ÉDITÉE LE :</b> {formatDateJour(fiche.dateCreation)}</span>
      </div>

      {/* Tableau des prestations (6 colonnes) */}
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className={TH}>Service</th>
            <th className={TH}>Prestations</th>
            <th className={`${TH} text-right`}>Montant acte</th>
            <th className={`${TH} text-center`}>Qte</th>
            <th className={`${TH} text-center`}>Taux réduit</th>
            <th className={`${TH} text-right`}>Montant total</th>
          </tr>
        </thead>
        <tbody>
          {fiche.prestations.map((l, i) => (
            <tr key={i}>
              <td className={TD}>{l.service}</td>
              <td className={TD}>{l.prestation}</td>
              <td className={`${TD} text-right`}>{formatFCFA(l.montantActe)}</td>
              <td className={`${TD} text-center`}>{l.qte}</td>
              <td className={`${TD} text-center`}>{l.tauxReduit} %</td>
              <td className={`${TD} text-right font-semibold`}>{formatFCFA(l.montantTotal)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Total à payer (aligné à gauche) */}
      <p className="mt-3 font-bold text-foreground">TOTAL À PAYER : {formatFCFA(total)}</p>

      {/* Pied : statut + édité par */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-dashed border-border pt-3">
        <span><b>Statut :</b> <span className="text-danger">montant non réglé</span></span>
        <span><b>Édité par :</b> {fiche.caissier}</span>
      </div>
    </div>
  );
}

/* ── Contenu de la page (lit ?ref= dans l'URL) ──────────────────────────── */
function ConsulterFicheContent() {
  const router = useRouter();
  const params = useSearchParams();
  const reference = params.get("ref") ?? "";
  const fiche = getFicheDetail(reference);

  if (!fiche) {
    return (
      <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
        <p className="text-foreground">Fiche introuvable.</p>
        <Button asChild variant="secondary" className="mt-4">
          <Link href="/caisse/paiement-en-attente">
            <ArrowLeft className="mr-2 h-4 w-4" /> Retour à la liste
          </Link>
        </Button>
      </div>
    );
  }

  function handleValider() {
    // Redirige vers le formulaire de validation (encaissement)
    router.push(`/form/validation-form?ref=${encodeURIComponent(reference)}`);
  }

  return (
    <>
      {/* Barre d'actions (masquée à l'impression) */}
      <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm print:hidden sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
          Fiche de Paiement à Régler
        </h1>
        <div className="flex flex-wrap items-center gap-2">
          <Button onClick={handleValider}>
            <Banknote className="mr-2 h-4 w-4" /> Valider la fiche
          </Button>
          <Button variant="secondary" onClick={() => window.print()}>
            <Printer className="mr-2 h-4 w-4" /> Imprimer
          </Button>
          <Button asChild variant="outline">
            <Link href="/caisse/paiement-en-attente">
              <ArrowLeft className="mr-2 h-4 w-4" /> Retour à la liste
            </Link>
          </Button>
        </div>
      </div>

      {/* 3 exemplaires du même reçu */}
      <div className="space-y-5 print:space-y-0">
        <Recu fiche={fiche} />
        <Recu fiche={fiche} />
        <Recu fiche={fiche} />
      </div>
    </>
  );
}

export default function ConsulterFichePage() {
  return (
    <Suspense fallback={<div className="p-6 text-muted-foreground">Chargement du reçu…</div>}>
      <ConsulterFicheContent />
    </Suspense>
  );
}