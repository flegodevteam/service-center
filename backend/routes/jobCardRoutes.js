const express = require("express");
const {
  addJobCard,
  getJobCards,
  downloadJobCardPDF,
  markJobCardComplete,
} = require("../controllers/jobCardController");
const router = express.Router();

router.post("/", addJobCard); // Add job card
router.get("/", getJobCards); // Get all job cards
router.get("/:id/pdf", downloadJobCardPDF);
router.put("/:id/complete", markJobCardComplete);

module.exports = router;
