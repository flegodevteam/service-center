import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  regNumber: { type: String, required: true },
  vin: { type: String, required: true },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  }, // customer id
  lastService: { type: Date, required: true },
  nextService: { type: Date, required: true },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  notes: { type: String },
});

export default mongoose.model("Vehicle", vehicleSchema);
