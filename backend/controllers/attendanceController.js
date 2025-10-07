const Attendance = require("../models/attendanceModal");

// Add attendance
exports.createAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.create(req.body);
    res.status(201).json(attendance);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all attendance
exports.getAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find().populate("employeeId");
    res.json(attendance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
