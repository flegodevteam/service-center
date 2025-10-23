const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true },
    date: { type: String, required: true }, // YYYY-MM-DD
    status: { type: String, enum: ["present", "absent", "late"], default: "absent" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Attendance", attendanceSchema);