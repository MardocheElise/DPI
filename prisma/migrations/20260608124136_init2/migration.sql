-- CreateEnum
CREATE TYPE "TypeHospitalisation" AS ENUM ('complete', 'jour', 'urgence', 'ambulatory');

-- CreateEnum
CREATE TYPE "StatutSejour" AS ENUM ('en_cours', 'termine', 'annule', 'deces');

-- CreateEnum
CREATE TYPE "ModeSortie" AS ENUM ('gueri', 'ameliore', 'stable', 'aggrave', 'deces', 'contre_avis');

-- CreateEnum
CREATE TYPE "TypeMouvement" AS ENUM ('transfer_service', 'transfer_lit', 'permission', 'absence');

-- CreateTable
CREATE TABLE "Sejour" (
    "idSejour" SERIAL NOT NULL,
    "patientId" INTEGER NOT NULL,
    "numeroSejour" VARCHAR(20) NOT NULL,
    "serviceId" INTEGER,
    "idLit" INTEGER,
    "typeHospitalisation" "TypeHospitalisation" NOT NULL,
    "dateAdmissionPrevue" TIMESTAMP(3),
    "dateAdmissionReelle" TIMESTAMP(3),
    "dateSortiePrevue" TIMESTAMP(3),
    "dateSortieReelle" TIMESTAMP(3),
    "medecinResponsableId" INTEGER,
    "motifAdmission" TEXT,
    "diagnosticPrincipal" VARCHAR(200),
    "diagnosticCim10" VARCHAR(20),
    "statut" "StatutSejour" NOT NULL DEFAULT 'en_cours',
    "modeSortie" "ModeSortie",
    "contreVisite" BOOLEAN NOT NULL DEFAULT false,
    "dateCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModification" TIMESTAMP(3) NOT NULL,
    "utilisateurCreationId" INTEGER,

    CONSTRAINT "Sejour_pkey" PRIMARY KEY ("idSejour")
);

-- CreateTable
CREATE TABLE "MouvementSejour" (
    "idMouvement" SERIAL NOT NULL,
    "sejourId" INTEGER NOT NULL,
    "typeMouvement" "TypeMouvement" NOT NULL,
    "serviceOrigineId" INTEGER,
    "serviceDestinationId" INTEGER,
    "litOrigine" INTEGER,
    "litDestination" INTEGER,
    "dateMouvement" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "motif" TEXT,
    "utilisateurId" INTEGER,

    CONSTRAINT "MouvementSejour_pkey" PRIMARY KEY ("idMouvement")
);

-- CreateIndex
CREATE UNIQUE INDEX "Sejour_numeroSejour_key" ON "Sejour"("numeroSejour");

-- CreateIndex
CREATE INDEX "Sejour_patientId_idx" ON "Sejour"("patientId");

-- CreateIndex
CREATE INDEX "Sejour_statut_idx" ON "Sejour"("statut");

-- AddForeignKey
ALTER TABLE "Sejour" ADD CONSTRAINT "Sejour_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("idPatient") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sejour" ADD CONSTRAINT "Sejour_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("idService") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sejour" ADD CONSTRAINT "Sejour_medecinResponsableId_fkey" FOREIGN KEY ("medecinResponsableId") REFERENCES "ProfessionnelSante"("idProfessionnel") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sejour" ADD CONSTRAINT "Sejour_utilisateurCreationId_fkey" FOREIGN KEY ("utilisateurCreationId") REFERENCES "Utilisateur"("idUtilisateur") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MouvementSejour" ADD CONSTRAINT "MouvementSejour_sejourId_fkey" FOREIGN KEY ("sejourId") REFERENCES "Sejour"("idSejour") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MouvementSejour" ADD CONSTRAINT "MouvementSejour_serviceOrigineId_fkey" FOREIGN KEY ("serviceOrigineId") REFERENCES "Service"("idService") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MouvementSejour" ADD CONSTRAINT "MouvementSejour_serviceDestinationId_fkey" FOREIGN KEY ("serviceDestinationId") REFERENCES "Service"("idService") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MouvementSejour" ADD CONSTRAINT "MouvementSejour_utilisateurId_fkey" FOREIGN KEY ("utilisateurId") REFERENCES "Utilisateur"("idUtilisateur") ON DELETE SET NULL ON UPDATE CASCADE;
