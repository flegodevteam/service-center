const Payroll = require("../models/payrollModel");
const Employee = require("../models/employeeModel"); // assume exists

// helper to compute
function computeFromEmployee(emp, body) {
  const basic = Number(emp.basicSalary || 0);
  const overtimeHours = Number(body.overtimeHours || 0);
  const overtimeRate = Number(body.overtimeRate || 0);
  const transport = Number(body.transportAllowance || 0);
  const meal = Number(body.mealAllowance || 0);
  const accom = Number(body.accommodationAllowance || 0);
  const medical = Number(body.medicalAllowance || 0);
  const other = Number(body.otherAllowance || 0);
  const deductions = Number(body.deductions || 0);

  const totalAllowances = transport + meal + accom + medical + other;
  const overtimePay = overtimeHours * overtimeRate;
  const grossSalary = basic + totalAllowances + overtimePay;

  const employeeEPF = basic * 0.08;
  const employerEPF = basic * 0.12;
  const employerETF = basic * 0.03;
  const netSalary = grossSalary - employeeEPF;

  return {
    basic,
    overtimeHours,
    overtimeRate,
    overtimePay,
    transportAllowance: transport,
    mealAllowance: meal,
    accommodationAllowance: accom,
    medicalAllowance: medical,
    otherAllowance: other,
    totalAllowances,
    deductions,
    grossSalary,
    employeeEPF,
    employerEPF,
    employerETF,
    netSalary,
  };
}

exports.createPayroll = async (req, res) => {
  try {
    const { employeeId } = req.body;
    if (!employeeId)
      return res.status(400).json({ message: "employeeId required" });

    const emp = await Employee.findById(employeeId);
    if (!emp) return res.status(404).json({ message: "Employee not found" });

    const computed = computeFromEmployee(emp, req.body);

    const payload = {
      employeeId: emp._id,
      name: `${emp.firstName} ${emp.lastName}`,
      role: emp.role,
      ...computed,
      status: req.body.status || "Pending",
    };

    const payroll = await Payroll.create(payload);
    res.status(201).json(payroll);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getPayrolls = async (req, res) => {
  try {
    const payrolls = await Payroll.find()
      .sort({ createdAt: -1 })
      .populate("employeeId", "firstName lastName email");
    res.json(payrolls);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deletePayroll = async (req, res) => {
  try {
    const payroll = await Payroll.findByIdAndDelete(req.params.id);
    if (!payroll) return res.status(404).json({ message: "Payroll not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.processPayroll = async (req, res) => {
  try {
    const payroll = await Payroll.findById(req.params.id);
    if (!payroll) return res.status(404).json({ message: "Payroll not found" });
    payroll.status = "Processed";
    await payroll.save();
    res.json(payroll);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.markAsPaid = async (req, res) => {
  try {
    const payroll = await Payroll.findById(req.params.id);
    if (!payroll) return res.status(404).json({ message: "Payroll not found" });
    payroll.status = "Paid";
    payroll.paidAt = new Date();
    await payroll.save();
    res.json(payroll);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// simple CSV export for one payslip
exports.exportPayslipCSV = async (req, res) => {
  try {
    const payroll = await Payroll.findById(req.params.id);
    if (!payroll) return res.status(404).json({ message: "Payroll not found" });

    const rows = [
      ["Employee", payroll.name],
      ["Role", payroll.role || ""],
      ["Basic", payroll.basic],
      ["Overtime Hours", payroll.overtimeHours],
      ["Overtime Pay", payroll.overtimePay],
      ["Total Allowances", payroll.totalAllowances],
      ["Deductions", payroll.deductions],
      ["Gross Salary", payroll.grossSalary],
      ["Employee EPF", payroll.employeeEPF],
      ["Employer EPF", payroll.employerEPF],
      ["Employer ETF", payroll.employerETF],
      ["Net Salary", payroll.netSalary],
      ["Status", payroll.status],
      ["Created At", payroll.createdAt?.toISOString() || ""],
    ];
    const csv = rows
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="payslip_${payroll._id}.csv"`
    );
    res.send(csv);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
