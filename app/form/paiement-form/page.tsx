// // Route: /form/paiement-form
// // Charge le patient passé en query (?ref=CODE) et rend le formulaire de fiche de paiement.

// import { PaiementForm } from "@/components/form/PaiementForm";
// import { PATIENTS } from "@/lib/dataPatients/patient";


// export default async function PaiementFormPage({
//   searchParams,
// }: {
//   searchParams: Promise<{ ref?: string }>;
// }) {
//   const { ref } = await searchParams;

//   // Pré-sélection du patient à partir de son code (statique pour l'instant).
//   const patient = ref ? PATIENTS.find((p) => p.code === ref) ?? null : null;

//   return (
//     <div className="min-h-screen bg-background">
//       <PaiementForm patient={patient} />
//     </div>
//   );
// }





// Route: /form/paiement-form
// Charge le patient passé en query (?ref=CODE) depuis la base via l'API NestJS,
// puis rend le formulaire de fiche de paiement avec ce patient pré-sélectionné.

import { PaiementForm } from "@/components/form/PaiementForm";
import { patientsApi } from "@/lib/api/patients";
import type { Patient } from "@/lib/dataPatients/patient";

export default async function PaiementFormPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>;
}) {
  const { ref } = await searchParams;

  // Récupération du patient par son code (depuis la liste des patients).
  let patient: Patient | null = null;
  if (ref) {
    try {
      patient = await patientsApi.getByCode(ref);
    } catch {
      patient = null;
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <PaiementForm patient={patient} />
    </div>
  );
}