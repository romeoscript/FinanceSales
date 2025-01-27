-- CreateEnum
CREATE TYPE "ReportType" AS ENUM ('THEFT', 'VANDALISM', 'ASSAULT', 'SUSPICIOUS_ACTIVITY', 'OTHER');

-- CreateEnum
CREATE TYPE "ReportStatus" AS ENUM ('SUBMITTED', 'PROCESSING', 'INVESTIGATING', 'RESOLVED');

-- CreateTable
CREATE TABLE "Report" (
    "id" SERIAL NOT NULL,
    "trackingNumber" TEXT NOT NULL,
    "type" "ReportType" NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "detailedAddress" TEXT NOT NULL,
    "contactEmail" TEXT,
    "contactPhone" TEXT,
    "status" "ReportStatus" NOT NULL DEFAULT 'SUBMITTED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Evidence" (
    "id" SERIAL NOT NULL,
    "reportId" INTEGER NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Evidence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StatusUpdate" (
    "id" SERIAL NOT NULL,
    "reportId" INTEGER NOT NULL,
    "status" "ReportStatus" NOT NULL,
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StatusUpdate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Report_trackingNumber_key" ON "Report"("trackingNumber");

-- CreateIndex
CREATE INDEX "Report_latitude_longitude_idx" ON "Report"("latitude", "longitude");

-- AddForeignKey
ALTER TABLE "Evidence" ADD CONSTRAINT "Evidence_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StatusUpdate" ADD CONSTRAINT "StatusUpdate_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report"("id") ON DELETE CASCADE ON UPDATE CASCADE;
