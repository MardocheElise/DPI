// route: app/infirmerie/page.tsx

import { InfirmerieHeader } from "@/components/infirmerie/InfirmerieHeader";
import { PatientsAttenteView } from "@/components/infirmerie/PatientAttentView";

/**
 * Infirmerie — Patients en attente de consultation.
 * Patients enregistrés à l'accueil, fiche de paiement créée, paiement encaissé en caisse.
 */
export default function InfirmeriePage() {
  return (
    <div className="space-y-5 p-4 sm:p-6">
      <div className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-100 sm:p-6">
        <InfirmerieHeader title="Liste des patients à consulter" />
        <div className="mt-6">
          <PatientsAttenteView />
        </div>
      </div>
    </div>
  )
}