const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true },
    date: { type: String, required: true },
    checkIn: { type: String, required: true },
    checkOut: { type: String },
    hoursWorked: { type: Number, default: 0 },
    overtimeHours: { type: Number, default: 0 },
    status: { type: String, enum: ["present", "late", "absent"], required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Attendance", attendanceSchema);