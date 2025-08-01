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

// Get single appointment by ID
exports.getAppointmentById = async (req, res, next) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate("customer", "name email phone")
      .populate("vehicle", "make model regNumber year vin");
    if (!appointment) {
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found" });
    }
    res.json({ success: true, appointment });
  } catch (err) {
    next(err);
  }
};

// Update appointment status
exports.updateAppointmentStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )
      .populate("customer", "name email phone")
      .populate("vehicle", "make model regNumber");
    if (!appointment) {
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found" });
    }
    res.json({ success: true, appointment });
  } catch (err) {
    next(err);
  }
};
