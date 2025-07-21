const express = require("express");
const { addVehicle, getVehicles } = require("../controllers/vehicleController");
const router = express.Router();

router.post("/", addVehicle); // Add vehicle
router.get("/", getVehicles); // Get all vehicles

module.exports = router;
