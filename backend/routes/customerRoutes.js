const express = require("express");
const {
  addCustomer,
  getCustomers,
} = require("../controllers/customerController");
const router = express.Router();

router.post("/", addCustomer); // Add customer
router.get("/", getCustomers); // Get all customers

module.exports = router;
