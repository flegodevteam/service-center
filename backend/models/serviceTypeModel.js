const mongoose = require("mongoose");

const serviceTypeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  category: { type: String },
  basePrice: { type: Number, default: 0 },
  duration: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
});

module.exports = mongoose.model("ServiceType", serviceTypeSchema);
