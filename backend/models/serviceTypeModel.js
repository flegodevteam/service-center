import mongoose from "mongoose";

const ServiceTypeSchema = new mongoose.Schema({
  vehicleTypes: [{ type: String, required: true }],
  serviceTypes: [{ type: String, required: true }],
  serviceLevels: [
    { type: String, enum: ["normal", "hard", "heavy"], required: true },
  ],
  serviceLevelOptions: [{ type: String }],

  
   pricingConfig: {
    basePrice: { type: Number, default: 0 },
    hardIncrease: { type: Number, default: 20 },
    heavyIncrease: { type: Number, default: 40 },
  },
});

export default mongoose.model("ServiceTypeConfig", ServiceTypeSchema);
