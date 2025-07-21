const Appointment = require("../models/appointmentModel");

// Add new appointment
exports.addAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.create(req.body);
    // Populate customer & vehicle details
    const populatedAppointment = await Appointment.findById(appointment._id)
      .populate("customer", "name email phone")
      .populate("vehicle", "make model regNumber");
    res.status(201).json({ success: true, appointment: populatedAppointment });
  } catch (err) {
    next(err);
  }
};

// Get all appointments (with customer & vehicle details)
exports.getAppointments = async (req, res, next) => {
  try {
    const appointments = await Appointment.find()
      .populate("customer", "name email phone")
      .populate("vehicle", "make model regNumber");
    res.json({ success: true, appointments });
  } catch (err) {
    next(err);
  }
};
