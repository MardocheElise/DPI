-- CreateEnum
CREATE TYPE "TypeConsultation" AS ENUM ('initiale', 'suivi', 'urgence', 'specialiste', 'reconsultation');

-- CreateEnum
CREATE TYPE "TypeMotif" AS ENUM ('douleur', 'fievre', 'controles', 'urgence');

-- CreateEnum
CREATE TYPE "NiveauUrgence" AS ENUM ('vert', 'orange', 'rouge');

-- CreateEnum
CREATE TYPE "Conscience" AS ENUM ('claire', 'alteree', 'obnubilee', 'coma');

-- CreateEnum
CREATE TYPE "UniteMedicament" AS ENUM ('mg', 'ml', 'g', 'UI');

-- CreateEnum
CREATE TYPE "VoieAdministration" AS ENUM ('orale', 'intraveineuse', 'intramusculaire', 'sous_cutanee');

-- CreateEnum
CREATE TYPE "Frequence" AS ENUM ('une_fois_jour', 'deux_fois_jour', 'trois_fois_jour', 'toutes_8h', 'autre');

-- CreateEnum
CREATE TYPE "StatutPrescription" AS ENUM ('prescrit', 'dispense', 'administre', 'annule');

-- CreateEnum
CREATE TYPE "Priorite" AS ENUM ('normale', 'urgente', 'tres_urgente');

-- CreateEnum
CREATE TYPE "TypeExamen" AS ENUM ('biologie', 'imagerie', 'ecg', 'autre');

-- CreateEnum
CREATE TYPE "CategorieExamen" AS ENUM ('sang', 'urine', 'radiographie', 'scanner', 'irm', 'echographie');

-- CreateEnum
CREATE TYPE "StatutExamen" AS ENUM ('prescrit', 'en_cours', 'realise', 'resultats_disponibles', 'annule');

-- CreateTable
CREATE TABLE "Consultation" (
    "idConsultation" SERIAL NOT NULL,
    "sejourId" INTEGER,
    "patientId" INTEGER NOT NULL,
    "medecinId" INTEGER NOT NULL,
    "typeConsultation" "TypeConsultation" NOT NULL,
    "serviceConsultationId" INTEGER,
    "dateConsultation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "motifConsultation" TEXT NOT NULL,
    "typeMotif" "TypeMotif",
    "tensionArterielle" TEXT,
    "frequenceCardiaque" INTEGER,
    "frequenceRespiratoire" INTEGER,
    "temperature" DECIMAL(4,2),
    "saturationO2" INTEGER,
    "poids" DECIMAL(5,2),
    "taille" DECIMAL(5,2),
    "imc" DECIMAL(5,2),
    "douleurEva" INTEGER,
    "conscience" "Conscience",
    "anamnese" TEXT,
    "examenPhysique" TEXT,
    "diagnosticPrincipal" TEXT,
    "diagnosticCim10" TEXT,
    "diagnosticAssocie" TEXT,
    "diagnosticDifferentiel" TEXT,
    "niveauUrgence" "NiveauUrgence",
    "planSoins" TEXT,
    "recommandations" TEXT,
    "valide" BOOLEAN NOT NULL DEFAULT false,
    "dateValidation" TIMESTAMP(3),
    "validateurId" INTEGER,
    "dateCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "utilisateurCreationId" INTEGER,

    CONSTRAINT "Consultation_pkey" PRIMARY KEY ("idConsultation")
);

-- CreateTable
CREATE TABLE "PrescriptionExamen" (
    "idPrescriptionExamen" SERIAL NOT NULL,
    "consultationId" INTEGER,
    "sejourId" INTEGER,
    "patientId" INTEGER NOT NULL,
    "medecinId" INTEGER NOT NULL,
    "typeExamen" "TypeExamen" NOT NULL,
    "categorieExamen" "CategorieExamen" NOT NULL,
    "nomExamen" TEXT NOT NULL,

    CONSTRAINT "PrescriptionExamen_pkey" PRIMARY KEY ("idPrescriptionExamen")
);

-- CreateTable
CREATE TABLE "PrescriptionMedicament" (
    "idPrescription" SERIAL NOT NULL,
    "consultationId" INTEGER,
    "sejourId" INTEGER,
    "patientId" INTEGER NOT NULL,
    "medecinId" INTEGER NOT NULL,
    "idMedicament" INTEGER,
    "nomMedicament" VARCHAR(200) NOT NULL,
    "dci" TEXT,
    "dose" TEXT NOT NULL,
    "unite" "UniteMedicament" NOT NULL,
    "voieAdministration" "VoieAdministration" NOT NULL,
    "frequence" "Frequence" NOT NULL,
    "duree" INTEGER,
    "dureeUnite" TEXT,
    "dateDebut" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateFin" TIMESTAMP(3),
    "idProtocole" INTEGER,
    "protocoleNom" TEXT,
    "urgente" BOOLEAN NOT NULL DEFAULT false,
    "priorite" "Priorite",
    "valide" BOOLEAN NOT NULL DEFAULT false,
    "dateValidation" TIMESTAMP(3),
    "validateurId" INTEGER,
    "validationPharmacie" BOOLEAN NOT NULL DEFAULT false,
    "alerteInteractions" JSONB,
    "alerteContreIndication" BOOLEAN NOT NULL DEFAULT false,
    "statut" "StatutPrescription" NOT NULL DEFAULT 'prescrit',
    "dateCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "utilisateurCreationId" INTEGER,

    CONSTRAINT "PrescriptionMedicament_pkey" PRIMARY KEY ("idPrescription")
);

-- CreateIndex
CREATE INDEX "Consultation_patientId_idx" ON "Consultation"("patientId");

-- CreateIndex
CREATE INDEX "Consultation_sejourId_idx" ON "Consultation"("sejourId");

-- CreateIndex
CREATE INDEX "PrescriptionMedicament_patientId_idx" ON "PrescriptionMedicament"("patientId");

-- AddForeignKey
ALTER TABLE "Consultation" ADD CONSTRAINT "Consultation_sejourId_fkey" FOREIGN KEY ("sejourId") REFERENCES "Sejour"("idSejour") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consultation" ADD CONSTRAINT "Consultation_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("idPatient") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consultation" ADD CONSTRAINT "Consultation_medecinId_fkey" FOREIGN KEY ("medecinId") REFERENCES "ProfessionnelSante"("idProfessionnel") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consultation" ADD CONSTRAINT "Consultation_serviceConsultationId_fkey" FOREIGN KEY ("serviceConsultationId") REFERENCES "Service"("idService") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consultation" ADD CONSTRAINT "Consultation_utilisateurCreationId_fkey" FOREIGN KEY ("utilisateurCreationId") REFERENCES "Utilisateur"("idUtilisateur") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrescriptionExamen" ADD CONSTRAINT "PrescriptionExamen_consultationId_fkey" FOREIGN KEY ("consultationId") REFERENCES "Consultation"("idConsultation") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrescriptionExamen" ADD CONSTRAINT "PrescriptionExamen_sejourId_fkey" FOREIGN KEY ("sejourId") REFERENCES "Sejour"("idSejour") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrescriptionExamen" ADD CONSTRAINT "PrescriptionExamen_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("idPatient") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrescriptionExamen" ADD CONSTRAINT "PrescriptionExamen_medecinId_fkey" FOREIGN KEY ("medecinId") REFERENCES "ProfessionnelSante"("idProfessionnel") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrescriptionMedicament" ADD CONSTRAINT "PrescriptionMedicament_consultationId_fkey" FOREIGN KEY ("consultationId") REFERENCES "Consultation"("idConsultation") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrescriptionMedicament" ADD CONSTRAINT "PrescriptionMedicament_sejourId_fkey" FOREIGN KEY ("sejourId") REFERENCES "Sejour"("idSejour") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrescriptionMedicament" ADD CONSTRAINT "PrescriptionMedicament_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("idPatient") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrescriptionMedicament" ADD CONSTRAINT "PrescriptionMedicament_medecinId_fkey" FOREIGN KEY ("medecinId") REFERENCES "ProfessionnelSante"("idProfessionnel") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrescriptionMedicament" ADD CONSTRAINT "PrescriptionMedicament_utilisateurCreationId_fkey" FOREIGN KEY ("utilisateurCreationId") REFERENCES "Utilisateur"("idUtilisateur") ON DELETE SET NULL ON UPDATE CASCADE;
