import express from "express";
import {
  addJobCard,
  getJobCards,
  downloadJobCardPDF,
  markJobCardComplete,
  getJobCardsForBilling,
} from "../controllers/jobCardController.js";
const router = express.Router();

router.post("/", addJobCard); // Add job card
router.get("/", getJobCards); // Get all job cards
router.get("/billing", getJobCardsForBilling); // Get job cards for billing (by date/vehicle)
router.get("/:id/pdf", downloadJobCardPDF);
router.put("/:id/complete", markJobCardComplete);

export default router;
