// app/medecine-generale/consultation/[id]/page.tsx
// Formulaire de consultation d'un patient (ouvert depuis "Consulter"
// dans /medecine-generale/patient-a-consulter).

import { notFound } from "next/navigation";
import { ConsultationForm } from "@/components/medecine-generale/consultation-form";
import {
  getConsultationPrefill,
  getConstantesPrefill,
  getExamenComplementairePrefill,
  getExamenPhysiquePrefill,
  getInterrogatoirePrefill,
} from "@/lib/data/consultations";

// Next.js 15 : params est une Promise et doit être await-é.
export default async function ConsultationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // TODO: remplacer par la récupération du dossier patient via l'API.
  const prefill = getConsultationPrefill(id);
  if (!prefill) notFound();

  // TODO: remplacer par la récupération des constantes saisies à l'infirmerie.
  const constantes = getConstantesPrefill(id);

  // TODO: remplacer par la récupération des antécédents connus du patient.
  const interrogatoire = getInterrogatoirePrefill(id);

  // TODO: remplacer par la récupération de l'examen physique (si déjà saisi).
  const examen = getExamenPhysiquePrefill(id);

  // TODO: remplacer par la récupération des examens complémentaires (si déjà saisis).
  const examenComplementaire = getExamenComplementairePrefill(id);

  return (
    <div className="p-6">
      <ConsultationForm
        prefill={prefill}
        constantes={constantes}
        interrogatoire={interrogatoire}
        examen={examen}
        examenComplementaire={examenComplementaire}
      />
    </div>
  );
}