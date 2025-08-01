const express = require("express");
const {
  addAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointmentStatus,
} = require("../controllers/appointmentController");
const router = express.Router();

router.post("/", addAppointment); // Add appointment
router.get("/", getAppointments); // Get all appointments
router.get("/:id", getAppointmentById); // Get single appointment by ID
router.patch("/:id/status", updateAppointmentStatus); // Update status

module.exports = router;
