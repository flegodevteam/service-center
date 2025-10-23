const express = require("express");
const router = express.Router();
const attendanceCtrl = require("../controllers/attendanceController");

router.get("/", attendanceCtrl.getAttendance);
router.post("/", attendanceCtrl.addAttendance);
router.post("/bulk", attendanceCtrl.addAttendanceBulk);

module.exports = router;
