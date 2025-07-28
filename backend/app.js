const express = require("express");
const cors = require("cors");
const errorHandler = require("./middlewares/error");
const connectDB = require("./config/db");

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Content-Disposition"],
  })
);
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/customers", require("./routes/customerRoutes"));
app.use("/api/vehicles", require("./routes/vehicleRoutes"));
app.use("/api/appointments", require("./routes/appointmentRoutes"));
app.use("/api/jobcards", require("./routes/jobCardRoutes"));
app.use("/api/inventory", require("./routes/inventoryRoutes"));
app.use("/api/invoices", require("./routes/billingRoutes"));

// Error Handler
app.use(errorHandler);

module.exports = app;
