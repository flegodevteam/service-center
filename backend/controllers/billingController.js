const PDFDocument = require("pdfkit");
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
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const total = await Invoice.countDocuments();
    const invoices = await Invoice.find()
      .skip(skip)
      .limit(limit)
      .populate("customer", "name email phone")
      .populate("vehicle", "make model regNumber");

    res.json({
      success: true,
      invoices,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    next(err);
  }
};

// Download invoice as PDF
exports.downloadInvoicePDF = async (req, res, next) => {
  try {
    const invoice = await Invoice.findById(req.params.id)
      .populate("customer", "name email phone")
      .populate("vehicle", "make model regNumber");

    if (!invoice || !invoice.customer || !invoice.vehicle) {
      return res
        .status(404)
        .json({ message: "Invoice or related data not found" });
    }

    // Set response headers
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=invoice_${invoice._id}.pdf`
    );

    const doc = new PDFDocument();
    doc.pipe(res);

    doc.fontSize(20).text("Invoice Details", { align: "center" });
    doc.moveDown();
    doc.fontSize(12).text(`Invoice Number: ${invoice._id}`);
    doc.text(`Date: ${invoice.date.toISOString().slice(0, 10)}`);
    doc.text(`Customer: ${invoice.customer.name}`);
    doc.text(
      `Vehicle: ${invoice.vehicle.make} ${invoice.vehicle.model} (${invoice.vehicle.regNumber})`
    );
    doc.text(`Amount: $${invoice.amount.toFixed(2)}`);
    doc.text(`Status: ${invoice.paymentStatus}`);
    doc.text(`Payment Method: ${invoice.paymentMethod}`);

    doc.end();

    doc.on("error", (err) => {
      if (!res.headersSent) {
        res.status(500).end("PDF generation error");
      }
    });
  } catch (err) {
    console.error("PDF Download Error:", err);
    if (!res.headersSent) next(err);
  }
};
