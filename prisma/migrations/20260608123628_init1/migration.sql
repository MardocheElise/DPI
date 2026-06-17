-- CreateEnum
CREATE TYPE "Sexe" AS ENUM ('M', 'F');

-- CreateEnum
CREATE TYPE "TypeAllergie" AS ENUM ('medicament', 'aliment', 'autre');

-- CreateEnum
CREATE TYPE "SeveriteAllergie" AS ENUM ('legere', 'moderee', 'grave', 'vitale');

-- CreateEnum
CREATE TYPE "TypeAntecedent" AS ENUM ('maladie', 'chirurgie', 'hospitalisation', 'grossesse', 'accident');

-- CreateEnum
CREATE TYPE "ParentFamilial" AS ENUM ('pere', 'mere', 'frere', 'soeur', 'enfant', 'grand_parent');

-- CreateTable
CREATE TABLE "Patient" (
    "idPatient" SERIAL NOT NULL,
    "ins" VARCHAR(20) NOT NULL,
    "numeroDossier" VARCHAR(20) NOT NULL,
    "nom" VARCHAR(100) NOT NULL,
    "prenom" VARCHAR(100) NOT NULL,
    "nomMari" VARCHAR(100),
    "dateNaissance" TIMESTAMP(3) NOT NULL,
    "lieuNaissance" VARCHAR(200),
    "sexe" "Sexe" NOT NULL,
    "nationalite" VARCHAR(50),
    "adresse" VARCHAR(255),
    "commune" VARCHAR(100),
    "ville" VARCHAR(100),
    "telephone" VARCHAR(20),
    "email" VARCHAR(100),
    "situationMatrimoniale" VARCHAR(30),
    "profession" VARCHAR(100),
    "employeur" VARCHAR(100),
    "groupeSanguin" VARCHAR(5),
    "rhesus" VARCHAR(2),
    "numeroSecuriteSociale" VARCHAR(50),
    "assuranceNom" VARCHAR(100),
    "assuranceNumero" VARCHAR(50),
    "tauxCouverture" DECIMAL(5,2),
    "contactUrgenceNom" VARCHAR(100),
    "contactUrgenceTel" VARCHAR(20),
    "contactUrgenceLien" VARCHAR(50),
    "contactUrgenceNom2" VARCHAR(100),
    "contactUrgenceTel2" VARCHAR(20),
    "medecinTraitant" VARCHAR(100),
    "medecinTraitantTel" VARCHAR(20),
    "photoPath" VARCHAR(255),
    "nonOppositionDmp" BOOLEAN NOT NULL DEFAULT true,
    "fichierDmp" VARCHAR(50),
    "dateInscription" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModification" TIMESTAMP(3) NOT NULL,
    "dernierAccess" TIMESTAMP(3),
    "utilisateurDernierAccess" INTEGER,
    "sexeIdSexe" INTEGER NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("idPatient")
);

-- CreateTable
CREATE TABLE "Allergie" (
    "idAllergie" SERIAL NOT NULL,
    "patientId" INTEGER NOT NULL,
    "typeAllergie" "TypeAllergie" NOT NULL,
    "nomAllergie" VARCHAR(200) NOT NULL,
    "description" TEXT,
    "severite" "SeveriteAllergie",
    "dateDeclaration" TIMESTAMP(3),
    "actif" BOOLEAN NOT NULL DEFAULT true,
    "dateCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Allergie_pkey" PRIMARY KEY ("idAllergie")
);

-- CreateTable
CREATE TABLE "AntecedentPersonnel" (
    "idAntecedent" SERIAL NOT NULL,
    "patientId" INTEGER NOT NULL,
    "typeAntecedent" "TypeAntecedent" NOT NULL,
    "nomAntecedent" VARCHAR(200) NOT NULL,
    "dateSurvenue" TIMESTAMP(3),
    "ageSurvenue" INTEGER,
    "description" TEXT,
    "traitementActuel" BOOLEAN NOT NULL DEFAULT false,
    "traite" BOOLEAN NOT NULL DEFAULT true,
    "actif" BOOLEAN NOT NULL DEFAULT true,
    "dateCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AntecedentPersonnel_pkey" PRIMARY KEY ("idAntecedent")
);

-- CreateTable
CREATE TABLE "AntecedentFamilial" (
    "idAntecedentFam" SERIAL NOT NULL,
    "patientId" INTEGER NOT NULL,
    "parent" "ParentFamilial",
    "typeMaladie" VARCHAR(100) NOT NULL,
    "nomMaladie" VARCHAR(200),
    "description" TEXT,
    "actif" BOOLEAN NOT NULL DEFAULT true,
    "dateCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AntecedentFamilial_pkey" PRIMARY KEY ("idAntecedentFam")
);

-- CreateIndex
CREATE UNIQUE INDEX "Patient_ins_key" ON "Patient"("ins");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_numeroDossier_key" ON "Patient"("numeroDossier");

-- CreateIndex
CREATE INDEX "Patient_nom_idx" ON "Patient"("nom");

-- CreateIndex
CREATE INDEX "Patient_prenom_idx" ON "Patient"("prenom");

-- CreateIndex
CREATE INDEX "Patient_ins_idx" ON "Patient"("ins");

-- CreateIndex
CREATE INDEX "Patient_numeroDossier_idx" ON "Patient"("numeroDossier");

-- CreateIndex
CREATE INDEX "Patient_dateNaissance_idx" ON "Patient"("dateNaissance");

-- CreateIndex
CREATE INDEX "Allergie_patientId_idx" ON "Allergie"("patientId");

-- CreateIndex
CREATE INDEX "AntecedentPersonnel_patientId_idx" ON "AntecedentPersonnel"("patientId");

-- CreateIndex
CREATE INDEX "AntecedentFamilial_patientId_idx" ON "AntecedentFamilial"("patientId");

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_utilisateurDernierAccess_fkey" FOREIGN KEY ("utilisateurDernierAccess") REFERENCES "Utilisateur"("idUtilisateur") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Allergie" ADD CONSTRAINT "Allergie_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("idPatient") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AntecedentPersonnel" ADD CONSTRAINT "AntecedentPersonnel_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("idPatient") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AntecedentFamilial" ADD CONSTRAINT "AntecedentFamilial_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("idPatient") ON DELETE CASCADE ON UPDATE CASCADE;
