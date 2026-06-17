"use client";
import { Patient } from "@/components/lib/patient";
// Composant : PatientInfoBar
// Barre d'infos patient avec icônes — réutilisable dans toutes les pages [id]
// Usage : <PatientInfoBar patient={patient} />

import { User, Calendar, Droplet, Phone, MapPin, Stethoscope, ShieldAlert, AlertTriangle } from "lucide-react";

interface Props { patient: Patient; compact?: boolean; }

export default function PatientInfoBar({ patient, compact = false }: Props) {
  const items = [
    {
      icon: User,
      value: `${patient.sexe} · ${patient.age} ans`,
      color: "var(--primary)",
    },
    {
      icon: Calendar,
      value: `Né(e) le ${patient.dateNaissance}`,
      color: "#3b82f6",
    },
    {
      icon: Droplet,
      value: patient.groupeSanguin,
      color: "#ef4444",
    },
    {
      icon: Phone,
      value: patient.telephone,
      color: "#10b981",
    },
    {
      icon: MapPin,
      value: patient.adresse,
      color: "#8b5cf6",
    },
//     {
//       icon: Stethoscope,
//       value: patient.medecin,
//       color: "var(--primary)",
//     },
  ];

  return (
    <div className="flex flex-wrap gap-3 mt-2">
      {items.map(({ icon: Icon, value, color }) => (
        <div
          key={value}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl"
          style={{ background: color + "12", border: `1px solid ${color}28` }}
        >
          <Icon size={13} color={color} strokeWidth={2.2} />
          <span
            style={{
              fontSize: 12,
              color: "var(--text-primary)",
              fontFamily: "var(--font-body)",
              fontWeight: 500,
              whiteSpace: "nowrap",
            }}
          >
            {value}
          </span>
        </div>
      ))}

      {/* Allergies — toujours en orange si présentes */}
      {patient.allergies.length > 0 && (
        <div
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl"
          style={{ background: "#fff7ed", border: "1px solid #fed7aa" }}
        >
          <AlertTriangle size={13} color="#f97316" strokeWidth={2.2} />
          <span style={{ fontSize: 12, color: "#c2410c", fontWeight: 700 }}>
            {patient.allergies.join(", ")}
          </span>
        </div>
      )}

      {/* Contre-indications — en rouge si présentes */}
      {/* {!compact && patient.contreIndications.length > 0 && (
        <div
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl"
          style={{ background: "#fee2e2", border: "1px solid #fca5a5" }}
        >
          <ShieldAlert size={13} color="#ef4444" strokeWidth={2.2} />
          <span style={{ fontSize: 12, color: "#991b1b", fontWeight: 700 }}>
            CI : {patient.contreIndications.join(", ")}
          </span>
        </div>
      )} */}
    </div>
  );
}