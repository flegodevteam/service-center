import Leave from "../models/leaveModal.js";

// Add new leave
export const createLeave = async (req, res) => {
  try {
    const leave = await Leave.create(req.body);
    res.status(201).json(leave);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all leaves
export const getLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find().populate("employeeId");
    res.json(leaves);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Approve leave
export const approveLeave = async (req, res) => {
  try {
    const leave = await Leave.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );
    if (!leave) return res.status(404).json({ message: "Not found" });
    res.json(leave);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Reject leave
export const rejectLeave = async (req, res) => {
  try {
    const leave = await Leave.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { new: true }
    );
    if (!leave) return res.status(404).json({ message: "Not found" });
    res.json(leave);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};