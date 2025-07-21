const Customer = require("../models/customerModel");

// Add new customer
exports.addCustomer = async (req, res, next) => {
  try {
    const customer = await Customer.create(req.body);
    res.status(201).json({ success: true, customer });
  } catch (err) {
    next(err);
  }
};

// Get all customers
exports.getCustomers = async (req, res, next) => {
  try {
    const customers = await Customer.find();
    res.json({ success: true, customers });
  } catch (err) {
    next(err);
  }
};
