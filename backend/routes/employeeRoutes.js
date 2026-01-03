import express from "express";
const router = express.Router();
import * as employeeController from "../controllers/employeeController.js";

// CRUD routes
router.post("/", employeeController.createEmployee);
router.get("/", employeeController.getEmployees);
router.get("/:id", employeeController.getEmployee);
router.put("/:id", employeeController.updateEmployee);
router.delete("/:id", employeeController.deleteEmployee);

export default router;