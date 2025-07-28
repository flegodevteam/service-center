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
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const total = await Appointment.countDocuments();
    const appointments = await Appointment.find()
      .skip(skip)
      .limit(limit)
      .populate("customer", "name email phone")
      .populate("vehicle", "make model regNumber");

    res.json({
      success: true,
      appointments,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    next(err);
  }
};
