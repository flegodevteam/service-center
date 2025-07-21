const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  stock: { type: Number, required: true },
  minStock: { type: Number, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  status: { type: String, enum: ["in-stock", "low-stock", "out-of-stock"], default: "in-stock" },
});

module.exports = mongoose.model("Inventory", inventorySchema);