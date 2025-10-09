import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Clock,
  Calendar,
  DollarSign,
  Plus,
  Search,
  // Filter, // removed unused import
  Download,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle,
  X,
} from "lucide-react";
// import Modal from '../components/ui/Modal';
// import Button from '../components/ui/Button';
// import Input from '../components/ui/Input';
// import Select from '../components/ui/Select';
import toast from "react-hot-toast";
import { Loader } from "lucide-react";
import axios from "axios";
import { API_URL } from "../api/api";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const attendanceData = [
  {
    id: "1",
    employeeId: "1",
    date: "2024-06-15",
    checkIn: "08:00",
    checkOut: "17:30",
    hoursWorked: 8.5,
    overtimeHours: 0.5,
    status: "present",
  },
  {
    id: "2",
    employeeId: "2",
    date: "2024-06-15",
    checkIn: "08:15",
    checkOut: "17:00",
    hoursWorked: 7.75,
    overtimeHours: 0,
    status: "late",
  },
];

const leaveData = [
  {
    id: "1",
    employeeId: "1",
    employeeName: "Robert Smith",
    leaveType: "annual",
    startDate: "2024-06-20",
    endDate: "2024-06-22",
    days: 3,
    reason: "Family vacation",
    status: "approved",
    appliedDate: "2024-06-10",
  },
  {
    id: "2",
    employeeId: "2",
    employeeName: "James Wilson",
    leaveType: "sick",
    startDate: "2024-06-18",
    endDate: "2024-06-18",
    days: 1,
    reason: "Fever",
    status: "pending",
    appliedDate: "2024-06-17",
  },
];

const Button = ({
  variant = "primary",
  size = "md",
  loading = false,
  children,
  className = "",
  disabled,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary:
      "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500",
    success: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    warning:
      "bg-yellow-600 text-white hover:bg-yellow-700 focus:ring-yellow-500",
  };
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={loading || disabled}
      {...props}
    >
      {loading && <Loader size={16} className="animate-spin mr-2" />}
      {children}
    </button>
  );
};

// --- Input Component ---
const Input = ({ label, error, icon, className = "", ...props }) => (
  <div className="space-y-1">
    {label && (
      <label className="block text-sm font-medium text-gray-700">{label}</label>
    )}
    <div className="relative">
      {icon && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          {icon}
        </div>
      )}
      <input
        className={`w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
          icon ? "pl-10" : ""
        } ${error ? "border-red-300 focus:ring-red-500" : ""} ${className}`}
        {...props}
      />
    </div>
    {error && <p className="text-sm text-red-600">{error}</p>}
  </div>
);

// --- Modal Component ---
const Modal = ({ isOpen, onClose, title, children, size = "md" }) => {
  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-6xl",
  };
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className={`relative bg-white rounded-xl shadow-xl w-full ${sizeClasses[size]} max-h-[90vh] overflow-y-auto`}
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">{title}</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            <div className="p-6">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// --- Select Component ---
const Select = ({ label, error, options, className = "", ...props }) => (
  <div className="space-y-1">
    {label && (
      <label className="block text-sm font-medium text-gray-700">{label}</label>
    )}
    <select
      className={`w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
        error ? "border-red-300 focus:ring-red-500" : ""
      } ${className}`}
      {...props}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    {error && <p className="text-sm text-red-600">{error}</p>}
  </div>
);

const Payroll = () => {
  const { user } = useAuth(); // Get the authenticated user
  const allTabs = [
    {
      id: "employees",
      label: "Employees",
      icon: <Users size={20} />,
      roles: ["admin"], // Only admin
    },
    {
      id: "attendance",
      label: "Attendance",
      icon: <Clock size={20} />,
      roles: ["admin"], // Only admin
    },
    {
      id: "leaves",
      label: "Leave Management",
      icon: <Calendar size={20} />,
      roles: ["admin", "manager", "technician", "front-desk"], // All
    },
    {
      id: "payroll",
      label: "Payroll",
      icon: <DollarSign size={20} />,
      roles: ["admin"], // Only admin
    },
  ];

  const tabs = allTabs.filter((tab) => user && tab.roles.includes(user.role));
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || "");

  const [searchTerm, setSearchTerm] = useState("");
  const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false);
  const [isAddLeaveModalOpen, setIsAddLeaveModalOpen] = useState(false);
  // const [selectedEmployee, setSelectedEmployee] = useState(null); // removed unused state
  const [employees, setEmployees] = useState([]); // Initial value is empty array
  const [leaves, setLeaves] = useState(leaveData);

  const [employeeForm, setEmployeeForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "",
    department: "",
    basicSalary: "",
    bankAccount: "",
  });

  const [leaveForm, setLeaveForm] = useState({
    employeeId: "",
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const [viewEmployee, setViewEmployee] = useState(null);
  const [editEmployee, setEditEmployee] = useState(null);

  const [attendanceData, setAttendanceData] = useState([]);

  // New payroll form + entries state
  const [payrollForm, setPayrollForm] = useState({
    employeeId: "",
    overtimeHours: 0,
    overtimeRate: 0,
    transportAllowance: 0,
    mealAllowance: 0,
    accommodationAllowance: 0,
    medicalAllowance: 0,
    otherAllowance: 0,
    deductions: 0,
  });

  const [payrollEntries, setPayrollEntries] = useState([]);

  // compute payroll summary helper
  const computePayrollFor = (emp, form) => {
    const basic = Number(emp.basicSalary || 0);
    const overtimeHours = Number(form.overtimeHours || 0);
    const overtimeRate = Number(form.overtimeRate || 0);
    const transport = Number(form.transportAllowance || 0);
    const meal = Number(form.mealAllowance || 0);
    const accom = Number(form.accommodationAllowance || 0);
    const medical = Number(form.medicalAllowance || 0);
    const other = Number(form.otherAllowance || 0);
    const deductions = Number(form.deductions || 0);

    const totalAllowances = transport + meal + accom + medical + other;
    const overtimePay = overtimeHours * overtimeRate;
    const grossSalary = basic + totalAllowances + overtimePay;

    const employeeEPF = basic * 0.08;
    const employerEPF = basic * 0.12;
    const employerETF = basic * 0.03;

    const netSalary = grossSalary - employeeEPF - deductions;

    return {
      id: `${emp._id || emp.id}-${Date.now()}`,
      employeeId: emp._id || emp.id,
      name: `${emp.firstName} ${emp.lastName}`,
      role: emp.role,
      basic,
      totalAllowances,
      overtimeHours,
      overtimeRate,
      overtimePay,
      grossSalary,
      employeeEPF,
      employerEPF,
      employerETF,
      deductions,
      netSalary,
      status: "Processed",
    };
  };

  const handleAddToPayroll = async () => {
    if (!payrollForm.employeeId) {
      toast.error("Please select an employee");
      return;
    }
    const emp = employees.find(
      (e) => (e._id || e.id) === payrollForm.employeeId
    );
    if (!emp) {
      toast.error("Selected employee not found");
      return;
    }

    try {
      // send to backend which will compute & persist
      const payload = {
        employeeId: payrollForm.employeeId,
        overtimeHours: payrollForm.overtimeHours,
        overtimeRate: payrollForm.overtimeRate,
        transportAllowance: payrollForm.transportAllowance,
        mealAllowance: payrollForm.mealAllowance,
        accommodationAllowance: payrollForm.accommodationAllowance,
        medicalAllowance: payrollForm.medicalAllowance,
        otherAllowance: payrollForm.otherAllowance,
        deductions: payrollForm.deductions,
      };
      const res = await axios.post(`${API_URL}/payrolls`, payload);
      setPayrollEntries((prev) => [res.data, ...prev]);
      toast.success("Added to payroll");
      setPayrollForm((prev) => ({
        ...prev,
        overtimeHours: 0,
        overtimeRate: 0,
        transportAllowance: 0,
        mealAllowance: 0,
        accommodationAllowance: 0,
        medicalAllowance: 0,
        otherAllowance: 0,
        deductions: 0,
      }));
    } catch (err) {
      console.error(err);
      toast.error("Failed to add to payroll");
    }
  };

  const handleRemovePayrollEntry = async (id) => {
    try {
      await axios.delete(`${API_URL}/payrolls/${id}`);
      setPayrollEntries((prev) => prev.filter((p) => (p._id || p.id) !== id));
      toast.success("Removed from payroll");
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove payroll entry");
    }
  };

  useEffect(() => {
    if (tabs.length > 0) {
      setActiveTab(tabs[0].id);
    }
  }, [user, tabs.length]);

  // Fetch employees from backend
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get(`${API_URL}/employees`);
        setEmployees(res.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchEmployees();
  }, []);

  // Fetch attendance records for employees
  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await axios.get(`${API_URL}/attendance`);
        setAttendanceData(res.data);
      } catch (error) {
        toast.error("Failed to load attendance");
      }
    };
    fetchAttendance();
  }, []);

  // Fetch leaves for employees
  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const res = await axios.get(`${API_URL}/leaves`);
        setLeaves(res.data);
      } catch (error) {
        toast.error("Failed to load leaves");
      }
    };
    fetchLeaves();
  }, []);

  // Fetch payroll entries
  useEffect(() => {
    // fetch saved payroll entries from backend
    const fetchPayrolls = async () => {
      try {
        const res = await axios.get(`${API_URL}/payrolls`);
        setPayrollEntries(res.data || []);
      } catch (err) {
        console.error("Failed to fetch payrolls", err);
      }
    };
    fetchPayrolls();
  }, []);

  // Edit Employee form state
  const [editForm, setEditForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "",
    department: "",
    basicSalary: "",
    bankAccount: "",
  });

  // Handle Edit button click
  const handleEditClick = (employee) => {
    setEditEmployee(employee);
    setEditForm({
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      phone: employee.phone,
      role: employee.role,
      department: employee.department,
      basicSalary: employee.basicSalary,
      bankAccount: employee.bankAccount,
    });
  };

  // Handle Edit Save (PUT API call)
  const handleEditSave = async () => {
    try {
      const res = await axios.put(
        `${API_URL}/employees/${editEmployee._id || editEmployee.id}`,
        {
          ...editForm,
          basicSalary: parseFloat(editForm.basicSalary),
        }
      );
      setEmployees((prev) =>
        prev.map((emp) =>
          (emp._id || emp.id) === (editEmployee._id || editEmployee.id)
            ? res.data
            : emp
        )
      );
      setEditEmployee(null);
      toast.success("Employee updated successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update employee");
    }
  };

  // Handle Delete (DELETE API call)
  const handleDeleteEmployee = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await axios.delete(`${API_URL}/employees/${id}`);
        setEmployees((prev) =>
          prev.filter((emp) => (emp._id || emp.id) !== id)
        );
        toast.success("Employee deleted successfully!");
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to delete employee"
        );
      }
    }
  };

  const handleAddEmployee = async () => {
    try {
      const res = await axios.post(`${API_URL}/employees`, employeeForm);
      setEmployees((prev) => [...prev, res.data]);
      setIsAddEmployeeModalOpen(false);
      setEmployeeForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        role: "",
        department: "",
        basicSalary: "",
        bankAccount: "",
      });
      toast.success("Employee added successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add employee");
    }
  };

  const handleAddLeave = async () => {
    try {
      const startDate = new Date(leaveForm.startDate);
      const endDate = new Date(leaveForm.endDate);
      const days =
        Math.ceil(
          (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
        ) + 1;

      const payload = {
        ...leaveForm,
        days,
        appliedDate: new Date().toISOString().split("T")[0],
        otherLeaveType:
          leaveForm.leaveType === "other"
            ? leaveForm.otherLeaveType
            : undefined,
      };

      const res = await axios.post(`${API_URL}/leaves`, payload);
      setLeaves((prev) => [...prev, res.data]);
      setIsAddLeaveModalOpen(false);
      setLeaveForm({
        employeeId: "",
        leaveType: "",
        startDate: "",
        endDate: "",
        reason: "",
        otherLeaveType: "",
      });
      toast.success("Leave application submitted!");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to submit leave application"
      );
    }
  };

  const handleApproveLeave = async (leaveId) => {
    try {
      const res = await axios.put(`${API_URL}/leaves/${leaveId}/approve`);
      setLeaves((prev) =>
        prev.map((leave) => (leave._id === leaveId ? res.data : leave))
      );
      toast.success("Leave approved!");
    } catch (error) {
      toast.error("Failed to approve leave");
    }
  };

  const handleRejectLeave = async (leaveId) => {
    try {
      const res = await axios.put(`${API_URL}/leaves/${leaveId}/reject`);
      setLeaves((prev) =>
        prev.map((leave) => (leave._id === leaveId ? res.data : leave))
      );
      toast.success("Leave rejected!");
    } catch (error) {
      toast.error("Failed to reject leave");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "present":
        return "bg-green-100 text-green-800";
      case "late":
        return "bg-yellow-100 text-yellow-800";
      case "absent":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "approved":
      case "present":
        return <CheckCircle size={16} />;
      case "pending":
      case "late":
        return <AlertCircle size={16} />;
      case "rejected":
      case "absent":
        return <XCircle size={16} />;
      default:
        return null;
    }
  };

  //  Mark Attendance Modal State
  const [isMarkAttendanceModalOpen, setIsMarkAttendanceModalOpen] =
    useState(false);
  const [attendanceForm, setAttendanceForm] = useState({
    employeeId: "",
    date: new Date().toISOString().slice(0, 10),
    checkIn: "",
    checkOut: "",
    status: "",
  });
  const [attendanceErrors, setAttendanceErrors] = useState({});

  const validateAttendance = () => {
    const errors = {};
    if (!attendanceForm.employeeId) errors.employeeId = "Employee is required";
    if (!attendanceForm.checkIn) errors.checkIn = "Check-in time is required";
    if (!attendanceForm.status) errors.status = "Status is required";
    return errors;
  };

  const handleMarkAttendance = async () => {
    const errors = validateAttendance();
    setAttendanceErrors(errors);
    if (Object.keys(errors).length > 0) return;

    try {
      // Optional: calculate hoursWorked, overtimeHours here if needed
      const payload = {
        ...attendanceForm,
        hoursWorked: 0, // You can calculate based on checkIn/checkOut
        overtimeHours: 0,
      };
      const res = await axios.post(`${API_URL}/attendance`, payload);
      setAttendanceData((prev) => [...prev, res.data]);
      setIsMarkAttendanceModalOpen(false);
      setAttendanceForm({
        employeeId: "",
        date: new Date().toISOString().slice(0, 10),
        checkIn: "",
        checkOut: "",
        status: "",
      });
      toast.success("Attendance marked successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to mark attendance");
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl font-bold text-gray-800">Payroll Management</h1>
        <p className="text-gray-600">
          Manage employees, attendance, leaves, and payroll processing.
        </p>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Employees
              </p>
              <p className="text-2xl font-bold text-gray-800">
                {employees.filter((emp) => emp.isActive).length}
              </p>
            </div>
            <div className="rounded-full p-3 bg-blue-100">
              <Users size={20} className="text-blue-700" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Present Today</p>
              <p className="text-2xl font-bold text-gray-800">
                {
                  attendanceData.filter(
                    (att) => att.status === "present" || att.status === "late"
                  ).length
                }
              </p>
            </div>
            <div className="rounded-full p-3 bg-green-100">
              <Clock size={20} className="text-green-700" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Pending Leaves
              </p>
              <p className="text-2xl font-bold text-gray-800">
                {leaves.filter((leave) => leave.status === "pending").length}
              </p>
            </div>
            <div className="rounded-full p-3 bg-yellow-100">
              <Calendar size={20} className="text-yellow-700" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Monthly Payroll
              </p>
              <p className="text-2xl font-bold text-gray-800">LKR 32,500</p>
            </div>
            <div className="rounded-full p-3 bg-purple-100">
              <DollarSign size={20} className="text-purple-700" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="border-b border-gray-200">
          <nav className="flex gap-5 flex-wrap md:flex-nowrap space-x-0 md:space-x-8 space-y-2 md:space-y-0 px-2 md:px-6 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6 ">
          {/* Employees Tab */}
          {activeTab === "employees" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="relative w-96">
                  <input
                    type="text"
                    placeholder="Search employees..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <Search
                    size={18}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                </div>
                <Button onClick={() => setIsAddEmployeeModalOpen(true)}>
                  <Plus size={16} className="mr-2" />
                  Add Employee
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Employee
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Department
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Salary
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {employees.map((employee) => (
                      <tr key={employee.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <span className="text-blue-700 font-semibold">
                                {employee.firstName.charAt(0)}
                              </span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {employee.firstName} {employee.lastName}
                              </div>
                              <div className="text-sm text-gray-500">
                                {employee.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {employee.role}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {employee.department}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          LKR {employee.basicSalary.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              employee.isActive
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {employee.isActive ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end space-x-2">
                            <button
                              className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                              onClick={() => setViewEmployee(employee)}
                              title="View"
                            >
                              <Eye size={16} />
                            </button>
                            <button
                              className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50"
                              onClick={() => handleEditClick(employee)}
                              title="Edit"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                              onClick={() =>
                                handleDeleteEmployee(
                                  employee._id || employee.id
                                )
                              }
                              title="Delete"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* View Employee Modal */}
              <Modal
                isOpen={!!viewEmployee}
                onClose={() => setViewEmployee(null)}
                title="Employee Details"
              >
                {viewEmployee && (
                  <div className="space-y-2">
                    <div>
                      <b>Name:</b> {viewEmployee.firstName}{" "}
                      {viewEmployee.lastName}
                    </div>
                    <div>
                      <b>Email:</b> {viewEmployee.email}
                    </div>
                    <div>
                      <b>Phone:</b> {viewEmployee.phone}
                    </div>
                    <div>
                      <b>Role:</b> {viewEmployee.role}
                    </div>
                    <div>
                      <b>Department:</b> {viewEmployee.department}
                    </div>
                    <div>
                      <b>Basic Salary:</b> LKR {viewEmployee.basicSalary}
                    </div>
                    <div>
                      <b>Status:</b>{" "}
                      {viewEmployee.isActive ? "Active" : "Inactive"}
                    </div>
                    <div>
                      <b>Bank Account:</b> {viewEmployee.bankAccount}
                    </div>
                  </div>
                )}
              </Modal>

              {/* Edit Employee Modal */}
              <Modal
                isOpen={!!editEmployee}
                onClose={() => setEditEmployee(null)}
                title="Edit Employee"
              >
                <div className="space-y-4">
                  <Input
                    label="First Name"
                    value={editForm.firstName}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        firstName: e.target.value,
                      }))
                    }
                  />
                  <Input
                    label="Last Name"
                    value={editForm.lastName}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        lastName: e.target.value,
                      }))
                    }
                  />
                  <Input
                    label="Email"
                    value={editForm.email}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                  />
                  <Input
                    label="Phone"
                    value={editForm.phone}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                  />
                  <Select
                    label="Role"
                    value={editForm.role}
                    onChange={(e) =>
                      setEditForm((prev) => ({ ...prev, role: e.target.value }))
                    }
                    options={[
                      { value: "", label: "Select Role" },
                      {
                        value: "Senior Technician",
                        label: "Senior Technician",
                      },
                      { value: "Technician", label: "Technician" },
                      { value: "Front Desk", label: "Front Desk" },
                      { value: "Manager", label: "Manager" },
                    ]}
                  />
                  <Select
                    label="Department"
                    value={editForm.department}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        department: e.target.value,
                      }))
                    }
                    options={[
                      { value: "", label: "Select Department" },
                      { value: "Service", label: "Service" },
                      { value: "Customer Service", label: "Customer Service" },
                      { value: "Management", label: "Management" },
                    ]}
                  />
                  <Input
                    label="Basic Salary"
                    type="number"
                    value={editForm.basicSalary}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        basicSalary: e.target.value,
                      }))
                    }
                  />
                  <Input
                    label="Bank Account"
                    value={editForm.bankAccount}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        bankAccount: e.target.value,
                      }))
                    }
                  />
                  <div className="flex justify-end space-x-3 pt-4">
                    <Button
                      variant="secondary"
                      onClick={() => setEditEmployee(null)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleEditSave}>Save Changes</Button>
                  </div>
                </div>
              </Modal>
            </div>
          )}

          {/* Attendance Tab */}
          {activeTab === "attendance" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  Today's Attendance
                </h3>
                <div className="flex space-x-2">
                  <Button variant="secondary">
                    <Download size={16} className="mr-2" />
                    Export
                  </Button>
                  <Button onClick={() => setIsMarkAttendanceModalOpen(true)}>
                    <Plus size={16} className="mr-2" />
                    Mark Attendance
                  </Button>
                </div>

                {/* Mark Attendance Modal */}
                <Modal
                  isOpen={isMarkAttendanceModalOpen}
                  onClose={() => setIsMarkAttendanceModalOpen(false)}
                  title="Mark Attendance"
                >
                  <div className="space-y-4">
                    <Select
                      label="Employee"
                      value={attendanceForm.employeeId}
                      onChange={(e) =>
                        setAttendanceForm((prev) => ({
                          ...prev,
                          employeeId: e.target.value,
                        }))
                      }
                      options={[
                        { value: "", label: "Select Employee" },
                        ...employees.map((emp) => ({
                          value: emp._id || emp.id,
                          label: `${emp.firstName} ${emp.lastName}`,
                        })),
                      ]}
                      error={attendanceErrors.employeeId}
                      required
                    />
                    <Input
                      label="Date"
                      type="date"
                      value={attendanceForm.date}
                      onChange={(e) =>
                        setAttendanceForm((prev) => ({
                          ...prev,
                          date: e.target.value,
                        }))
                      }
                      required
                    />
                    <Input
                      label="Check In"
                      type="time"
                      value={attendanceForm.checkIn}
                      onChange={(e) =>
                        setAttendanceForm((prev) => ({
                          ...prev,
                          checkIn: e.target.value,
                        }))
                      }
                      error={attendanceErrors.checkIn}
                      required
                    />
                    <Input
                      label="Check Out"
                      type="time"
                      value={attendanceForm.checkOut}
                      onChange={(e) =>
                        setAttendanceForm((prev) => ({
                          ...prev,
                          checkOut: e.target.value,
                        }))
                      }
                    />
                    <Select
                      label="Status"
                      value={attendanceForm.status}
                      onChange={(e) =>
                        setAttendanceForm((prev) => ({
                          ...prev,
                          status: e.target.value,
                        }))
                      }
                      options={[
                        { value: "", label: "Select Status" },
                        { value: "present", label: "Present" },
                        { value: "late", label: "Late" },
                        { value: "absent", label: "Absent" },
                      ]}
                      error={attendanceErrors.status}
                      required
                    />
                    <div className="flex justify-end space-x-3 pt-4">
                      <Button
                        variant="secondary"
                        onClick={() => setIsMarkAttendanceModalOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleMarkAttendance}>Submit</Button>
                    </div>
                  </div>
                </Modal>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center">
                    <CheckCircle size={24} className="text-green-600 mr-3" />
                    <div>
                      <p className="text-sm text-green-600">Present</p>
                      <p className="text-2xl font-bold text-green-800">8</p>
                    </div>
                  </div>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4">
                  <div className="flex items-center">
                    <AlertCircle size={24} className="text-yellow-600 mr-3" />
                    <div>
                      <p className="text-sm text-yellow-600">Late</p>
                      <p className="text-2xl font-bold text-yellow-800">2</p>
                    </div>
                  </div>
                </div>
                <div className="bg-red-50 rounded-lg p-4">
                  <div className="flex items-center">
                    <XCircle size={24} className="text-red-600 mr-3" />
                    <div>
                      <p className="text-sm text-red-600">Absent</p>
                      <p className="text-2xl font-bold text-red-800">1</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Employee
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Check In
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Check Out
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Hours
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Overtime
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {attendanceData.map((attendance) => {
                      const employee = employees.find(
                        (emp) =>
                          (emp._id || emp.id) ===
                          (attendance.employeeId._id ||
                            attendance.employeeId ||
                            attendance.employeeId.id)
                      );
                      return (
                        <tr key={attendance.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {employee
                                ? `${employee.firstName} ${employee.lastName}`
                                : "Unknown"}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {attendance.checkIn}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {attendance.checkOut || "-"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {attendance.hoursWorked}h
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {attendance.overtimeHours}h
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                                attendance.status
                              )}`}
                            >
                              <span className="mr-1">
                                {getStatusIcon(attendance.status)}
                              </span>
                              {attendance.status.charAt(0).toUpperCase() +
                                attendance.status.slice(1)}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Leave Management Tab */}
          {activeTab === "leaves" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  Leave Applications
                </h3>
                <Button onClick={() => setIsAddLeaveModalOpen(true)}>
                  <Plus size={16} className="mr-2" />
                  Apply Leave
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Employee
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Leave Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Duration
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Reason
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {user?.role === "admin" && "Actions"}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {leaves.map((leave) => (
                      <tr key={leave._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {leave.employeeId &&
                            typeof leave.employeeId === "object"
                              ? `${leave.employeeId.firstName} ${leave.employeeId.lastName}`
                              : "Unknown"}
                          </div>
                          <div className="text-sm text-gray-500">
                            Applied: {leave.appliedDate}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                            {leave.leaveType.charAt(0).toUpperCase() +
                              leave.leaveType.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {leave.startDate} to {leave.endDate}
                          </div>
                          <div className="text-sm text-gray-500">
                            {leave.days} day(s)
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {leave.reason}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                              leave.status
                            )}`}
                          >
                            <span className="mr-1">
                              {getStatusIcon(leave.status)}
                            </span>
                            {leave.status.charAt(0).toUpperCase() +
                              leave.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          {user?.role === "admin" &&
                            leave.status === "pending" && (
                              <div className="flex items-center justify-end space-x-2">
                                <button
                                  onClick={() => handleApproveLeave(leave._id)}
                                  className="text-green-600 hover:text-green-900 px-2 py-1 rounded border border-green-200 hover:bg-green-50"
                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() => handleRejectLeave(leave._id)}
                                  className="text-red-600 hover:text-red-900 px-2 py-1 rounded border border-red-200 hover:bg-red-50"
                                >
                                  Reject
                                </button>
                              </div>
                            )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Payroll Tab */}
          {activeTab === "payroll" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  Payroll Processing
                </h3>
                <div className="flex space-x-2">
                  <Button variant="secondary">
                    <Download size={16} className="mr-2" />
                    Export Payslips
                  </Button>
                  <Button>Process Payroll</Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left: form */}
                <div className="md:col-span-2 bg-white rounded-lg p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Select
                      label="Employee"
                      value={payrollForm.employeeId}
                      onChange={(e) =>
                        setPayrollForm((prev) => ({
                          ...prev,
                          employeeId: e.target.value,
                        }))
                      }
                      options={[
                        { value: "", label: "Select Employee" },
                        ...employees.map((emp) => ({
                          value: emp._id || emp.id,
                          label: `${emp.firstName} ${emp.lastName}`,
                        })),
                      ]}
                    />
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Basic Salary (LKR)
                      </label>
                      <input
                        value={(() => {
                          const emp = employees.find(
                            (e) => (e._id || e.id) === payrollForm.employeeId
                          );
                          return emp ? emp.basicSalary : "";
                        })()}
                        readOnly
                        className="w-full rounded-lg border border-gray-300 py-2 px-3 bg-gray-50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <Input
                      label="Overtime Hours"
                      type="number"
                      value={payrollForm.overtimeHours}
                      onChange={(e) =>
                        setPayrollForm((prev) => ({
                          ...prev,
                          overtimeHours: e.target.value,
                        }))
                      }
                    />
                    <Input
                      label="Overtime Rate (per hour)"
                      type="number"
                      value={payrollForm.overtimeRate}
                      onChange={(e) =>
                        setPayrollForm((prev) => ({
                          ...prev,
                          overtimeRate: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Transport Allowance"
                      type="number"
                      value={payrollForm.transportAllowance}
                      onChange={(e) =>
                        setPayrollForm((prev) => ({
                          ...prev,
                          transportAllowance: e.target.value,
                        }))
                      }
                    />
                    <Input
                      label="Meal Allowance"
                      type="number"
                      value={payrollForm.mealAllowance}
                      onChange={(e) =>
                        setPayrollForm((prev) => ({
                          ...prev,
                          mealAllowance: e.target.value,
                        }))
                      }
                    />
                    <Input
                      label="Accommodation Allowance"
                      type="number"
                      value={payrollForm.accommodationAllowance}
                      onChange={(e) =>
                        setPayrollForm((prev) => ({
                          ...prev,
                          accommodationAllowance: e.target.value,
                        }))
                      }
                    />
                    <Input
                      label="Medical Allowance"
                      type="number"
                      value={payrollForm.medicalAllowance}
                      onChange={(e) =>
                        setPayrollForm((prev) => ({
                          ...prev,
                          medicalAllowance: e.target.value,
                        }))
                      }
                    />
                    <Input
                      label="Other Allowance"
                      type="number"
                      value={payrollForm.otherAllowance}
                      onChange={(e) =>
                        setPayrollForm((prev) => ({
                          ...prev,
                          otherAllowance: e.target.value,
                        }))
                      }
                    />
                    <Input
                      label="Deductions"
                      type="number"
                      value={payrollForm.deductions}
                      onChange={(e) =>
                        setPayrollForm((prev) => ({
                          ...prev,
                          deductions: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <Button variant="secondary">Reset</Button>
                    <Button onClick={handleAddToPayroll}>Add to Payroll</Button>
                  </div>
                </div>

                {/* Right: summary box */}
                <div className="bg-white rounded-lg p-6">
                  <h4 className="text-lg font-semibold mb-3">
                    Salary Summary & Contributions
                  </h4>
                  {(() => {
                    const emp = employees.find(
                      (e) => (e._id || e.id) === payrollForm.employeeId
                    );
                    if (!emp) {
                      return (
                        <p className="text-sm text-gray-500">
                          Select an employee to see summary
                        </p>
                      );
                    }
                    const summary = computePayrollFor(emp, payrollForm);
                    return (
                      <div className="space-y-4">
                        <div className="bg-blue-50 p-3 rounded">
                          <div className="flex justify-between">
                            <div className="text-sm text-blue-700">
                              Basic Salary:
                            </div>
                            <div className="font-medium">
                              LKR {summary.basic.toLocaleString()}
                            </div>
                          </div>
                          <div className="flex justify-between mt-2">
                            <div className="text-sm text-blue-700">
                              Total Allowances:
                            </div>
                            <div className="font-medium">
                              LKR {summary.totalAllowances.toLocaleString()}
                            </div>
                          </div>
                          <div className="flex justify-between mt-2">
                            <div className="text-sm text-blue-700">
                              Overtime:
                            </div>
                            <div className="font-medium">
                              LKR {summary.overtimePay.toLocaleString()}
                            </div>
                          </div>
                          <div className="flex justify-between mt-3 border-t pt-3">
                            <div className="text-sm text-blue-800 font-semibold">
                              Gross Salary
                            </div>
                            <div className="font-bold">
                              LKR{" "}
                              {Math.round(summary.grossSalary).toLocaleString()}
                            </div>
                          </div>
                        </div>

                        <div className="bg-green-50 p-3 rounded">
                          <div className="flex justify-between">
                            <div className="text-sm text-green-700">
                              Employee EPF (8%):
                            </div>
                            <div className="font-medium">
                              - LKR{" "}
                              {Math.round(summary.employeeEPF).toLocaleString()}
                            </div>
                          </div>
                          <div className="flex justify-between mt-2">
                            <div className="text-sm text-green-700">
                              Employer EPF (12%):
                            </div>
                            <div className="font-medium">
                              LKR{" "}
                              {Math.round(summary.employerEPF).toLocaleString()}
                            </div>
                          </div>
                          <div className="flex justify-between mt-2">
                            <div className="text-sm text-green-700">
                              Employer ETF (3%):
                            </div>
                            <div className="font-medium">
                              LKR{" "}
                              {Math.round(summary.employerETF).toLocaleString()}
                            </div>
                          </div>

                          <div className="flex justify-between mt-3 border-t pt-3">
                            <div className="text-sm text-blue-800 font-semibold">
                              Net Salary
                            </div>
                            <div className="font-bold">
                              LKR{" "}
                              {Math.round(summary.netSalary).toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>

              {/* Payroll entries table */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Employee
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Basic
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Overtime
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Allowances
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Deductions
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Net
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {payrollEntries.map((p) => {
                      const entryId = p._id || p.id; // <-- ensure correct id
                      return (
                        <tr key={entryId} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {p.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            LKR {Math.round(p.basic).toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            LKR {Math.round(p.overtimePay).toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            LKR {Math.round(p.totalAllowances).toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            LKR {Math.round(p.deductions).toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            LKR {Math.round(p.netSalary).toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex items-center justify-end space-x-2">
                              <button
                                onClick={() =>
                                  handleRemovePayrollEntry(entryId)
                                }
                                className="text-red-600 hover:text-red-900 px-2 py-1 rounded border border-red-200 hover:bg-red-50"
                              >
                                Remove
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                    {payrollEntries.length === 0 && (
                      <tr>
                        <td
                          colSpan={7}
                          className="px-6 py-4 text-sm text-gray-500"
                        >
                          No payroll entries added
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Employee Modal */}
      <Modal
        isOpen={isAddEmployeeModalOpen}
        onClose={() => setIsAddEmployeeModalOpen(false)}
        title="Add New Employee"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="First Name"
              value={employeeForm.firstName}
              onChange={(e) =>
                setEmployeeForm((prev) => ({
                  ...prev,
                  firstName: e.target.value,
                }))
              }
              required
            />
            <Input
              label="Last Name"
              value={employeeForm.lastName}
              onChange={(e) =>
                setEmployeeForm((prev) => ({
                  ...prev,
                  lastName: e.target.value,
                }))
              }
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Email"
              type="email"
              value={employeeForm.email}
              onChange={(e) =>
                setEmployeeForm((prev) => ({ ...prev, email: e.target.value }))
              }
              required
            />
            <Input
              label="Phone"
              value={employeeForm.phone}
              onChange={(e) =>
                setEmployeeForm((prev) => ({ ...prev, phone: e.target.value }))
              }
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              label="Role"
              value={employeeForm.role}
              onChange={(e) =>
                setEmployeeForm((prev) => ({ ...prev, role: e.target.value }))
              }
              options={[
                { value: "", label: "Select Role" },
                { value: "Senior Technician", label: "Senior Technician" },
                { value: "Technician", label: "Technician" },
                { value: "Front Desk", label: "Front Desk" },
                { value: "Manager", label: "Manager" },
              ]}
              required
            />
            <Select
              label="Department"
              value={employeeForm.department}
              onChange={(e) =>
                setEmployeeForm((prev) => ({
                  ...prev,
                  department: e.target.value,
                }))
              }
              options={[
                { value: "", label: "Select Department" },
                { value: "Service", label: "Service" },
                { value: "Customer Service", label: "Customer Service" },
                { value: "Management", label: "Management" },
              ]}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Basic Salary"
              type="number"
              value={employeeForm.basicSalary}
              onChange={(e) =>
                setEmployeeForm((prev) => ({
                  ...prev,
                  basicSalary: e.target.value,
                }))
              }
              required
            />
            <Input
              label="Bank Account"
              value={employeeForm.bankAccount}
              onChange={(e) =>
                setEmployeeForm((prev) => ({
                  ...prev,
                  bankAccount: e.target.value,
                }))
              }
              placeholder="****1234"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              variant="secondary"
              onClick={() => setIsAddEmployeeModalOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleAddEmployee}>Add Employee</Button>
          </div>
        </div>
      </Modal>

      {/* Add Leave Modal */}
      <Modal
        isOpen={isAddLeaveModalOpen}
        onClose={() => setIsAddLeaveModalOpen(false)}
        title="Apply for Leave"
      >
        <div className="space-y-6">
          <Select
            label="Employee"
            value={leaveForm.employeeId}
            onChange={(e) =>
              setLeaveForm((prev) => ({ ...prev, employeeId: e.target.value }))
            }
            options={[
              { value: "", label: "Select Employee" },
              ...employees.map((emp) => ({
                value: emp._id || emp.id,
                label: `${emp.firstName} ${emp.lastName}`,
              })),
            ]}
            required
          />

          <Select
            label="Leave Type"
            value={leaveForm.leaveType}
            onChange={(e) => {
              const value = e.target.value;
              setLeaveForm((prev) => ({
                ...prev,
                leaveType: value,
                otherLeaveType:
                  value === "other" ? prev.otherLeaveType || "" : "", // "other" select பண்ணும்போது மட்டும் field வைத்திருக்கும்
              }));
            }}
            options={[
              { value: "", label: "Select Leave Type" },
              { value: "sick", label: "Sick Leave" },
              { value: "casual", label: "Casual Leave" },
              { value: "annual", label: "Annual Leave" },
              { value: "maternity", label: "Maternity Leave" },
              { value: "emergency", label: "Emergency Leave" },
              { value: "other", label: "Other" }, // புதிய option
            ]}
            required
          />
          {leaveForm.leaveType === "other" && (
            <Input
              label="Specify Other Leave Type"
              value={leaveForm.otherLeaveType || ""}
              onChange={(e) =>
                setLeaveForm((prev) => ({
                  ...prev,
                  otherLeaveType: e.target.value,
                }))
              }
              placeholder="Enter leave type"
              required
            />
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Start Date"
              type="date"
              value={leaveForm.startDate}
              onChange={(e) =>
                setLeaveForm((prev) => ({ ...prev, startDate: e.target.value }))
              }
              required
            />
            <Input
              label="End Date"
              type="date"
              value={leaveForm.endDate}
              onChange={(e) =>
                setLeaveForm((prev) => ({ ...prev, endDate: e.target.value }))
              }
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reason
            </label>
            <textarea
              value={leaveForm.reason}
              onChange={(e) =>
                setLeaveForm((prev) => ({ ...prev, reason: e.target.value }))
              }
              className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              placeholder="Reason for leave..."
              required
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              variant="secondary"
              onClick={() => setIsAddLeaveModalOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleAddLeave}>Submit Application</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Payroll;
