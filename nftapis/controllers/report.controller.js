import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import cloudinary from "../lib/cloudinary.js";
import upload from "../middleware/upload.js";
import fs from "fs";

const db = new PrismaClient();
dotenv.config();

function generateTrackingNumber() {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `CR${year}${month}-${random}`;
}

/**
 * @swagger
 * /api/reports:
 *   post:
 *     tags:
 *       - Reports
 *     description: Create a new incident report
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [THEFT, VANDALISM, ASSAULT, SUSPICIOUS_ACTIVITY, OTHER]
 *               description:
 *                 type: string
 *               location:
 *                 type: string
 *               latitude:
 *                 type: number
 *               longitude:
 *                 type: number
 *               detailedAddress:
 *                 type: string
 *               contactEmail:
 *                 type: string
 *               contactPhone:
 *                 type: string
 *               evidence:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 */
export async function createReport(req, res) {
  try {
    // Handle file uploads
    await new Promise((resolve, reject) => {
      upload.array("evidence", 5)(req, res, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve(true);
        }
      });
    });

    const {
      type,
      description,
      location,
      latitude,
      longitude,
      detailedAddress,
      contactEmail,
      contactPhone
    } = req.body;

    // Validate required fields
    if (!type || !description || !location || !latitude || !longitude) {
      // Clean up uploaded files if validation fails
      if (req.files) {
        req.files.forEach(file => {
          fs.unlinkSync(file.path);
        });
      }
      return res.status(400).json({ 
        success: false,
        message: "Missing required fields." 
      });
    }

    // Upload evidence files to cloudinary if present
    const evidenceFiles = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        try {
          const result = await cloudinary.uploader.upload(file.path, {
            folder: "ReportEvidence",
            resource_type: "auto"
          });
          
          evidenceFiles.push({
            fileUrl: result.secure_url,
            fileType: file.mimetype
          });

          // Clean up local file after successful upload
          fs.unlinkSync(file.path);
        } catch (uploadError) {
          console.error('Cloudinary upload error:', uploadError);
          // Continue with other files if one fails
          continue;
        }
      }
    }

    // Create the report with evidence
    const report = await db.report.create({
      data: {
        trackingNumber: generateTrackingNumber(),
        type,
        description,
        location,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        detailedAddress,
        contactEmail,
        contactPhone,
        evidence: {
          create: evidenceFiles
        },
        statusUpdates: {
          create: {
            status: 'SUBMITTED',
            comment: 'Report submitted successfully'
          }
        }
      },
      include: {
        evidence: true,
        statusUpdates: true
      }
    });

    return res.status(201).json({
      success: true,
      data: {
        trackingNumber: report.trackingNumber,
        status: report.status,
        evidence: report.evidence,
        message: 'Report created successfully. Keep your tracking number for future reference.'
      }
    });
  } catch (error) {
    // Clean up any uploaded files if there's an error
    if (req.files) {
      req.files.forEach(file => {
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      });
    }

    console.error('Error creating report:', error);
    return res.status(500).json({
      success: false,
      message: "Failed to create report",
      error: error.message
    });
  }
}

/**
 * @swagger
 * /api/reports/{trackingNumber}:
 *   get:
 *     tags:
 *       - Reports
 *     description: Get report details by tracking number
 */
export async function getReport(req, res) {
  try {
    const { trackingNumber } = req.params;

    const report = await db.report.findUnique({
      where: { trackingNumber },
      include: {
        evidence: true,
        statusUpdates: {
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: report
    });
  } catch (error) {
    console.error('Error fetching report:', error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch report"
    });
  }
}

/**
 * @swagger
 * /api/reports/nearby:
 *   get:
 *     tags:
 *       - Reports
 *     description: Get reports near a location
 */
export async function getNearbyReports(req, res) {
  try {
    const { latitude, longitude, radius = 5 } = req.query;
    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);
    const rad = parseFloat(radius);

    if (isNaN(lat) || isNaN(lng)) {
      return res.status(400).json({
        success: false,
        message: "Invalid latitude or longitude"
      });
    }

    // Using Haversine formula
    const reports = await db.$queryRaw`
      SELECT 
        id, tracking_number, type, status, location, latitude, longitude,
        ( 6371 * acos( cos( radians(${lat}) ) 
          * cos( radians( latitude ) )
          * cos( radians( longitude ) - radians(${lng}) )
          + sin( radians(${lat}) )
          * sin( radians( latitude ) ) ) )
        AS distance
      FROM "Report"
      HAVING distance < ${rad}
      ORDER BY distance
    `;

    return res.status(200).json({
      success: true,
      data: reports
    });
  } catch (error) {
    console.error('Error fetching nearby reports:', error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch nearby reports"
    });
  }
}

/**
 * @swagger
 * /api/reports/{trackingNumber}/status:
 *   patch:
 *     tags:
 *       - Reports
 *     description: Update report status
 */
export async function updateReportStatus(req, res) {
  try {
    const { trackingNumber } = req.params;
    const { status, comment } = req.body;

    const validStatuses = ['PROCESSING', 'INVESTIGATING', 'RESOLVED'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value"
      });
    }

    const report = await db.report.update({
      where: { trackingNumber },
      data: {
        status,
        statusUpdates: {
          create: {
            status,
            comment
          }
        }
      },
      include: {
        statusUpdates: {
          orderBy: { createdAt: 'desc' },
          take: 1
        }
      }
    });

    return res.status(200).json({
      success: true,
      data: {
        trackingNumber: report.trackingNumber,
        status: report.status,
        latestUpdate: report.statusUpdates[0]
      }
    });
  } catch (error) {
    console.error('Error updating report status:', error);
    return res.status(500).json({
      success: false,
      message: "Failed to update report status"
    });
  }
}