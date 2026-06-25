// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import {
//   UserPlus,
//   IdCard,
//   Phone,
//   Briefcase,
//   ShieldAlert,
//   ShieldCheck,
//   Camera,
//   Save,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { ASSURANCES } from "@/lib/dataPatients/paiementOption";


// // Modèle du formulaire (statique pour l'instant ; branché à la BD plus tard)
// interface FormPatient {
//   nom: string;
//   prenom: string;
//   sexe: "masculin" | "feminin";
//   dateNaissance: string;
//   nationalite: string;
//   situationMatrimoniale: string;
//   groupeSanguin: string;
//   telephone: string;
//   email: string;
//   adresse: string;
//   villeCommune: string;
//   typeCarte: string;
//   numeroCarte: string;
//   profession: string;
//   medecinTraitant: string;
//   urgenceNom: string;
//   urgenceLien: string;
//   urgenceTel: string;
//   assurance: string;
//   numeroAssure: string;
// }

// const ETAT_INITIAL: FormPatient = {
//   nom: "",
//   prenom: "",
//   sexe: "masculin",
//   dateNaissance: "",
//   nationalite: "Ivoirienne",
//   situationMatrimoniale: "Célibataire",
//   groupeSanguin: "O+",
//   telephone: "",
//   email: "",
//   adresse: "",
//   villeCommune: "",
//   typeCarte: "CNI",
//   numeroCarte: "",
//   profession: "",
//   medecinTraitant: "",
//   urgenceNom: "",
//   urgenceLien: "",
//   urgenceTel: "",
//   assurance: "aucune",
//   numeroAssure: "",
// };

// const ACCENTS = {
//   cyan: "#0CB2DA",
//   indigo: "#6367EF",
//   amber: "#F5A524",
//   green: "#23C756",
//   red: "#F04444",
//   teal: "#0d9488",
// };

// export function PatientCreateForm() {
//   const router = useRouter();
//   const [form, setForm] = useState<FormPatient>(ETAT_INITIAL);

//   function set<K extends keyof FormPatient>(champ: K, valeur: FormPatient[K]) {
//     setForm((f) => ({ ...f, [champ]: valeur }));
//   }

//   const valide =
//     form.nom.trim() && form.prenom.trim() && form.dateNaissance && form.telephone.trim();

//   function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     if (!valide) return;
//     // TODO: appeler l'API d'enregistrement (patientApi.create) une fois la BD branchée.
//     console.log("Nouveau patient :", form);
//     alert("Patient enregistré (démo). Branchez l'API pour persister en base.");
//     router.push("/accueil/patients");
//   }

//   return (
//     <form onSubmit={handleSubmit} className="mx-auto max-w-5xl space-y-6 p-4 sm:p-6 lg:p-8">
//       {/* Titre */}
//       <header className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
//         <div className="flex items-center gap-3">
//           <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#0CB2DA] to-[#6367EF] text-white shadow">
//             <UserPlus className="h-5 w-5" />
//           </span>
//           <div>
//             <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
//               Enregistrement d&apos;un patient
//             </h1>
//             <p className="mt-1 text-sm text-muted-foreground">
//               Les champs marqués <span className="text-destructive">*</span> sont obligatoires.
//             </p>
//           </div>
//         </div>
//         <div className="mt-4 h-1 rounded-full bg-gradient-to-r from-[#0CB2DA] via-primary to-[#6367EF]" />
//       </header>

//       {/* Photo */}
//       {/* <section className="flex items-center gap-5 rounded-2xl border border-border bg-card p-5 shadow-sm">
//         <div className="flex h-24 w-24 items-center justify-center rounded-full bg-brand-mint-soft text-primary ring-4 ring-card">
//           <Camera className="h-7 w-7" />
//         </div>
//         <div>
//           <p className="font-semibold text-foreground">Photo du patient</p>
//           <p className="text-sm text-muted-foreground">Formats JPG ou PNG, 2 Mo max.</p>
//           <Button type="button" variant="outline" size="sm" className="mt-2 gap-2">
//             <Camera className="h-4 w-4" />
//             Ajouter une photo
//           </Button>
//         </div>
//       </section> */}

//       {/* Identité */}
//       <Section title="Identité" icon={<IdCard className="h-5 w-5" />} accent={ACCENTS.cyan}>
//         <Field label="Nom" required>
//           <Input value={form.nom} onChange={(e) => set("nom", e.target.value.toUpperCase())} placeholder="NOM" />
//         </Field>
//         <Field label="Prénom" required>
//           <Input value={form.prenom} onChange={(e) => set("prenom", e.target.value)} placeholder="Prénom" />
//         </Field>
//         <Field label="Sexe" required>
//           <Select value={form.sexe} onValueChange={(v) => set("sexe", v as FormPatient["sexe"])}>
//             <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
//             <SelectContent>
//               <SelectItem value="masculin">Masculin</SelectItem>
//               <SelectItem value="feminin">Féminin</SelectItem>
//             </SelectContent>
//           </Select>
//         </Field>
//         <Field label="Date de naissance" required>
//           <Input type="date" value={form.dateNaissance} onChange={(e) => set("dateNaissance", e.target.value)} />
//         </Field>
//         <Field label="Nationalité">
//           <Input value={form.nationalite} onChange={(e) => set("nationalite", e.target.value)} />
//         </Field>
//         <Field label="Situation matrimoniale">
//           <Select value={form.situationMatrimoniale} onValueChange={(v) => set("situationMatrimoniale", v)}>
//             <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
//             <SelectContent>
//               <SelectItem value="Célibataire">Célibataire</SelectItem>
//               <SelectItem value="Marié(e)">Marié(e)</SelectItem>
//               <SelectItem value="Divorcé(e)">Divorcé(e)</SelectItem>
//               <SelectItem value="Veuf(ve)">Veuf(ve)</SelectItem>
//             </SelectContent>
//           </Select>
//         </Field>
//         <Field label="Groupe sanguin">
//           <Select value={form.groupeSanguin} onValueChange={(v) => set("groupeSanguin", v)}>
//             <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
//             <SelectContent>
//               {["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"].map((g) => (
//                 <SelectItem key={g} value={g}>{g}</SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </Field>
//       </Section>

//       {/* Coordonnées */}
//       <Section title="Coordonnées" icon={<Phone className="h-5 w-5" />} accent={ACCENTS.indigo}>
//         <Field label="Téléphone" required>
//           <Input value={form.telephone} onChange={(e) => set("telephone", e.target.value)} placeholder="(+225) 0X XX XX XXXX" />
//         </Field>
//         <Field label="Email">
//           <Input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="exemple@mail.com" />
//         </Field>
//         <Field label="Ville / Commune">
//           <Input value={form.villeCommune} onChange={(e) => set("villeCommune", e.target.value)} placeholder="Abidjan / Cocody" />
//         </Field>
//         <Field label="Adresse" full>
//           <Textarea value={form.adresse} onChange={(e) => set("adresse", e.target.value)} rows={2} placeholder="Quartier, rue, repère…" />
//         </Field>
//       </Section>

//       {/* Pièce d'identité */}
//       <Section title="Pièce d'identité" icon={<IdCard className="h-5 w-5" />} accent={ACCENTS.amber}>
//         <Field label="Type de carte">
//           <Select value={form.typeCarte} onValueChange={(v) => set("typeCarte", v)}>
//             <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
//             <SelectContent>
//               <SelectItem value="CNI">CNI</SelectItem>
//               <SelectItem value="Passeport">Passeport</SelectItem>
//               <SelectItem value="Attestation">Attestation</SelectItem>
//             </SelectContent>
//           </Select>
//         </Field>
//         <Field label="N° de carte">
//           <Input value={form.numeroCarte} onChange={(e) => set("numeroCarte", e.target.value)} placeholder="CI-00000000" />
//         </Field>
//       </Section>

//       {/* Profession */}
//       <Section title="Profession" icon={<Briefcase className="h-5 w-5" />} accent={ACCENTS.green}>
//         <Field label="Profession">
//           <Input value={form.profession} onChange={(e) => set("profession", e.target.value)} />
//         </Field>
//         <Field label="Médecin traitant">
//           <Input value={form.medecinTraitant} onChange={(e) => set("medecinTraitant", e.target.value)} />
//         </Field>
//       </Section>

//       {/* Contact d'urgence */}
//       <Section title="Contact d'urgence" icon={<ShieldAlert className="h-5 w-5" />} accent={ACCENTS.red}>
//         <Field label="Nom complet">
//           <Input value={form.urgenceNom} onChange={(e) => set("urgenceNom", e.target.value)} />
//         </Field>
//         <Field label="Lien / Relation">
//           <Input value={form.urgenceLien} onChange={(e) => set("urgenceLien", e.target.value)} placeholder="Mère, Époux…" />
//         </Field>
//         <Field label="Téléphone">
//           <Input value={form.urgenceTel} onChange={(e) => set("urgenceTel", e.target.value)} />
//         </Field>
//       </Section>

//       {/* Assurance */}
//       <Section title="Assurance du patient" icon={<ShieldCheck className="h-5 w-5" />} accent={ACCENTS.teal}>
//         <Field label="Organisme">
//           <Select value={form.assurance} onValueChange={(v) => set("assurance", v)}>
//             <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
//             <SelectContent>
//               {ASSURANCES.map((a) => (
//                 <SelectItem key={a.value} value={a.value}>{a.label}</SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </Field>
//         <Field label="N° d'assuré">
//           <Input value={form.numeroAssure} onChange={(e) => set("numeroAssure", e.target.value)} />
//         </Field>
//       </Section>

//       {/* Actions */}
//       <div className="flex flex-wrap items-center justify-end gap-3 rounded-2xl border border-border bg-card p-5 shadow-sm">
//         <Button type="button" variant="outline" onClick={() => router.push("/accueil/patients")}>
//           Annuler
//         </Button>
//         <Button type="submit" disabled={!valide} className="gap-2">
//           <Save className="h-4 w-4" />
//           Enregistrer le patient
//         </Button>
//       </div>
//     </form>
//   );
// }

// /* ------------------------- UI ------------------------- */

// function Section({
//   title,
//   icon,
//   accent,
//   children,
// }: {
//   title: string;
//   icon: React.ReactNode;
//   accent: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
//       <header
//         className="flex items-center gap-3 border-b px-5 py-3.5"
//         style={{ backgroundColor: `${accent}12`, borderColor: `${accent}33` }}
//       >
//         <span
//           className="flex h-8 w-8 items-center justify-center rounded-lg"
//           style={{ backgroundColor: `${accent}1F`, color: accent }}
//         >
//           {icon}
//         </span>
//         <h2 className="font-semibold" style={{ color: accent }}>{title}</h2>
//       </header>
//       <div className="grid gap-x-6 gap-y-4 p-5 sm:grid-cols-2">{children}</div>
//     </section>
//   );
// }

// function Field({
//   label,
//   required,
//   full,
//   children,
// }: {
//   label: string;
//   required?: boolean;
//   full?: boolean;
//   children: React.ReactNode;
// }) {
//   return (
//     <div className={`space-y-1.5 ${full ? "sm:col-span-2" : ""}`}>
//       <Label>
//         {label} {required ? <span className="text-destructive">*</span> : null}
//       </Label>
//       {children}
//     </div>
//   );
// }









// Route: /accueil/patients-create
// Formulaire d'enregistrement d'un nouveau patient.
// Composant client : état de formulaire + validation des champs obligatoires.
// Adapté du formulaire d'enregistrement existant, au thème PinHome.

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  UserPlus,
  IdCard,
  Phone,
  Briefcase,
  ShieldAlert,
  ShieldCheck,
  Camera,
  Save,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { patientsApi } from "@/lib/api/patients";
import { ASSURANCES } from "@/lib/dataPatients/paiementOption";

// Modèle du formulaire (statique pour l'instant ; branché à la BD plus tard)
interface FormPatient {
  nom: string;
  prenom: string;
  sexe: "masculin" | "feminin";
  dateNaissance: string;
  nationalite: string;
  situationMatrimoniale: string;
  groupeSanguin: string;
  telephone: string;
  email: string;
  adresse: string;
  villeCommune: string;
  typeCarte: string;
  numeroCarte: string;
  profession: string;
  medecinTraitant: string;
  urgenceNom: string;
  urgenceLien: string;
  urgenceTel: string;
  assurance: string;
  numeroAssure: string;
}

const ETAT_INITIAL: FormPatient = {
  nom: "",
  prenom: "",
  sexe: "masculin",
  dateNaissance: "",
  nationalite: "Ivoirienne",
  situationMatrimoniale: "Célibataire",
  groupeSanguin: "O+",
  telephone: "",
  email: "",
  adresse: "",
  villeCommune: "",
  typeCarte: "CNI",
  numeroCarte: "",
  profession: "",
  medecinTraitant: "",
  urgenceNom: "",
  urgenceLien: "",
  urgenceTel: "",
  assurance: "aucune",
  numeroAssure: "",
};

const ACCENTS = {
  cyan: "#0CB2DA",
  indigo: "#6367EF",
  amber: "#F5A524",
  green: "#23C756",
  red: "#F04444",
  teal: "#0d9488",
};

export function PatientCreateForm() {
  const router = useRouter();
  const [form, setForm] = useState<FormPatient>(ETAT_INITIAL);
  const [envoi, setEnvoi] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);

  function set<K extends keyof FormPatient>(champ: K, valeur: FormPatient[K]) {
    setForm((f) => ({ ...f, [champ]: valeur }));
  }

  const valide =
    form.nom.trim() && form.prenom.trim() && form.dateNaissance && form.telephone.trim();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!valide || envoi) return;
    setErreur(null);
    setEnvoi(true);

    // Mappe le formulaire vers le payload attendu par l'API NestJS
    const assuranceLabel =
      ASSURANCES.find((a) => a.value === form.assurance)?.label ?? "Aucune";

    try {
      await patientsApi.create({
        nom: form.nom,
        prenom: form.prenom,
        genre: form.sexe,
        dateNaissance: form.dateNaissance,
        contact: form.telephone,
        email: form.email || undefined,
        adresse: form.adresse || undefined,
        villeCommune: form.villeCommune || undefined,
        nationalite: form.nationalite || undefined,
        typeCarte: form.typeCarte || undefined,
        numeroCarte: form.numeroCarte || undefined,
        profession: form.profession || undefined,
        situationMatrimoniale: form.situationMatrimoniale || undefined,
        groupeSanguin: form.groupeSanguin || undefined,
        medecinTraitant: form.medecinTraitant || undefined,
        urgenceNom: form.urgenceNom || undefined,
        urgenceLien: form.urgenceLien || undefined,
        urgenceTel: form.urgenceTel || undefined,
        assuranceNom: assuranceLabel,
        assuranceNumero: form.numeroAssure || undefined,
      });
      router.push("/accueil/patients");
      router.refresh(); // recharge la liste avec le nouveau patient
    } catch (err) {
      setErreur(err instanceof Error ? err.message : "Erreur lors de l'enregistrement");
      setEnvoi(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-5xl space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Titre */}
      <header className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#0CB2DA] to-[#6367EF] text-white shadow">
            <UserPlus className="h-5 w-5" />
          </span>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Enregistrement d&apos;un patient
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Les champs marqués <span className="text-destructive">*</span> sont obligatoires.
            </p>
          </div>
        </div>
        <div className="mt-4 h-1 rounded-full bg-gradient-to-r from-[#0CB2DA] via-primary to-[#6367EF]" />
      </header>

      {/* Photo */}
      <section className="flex items-center gap-5 rounded-2xl border border-border bg-card p-5 shadow-sm">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-brand-mint-soft text-primary ring-4 ring-card">
          <Camera className="h-7 w-7" />
        </div>
        <div>
          <p className="font-semibold text-foreground">Photo du patient</p>
          <p className="text-sm text-muted-foreground">Formats JPG ou PNG, 2 Mo max.</p>
          <Button type="button" variant="outline" size="sm" className="mt-2 gap-2">
            <Camera className="h-4 w-4" />
            Ajouter une photo
          </Button>
        </div>
      </section>

      {/* Identité */}
      <Section title="Identité" icon={<IdCard className="h-5 w-5" />} accent={ACCENTS.cyan}>
        <Field label="Nom" required>
          <Input value={form.nom} onChange={(e) => set("nom", e.target.value.toUpperCase())} placeholder="NOM" />
        </Field>
        <Field label="Prénom" required>
          <Input value={form.prenom} onChange={(e) => set("prenom", e.target.value)} placeholder="Prénom" />
        </Field>
        <Field label="Sexe" required>
          <Select value={form.sexe} onValueChange={(v) => set("sexe", v as FormPatient["sexe"])}>
            <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="masculin">Masculin</SelectItem>
              <SelectItem value="feminin">Féminin</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Date de naissance" required>
          <Input type="date" value={form.dateNaissance} onChange={(e) => set("dateNaissance", e.target.value)} />
        </Field>
        <Field label="Nationalité">
          <Input value={form.nationalite} onChange={(e) => set("nationalite", e.target.value)} />
        </Field>
        <Field label="Situation matrimoniale">
          <Select value={form.situationMatrimoniale} onValueChange={(v) => set("situationMatrimoniale", v)}>
            <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Célibataire">Célibataire</SelectItem>
              <SelectItem value="Marié(e)">Marié(e)</SelectItem>
              <SelectItem value="Divorcé(e)">Divorcé(e)</SelectItem>
              <SelectItem value="Veuf(ve)">Veuf(ve)</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Groupe sanguin">
          <Select value={form.groupeSanguin} onValueChange={(v) => set("groupeSanguin", v)}>
            <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
            <SelectContent>
              {["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"].map((g) => (
                <SelectItem key={g} value={g}>{g}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      </Section>

      {/* Coordonnées */}
      <Section title="Coordonnées" icon={<Phone className="h-5 w-5" />} accent={ACCENTS.indigo}>
        <Field label="Téléphone" required>
          <Input value={form.telephone} onChange={(e) => set("telephone", e.target.value)} placeholder="(+225) 0X XX XX XXXX" />
        </Field>
        <Field label="Email">
          <Input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="exemple@mail.com" />
        </Field>
        <Field label="Ville / Commune">
          <Input value={form.villeCommune} onChange={(e) => set("villeCommune", e.target.value)} placeholder="Abidjan / Cocody" />
        </Field>
        <Field label="Adresse" full>
          <Textarea value={form.adresse} onChange={(e) => set("adresse", e.target.value)} rows={2} placeholder="Quartier, rue, repère…" />
        </Field>
      </Section>

      {/* Pièce d'identité */}
      <Section title="Pièce d'identité" icon={<IdCard className="h-5 w-5" />} accent={ACCENTS.amber}>
        <Field label="Type de carte">
          <Select value={form.typeCarte} onValueChange={(v) => set("typeCarte", v)}>
            <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="CNI">CNI</SelectItem>
              <SelectItem value="Passeport">Passeport</SelectItem>
              <SelectItem value="Attestation">Attestation</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="N° de carte">
          <Input value={form.numeroCarte} onChange={(e) => set("numeroCarte", e.target.value)} placeholder="CI-00000000" />
        </Field>
      </Section>

      {/* Profession */}
      <Section title="Profession" icon={<Briefcase className="h-5 w-5" />} accent={ACCENTS.green}>
        <Field label="Profession">
          <Input value={form.profession} onChange={(e) => set("profession", e.target.value)} />
        </Field>
        <Field label="Médecin traitant">
          <Input value={form.medecinTraitant} onChange={(e) => set("medecinTraitant", e.target.value)} />
        </Field>
      </Section>

      {/* Contact d'urgence */}
      <Section title="Contact d'urgence" icon={<ShieldAlert className="h-5 w-5" />} accent={ACCENTS.red}>
        <Field label="Nom complet">
          <Input value={form.urgenceNom} onChange={(e) => set("urgenceNom", e.target.value)} />
        </Field>
        <Field label="Lien / Relation">
          <Input value={form.urgenceLien} onChange={(e) => set("urgenceLien", e.target.value)} placeholder="Mère, Époux…" />
        </Field>
        <Field label="Téléphone">
          <Input value={form.urgenceTel} onChange={(e) => set("urgenceTel", e.target.value)} />
        </Field>
      </Section>

      {/* Assurance */}
      <Section title="Assurance du patient" icon={<ShieldCheck className="h-5 w-5" />} accent={ACCENTS.teal}>
        <Field label="Organisme">
          <Select value={form.assurance} onValueChange={(v) => set("assurance", v)}>
            <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
            <SelectContent>
              {ASSURANCES.map((a) => (
                <SelectItem key={a.value} value={a.value}>{a.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="N° d'assuré">
          <Input value={form.numeroAssure} onChange={(e) => set("numeroAssure", e.target.value)} />
        </Field>
      </Section>

      {/* Actions */}
      <div className="space-y-3 rounded-2xl border border-border bg-card p-5 shadow-sm">
        {erreur ? (
          <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {erreur}
          </p>
        ) : null}
        <div className="flex flex-wrap items-center justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => router.push("/accueil/patients")}>
            Annuler
          </Button>
          <Button type="submit" disabled={!valide || envoi} className="gap-2">
            <Save className="h-4 w-4" />
            {envoi ? "Enregistrement…" : "Enregistrer le patient"}
          </Button>
        </div>
      </div>
    </form>
  );
}

/* ------------------------- UI ------------------------- */

function Section({
  title,
  icon,
  accent,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <header
        className="flex items-center gap-3 border-b px-5 py-3.5"
        style={{ backgroundColor: `${accent}12`, borderColor: `${accent}33` }}
      >
        <span
          className="flex h-8 w-8 items-center justify-center rounded-lg"
          style={{ backgroundColor: `${accent}1F`, color: accent }}
        >
          {icon}
        </span>
        <h2 className="font-semibold" style={{ color: accent }}>{title}</h2>
      </header>
      <div className="grid gap-x-6 gap-y-4 p-5 sm:grid-cols-2">{children}</div>
    </section>
  );
}

function Field({
  label,
  required,
  full,
  children,
}: {
  label: string;
  required?: boolean;
  full?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={`space-y-1.5 ${full ? "sm:col-span-2" : ""}`}>
      <Label>
        {label} {required ? <span className="text-destructive">*</span> : null}
      </Label>
      {children}
    </div>
  );
}