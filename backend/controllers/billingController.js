import PDFDocument from "pdfkit";
import Invoice from "../models/billingModel.js";
import JobCard from "../models/jobCardModel.js";

// Add new invoice
export const addInvoice = async (req, res, next) => {
  try {
    let totalAmount = 0;
    
    // Calculate total from job card if provided
    if (req.body.jobCard) {
      const jobCard = await JobCard.findById(req.body.jobCard);
      if (jobCard) {
        totalAmount += jobCard.totalAmount || 0;
      }
    }
    
    // Add additional charges
    if (req.body.additionalCharges && Array.isArray(req.body.additionalCharges)) {
      req.body.additionalCharges.forEach((charge) => {
        totalAmount += parseFloat(charge.amount) || 0;
      });
    }
    
    // Add inventory items
    if (req.body.inventoryItems && Array.isArray(req.body.inventoryItems)) {
      req.body.inventoryItems.forEach((item) => {
        totalAmount += parseFloat(item.totalPrice) || 0;
      });
    }
    
    // If amount is not provided or is 0, use calculated total
    if (!req.body.amount || req.body.amount === 0) {
      req.body.amount = totalAmount;
    }
    
    const invoice = await Invoice.create(req.body);
    // Populate customer, vehicle, jobCard, inventoryItems
    const populatedInvoice = await Invoice.findById(invoice._id)
      .populate("customer", "name email phone")
      .populate("vehicle", "make model regNumber")
      .populate("jobCard")
      .populate("inventoryItems.item");
    res.status(201).json({ success: true, invoice: populatedInvoice });
  } catch (err) {
    next(err);
  }
};

// Get all invoices (with customer, vehicle)
export const getInvoices = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const total = await Invoice.countDocuments();
    const invoices = await Invoice.find()
      .skip(skip)
      .limit(limit)
      .populate("customer", "name email phone")
      .populate("vehicle", "make model regNumber")
      .populate("jobCard")
      .populate("inventoryItems.item");

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
export const downloadInvoicePDF = async (req, res, next) => {
  try {
    const invoice = await Invoice.findById(req.params.id)
      .populate("customer", "name email phone")
      .populate("vehicle", "make model regNumber")
      .populate("jobCard")
      .populate("inventoryItems.item");

    if (!invoice || !invoice.customer || !invoice.vehicle) {
      // CORS header for error response
      res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
      res.setHeader("Access-Control-Expose-Headers", "Content-Disposition");
      return res
        .status(404)
        .json({ message: "Invoice or related data not found" });
    }

    // CORS headers for PDF response
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Expose-Headers", "Content-Disposition");
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
    
    // Job Card details
    if (invoice.jobCard) {
      doc.moveDown();
      doc.text(`Job Card: ${invoice.jobCard._id}`);
      doc.text(`Job Card Amount: LKR ${(invoice.jobCard.totalAmount || 0).toFixed(2)}`);
    }
    
    // Additional charges
    if (invoice.additionalCharges && invoice.additionalCharges.length > 0) {
      doc.moveDown();
      doc.text("Additional Charges:");
      invoice.additionalCharges.forEach((charge) => {
        doc.text(`  - ${charge.description}: LKR ${charge.amount.toFixed(2)}`);
      });
    }
    
    // Inventory items
    if (invoice.inventoryItems && invoice.inventoryItems.length > 0) {
      doc.moveDown();
      doc.text("Inventory Items:");
      invoice.inventoryItems.forEach((invItem) => {
        const item = invItem.item;
        doc.text(`  - ${item ? item.name : 'N/A'} (Qty: ${invItem.quantity}): LKR ${invItem.totalPrice.toFixed(2)}`);
      });
    }
    
    doc.moveDown();
    doc.text(`Total Amount: LKR ${invoice.amount.toFixed(2)}`);
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


// Process payment for an invoice
export const processPayment = async (req, res, next) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }
    if (invoice.paymentStatus === "paid") {
      return res.status(400).json({ message: "Already paid" });
    }
    invoice.paymentStatus = "paid";
    invoice.paymentMethod = req.body.paymentMethod || "Cash";
    await invoice.save();
    res.json({ success: true, invoice });
  } catch (err) {
    next(err);
  }
};
