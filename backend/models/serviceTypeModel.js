const mongoose = require("mongoose");

const ServiceTypeSchema = new mongoose.Schema({
  vehicleTypes: [{ type: String, required: true }],
  serviceTypes: [{ type: String, required: true }],
  serviceLevels: [
    { type: String, enum: ["normal", "hard", "heavy"], required: true },
  ],
  serviceLevelOptions: [{ type: String }],
});

module.exports = mongoose.model("ServiceTypeConfig", ServiceTypeSchema);
