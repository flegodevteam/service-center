const express = require("express");
const {
  addServiceType,
  getServiceTypes,
  updateServiceType,
  deleteServiceType,
  getVehicleTypes,
} = require("../controllers/serviceTypeController");
const router = express.Router();

router.post("/", addServiceType);
router.get("/", getServiceTypes);
router.put("/:id", updateServiceType);
router.delete("/:id", deleteServiceType);
router.get("/vehicle-types", getVehicleTypes); // New route for vehicle types

module.exports = router;
