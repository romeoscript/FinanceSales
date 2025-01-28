-- CreateEnum
CREATE TYPE "EmergencyStatus" AS ENUM ('PENDING', 'RESPONDED', 'RESOLVED');

-- CreateTable
CREATE TABLE "Emergency" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "EmergencyStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "Emergency_pkey" PRIMARY KEY ("id")
);
