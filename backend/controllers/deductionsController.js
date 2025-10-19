const Deduction = require("../models/deductionsModel");
const mongoose = require("mongoose");

// GET /api/deductions
exports.getDeductions = async (req, res, next) => {
  try {
    const list = await Deduction.find()
      .sort({ date: -1 })
      .populate("employeeId", "firstName lastName");
    res.json(list);
  } catch (err) {
    next(err);
  }
};

// POST /api/deductions
exports.createDeduction = async (req, res, next) => {
  try {
    const { employeeId, date, amount, description } = req.body;

    if (!employeeId || !mongoose.Types.ObjectId.isValid(employeeId)) {
      return res.status(400).json({ message: "Invalid or missing employeeId" });
    }
    if (amount == null || Number(amount) <= 0) {
      return res.status(400).json({ message: "Amount must be > 0" });
    }

    const doc = new Deduction({
      employeeId,
      employeeName: req.body.employeeName, // optional
      date: date ? new Date(date) : undefined,
      amount: Number(amount),
      description,
      createdBy: req.user ? req.user._id : undefined, // if auth used
    });

    const saved = await doc.save();
    // populate before returning so frontend can show name immediately
    const populated = await saved.populate("employeeId", "firstName lastName");
    res.status(201).json(populated);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/deductions/:id
exports.deleteDeduction = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid id" });
    }
    const removed = await Deduction.findByIdAndDelete(id);
    if (!removed) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted", id: removed._id });
  } catch (err) {
    next(err);
  }
};
