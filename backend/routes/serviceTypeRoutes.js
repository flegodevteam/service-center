const express = require("express");
const {
  addServiceType,
  getServiceTypes,
  updateServiceType,
  deleteServiceType,
} = require("../controllers/serviceTypeController");
const router = express.Router();

router.post("/", addServiceType); // Add new service type
router.get("/", getServiceTypes); // Get all service types
router.put("/:id", updateServiceType); // Update service type
router.delete("/:id", deleteServiceType); // Delete service type

module.exports = router;
