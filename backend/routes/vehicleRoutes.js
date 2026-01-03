import express from "express";
import {
  addVehicle,
  getVehicles,
  updateVehicle,
  deleteVehicle,
} from "../controllers/vehicleController.js";
const router = express.Router();

router.post("/", addVehicle);
router.get("/", getVehicles);
router.put("/:id", updateVehicle); // Edit vehicle
router.delete("/:id", deleteVehicle); // Delete vehicle

export default router;