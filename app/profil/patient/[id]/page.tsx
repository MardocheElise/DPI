 import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Pencil,
  ReceiptText,
  Phone,
  Mail,
  MapPin,
  Cake,
  Briefcase,
  ShieldAlert,
  ShieldCheck,
  CalendarClock,
  IdCard,
  Flag,
  CreditCard,
  Hash,
  UserRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { calculerAge, formatDateFr, formatDateTimeFr } from "@/lib/data/format";
import { Patient, PATIENTS } from "@/lib/dataPatients/patient";

// Palette d'accents (réutilise les couleurs des icônes d'action)
const ACCENTS = {
  cyan: "#0CB2DA",
  indigo: "#6367EF",
  red: "#F04444",
  green: "#23C756",
  amber: "#F5A524",
};

export default async function ProfilPatientPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const patient = PATIENTS.find((p) => String(p.id) === id);
  if (!patient) notFound();

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[320px_1fr]">
        <Sidebar patient={patient} />
        <Corps patient={patient} />
      </div>
    </div>
  );
}

/* ------------------------- Sidebar (identité) ------------------------- */

function Sidebar({ patient }: { patient: Patient }) {
  return (
    <aside className="flex h-full flex-col overflow-hidden rounded-2xl border border-brand-sky-soft bg-card shadow-sm">
      {/* Bandeau coloré */}
      <div className="h-24 bg-gradient-to-r from-[#0CB2DA] via-primary to-[#6367EF]" />

      <div className="flex flex-1 flex-col px-6 pb-6">
        {/* Photo qui chevauche le bandeau */}
        <div className="-mt-14 flex flex-col items-center text-center">
          <Avatar nom={patient.nom} genre={patient.genre} />
          <h1 className="mt-4 text-lg font-bold leading-tight text-foreground">
            {patient.nom}
          </h1>
          <div className="mt-2">
            <GenreBadge genre={patient.genre} />
          </div>
        </div>

        <div className="my-5 h-px bg-border" />

        {/* Identité avec puces colorées */}
        <dl className="space-y-3 text-sm">
          <Item
            icon={<Hash className="h-4 w-4" />}
            tint={ACCENTS.cyan}
            label="Code"
            value={patient.code}
            valueClassName="text-primary font-semibold"
          />
          <Item
            icon={<Flag className="h-4 w-4" />}
            tint={ACCENTS.indigo}
            label="Nationalité"
            value={patient.nationalite}
          />
          <Item
            icon={<MapPin className="h-4 w-4" />}
            tint={ACCENTS.red}
            label="Ville / Commune"
            value={patient.villeCommune}
          />
          <Item
            icon={<CreditCard className="h-4 w-4" />}
            tint={ACCENTS.green}
            label="Type de carte"
            value={patient.typeCarte}
          />
          <Item
            icon={<IdCard className="h-4 w-4" />}
            tint={ACCENTS.amber}
            label="N° de carte"
            value={patient.numeroCarte}
          />
        </dl>

        {/* Date d'enregistrement en bas */}
        <div className="mt-auto pt-6">
          <div className="flex items-center gap-2 rounded-xl bg-brand-mint-soft px-3 py-2 text-xs text-brand-teal-deep">
            <CalendarClock className="h-4 w-4 shrink-0" />
            <span>
              Enregistré le{" "}
              <span className="font-semibold">{formatDateTimeFr(patient.enregistreLe)}</span>
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}

function Item({
  icon,
  tint,
  label,
  value,
  valueClassName,
}: {
  icon: React.ReactNode;
  tint: string;
  label: string;
  value: string;
  valueClassName?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
        style={{ backgroundColor: `${tint}1A`, color: tint }}
      >
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <dt className="text-xs text-muted-foreground">{label}</dt>
        <dd className={`font-medium text-foreground ${valueClassName ?? ""}`}>{value}</dd>
      </div>
    </div>
  );
}

/* ------------------------- Corps (informations) ------------------------- */

function Corps({ patient }: { patient: Patient }) {
  return (
    <div className="space-y-6">
      {/* Actions */}
      <div className="flex flex-wrap items-center gap-3">
        <Button
          asChild
          variant="outline"
          className="gap-2 border-primary/40 text-primary hover:bg-primary/10"
        >
          <Link href={`/profil/patient/${patient.id}/editer`}>
            <Pencil className="h-4 w-4" />
            Éditer
          </Link>
        </Button>
        <Button
          asChild
          className="gap-2 bg-gradient-to-r from-primary to-brand-teal-deep text-white hover:opacity-95"
        >
          <Link href={`/form/paiement-form?ref=${encodeURIComponent(patient.code)}`}>
            <ReceiptText className="h-4 w-4" />
            Créer fiche de paiement
          </Link>
        </Button>
      </div>

      {/* Contact & identification — cyan */}
      <Section title="Contact & identification" icon={<Phone className="h-5 w-5" />} accent={ACCENTS.cyan}>
        <Field accent={ACCENTS.cyan} icon={<Phone className="h-4 w-4" />} label="Téléphone" value={patient.contact} />
        <Field accent={ACCENTS.cyan} icon={<Mail className="h-4 w-4" />} label="Email" value={patient.email ?? "—"} />
        <Field
          accent={ACCENTS.cyan}
          icon={<Cake className="h-4 w-4" />}
          label="Date de naissance"
          value={`${formatDateFr(patient.dateNaissance)} (${calculerAge(patient.dateNaissance)})`}
        />
        <Field accent={ACCENTS.cyan} icon={<MapPin className="h-4 w-4" />} label="Ville / Commune" value={patient.villeCommune} />
        <Field accent={ACCENTS.cyan} icon={<IdCard className="h-4 w-4" />} label="Pièce" value={`${patient.typeCarte} · ${patient.numeroCarte}`} />
      </Section>

      {/* Profession — indigo */}
      <Section title="Profession" icon={<Briefcase className="h-5 w-5" />} accent={ACCENTS.indigo}>
        <Field accent={ACCENTS.indigo} icon={<Briefcase className="h-4 w-4" />} label="Profession" value={patient.profession ?? "—"} />
      </Section>

      {/* Contact d'urgence — rouge */}
      <Section title="Contact d'urgence" icon={<ShieldAlert className="h-5 w-5" />} accent={ACCENTS.red}>
        <Field accent={ACCENTS.red} icon={<UserRound className="h-4 w-4" />} label="Nom" value={patient.urgenceNom ?? "—"} />
        <Field accent={ACCENTS.red} icon={<ShieldAlert className="h-4 w-4" />} label="Lien" value={patient.urgenceLien ?? "—"} />
        <Field accent={ACCENTS.red} icon={<Phone className="h-4 w-4" />} label="Téléphone" value={patient.urgenceTel ?? "—"} />
      </Section>

      {/* Assurance — vert */}
      <Section title="Assurance du patient" icon={<ShieldCheck className="h-5 w-5" />} accent={ACCENTS.green}>
        <Field accent={ACCENTS.green} icon={<ShieldCheck className="h-4 w-4" />} label="Organisme" value={patient.assuranceNom ?? "—"} />
        <Field accent={ACCENTS.green} icon={<Hash className="h-4 w-4" />} label="N° d'assuré" value={patient.assuranceNumero ?? "—"} />
      </Section>
    </div>
  );
}

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
        <h2 className="font-semibold" style={{ color: accent }}>
          {title}
        </h2>
      </header>
      <dl className="grid gap-x-6 gap-y-4 p-5 sm:grid-cols-2">{children}</dl>
    </section>
  );
}

function Field({
  icon,
  label,
  value,
  accent,
}: {
  icon?: React.ReactNode;
  label: string;
  value: string;
  accent?: string;
}) {
  return (
    <div className="flex items-start gap-3">
      {icon ? (
        <span
          className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md"
          style={
            accent
              ? { backgroundColor: `${accent}14`, color: accent }
              : { color: "var(--color-muted-foreground)" }
          }
        >
          {icon}
        </span>
      ) : null}
      <div>
        <dt className="text-xs uppercase tracking-wide text-muted-foreground">{label}</dt>
        <dd className="font-medium text-foreground">{value}</dd>
      </div>
    </div>
  );
}

/* ------------------------- UI ------------------------- */

function Avatar({ nom, genre }: { nom: string; genre: Patient["genre"] }) {
  const initiales = nom
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((m) => m[0]?.toUpperCase())
    .join("");
  const bg = genre === "feminin" ? "from-brand-pink to-[#F0577A]" : "from-primary to-brand-teal-deep";
  return (
    <div
      className={`flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br ${bg} text-3xl font-bold text-white shadow-md ring-4 ring-card`}
    >
      {initiales}
    </div>
  );
}

function GenreBadge({ genre }: { genre: Patient["genre"] }) {
  if (genre === "feminin") {
    return (
      <Badge className="border-transparent bg-brand-pink/40 text-brand-pink-deep hover:bg-brand-pink/40">
        feminin
      </Badge>
    );
  }
  return (
    <Badge className="border-transparent bg-brand-mint-soft text-brand-teal-deep hover:bg-brand-mint-soft">
      masculin
    </Badge>
  );
}