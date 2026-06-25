"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  IdCard,
  Phone,
  Briefcase,
  ShieldAlert,
  ShieldCheck,
  Save,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { patientsApi } from "@/lib/api/patients";
import { ASSURANCES } from "@/lib/dataPatients/paiementOption";
import type { Patient } from "@/lib/dataPatients/patient";

const ACCENTS = {
  cyan: "#0CB2DA",
  indigo: "#6367EF",
  amber: "#F5A524",
  green: "#23C756",
  red: "#F04444",
};

interface FormEdit {
  nom: string;
  genre: "masculin" | "feminin";
  dateNaissance: string;
  contact: string;
  email: string;
  nationalite: string;
  villeCommune: string;
  typeCarte: string;
  numeroCarte: string;
  profession: string;
  urgenceNom: string;
  urgenceLien: string;
  urgenceTel: string;
  assuranceNom: string;
  assuranceNumero: string;
}

export function PatientEditForm({ patient }: { patient: Patient }) {
  const router = useRouter();
  const [form, setForm] = useState<FormEdit>({
    nom: patient.nom ?? "",
    genre: patient.genre,
    dateNaissance: (patient.dateNaissance ?? "").slice(0, 10), // ISO -> yyyy-mm-dd
    contact: patient.contact ?? "",
    email: patient.email ?? "",
    nationalite: patient.nationalite ?? "",
    villeCommune: patient.villeCommune ?? "",
    typeCarte: patient.typeCarte ?? "CNI",
    numeroCarte: patient.numeroCarte ?? "",
    profession: patient.profession ?? "",
    urgenceNom: patient.urgenceNom ?? "",
    urgenceLien: patient.urgenceLien ?? "",
    urgenceTel: patient.urgenceTel ?? "",
    assuranceNom: patient.assuranceNom ?? "Aucune",
    assuranceNumero: patient.assuranceNumero ?? "",
  });
  const [envoi, setEnvoi] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);

  function set<K extends keyof FormEdit>(champ: K, valeur: FormEdit[K]) {
    setForm((f) => ({ ...f, [champ]: valeur }));
  }

  const valide = form.nom.trim() && form.dateNaissance && form.contact.trim();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!valide || envoi) return;
    setErreur(null);
    setEnvoi(true);
    try {
      await patientsApi.update(patient.id, {
        nom: form.nom,
        prenom: "", // le nom complet est édité dans le champ "nom"
        genre: form.genre,
        dateNaissance: form.dateNaissance,
        contact: form.contact,
        email: form.email || undefined,
        nationalite: form.nationalite || undefined,
        villeCommune: form.villeCommune || undefined,
        typeCarte: form.typeCarte || undefined,
        numeroCarte: form.numeroCarte || undefined,
        profession: form.profession || undefined,
        urgenceNom: form.urgenceNom || undefined,
        urgenceLien: form.urgenceLien || undefined,
        urgenceTel: form.urgenceTel || undefined,
        assuranceNom: form.assuranceNom || undefined,
        assuranceNumero: form.assuranceNumero || undefined,
      });
      router.push(`/profil/patient/${patient.id}`);
      router.refresh();
    } catch (err) {
      setErreur(err instanceof Error ? err.message : "Erreur lors de la mise à jour");
      setEnvoi(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-5xl space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Titre */}
      <header className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#0CB2DA] to-[#6367EF] text-white shadow">
              <IdCard className="h-5 w-5" />
            </span>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Modifier le patient
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {patient.code} — mettez à jour les informations puis enregistrez.
              </p>
            </div>
          </div>
          <Button
            type="button"
            variant="outline"
            className="gap-2"
            onClick={() => router.push(`/profil/patient/${patient.id}`)}
          >
            <ArrowLeft className="h-4 w-4" />
            Retour
          </Button>
        </div>
        <div className="mt-4 h-1 rounded-full bg-gradient-to-r from-[#0CB2DA] via-primary to-[#6367EF]" />
      </header>

      {/* Identité */}
      <Section title="Identité" icon={<IdCard className="h-5 w-5" />} accent={ACCENTS.cyan}>
        <Field label="Nom complet" required>
          <Input value={form.nom} onChange={(e) => set("nom", e.target.value)} />
        </Field>
        <Field label="Sexe" required>
          <Select value={form.genre} onValueChange={(v) => set("genre", v as FormEdit["genre"])}>
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
      </Section>

      {/* Coordonnées */}
      <Section title="Coordonnées" icon={<Phone className="h-5 w-5" />} accent={ACCENTS.indigo}>
        <Field label="Téléphone" required>
          <Input value={form.contact} onChange={(e) => set("contact", e.target.value)} />
        </Field>
        <Field label="Email">
          <Input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} />
        </Field>
        <Field label="Ville / Commune">
          <Input value={form.villeCommune} onChange={(e) => set("villeCommune", e.target.value)} />
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
          <Input value={form.numeroCarte} onChange={(e) => set("numeroCarte", e.target.value)} />
        </Field>
      </Section>

      {/* Profession */}
      <Section title="Profession" icon={<Briefcase className="h-5 w-5" />} accent={ACCENTS.green}>
        <Field label="Profession">
          <Input value={form.profession} onChange={(e) => set("profession", e.target.value)} />
        </Field>
      </Section>

      {/* Contact d'urgence */}
      <Section title="Contact d'urgence" icon={<ShieldAlert className="h-5 w-5" />} accent={ACCENTS.red}>
        <Field label="Nom complet">
          <Input value={form.urgenceNom} onChange={(e) => set("urgenceNom", e.target.value)} />
        </Field>
        <Field label="Lien / Relation">
          <Input value={form.urgenceLien} onChange={(e) => set("urgenceLien", e.target.value)} />
        </Field>
        <Field label="Téléphone">
          <Input value={form.urgenceTel} onChange={(e) => set("urgenceTel", e.target.value)} />
        </Field>
      </Section>

      {/* Assurance */}
      <Section title="Assurance du patient" icon={<ShieldCheck className="h-5 w-5" />} accent={ACCENTS.green}>
        <Field label="Organisme">
          <Select value={form.assuranceNom} onValueChange={(v) => set("assuranceNom", v)}>
            <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
            <SelectContent>
              {ASSURANCES.map((a) => (
                <SelectItem key={a.value} value={a.label}>{a.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="N° d'assuré">
          <Input value={form.assuranceNumero} onChange={(e) => set("assuranceNumero", e.target.value)} />
        </Field>
      </Section>

      {/* Actions */}
      <div className="space-y-3 rounded-2xl border border-border bg-card p-5 shadow-sm">
        {erreur ? (
          <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">{erreur}</p>
        ) : null}
        <div className="flex flex-wrap items-center justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => router.push(`/profil/patient/${patient.id}`)}>
            Annuler
          </Button>
          <Button type="submit" disabled={!valide || envoi} className="gap-2">
            <Save className="h-4 w-4" />
            {envoi ? "Enregistrement…" : "Enregistrer les modifications"}
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
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label>
        {label} {required ? <span className="text-destructive">*</span> : null}
      </Label>
      {children}
    </div>
  );
}