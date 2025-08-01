const mongoose = require("mongoose");

const jobCardSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicle",
    required: true,
  },
  date: { type: Date, required: true },
  services: [{ type: String, required: true }],
  status: {
    type: String,
    enum: ["pending", "in-progress", "completed", "cancelled"],
    default: "pending",
  },
  technician: { type: String, required: true },
  totalAmount: { type: Number, required: true },
});

module.exports = mongoose.model("JobCard", jobCardSchema);
