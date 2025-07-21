const express = require("express");
const { addJobCard, getJobCards } = require("../controllers/jobCardController");
const router = express.Router();

router.post("/", addJobCard); // Add job card
router.get("/", getJobCards); // Get all job cards

module.exports = router;
