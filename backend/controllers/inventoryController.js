const Inventory = require("../models/inventoryModel");

// Add new inventory item
exports.addItem = async (req, res, next) => {
  try {
    const item = await Inventory.create(req.body);
    res.status(201).json({ success: true, item });
  } catch (err) {
    next(err);
  }
};

// Get all inventory items
exports.getItems = async (req, res, next) => {
  try {
    const items = await Inventory.find();
    res.json({ success: true, items });
  } catch (err) {
    next(err);
  }
};
