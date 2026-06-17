/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import Topbar from "@/components/Topbar";
import { FileText, Scissors, FileCheck, Printer, Download, Save, Calendar, User, CheckCircle } from "lucide-react";

const crTypes = [
  { id: "hospitalisation", label: "CR d'Hospitalisation", icon: FileText, desc: "Lettre de liaison sortie LDL" },
  { id: "operatoire", label: "CR Opératoire (CRO)", icon: Scissors, desc: "Compte-rendu chirurgical" },
  { id: "ordonnance", label: "Ordonnance de Sortie", icon: FileCheck, desc: "Traitement post-hospitalisation" },
];

export default function CompteRenduPage() {
  const [activeType, setActiveType] = useState("hospitalisation");
  const [validated, setValidated] = useState(false);

  // CR Hospitalisation fields
  const [crHospi, setCrHospi] = useState({
    motifAdmission: "",
    deroulementSejour: "",
    diagnostics: "",
    traitementsPrescrits: "",
    recommandationsSuivi: "",
    dateEntree: "",
    dateSortie: "",
    modesSortie: "Domicile",
  });

  // CR Opératoire fields
  const [crOp, setCrOp] = useState({
    interventionRealisee: "",
    anesthesie: "Générale",
    technique: "",
    complications: "",
    recommandationsPostOp: "",
    duree: "",
    chirurgien: "",
  });

  // Ordonnance sortie
  const [ordonnanceItems, setOrdonnanceItems] = useState([
    { med: "Paracétamol 1g", posologie: "1 cp 3x/j", duree: "7 jours" },
  ]);

  const modesSortie = ["Domicile", "Transfert", "HAD (Hospitalisation à Domicile)", "Maison de retraite", "Décès", "Fuite"];

  return (
    <div>
      <Topbar title="Compte-rendu" subtitle="Patient : Diallo Ibrahim · Dossier N° 2024-0087" />
      <div className="p-8 space-y-6">

        {/* Type selector */}
        <div className="grid grid-cols-3 gap-4">
          {crTypes.map(t => (
            <button key={t.id} onClick={() => setActiveType(t.id)}
              className="p-5 rounded-2xl text-left transition-all"
              style={{
                background: activeType === t.id ? "var(--primary)" : "white",
                border: `2px solid ${activeType === t.id ? "var(--primary)" : "var(--border)"}`,
                boxShadow: activeType === t.id ? "0 4px 20px rgba(13,148,136,0.25)" : "none",
              }}>
              <t.icon size={22} color={activeType === t.id ? "white" : "var(--primary)"} />
              <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, color: activeType === t.id ? "white" : "var(--text-primary)", marginTop: 8 }}>
                {t.label}
              </p>
              <p style={{ fontSize: 12, color: activeType === t.id ? "rgba(255,255,255,0.7)" : "var(--text-muted)" }}>{t.desc}</p>
            </button>
          ))}
        </div>

        {/* CR Hospitalisation */}
        {activeType === "hospitalisation" && (
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 space-y-6">
              <div className="card-dpi p-6">
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, marginBottom: 16, color: "var(--text-primary)" }}>
                  CR d&apos;Hospitalisation — Lettre de Liaison (LDL)
                </h3>

                {/* Header info */}
                <div className="grid grid-cols-3 gap-4 mb-4 p-4 rounded-xl" style={{ background: "var(--bg-main)" }}>
                  <div>
                    <label className="label-dpi">Date d&apos;entrée</label>
                    <input type="date" className="input-dpi" value={crHospi.dateEntree}
                      onChange={e => setCrHospi(h => ({ ...h, dateEntree: e.target.value }))} />
                  </div>
                  <div>
                    <label className="label-dpi">Date de sortie</label>
                    <input type="date" className="input-dpi" value={crHospi.dateSortie}
                      onChange={e => setCrHospi(h => ({ ...h, dateSortie: e.target.value }))} />
                  </div>
                  <div>
                    <label className="label-dpi">Mode de sortie</label>
                    <select className="input-dpi" value={crHospi.modesSortie}
                      onChange={e => setCrHospi(h => ({ ...h, modesSortie: e.target.value }))}>
                      {modesSortie.map(m => <option key={m}>{m}</option>)}
                    </select>
                  </div>
                </div>

                {[
                  { label: "Motif d'admission", key: "motifAdmission", rows: 3, placeholder: "Décrire le motif d'hospitalisation..." },
                  { label: "Déroulement du séjour", key: "deroulementSejour", rows: 5, placeholder: "Chronologie des événements cliniques, examens réalisés, évolution..." },
                  { label: "Diagnostics retenus", key: "diagnostics", rows: 3, placeholder: "Diagnostic principal et secondaires..." },
                  { label: "Traitements prescrits", key: "traitementsPrescrits", rows: 4, placeholder: "Traitements instaurés ou modifiés durant l'hospitalisation..." },
                  { label: "Recommandations et suivi", key: "recommandationsSuivi", rows: 4, placeholder: "Recommandations au médecin traitant, consultations de suivi, examens à prévoir..." },
                ].map(field => (
                  <div key={field.key} className="mb-4">
                    <label className="label-dpi">{field.label}</label>
                    <textarea className="input-dpi" rows={field.rows} placeholder={field.placeholder}
                      value={(crHospi as any)[field.key]}
                      onChange={e => setCrHospi(h => ({ ...h, [field.key]: e.target.value }))}
                      style={{ resize: "vertical" }} />
                  </div>
                ))}
              </div>
            </div>

            {/* Preview / Info card */}
            <div className="space-y-4">
              <div className="card-dpi p-5">
                <h4 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14, marginBottom: 12, color: "var(--text-primary)" }}>
                  Aperçu du document
                </h4>
                <div className="p-4 rounded-xl" style={{ background: "var(--bg-main)", border: "1px solid var(--border)" }}>
                  <p style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 13, color: "var(--primary)", textAlign: "center", marginBottom: 12 }}>
                    LETTRE DE LIAISON
                  </p>
                  <div className="space-y-2">
                    <p style={{ fontSize: 11, color: "var(--text-secondary)" }}>
                      <strong>Patient :</strong> Diallo Ibrahim
                    </p>
                    <p style={{ fontSize: 11, color: "var(--text-secondary)" }}>
                      <strong>Né le :</strong> 12/04/1978
                    </p>
                    <p style={{ fontSize: 11, color: "var(--text-secondary)" }}>
                      <strong>Médecin :</strong> Dr. Koné Aminata
                    </p>
                    <p style={{ fontSize: 11, color: "var(--text-secondary)" }}>
                      <strong>Service :</strong> Cardiologie
                    </p>
                    {crHospi.dateEntree && (
                      <p style={{ fontSize: 11, color: "var(--text-secondary)" }}>
                        <strong>Entrée :</strong> {new Date(crHospi.dateEntree).toLocaleDateString("fr-FR")}
                      </p>
                    )}
                    {crHospi.dateSortie && (
                      <p style={{ fontSize: 11, color: "var(--text-secondary)" }}>
                        <strong>Sortie :</strong> {new Date(crHospi.dateSortie).toLocaleDateString("fr-FR")}
                      </p>
                    )}
                  </div>
                  <div className="mt-3 pt-3" style={{ borderTop: "1px dashed var(--border)" }}>
                    <p style={{ fontSize: 10, color: "var(--text-muted)", fontStyle: "italic" }}>
                      {crHospi.motifAdmission ? crHospi.motifAdmission.slice(0, 80) + "..." : "Saisir les informations pour l'aperçu..."}
                    </p>
                  </div>
                </div>
              </div>

              <div className="card-dpi p-5">
                <h4 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14, marginBottom: 12, color: "var(--text-primary)" }}>
                  Actions
                </h4>
                <div className="space-y-2">
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all"
                    style={{ background: "var(--primary-light)", color: "var(--primary)", fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 13 }}>
                    <Printer size={16} /> Imprimer le CR
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all"
                    style={{ background: "var(--accent-yellow-light)", color: "#92400e", fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 13 }}>
                    <Download size={16} /> Télécharger PDF
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all"
                    style={{ background: "#dbeafe", color: "#1e40af", fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 13 }}>
                    <User size={16} /> Envoyer au médecin traitant
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CR Opératoire */}
        {activeType === "operatoire" && (
          <div className="card-dpi p-6">
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, marginBottom: 20, color: "var(--text-primary)" }}>
              Compte-rendu Opératoire (CRO)
            </h3>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div>
                <label className="label-dpi">Chirurgien principal</label>
                <input className="input-dpi" placeholder="Dr. ..." value={crOp.chirurgien}
                  onChange={e => setCrOp(o => ({ ...o, chirurgien: e.target.value }))} />
              </div>
              <div>
                <label className="label-dpi">Type d&apos;anesthésie</label>
                <select className="input-dpi" value={crOp.anesthesie}
                  onChange={e => setCrOp(o => ({ ...o, anesthesie: e.target.value }))}>
                  {["Générale", "Locorégionale", "Locale", "Rachianesthésie", "Péridurale"].map(a => <option key={a}>{a}</option>)}
                </select>
              </div>
              <div>
                <label className="label-dpi">Durée de l&apos;intervention</label>
                <input className="input-dpi" placeholder="Ex: 1h30" value={crOp.duree}
                  onChange={e => setCrOp(o => ({ ...o, duree: e.target.value }))} />
              </div>
            </div>

            {[
              { label: "Intervention réalisée", key: "interventionRealisee", rows: 4, placeholder: "Description détaillée de l'intervention chirurgicale..." },
              { label: "Technique opératoire", key: "technique", rows: 5, placeholder: "Technique chirurgicale utilisée, voie d'abord, matériel..." },
              { label: "Complications peropératoires", key: "complications", rows: 3, placeholder: "Complications survenues durant l'intervention ou aucune complication..." },
              { label: "Recommandations post-opératoires", key: "recommandationsPostOp", rows: 4, placeholder: "Soins post-op, restrictions, surveillance, traitement..." },
            ].map(field => (
              <div key={field.key} className="mb-4">
                <label className="label-dpi">{field.label}</label>
                <textarea className="input-dpi" rows={field.rows} placeholder={field.placeholder}
                  value={(crOp as any)[field.key]}
                  onChange={e => setCrOp(o => ({ ...o, [field.key]: e.target.value }))}
                  style={{ resize: "vertical" }} />
              </div>
            ))}
          </div>
        )}

        {/* Ordonnance sortie */}
        {activeType === "ordonnance" && (
          <div className="card-dpi p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, color: "var(--text-primary)" }}>
                Ordonnance de Sortie
              </h3>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl" style={{ background: "var(--primary-light)" }}>
                <Calendar size={14} color="var(--primary)" />
                <span style={{ fontSize: 12, fontWeight: 600, color: "var(--primary)" }}>
                  {new Date().toLocaleDateString("fr-FR")}
                </span>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              {ordonnanceItems.map((item, idx) => (
                <div key={idx} className="grid grid-cols-3 gap-3 p-4 rounded-xl"
                  style={{ background: "var(--bg-main)", border: "1px solid var(--border)" }}>
                  <div>
                    <label className="label-dpi">Médicament</label>
                    <input className="input-dpi" value={item.med}
                      onChange={e => setOrdonnanceItems(prev => prev.map((o, i) => i === idx ? { ...o, med: e.target.value } : o))} />
                  </div>
                  <div>
                    <label className="label-dpi">Posologie</label>
                    <input className="input-dpi" value={item.posologie}
                      onChange={e => setOrdonnanceItems(prev => prev.map((o, i) => i === idx ? { ...o, posologie: e.target.value } : o))} />
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <label className="label-dpi">Durée</label>
                      <input className="input-dpi" value={item.duree}
                        onChange={e => setOrdonnanceItems(prev => prev.map((o, i) => i === idx ? { ...o, duree: e.target.value } : o))} />
                    </div>
                    <button onClick={() => setOrdonnanceItems(prev => prev.filter((_, i) => i !== idx))}
                      className="mt-5 w-9 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: "#fee2e2" }}>
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setOrdonnanceItems(prev => [...prev, { med: "", posologie: "", duree: "" }])}
              className="w-full py-3 rounded-xl flex items-center justify-center gap-2 mb-6"
              style={{ border: "1.5px dashed var(--primary)", color: "var(--primary)", fontWeight: 600, fontSize: 14 }}>
              + Ajouter un médicament
            </button>

            <div>
              <label className="label-dpi">Consignes de sortie</label>
              <textarea className="input-dpi" rows={4} placeholder="Régime alimentaire, activité physique, surveillances à domicile, urgences à consulter..." />
            </div>
          </div>
        )}

        {/* Save bar */}
        <div className="flex items-center justify-between p-5 rounded-2xl"
          style={{ background: "white", border: "1px solid var(--border)" }}>
          <div className="flex items-center gap-2">
            <CheckCircle size={16} color={validated ? "#10b981" : "var(--text-muted)"} />
            <span style={{ fontSize: 13, color: validated ? "#065f46" : "var(--text-secondary)", fontWeight: validated ? 600 : 400 }}>
              {validated ? "Compte-rendu validé et signé électroniquement" : "Prêt à valider"}
            </span>
          </div>
          <div className="flex gap-3">
            <button className="btn-accent flex items-center gap-2">
              <Printer size={16} /> Imprimer
            </button>
            <button className="btn-primary flex items-center gap-2" onClick={() => setValidated(true)}>
              <Save size={16} /> {validated ? "✓ Validé" : "Valider le CR"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
