const express = require("express");
const {
  getMonthlyRevenue,
  getServiceStats,
} = require("../controllers/reportsController");
const router = express.Router();

router.get("/monthly-revenue", getMonthlyRevenue);
router.get("/service-stats", getServiceStats);

module.exports = router;
