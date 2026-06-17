// Route: /form/paiement-form
// Charge le patient passé en query (?ref=CODE) et rend le formulaire de fiche de paiement.

import { PaiementForm } from "@/components/form/PaiementForm";
import { PATIENTS } from "@/lib/dataPatients/patient";


export default async function PaiementFormPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>;
}) {
  const { ref } = await searchParams;

  // Pré-sélection du patient à partir de son code (statique pour l'instant).
  const patient = ref ? PATIENTS.find((p) => p.code === ref) ?? null : null;

  return (
    <div className="min-h-screen bg-background">
      <PaiementForm patient={patient} />
    </div>
  );
}