const express = require("express");
const cors = require("cors");
const errorHandler = require("./middlewares/error");
// const connectDB = require("./config/db");

const app = express();

// Connect to MongoDB
// connectDB();

// Middleware
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? ["https://your-frontend-domain.vercel.app"]
        : ["http://localhost:3000"],
    credentials: true,
  })
);
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
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/customers", require("./routes/customerRoutes"));
app.use("/api/vehicles", require("./routes/vehicleRoutes"));
app.use("/api/appointments", require("./routes/appointmentRoutes"));
app.use("/api/jobcards", require("./routes/jobCardRoutes"));
app.use("/api/inventory", require("./routes/inventoryRoutes"));
app.use("/api/invoices", require("./routes/billingRoutes"));
app.use("/api/service-config", require("./routes/serviceTypeRoutes"));
app.use("/api/reports", require("./routes/reportsRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/test", require("./routes/testRoutes"));
app.use("/api/employees", require("./routes/employeeRoutes"));
app.use("/api/attendance", require("./routes/attendanceRoutes"));

// Error Handler
app.use(errorHandler);

module.exports = app;
