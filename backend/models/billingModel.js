const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
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
  amount: { type: Number, required: true },
  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "cancelled"],
    default: "pending",
  },
  paymentMethod: { type: String, default: "Pending" },
});

module.exports = mongoose.model("Invoice", invoiceSchema);
