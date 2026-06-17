import Link from "next/link";
import { RefreshCw, Plus, HeartPulse } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PATIENTS } from "@/lib/dataPatients/patient";
import { SectionCard } from "@/components/patients/Section-card";
import { PatientsTable } from "@/components/patients/Patientable";

export default function PatientsPage() {
  const patients = PATIENTS;

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <SectionCard
        icon={<HeartPulse className="h-5 w-5" />}
        title="Liste des patients"
        actions={
          <>
            <Button variant="destructive" className="gap-2">
              Rafraîchir
              <RefreshCw className="h-4 w-4" />
            </Button>
            {/* Redirige vers le formulaire d'enregistrement d'un patient */}
            <Button asChild className="gap-2">
              <Link href="/accueil/patients-create">
                Ajouter
                <Plus className="h-4 w-4" />
              </Link>
            </Button>
          </>
        }
      >
        <PatientsTable patients={patients} />
      </SectionCard>
    </div>
  );
}