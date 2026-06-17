// lib/history.ts
// Historiques statiques simulés — Diagnostique, Prescription Médicaments, Prescription Examens

/* ─────────────────── DIAGNOSTIQUE ─────────────────── */
export const diagnostiqueHistory: Record<string, {
  id: string;
  date: string;
  medecin: string;
  diagPrincipal: { code: string; label: string };
  diagAssocies: { code: string; label: string }[];
  diagDiff: string[];
  gravite: "Légère" | "Modérée" | "Sévère" | "Critique";
  triage: "Vert" | "Orange" | "Rouge";
  statut: "Validé" | "Brouillon" | "En révision";
  notes: string;
}[]> = {
  "DPI-2024-0891": [
    {
      id: "d1", date: "2025-06-01", medecin: "Dr. Konan Éric",
      diagPrincipal: { code: "I50", label: "Insuffisance cardiaque" },
      diagAssocies: [
        { code: "E11", label: "Diabète sucré de type 2" },
        { code: "I10", label: "Hypertension artérielle essentielle" },
      ],
      diagDiff: ["Péricardite exsudative", "Embolie pulmonaire"],
      gravite: "Critique", triage: "Rouge", statut: "Validé",
      notes: "FE VG effondrée à 32%. OAP radiologique. BNP 1240. Hospitalisation urgente en cardiologie.",
    },
    {
      id: "d2", date: "2025-05-15", medecin: "Dr. Konan Éric",
      diagPrincipal: { code: "I10", label: "Hypertension artérielle essentielle" },
      diagAssocies: [{ code: "E11", label: "Diabète sucré de type 2" }],
      diagDiff: ["HTA secondaire rénale"],
      gravite: "Modérée", triage: "Orange", statut: "Validé",
      notes: "TA 160/95 sous bithérapie. Adaptation posologique. Bilan échocardiographique demandé.",
    },
  ],
  "DPI-2024-0742": [
    {
      id: "d1", date: "2025-06-02", medecin: "Dr. Bamba Sophie",
      diagPrincipal: { code: "K37", label: "Appendicite aiguë" },
      diagAssocies: [],
      diagDiff: ["Adénolymphite mésentérique", "Torsion ovarienne"],
      gravite: "Sévère", triage: "Rouge", statut: "Validé",
      notes: "Défense FID franche. GB 18.4, CRP 142. Appendice 12mm au scanner. Indication chirurgicale posée.",
    },
  ],
  "DPI-2024-0633": [
    {
      id: "d1", date: "2025-05-28", medecin: "Dr. Coulibaly René",
      diagPrincipal: { code: "J18", label: "Pneumopathie, sans précision" },
      diagAssocies: [],
      diagDiff: ["Tuberculose pulmonaire", "Bronchiolite"],
      gravite: "Modérée", triage: "Orange", statut: "Validé",
      notes: "Fièvre 39.2°C. Opacité lobaire inférieure droite. GB 22.1. Antibiothérapie amoxicilline initiée.",
    },
    {
      id: "d2", date: "2025-06-01", medecin: "Dr. Coulibaly René",
      diagPrincipal: { code: "J18", label: "Pneumopathie en voie de guérison" },
      diagAssocies: [],
      diagDiff: [],
      gravite: "Légère", triage: "Vert", statut: "Validé",
      notes: "Apyrexie. GB 22.1 en baisse. Poursuite antibiothérapie 3 jours. Sortie prévue.",
    },
  ],
  "DPI-2024-0743": [
    {
      id: "d1", date: "2025-06-03", medecin: "Dr. Diallo Fatou",
      diagPrincipal: { code: "S82", label: "Fracture de la jambe — Polytraumatisme AVP" },
      diagAssocies: [
        { code: "S27", label: "Hémothorax traumatique" },
        { code: "S22", label: "Fracture costale multiple" },
      ],
      diagDiff: ["Lésion splénique", "Hémorragie intracrânienne"],
      gravite: "Critique", triage: "Rouge", statut: "En révision",
      notes: "Hb 6.2 — anémie hémorragique aiguë. Scanner corps entier réalisé. Chirurgie orthopédique urgente.",
    },
  ],
  "DPI-2024-0544": [
    {
      id: "d1", date: "2025-06-01", medecin: "Dr. Konan Éric",
      diagPrincipal: { code: "N18", label: "Insuffisance rénale chronique stade 4" },
      diagAssocies: [
        { code: "E11", label: "Diabète sucré de type 2" },
        { code: "I25", label: "Cardiopathie ischémique chronique" },
      ],
      diagDiff: ["Néphropathie diabétique", "Néphropathie hypertensive"],
      gravite: "Sévère", triage: "Orange", statut: "Validé",
      notes: "DFG 22 mL/min/1.73m². Discussion préparation dialyse. Kaliémie 5.6 à corriger.",
    },
    {
      id: "d2", date: "2025-05-15", medecin: "Dr. Konan Éric",
      diagPrincipal: { code: "N18", label: "Insuffisance rénale chronique stade 3-4" },
      diagAssocies: [{ code: "E11", label: "Diabète sucré de type 2" }],
      diagDiff: [],
      gravite: "Sévère", triage: "Orange", statut: "Validé",
      notes: "DFG stable à 28. Surveillance rapprochée. Régime hypoprotidique conseillé.",
    },
    {
      id: "d3", date: "2025-02-20", medecin: "Dr. Konan Éric",
      diagPrincipal: { code: "E11", label: "Diabète sucré déséquilibré" },
      diagAssocies: [{ code: "N18", label: "Insuffisance rénale chronique" }],
      diagDiff: ["Diabète type LADA"],
      gravite: "Modérée", triage: "Orange", statut: "Validé",
      notes: "HbA1c 8.2%. Introduction insuline Glargine. Suivi rapproché glycémique.",
    },
  ],
  "DPI-2024-0412": [
    {
      id: "d1", date: "2025-05-20", medecin: "Dr. Bamba Sophie",
      diagPrincipal: { code: "D50", label: "Anémie ferriprive" },
      diagAssocies: [],
      diagDiff: ["Anémie inflammatoire", "Drépanocytose", "Thalassémie"],
      gravite: "Modérée", triage: "Orange", statut: "Validé",
      notes: "Hb 7.8, Ferritine 3, VGM 64. Supplémentation en fer instaurée. Électrophorèse Hb demandée.",
    },
    {
      id: "d2", date: "2025-06-01", medecin: "Dr. Bamba Sophie",
      diagPrincipal: { code: "D50", label: "Anémie ferriprive en correction" },
      diagAssocies: [],
      diagDiff: [],
      gravite: "Légère", triage: "Vert", statut: "Validé",
      notes: "Hb remontée à 9.4. Ferritine 6. Poursuite traitement 2 mois. Contrôle prévu.",
    },
  ],
};

/* ─────────────────── PRESCRIPTION MÉDICAMENTS ─────────────────── */
export interface PrescriptionMed {
  id: string;
  date: string;
  medecin: string;
  statut: "Validée" | "En cours" | "Terminée" | "Suspendue";
  medicaments: {
    dci: string;
    commercial: string;
    forme: string;
    posologie: string;
    voie: string;
    frequence: string;
    duree: string;
    instructions?: string;
  }[];
  notes?: string;
}

export const prescriptionMedsHistory: Record<string, PrescriptionMed[]> = {
  "DPI-2024-0891": [
    {
      id: "pm1", date: "2025-06-01", medecin: "Dr. Konan Éric", statut: "En cours",
      medicaments: [
        { dci: "Furosémide", commercial: "Lasilix", forme: "40mg cp", posologie: "40mg", voie: "Orale", frequence: "2x/j", duree: "7 jours", instructions: "Surveiller kaliémie" },
        { dci: "Spironolactone", commercial: "Aldactone", forme: "25mg cp", posologie: "25mg", voie: "Orale", frequence: "1x/j", duree: "Continu" },
        { dci: "Ramipril", commercial: "Triatec", forme: "5mg cp", posologie: "5mg", voie: "Orale", frequence: "1x/j matin", duree: "Continu" },
      ],
      notes: "Traitement IC décompensée. Surveillance poids quotidien.",
    },
    {
      id: "pm2", date: "2025-05-15", medecin: "Dr. Konan Éric", statut: "Terminée",
      medicaments: [
        { dci: "Metformine", commercial: "Glucophage", forme: "500mg cp", posologie: "500mg", voie: "Orale", frequence: "2x/j", duree: "Continu" },
        { dci: "Amlodipine", commercial: "Amlor", forme: "5mg cp", posologie: "5mg", voie: "Orale", frequence: "1x/j matin", duree: "Continu" },
      ],
    },
  ],
  "DPI-2024-0742": [
    {
      id: "pm1", date: "2025-06-02", medecin: "Dr. Bamba Sophie", statut: "En cours",
      medicaments: [
        { dci: "Morphine", commercial: "Morphine Aguettant", forme: "10mg/5mL", posologie: "0.1mg/kg", voie: "Injectable IV", frequence: "Si douleur", duree: "Post-op", instructions: "Titration analgésique" },
        { dci: "Métronidazole", commercial: "Flagyl", forme: "500mg perf", posologie: "500mg", voie: "Injectable IV", frequence: "3x/j", duree: "5 jours" },
        { dci: "Ceftriaxone", commercial: "Rocéphine", forme: "1g perf", posologie: "1g", voie: "Injectable IV", frequence: "1x/j", duree: "5 jours" },
      ],
      notes: "Antibioprophylaxie + analgésie post-appendicectomie.",
    },
  ],
  "DPI-2024-0633": [
    {
      id: "pm1", date: "2025-05-28", medecin: "Dr. Coulibaly René", statut: "En cours",
      medicaments: [
        { dci: "Amoxicilline", commercial: "Clamoxyl", forme: "250mg/5mL sus", posologie: "250mg", voie: "Orale", frequence: "3x/j", duree: "7 jours", instructions: "À distance des repas" },
        { dci: "Paracétamol", commercial: "Doliprane", forme: "250mg supp", posologie: "250mg", voie: "Rectale", frequence: "4x/j", duree: "Si fièvre" },
      ],
      notes: "Pneumonie bactérienne pédiatrique. Réévaluation à 48h.",
    },
  ],
  "DPI-2024-0743": [
    {
      id: "pm1", date: "2025-06-03", medecin: "Dr. Diallo Fatou", statut: "En cours",
      medicaments: [
        { dci: "Morphine", commercial: "Morphine Aguettant", forme: "10mg/mL", posologie: "10mg/h", voie: "Injectable IV", frequence: "Continue", duree: "En cours", instructions: "IVSE — surveillance scope" },
        { dci: "Kétamine", commercial: "Kétalar", forme: "250mg/10mL", posologie: "0.2mg/kg", voie: "Injectable IV", frequence: "Si EVA > 7", duree: "Si besoin" },
        { dci: "Tranexamique (acide)", commercial: "Exacyl", forme: "1g perf", posologie: "1g", voie: "Injectable IV", frequence: "3x/j", duree: "48h", instructions: "Antifibrinolytique — hémorragie" },
      ],
      notes: "Polytraumatisme — analgésie lourde. Contre-indication AINS.",
    },
  ],
  "DPI-2024-0544": [
    {
      id: "pm1", date: "2025-06-01", medecin: "Dr. Konan Éric", statut: "En cours",
      medicaments: [
        { dci: "Insuline Glargine", commercial: "Lantus", forme: "100UI/mL", posologie: "20UI", voie: "Sous-cutanée", frequence: "1x/j soir", duree: "Continu" },
        { dci: "Furosémide", commercial: "Lasilix", forme: "40mg cp", posologie: "40mg", voie: "Orale", frequence: "1x/j matin", duree: "Continu", instructions: "Adapter selon diurèse" },
        { dci: "Atorvastatine", commercial: "Tahor", forme: "20mg cp", posologie: "20mg", voie: "Orale", frequence: "1x/j soir", duree: "Continu" },
      ],
    },
    {
      id: "pm2", date: "2025-02-20", medecin: "Dr. Konan Éric", statut: "Terminée",
      medicaments: [
        { dci: "Metformine", commercial: "Glucophage", forme: "500mg cp", posologie: "500mg", voie: "Orale", frequence: "2x/j", duree: "Arrêt IRC", instructions: "ARRÊTÉE — contre-indication IRC stade 4" },
      ],
      notes: "Arrêt Metformine suite aggravation IRC. Relais Insuline.",
    },
  ],
  "DPI-2024-0412": [
    {
      id: "pm1", date: "2025-05-20", medecin: "Dr. Bamba Sophie", statut: "En cours",
      medicaments: [
        { dci: "Sulfate de fer", commercial: "Tardyferon", forme: "80mg cp", posologie: "80mg", voie: "Orale", frequence: "2x/j", duree: "3 mois", instructions: "Prendre à distance du thé/café" },
        { dci: "Acide folique", commercial: "Speciafoldine", forme: "5mg cp", posologie: "5mg", voie: "Orale", frequence: "1x/j", duree: "3 mois" },
      ],
      notes: "Supplémentation anémie ferriprive. Contrôle Hb à 1 mois.",
    },
  ],
};

/* ─────────────────── PRESCRIPTION EXAMENS ─────────────────── */
export interface PrescriptionExamen {
  id: string;
  date: string;
  medecin: string;
  statut: "Réalisée" | "En attente" | "Annulée" | "Urgente";
  motif: string;
  examens: {
    label: string;
    type: "biologie" | "imagerie" | "autre";
    detail?: string;
    urgence: boolean;
    resultat?: "Normal" | "Anormal" | "Critique" | "En attente";
  }[];
}

export const prescriptionExamenHistory: Record<string, PrescriptionExamen[]> = {
  "DPI-2024-0891": [
    {
      id: "pe1", date: "2025-06-01", medecin: "Dr. Konan Éric", statut: "Réalisée",
      motif: "Bilan insuffisance cardiaque aiguë",
      examens: [
        { label: "BNP", type: "biologie", urgence: true, resultat: "Critique" },
        { label: "Créatinine + ionogramme", type: "biologie", urgence: true, resultat: "Anormal" },
        { label: "Échocardiographie", type: "imagerie", detail: "Cardiaque (ETT)", urgence: true, resultat: "Anormal" },
        { label: "Radio thorax face", type: "imagerie", urgence: true, resultat: "Anormal" },
        { label: "ECG 12 dérivations", type: "autre", urgence: true, resultat: "Anormal" },
      ],
    },
    {
      id: "pe2", date: "2025-05-15", medecin: "Dr. Konan Éric", statut: "Réalisée",
      motif: "Suivi HTA et diabète",
      examens: [
        { label: "Glycémie à jeun", type: "biologie", urgence: false, resultat: "Anormal" },
        { label: "HbA1c", type: "biologie", urgence: false, resultat: "Anormal" },
        { label: "NFS", type: "biologie", urgence: false, resultat: "Normal" },
      ],
    },
  ],
  "DPI-2024-0742": [
    {
      id: "pe1", date: "2025-06-02", medecin: "Dr. Bamba Sophie", statut: "Réalisée",
      motif: "Suspicion appendicite aiguë",
      examens: [
        { label: "NFS + CRP", type: "biologie", urgence: true, resultat: "Critique" },
        { label: "Lipase", type: "biologie", urgence: true, resultat: "Normal" },
        { label: "Échographie", type: "imagerie", detail: "Abdominale", urgence: true, resultat: "Anormal" },
        { label: "Scanner (TDM)", type: "imagerie", detail: "Abdomino-pelvien", urgence: true, resultat: "Anormal" },
        { label: "ECG préopératoire", type: "autre", urgence: true, resultat: "Normal" },
      ],
    },
  ],
  "DPI-2024-0633": [
    {
      id: "pe1", date: "2025-05-28", medecin: "Dr. Coulibaly René", statut: "Réalisée",
      motif: "Fièvre + toux — suspicion pneumonie",
      examens: [
        { label: "NFS", type: "biologie", urgence: true, resultat: "Critique" },
        { label: "CRP", type: "biologie", urgence: true, resultat: "Anormal" },
        { label: "Radio thorax face", type: "imagerie", urgence: true, resultat: "Anormal" },
      ],
    },
    {
      id: "pe2", date: "2025-06-01", medecin: "Dr. Coulibaly René", statut: "Réalisée",
      motif: "Contrôle post-traitement",
      examens: [
        { label: "NFS", type: "biologie", urgence: false, resultat: "Anormal" },
        { label: "CRP", type: "biologie", urgence: false, resultat: "Anormal" },
      ],
    },
  ],
  "DPI-2024-0743": [
    {
      id: "pe1", date: "2025-06-03", medecin: "Dr. Diallo Fatou", statut: "Urgente",
      motif: "Polytraumatisme AVP — bilan complet",
      examens: [
        { label: "NFS complète + hémostase", type: "biologie", urgence: true, resultat: "Critique" },
        { label: "Lactatémie", type: "biologie", urgence: true, resultat: "Critique" },
        { label: "Troponine I hs", type: "biologie", urgence: true, resultat: "Anormal" },
        { label: "Groupe sanguin + RAI", type: "biologie", urgence: true, resultat: "Normal" },
        { label: "Scanner (TDM)", type: "imagerie", detail: "Corps entier trauma", urgence: true, resultat: "Anormal" },
        { label: "Radio tibia-péroné F+P", type: "imagerie", urgence: true, resultat: "Anormal" },
        { label: "ECG monitoring", type: "autre", urgence: true, resultat: "Anormal" },
      ],
    },
  ],
  "DPI-2024-0544": [
    {
      id: "pe1", date: "2025-06-01", medecin: "Dr. Konan Éric", statut: "Réalisée",
      motif: "Suivi IRC + contrôle trimestriel",
      examens: [
        { label: "Créatinine + DFG", type: "biologie", urgence: false, resultat: "Critique" },
        { label: "Kaliémie", type: "biologie", urgence: false, resultat: "Anormal" },
        { label: "HbA1c", type: "biologie", urgence: false, resultat: "Anormal" },
        { label: "Urée sanguine", type: "biologie", urgence: false, resultat: "Critique" },
        { label: "ECG de repos", type: "autre", urgence: false, resultat: "Anormal" },
      ],
    },
    {
      id: "pe2", date: "2025-05-15", medecin: "Dr. Konan Éric", statut: "Réalisée",
      motif: "Bilan morphologique rénal",
      examens: [
        { label: "Échographie", type: "imagerie", detail: "Rénale bilatérale", urgence: false, resultat: "Anormal" },
        { label: "EFR — Spirométrie simple", type: "autre", urgence: false, resultat: "Anormal" },
      ],
    },
  ],
  "DPI-2024-0412": [
    {
      id: "pe1", date: "2025-05-20", medecin: "Dr. Bamba Sophie", statut: "Réalisée",
      motif: "Bilan anémie ferriprive",
      examens: [
        { label: "NFS complète", type: "biologie", urgence: false, resultat: "Anormal" },
        { label: "Ferritine + bilan martial", type: "biologie", urgence: false, resultat: "Anormal" },
        { label: "Myélogramme", type: "autre", urgence: false, resultat: "Normal" },
      ],
    },
    {
      id: "pe2", date: "2025-06-01", medecin: "Dr. Bamba Sophie", statut: "En attente",
      motif: "Recherche hémoglobinopathie",
      examens: [
        { label: "Électrophorèse de l'hémoglobine", type: "biologie", urgence: false, resultat: "En attente" },
      ],
    },
  ],
};