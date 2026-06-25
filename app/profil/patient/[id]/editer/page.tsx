import { notFound } from "next/navigation";
import { PatientEditForm } from "@/components/form/PatientEditForm";
import { patientsApi } from "@/lib/api/patients";
import type { Patient } from "@/lib/dataPatients/patient";

export default async function EditerPatientPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let patient: Patient | null = null;
  try {
    patient = await patientsApi.getById(id);
  } catch {
    patient = null;
  }
  if (!patient) notFound();

  return (
    <div className="min-h-screen bg-background">
      <PatientEditForm patient={patient} />
    </div>
  );
}