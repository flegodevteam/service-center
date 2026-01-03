import mongoose from "mongoose";

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
  // Reference to job card(s) for this billing
  jobCard: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "JobCard",
  },
  // Additional charges (one by one, not total)
  additionalCharges: [{
    description: { type: String, required: true },
    amount: { type: Number, required: true },
  }],
  // Inventory items (like auto oil) selected for billing
  inventoryItems: [{
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Inventory",
      required: true,
    },
    quantity: { type: Number, required: true, default: 1 },
    unitPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
  }],
});

export default mongoose.model("Invoice", invoiceSchema);
