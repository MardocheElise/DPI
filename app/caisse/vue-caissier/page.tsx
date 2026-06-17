// app/caisse/vue-caissier/page.tsx
// Route : /caisse/vue-caissier
// Sous-module Caisse — vue pilotée par un <Select> à 3 options :
//   1) Vue des caissiers ouverts
//   2) Vue statistiques annulations
//   3) Vue statistiques recettes (graphique des recettes par caissier)

"use client";

import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { caissiersOuverts } from "@/lib/caisse/mock-data";
import { formatDateLong, formatFCFA } from "@/lib/caisse/theme";
import { StatCard } from "@/components/caisse/Start-card";
import { StatusBadge } from "@/components/caisse/StatusBadge";
import { CaissePageHeader } from "@/components/caisse/Pageheader";

type Vue = "ouverts" | "annulations" | "recettes";

// Couleurs de barres dérivées des tokens du globals.css
const BAR_COLORS = ["#0d9488", "#0f766e", "#fbbf24", "#ef4444"];

export default function VueCaissierPage() {
  const [vue, setVue] = useState<Vue>("ouverts");
  const [debut, setDebut] = useState("2026-06-01");
  const [fin, setFin] = useState("2026-06-16");
  const [refreshing, setRefreshing] = useState(false);

  // TODO API: GET /api/caisse/caissiers?debut={debut}&fin={fin}
  const caissiers = caissiersOuverts;

  const totalTickets = caissiers.reduce((s, c) => s + c.ticketsValides, 0);
  const annules = 0; // TODO API: nombre de tickets annulés sur la période
  const nonAnnules = totalTickets - annules;

  const chartData = useMemo(
    () => caissiers.map((c) => ({ name: c.nom, recettes: c.recettes })),
    [caissiers],
  );

  function handleRefresh() {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 700);
  }

  return (
    <>
      <CaissePageHeader
        title="Vue caissier"
        icon={<Users className="h-5 w-5" />}
        onRefresh={handleRefresh}
        refreshing={refreshing}
      />

      {/* Sélecteur de vue + période */}
      <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-1.5">
            <Label>Type de vue</Label>
            <Select value={vue} onValueChange={(v) => setVue(v as Vue)}>
              <SelectTrigger className="w-full sm:w-80">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ouverts">Vue des caissiers ouverts</SelectItem>
                <SelectItem value="annulations">Vue statistiques annulations</SelectItem>
                <SelectItem value="recettes">Vue statistiques recettes</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="space-y-1.5">
              <Label>Début</Label>
              <Input type="date" value={debut} onChange={(e) => setDebut(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Fin</Label>
              <Input type="date" value={fin} onChange={(e) => setFin(e.target.value)} />
            </div>
          </div>
        </div>
      </div>

      {/* ---- VUE 1 : Caissiers ouverts ---- */}
      {vue === "ouverts" && (
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="caisse-thead hover:bg-surface-2">
                <TableHead>Caissier</TableHead>
                <TableHead>Poste</TableHead>
                <TableHead>Ouvert depuis</TableHead>
                <TableHead>Tickets validés</TableHead>
                <TableHead className="text-right">Recettes</TableHead>
                <TableHead>Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {caissiers.map((c) => (
                <TableRow key={c.id} className="border-border">
                  <TableCell className="font-medium text-foreground">{c.nom}</TableCell>
                  <TableCell className="text-foreground">{c.poste}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDateLong(c.ouvertDepuis)}
                  </TableCell>
                  <TableCell className="text-foreground">{c.ticketsValides}</TableCell>
                  <TableCell className="text-right font-semibold text-foreground">
                    {formatFCFA(c.recettes)}
                  </TableCell>
                  <TableCell>
                    <StatusBadge variant="success">Ouvert</StatusBadge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* ---- VUE 2 : Statistiques annulations ---- */}
      {vue === "annulations" && (
        <>
          <p className="section-title uppercase tracking-wide">
            Statistiques d&apos;activités du <span className="text-danger">{debut}</span> au{" "}
            <span className="text-danger">{fin}</span>
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            <StatCard label="Nombre total de tickets" value={totalTickets} accent="teal" />
            <StatCard label="Non annulé(s)" value={nonAnnules} accent="green" />
            <StatCard label="Annulé(s)" value={annules} accent="coral" />
          </div>
        </>
      )}

      {/* ---- VUE 3 : Statistiques recettes ---- */}
      {vue === "recettes" && (
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="section-title text-center">Recettes accumulées par caissier (FCFA)</h2>
          <div className="mt-6 h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 16, left: 8, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 12 }} />
                <YAxis
                  tick={{ fill: "#64748b", fontSize: 12 }}
                  tickFormatter={(v) => v.toLocaleString("fr-FR")}
                />
                <Tooltip
                  formatter={(v) => (typeof v === "number" ? formatFCFA(v) : v)}
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid #e2e8f0",
                    color: "#0f172a",
                  }}
                />
                <Bar dataKey="recettes" radius={[8, 8, 0, 0]} maxBarSize={90}>
                  {chartData.map((_, i) => (
                    <Cell key={i} fill={BAR_COLORS[i % BAR_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
}