import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import cloudinary from "../lib/cloudinary.js";
import upload from "../middleware/upload.js";
import fs from "fs";

const db = new PrismaClient();
dotenv.config();

export async function createEmergency(req, res) {
    try {
      const { description } = req.body;
  
      // Validate required field
      if (!description) {
        return res.status(400).json({ 
          success: false,
          message: "Description is required for emergency reports." 
        });
      }
  
      // Create the emergency report
      const emergency = await db.emergency.create({
        data: {
          description,
          status: 'PENDING'
        }
      });
  
      return res.status(201).json({
        success: true,
        data: {
          id: emergency.id,
          status: emergency.status,
          message: 'Emergency report created successfully.'
        }
      });
    } catch (error) {
      console.error('Error creating emergency report:', error);
      return res.status(500).json({
        success: false,
        message: "Failed to create emergency report",
        error: error.message
      });
    }
  }
  
  /**
   * @swagger
   * /api/emergency/{id}/status:
   *   patch:
   *     tags:
   *       - Emergency
   *     description: Update emergency status
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   */
  export async function updateEmergencyStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
  
      const validStatuses = ['RESPONDED', 'RESOLVED'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Invalid status value"
        });
      }
  
      const emergency = await db.emergency.update({
        where: { id: parseInt(id) },
        data: { status }
      });
  
      return res.status(200).json({
        success: true,
        data: {
          id: emergency.id,
          status: emergency.status
        }
      });
    } catch (error) {
      console.error('Error updating emergency status:', error);
      return res.status(500).json({
        success: false,
        message: "Failed to update emergency status"
      });
    }
  }
  
  /**
   * @swagger
   * /api/emergency:
   *   get:
   *     tags:
   *       - Emergency
   *     description: Get all emergency reports
   *     parameters:
   *       - in: query
   *         name: status
   *         schema:
   *           type: string
   *           enum: [PENDING, RESPONDED, RESOLVED]
   */
  export async function getAllEmergencies(req, res) {
    try {
      const whereCondition = {};
      if (req.query.status) {
        whereCondition.status = req.query.status;
      }
  
      const emergencies = await db.emergency.findMany({
        where: whereCondition,
        orderBy: {
          createdAt: 'desc'
        }
      });
  
      return res.status(200).json({
        success: true,
        data: emergencies
      });
    } catch (error) {
      console.error('Error fetching emergencies:', error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch emergencies"
      });
    }
  }