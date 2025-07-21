const express = require("express");
const { addItem, getItems } = require("../controllers/inventoryController");
const router = express.Router();

router.post("/", addItem); // Add inventory item
router.get("/", getItems); // Get all inventory items

module.exports = router;
