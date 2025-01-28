import express from "express";
import cors from "cors";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { createReport, getReport, getNearbyReports, updateReportStatus, getAllReports } from "./controllers/report.controller.js";
import { createEmergency, getAllEmergencies, updateEmergencyStatus } from "./controllers/emergency.controller.js";

const app = express();
const PORT = 5001;

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Crime Report API",
      version: "1.0.0",
      description: "API for community crime reporting system"
    },
    servers: [
      { url: "http://localhost:5001" },
      { url: "https://crime-report-api.onrender.com" }
    ]
  },
  apis: ["./controllers/*.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// CORS configuration
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  credentials: false
}));

// Enable pre-flight requests
app.options('*', cors());

// Swagger UI setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware
app.use(express.json());

// Static folder for uploaded files
app.use('/uploads', express.static('uploads'));

// Report Routes
app.post("/api/reports", createReport);
app.get("/api/reports/:trackingNumber", getReport);
app.get("/api/reports/nearby", getNearbyReports);
app.get("/api/reports", getAllReports);
app.patch("/api/reports/:trackingNumber/status", updateReportStatus);
app.post('/api/emergency', createEmergency);
app.patch('/api/emergency/:id/status', updateEmergencyStatus);
app.get('/api/emergency', getAllEmergencies);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Handle 404 routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`API Documentation available at http://localhost:${PORT}/api-docs`);
});