const express = require("express");
const {
  addVehicle,
  getVehicles,
  updateVehicle,
  deleteVehicle,
} = require("../controllers/vehicleController");
const router = express.Router();

router.post("/", addVehicle);
router.get("/", getVehicles);
router.put("/:id", updateVehicle); // Edit vehicle
router.delete("/:id", deleteVehicle); // Delete vehicle

module.exports = router;