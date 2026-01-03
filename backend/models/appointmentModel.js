import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
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
  vehicleType: { type: String },
  serviceType: { type: String },
  serviceLevel: { type: String },
  serviceOption: { type: String },
  date: { type: String, required: true },
  time: { type: String, required: true },
  technician: { type: String, required: true },
  notes: { type: String },
  status: {
    type: String,
    enum: ["scheduled", "in-progress", "completed", "cancelled"],
    default: "scheduled",
  },
});

export default mongoose.model("Appointment", appointmentSchema);
