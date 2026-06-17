// app/caisse/bilan/page.tsx
// Route : /caisse/bilan
// Sous-module Caisse — bilan financier : total encaissé + répartition des transactions
// PAR SERVICE et PAR CAISSIER sur une période donnée.

"use client";

import { useMemo, useState } from "react";
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
import { paiementsRegles } from "@/lib/caisse/mock-data";
import { formatFCFA } from "@/lib/caisse/theme";
import { CaissePageHeader } from "@/components/caisse/Pageheader";
import { StatCard } from "@/components/caisse/Start-card";

export default function CaisseBilanPage() {
  const [debut, setDebut] = useState("2026-06-01");
  const [fin, setFin] = useState("2026-06-16");
  const [refreshing, setRefreshing] = useState(false);

  // TODO API: GET /api/caisse/bilan?debut={debut}&fin={fin}
  const data = paiementsRegles;

  const enPeriode = useMemo(
    () =>
      data.filter(
        (p) =>
          new Date(p.datePaiement) >= new Date(debut) &&
          new Date(p.datePaiement) <= new Date(`${fin}T23:59:59`),
      ),
    [data, debut, fin],
  );

  const total = enPeriode.reduce((s, p) => s + p.montant, 0);
  const nbTransactions = enPeriode.length;
  const ticketMoyen = nbTransactions ? Math.round(total / nbTransactions) : 0;

  // Regroupement PAR SERVICE
  const parService = useMemo(() => {
    const map = new Map<string, { montant: number; nb: number }>();
    enPeriode.forEach((p) => {
      const cur = map.get(p.service) ?? { montant: 0, nb: 0 };
      map.set(p.service, { montant: cur.montant + p.montant, nb: cur.nb + 1 });
    });
    return [...map.entries()].sort((a, b) => b[1].montant - a[1].montant);
  }, [enPeriode]);

  // Regroupement PAR CAISSIER
  const parCaissier = useMemo(() => {
    const map = new Map<string, { montant: number; nb: number }>();
    enPeriode.forEach((p) => {
      const cur = map.get(p.caissier) ?? { montant: 0, nb: 0 };
      map.set(p.caissier, { montant: cur.montant + p.montant, nb: cur.nb + 1 });
    });
    return [...map.entries()].sort((a, b) => b[1].montant - a[1].montant);
  }, [enPeriode]);

  function handleRefresh() {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 700);
  }

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
            <Input type="date" value={debut} onChange={(e) => setDebut(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>Date fin</Label>
            <Input type="date" value={fin} onChange={(e) => setFin(e.target.value)} />
          </div>
        </div>
      </div>

      {/* Chiffres-clés */}
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Total encaissé" value={formatFCFA(total)} accent="green" />
        <StatCard label="Transactions" value={nbTransactions} accent="teal" />
        <StatCard label="Ticket moyen" value={formatFCFA(ticketMoyen)} accent="yellow" />
      </div>

      {/* Répartition par service & par caissier */}
      <div className="grid gap-5 lg:grid-cols-2">
        {/* PAR SERVICE */}
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="border-b border-border bg-surface-2 px-5 py-3">
            <h2 className="font-bold text-foreground">Transactions par service</h2>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="caisse-thead hover:bg-surface-2">
                <TableHead>Service</TableHead>
                <TableHead>Nb</TableHead>
                <TableHead className="text-right">Montant</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {parService.map(([service, v]) => (
                <TableRow key={service} className="border-border">
                  <TableCell className="text-foreground">{service}</TableCell>
                  <TableCell className="text-muted-foreground">{v.nb}</TableCell>
                  <TableCell className="text-right font-semibold text-foreground">
                    {formatFCFA(v.montant)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter className="bg-surface-2">
              <TableRow className="border-border hover:bg-transparent">
                <TableCell className="font-bold text-foreground">Total</TableCell>
                <TableCell className="font-bold text-foreground">{nbTransactions}</TableCell>
                <TableCell className="text-right font-bold text-teal-primary">
                  {formatFCFA(total)}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>

        {/* PAR CAISSIER */}
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="border-b border-border bg-surface-2 px-5 py-3">
            <h2 className="font-bold text-foreground">Transactions par caissier</h2>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="caisse-thead hover:bg-surface-2">
                <TableHead>Caissier</TableHead>
                <TableHead>Nb</TableHead>
                <TableHead className="text-right">Montant</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {parCaissier.map(([caissier, v]) => (
                <TableRow key={caissier} className="border-border">
                  <TableCell className="text-foreground">{caissier}</TableCell>
                  <TableCell className="text-muted-foreground">{v.nb}</TableCell>
                  <TableCell className="text-right font-semibold text-foreground">
                    {formatFCFA(v.montant)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter className="bg-surface-2">
              <TableRow className="border-border hover:bg-transparent">
                <TableCell className="font-bold text-foreground">Total</TableCell>
                <TableCell className="font-bold text-foreground">{nbTransactions}</TableCell>
                <TableCell className="text-right font-bold text-teal-primary">
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