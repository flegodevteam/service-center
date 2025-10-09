const express = require("express");
const router = express.Router();
const leaveController = require("../controllers/leaveController");

router.post("/", leaveController.createLeave);
router.get("/", leaveController.getLeaves);
router.put("/:id/approve", leaveController.approveLeave);
router.put("/:id/reject", leaveController.rejectLeave);

module.exports = router;