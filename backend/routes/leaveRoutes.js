import express from "express";
const router = express.Router();
import * as leaveController from "../controllers/leaveController.js";

router.post("/", leaveController.createLeave);
router.get("/", leaveController.getLeaves);
router.put("/:id/approve", leaveController.approveLeave);
router.put("/:id/reject", leaveController.rejectLeave);

export default router;