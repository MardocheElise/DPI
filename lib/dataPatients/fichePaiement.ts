export type StatutFiche = "payee" | "impayee" | "partiel";
export interface FichePaiement {
  id: number;
  code: string;
  patient: string;
  patientCode: string;
  service: string;
  coutTotal: number;
  coutAssure: number;
  netAPayer: number;
  statut: StatutFiche;
  creeLe: string;
  caissier: string;
  estAnnule: boolean; // ajouté
}
// export const FICHES_PAIEMENT: FichePaiement[] = [
//   {
//     id: 1,
//     code: "FICHE-2026-WO53076-771157",
//     patient: "CISSE Aw1",
//     patientCode: "D26E7943BBB",
//     service: "MEDECINE GENERALE",
//     coutTotal: 1055,
//     coutAssure: 0,
//     netAPayer: 1055,
//     statut: "impayee",
//     creeLe: "2026-06-14T16:50:00",
//   },
//   {
//     id: 2,
//     code: "FICHE-2026-YT24016-148906",
//     patient: "SEKA Apo Ella",
//     patientCode: "D26X0199BBB",
//     service: "MATERNITE",
//     coutTotal: 0,
//     coutAssure: 0,
//     netAPayer: 0,
//     statut: "payee",
//     creeLe: "2026-06-14T11:15:00",
//   },
//   {
//     id: 3,
//     code: "FICHE-2026-QS25046-869962",
//     patient: "YAPI Elie",
//     patientCode: "D26U8295BBB",
//     service: "MEDECINE GENERALE",
//     coutTotal: 600,
//     coutAssure: 0,
//     netAPayer: 600,
//     statut: "impayee",
//     creeLe: "2026-06-13T09:30:00",
//   },
//   {
//     id: 4,
//     code: "FICHE-2026-DJ17156-852479",
//     patient: "Bosco AUTO Valentina",
//     patientCode: "D26B1248BBB",
//     service: "MEDECINE GENERALE",
//     coutTotal: 100,
//     coutAssure: 0,
//     netAPayer: 100,
//     statut: "impayee",
//     creeLe: "2026-06-13T08:20:00",
//   },
//   {
//     id: 5,
//     code: "FICHE-2026-LP98233-330471",
//     patient: "KONE AUTO Ibrahim",
//     patientCode: "D26M3071BBB",
//     service: "CARDIOLOGIE",
//     coutTotal: 25000,
//     coutAssure: 18000,
//     netAPayer: 7000,
//     statut: "partiel",
//     creeLe: "2026-06-12T15:05:00",
//   },
//   {
//     id: 6,
//     code: "FICHE-2026-RT44120-661892",
//     patient: "WALSH AUTO Zelda",
//     patientCode: "D26A6205BBB",
//     service: "PEDIATRIE",
//     coutTotal: 3500,
//     coutAssure: 2000,
//     netAPayer: 1500,
//     statut: "payee",
//     creeLe: "2026-06-12T10:42:00",
//   },
// ];
