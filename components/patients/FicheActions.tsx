// // Route: /accueil/paiements/voir-fiche
// // Barre d'actions de la fiche (retour, éditer, régler, imprimer). Composant client.

// "use client";

// import { useRouter } from "next/navigation";
// import { ArrowLeft, Pencil, Wallet, Printer } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { SectionCard } from "@/components/patients/Section-card";

// export function FicheActions({ ficheId }: { ficheId: number }) {
//   const router = useRouter();

//   return (
//     <div className="print:hidden">
//       <SectionCard
//         icon={<Wallet className="h-5 w-5" />}
//         title="Fiche de paiement à régler"
//         actions={
//           <Button
//             variant="destructive"
//             className="gap-2"
//             onClick={() => router.push("/accueil/paiements")}
//           >
//             <ArrowLeft className="h-4 w-4" />
//             Retour à la liste
//           </Button>
//         }
//       >
//         <div className="flex flex-wrap items-center justify-end gap-3">
//           <Button
//             variant="outline"
//             className="gap-2 border-[#23C756] text-[#138A3E] hover:bg-[#23C756]/10"
//             onClick={() => router.push(`/form/paiement-form`)}
//           >
//             <Pencil className="h-4 w-4" />
//             Éditer
//           </Button>

//           <Button
//             className="gap-2 bg-[#23C756] text-white hover:bg-[#1FAE4D]"
//             onClick={() => {
//               // TODO API: PATCH /fiches-paiement/:id pour passer le statut à "payee"
//               alert("Règlement à brancher (PATCH /fiches-paiement/" + ficheId + ").");
//             }}
//           >
//             <Wallet className="h-4 w-4" />
//             Régler la fiche
//           </Button>

//           <Button variant="outline" className="gap-2" onClick={() => window.print()}>
//             <Printer className="h-4 w-4" />
//             Imprimer
//           </Button>
//         </div>
//       </SectionCard>
//     </div>
//   );
// }














// Route: /accueil/paiements/voir-fiche
// Barre d'actions de la fiche (retour, éditer, régler, imprimer). Composant client.

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Pencil, Wallet, Printer, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/patients/Section-card";
import { fichesPaiementApi } from "@/lib/api/fiches-paiement";

export function FicheActions({
  ficheId,
  dejaReglee,
}: {
  ficheId: number;
  dejaReglee: boolean;
}) {
  const router = useRouter();
  const [enCours, setEnCours] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);

  async function regler() {
    if (enCours || dejaReglee) return;
    setErreur(null);
    setEnCours(true);
    try {
      await fichesPaiementApi.regler(ficheId);
      router.refresh(); // recharge le reçu avec le statut réglé
    } catch (e) {
      setErreur(e instanceof Error ? e.message : "Échec du règlement");
      setEnCours(false);
    }
  }

  return (
    <div className="print:hidden">
      <SectionCard
        icon={<Wallet className="h-5 w-5" />}
        title={dejaReglee ? "Fiche de paiement réglée" : "Fiche de paiement à régler"}
        actions={
          <Button
            variant="destructive"
            className="gap-2"
            onClick={() => router.push("/accueil/paiements")}
          >
            <ArrowLeft className="h-4 w-4" />
            Retour à la liste
          </Button>
        }
      >
        {erreur ? (
          <p className="mb-3 rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {erreur}
          </p>
        ) : null}

        <div className="flex flex-wrap items-center justify-end gap-3">
          <Button variant="outline" className="gap-2" onClick={() => window.print()}>
            <Printer className="h-4 w-4" />
            Imprimer
          </Button>

          <Button
            variant="outline"
            className="gap-2 border-[#23C756] text-[#138A3E] hover:bg-[#23C756]/10"
            onClick={() => router.push(`/form/paiement-form`)}
          >
            <Pencil className="h-4 w-4" />
            Éditer
          </Button>

          {dejaReglee ? (
            <Button disabled className="gap-2 bg-[#23C756] text-white opacity-80">
              <Check className="h-4 w-4" />
              Fiche réglée
            </Button>
          ) : (
            <Button
              className="gap-2 bg-[#23C756] text-white hover:bg-[#1FAE4D] disabled:opacity-60"
              onClick={regler}
              disabled={enCours}
            >
              <Wallet className="h-4 w-4" />
              {enCours ? "Règlement…" : "Régler la fiche"}
            </Button>
          )}
        </div>
      </SectionCard>
    </div>
  );
}