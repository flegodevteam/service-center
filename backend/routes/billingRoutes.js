import express from "express";
import {
  addInvoice,
  getInvoices,
  downloadInvoicePDF,
  processPayment,
} from "../controllers/billingController.js";
const router = express.Router();

router.post("/", addInvoice); // Add invoice
router.get("/", getInvoices); // Get all invoices
router.get("/:id/pdf", downloadInvoicePDF); // Download invoice as PDF
router.put("/:id/pay", processPayment);

export default router;
