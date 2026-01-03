import Attendance from "../models/attendanceModal.js";

// GET /api/attendance
export const getAttendance = async (req, res, next) => {
  try {
    const { page = 1, limit = 1000, date } = req.query;
    const query = date ? { date } : {};
    const skip = (page - 1) * limit;
    const total = await Attendance.countDocuments(query);
    const items = await Attendance.find(query)
      .populate("employeeId", "firstName lastName")
      .skip(skip)
      .limit(Number(limit))
      .sort({ date: -1 });
    res.json({ success: true, total, page: Number(page), items });
  } catch (err) {
    next(err);
  }
};

// POST /api/attendance  (single)
export const addAttendance = async (req, res, next) => {
  try {
    const { employeeId, date, status } = req.body;
    if (!employeeId || !date)
      return res.status(400).json({ message: "employeeId and date required" });
    // upsert single record
    const doc = await Attendance.findOneAndUpdate(
      { employeeId, date },
      { $set: { status } },
      { upsert: true, new: true }
    );
    res.status(201).json({ success: true, attendance: doc });
  } catch (err) {
    next(err);
  }
};

// POST /api/attendance/bulk  (bulk upsert)
export const addAttendanceBulk = async (req, res, next) => {
  try {
    const { entries } = req.body; // entries: [{ employeeId, date, status }, ...]
    if (!Array.isArray(entries) || entries.length === 0)
      return res.status(400).json({ message: "entries array required" });

    const ops = entries.map((e) => ({
      updateOne: {
        filter: { employeeId: e.employeeId, date: e.date },
        update: { $set: { status: e.status } },
        upsert: true,
      },
    }));

    const result = await Attendance.bulkWrite(ops);
    res.status(200).json({ success: true, result });
  } catch (err) {
    next(err);
  }
};
