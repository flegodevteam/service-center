const JobCard = require("../models/jobCardModel");
const PDFDocument = require("pdfkit");

// Add new job card
exports.addJobCard = async (req, res, next) => {
  try {
    // services string-aa irundha split panni array-aa convert pannuvom
    let services = req.body.services;
    if (typeof services === "string") {
      services = services.split(",").map((s) => s.trim());
    }
    const jobCard = await JobCard.create({ ...req.body, services });
    // Populate customer & vehicle details
    const populatedJobCard = await JobCard.findById(jobCard._id)
      .populate("customer", "name email phone")
      .populate("vehicle", "make model regNumber");
    res.status(201).json({ success: true, jobCard: populatedJobCard });
  } catch (err) {
    next(err);
  }
};

// Get all job cards (with customer & vehicle details)
exports.getJobCards = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const total = await JobCard.countDocuments();
    const jobCards = await JobCard.find()
      .skip(skip)
      .limit(limit)
      .populate("customer", "name email phone")
      .populate("vehicle", "make model regNumber");

    res.json({
      success: true,
      jobCards,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    next(err);
  }
};

// Download job card as PDF
exports.downloadJobCardPDF = async (req, res, next) => {
  try {
    const jobCard = await JobCard.findById(req.params.id)
      .populate("customer", "name email phone")
      .populate("vehicle", "make model regNumber");
    if (!jobCard) {
      res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
      return res.status(404).json({ message: "Job Card not found" });
    }
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=jobcard_${jobCard._id}.pdf`
    );
    const doc = new PDFDocument();
    doc.pipe(res);

    doc.fontSize(20).text("Job Card", { align: "center" });
    doc.moveDown();
    doc.fontSize(12).text(`Job Card ID: ${jobCard._id}`);
    doc.text(
      `Date: ${jobCard.date ? jobCard.date.toISOString().slice(0, 10) : ""}`
    );
    doc.text(`Customer: ${jobCard.customer?.name || ""}`);
    doc.text(
      `Vehicle: ${jobCard.vehicle?.make || ""} ${
        jobCard.vehicle?.model || ""
      } (${jobCard.vehicle?.regNumber || ""})`
    );
    doc.text(`Technician: ${jobCard.technician || ""}`);
    doc.text(`Status: ${jobCard.status || ""}`);
    doc.text(`Total Amount: $${jobCard.totalAmount?.toFixed(2) || "0.00"}`);
    doc.moveDown();
    doc.text("Services:");
    (jobCard.services || []).forEach((s, i) => doc.text(`${i + 1}. ${s}`));
    doc.end();

    // doc.end() பிறகு எந்த response-யும் send பண்ணாதீர்கள்!
  } catch (err) {
    // response-க்கு ஏற்கனவே data அனுப்பி இருந்தால், error-ஐ swallow பண்ணவும்
    if (!res.headersSent) {
      res.status(500).json({ message: "PDF generation failed" });
    }
  }
};

// Mark job card as complete
exports.markJobCardComplete = async (req, res, next) => {
  try {
    const jobCard = await JobCard.findById(req.params.id);
    if (!jobCard) {
      return res.status(404).json({ message: "Job Card not found" });
    }
    if (jobCard.status === "completed") {
      return res.status(400).json({ message: "Already completed" });
    }
    jobCard.status = "completed";
    await jobCard.save();
    res.json({ success: true, jobCard });
  } catch (err) {
    next(err);
  }
};
