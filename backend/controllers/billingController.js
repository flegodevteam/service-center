const Invoice = require("../models/billingModel");

// Add new invoice
exports.addInvoice = async (req, res, next) => {
  try {
    const invoice = await Invoice.create(req.body);
    // Populate customer, vehicle
    const populatedInvoice = await Invoice.findById(invoice._id)
      .populate("customer", "name email phone")
      .populate("vehicle", "make model regNumber");
    res.status(201).json({ success: true, invoice: populatedInvoice });
  } catch (err) {
    next(err);
  }
};

// Get all invoices (with customer, vehicle)
exports.getInvoices = async (req, res, next) => {
  try {
    const invoices = await Invoice.find()
      .populate("customer", "name email phone")
      .populate("vehicle", "make model regNumber");
    res.json({ success: true, invoices });
  } catch (err) {
    next(err);
  }
};
