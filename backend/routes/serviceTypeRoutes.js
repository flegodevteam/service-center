import express from "express";
const router = express.Router();
import * as ctrl from "../controllers/serviceTypeController.js";

router.get("/", ctrl.getConfig);

router.post("/vehicle-type", ctrl.addVehicleType);
router.delete("/vehicle-type/:type", ctrl.deleteVehicleType);

router.post("/service-type", ctrl.addServiceType);
router.delete("/service-type/:type", ctrl.deleteServiceType);

router.post("/service-level-option", ctrl.addServiceLevelOption);
router.delete("/service-level-option/:option", ctrl.deleteServiceLevelOption);

// Pricing config endpoints
router.post("/pricing", ctrl.savePricingConfig);
router.get("/pricing", ctrl.getPricingConfig);

export default router;
