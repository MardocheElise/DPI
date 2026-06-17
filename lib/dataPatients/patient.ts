export type Genre = "masculin" | "feminin";

export interface Patient {
  id: number;
  code: string;
  nom: string;
  genre: Genre;
  dateNaissance: string; // ISO (yyyy-mm-dd)
  contact: string;
  enregistreLe: string; // ISO datetime

  // Identité complémentaire
  nationalite: string;
  villeCommune: string;
  typeCarte: string; // CNI, Passeport, Attestation...
  numeroCarte: string;
  email?: string;
  profession?: string;

  // Contact d'urgence
  urgenceNom?: string;
  urgenceLien?: string;
  urgenceTel?: string;

  // Assurance
  assuranceNom?: string;
  assuranceNumero?: string;
}

export const PATIENTS: Patient[] = [
  {
    id: 1,
    code: "D26A6205BBB",
    nom: "WALSH AUTO Zelda",
    genre: "masculin",
    dateNaissance: "2009-08-19",
    contact: "(+225) 01 2037 3938",
    enregistreLe: "2026-06-15T04:17:22",
    nationalite: "Ivoirienne",
    villeCommune: "Abidjan / Cocody",
    typeCarte: "CNI",
    numeroCarte: "CI-002145789",
    email: "z.walsh@example.ci",
    profession: "Élève",
    urgenceNom: "WALSH Patricia",
    urgenceLien: "Mère",
    urgenceTel: "(+225) 07 0102 0304",
    assuranceNom: "CNAM",
    assuranceNumero: "CNAM-7785-2210",
  },
  {
    id: 2,
    code: "D26K6235BBB",
    nom: "STOKES-SCHAEFER AUTO Camille",
    genre: "feminin",
    dateNaissance: "1980-03-06",
    contact: "(+225) 01 2037 3938",
    enregistreLe: "2026-06-15T04:17:06",
    nationalite: "Française",
    villeCommune: "Abidjan / Marcory",
    typeCarte: "Passeport",
    numeroCarte: "FR-19X44552",
    email: "c.schaefer@example.fr",
    profession: "Architecte",
    urgenceNom: "STOKES Jean",
    urgenceLien: "Époux",
    urgenceTel: "(+225) 05 6677 8899",
    assuranceNom: "Assurance privée",
    assuranceNumero: "PRV-558-9032",
  },
  {
    id: 3,
    code: "D26V6942BBB",
    nom: "MCGLYNN AUTO Adolph",
    genre: "masculin",
    dateNaissance: "1980-03-06",
    contact: "(+225) 01 2037 3938",
    enregistreLe: "2026-06-15T04:16:56",
    nationalite: "Ivoirienne",
    villeCommune: "Abidjan / Yopougon",
    typeCarte: "CNI",
    numeroCarte: "CI-008842310",
    email: "a.mcglynn@example.ci",
    profession: "Commerçant",
    urgenceNom: "MCGLYNN Sarah",
    urgenceLien: "Sœur",
    urgenceTel: "(+225) 01 4455 6677",
    assuranceNom: "MUGEF-CI",
    assuranceNumero: "MUG-3321-0098",
  },
  {
    id: 4,
    code: "D26E7943BBB",
    nom: "CISSE Aw1",
    genre: "masculin",
    dateNaissance: "1995-11-02",
    contact: "(+225) 07 1188 4521",
    enregistreLe: "2026-06-14T16:42:10",
    nationalite: "Ivoirienne",
    villeCommune: "Abidjan / Treichville",
    typeCarte: "CNI",
    numeroCarte: "CI-005519027",
    email: "cisse.aw@example.ci",
    profession: "Ingénieur logiciel",
    urgenceNom: "CISSE Mariam",
    urgenceLien: "Épouse",
    urgenceTel: "(+225) 07 2200 3311",
    assuranceNom: "CNAM",
    assuranceNumero: "CNAM-1192-7740",
  },
  {
    id: 5,
    code: "D26X0199BBB",
    nom: "SEKA Apo Ella",
    genre: "feminin",
    dateNaissance: "1992-01-23",
    contact: "(+225) 05 6620 7788",
    enregistreLe: "2026-06-14T11:08:33",
    nationalite: "Ivoirienne",
    villeCommune: "Abidjan / Plateau",
    typeCarte: "Attestation",
    numeroCarte: "ATT-2026-4471",
    email: "ella.seka@example.ci",
    profession: "Enseignante",
    urgenceNom: "SEKA Paul",
    urgenceLien: "Père",
    urgenceTel: "(+225) 05 1234 5678",
    assuranceNom: "Aucune",
    assuranceNumero: "—",
  },
  {
    id: 6,
    code: "D26U8295BBB",
    nom: "YAPI Elie",
    genre: "masculin",
    dateNaissance: "2001-07-30",
    contact: "(+225) 01 4455 9012",
    enregistreLe: "2026-06-13T09:21:47",
    nationalite: "Ivoirienne",
    villeCommune: "Abidjan / Abobo",
    typeCarte: "CNI",
    numeroCarte: "CI-006677001",
    email: "elie.yapi@example.ci",
    profession: "Étudiant",
    urgenceNom: "YAPI Grace",
    urgenceLien: "Mère",
    urgenceTel: "(+225) 01 9988 7766",
    assuranceNom: "CNAM",
    assuranceNumero: "CNAM-4410-1187",
  },
  {
    id: 7,
    code: "D26B1248BBB",
    nom: "Bosco AUTO Valentina",
    genre: "feminin",
    dateNaissance: "1988-09-14",
    contact: "(+225) 07 3390 1100",
    enregistreLe: "2026-06-13T08:05:12",
    nationalite: "Italienne",
    villeCommune: "Abidjan / Riviera",
    typeCarte: "Passeport",
    numeroCarte: "IT-77YA1029",
    email: "v.bosco@example.it",
    profession: "Médecin",
    urgenceNom: "BOSCO Marco",
    urgenceLien: "Frère",
    urgenceTel: "(+225) 07 5566 4433",
    assuranceNom: "Assurance privée",
    assuranceNumero: "PRV-901-3344",
  },
  {
    id: 8,
    code: "D26M3071BBB",
    nom: "KONE AUTO Ibrahim",
    genre: "masculin",
    dateNaissance: "1975-12-05",
    contact: "(+225) 05 1209 6634",
    enregistreLe: "2026-06-12T14:53:29",
    nationalite: "Ivoirienne",
    villeCommune: "Abidjan / Adjamé",
    typeCarte: "CNI",
    numeroCarte: "CI-001120998",
    email: "i.kone@example.ci",
    profession: "Chauffeur",
    urgenceNom: "KONE Aminata",
    urgenceLien: "Épouse",
    urgenceTel: "(+225) 05 3344 5566",
    assuranceNom: "MUGEF-CI",
    assuranceNumero: "MUG-7788-2025",
  },
];
