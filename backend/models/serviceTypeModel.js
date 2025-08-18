const mongoose = require("mongoose");

const serviceTypeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    category: { type: String },
    vehicleTypes: [{ type: String }], // ["Bike", "Car", "Van", etc.]
    serviceLevels: {
      normal: {
        isActive: { type: Boolean, default: true },
        basePrice: { type: Number, default: 0 },
        options: [{ type: String }], // Sub-options for Normal level
      },
      hard: {
        isActive: { type: Boolean, default: false },
        percentageIncrease: { type: Number, default: 20 }, // % increase over base price
        finalPrice: { type: Number, default: 0 }, // Auto calculated
        options: [{ type: String }], // Sub-options for Hard level
      },
      heavy: {
        isActive: { type: Boolean, default: false },
        percentageIncrease: { type: Number, default: 40 }, // % increase over base price
        finalPrice: { type: Number, default: 0 }, // Auto calculated
        options: [{ type: String }], // Sub-options for Heavy level
      },
    },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

// Calculate final prices automatically
serviceTypeSchema.pre("save", function (next) {
  if (this.serviceLevels.normal.basePrice) {
    const basePrice = this.serviceLevels.normal.basePrice;

    // Calculate Hard level price
    if (this.serviceLevels.hard.isActive) {
      this.serviceLevels.hard.finalPrice =
        basePrice * (1 + this.serviceLevels.hard.percentageIncrease / 100);
    }

    // Calculate Heavy level price
    if (this.serviceLevels.heavy.isActive) {
      this.serviceLevels.heavy.finalPrice =
        basePrice * (1 + this.serviceLevels.heavy.percentageIncrease / 100);
    }
  }
  next();
});

module.exports = mongoose.model("ServiceType", serviceTypeSchema);
