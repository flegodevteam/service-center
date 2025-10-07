const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema(
  {
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true },
    leaveType: { type: String, required: true },
    otherLeaveType: { type: String }, // "Other" type-க்கு
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    days: { type: Number, required: true },
    reason: { type: String, required: true },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
    appliedDate: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Leave", leaveSchema);