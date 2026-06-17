// Route: /collaboration_team/reunion

"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Calendar,
  Users,
  FileText,
  Download,
  Upload,
  Plus,
  Clock,
  ChevronRight,
  CheckCircle2,
  Circle,
  AlertCircle,
  Stethoscope,
  Share2,
  Edit3,
  Printer,
  ClipboardList,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface ReunionRCP {
  id: string;
  titre: string;
  date: string;
  heure: string;
  participants: string[];
  statut: "Planifiée" | "En cours" | "Terminée";
  patients: string[];
  ordre_du_jour: string;
}

interface PatientRCP {
  id: string;
  nom: string;
  age: number;
  diagnostic: string;
  medecin_ref: string;
  priorite: "urgent" | "normal" | "suivi";
  dossier_resume: string;
  decision?: string;
  statut: "En attente" | "Présenté" | "Décision prise";
}

interface Document {
  id: string;
  nom: string;
  type: "synthese" | "cr" | "rapport" | "image";
  auteur: string;
  date: string;
  taille: string;
  partage: boolean;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const reunions: ReunionRCP[] = [
  {
    id: "1",
    titre: "RCP Oncologie – Juin 2025",
    date: "05 Juin 2025",
    heure: "14h00",
    participants: ["Dr. Kouassi", "Dr. Koné", "Dr. Bah", "Inès Traoré", "Pharmacien Ouattara"],
    statut: "En cours",
    patients: ["Kofi Mensah", "Aminata Sy", "Jean-Pierre Loba"],
    ordre_du_jour: "Revue des cas oncologiques et décisions thérapeutiques",
  },
  {
    id: "2",
    titre: "RCP Cardiologie – Mai 2025",
    date: "28 Mai 2025",
    heure: "10h00",
    participants: ["Dr. Kouassi", "Dr. Bah", "Seydou Bamba"],
    statut: "Terminée",
    patients: ["Oumar Coulibaly", "Fatoumata Diallo"],
    ordre_du_jour: "Suivi post-opératoire et ajustements thérapeutiques",
  },
  {
    id: "3",
    titre: "RCP Neurologie – Juin 2025",
    date: "12 Juin 2025",
    heure: "09h00",
    participants: ["Dr. Koné", "Dr. Kouassi", "Ibrahim Kourouma"],
    statut: "Planifiée",
    patients: [],
    ordre_du_jour: "Cas complexes neurologie – IRM et décisions",
  },
];

const patientsRCP: PatientRCP[] = [
  {
    id: "1",
    nom: "Kofi Mensah",
    age: 58,
    diagnostic: "Carcinome hépatocellulaire stade III",
    medecin_ref: "Dr. Kouassi",
    priorite: "urgent",
    dossier_resume:
      "Patient de 58 ans présentant un CHC stade III avec métastases ganglionnaires. Bilan biologique : AFP élevée (450 ng/mL). IRM abdominale réalisée le 01/06. Chimiothérapie en cours – 3e cycle.",
    decision: undefined,
    statut: "En attente",
  },
  {
    id: "2",
    nom: "Aminata Sy",
    age: 45,
    diagnostic: "Cancer du sein triple négatif",
    medecin_ref: "Dr. Koné",
    priorite: "normal",
    dossier_resume:
      "Patiente de 45 ans. Tumeur T2N1M0. Chirurgie réalisée en mars. Chimiothérapie adjuvante débutée. Contrôle mammographie favorable. Discussion sur la radiothérapie.",
    decision: "Radiothérapie adjuvante 25 séances recommandée",
    statut: "Décision prise",
  },
  {
    id: "3",
    nom: "Jean-Pierre Loba",
    age: 67,
    diagnostic: "Adénocarcinome pulmonaire",
    medecin_ref: "Dr. Bah",
    priorite: "suivi",
    dossier_resume:
      "Patient 67 ans, tabagique. Scanner thoracique montre réduction tumorale de 30% après immunothérapie. Tolérance correcte. Discussion orientation soins palliatifs.",
    decision: undefined,
    statut: "Présenté",
  },
];

const documents: Document[] = [
  {
    id: "1",
    nom: "Synthèse_Dossier_Mensah.pdf",
    type: "synthese",
    auteur: "Dr. Kouassi",
    date: "04/06/2025",
    taille: "2.3 MB",
    partage: true,
  },
  {
    id: "2",
    nom: "CR_RCP_Cardio_Mai2025.pdf",
    type: "cr",
    auteur: "Inès Traoré",
    date: "28/05/2025",
    taille: "1.1 MB",
    partage: true,
  },
  {
    id: "3",
    nom: "IRM_Mensah_01062025.dcm",
    type: "image",
    auteur: "Radiologie",
    date: "01/06/2025",
    taille: "45.2 MB",
    partage: false,
  },
  {
    id: "4",
    nom: "Rapport_Oncologie_Q2.pdf",
    type: "rapport",
    auteur: "Dr. Koné",
    date: "30/05/2025",
    taille: "3.7 MB",
    partage: true,
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const prioriteConfig = {
  urgent: { color: "bg-red-100 text-red-700 border-red-200", label: "Urgent" },
  normal: { color: "bg-blue-100 text-blue-700 border-blue-200", label: "Normal" },
  suivi: { color: "bg-slate-100 text-slate-600 border-slate-200", label: "Suivi" },
};

const statutConfig: Record<string, { icon: React.ReactNode; color: string }> = {
  "En attente": {
    icon: <Circle className="w-4 h-4 text-slate-400" />,
    color: "text-slate-500",
  },
  Présenté: {
    icon: <AlertCircle className="w-4 h-4 text-yellow-500" />,
    color: "text-yellow-600",
  },
  "Décision prise": {
    icon: <CheckCircle2 className="w-4 h-4 text-teal-600" />,
    color: "text-teal-600",
  },
};

const docIcon: Record<string, React.ReactNode> = {
  synthese: <ClipboardList className="w-4 h-4 text-teal-600" />,
  cr: <FileText className="w-4 h-4 text-blue-600" />,
  rapport: <FileText className="w-4 h-4 text-purple-600" />,
  image: <Stethoscope className="w-4 h-4 text-orange-600" />,
};

const reunionStatutColor: Record<string, string> = {
  Planifiée: "bg-blue-50 text-blue-700",
  "En cours": "bg-teal-50 text-teal-700",
  Terminée: "bg-slate-100 text-slate-600",
};

// ─── Préparation Tab ──────────────────────────────────────────────────────────
function PreparationTab() {
  const [selectedRCP, setSelectedRCP] = useState<ReunionRCP>(reunions[0]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Liste réunions */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-slate-700">Réunions RCP</p>
          <Button
            size="sm"
            className="bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs gap-1"
          >
            <Plus className="w-3 h-3" />
            Nouvelle
          </Button>
        </div>
        {reunions.map((r) => (
          <button
            key={r.id}
            onClick={() => setSelectedRCP(r)}
            className={`w-full text-left p-4 rounded-2xl border transition-all ${
              selectedRCP.id === r.id
                ? "border-teal-400 bg-teal-50 shadow-sm"
                : "border-slate-100 bg-white hover:border-teal-200 shadow-sm"
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <p className="text-sm font-semibold text-slate-800 leading-tight">
                {r.titre}
              </p>
              <span
                className={`text-xs px-2 py-0.5 rounded-lg font-medium flex-shrink-0 ml-2 ${reunionStatutColor[r.statut]}`}
              >
                {r.statut}
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {r.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {r.heure}
              </span>
            </div>
            <div className="mt-2 flex items-center gap-1 text-xs text-slate-500">
              <Users className="w-3 h-3" />
              {r.participants.length} participants
            </div>
          </button>
        ))}
      </div>

      {/* Détail RCP */}
      <div className="lg:col-span-2 space-y-4">
        <Card className="rounded-2xl border border-slate-100 shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base text-slate-800">
                {selectedRCP.titre}
              </CardTitle>
              <span
                className={`text-xs px-2.5 py-1 rounded-lg font-medium ${reunionStatutColor[selectedRCP.statut]}`}
              >
                {selectedRCP.statut}
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Infos */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-50 rounded-xl p-3">
                <p className="text-xs text-slate-500 mb-1">Date & Heure</p>
                <p className="text-sm font-semibold text-slate-800">
                  {selectedRCP.date} – {selectedRCP.heure}
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-3">
                <p className="text-xs text-slate-500 mb-1">Participants</p>
                <div className="flex flex-wrap gap-1">
                  {selectedRCP.participants.slice(0, 3).map((p) => (
                    <span
                      key={p}
                      className="text-xs bg-teal-50 text-teal-700 border border-teal-100 px-1.5 py-0.5 rounded-md"
                    >
                      {p.split(" ")[0]}
                    </span>
                  ))}
                  {selectedRCP.participants.length > 3 && (
                    <span className="text-xs text-slate-500">
                      +{selectedRCP.participants.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Ordre du jour */}
            <div>
              <p className="text-xs font-medium text-slate-600 mb-1.5">
                Ordre du jour
              </p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-sm text-slate-700">
                {selectedRCP.ordre_du_jour}
              </div>
            </div>

            {/* Patients */}
            {selectedRCP.patients.length > 0 && (
              <div>
                <p className="text-xs font-medium text-slate-600 mb-1.5">
                  Patients à présenter ({selectedRCP.patients.length})
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedRCP.patients.map((p) => (
                    <span
                      key={p}
                      className="text-xs bg-white border border-slate-200 text-slate-700 px-2.5 py-1 rounded-xl flex items-center gap-1"
                    >
                      <Stethoscope className="w-3 h-3 text-teal-500" />
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-2 pt-1">
              <Button className="flex-1 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-sm gap-2">
                <Edit3 className="w-4 h-4" />
                Modifier
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-slate-200 rounded-xl text-sm gap-2"
              >
                <Printer className="w-4 h-4" />
                Imprimer
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// ─── Synthèse Tab ─────────────────────────────────────────────────────────────
function SyntheseTab() {
  const [selectedPatient, setSelectedPatient] = useState<PatientRCP>(
    patientsRCP[0]
  );
  const [decision, setDecision] = useState(
    selectedPatient.decision || ""
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Liste patients */}
      <div className="space-y-3">
        <p className="text-sm font-medium text-slate-700">
          Patients – RCP Oncologie
        </p>
        {patientsRCP.map((p) => {
          const cfg = statutConfig[p.statut];
          const prio = prioriteConfig[p.priorite];
          return (
            <button
              key={p.id}
              onClick={() => {
                setSelectedPatient(p);
                setDecision(p.decision || "");
              }}
              className={`w-full text-left p-4 rounded-2xl border transition-all shadow-sm ${
                selectedPatient.id === p.id
                  ? "border-teal-400 bg-teal-50"
                  : "border-slate-100 bg-white hover:border-teal-200"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold text-slate-800">
                  {p.nom}
                </span>
                <span
                  className={`text-xs px-2 py-0.5 border rounded-lg font-medium ${prio.color}`}
                >
                  {prio.label}
                </span>
              </div>
              <p className="text-xs text-slate-500 mb-2 line-clamp-1">
                {p.diagnostic}
              </p>
              <div className={`flex items-center gap-1 text-xs ${cfg.color}`}>
                {cfg.icon}
                {p.statut}
              </div>
            </button>
          );
        })}
      </div>

      {/* Dossier patient */}
      <div className="lg:col-span-2">
        <Card className="rounded-2xl border border-slate-100 shadow-sm">
          <CardHeader className="pb-2 border-b border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base text-slate-800">
                  {selectedPatient.nom}, {selectedPatient.age} ans
                </CardTitle>
                <p className="text-xs text-slate-500 mt-0.5">
                  Réf. : {selectedPatient.medecin_ref}
                </p>
              </div>
              <span
                className={`text-xs px-2 py-0.5 border rounded-lg font-medium ${
                  prioriteConfig[selectedPatient.priorite].color
                }`}
              >
                {prioriteConfig[selectedPatient.priorite].label}
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            {/* Diagnostic */}
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                Diagnostic
              </p>
              <p className="text-sm text-teal-700 font-medium bg-teal-50 px-3 py-2 rounded-xl">
                {selectedPatient.diagnostic}
              </p>
            </div>

            {/* Résumé dossier */}
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                Synthèse dossier patient
              </p>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-700 leading-relaxed">
                {selectedPatient.dossier_resume}
              </div>
            </div>

            {/* Décision */}
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                Compte-rendu décision RCP
              </p>
              {selectedPatient.decision ? (
                <div className="bg-teal-50 border border-teal-200 rounded-xl p-3 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-teal-800">
                    {selectedPatient.decision}
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <Textarea
                    placeholder="Saisir la décision collégiale..."
                    className="rounded-xl border-slate-200 text-sm resize-none"
                    rows={3}
                    value={decision}
                    onChange={(e) => setDecision(e.target.value)}
                  />
                  <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-sm gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    Valider la décision
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// ─── Documents Tab ────────────────────────────────────────────────────────────
function DocumentsTab() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-600">
          {documents.length} documents partagés
        </p>
        <Button className="bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-sm gap-2">
          <Upload className="w-4 h-4" />
          Téléverser
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {documents.map((doc) => (
          <Card
            key={doc.id}
            className="rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center flex-shrink-0">
                {docIcon[doc.type]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-800 truncate">
                  {doc.nom}
                </p>
                <p className="text-xs text-slate-500">
                  {doc.auteur} · {doc.date} · {doc.taille}
                </p>
                {doc.partage && (
                  <span className="text-xs text-teal-600 flex items-center gap-1 mt-0.5">
                    <Share2 className="w-3 h-3" />
                    Partagé avec l&apos;équipe
                  </span>
                )}
              </div>
              <button className="text-slate-400 hover:text-teal-600 transition-colors flex-shrink-0">
                <Download className="w-4 h-4" />
              </button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ReunionRCPPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Réunion RCP</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Concertation pluridisciplinaire – préparation, synthèses et
            comptes-rendus
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-teal-50 border border-teal-200 rounded-xl px-3 py-2 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
            <span className="text-sm font-semibold text-teal-700">
              RCP en cours
            </span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-teal-50 rounded-2xl p-4 text-teal-800">
          <p className="text-2xl font-bold">1</p>
          <p className="text-xs opacity-80">En cours</p>
        </div>
        <div className="bg-blue-50 rounded-2xl p-4 text-blue-800">
          <p className="text-2xl font-bold">1</p>
          <p className="text-xs opacity-80">Planifiée</p>
        </div>
        <div className="bg-slate-100 rounded-2xl p-4 text-slate-700">
          <p className="text-2xl font-bold">1</p>
          <p className="text-xs opacity-80">Terminée</p>
        </div>
        <div className="bg-yellow-50 rounded-2xl p-4 text-yellow-800">
          <p className="text-2xl font-bold">3</p>
          <p className="text-xs opacity-80">Patients à discuter</p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="preparation">
        <TabsList className="bg-slate-100 rounded-xl p-1">
          <TabsTrigger
            value="preparation"
            className="rounded-lg text-sm data-[state=active]:bg-teal-600 data-[state=active]:text-white"
          >
            <Calendar className="w-3.5 h-3.5 mr-1.5" />
            Préparation
          </TabsTrigger>
          <TabsTrigger
            value="synthese"
            className="rounded-lg text-sm data-[state=active]:bg-teal-600 data-[state=active]:text-white"
          >
            <ClipboardList className="w-3.5 h-3.5 mr-1.5" />
            Synthèse dossiers
          </TabsTrigger>
          <TabsTrigger
            value="documents"
            className="rounded-lg text-sm data-[state=active]:bg-teal-600 data-[state=active]:text-white"
          >
            <FileText className="w-3.5 h-3.5 mr-1.5" />
            Documents partagés
          </TabsTrigger>
        </TabsList>

        <TabsContent value="preparation" className="mt-4">
          <PreparationTab />
        </TabsContent>
        <TabsContent value="synthese" className="mt-4">
          <SyntheseTab />
        </TabsContent>
        <TabsContent value="documents" className="mt-4">
          <DocumentsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}