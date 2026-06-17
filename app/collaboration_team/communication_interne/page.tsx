// Route: /collaboration_team/communication_interne

"use client";

import { useState, useRef, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  MessageSquare,
  Send,
  Bell,
  UserCheck,
  FlaskConical,
  AlertTriangle,
  Clock,
  ChevronRight,
  Search,
  Plus,
  CheckCheck,
  Circle,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Message {
  id: string;
  expediteur: string;
  avatar: string;
  role: string;
  contenu: string;
  heure: string;
  lu: boolean;
  moi?: boolean;
}

interface Conversation {
  id: string;
  avec: string;
  avatar: string;
  role: string;
  dernierMessage: string;
  heure: string;
  nonLus: number;
  messages: Message[];
}

interface DemandeConsultation {
  id: string;
  patient: string;
  specialiste: string;
  motif: string;
  urgence: "haute" | "moyenne" | "basse";
  statut: "En attente" | "Acceptée" | "Refusée";
  date: string;
}

interface RequeteExamen {
  id: string;
  patient: string;
  examen: string;
  demandeur: string;
  urgence: boolean;
  statut: "En attente" | "En cours" | "Résultats disponibles";
  date: string;
}

interface Notification {
  id: string;
  type: "resultat" | "alerte" | "consultation" | "message";
  titre: string;
  description: string;
  heure: string;
  lue: boolean;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const conversations: Conversation[] = [
  {
    id: "1",
    avec: "Dr. Kouassi",
    avatar: "AK",
    role: "Médecin Cardiologue",
    dernierMessage: "Merci pour le compte-rendu du patient Diallo",
    heure: "10:42",
    nonLus: 2,
    messages: [
      {
        id: "m1",
        expediteur: "Dr. Kouassi",
        avatar: "AK",
        role: "Médecin",
        contenu: "Bonjour, avez-vous vu les résultats ECG du patient Diallo ?",
        heure: "10:15",
        lu: true,
      },
      {
        id: "m2",
        expediteur: "Moi",
        avatar: "IT",
        role: "Infirmier",
        contenu: "Oui, j'ai transmis le dossier. Les résultats sont anormaux.",
        heure: "10:30",
        lu: true,
        moi: true,
      },
      {
        id: "m3",
        expediteur: "Dr. Kouassi",
        avatar: "AK",
        role: "Médecin",
        contenu: "Merci pour le compte-rendu du patient Diallo",
        heure: "10:42",
        lu: false,
      },
    ],
  },
  {
    id: "2",
    avec: "Pharmacien Ouattara",
    avatar: "AO",
    role: "Pharmacien",
    dernierMessage: "Stock Amoxicilline insuffisant pour demain",
    heure: "09:15",
    nonLus: 1,
    messages: [
      {
        id: "m4",
        expediteur: "Pharmacien Ouattara",
        avatar: "AO",
        role: "Pharmacien",
        contenu: "Stock Amoxicilline insuffisant pour demain",
        heure: "09:15",
        lu: false,
      },
    ],
  },
  {
    id: "3",
    avec: "Inès Traoré",
    avatar: "IT",
    role: "Infirmier",
    dernierMessage: "Constantes du patient N°12 transmises",
    heure: "Hier",
    nonLus: 0,
    messages: [
      {
        id: "m5",
        expediteur: "Inès Traoré",
        avatar: "IT",
        role: "Infirmier",
        contenu: "Constantes du patient N°12 transmises",
        heure: "Hier",
        lu: true,
      },
    ],
  },
];

const demandes: DemandeConsultation[] = [
  {
    id: "1",
    patient: "Kofi Mensah",
    specialiste: "Dr. Koné (Neurologie)",
    motif: "Maux de tête persistants post AVC",
    urgence: "haute",
    statut: "En attente",
    date: "Aujourd'hui, 09:30",
  },
  {
    id: "2",
    patient: "Aminata Sy",
    specialiste: "Dr. Bah (Cardiologie)",
    motif: "Contrôle post-opératoire valve mitrale",
    urgence: "moyenne",
    statut: "Acceptée",
    date: "Hier, 15:00",
  },
  {
    id: "3",
    patient: "Jean-Pierre Loba",
    specialiste: "Dr. Otieno (Endocrinologie)",
    motif: "Diabète mal équilibré",
    urgence: "basse",
    statut: "En attente",
    date: "Hier, 11:20",
  },
];

const requetes: RequeteExamen[] = [
  {
    id: "1",
    patient: "Kofi Mensah",
    examen: "IRM cérébrale",
    demandeur: "Dr. Kouassi",
    urgence: true,
    statut: "En attente",
    date: "Aujourd'hui, 08:00",
  },
  {
    id: "2",
    patient: "Fatoumata Diallo",
    examen: "Bilan sanguin complet",
    demandeur: "Dr. Koné",
    urgence: false,
    statut: "En cours",
    date: "Aujourd'hui, 07:30",
  },
  {
    id: "3",
    patient: "Oumar Coulibaly",
    examen: "Radio thorax",
    demandeur: "Inès Traoré",
    urgence: false,
    statut: "Résultats disponibles",
    date: "Hier, 16:45",
  },
];

const notifications: Notification[] = [
  {
    id: "1",
    type: "alerte",
    titre: "Alerte critique – Patient Mensah",
    description: "Saturation O2 tombée à 88% – Intervention requise",
    heure: "Il y a 5 min",
    lue: false,
  },
  {
    id: "2",
    type: "resultat",
    titre: "Résultats disponibles",
    description: "IRM de Fatoumata Diallo – Rapport validé par radiologie",
    heure: "Il y a 20 min",
    lue: false,
  },
  {
    id: "3",
    type: "consultation",
    titre: "Consultation acceptée",
    description: "Dr. Bah accepte la consultation pour Aminata Sy",
    heure: "Il y a 1h",
    lue: true,
  },
  {
    id: "4",
    type: "message",
    titre: "Nouveau message",
    description: "Dr. Kouassi a répondu dans la messagerie",
    heure: "Il y a 2h",
    lue: true,
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const urgenceColor = {
  haute: "bg-red-100 text-red-700 border-red-200",
  moyenne: "bg-yellow-100 text-yellow-700 border-yellow-200",
  basse: "bg-green-100 text-green-700 border-green-200",
};

const statutColor: Record<string, string> = {
  "En attente": "bg-yellow-50 text-yellow-700",
  Acceptée: "bg-teal-50 text-teal-700",
  Refusée: "bg-red-50 text-red-700",
  "En cours": "bg-blue-50 text-blue-700",
  "Résultats disponibles": "bg-teal-50 text-teal-700",
};

const notifIcon: Record<string, React.ReactNode> = {
  alerte: <AlertTriangle className="w-4 h-4 text-red-500" />,
  resultat: <FlaskConical className="w-4 h-4 text-teal-600" />,
  consultation: <UserCheck className="w-4 h-4 text-blue-500" />,
  message: <MessageSquare className="w-4 h-4 text-purple-500" />,
};

// ─── Messagerie Tab ───────────────────────────────────────────────────────────
function MessagerieTab() {
  const [selectedConv, setSelectedConv] = useState<Conversation>(
    conversations[0]
  );
  const [newMsg, setNewMsg] = useState("");
  const [msgs, setMsgs] = useState<Message[]>(conversations[0].messages);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  const handleSend = () => {
    if (!newMsg.trim()) return;
    const m: Message = {
      id: Date.now().toString(),
      expediteur: "Moi",
      avatar: "ME",
      role: "Utilisateur",
      contenu: newMsg,
      heure: new Date().toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      lu: true,
      moi: true,
    };
    setMsgs((prev) => [...prev, m]);
    setNewMsg("");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[520px]">
      {/* Liste conversations */}
      <Card className="rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <CardHeader className="p-4 pb-2 border-b border-slate-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <Input
              placeholder="Rechercher..."
              className="pl-8 rounded-xl text-sm border-slate-200"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-y-auto h-[420px]">
          {conversations.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                setSelectedConv(c);
                setMsgs(c.messages);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-teal-50/50 transition-colors border-b border-slate-50 text-left ${
                selectedConv.id === c.id ? "bg-teal-50" : ""
              }`}
            >
              <div className="w-9 h-9 rounded-full bg-teal-600 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                {c.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-800 truncate">
                    {c.avec}
                  </span>
                  <span className="text-xs text-slate-400 ml-1 flex-shrink-0">
                    {c.heure}
                  </span>
                </div>
                <p className="text-xs text-slate-500 truncate">
                  {c.dernierMessage}
                </p>
              </div>
              {c.nonLus > 0 && (
                <span className="w-5 h-5 rounded-full bg-teal-600 text-white text-xs flex items-center justify-center flex-shrink-0">
                  {c.nonLus}
                </span>
              )}
            </button>
          ))}
        </CardContent>
      </Card>

      {/* Zone messages */}
      <Card className="md:col-span-2 rounded-2xl border border-slate-100 shadow-sm flex flex-col overflow-hidden">
        {/* En-tête */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100 bg-white">
          <div className="w-9 h-9 rounded-full bg-teal-600 flex items-center justify-center text-white text-xs font-semibold">
            {selectedConv.avatar}
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800">
              {selectedConv.avec}
            </p>
            <p className="text-xs text-slate-500">{selectedConv.role}</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/30">
          {msgs.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.moi ? "justify-end" : "justify-start"}`}
            >
              {!m.moi && (
                <div className="w-7 h-7 rounded-full bg-teal-600 flex items-center justify-center text-white text-xs font-semibold mr-2 flex-shrink-0 mt-1">
                  {m.avatar}
                </div>
              )}
              <div
                className={`max-w-xs lg:max-w-sm px-4 py-2.5 rounded-2xl text-sm ${
                  m.moi
                    ? "bg-teal-600 text-white rounded-tr-sm"
                    : "bg-white text-slate-800 border border-slate-100 rounded-tl-sm shadow-sm"
                }`}
              >
                <p>{m.contenu}</p>
                <div
                  className={`text-xs mt-1 flex items-center gap-1 ${
                    m.moi ? "text-teal-200 justify-end" : "text-slate-400"
                  }`}
                >
                  <Clock className="w-3 h-3" />
                  {m.heure}
                  {m.moi && <CheckCheck className="w-3 h-3" />}
                </div>
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="p-3 border-t border-slate-100 bg-white flex gap-2">
          <Textarea
            rows={1}
            placeholder="Écrire un message..."
            className="flex-1 resize-none rounded-xl border-slate-200 text-sm min-h-0"
            value={newMsg}
            onChange={(e) => setNewMsg(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <Button
            onClick={handleSend}
            className="bg-teal-600 hover:bg-teal-700 text-white rounded-xl px-4"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
}

// ─── Consultation Tab ─────────────────────────────────────────────────────────
function ConsultationTab() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-600">
          {demandes.length} demandes en cours
        </p>
        <Button className="bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-sm gap-2">
          <Plus className="w-4 h-4" />
          Nouvelle demande
        </Button>
      </div>
      <div className="space-y-3">
        {demandes.map((d) => (
          <Card
            key={d.id}
            className="rounded-2xl border border-slate-100 shadow-sm"
          >
            <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-slate-800 text-sm">
                    {d.patient}
                  </span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-lg border font-medium ${urgenceColor[d.urgence]}`}
                  >
                    {d.urgence}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mb-0.5">
                  → {d.specialiste}
                </p>
                <p className="text-xs text-slate-500">{d.motif}</p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {d.date}
                </span>
                <span
                  className={`text-xs px-2.5 py-1 rounded-lg font-medium ${statutColor[d.statut]}`}
                >
                  {d.statut}
                </span>
                <button className="text-teal-600 hover:text-teal-800">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── Examens Tab ─────────────────────────────────────────────────────────────
function ExamensTab() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-600">
          {requetes.length} requêtes actives
        </p>
        <Button className="bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-sm gap-2">
          <Plus className="w-4 h-4" />
          Nouvelle requête
        </Button>
      </div>
      <div className="space-y-3">
        {requetes.map((r) => (
          <Card
            key={r.id}
            className="rounded-2xl border border-slate-100 shadow-sm"
          >
            <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center flex-shrink-0">
                <FlaskConical className="w-5 h-5 text-teal-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-semibold text-slate-800 text-sm">
                    {r.examen}
                  </span>
                  {r.urgence && (
                    <span className="text-xs bg-red-100 text-red-700 border border-red-200 px-2 py-0.5 rounded-lg font-medium flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      Urgent
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-600">Patient : {r.patient}</p>
                <p className="text-xs text-slate-500">
                  Demandé par {r.demandeur}
                </p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="text-xs text-slate-400">{r.date}</span>
                <span
                  className={`text-xs px-2.5 py-1 rounded-lg font-medium ${statutColor[r.statut]}`}
                >
                  {r.statut}
                </span>
                <button className="text-teal-600 hover:text-teal-800">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── Notifications Tab ────────────────────────────────────────────────────────
function NotificationsTab() {
  const nonLues = notifications.filter((n) => !n.lue).length;
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-600">
          <span className="font-semibold text-teal-700">{nonLues} nouvelles</span>{" "}
          notifications
        </p>
        <button className="text-xs text-teal-600 hover:underline">
          Tout marquer comme lu
        </button>
      </div>
      <div className="space-y-3">
        {notifications.map((n) => (
          <Card
            key={n.id}
            className={`rounded-2xl border shadow-sm transition-all ${
              !n.lue
                ? "border-teal-200 bg-teal-50/30"
                : "border-slate-100 bg-white"
            }`}
          >
            <CardContent className="p-4 flex items-start gap-3">
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  !n.lue ? "bg-white shadow-sm" : "bg-slate-50"
                }`}
              >
                {notifIcon[n.type]}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-slate-800">
                    {n.titre}
                  </p>
                  {!n.lue && (
                    <Circle className="w-2 h-2 fill-teal-500 text-teal-500 flex-shrink-0" />
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{n.description}</p>
              </div>
              <span className="text-xs text-slate-400 flex-shrink-0">
                {n.heure}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function CommunicationInternePage() {
  const totalNonLus =
    conversations.reduce((acc, c) => acc + c.nonLus, 0) +
    notifications.filter((n) => !n.lue).length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Communication Interne
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Messagerie, consultations et notifications en temps réel
          </p>
        </div>
        {totalNonLus > 0 && (
          <div className="flex items-center gap-2 bg-teal-50 border border-teal-200 rounded-xl px-3 py-2">
            <Bell className="w-4 h-4 text-teal-600" />
            <span className="text-sm font-semibold text-teal-700">
              {totalNonLus} non lu{totalNonLus > 1 ? "s" : ""}
            </span>
          </div>
        )}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="messagerie">
        <TabsList className="bg-slate-100 rounded-xl p-1">
          <TabsTrigger
            value="messagerie"
            className="rounded-lg text-sm data-[state=active]:bg-teal-600 data-[state=active]:text-white"
          >
            <MessageSquare className="w-3.5 h-3.5 mr-1.5" />
            Messagerie
          </TabsTrigger>
          <TabsTrigger
            value="consultations"
            className="rounded-lg text-sm data-[state=active]:bg-teal-600 data-[state=active]:text-white"
          >
            <UserCheck className="w-3.5 h-3.5 mr-1.5" />
            Consultations
          </TabsTrigger>
          <TabsTrigger
            value="examens"
            className="rounded-lg text-sm data-[state=active]:bg-teal-600 data-[state=active]:text-white"
          >
            <FlaskConical className="w-3.5 h-3.5 mr-1.5" />
            Examens urgents
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="rounded-lg text-sm data-[state=active]:bg-teal-600 data-[state=active]:text-white"
          >
            <Bell className="w-3.5 h-3.5 mr-1.5" />
            Notifications
            {totalNonLus > 0 && (
              <span className="ml-1.5 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                {totalNonLus}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="messagerie" className="mt-4">
          <MessagerieTab />
        </TabsContent>
        <TabsContent value="consultations" className="mt-4">
          <ConsultationTab />
        </TabsContent>
        <TabsContent value="examens" className="mt-4">
          <ExamensTab />
        </TabsContent>
        <TabsContent value="notifications" className="mt-4">
          <NotificationsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}