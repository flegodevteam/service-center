import express from "express";
import {
  addAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointmentStatus,
} from "../controllers/appointmentController.js";
const router = express.Router();

router.post("/", addAppointment); // Add appointment
router.get("/", getAppointments); // Get all appointments
router.get("/:id", getAppointmentById); // Get single appointment by ID
router.patch("/:id/status", updateAppointmentStatus); // Update status

export default router;
