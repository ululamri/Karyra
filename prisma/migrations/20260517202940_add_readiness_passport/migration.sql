-- CreateEnum
CREATE TYPE "ProofType" AS ENUM ('LEARNING', 'PARTICIPATION', 'READINESS');

-- CreateEnum
CREATE TYPE "ReadinessLevel" AS ENUM ('BEGINNER', 'LEARNING', 'READY', 'COMMUNITY_READY');

-- CreateTable
CREATE TABLE "readiness_profiles" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "level" "ReadinessLevel" NOT NULL DEFAULT 'BEGINNER',
    "totalXp" INTEGER NOT NULL DEFAULT 0,
    "completedCourses" INTEGER NOT NULL DEFAULT 0,
    "approvedQuests" INTEGER NOT NULL DEFAULT 0,
    "workshopsJoined" INTEGER NOT NULL DEFAULT 0,
    "readinessScore" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "readiness_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "proof_records" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "readinessProfileId" TEXT,
    "type" "ProofType" NOT NULL,
    "title" VARCHAR(160) NOT NULL,
    "description" TEXT,
    "source" VARCHAR(80),
    "sourceId" TEXT,
    "xpValue" INTEGER NOT NULL DEFAULT 0,
    "metadata" JSONB,
    "archivedToFilecoin" BOOLEAN NOT NULL DEFAULT false,
    "filecoinCid" VARCHAR(160),
    "issuedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "proof_records_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "readiness_profiles_userId_key" ON "readiness_profiles"("userId");

-- CreateIndex
CREATE INDEX "readiness_profiles_level_idx" ON "readiness_profiles"("level");

-- CreateIndex
CREATE INDEX "proof_records_userId_idx" ON "proof_records"("userId");

-- CreateIndex
CREATE INDEX "proof_records_type_idx" ON "proof_records"("type");

-- CreateIndex
CREATE INDEX "proof_records_issuedAt_idx" ON "proof_records"("issuedAt");

-- AddForeignKey
ALTER TABLE "readiness_profiles" ADD CONSTRAINT "readiness_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "proof_records" ADD CONSTRAINT "proof_records_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "proof_records" ADD CONSTRAINT "proof_records_readinessProfileId_fkey" FOREIGN KEY ("readinessProfileId") REFERENCES "readiness_profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
