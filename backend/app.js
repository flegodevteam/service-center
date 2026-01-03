import express from "express";
import cors from "cors";
import errorHandler from "./middlewares/error.js";
// import connectDB from "./config/db.js";

const app = express();

// Connect to MongoDB
// connectDB();

// CORS Configuration - Must be BEFORE routes
const allowedOrigins = [
  "https://service-center-xi.vercel.app",
  "http://localhost:3000"
];

// Handle preflight requests
app.options("*", cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

// Apply CORS middleware
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// Other Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Simple test endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Service Center API is running!",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    message: "Backend is healthy and responding",
  });
});

// Test endpoint for debugging
app.get("/api/test", (req, res) => {
  res.json({
    message: "Test endpoint working!",
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV,
    mongoUri: process.env.MONGO_URI ? "Set" : "Not set",
  });
});

// Routes
import authRoutes from "./routes/authRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import vehicleRoutes from "./routes/vehicleRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import jobCardRoutes from "./routes/jobCardRoutes.js";
import inventoryRoutes from "./routes/inventoryRoutes.js";
import billingRoutes from "./routes/billingRoutes.js";
import serviceTypeRoutes from "./routes/serviceTypeRoutes.js";
import reportsRoutes from "./routes/reportsRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import leaveRoutes from "./routes/leaveRoutes.js";
import payrollRoutes from "./routes/payrollRoutes.js";
import deductionsRoutes from "./routes/deductionsRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";

app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/jobcards", jobCardRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/invoices", billingRoutes);
app.use("/api/service-config", serviceTypeRoutes);
app.use("/api/reports", reportsRoutes);
app.use("/api/users", userRoutes);
app.use("/api/test", testRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/leaves", leaveRoutes);
app.use("/api/payrolls", payrollRoutes);
app.use("/api/deductions", deductionsRoutes);
app.use("/api/attendance", attendanceRoutes);


// Error Handler
app.use(errorHandler);

export default app;
