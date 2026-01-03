import express from "express";
import {
  addItem,
  getItems,
  searchInventory,
  generateBarcode,
} from "../controllers/inventoryController.js";
const router = express.Router();

router.post("/", addItem); // Add inventory item
router.get("/", getItems); // Get all inventory items
router.get("/search", searchInventory); // Search inventory by name or barcode
router.get("/:id/barcode", generateBarcode); // Generate or fetch barcode image for item

export default router;
