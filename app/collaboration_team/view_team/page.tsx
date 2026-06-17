// Route: /collaboration_team/view_team

"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Search,
  Filter,
  Phone,
  Mail,
  Eye,
  Users,
  Stethoscope,
  Heart,
  Pill,
  ClipboardList,
  Activity,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────
type Role =
  | "Médecin"
  | "Infirmier"
  | "Aide-soignant"
  | "Kinésithérapeute"
  | "Pharmacien"
  | "Secrétaire médicale";

interface TeamMember {
  id: string;
  nom: string;
  prenom: string;
  role: Role;
  service: string;
  email: string;
  telephone: string;
  disponible: boolean;
  avatar: string;
  acces: string[];
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const equipe: TeamMember[] = [
  {
    id: "1",
    nom: "Kouassi",
    prenom: "Dr. Ama",
    role: "Médecin",
    service: "Cardiologie",
    email: "a.kouassi@dpi.ci",
    telephone: "+225 07 01 02 03",
    disponible: true,
    avatar: "AK",
    acces: ["Dossier complet", "Prescriptions", "Examens", "Chirurgie"],
  },
  {
    id: "2",
    nom: "Traoré",
    prenom: "Inès",
    role: "Infirmier",
    service: "Cardiologie",
    email: "i.traore@dpi.ci",
    telephone: "+225 07 04 05 06",
    disponible: true,
    avatar: "IT",
    acces: ["Soins", "Prescriptions", "Constantes"],
  },
  {
    id: "3",
    nom: "Bamba",
    prenom: "Seydou",
    role: "Aide-soignant",
    service: "Cardiologie",
    email: "s.bamba@dpi.ci",
    telephone: "+225 07 07 08 09",
    disponible: false,
    avatar: "SB",
    acces: ["Soins basiques", "Constantes"],
  },
  {
    id: "4",
    nom: "Koné",
    prenom: "Dr. Fatou",
    role: "Médecin",
    service: "Neurologie",
    email: "f.kone@dpi.ci",
    telephone: "+225 07 10 11 12",
    disponible: true,
    avatar: "FK",
    acces: ["Dossier complet", "Prescriptions", "Examens"],
  },
  {
    id: "5",
    nom: "Diabaté",
    prenom: "Moussa",
    role: "Kinésithérapeute",
    service: "Rééducation",
    email: "m.diabate@dpi.ci",
    telephone: "+225 07 13 14 15",
    disponible: true,
    avatar: "MD",
    acces: ["Soins rééducation", "Bilan fonctionnel"],
  },
  {
    id: "6",
    nom: "Ouattara",
    prenom: "Aminata",
    role: "Pharmacien",
    service: "Pharmacie",
    email: "a.ouattara@dpi.ci",
    telephone: "+225 07 16 17 18",
    disponible: true,
    avatar: "AO",
    acces: ["Prescriptions", "Stock médicaments", "Interactions"],
  },
  {
    id: "7",
    nom: "Diallo",
    prenom: "Mariama",
    role: "Secrétaire médicale",
    service: "Accueil",
    email: "m.diallo@dpi.ci",
    telephone: "+225 07 19 20 21",
    disponible: false,
    avatar: "MD",
    acces: ["Rendez-vous", "Dossiers administratifs"],
  },
  {
    id: "8",
    nom: "Kourouma",
    prenom: "Ibrahim",
    role: "Infirmier",
    service: "Urgences",
    email: "i.kourouma@dpi.ci",
    telephone: "+225 07 22 23 24",
    disponible: true,
    avatar: "IK",
    acces: ["Soins urgences", "Prescriptions", "Constantes"],
  },
];

// ─── Role config ──────────────────────────────────────────────────────────────
const roleConfig: Record<Role, { color: string; icon: React.ReactNode }> = {
  Médecin: {
    color: "bg-teal-100 text-teal-800 border-teal-200",
    icon: <Stethoscope className="w-3 h-3" />,
  },
  Infirmier: {
    color: "bg-blue-100 text-blue-800 border-blue-200",
    icon: <Heart className="w-3 h-3" />,
  },
  "Aide-soignant": {
    color: "bg-purple-100 text-purple-800 border-purple-200",
    icon: <Activity className="w-3 h-3" />,
  },
  Kinésithérapeute: {
    color: "bg-orange-100 text-orange-800 border-orange-200",
    icon: <Users className="w-3 h-3" />,
  },
  Pharmacien: {
    color: "bg-green-100 text-green-800 border-green-200",
    icon: <Pill className="w-3 h-3" />,
  },
  "Secrétaire médicale": {
    color: "bg-pink-100 text-pink-800 border-pink-200",
    icon: <ClipboardList className="w-3 h-3" />,
  },
};

// ─── Avatar colors ────────────────────────────────────────────────────────────
const avatarColors = [
  "bg-teal-600",
  "bg-blue-600",
  "bg-purple-600",
  "bg-orange-500",
  "bg-green-600",
  "bg-pink-600",
];

// ─── Stats Card ───────────────────────────────────────────────────────────────
function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className={`rounded-2xl p-4 ${color} flex flex-col gap-1`}>
      <span className="text-2xl font-bold">{value}</span>
      <span className="text-xs opacity-80">{label}</span>
    </div>
  );
}

// ─── Member Card ─────────────────────────────────────────────────────────────
function MemberCard({
  member,
  index,
}: {
  member: TeamMember;
  index: number;
}) {
  const cfg = roleConfig[member.role];
  const avatarColor = avatarColors[index % avatarColors.length];

  return (
    <Card className="border border-slate-100 shadow-sm hover:shadow-md transition-shadow rounded-2xl bg-white">
      <CardContent className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-full ${avatarColor} flex items-center justify-center text-white font-semibold text-sm flex-shrink-0`}
            >
              {member.avatar}
            </div>
            <div>
              <p className="font-semibold text-slate-800">
                {member.prenom} {member.nom}
              </p>
              <p className="text-xs text-slate-500">{member.service}</p>
            </div>
          </div>
          {/* Disponibilité */}
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-medium ${
              member.disponible
                ? "bg-teal-50 text-teal-700"
                : "bg-slate-100 text-slate-500"
            }`}
          >
            {member.disponible ? "● Disponible" : "○ Absent"}
          </span>
        </div>

        {/* Rôle badge */}
        <div className="mb-3">
          <span
            className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-lg border font-medium ${cfg.color}`}
          >
            {cfg.icon}
            {member.role}
          </span>
        </div>

        {/* Accès */}
        <div className="mb-4">
          <p className="text-xs text-slate-500 mb-1 font-medium">
            Droits d&apos;accès
          </p>
          <div className="flex flex-wrap gap-1">
            {member.acces.map((a) => (
              <span
                key={a}
                className="text-xs bg-slate-50 border border-slate-200 text-slate-600 px-2 py-0.5 rounded-md"
              >
                {a}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
          <a
            href={`tel:${member.telephone}`}
            className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-teal-600 transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{member.telephone}</span>
          </a>
          <span className="text-slate-200">|</span>
          <a
            href={`mailto:${member.email}`}
            className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-teal-600 transition-colors"
          >
            <Mail className="w-3.5 h-3.5" />
            <span className="truncate max-w-[120px]">{member.email}</span>
          </a>
          <button className="ml-auto flex items-center gap-1 text-xs text-teal-600 hover:text-teal-800 transition-colors font-medium">
            <Eye className="w-3.5 h-3.5" />
            Profil
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ViewTeamPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [dispoFilter, setDispoFilter] = useState<string>("all");

  // Stats
  const disponibles = equipe.filter((m) => m.disponible).length;
  const medecins = equipe.filter((m) => m.role === "Médecin").length;

  // Filtered list
  const filtered = equipe.filter((m) => {
    const matchSearch =
      `${m.prenom} ${m.nom} ${m.service}`
        .toLowerCase()
        .includes(search.toLowerCase());
    const matchRole = roleFilter === "all" || m.role === roleFilter;
    const matchDispo =
      dispoFilter === "all" ||
      (dispoFilter === "dispo" && m.disponible) ||
      (dispoFilter === "absent" && !m.disponible);
    return matchSearch && matchRole && matchDispo;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Vue Équipe Complète
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Tous les professionnels du service avec leurs droits d&apos;accès
          </p>
        </div>
        <Button className="bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-sm gap-2">
          <Users className="w-4 h-4" />
          Vue synthétique patient
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard
          label="Total membres"
          value={equipe.length}
          color="bg-teal-50 text-teal-800"
        />
        <StatCard
          label="Disponibles"
          value={disponibles}
          color="bg-green-50 text-green-800"
        />
        <StatCard
          label="Médecins"
          value={medecins}
          color="bg-blue-50 text-blue-800"
        />
        <StatCard
          label="Services"
          value={new Set(equipe.map((m) => m.service)).size}
          color="bg-yellow-50 text-yellow-800"
        />
      </div>

      {/* Filters */}
      <Card className="border border-slate-100 rounded-2xl shadow-sm">
        <CardContent className="p-4 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Rechercher un professionnel..."
              className="pl-9 rounded-xl border-slate-200 focus:ring-teal-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-full sm:w-52 rounded-xl border-slate-200">
              <Filter className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
              <SelectValue placeholder="Tous les rôles" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les rôles</SelectItem>
              {Object.keys(roleConfig).map((r) => (
                <SelectItem key={r} value={r}>
                  {r}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={dispoFilter} onValueChange={setDispoFilter}>
            <SelectTrigger className="w-full sm:w-44 rounded-xl border-slate-200">
              <SelectValue placeholder="Disponibilité" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous</SelectItem>
              <SelectItem value="dispo">Disponibles</SelectItem>
              <SelectItem value="absent">Absents</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-slate-400">
          <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>Aucun membre trouvé</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((m, i) => (
            <MemberCard key={m.id} member={m} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}