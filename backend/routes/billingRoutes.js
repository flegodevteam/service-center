const express = require("express");
const { addInvoice, getInvoices } = require("../controllers/billingController");
const router = express.Router();

router.post("/", addInvoice); // Add invoice
router.get("/", getInvoices); // Get all invoices

module.exports = router;
