// ...existing code...
const express = require("express");
const router = express.Router();
const controller = require("../controllers/deductionsController");

// If you have auth middleware, add it where required, e.g. requireAuth
// const requireAuth = require('../middlewares/auth');

// Public: list
router.get("/", /*requireAuth,*/ controller.getDeductions);

// Create
router.post("/", /*requireAuth,*/ controller.createDeduction);

// Delete
router.delete("/:id", /*requireAuth,*/ controller.deleteDeduction);

module.exports = router;
