// route: app/infirmerie/patient-deja-consulte/page.tsx

import { InfirmerieHeader } from "@/components/infirmerie/InfirmerieHeader";
import { PatientsConsultesView } from "@/components/infirmerie/PatientConsulteView";

/**
 * Infirmerie — Patients déjà consultés.
 * Historique des patients ayant terminé leur consultation à l'infirmerie.
 */
export default function PatientDejaConsultePage() {
  return (
    <div className="space-y-5 p-4 sm:p-6">
      <div className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-100 sm:p-6">
        <InfirmerieHeader title="Liste des patients déjà consultés" />
        <div className="mt-6">
          <PatientsConsultesView />
        </div>
      </div>
    </div>
  )
}