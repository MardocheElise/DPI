// app/form/validation-form/page.tsx
// Route : /form/validation-form?ref={reference}
// Encaissement d'une fiche : saisie du Montant reçu, calcul de la Monnaie rendue,
// rappel des informations (service, agent de caisse, date/heure).
// Accès depuis "Valider" (/caisse/paiement-en-attente) et "Valider la fiche"
// (/caisse/paiement-en-attente/consulter-fiche).
// Styles : utilitaires Tailwind basés sur les tokens de app/globals.css.

"use client";

import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getFicheDetail } from "@/lib/caisse/mock-data";
import { formatDateLong, formatFCFA } from "@/lib/caisse/theme";

function ValidationContent() {
  const router = useRouter();
  const params = useSearchParams();
  const reference = params.get("ref") ?? "";
  const fiche = getFicheDetail(reference);

  const [montantRecu, setMontantRecu] = useState(0);
  // Date/heure de la validation (figée au montage)
  const maintenant = useMemo(() => new Date().toISOString(), []);

  if (!fiche) {
    return (
      <div className="p-6">
        <div className="mx-auto max-w-md rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
          <p className="text-foreground">Fiche introuvable.</p>
          <Button asChild variant="secondary" className="mt-4">
            <Link href="/caisse/paiement-en-attente">
              <ArrowLeft className="mr-2 h-4 w-4" /> Retour à la liste
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const totalAPayer = fiche.prestations.reduce((s, l) => s + l.montantTotal, 0);
  const monnaieRendue = Math.max(0, montantRecu - totalAPayer);
  const insuffisant = montantRecu > 0 && montantRecu < totalAPayer;
  const peutValider = montantRecu >= totalAPayer;

  function handleValider() {
    // TODO API: POST /api/paiements/{reference}/regler { montantRecu }
    router.push("/caisse/paiement-regle");
  }

  return (
    <div className="p-4 sm:p-6">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        {/* Titre */}
        <div className="border-b border-border px-6 py-4">
          <h1 className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
            Validation du paiement
          </h1>
        </div>

        {/* Corps : 2 colonnes */}
        <div className="grid gap-8 p-6 md:grid-cols-2">
          {/* Colonne gauche : référence + saisie */}
          <section className="space-y-4">
            <h2 className="text-base font-semibold text-foreground">
              Référence fiche de paiement
            </h2>

            <div className="rounded-xl bg-secondary/40 p-4">
              <p className="text-sm text-muted-foreground">Numéro de reçu</p>
              <p className="font-semibold text-foreground">{reference}</p>
            </div>

            {/* Montant reçu */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">
                Montant reçu <span className="text-danger">*</span>
              </label>
              <div className="flex items-stretch gap-2">
                <input
                  type="number"
                  min={0}
                  value={montantRecu}
                  onChange={(e) => setMontantRecu(Number(e.target.value) || 0)}
                  className="w-full rounded-xl border border-input bg-card px-4 py-2.5 text-lg text-foreground outline-none focus:border-transparent focus:ring-2 focus:ring-ring"
                />
                <span className="flex items-center rounded-xl border border-border bg-surface-2 px-4 font-bold text-foreground">
                  F CFA
                </span>
              </div>
            </div>

            {/* Monnaie rendue (calculée) */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">
                Monnaie rendue <span className="text-danger">*</span>
              </label>
              <div className="flex items-stretch gap-2">
                <div className="w-full rounded-xl border border-border bg-muted px-4 py-2.5 text-lg text-muted-foreground">
                  {monnaieRendue.toLocaleString("fr-FR")}
                </div>
                <span className="flex items-center rounded-xl border border-border bg-surface-2 px-4 font-bold text-foreground">
                  F CFA
                </span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              Total à payer : <b className="text-foreground">{formatFCFA(totalAPayer)}</b>
            </p>
            {insuffisant && (
              <p className="text-sm text-danger">
                Le montant reçu est inférieur au total à payer.
              </p>
            )}
          </section>

          {/* Colonne droite : informations complémentaires */}
          <section className="space-y-5 rounded-2xl bg-secondary/30 p-6">
            <h2 className="text-base font-semibold text-foreground">
              Information complémentaire
            </h2>
            <div>
              <p className="text-sm text-muted-foreground">Service de référence du reçu :</p>
              <p className="font-semibold uppercase text-foreground">{fiche.service}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Agent de la Caisse</p>
              <p className="text-lg font-semibold text-info">{fiche.caissier}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Date et Heure</p>
              <p className="font-semibold text-foreground">{formatDateLong(maintenant)}</p>
            </div>
          </section>
        </div>

        {/* Pied : note + actions */}
        <div className="flex flex-col gap-4 border-t border-border bg-secondary/40 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md text-sm text-muted-foreground">
            <span className="text-danger">*</span> Les champs marqués d'un astérisque sont
            obligatoires pour valider votre enregistrement.
          </p>
          <div className="flex items-center gap-3">
            <Button onClick={handleValider} disabled={!peutValider} className="rounded-full px-8">
              <CheckCircle2 className="mr-2 h-4 w-4" /> Valider
            </Button>
            <Button asChild variant="destructive" className="rounded-full px-8">
              <Link href="/caisse/paiement-en-attente">Annuler</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ValidationFormPage() {
  return (
    <Suspense fallback={<div className="p-6 text-muted-foreground">Chargement…</div>}>
      <ValidationContent />
    </Suspense>
  );
}