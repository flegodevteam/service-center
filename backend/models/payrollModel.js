const mongoose = require("mongoose");

const PayrollSchema = new mongoose.Schema(
  {
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true },
    name: { type: String, required: true },
    role: { type: String },
    basic: { type: Number, default: 0 },
    overtimeHours: { type: Number, default: 0 },
    overtimeRate: { type: Number, default: 0 },
    overtimePay: { type: Number, default: 0 },
    transportAllowance: { type: Number, default: 0 },
    mealAllowance: { type: Number, default: 0 },
    accommodationAllowance: { type: Number, default: 0 },
    medicalAllowance: { type: Number, default: 0 },
    otherAllowance: { type: Number, default: 0 },
    totalAllowances: { type: Number, default: 0 },
    deductions: { type: Number, default: 0 },
    grossSalary: { type: Number, default: 0 },
    employeeEPF: { type: Number, default: 0 },
    employerEPF: { type: Number, default: 0 },
    employerETF: { type: Number, default: 0 },
    netSalary: { type: Number, default: 0 },
    status: { type: String, enum: ["Pending","Processed","Paid"], default: "Pending" },
    paidAt: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payroll", PayrollSchema);
