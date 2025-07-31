const express = require("express");
const {
  addInvoice,
  getInvoices,
  downloadInvoicePDF,
} = require("../controllers/billingController");
const router = express.Router();

router.post("/", addInvoice); // Add invoice
router.get("/", getInvoices); // Get all invoices
router.get("/:id/pdf", downloadInvoicePDF); // Download invoice as PDF
router.put(
  "/:id/pay",
  require("../controllers/billingController").processPayment
);

module.exports = router;
