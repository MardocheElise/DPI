import { RefreshCw, ReceiptText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FICHES_PAIEMENT } from "@/lib/dataPatients/fichePaiement";
import { SectionCard } from "@/components/patients/Section-card";
import { FichesPaiementTable } from "@/components/patients/Paiementable";
import Topbar from "@/components/Topbar"


export default function PaiementsPage() {
  const fiches = FICHES_PAIEMENT;

  return (
    <>
    <Topbar title="Liste paiement"/>
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <SectionCard
        icon={<ReceiptText className="h-5 w-5" />}
        title="Liste des fiches de paiements"
        actions={
          <Button variant="destructive" className="gap-2">
            Rafraîchir
            <RefreshCw className="h-4 w-4" />
          </Button>
        }
      >
        <FichesPaiementTable fiches={fiches} />
      </SectionCard>
    </div>
    </>
  );
}