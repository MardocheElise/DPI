// app/caisse/paiement-regle/page.tsx
// Route : /caisse/paiement-regle
// Sous-module Caisse — liste tous les paiements RÉGLÉS (encaissés depuis /caisse/paiement-en-attente).
// Filtres : période (date début / date fin) + recherche. Actions : Consulter, Annuler.

"use client";

import { useMemo, useState } from "react";
import { Eye, X, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { paiementsRegles } from "@/lib/caisse/mock-data";
import { formatDateLong, formatFCFA } from "@/lib/caisse/theme";
import { CaissePageHeader } from "@/components/caisse/Pageheader";
import { StatusBadge } from "@/components/caisse/StatusBadge";

export default function PaiementReglePage() {
  const [debut, setDebut] = useState("2026-06-01");
  const [fin, setFin] = useState("2026-06-16");
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  // TODO API: GET /api/paiements?statut=regle&debut={debut}&fin={fin}
  const data = paiementsRegles;

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return data.filter((p) => {
      const dans =
        new Date(p.datePaiement) >= new Date(debut) &&
        new Date(p.datePaiement) <= new Date(`${fin}T23:59:59`);
      const match =
        !q ||
        p.reference.toLowerCase().includes(q) ||
        p.patient.toLowerCase().includes(q) ||
        p.caissier.toLowerCase().includes(q);
      return dans && match;
    });
  }, [data, debut, fin, search]);

  function handleRefresh() {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 700);
  }

  return (
    <>
      <CaissePageHeader
        title="Liste des fiches de paiement reçus"
        icon={<Receipt className="h-5 w-5" />}
        onRefresh={handleRefresh}
        refreshing={refreshing}
      />

      {/* Filtres de période + recherche */}
      <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
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

          <div className="w-full sm:w-80">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher un paiement"
            />
          </div>
        </div>

        <p className="mt-5 border-t border-border pt-4 text-2xl font-bold text-foreground">
          <span className="text-danger">{filtered.length}</span>{" "}
          <span className="text-xl font-medium text-muted-foreground">
            fiches de paiement réglées
          </span>
        </p>
      </div>

      {/* Tableau */}
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="caisse-thead hover:bg-surface-2">
              <TableHead>N°</TableHead>
              <TableHead>Référence</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead>Date paiement</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Caissier</TableHead>
              <TableHead>Montant</TableHead>
              <TableHead>Mode</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filtered.map((p) => (
              <TableRow key={p.reference} className="border-border">
                <TableCell className="text-muted-foreground">{p.numero}</TableCell>
                <TableCell className="font-medium text-teal-primary">{p.reference}</TableCell>
                <TableCell className="text-foreground">
                  {p.patient} <span className="font-semibold">({p.matricule})</span>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatDateLong(p.datePaiement)}
                </TableCell>
                <TableCell className="text-foreground">{p.service}</TableCell>
                <TableCell className="text-foreground">{p.caissier}</TableCell>
                <TableCell className="font-semibold text-foreground">
                  {formatFCFA(p.montant)}
                </TableCell>
                <TableCell>
                  <StatusBadge variant="info">{p.modePaye}</StatusBadge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-2">
                    {/* TODO API: ouvrir le reçu / détail du paiement */}
                    <Button size="sm" variant="secondary">
                      <Eye className="mr-1.5 h-4 w-4" /> Consulter
                    </Button>
                    {/* TODO API: POST /api/paiements/{ref}/annuler */}
                    <Button size="sm" variant="destructive">
                      <X className="mr-1.5 h-4 w-4" /> Annuler
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}

            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={9} className="py-10 text-center text-muted-foreground">
                  Aucun paiement réglé sur cette période.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}