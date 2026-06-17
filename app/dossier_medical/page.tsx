"use client";
import Link from "next/link";
import {
  Stethoscope, ClipboardList, HeartPulse, Pill, FlaskConical, FileCheck,
  ChevronRight, ArrowRight,
} from "lucide-react";
import Topbar from "@/components/Topbar";

const modules = [
  {
    href: "/dossier_medical/consultation",
    label: "Consultation Médicale",
    description: "Motif, anamnèse, antécédents, examen clinique complet, signes vitaux et compte-rendu structuré",
    icon: Stethoscope,
    color: "from-teal-500 to-teal-700",
    stats: "24 consultations aujourd'hui",
    actions: ["Motif & anamnèse", "Examen clinique", "Signes vitaux"],
  },
  {
    href: "/dossier_medical/diagnostique",
    label: "Diagnostique",
    description: "Saisie CIM-10, diagnostics associés, diagnostic différentiel, échelle de gravité et triage urgences",
    icon: ClipboardList,
    color: "from-blue-500 to-blue-700",
    stats: "Triage vert / orange / rouge",
    actions: ["CIM-10", "Comorbidités", "Gravité & triage"],
  },
//   {
//     href: "/dossier_medical/plan_de_soins",
//     label: "Plan de Soins",
//     description: "Objectifs thérapeutiques, plan de surveillance, traitements, examens de contrôle et soins palliatifs",
//     icon: HeartPulse,
//     color: "from-purple-500 to-purple-700",
//     stats: "Protocoles préconfigurés",
//     actions: ["Objectifs", "Surveillance", "Soins palliatifs"],
//   },
  {
    href: "/dossier_medical/prescription_medicaments",
    label: "Prescription Médicaments",
    description: "Recherche DCI/commercial, posologie, interactions automatiques, validation pharmaceutique et protocoles",
    icon: Pill,
    color: "from-orange-500 to-orange-700",
    stats: "Base Vidal intégrée",
    actions: ["Recherche DCI", "Interactions", "Validation pharma"],
  },
  {
    href: "/dossier_medical/prescription_examen",
    label: "Prescription Examens",
    description: "Biologie médicale, imagerie (radio, écho, scanner, IRM), autres examens avec marquage urgent",
    icon: FlaskConical,
    color: "from-cyan-500 to-cyan-700",
    stats: "Biologie · Imagerie · Autres",
    actions: ["Biologie", "Imagerie", "ECG / EFR"],
  },
//   {
//     href: "/dossier_medical/compte_rendu",
//     label: "Compte-rendu",
//     description: "CR d'hospitalisation (LDL), compte-rendu opératoire (CRO), ordonnance de sortie et envoi médecin traitant",
//     icon: FileCheck,
//     color: "from-emerald-500 to-emerald-700",
//     stats: "Impression & export PDF",
//     actions: ["CR Hospit.", "CR Opératoire", "Ordonnance sortie"],
//   },
];

export default function DossierMedicalPage() {
  return (
    <>
      <Topbar title="Dossier Médical" />
      <div className="p-6 space-y-6">
        {/* Breadcrumb */}
        <div>
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-1">
            <span>DPI</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-teal-600 font-medium">Dossier Médical</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Dossier Médical du Patient</h1>
          <p className="text-slate-500 text-sm mt-1">
            Accédez à l&apos;ensemble des modules cliniques du dossier patient informatisé
          </p>
        </div>

        {/* Module grid */}
        <div className="grid grid-cols-3 gap-5">
          {modules.map((mod) => (
            <Link key={mod.href} href={mod.href} className="group">
              <div className="card hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${mod.color} flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform`}
                >
                  <mod.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-slate-800 text-lg mb-1">{mod.label}</h3>
                <p className="text-sm text-slate-500 mb-3 flex-1">{mod.description}</p>
                <div className="text-xs text-teal-600 font-semibold mb-3">{mod.stats}</div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {mod.actions.map((a) => (
                    <span key={a} className="px-2 py-1 bg-slate-100 rounded-lg text-xs text-slate-600 font-medium">
                      {a}
                    </span>
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


























