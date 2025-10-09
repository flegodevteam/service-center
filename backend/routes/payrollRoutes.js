const express = require("express");
const router = express.Router();
const payrollCtrl = require("../controllers/payrollController");

// GET    /api/payrolls         -> list
router.get("/", payrollCtrl.getPayrolls);

// POST   /api/payrolls         -> create payroll entry
router.post("/", payrollCtrl.createPayroll);

// DELETE /api/payrolls/:id     -> delete entry
router.delete("/:id", payrollCtrl.deletePayroll);

// PUT    /api/payrolls/:id/process -> mark processed
router.put("/:id/process", payrollCtrl.processPayroll);

// PUT    /api/payrolls/:id/pay -> mark paid
router.put("/:id/pay", payrollCtrl.markAsPaid);

// GET    /api/payrolls/:id/export -> download CSV payslip
router.get("/:id/export", payrollCtrl.exportPayslipCSV);

module.exports = router;
