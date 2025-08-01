const express = require("express");
const cors = require("cors");
const errorHandler = require("./middlewares/error");
const connectDB = require("./config/db");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/customers", require("./routes/customerRoutes"));
app.use("/api/vehicles", require("./routes/vehicleRoutes"));
app.use("/api/appointments", require("./routes/appointmentRoutes"));
app.use("/api/jobcards", require("./routes/jobCardRoutes"));
app.use("/api/inventory", require("./routes/inventoryRoutes"));
app.use("/api/invoices", require("./routes/billingRoutes"));
app.use("/api/service-types", require("./routes/serviceTypeRoutes"));
app.use("/api/reports", require("./routes/reportsRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// Error Handler
app.use(errorHandler);

module.exports = app;
