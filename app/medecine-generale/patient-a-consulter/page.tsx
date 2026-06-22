
import { PatientsAConsulterTable } from "@/components/medecine-generale/PatientAconsulter";
import { PATIENTS_A_CONSULTER } from "@/lib/data/consultations";

export default function PatientAConsulterPage() {
  // TODO: remplacer par la récupération côté serveur (API / DB).
  const data = PATIENTS_A_CONSULTER;

  return (
    <div className="space-y-6 p-6">
      <PatientsAConsulterTable data={data} />
    </div>
  );
}