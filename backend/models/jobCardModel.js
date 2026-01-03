import mongoose from "mongoose";

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
  vehicleType: { type: String }, // ADD THIS
  serviceType: { type: String }, // ADD THIS
  serviceLevel: { type: String }, // ADD THIS
  serviceOption: { type: String }, // ADD THIS
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

export default mongoose.model("JobCard", jobCardSchema);
