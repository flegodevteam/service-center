const express = require("express");
const router = express.Router();

const {
  addCustomer,
  getCustomers,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customerController");

router.post("/", addCustomer); // Add customer
router.get("/", getCustomers); // Get all customers
router.put("/:id", updateCustomer); // Update customer
router.delete("/:id", deleteCustomer); // Delete customer

module.exports = router;
