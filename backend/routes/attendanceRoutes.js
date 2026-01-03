import express from "express";
const router = express.Router();
import * as attendanceCtrl from "../controllers/attendanceController.js";

router.get("/", attendanceCtrl.getAttendance);
router.post("/", attendanceCtrl.addAttendance);
router.post("/bulk", attendanceCtrl.addAttendanceBulk);

export default router;
