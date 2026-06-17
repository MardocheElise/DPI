-- CreateTable
CREATE TABLE "ProfessionnelSante" (
    "idProfessionnel" SERIAL NOT NULL,
    "matricule" VARCHAR(20) NOT NULL,
    "nom" VARCHAR(100) NOT NULL,
    "prenom" VARCHAR(100) NOT NULL,
    "dateNaissance" TIMESTAMP(3),
    "specialite" VARCHAR(100),
    "fonction" VARCHAR(100),
    "serviceRattachement" VARCHAR(100),
    "email" VARCHAR(100),
    "telephone" VARCHAR(20),
    "carteCps" VARCHAR(20),
    "dateEmbauche" TIMESTAMP(3),
    "actif" BOOLEAN NOT NULL DEFAULT true,
    "dateCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModification" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProfessionnelSante_pkey" PRIMARY KEY ("idProfessionnel")
);

-- CreateTable
CREATE TABLE "RoleUtilisateur" (
    "idRole" SERIAL NOT NULL,
    "nomRole" VARCHAR(50) NOT NULL,
    "description" TEXT,
    "permissions" JSONB,
    "dateCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RoleUtilisateur_pkey" PRIMARY KEY ("idRole")
);

-- CreateTable
CREATE TABLE "Utilisateur" (
    "idUtilisateur" SERIAL NOT NULL,
    "idProfessionnel" INTEGER,
    "idRole" INTEGER NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "passwordHash" VARCHAR(255) NOT NULL,
    "actif" BOOLEAN NOT NULL DEFAULT true,
    "lastLogin" TIMESTAMP(3),
    "dateCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Utilisateur_pkey" PRIMARY KEY ("idUtilisateur")
);

-- CreateTable
CREATE TABLE "Service" (
    "idService" SERIAL NOT NULL,
    "nomService" VARCHAR(100) NOT NULL,
    "typeService" VARCHAR(50),
    "chefServiceId" INTEGER,
    "capaciteLits" INTEGER NOT NULL DEFAULT 0,
    "telephone" VARCHAR(20),
    "email" VARCHAR(100),
    "actif" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("idService")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProfessionnelSante_matricule_key" ON "ProfessionnelSante"("matricule");

-- CreateIndex
CREATE UNIQUE INDEX "ProfessionnelSante_carteCps_key" ON "ProfessionnelSante"("carteCps");

-- CreateIndex
CREATE UNIQUE INDEX "RoleUtilisateur_nomRole_key" ON "RoleUtilisateur"("nomRole");

-- CreateIndex
CREATE UNIQUE INDEX "Utilisateur_idProfessionnel_key" ON "Utilisateur"("idProfessionnel");

-- CreateIndex
CREATE UNIQUE INDEX "Utilisateur_username_key" ON "Utilisateur"("username");

-- AddForeignKey
ALTER TABLE "Utilisateur" ADD CONSTRAINT "Utilisateur_idProfessionnel_fkey" FOREIGN KEY ("idProfessionnel") REFERENCES "ProfessionnelSante"("idProfessionnel") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Utilisateur" ADD CONSTRAINT "Utilisateur_idRole_fkey" FOREIGN KEY ("idRole") REFERENCES "RoleUtilisateur"("idRole") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_chefServiceId_fkey" FOREIGN KEY ("chefServiceId") REFERENCES "ProfessionnelSante"("idProfessionnel") ON DELETE SET NULL ON UPDATE CASCADE;
