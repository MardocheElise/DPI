"use client";

import { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Topbar from "@/components/Topbar";
import {
  ChevronRight, User, Heart, AlertTriangle, Pill, Phone,
  Edit, Camera, Droplets, Activity, FileText, Plus, X,
  ArrowLeft, BedDouble, Calendar, Shield, CheckCircle2,
} from "lucide-react";
import { getPatientById } from "@/components/lib/patient";

const statusConfig: Record<string, { label: string; class: string; dot: string }> = {
  Hospitalisé: { label: "Hospitalisé",  class: "badge-approved",   dot: "bg-emerald-500" },
  Ambulatoire: { label: "Ambulatoire",  class: "badge-info",       dot: "bg-blue-500" },
  Sorti:       { label: "Sorti",        class: "bg-slate-100 text-slate-600 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold", dot: "bg-slate-400" },
  Urgent:      { label: "URGENT",       class: "badge-danger",     dot: "bg-red-500 animate-pulse" },
};

type TabKey = "synthese" | "antecedents" | "traitements" | "urgences" | "hospitalisation";

export default function ProfilPatientPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const patient = getPatientById(id);

  if (!patient) notFound();

  const [activeTab, setActiveTab] = useState<TabKey>("synthese");
  const [editMode, setEditMode] = useState(false);
  const [saved, setSaved] = useState(false);

  const cfg = statusConfig[patient.statut];


// retiré de la liste  { key: "traitements",     label: "Traitements",           icon: Pill },
  const tabs: { key: TabKey; label: string; icon: React.ElementType }[] = [
    { key: "synthese",        label: "Vue synthétique",       icon: Activity },
    { key: "antecedents",     label: "Antécédents",           icon: Heart },
    { key: "urgences",        label: "Contacts urgences",     icon: Phone },
    // { key: "hospitalisation", label: "Hospitalisation",       icon: BedDouble },
  ];

  const handleSave = () => {
    setSaved(true);
    setEditMode(false);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <>
      <Topbar title={`${patient.prenom} ${patient.nom}`} />
      <div className="p-6 space-y-6">

        {/* btn retour en arrière */}
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <Link href="/Gestion_administrative" className="hover:text-teal-600 transition-colors">Gestion Administrative</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/Gestion_administrative/profil_patient" className="hover:text-teal-600 transition-colors">Profil patient</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-teal-600 font-medium">{patient.prenom} {patient.nom}</span>
        </div>

        {/* Toast */}
        {saved && (
          <div className="fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 bg-emerald-600 text-white rounded-xl shadow-xl">
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-semibold text-sm">Modifications enregistrées</span>
          </div>
        )}

        {/* Patient header */}
        <div className="card">
          <div className="flex items-start gap-5">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-400 to-teal-700 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                {patient.prenom[0]}{patient.nom[0]}
              </div>
              {editMode && (
                <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full border-2 border-teal-500 flex items-center justify-center shadow-sm hover:bg-teal-50 transition-colors">
                  <Camera className="w-3 h-3 text-teal-600" />
                </button>
              )}
              {/* Status dot */}
              <span className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${cfg.dot}`} />
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-800">
                    {patient.prenom} <span className="text-teal-600">{patient.nom}</span>
                  </h2>
                  <p className="text-sm text-slate-500 mt-0.5">
                    {patient.age} ans • {patient.sexe} • Né(e) le {patient.dateNaissance}
                  </p>
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    <span className={cfg.class}>{cfg.label}</span>
                    <span className="badge-approved">{patient.id}</span>
                    <span className="badge-info">INS: {patient.ins}</span>
                    {/* <span className="bg-violet-100 text-violet-700 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold">
                      {patient.medecin}
                    </span> */}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href="/Gestion_administrative/profil_patient"
                    className="btn-secondary flex items-center gap-2 text-xs py-2"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Retour liste
                  </Link>
                  {editMode ? (
                    <button onClick={handleSave} className="btn-primary flex items-center gap-2 text-xs py-2">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Sauvegarder
                    </button>
                  ) : (
                    <button onClick={() => setEditMode(true)} className="btn-secondary flex items-center gap-2 text-xs py-2">
                      <Edit className="w-3.5 h-3.5" /> Modifier
                    </button>
                  )}
                </div>
              </div>

              {/* Quick info row */}
              <div className="grid grid-cols-4 gap-3 mt-4">
                {[
                  { label: "Groupe sanguin", value: patient.groupeSanguin, color: "bg-red-50 text-red-700 border-red-200", icon: Droplets },
                  { label: "Allergies",      value: `${patient.allergies.length} connue(s)`, color: "bg-amber-50 text-amber-700 border-amber-200", icon: AlertTriangle },
                  // { label: "Traitements",    value: `${patient.traitements.length} en cours`, color: "bg-blue-50 text-blue-700 border-blue-200", icon: Pill },
                  { label: "Assurance",      value: patient.assurance, color: "bg-teal-50 text-teal-700 border-teal-200", icon: Shield },
                ].map((item) => (
                  <div key={item.label} className={`px-3 py-2.5 rounded-xl border ${item.color} flex items-center gap-2`}>
                    <item.icon className="w-4 h-4 flex-shrink-0" />
                    <div>
                      <p className="text-xs opacity-70">{item.label}</p>
                      <p className="text-xs font-bold">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white p-1.5 rounded-2xl shadow-sm border border-slate-100 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.key ? "bg-teal-600 text-white shadow-sm" : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── TAB: Synthèse ── */}
        {activeTab === "synthese" && (
          <div className="grid grid-cols-2 gap-4">
            <div className="card">
              <h3 className="section-title flex items-center gap-2">
                <User className="w-4 h-4 text-teal-600" />Identité complète
              </h3>
              <div className="space-y-0">
                {[
                  { label: "Nom complet",       value: `${patient.prenom} ${patient.nom}` },
                  { label: "Date de naissance",  value: `${patient.dateNaissance} (${patient.age} ans)` },
                  { label: "Sexe",               value: patient.sexe },
                  { label: "INS",                value: patient.ins },
                  { label: "Adresse",            value: patient.adresse },
                  { label: "Téléphone",          value: patient.telephone },
                  { label: "Email",              value: patient.email || "—" },
                  { label: "Médecin traitant",   value: patient.medecin },
                  { label: "Assurance",          value: patient.assurance },
                  { label: "Convention",         value: patient.convention },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between py-2.5 border-b border-slate-50 last:border-0">
                    <span className="text-xs text-slate-400 font-medium">{item.label}</span>
                    <span className="text-xs text-slate-700 font-semibold text-right max-w-[55%]">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {/* Groupe sanguin */}
              <div className="card flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-red-50 border-2 border-red-200 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-black text-red-600">{patient.groupeSanguin}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-700">Groupe sanguin</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Droplets className="w-3 h-3 text-red-500" />
                    <span className="text-xs text-red-600 font-medium">Rhésus {patient.groupeSanguin.includes("-") ? "négatif" : "positif"}</span>
                  </div>
                </div>
              </div>

              {/* Allergies */}
              <div className="card">
                <h3 className="section-title flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />Allergies & Contre-indications
                </h3>
                <div className="mb-3">
                  <p className="text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">Allergies</p>
                  {patient.allergies.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {patient.allergies.map((a) => (
                        <span key={a} className="px-2.5 py-1 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" />{a}
                          {editMode && <X className="w-3 h-3 ml-1 cursor-pointer hover:text-red-900" />}
                        </span>
                      ))}
                      {editMode && (
                        <button className="px-2.5 py-1 rounded-xl border-2 border-dashed border-red-300 text-red-400 text-xs font-medium flex items-center gap-1 hover:bg-red-50">
                          <Plus className="w-3 h-3" />Ajouter
                        </button>
                      )}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-300 italic">Aucune allergie connue</p>
                  )}
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">Contre-indications</p>
                  {patient.contreIndications.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {patient.contreIndications.map((ci) => (
                        <span key={ci} className="px-2.5 py-1 rounded-xl bg-orange-50 border border-orange-200 text-orange-700 text-xs font-semibold">
                          {ci}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-300 italic">Aucune contre-indication</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB: Antécédents ── */}
        {activeTab === "antecedents" && (
          <div className="grid grid-cols-2 gap-4">
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="section-title mb-0 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-teal-600" />Antécédents personnels
                </h3>
                <button className="btn-primary text-xs py-1.5 flex items-center gap-1"><Plus className="w-3 h-3" />Ajouter</button>
              </div>
              {patient.antecedentsPerso.length > 0 ? (
                <div className="space-y-2">
                  {patient.antecedentsPerso.map((a, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-teal-50 transition-colors">
                      <div className="w-2 h-2 rounded-full bg-teal-500 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-slate-700">{a.type}</p>
                        <p className="text-xs text-slate-400">Depuis {a.date}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-lg font-semibold ${
                        a.statut === "Chronique" ? "bg-orange-100 text-orange-700" :
                        a.statut === "Contrôlé"  ? "bg-blue-100 text-blue-700" : "badge-approved"
                      }`}>{a.statut}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-300 italic text-center py-6">Aucun antécédent personnel renseigné</p>
              )}
            </div>

            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="section-title mb-0">Antécédents familiaux</h3>
                <button className="btn-primary text-xs py-1.5 flex items-center gap-1"><Plus className="w-3 h-3" />Ajouter</button>
              </div>
              {patient.antecedentsFamiliaux.length > 0 ? (
                <div className="space-y-2">
                  {patient.antecedentsFamiliaux.map((a, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">
                      <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center text-teal-600 font-bold text-xs flex-shrink-0">
                        {a.parent[0]}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-600">{a.parent}</p>
                        <p className="text-xs text-slate-500">{a.pathologie}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-300 italic text-center py-6">Aucun antécédent familial renseigné</p>
              )}
            </div>
          </div>
        )}

        {/* ── TAB: Traitements ── */}
        {activeTab === "traitements" && (
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="section-title mb-0 flex items-center gap-2">
                <Pill className="w-4 h-4 text-teal-600" />Traitements en cours avant hospitalisation
              </h3>
              <button className="btn-primary text-xs py-1.5 flex items-center gap-1"><Plus className="w-3 h-3" />Ajouter</button>
            </div>
            {patient.traitements.length > 0 ? (
              <div className="space-y-2">
                {patient.traitements.map((t, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-teal-200 hover:bg-teal-50 transition-all">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <Pill className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-slate-800 text-sm">{t.medicament}</p>
                      <p className="text-xs text-slate-500">{t.posologie}</p>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-lg font-medium ${t.duree === "Continu" ? "bg-teal-100 text-teal-700" : "bg-slate-100 text-slate-600"}`}>
                      {t.duree}
                    </span>
                    {editMode && (
                      <button className="w-7 h-7 rounded-lg hover:bg-red-50 flex items-center justify-center">
                        <X className="w-3.5 h-3.5 text-red-400" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-300 italic text-center py-8">Aucun traitement en cours</p>
            )}
          </div>
        )}

        {/* ── TAB: Urgences ── */}
        {activeTab === "urgences" && (
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="section-title mb-0 flex items-center gap-2">
                <Phone className="w-4 h-4 text-teal-600" />Contacts d&apos;urgence
              </h3>
              <button className="btn-primary text-xs py-1.5 flex items-center gap-1"><Plus className="w-3 h-3" />Ajouter</button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {patient.urgences.map((u, i) => (
                <div key={i} className="p-4 rounded-xl border border-slate-100 hover:border-teal-200 transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-bold text-sm">
                      {u.nom.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800 text-sm">{u.nom}</p>
                      <span className="badge-info text-xs">{u.lien}</span>
                    </div>
                  </div>
                  <a href={`tel:${u.tel}`} className="flex items-center gap-2 text-teal-600 hover:text-teal-700 text-sm font-medium">
                    <Phone className="w-3.5 h-3.5" />{u.tel}
                  </a>
                </div>
              ))}
              {patient.urgences.length === 0 && (
                <p className="col-span-2 text-xs text-slate-300 italic text-center py-8">Aucun contact d&apos;urgence renseigné</p>
              )}
            </div>
          </div>
        )}

        {/* ── TAB: Hospitalisation ── */}
        {activeTab === "hospitalisation" && (
          <div className="card">
            <h3 className="section-title flex items-center gap-2">
              <BedDouble className="w-4 h-4 text-teal-600" />Données d&apos;hospitalisation
            </h3>
            {patient.hospitalisation ? (
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Service",            value: patient.hospitalisation.service,   icon: Activity },
                  { label: "Lit",                value: patient.hospitalisation.lit,        icon: BedDouble },
                  { label: "Date d'entrée",      value: patient.hospitalisation.dateEntree, icon: Calendar },
                  { label: "Date de sortie",     value: patient.hospitalisation.dateSortie, icon: Calendar },
                  { label: "Type",               value: patient.hospitalisation.type,       icon: FileText },
                  { label: "Statut",             value: patient.hospitalisation.statut,     icon: Activity },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">
                    <item.icon className="w-4 h-4 text-teal-500 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-slate-400">{item.label}</p>
                      <p className="text-sm font-semibold text-slate-700">{item.value}</p>
                    </div>
                  </div>
                ))}
                <div className="col-span-2 p-3 rounded-xl bg-teal-50 border border-teal-200">
                  <p className="text-xs text-teal-600 font-semibold mb-1">Motif d&apos;hospitalisation</p>
                  <p className="text-sm text-teal-800 font-medium">{patient.hospitalisation.motif}</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-10">
                <BedDouble className="w-10 h-10 text-slate-200 mx-auto mb-3" />
                <p className="text-slate-400 font-medium text-sm">Aucune hospitalisation en cours</p>
                <Link href="/Gestion_administrative/hospitalisation" className="btn-primary text-xs mt-3 inline-flex items-center gap-1">
                  <Plus className="w-3.5 h-3.5" />Créer une hospitalisation
                </Link>
              </div>
            )}
          </div>
        )}

      </div>
    </>
  );
}