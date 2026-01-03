import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  vehicles: { type: Number, required: true },
  lastService: { type: Date, required: true },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
});

export default mongoose.model("Customer", customerSchema);
