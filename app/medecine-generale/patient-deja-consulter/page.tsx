import { PatientsDejaConsulterTable } from "@/components/medecine-generale/PatientConsulter";
import { PATIENTS_DEJA_CONSULTES } from "@/lib/data/consultations";


export default function PatientDejaConsulterPage() {
  // TODO: remplacer par la récupération côté serveur (API / DB).
  const data = PATIENTS_DEJA_CONSULTES;

  return (
    <div className="space-y-6 p-6">
      <PatientsDejaConsulterTable data={data} />
    </div>
  );
}