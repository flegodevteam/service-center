import Inventory from "../models/inventoryModel.js";
import bwipjs from "bwip-js";

// Add new inventory item
export const addItem = async (req, res, next) => {
  try {
    const item = await Inventory.create(req.body);
    res.status(201).json({ success: true, item });
  } catch (err) {
    next(err);
  }
};

// Get all inventory items
export const getItems = async (req, res, next) => {
  try {
    const items = await Inventory.find();
    res.json({ success: true, items });
  } catch (err) {
    next(err);
  }
};

// Search inventory by name or barcode
export const searchInventory = async (req, res, next) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    // Search by name or barcode (case insensitive)
    const items = await Inventory.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { barcode: { $regex: query, $options: "i" } },
      ],
    }).limit(20); // Limit results for performance

    res.json({ success: true, items });
  } catch (err) {
    next(err);
  }
};

// Generate barcode image (PNG) for an inventory item
export const generateBarcode = async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await Inventory.findOne({ id });
    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    }

    // Use existing barcode value or fall back to the item id
    let codeText = item.barcode || item.id;

    // If no barcode exists, save item.id as barcode so future calls are consistent
    if (!item.barcode) {
      item.barcode = codeText;
      await item.save();
    }

    // Generate PNG buffer using bwip-js (Code128 is flexible for product labels)
    const png = await bwipjs.toBuffer({
      bcid: "code128",
      text: codeText,
      scale: 3,
      height: 50,
      includetext: true,
      textxalign: "center",
    });

    res.set("Content-Type", "image/png");
    res.send(png);
  } catch (err) {
    next(err);
  }
};
