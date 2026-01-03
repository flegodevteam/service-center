import express from "express";
import {
  getMonthlyRevenue,
  getServiceStats,
} from "../controllers/reportsController.js";
const router = express.Router();

router.get("/monthly-revenue", getMonthlyRevenue);
router.get("/service-stats", getServiceStats);

export default router;
