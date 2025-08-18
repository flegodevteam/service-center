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

// Sample data
const employeesData = [
  {
    id: "1",
    firstName: "Robert",
    lastName: "Smith",
    email: "robert@autoservice.com",
    phone: "(555) 123-4567",
    role: "Senior Technician",
    department: "Service",
    basicSalary: 4500,
    hireDate: "2022-01-15",
    isActive: true,
    bankAccount: "****1234",
  },
  {
    id: "2",
    firstName: "James",
    lastName: "Wilson",
    email: "james@autoservice.com",
    phone: "(555) 234-5678",
    role: "Technician",
    department: "Service",
    basicSalary: 3800,
    hireDate: "2022-03-20",
    isActive: true,
    bankAccount: "****5678",
  },
  {
    id: "3",
    firstName: "Lisa",
    lastName: "Brown",
    email: "lisa@autoservice.com",
    phone: "(555) 345-6789",
    role: "Front Desk",
    department: "Customer Service",
    basicSalary: 3200,
    hireDate: "2021-11-10",
    isActive: true,
    bankAccount: "****9012",
  },
];

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
  const [activeTab, setActiveTab] = useState("employees");

  const [searchTerm, setSearchTerm] = useState("");
  const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false);
  const [isAddLeaveModalOpen, setIsAddLeaveModalOpen] = useState(false);
  // const [selectedEmployee, setSelectedEmployee] = useState(null); // removed unused state
  const [employees, setEmployees] = useState(employeesData);
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

  const handleAddEmployee = async () => {
    try {
      const newEmployee = {
        id: (employees.length + 1).toString(),
        ...employeeForm,
        basicSalary: parseFloat(employeeForm.basicSalary),
        hireDate: new Date().toISOString().split("T")[0],
        isActive: true,
      };

      setEmployees((prev) => [...prev, newEmployee]);
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
      toast.error("Failed to add employee");
    }
  };

  const handleAddLeave = async () => {
    try {
      const employee = employees.find((emp) => emp.id === leaveForm.employeeId);
      const startDate = new Date(leaveForm.startDate);
      const endDate = new Date(leaveForm.endDate);
      const days =
        Math.ceil(
          (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
        ) + 1;

      const newLeave = {
        id: (leaves.length + 1).toString(),
        ...leaveForm,
        employeeName: employee
          ? `${employee.firstName} ${employee.lastName}`
          : "",
        days,
        status: "pending",
        appliedDate: new Date().toISOString().split("T")[0],
      };

      setLeaves((prev) => [...prev, newLeave]);
      setIsAddLeaveModalOpen(false);
      setLeaveForm({
        employeeId: "",
        leaveType: "",
        startDate: "",
        endDate: "",
        reason: "",
      });
      toast.success("Leave application submitted!");
    } catch (error) {
      toast.error("Failed to submit leave application");
    }
  };

  const handleApproveLeave = (leaveId) => {
    setLeaves((prev) =>
      prev.map((leave) =>
        leave.id === leaveId ? { ...leave, status: "approved" } : leave
      )
    );
    toast.success("Leave approved!");
  };

  const handleRejectLeave = (leaveId) => {
    setLeaves((prev) =>
      prev.map((leave) =>
        leave.id === leaveId ? { ...leave, status: "rejected" } : leave
      )
    );
    toast.success("Leave rejected!");
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
              <p className="text-2xl font-bold text-gray-800">$32,500</p>
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
          <nav className="flex space-x-8 px-6">
            {[
              {
                id: "employees",
                label: "Employees",
                icon: <Users size={20} />,
              },
              {
                id: "attendance",
                label: "Attendance",
                icon: <Clock size={20} />,
              },
              {
                id: "leaves",
                label: "Leave Management",
                icon: <Calendar size={20} />,
              },
              {
                id: "payroll",
                label: "Payroll",
                icon: <DollarSign size={20} />,
              },
            ].map((tab) => (
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

        <div className="p-6">
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
                          ${employee.basicSalary.toLocaleString()}
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
                            <button className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50">
                              <Eye size={16} />
                            </button>
                            <button className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50">
                              <Edit size={16} />
                            </button>
                            <button className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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
                  <Button>
                    <Plus size={16} className="mr-2" />
                    Mark Attendance
                  </Button>
                </div>
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
                        (emp) => emp.id === attendance.employeeId
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
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {leaves.map((leave) => (
                      <tr key={leave.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {leave.employeeName}
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
                          {leave.status === "pending" && (
                            <div className="flex items-center justify-end space-x-2">
                              <button
                                onClick={() => handleApproveLeave(leave.id)}
                                className="text-green-600 hover:text-green-900 px-2 py-1 rounded border border-green-200 hover:bg-green-50"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => handleRejectLeave(leave.id)}
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

              <div className="bg-blue-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-blue-800 mb-4">
                  June 2024 Payroll Summary
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-blue-600">Total Basic Salary</p>
                    <p className="text-xl font-bold text-blue-800">$32,500</p>
                  </div>
                  <div>
                    <p className="text-sm text-blue-600">Total Overtime</p>
                    <p className="text-xl font-bold text-blue-800">$2,150</p>
                  </div>
                  <div>
                    <p className="text-sm text-blue-600">Total Deductions</p>
                    <p className="text-xl font-bold text-blue-800">$3,200</p>
                  </div>
                  <div>
                    <p className="text-sm text-blue-600">Net Payroll</p>
                    <p className="text-xl font-bold text-blue-800">$31,450</p>
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
                        Basic Salary
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Overtime
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Deductions
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Net Salary
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
                    {employees.map((employee) => {
                      const overtime = 150; // Mock overtime
                      const deductions = employee.basicSalary * 0.1; // Mock deductions
                      const netSalary =
                        employee.basicSalary + overtime - deductions;

                      return (
                        <tr key={employee.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {employee.firstName} {employee.lastName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {employee.role}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ${employee.basicSalary.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ${overtime}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ${deductions.toFixed(0)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            ${netSalary.toFixed(0)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Processed
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 px-2 py-1 rounded border border-blue-200 hover:bg-blue-50">
                              View Payslip
                            </button>
                          </td>
                        </tr>
                      );
                    })}
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
                value: emp.id,
                label: `${emp.firstName} ${emp.lastName}`,
              })),
            ]}
            required
          />

          <Select
            label="Leave Type"
            value={leaveForm.leaveType}
            onChange={(e) =>
              setLeaveForm((prev) => ({ ...prev, leaveType: e.target.value }))
            }
            options={[
              { value: "", label: "Select Leave Type" },
              { value: "sick", label: "Sick Leave" },
              { value: "casual", label: "Casual Leave" },
              { value: "annual", label: "Annual Leave" },
              { value: "maternity", label: "Maternity Leave" },
              { value: "emergency", label: "Emergency Leave" },
            ]}
            required
          />

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
