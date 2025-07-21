const express = require("express");
const { addAppointment, getAppointments } = require("../controllers/appointmentController");
const router = express.Router();

router.post("/", addAppointment);      // Add appointment
router.get("/", getAppointments);      // Get all appointments

module.exports = router;