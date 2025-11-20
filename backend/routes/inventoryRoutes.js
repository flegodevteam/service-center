const express = require("express");
const {
  addItem,
  getItems,
  searchInventory,
  generateBarcode,
} = require("../controllers/inventoryController");
const router = express.Router();

router.post("/", addItem); // Add inventory item
router.get("/", getItems); // Get all inventory items
router.get("/search", searchInventory); // Search inventory by name or barcode
router.get("/:id/barcode", generateBarcode); // Generate or fetch barcode image for item

module.exports = router;
