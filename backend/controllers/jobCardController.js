const JobCard = require("../models/jobCardModel");

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
