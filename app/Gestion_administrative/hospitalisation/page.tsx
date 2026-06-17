"use client";

import { useState } from "react";
import Topbar from "@/components/Topbar";
import {
  ChevronRight, Bed, Calendar, ArrowRightLeft, Clock,
  CheckCircle2, Plus, Filter, Search, AlertCircle
} from "lucide-react";
import Link from "next/link";

const mockHospitalisations = [
  {
    id: "HOSP-2024-0341", patient: "Kouassi Adjoua Marie", dossier: "DPI-2024-0891",
    service: "Cardiologie", lit: "C-14A", dateEntree: "2025-06-01", dateSortie: "2025-06-08",
    type: "Complète", motif: "Insuffisance cardiaque décompensée", statut: "En cours",
  },
  {
    id: "HOSP-2024-0342", patient: "Traoré Moussa", dossier: "DPI-2024-0742",
    service: "Chirurgie", lit: "CH-07B", dateEntree: "2025-06-02", dateSortie: "2025-06-05",
    type: "Journée", motif: "Appendicite aiguë", statut: "En cours",
  },
  {
    id: "HOSP-2024-0339", patient: "Bamba Fatou", dossier: "DPI-2024-0633",
    service: "Pédiatrie", lit: "P-03C", dateEntree: "2025-05-28", dateSortie: "2025-06-01",
    type: "Complète", motif: "Pneumonie bactérienne", statut: "Sorti",
  },
  {
    id: "HOSP-2024-0343", patient: "Koné Adama Sékou", dossier: "DPI-2024-0743",
    service: "Urgences", lit: "URG-02", dateEntree: "2025-06-03", dateSortie: "—",
    type: "Urgent", motif: "Polytraumatisme AVP", statut: "Urgent",
  },
];

const services = ["Tous", "Cardiologie", "Chirurgie", "Pédiatrie", "Urgences", "Médecine interne", "Neurologie"];
const litsDisponibles = [
  { lit: "C-15B", service: "Cardiologie", statut: "Libre" },
  { lit: "C-16A", service: "Cardiologie", statut: "Libre" },
  { lit: "CH-08A", service: "Chirurgie", statut: "Libre" },
  { lit: "MI-04C", service: "Médecine interne", statut: "Libre" },
];

export default function HospitalisationPage() {
  const [view, setView] = useState<"list" | "new">("list");
  const [filterService, setFilterService] = useState("Tous");
  const [filterStatut, setFilterStatut] = useState("Tous");
  const [searchQ, setSearchQ] = useState("");
  const [form, setForm] = useState({
    patient: "", service: "", lit: "", dateEntree: new Date().toISOString().split("T")[0],
    dateSortiePrevue: "", type: "", motif: "", diagnostic: "", transfertDe: "", contrevisite: "Non",
  });
  const [saved, setSaved] = useState(false);

  const filtered = mockHospitalisations.filter((h) => {
    const matchService = filterService === "Tous" || h.service === filterService;
    const matchStatut = filterStatut === "Tous" || h.statut === filterStatut;
    const matchSearch = !searchQ || h.patient.toLowerCase().includes(searchQ.toLowerCase()) || h.dossier.toLowerCase().includes(searchQ.toLowerCase());
    return matchService && matchStatut && matchSearch;
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => { setSaved(false); setView("list"); }, 2000);
  };

  const statColors: Record<string, string> = {
    "En cours": "badge-approved",
    "Sorti": "badge-info",
    "Urgent": "badge-danger",
  };
  const typeColors: Record<string, string> = {
    "Complète": "bg-teal-100 text-teal-700",
    "Journée": "bg-blue-100 text-blue-700",
    "Urgent": "bg-red-100 text-red-700",
  };

  return (
    <>
      <Topbar title="Hospitalisation" />
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-slate-400 mb-1">
              <span>Gestion Administrative</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-teal-600 font-medium">Hospitalisation</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-800">Hospitalisations</h1>
          </div>
          <div className="flex gap-2">
            {view === "new" && (
              <button onClick={() => setView("list")} className="btn-secondary">← Retour</button>
            )}
            <button onClick={() => setView("new")} className="btn-primary flex items-center gap-2">
              <Plus className="w-4 h-4" /> Nouvelle hospitalisation
            </button>
          </div>
        </div>

        {/* Stats rapides */}
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: "Hospitalisations actives", value: mockHospitalisations.filter(h => h.statut === "En cours").length, color: "text-teal-600", bg: "bg-teal-50" },
            { label: "Cas urgents", value: mockHospitalisations.filter(h => h.statut === "Urgent").length, color: "text-red-600", bg: "bg-red-50" },
            { label: "Sorties aujourd'hui", value: mockHospitalisations.filter(h => h.statut === "Sorti").length, color: "text-blue-600", bg: "bg-blue-50" },
            { label: "Lits disponibles", value: litsDisponibles.length, color: "text-emerald-600", bg: "bg-emerald-50" },
          ].map((s) => (
            <div key={s.label} className={`card ${s.bg} border-0`}>
              <p className={`text-3xl font-black ${s.color}`}>{s.value}</p>
              <p className="text-xs text-slate-600 font-medium mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {saved && (
          <div className="fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 bg-emerald-600 text-white rounded-xl shadow-xl">
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-semibold text-sm">Hospitalisation enregistrée!</span>
          </div>
        )}

        {/* LIST VIEW */}
        {view === "list" && (
          <div className="card space-y-4">
            {/* Filters */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="relative flex-1 min-w-48">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input className="input-field pl-10 py-2" placeholder="Rechercher patient ou dossier..." value={searchQ} onChange={(e) => setSearchQ(e.target.value)} />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-slate-400" />
                <select className="input-field py-2 w-40" value={filterService} onChange={(e) => setFilterService(e.target.value)}>
                  {services.map(s => <option key={s}>{s}</option>)}
                </select>
                <select className="input-field py-2 w-36" value={filterStatut} onChange={(e) => setFilterStatut(e.target.value)}>
                  {["Tous", "En cours", "Sorti", "Urgent"].map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <span className="text-xs text-slate-400 font-medium">{filtered.length} résultat(s)</span>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-100">
                    {/*rétiré de la liste  "Type", */}
                    {["Patient / Dossier", "Service / Lit", "Dates","Motif", "Statut"].map(h => (
                      <th key={h} className="text-left py-3 px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((h) => (
                    <tr key={h.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                            {h.patient.split(" ").map(n => n[0]).join("").slice(0, 2)}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-800 leading-tight">{h.patient}</p>
                            <p className="text-xs text-slate-400">{h.dossier}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <p className="text-sm font-medium text-slate-700">{h.service}</p>
                        <p className="text-xs text-slate-400 flex items-center gap-1"><Bed className="w-3 h-3" />{h.lit}</p>
                      </td>
                      <td className="py-3 px-3">
                        <p className="text-xs text-slate-600 flex items-center gap-1"><Calendar className="w-3 h-3" />Entrée: {h.dateEntree}</p>
                        <p className="text-xs text-slate-400 flex items-center gap-1"><Clock className="w-3 h-3" />Sortie: {h.dateSortie}</p>
                      </td>
                      {/* <td className="py-3 px-3">
                        <span className={`text-xs px-2 py-1 rounded-lg font-semibold ${typeColors[h.type] || "bg-slate-100 text-slate-600"}`}>{h.type}</span>
                      </td> */}
                      <td className="py-3 px-3">
                        <p className="text-xs text-slate-600 max-w-32 truncate" title={h.motif}>{h.motif}</p>
                      </td>
                      <td className="py-3 px-3">
                        <span className={statColors[h.statut] || "badge-info"}>{h.statut}</span>
                      </td>
                      {/* <td className="py-3 px-3">
                        <button className="text-xs text-teal-600 font-medium hover:underline">Voir →</button>
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>

              {filtered.length === 0 && (
                <div className="text-center py-12">
                  <AlertCircle className="w-8 h-8 text-slate-200 mx-auto mb-2" />
                  <p className="text-slate-400 text-sm">Aucune hospitalisation trouvée</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* NEW FORM */}
        {view === "new" && (
          <div className="space-y-4">
            <div className="card space-y-5">
              <h3 className="section-title flex items-center gap-2">
                Enregistrement d&apos;une hospitalisation
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Patient (N° dossier ou nom) <span className="text-red-400">*</span></label>
                  <input className="input-field" placeholder="DPI-AAAA-XXXX ou recherche nom..." value={form.patient} onChange={(e) => setForm(f => ({ ...f, patient: e.target.value }))} />
                </div>
                {/* <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Type d&apos;hospitalisation <span className="text-red-400">*</span></label>
                  <div className="grid grid-cols-3 gap-2">
                    {["Complète", "Journée", "Urgent"].map((t) => (
                      <button key={t} onClick={() => setForm(f => ({ ...f, type: t }))}
                        className={`py-2.5 rounded-xl text-sm font-medium border transition-all ${form.type === t ? "bg-teal-600 text-white border-teal-600" : "bg-white text-slate-600 border-slate-200 hover:border-teal-300"}`}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div> */}

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Service d&apos;admission <span className="text-red-400">*</span></label>
                  <select className="input-field" value={form.service} onChange={(e) => setForm(f => ({ ...f, service: e.target.value }))}>
                    <option value="">Sélectionner un service...</option>
                    {services.filter(s => s !== "Tous").map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Attribution lit (auto) <span className="text-red-400">*</span></label>
                  <select className="input-field" value={form.lit} onChange={(e) => setForm(f => ({ ...f, lit: e.target.value }))}>
                    <option value="">Attribution automatique...</option>
                    {litsDisponibles.filter(l => !form.service || l.service === form.service).map(l => (
                      <option key={l.lit} value={l.lit}>{l.lit} — {l.service} ({l.statut})</option>
                    ))}
                  </select>
                  {form.service && litsDisponibles.filter(l => l.service === form.service).length === 0 && (
                    <p className="text-xs text-amber-600 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />Aucun lit disponible dans ce service</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Date d&apos;entrée <span className="text-red-400">*</span></label>
                  <input type="date" className="input-field" value={form.dateEntree} onChange={(e) => setForm(f => ({ ...f, dateEntree: e.target.value }))} />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Date de sortie prévue</label>
                  <input type="date" className="input-field" value={form.dateSortiePrevue} onChange={(e) => setForm(f => ({ ...f, dateSortiePrevue: e.target.value }))} />
                </div>

                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Motif d&apos;hospitalisation (diagnostic principal) <span className="text-red-400">*</span></label>
                  <input className="input-field" placeholder="Ex: Insuffisance cardiaque décompensée..." value={form.motif} onChange={(e) => setForm(f => ({ ...f, motif: e.target.value }))} />
                </div>

                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Diagnostic associé</label>
                  <input className="input-field" placeholder="Diagnostics secondaires..." value={form.diagnostic} onChange={(e) => setForm(f => ({ ...f, diagnostic: e.target.value }))} />
                </div>
{/* 
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                    <ArrowRightLeft className="inline w-3 h-3 mr-1" />Transfert depuis (si applicable)
                  </label>
                  <input className="input-field" placeholder="Service ou établissement d'origine..." value={form.transfertDe} onChange={(e) => setForm(f => ({ ...f, transfertDe: e.target.value }))} />
                </div> */}
{/* 
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Sortie avec contre-visite</label>
                  <div className="flex gap-2">
                    {["Oui", "Non"].map((v) => (
                      <button key={v} onClick={() => setForm(f => ({ ...f, contrevisite: v }))}
                        className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition-all ${form.contrevisite === v ? "bg-teal-600 text-white border-teal-600" : "bg-white text-slate-600 border-slate-200"}`}>
                        {v}
                      </button>
                    ))}
                  </div>
                </div> */}
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button onClick={() => setView("list")} className="btn-secondary">Annuler</button>
                <button onClick={handleSave} className="btn-primary flex items-center gap-2 px-8">
                  <CheckCircle2 className="w-4 h-4" /> Valider l&apos;hospitalisation
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
