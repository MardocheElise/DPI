// import { RefreshCw, ReceiptText } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { FICHES_PAIEMENT } from "@/lib/dataPatients/fichePaiement";
// import { SectionCard } from "@/components/patients/Section-card";
// import { FichesPaiementTable } from "@/components/patients/Paiementable";
// import Topbar from "@/components/Topbar"


// export default function PaiementsPage() {
//   const fiches = FICHES_PAIEMENT;

//   return (
//     <>
//     <Topbar title="Liste paiement"/>
//     <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
//       <SectionCard
//         icon={<ReceiptText className="h-5 w-5" />}
//         title="Liste des fiches de paiements"
//         actions={
//           <Button variant="destructive" className="gap-2">
//             Rafraîchir
//             <RefreshCw className="h-4 w-4" />
//           </Button>
//         }
//       >
//         <FichesPaiementTable fiches={fiches} />
//       </SectionCard>
//     </div>
//     </>
//   );
// }








// Route: /accueil/paiements
// Liste des fiches de paiement — connectée à l'API NestJS (fichesPaiementApi).

import { RefreshCw, ReceiptText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/patients/Section-card";
import { FichesPaiementTable } from "@/components/patients/Paiementable";
import Topbar from "@/components/Topbar";
import { fichesPaiementApi } from "@/lib/api/fiches-paiement";
import { FichePaiement } from "@/lib/dataPatients/fichePaiement";
export default async function PaiementsPage() {
  let fiches: FichePaiement[]= [];
  let erreur: string | null = null;

  try {
    fiches = await fichesPaiementApi.getAll();
  } catch (e) {
    erreur = e instanceof Error ? e.message : "Erreur de chargement";
  }

  return (
    <>
      <Topbar title="Liste paiement" />
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
          {erreur ? (
            <p className="rounded-lg bg-destructive/10 p-4 text-sm text-destructive">
              Impossible de charger les fiches : {erreur}
            </p>
          ) : (
            <FichesPaiementTable fiches={fiches} />
          )}
        </SectionCard>
      </div>
    </>
  );
}