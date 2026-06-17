"use client";
import Link from "next/link";
import { Users, FileText, Calendar, ChevronRight, ArrowRight } from "lucide-react";
import Topbar from "@/components/Topbar";
const modules = [
  {
    href: "/Gestion_administrative/admission",
    label: "Admission patient",
    description: "Recherche, création de dossier, enregistrement administratif, assurance, DMP",
    icon: Users,
    color: "from-teal-500 to-teal-700",
    stats: "142 admissions ce mois",
    actions: ["Rechercher patient", "Nouveau dossier", "INS & assurance"],
  },
  {
    href: "/Gestion_administrative/profil_patient",
    label: "Profil patient",
    description: "Vue synthétique complète, groupe sanguin, allergies, antécédents, traitements",
    icon: FileText,
    color: "from-blue-500 to-blue-700",
    stats: "318 dossiers actifs",
    actions: ["Identité complète", "Allergies & CI", "Antécédents"],
  },
  {
    href: "/Gestion_administrative/hospitalisation",
    label: "Hospitalisation",
    description: "Admission service/lit, dates, type, diagnostic, transfert, sortie",
    icon: Calendar,
    color: "from-purple-500 to-purple-700",
    stats: "89/120 lits occupés",
    actions: ["Nouvelle hospit.", "Gestion des lits", "Transferts"],
  },
];

export default function GestionAdminPage() {
  return ( 
    <>
      <Topbar title="Gestion Administrative" />
      <div className="p-6 space-y-6">
        <div>
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-1">
           <Link href="/" className="hover:text-teal-600 transition-colors">
                <span>DPI</span>
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-teal-600 font-medium">Gestion Administrative</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Gestion Administrative du Patient</h1>
          <p className="text-slate-500 text-sm mt-1">Gérez l&apos;ensemble des aspects administratifs du parcours patient</p>
        </div>

        <div className="grid grid-cols-3 gap-5">
          {modules.map((mod) => (
            <Link key={mod.href} href={mod.href} className="group">
              <div className="card hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${mod.color} flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform`}>
                  <mod.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-slate-800 text-lg mb-1">{mod.label}</h3>
                <p className="text-sm text-slate-500 mb-3 flex-1">{mod.description}</p>
                <div className="text-xs text-teal-600 font-semibold mb-3">{mod.stats}</div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {mod.actions.map(a => (
                    <span key={a} className="px-2 py-1 bg-slate-100 rounded-lg text-xs text-slate-600 font-medium">{a}</span>
                  ))}
                </div>
                <div className="flex items-center gap-1 text-teal-600 text-sm font-semibold group-hover:gap-2 transition-all">
                  Accéder <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}