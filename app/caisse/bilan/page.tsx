/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useMemo, useState } from "react";
import { Wallet } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatFCFA } from "@/lib/data/format";
import { getFiches } from "@/lib/caisse/api";
import type { FichePaiement } from "@/lib/dataPatients/fichePaiement";
import { CaissePageHeader } from "@/components/caisse/Pageheader";
import { StatCard } from "@/components/caisse/Start-card";
import { useCounter } from "@/lib/caisse/useCounter";

// Helper pour obtenir la date du jour au format YYYY-MM-DD
function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export default function CaisseBilanPage() {
  // Dates par défaut : du 1er du mois courant à aujourd'hui
  const now = new Date();
  const debutMois = new Date(now.getFullYear(), now.getMonth(), 1);
  const [debut, setDebut] = useState(debutMois.toISOString().slice(0, 10));
  const [fin, setFin] = useState(todayISO());

  const [data, setData] = useState<FichePaiement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  // Chargement des données
  async function loadData() {
    try {
      setLoading(true);
      setError(null);
      const fiches = await getFiches({
        statut: "payee",
        debut,
        fin,
      });
      setData(fiches);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur de chargement");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    loadData();
  }, [debut, fin]);

  // Rafraîchissement manuel
  function handleRefresh() {
    setRefreshing(true);
    loadData();
  }

  // Calculs des indicateurs
  const total = data.reduce((s, f) => s + f.netAPayer, 0);
  const nbTransactions = data.length;
  const ticketMoyen = nbTransactions ? Math.round(total / nbTransactions) : 0;

  // Regroupement par service
  const parService = useMemo(() => {
    const map = new Map<string, { montant: number; nb: number }>();
    data.forEach((f) => {
      const cur = map.get(f.service) ?? { montant: 0, nb: 0 };
      map.set(f.service, { montant: cur.montant + f.netAPayer, nb: cur.nb + 1 });
    });
    return [...map.entries()].sort((a, b) => b[1].montant - a[1].montant);
  }, [data]);

  // Regroupement par caissier
  const parCaissier = useMemo(() => {
    const map = new Map<string, { montant: number; nb: number }>();
    data.forEach((f) => {
      const cur = map.get(f.caissier) ?? { montant: 0, nb: 0 };
      map.set(f.caissier, { montant: cur.montant + f.netAPayer, nb: cur.nb + 1 });
    });
    return [...map.entries()].sort((a, b) => b[1].montant - a[1].montant);
  }, [data]);

//   // Valeurs animées
  const animatedTotal = useCounter(total, 800);
  const animatedNbTransactions = useCounter(nbTransactions, 600);
  const animatedTicketMoyen = useCounter(ticketMoyen, 800);


  return (
    <>
      <CaissePageHeader
        title="Caisse — Bilan financier"
        icon={<Wallet className="h-5 w-5" />}
        onRefresh={handleRefresh}
        refreshing={refreshing}
      />

      {/* Période */}
      <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="space-y-1.5">
            <Label>Date début</Label>
            <Input
              type="date"
              value={debut}
              onChange={(e) => setDebut(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Date fin</Label>
            <Input
              type="date"
              value={fin}
              onChange={(e) => setFin(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Indicateurs avec animation */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-green-200 bg-green-50 p-5 shadow-sm dark:border-green-900 dark:bg-green-950/20">
          <p className="text-sm font-medium text-green-700 dark:text-green-300">Total encaissé</p>
          <p className="mt-1 text-2xl font-bold text-green-800 dark:text-green-200">
            {formatFCFA(animatedTotal)}
          </p>
        </div>
        <div className="rounded-2xl border border-teal-200 bg-teal-50 p-5 shadow-sm dark:border-teal-900 dark:bg-teal-950/20">
          <p className="text-sm font-medium text-teal-700 dark:text-teal-300">Transactions</p>
          <p className="mt-1 text-2xl font-bold text-teal-800 dark:text-teal-200">
            {animatedNbTransactions}
          </p>
        </div>
        <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-5 shadow-sm dark:border-yellow-900 dark:bg-yellow-950/20">
          <p className="text-sm font-medium text-yellow-700 dark:text-yellow-300">Ticket moyen</p>
          <p className="mt-1 text-2xl font-bold text-yellow-800 dark:text-yellow-200">
            {formatFCFA(animatedTicketMoyen)}
          </p>
        </div>
      </div>


      {/* Tableaux de répartition */}
      <div className="grid gap-5 lg:grid-cols-2">
        {/* Par service */}
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="border-b border-border bg-muted/30 px-5 py-3">
            <h2 className="font-bold text-foreground">Transactions par service</h2>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead>Service</TableHead>
                <TableHead>Nb</TableHead>
                <TableHead className="text-right">Montant</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-6 text-muted-foreground">
                    Chargement…
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-6 text-destructive">
                    {error}
                  </TableCell>
                </TableRow>
              ) : parService.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-6 text-muted-foreground">
                    Aucune transaction sur cette période.
                  </TableCell>
                </TableRow>
              ) : (
                parService.map(([service, v]) => (
                  <TableRow key={service} className="border-border">
                    <TableCell className="text-foreground">{service}</TableCell>
                    <TableCell className="text-muted-foreground">{v.nb}</TableCell>
                    <TableCell className="text-right font-semibold text-foreground">
                      {formatFCFA(v.montant)}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
            <TableFooter className="bg-muted/30">
              <TableRow className="border-border hover:bg-transparent">
                <TableCell className="font-bold text-foreground">Total</TableCell>
                <TableCell className="font-bold text-foreground">{nbTransactions}</TableCell>
                <TableCell className="text-right font-bold text-[#0d9488]">
                  {formatFCFA(total)}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>

        {/* Par caissier */}
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="border-b border-border bg-muted/30 px-5 py-3">
            <h2 className="font-bold text-foreground">Transactions par caissier</h2>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead>Caissier</TableHead>
                <TableHead>Nb</TableHead>
                <TableHead className="text-right">Montant</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-6 text-muted-foreground">
                    Chargement…
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-6 text-destructive">
                    {error}
                  </TableCell>
                </TableRow>
              ) : parCaissier.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-6 text-muted-foreground">
                    Aucune transaction sur cette période.
                  </TableCell>
                </TableRow>
              ) : (
                parCaissier.map(([caissier, v]) => (
                  <TableRow key={caissier} className="border-border">
                    <TableCell className="text-foreground">{caissier}</TableCell>
                    <TableCell className="text-muted-foreground">{v.nb}</TableCell>
                    <TableCell className="text-right font-semibold text-foreground">
                      {formatFCFA(v.montant)}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
            <TableFooter className="bg-muted/30">
              <TableRow className="border-border hover:bg-transparent">
                <TableCell className="font-bold text-foreground">Total</TableCell>
                <TableCell className="font-bold text-foreground">{nbTransactions}</TableCell>
                <TableCell className="text-right font-bold text-[#0d9488]">
                  {formatFCFA(total)}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
    </>
  );
}
















// "use client";

// import { useEffect, useState } from "react";
// import { Wallet } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableFooter,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { formatFCFA } from "@/lib/data/format";
// import { getFiches } from "@/lib/caisse/api";
// import type { FichePaiement } from "@/lib/dataPatients/fichePaiement";
// import { CaissePageHeader } from "@/components/caisse/Pageheader";
// import { useCounter } from "@/lib/caisse/useCounter";

// // Helper pour obtenir la date du jour au format YYYY-MM-DD
// function todayISO() {
//   return new Date().toISOString().slice(0, 10);
// }

// export default function CaisseBilanPage() {
//   const now = new Date();
//   const debutMois = new Date(now.getFullYear(), now.getMonth(), 1);
//   const [debut, setDebut] = useState(debutMois.toISOString().slice(0, 10));
//   const [fin, setFin] = useState(todayISO());

//   const [data, setData] = useState<FichePaiement[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [refreshing, setRefreshing] = useState(false);

//   // Chargement des données
//   async function loadData() {
//     try {
//       setLoading(true);
//       setError(null);
//       const fiches = await getFiches({
//         statut: "payee",
//         debut,
//         fin,
//       });
//       setData(fiches);
//     } catch (e) {
//       setError(e instanceof Error ? e.message : "Erreur de chargement");
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   }

//   useEffect(() => {
//     loadData();
//   }, [debut, fin]);

//   function handleRefresh() {
//     setRefreshing(true);
//     loadData();
//   }

//   // Calculs des indicateurs
//   const total = data.reduce((s, f) => s + f.netAPayer, 0);
//   const nbTransactions = data.length;
//   const ticketMoyen = nbTransactions ? Math.round(total / nbTransactions) : 0;

//   // Regroupement par service et caissier (inchangé)
//   // ... (code existant) ...

//   // Valeurs animées
//   const animatedTotal = useCounter(total, 800);
//   const animatedNbTransactions = useCounter(nbTransactions, 600);
//   const animatedTicketMoyen = useCounter(ticketMoyen, 800);

//   return (
//     <>
//       <CaissePageHeader
//         title="Caisse — Bilan financier"
//         icon={<Wallet className="h-5 w-5" />}
//         onRefresh={handleRefresh}
//         refreshing={refreshing}
//       />

//       {/* Période */}
//       <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
//         <div className="flex flex-col gap-4 sm:flex-row">
//           <div className="space-y-1.5">
//             <Label>Date début</Label>
//             <Input
//               type="date"
//               value={debut}
//               onChange={(e) => setDebut(e.target.value)}
//             />
//           </div>
//           <div className="space-y-1.5">
//             <Label>Date fin</Label>
//             <Input
//               type="date"
//               value={fin}
//               onChange={(e) => setFin(e.target.value)}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Indicateurs avec animation */}
//       <div className="grid gap-4 sm:grid-cols-3">
//         <div className="rounded-2xl border border-green-200 bg-green-50 p-5 shadow-sm dark:border-green-900 dark:bg-green-950/20">
//           <p className="text-sm font-medium text-green-700 dark:text-green-300">Total encaissé</p>
//           <p className="mt-1 text-2xl font-bold text-green-800 dark:text-green-200">
//             {formatFCFA(animatedTotal)}
//           </p>
//         </div>
//         <div className="rounded-2xl border border-teal-200 bg-teal-50 p-5 shadow-sm dark:border-teal-900 dark:bg-teal-950/20">
//           <p className="text-sm font-medium text-teal-700 dark:text-teal-300">Transactions</p>
//           <p className="mt-1 text-2xl font-bold text-teal-800 dark:text-teal-200">
//             {animatedNbTransactions}
//           </p>
//         </div>
//         <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-5 shadow-sm dark:border-yellow-900 dark:bg-yellow-950/20">
//           <p className="text-sm font-medium text-yellow-700 dark:text-yellow-300">Ticket moyen</p>
//           <p className="mt-1 text-2xl font-bold text-yellow-800 dark:text-yellow-200">
//             {formatFCFA(animatedTicketMoyen)}
//           </p>
//         </div>
//       </div>

//       {/* Tableaux de répartition (inchangés) */}
//       <div className="grid gap-5 lg:grid-cols-2">
//         {/* Par service */}
//         <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
//           <div className="border-b border-border bg-muted/30 px-5 py-3">
//             <h2 className="font-bold text-foreground">Transactions par service</h2>
//           </div>
//           <Table>
//             <TableHeader>
//               <TableRow className="bg-muted/50 hover:bg-muted/50">
//                 <TableHead>Service</TableHead>
//                 <TableHead>Nb</TableHead>
//                 <TableHead className="text-right">Montant</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {loading ? (
//                 <TableRow>
//                   <TableCell colSpan={3} className="text-center py-6 text-muted-foreground">
//                     Chargement…
//                   </TableCell>
//                 </TableRow>
//               ) : error ? (
//                 <TableRow>
//                   <TableCell colSpan={3} className="text-center py-6 text-destructive">
//                     {error}
//                   </TableCell>
//                 </TableRow>
//               ) : parService.length === 0 ? (
//                 <TableRow>
//                   <TableCell colSpan={3} className="text-center py-6 text-muted-foreground">
//                     Aucune transaction sur cette période.
//                   </TableCell>
//                 </TableRow>
//               ) : (
//                 parService.map(([service, v]) => (
//                   <TableRow key={service} className="border-border">
//                     <TableCell className="text-foreground">{service}</TableCell>
//                     <TableCell className="text-muted-foreground">{v.nb}</TableCell>
//                     <TableCell className="text-right font-semibold text-foreground">
//                       {formatFCFA(v.montant)}
//                     </TableCell>
//                   </TableRow>
//                 ))
//               )}
//             </TableBody>
//             <TableFooter className="bg-muted/30">
//               <TableRow className="border-border hover:bg-transparent">
//                 <TableCell className="font-bold text-foreground">Total</TableCell>
//                 <TableCell className="font-bold text-foreground">{nbTransactions}</TableCell>
//                 <TableCell className="text-right font-bold text-[#0d9488]">
//                   {formatFCFA(total)}
//                 </TableCell>
//               </TableRow>
//             </TableFooter>
//           </Table>
//         </div>

//         {/* Par caissier */}
//         <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
//           <div className="border-b border-border bg-muted/30 px-5 py-3">
//             <h2 className="font-bold text-foreground">Transactions par caissier</h2>
//           </div>
//           <Table>
//             <TableHeader>
//               <TableRow className="bg-muted/50 hover:bg-muted/50">
//                 <TableHead>Caissier</TableHead>
//                 <TableHead>Nb</TableHead>
//                 <TableHead className="text-right">Montant</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {loading ? (
//                 <TableRow>
//                   <TableCell colSpan={3} className="text-center py-6 text-muted-foreground">
//                     Chargement…
//                   </TableCell>
//                 </TableRow>
//               ) : error ? (
//                 <TableRow>
//                   <TableCell colSpan={3} className="text-center py-6 text-destructive">
//                     {error}
//                   </TableCell>
//                 </TableRow>
//               ) : parCaissier.length === 0 ? (
//                 <TableRow>
//                   <TableCell colSpan={3} className="text-center py-6 text-muted-foreground">
//                     Aucune transaction sur cette période.
//                   </TableCell>
//                 </TableRow>
//               ) : (
//                 parCaissier.map(([caissier, v]) => (
//                   <TableRow key={caissier} className="border-border">
//                     <TableCell className="text-foreground">{caissier}</TableCell>
//                     <TableCell className="text-muted-foreground">{v.nb}</TableCell>
//                     <TableCell className="text-right font-semibold text-foreground">
//                       {formatFCFA(v.montant)}
//                     </TableCell>
//                   </TableRow>
//                 ))
//               )}
//             </TableBody>
//             <TableFooter className="bg-muted/30">
//               <TableRow className="border-border hover:bg-transparent">
//                 <TableCell className="font-bold text-foreground">Total</TableCell>
//                 <TableCell className="font-bold text-foreground">{nbTransactions}</TableCell>
//                 <TableCell className="text-right font-bold text-[#0d9488]">
//                   {formatFCFA(total)}
//                 </TableCell>
//               </TableRow>
//             </TableFooter>
//           </Table>
//         </div>
//       </div>
//     </>
//   );
// }