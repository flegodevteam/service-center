import express from "express";
const router = express.Router();

import {
  addCustomer,
  getCustomers,
  updateCustomer,
  deleteCustomer,
} from "../controllers/customerController.js";

router.post("/", addCustomer); // Add customer
router.get("/", getCustomers); // Get all customers
router.put("/:id", updateCustomer); // Update customer
router.delete("/:id", deleteCustomer); // Delete customer

export default router;
