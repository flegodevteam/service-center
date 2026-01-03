// ...existing code...
import express from "express";
const router = express.Router();
import * as controller from "../controllers/deductionsController.js";

// If you have auth middleware, add it where required, e.g. requireAuth
// import requireAuth from '../middlewares/auth.js';

// Public: list
router.get("/", /*requireAuth,*/ controller.getDeductions);

// Create
router.post("/", /*requireAuth,*/ controller.createDeduction);

// Delete
router.delete("/:id", /*requireAuth,*/ controller.deleteDeduction);

export default router;
