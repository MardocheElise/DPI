// // Route: /accueil/patients + /profil/patient/[id] (accès API patients)
// import type { Patient } from "@/lib/dataPatients/patient";
// import { apiFetch } from "./clients";

// // Payload de création (aligné sur le DTO NestJS)
// export interface CreatePatientPayload {
//   nom: string;
//   prenom?: string;
//   genre: "masculin" | "feminin";
//   dateNaissance: string; // yyyy-mm-dd
//   contact: string;
//   email?: string;
//   adresse?: string;
//   villeCommune?: string;
//   nationalite?: string;
//   typeCarte?: string;
//   numeroCarte?: string;
//   profession?: string;
//   situationMatrimoniale?: string;
//   groupeSanguin?: string;
//   medecinTraitant?: string;
//   urgenceNom?: string;
//   urgenceLien?: string;
//   urgenceTel?: string;
//   assuranceNom?: string;
//   assuranceNumero?: string;
// }

// export const patientsApi = {
//   getAll: () => apiFetch<Patient[]>("/patients"),
//   getById: (id: number | string) => apiFetch<Patient>(`/patients/${id}`),
//   create: (data: CreatePatientPayload) =>
//     apiFetch<Patient>("/patients", {
//       method: "POST",
//       body: JSON.stringify(data),
//     }),
//   update: (id: number | string, data: Partial<CreatePatientPayload>) =>
//     apiFetch<Patient>(`/patients/${id}`, {
//       method: "PATCH",
//       body: JSON.stringify(data),
//     }),
//   remove: (id: number | string) =>
//     apiFetch<{ success: boolean }>(`/patients/${id}`, { method: "DELETE" }),
// };

// Route: /accueil/patients + /profil/patient/[id] (accès API patients)
import type { Patient } from "@/lib/dataPatients/patient";
import { apiFetch } from "./clients";

// Payload de création (aligné sur le DTO NestJS)
export interface CreatePatientPayload {
  nom: string;
  prenom?: string;
  genre: "masculin" | "feminin";
  dateNaissance: string; // yyyy-mm-dd
  contact: string;
  email?: string;
  adresse?: string;
  villeCommune?: string;
  nationalite?: string;
  typeCarte?: string;
  numeroCarte?: string;
  profession?: string;
  situationMatrimoniale?: string;
  groupeSanguin?: string;
  medecinTraitant?: string;
  urgenceNom?: string;
  urgenceLien?: string;
  urgenceTel?: string;
  assuranceNom?: string;
  assuranceNumero?: string;
}

export const patientsApi = {
  getAll: () => apiFetch<Patient[]>("/patients"),
  getById: (id: number | string) => apiFetch<Patient>(`/patients/${id}`),
  getByCode: (code: string) =>
    apiFetch<Patient>(`/patients/code/${encodeURIComponent(code)}`),
  create: (data: CreatePatientPayload) =>
    apiFetch<Patient>("/patients", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: number | string, data: Partial<CreatePatientPayload>) =>
    apiFetch<Patient>(`/patients/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  remove: (id: number | string) =>
    apiFetch<{ success: boolean }>(`/patients/${id}`, { method: "DELETE" }),
};
