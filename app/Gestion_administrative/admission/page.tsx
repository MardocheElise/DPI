 "use client";

import { useState } from "react";
import Topbar from "@/components/Topbar";
import {
  Search, Plus, UserPlus, FileText, Shield, Hash, ChevronRight,
  User, Phone, MapPin, Calendar, CreditCard, CheckCircle2, AlertCircle, X
} from "lucide-react";
import Link from "next/link";

// Mock patient search results
const mockPatients = [
  { id: "DPI-2024-0891", nom: "Kouassi", prenom: "Adjoua Marie", naissance: "1985-03-14", ins: "185036901234567", sexe: "F" },
  { id: "DPI-2024-0742", nom: "Traoré", prenom: "Moussa Ibrahima", naissance: "1972-08-22", ins: "172086901234568", sexe: "M" },
  { id: "DPI-2024-0633", nom: "Koné", prenom: "Adama Sékou", naissance: "1990-11-05", ins: "190116901234569", sexe: "M" },
];

interface PatientForm {
  nom: string; prenom: string; dateNaissance: string; sexe: string;
  adresse: string; telephone: string; email: string;
  assurance: string; numAssurance: string; convention: string;
  numeroDossier: string; opposition_dmp: boolean;
}

const emptyForm: PatientForm = {
  nom: "", prenom: "", dateNaissance: "", sexe: "",
  adresse: "", telephone: "", email: "",
  assurance: "", numAssurance: "", convention: "",
  numeroDossier: `DPI-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9000) + 1000)}`,
  opposition_dmp: false,
};

export default function AdmissionPage() {
  const [mode, setMode] = useState<"search" | "new" | "result">("search");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<typeof mockPatients>([]);
  const [selectedPatient, setSelectedPatient] = useState<(typeof mockPatients)[0] | null>(null);
  const [form, setForm] = useState<PatientForm>(emptyForm);
  const [activeTab, setActiveTab] = useState<"identite" | "assurance" | "dossier">("identite");
  const [saved, setSaved] = useState(false);
  const [errors, setErrors] = useState<Partial<PatientForm>>({});

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    const results = mockPatients.filter(
      (p) =>
        p.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.prenom.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.ins.includes(searchQuery) ||
        p.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleSelectPatient = (p: typeof mockPatients[0]) => {
    setSelectedPatient(p);
    setMode("result");
  };

  const handleFormChange = (key: keyof PatientForm, value: string | boolean) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validateForm = () => {
    const newErrors: Partial<PatientForm> = {};
    if (!form.nom) newErrors.nom = "Requis";
    if (!form.prenom) newErrors.prenom = "Requis";
    if (!form.dateNaissance) newErrors.dateNaissance = "Requis";
    if (!form.sexe) newErrors.sexe = "Requis";
    if (!form.telephone) newErrors.telephone = "Requis";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;
    setSaved(true);
    setTimeout(() => { setSaved(false); setMode("search"); setSearchQuery(""); setSearchResults([]); setForm(emptyForm); }, 2500);
  };

  const tabs = [
    { key: "identite", label: "Identité & Coordonnées", icon: User },
    { key: "assurance", label: "Assurance & Convention", icon: Shield },
    { key: "dossier", label: "Numéro dossier & DMP", icon: Hash },
  ];

  return (
    <>
      <Topbar title="Admission patient" />
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-slate-400 mb-1">
              <Link href ="/Gestion_administrative" className="hover:text-teal-600 transition-colors">
                <span>Gestion Administrative</span>
              </Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-teal-600 font-medium">Admission patient</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-800">Admission patient</h1>
          </div>
          <div className="flex gap-2">
            {/* <button onClick={() => { setMode("search"); setSearchResults([]); setSearchQuery(""); }} className="btn-secondary flex items-center gap-2">
              <Search className="w-4 h-4" /> Rechercher patient
            </button> */}
            <button onClick={() => { setMode("new"); setForm(emptyForm); setActiveTab("identite"); }} className="btn-primary flex items-center gap-2">
              <UserPlus className="w-4 h-4" /> Nouveau dossier
            </button>
          </div>
        </div>

        {/* Success toast */}
        {saved && (
          <div className="fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 bg-emerald-600 text-white rounded-xl shadow-xl animate-bounce">
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-semibold text-sm">Dossier enregistré avec succès!</span>
          </div>
        )}

        {/* SEARCH MODE */}
        {mode === "search" && (
          <div className="space-y-4">
            <div className="card">
              <h3 className="section-title flex items-center gap-2">
                <Search className="w-4 h-4 text-teal-600" />
                Recherche patient
              </h3>
              <div className="flex gap-3 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Nom, prénom, numéro INS ou numéro de dossier..."
                    className="input-field pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  />
                </div>
                <button onClick={handleSearch} className="btn-primary px-6">Rechercher</button>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Recherche par nom/prénom", desc: "Saisir le nom de famille ou prénom", icon: User },
                  { label: "Recherche par INS", desc: "Identifiant National de Santé", icon: CreditCard },
                  { label: "Recherche par N° dossier", desc: "Format: DPI-AAAA-XXXX", icon: FileText },
                ].map((tip) => (
                  <div key={tip.label} className="p-3 rounded-xl bg-teal-50 border border-teal-100 flex items-start gap-2">
                    <tip.icon className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-teal-800">{tip.label}</p>
                      <p className="text-xs text-teal-600">{tip.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {searchResults.length > 0 && (
              <div className="card">
                <h3 className="section-title">{searchResults.length} résultat(s) trouvé(s)</h3>
                <div className="space-y-2">
                  {searchResults.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => handleSelectPatient(p)}
                      className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-teal-300 hover:bg-teal-50 cursor-pointer transition-all"
                    >
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {p.prenom[0]}{p.nom[0]}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-slate-800">{p.prenom} {p.nom}</p>
                        <p className="text-xs text-slate-500">INS: {p.ins} • Né(e) le {p.naissance} • {p.sexe === "F" ? "Féminin" : "Masculin"}</p>
                      </div>
                      <div className="text-right">
                        <span className="badge-approved">{p.id}</span>
                        <p className="text-xs text-slate-400 mt-1">Voir le dossier →</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {searchQuery && searchResults.length === 0 && (
              <div className="card text-center py-10">
                <AlertCircle className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500 font-medium">Aucun patient trouvé</p>
                <p className="text-sm text-slate-400 mb-4">Vérifiez l&apos;orthographe ou créez un nouveau dossier</p>
                <button onClick={() => { setMode("new"); setForm(emptyForm); }} className="btn-primary">
                  <Plus className="w-4 h-4 mr-2" />Créer un nouveau dossier
                </button>
              </div>
            )}
          </div>
        )}

        {/* RESULT MODE */}
        {mode === "result" && selectedPatient && (
          <div className="card">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  {selectedPatient.prenom[0]}{selectedPatient.nom[0]}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">{selectedPatient.prenom} {selectedPatient.nom}</h2>
                  <p className="text-sm text-slate-500">INS: {selectedPatient.ins}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="badge-approved">{selectedPatient.id}</span>
                    <span className="badge-info">{selectedPatient.sexe === "F" ? "Féminin" : "Masculin"}</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setMode("search")} className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors">
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4 p-4 bg-slate-50 rounded-xl">
              {[
                { label: "Date de naissance", value: selectedPatient.naissance, icon: Calendar },
                { label: "Numéro INS", value: selectedPatient.ins, icon: CreditCard },
                { label: "Numéro dossier", value: selectedPatient.id, icon: FileText },
              ].map((info) => (
                <div key={info.label} className="flex items-center gap-2">
                  <info.icon className="w-4 h-4 text-teal-500" />
                  <div>
                    <p className="text-xs text-slate-400">{info.label}</p>
                    <p className="text-sm font-semibold text-slate-700">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-4">
              <button className="btn-primary flex items-center gap-2">
                <FileText className="w-4 h-4" /> Ouvrir le dossier complet
              </button>
              <button className="btn-secondary">Mettre à jour les informations</button>
            </div>
          </div>
        )}

        {/* NEW PATIENT FORM */}
        {mode === "new" && (
          <div className="space-y-4">
            {/* Tabs */}
            <div className="flex gap-2 bg-white p-1.5 rounded-2xl shadow-sm border border-slate-100 w-fit">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as typeof activeTab)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    activeTab === tab.key
                      ? "bg-teal-600 text-white shadow-sm"
                      : "text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Identité Tab */}
            {activeTab === "identite" && (
              <div className="card space-y-5">
                <h3 className="section-title flex items-center gap-2">
                  <User className="w-4 h-4 text-teal-600" />
                  Données d&apos;identité et coordonnées
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">Nom de famille <span className="text-red-400">*</span></label>
                    <input className={`input-field ${errors.nom ? "border-red-400 ring-1 ring-red-400" : ""}`} placeholder="KOUASSI" value={form.nom} onChange={(e) => handleFormChange("nom", e.target.value.toUpperCase())} />
                    {errors.nom && <p className="text-xs text-red-500 mt-1">{errors.nom}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">Prénom(s) <span className="text-red-400">*</span></label>
                    <input className={`input-field ${errors.prenom ? "border-red-400 ring-1 ring-red-400" : ""}`} placeholder="Adjoua Marie" value={form.prenom} onChange={(e) => handleFormChange("prenom", e.target.value)} />
                    {errors.prenom && <p className="text-xs text-red-500 mt-1">{errors.prenom}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">Date de naissance <span className="text-red-400">*</span></label>
                    <input type="date" className={`input-field ${errors.dateNaissance ? "border-red-400 ring-1 ring-red-400" : ""}`} value={form.dateNaissance} onChange={(e) => handleFormChange("dateNaissance", e.target.value)} />
                    {errors.dateNaissance && <p className="text-xs text-red-500 mt-1">{errors.dateNaissance}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">Sexe <span className="text-red-400">*</span></label>
                    <select className={`input-field ${errors.sexe ? "border-red-400 ring-1 ring-red-400" : ""}`} value={form.sexe} onChange={(e) => handleFormChange("sexe", e.target.value)}>
                      <option value="">Sélectionner...</option>
                      <option value="F">Féminin</option>
                      <option value="M">Masculin</option>
                    </select>
                    {errors.sexe && <p className="text-xs text-red-500 mt-1">{errors.sexe}</p>}
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                      <MapPin className="inline w-3 h-3 mr-1" />Adresse complète
                    </label>
                    <input className="input-field" placeholder="Rue, quartier, ville..." value={form.adresse} onChange={(e) => handleFormChange("adresse", e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                      <Phone className="inline w-3 h-3 mr-1" />Téléphone <span className="text-red-400">*</span>
                    </label>
                    <input className={`input-field ${errors.telephone ? "border-red-400 ring-1 ring-red-400" : ""}`} placeholder="+225 07 XX XX XX XX" value={form.telephone} onChange={(e) => handleFormChange("telephone", e.target.value)} />
                    {errors.telephone && <p className="text-xs text-red-500 mt-1">{errors.telephone}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">Email</label>
                    <input type="email" className="input-field" placeholder="patient@email.com" value={form.email} onChange={(e) => handleFormChange("email", e.target.value)} />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button onClick={() => setActiveTab("assurance")} className="btn-primary flex items-center gap-2">
                    Suivant <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Assurance Tab */}
            {activeTab === "assurance" && (
              <div className="card space-y-5">
                <h3 className="section-title flex items-center gap-2">
                  <Shield className="w-4 h-4 text-teal-600" />
                  Identification assurance & convention
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">Organisme d&apos;assurance</label>
                    <select className="input-field" value={form.assurance} onChange={(e) => handleFormChange("assurance", e.target.value)}>
                      <option value="">Sélectionner...</option>
                      <option value="CNAM">CNAM - Caisse Nationale d&apos;Assurance Maladie</option>
                      <option value="MUGEFCI">MUGEFCI</option>
                      <option value="LONACI">LONACI</option>
                      <option value="SOGEPA">SOGEPA</option>
                      <option value="Privé">Assurance privée</option>
                      <option value="Aucune">Aucune assurance</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">Numéro d&apos;assuré</label>
                    <input className="input-field" placeholder="N° carte assuré" value={form.numAssurance} onChange={(e) => handleFormChange("numAssurance", e.target.value)} />
                  </div>
                  {/* <div className="col-span-2">
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">Type de convention</label>
                    <div className="grid grid-cols-3 gap-2">
                      {["Tiers payant total", "Tiers payant partiel", "Aucune convention", "Convention entreprise", "Mutuelle", "Prise en charge totale"].map((conv) => (
                        <button
                          key={conv}
                          onClick={() => handleFormChange("convention", conv)}
                          className={`px-3 py-2.5 rounded-xl text-xs font-medium border transition-all text-left ${
                            form.convention === conv
                              ? "bg-teal-600 text-white border-teal-600"
                              : "bg-white text-slate-600 border-slate-200 hover:border-teal-300"
                          }`}
                        >
                          {conv}
                        </button>
                      ))}
                    </div>
                  </div> */}
                </div>
                <div className="flex justify-between">
                  <button onClick={() => setActiveTab("identite")} className="btn-secondary">← Précédent</button>
                  <button onClick={() => setActiveTab("dossier")} className="btn-primary flex items-center gap-2">Suivant <ChevronRight className="w-4 h-4" /></button>
                </div>
              </div>
            )}

            {/* Dossier Tab */}
            {activeTab === "dossier" && (
              <div className="card space-y-5">
                <h3 className="section-title flex items-center gap-2">
                  <Hash className="w-4 h-4 text-teal-600" />
                  Numéro de dossier & Consentement DMP
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">Numéro de dossier unique (auto-généré)</label>
                    <div className="flex gap-2">
                      <input className="input-field bg-slate-50 font-mono font-semibold text-teal-700" readOnly value={form.numeroDossier} />
                      <button
                        onClick={() => handleFormChange("numeroDossier", `DPI-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9000) + 1000)}`)}
                        className="btn-secondary px-3 text-xs"
                      >
                        Régénérer
                      </button>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">Ce numéro est unique et sera attribué définitivement lors de l&apos;enregistrement</p>
                  </div>

                  {/* <div className="p-5 rounded-xl bg-blue-50 border border-blue-200">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-blue-800 text-sm mb-1">Dossier Médical Partagé (DMP)</h4>
                        <p className="text-xs text-blue-600 mb-3">
                          Conformément à la réglementation, le patient doit être informé de la création d&apos;un DMP et peut s&apos;y opposer. 
                          Enregistrez ici sa position.
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => handleFormChange("opposition_dmp", false)}
                            className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                              !form.opposition_dmp ? "bg-teal-600 text-white border-teal-600" : "bg-white text-slate-600 border-slate-200"
                            }`}
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            Accord pour le DMP
                          </button>
                          <button
                            onClick={() => handleFormChange("opposition_dmp", true)}
                            className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                              form.opposition_dmp ? "bg-red-500 text-white border-red-500" : "bg-white text-slate-600 border-slate-200"
                            }`}
                          >
                            <AlertCircle className="w-4 h-4" />
                            Opposition au DMP
                          </button>
                        </div>
                        <p className="text-xs text-blue-500 mt-2">
                          {form.opposition_dmp
                            ? "⚠️ Le patient s'oppose à la création d'un DMP. Cette information sera enregistrée."
                            : "✅ Le patient consent à la création et l'alimentation de son DMP."}
                        </p>
                      </div>
                    </div>
                  </div> */}

                  {/* Summary */}
                  <div className="p-4 rounded-xl bg-teal-50 border border-teal-200">
                    <h4 className="text-sm font-semibold text-teal-800 mb-3">Récapitulatif du dossier</h4>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {[
                        { label: "Nom complet", value: `${form.prenom || "—"} ${form.nom || "—"}` },
                        { label: "Date de naissance", value: form.dateNaissance || "—" },
                        { label: "Sexe", value: form.sexe === "F" ? "Féminin" : form.sexe === "M" ? "Masculin" : "—" },
                        { label: "Téléphone", value: form.telephone || "—" },
                        { label: "Assurance", value: form.assurance || "—" },
                        { label: "Convention", value: form.convention || "—" },
                      ].map((item) => (
                        <div key={item.label}>
                          <span className="text-teal-600">{item.label}: </span>
                          <span className="text-teal-900 font-medium">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <button onClick={() => setActiveTab("assurance")} className="btn-secondary">← Précédent</button>
                  <button onClick={handleSave} className="btn-primary flex items-center gap-2 px-8">
                    <CheckCircle2 className="w-4 h-4" /> Enregistrer le dossier
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}