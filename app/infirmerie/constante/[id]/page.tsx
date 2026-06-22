import { ConstanteForm } from "@/components/infirmerie/ConstanteForm"
import { getPatientAttenteById } from "@/lib/dataInfirmerie/infirmerie"
import { notFound } from "next/navigation"
export default async function ConstantePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const patient = getPatientAttenteById(id)
  if (!patient) notFound()

  return (
    <div className="mx-auto max-w-3xl p-4 sm:p-6">
      <ConstanteForm patient={patient} />
    </div>
  )
}