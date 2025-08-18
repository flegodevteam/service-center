import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Calendar,
  PieChart,
  BarChart3,
  X,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

import toast from "react-hot-toast";
import { Loader } from "lucide-react";

// Sample data
// const incomeData = [
//   {
//     id: "1",
//     source: "service",
//     description: "Oil Change Service",
//     amount: 95.75,
//     date: "2024-06-15",
//     invoiceId: "INV-001",
//   },
//   {
//     id: "2",
//     source: "parts",
//     description: "Brake Pads Sale",
//     amount: 150.0,
//     date: "2024-06-15",
//     invoiceId: "INV-002",
//   },
//   {
//     id: "3",
//     source: "service",
//     description: "Full Service",
//     amount: 485.0,
//     date: "2024-06-14",
//     invoiceId: "INV-003",
//   },
//   {
//     id: "4",
//     source: "other",
//     description: "Insurance Claim",
//     amount: 1200.0,
//     date: "2024-06-13",
//     invoiceId: null,
//   },
// ];

// const expenseData = [
//   {
//     id: "1",
//     category: "Payroll",
//     description: "Monthly Salaries",
//     amount: 32500,
//     date: "2024-06-01",
//     paymentMethod: "Bank Transfer",
//   },
//   {
//     id: "2",
//     category: "Inventory",
//     description: "Spare Parts Purchase",
//     amount: 5500,
//     date: "2024-06-10",
//     paymentMethod: "Credit Card",
//   },
//   {
//     id: "3",
//     category: "Utilities",
//     description: "Electricity Bill",
//     amount: 850,
//     date: "2024-06-05",
//     paymentMethod: "Online Payment",
//   },
//   {
//     id: "4",
//     category: "Rent",
//     description: "Workshop Rent",
//     amount: 4000,
//     date: "2024-06-01",
//     paymentMethod: "Bank Transfer",
//   },
//   {
//     id: "5",
//     category: "Maintenance",
//     description: "Equipment Servicing",
//     amount: 750,
//     date: "2024-06-12",
//     paymentMethod: "Cash",
//   },
// ];

// const monthlyData = [
//   { month: "Jan", income: 45000, expenses: 38000, profit: 7000 },
//   { month: "Feb", income: 52000, expenses: 41000, profit: 11000 },
//   { month: "Mar", income: 48000, expenses: 39000, profit: 9000 },
//   { month: "Apr", income: 55000, expenses: 43000, profit: 12000 },
//   { month: "May", income: 58000, expenses: 45000, profit: 13000 },
//   { month: "Jun", income: 62000, expenses: 47000, profit: 15000 },
// ];

// const incomeSourceData = [
//   { name: "Services", value: 65, color: "#0088FE" },
//   { name: "Parts Sales", value: 25, color: "#00C49F" },
//   { name: "Other", value: 10, color: "#FFBB28" },
// ];

// const expenseCategoryData = [
//   { name: "Payroll", value: 45, color: "#FF8042" },
//   { name: "Inventory", value: 20, color: "#8884d8" },
//   { name: "Utilities", value: 15, color: "#82ca9d" },
//   { name: "Rent", value: 12, color: "#ffc658" },
//   { name: "Other", value: 8, color: "#ff7300" },
// ];

// --- Button Component ---

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
    <motion.button
      whileHover={{ scale: loading || disabled ? 1 : 1.02 }}
      whileTap={{ scale: loading || disabled ? 1 : 0.98 }}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={loading || disabled}
      {...props}
    >
      {loading && <Loader size={16} className="animate-spin mr-2" />}
      {children}
    </motion.button>
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

// Sample data
const incomeData = [
  {
    id: "1",
    source: "service",
    description: "Oil Change Service",
    amount: 95.75,
    date: "2024-06-15",
    invoiceId: "INV-001",
  },
  {
    id: "2",
    source: "parts",
    description: "Brake Pads Sale",
    amount: 150.0,
    date: "2024-06-15",
    invoiceId: "INV-002",
  },
  {
    id: "3",
    source: "service",
    description: "Full Service",
    amount: 485.0,
    date: "2024-06-14",
    invoiceId: "INV-003",
  },
  {
    id: "4",
    source: "other",
    description: "Insurance Claim",
    amount: 1200.0,
    date: "2024-06-13",
    invoiceId: null,
  },
];

const expenseData = [
  {
    id: "1",
    category: "Payroll",
    description: "Monthly Salaries",
    amount: 32500,
    date: "2024-06-01",
    paymentMethod: "Bank Transfer",
  },
  {
    id: "2",
    category: "Inventory",
    description: "Spare Parts Purchase",
    amount: 5500,
    date: "2024-06-10",
    paymentMethod: "Credit Card",
  },
  {
    id: "3",
    category: "Utilities",
    description: "Electricity Bill",
    amount: 850,
    date: "2024-06-05",
    paymentMethod: "Online Payment",
  },
  {
    id: "4",
    category: "Rent",
    description: "Workshop Rent",
    amount: 4000,
    date: "2024-06-01",
    paymentMethod: "Bank Transfer",
  },
  {
    id: "5",
    category: "Maintenance",
    description: "Equipment Servicing",
    amount: 750,
    date: "2024-06-12",
    paymentMethod: "Cash",
  },
];

const monthlyData = [
  { month: "Jan", income: 45000, expenses: 38000, profit: 7000 },
  { month: "Feb", income: 52000, expenses: 41000, profit: 11000 },
  { month: "Mar", income: 48000, expenses: 39000, profit: 9000 },
  { month: "Apr", income: 55000, expenses: 43000, profit: 12000 },
  { month: "May", income: 58000, expenses: 45000, profit: 13000 },
  { month: "Jun", income: 62000, expenses: 47000, profit: 15000 },
];

const incomeSourceData = [
  { name: "Services", value: 65, color: "#0088FE" },
  { name: "Parts Sales", value: 25, color: "#00C49F" },
  { name: "Other", value: 10, color: "#FFBB28" },
];

const expenseCategoryData = [
  { name: "Payroll", value: 45, color: "#FF8042" },
  { name: "Inventory", value: 20, color: "#8884d8" },
  { name: "Utilities", value: 15, color: "#82ca9d" },
  { name: "Rent", value: 12, color: "#ffc658" },
  { name: "Other", value: 8, color: "#ff7300" },
];

const Finance = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddIncomeModalOpen, setIsAddIncomeModalOpen] = useState(false);
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);
  const [income, setIncome] = useState(incomeData);
  const [expenses, setExpenses] = useState(expenseData);

  const [incomeForm, setIncomeForm] = useState({
    source: "",
    description: "",
    amount: "",
    date: "",
    invoiceId: "",
  });

  const [expenseForm, setExpenseForm] = useState({
    category: "",
    description: "",
    amount: "",
    date: "",
    paymentMethod: "",
  });

  // Calculate totals
  const totalIncome = income.reduce((sum, item) => sum + item.amount, 0);
  const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);
  const netProfit = totalIncome - totalExpenses;
  const profitMargin =
    totalIncome > 0 ? ((netProfit / totalIncome) * 100).toFixed(1) : "0";

  const handleAddIncome = async () => {
    try {
      const newIncome = {
        id: (income.length + 1).toString(),
        ...incomeForm,
        amount: parseFloat(incomeForm.amount),
      };

      setIncome((prev) => [...prev, newIncome]);
      setIsAddIncomeModalOpen(false);
      setIncomeForm({
        source: "",
        description: "",
        amount: "",
        date: "",
        invoiceId: "",
      });
      toast.success("Income record added successfully!");
    } catch (error) {
      toast.error("Failed to add income record");
    }
  };

  const handleAddExpense = async () => {
    try {
      const newExpense = {
        id: (expenses.length + 1).toString(),
        ...expenseForm,
        amount: parseFloat(expenseForm.amount),
      };

      setExpenses((prev) => [...prev, newExpense]);
      setIsAddExpenseModalOpen(false);
      setExpenseForm({
        category: "",
        description: "",
        amount: "",
        date: "",
        paymentMethod: "",
      });
      toast.success("Expense record added successfully!");
    } catch (error) {
      toast.error("Failed to add expense record");
    }
  };

  const handleExportData = (type) => {
    let data, filename;

    switch (type) {
      case "income":
        data = income;
        filename = "income-report.json";
        break;
      case "expenses":
        data = expenses;
        filename = "expenses-report.json";
        break;
      case "profit":
        data = monthlyData;
        filename = "profit-report.json";
        break;
    }

    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });

    const element = document.createElement("a");
    element.href = URL.createObjectURL(dataBlob);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    toast.success(
      `${
        type.charAt(0).toUpperCase() + type.slice(1)
      } report exported successfully!`
    );
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl font-bold text-gray-800">Finance Management</h1>
        <p className="text-gray-600">
          Track income, expenses, and profit calculations.
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
              <p className="text-sm font-medium text-gray-600">Total Income</p>
              <p className="text-2xl font-bold text-gray-800">
                ${totalIncome.toLocaleString()}
              </p>
            </div>
            <div className="rounded-full p-3 bg-green-100">
              <TrendingUp size={20} className="text-green-700" />
            </div>
          </div>
          <div className="flex items-center mt-2 text-sm">
            <TrendingUp size={16} className="text-green-500 mr-1" />
            <span className="text-green-500 font-medium">+12.5%</span>
            <span className="text-gray-500 ml-1">vs last month</span>
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
              <p className="text-sm font-medium text-gray-600">
                Total Expenses
              </p>
              <p className="text-2xl font-bold text-gray-800">
                ${totalExpenses.toLocaleString()}
              </p>
            </div>
            <div className="rounded-full p-3 bg-red-100">
              <TrendingDown size={20} className="text-red-700" />
            </div>
          </div>
          <div className="flex items-center mt-2 text-sm">
            <TrendingUp size={16} className="text-red-500 mr-1" />
            <span className="text-red-500 font-medium">+8.2%</span>
            <span className="text-gray-500 ml-1">vs last month</span>
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
              <p className="text-sm font-medium text-gray-600">Net Profit</p>
              <p className="text-2xl font-bold text-gray-800">
                ${netProfit.toLocaleString()}
              </p>
            </div>
            <div className="rounded-full p-3 bg-blue-100">
              <DollarSign size={20} className="text-blue-700" />
            </div>
          </div>
          <div className="flex items-center mt-2 text-sm">
            <TrendingUp size={16} className="text-green-500 mr-1" />
            <span className="text-green-500 font-medium">+15.3%</span>
            <span className="text-gray-500 ml-1">vs last month</span>
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
              <p className="text-sm font-medium text-gray-600">Profit Margin</p>
              <p className="text-2xl font-bold text-gray-800">
                {profitMargin}%
              </p>
            </div>
            <div className="rounded-full p-3 bg-purple-100">
              <BarChart3 size={20} className="text-purple-700" />
            </div>
          </div>
          <div className="flex items-center mt-2 text-sm">
            <TrendingUp size={16} className="text-green-500 mr-1" />
            <span className="text-green-500 font-medium">+2.1%</span>
            <span className="text-gray-500 ml-1">vs last month</span>
          </div>
        </motion.div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              {
                id: "dashboard",
                label: "Dashboard",
                icon: <BarChart3 size={20} />,
              },
              {
                id: "income",
                label: "Income Tracking",
                icon: <TrendingUp size={20} />,
              },
              {
                id: "expenses",
                label: "Expense Tracking",
                icon: <TrendingDown size={20} />,
              },
              {
                id: "reports",
                label: "Profit Reports",
                icon: <PieChart size={20} />,
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
          {/* Dashboard Tab */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Monthly Profit Trend
                  </h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`$${value}`, ""]} />
                        <Line
                          type="monotone"
                          dataKey="profit"
                          stroke="#0F52BA"
                          strokeWidth={3}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Income vs Expenses
                  </h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`$${value}`, ""]} />
                        <Bar dataKey="income" fill="#00C49F" />
                        <Bar dataKey="expenses" fill="#FF8042" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Income Sources
                  </h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={incomeSourceData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) =>
                            `${name} ${(percent * 100).toFixed(0)}%`
                          }
                        >
                          {incomeSourceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value) => [`${value}%`, "Percentage"]}
                        />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Expense Categories
                  </h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={expenseCategoryData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) =>
                            `${name} ${(percent * 100).toFixed(0)}%`
                          }
                        >
                          {expenseCategoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value) => [`${value}%`, "Percentage"]}
                        />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Income Tab */}
          {activeTab === "income" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="relative w-96">
                  <input
                    type="text"
                    placeholder="Search income records..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <Search
                    size={18}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="secondary"
                    onClick={() => handleExportData("income")}
                  >
                    <Download size={16} className="mr-2" />
                    Export
                  </Button>
                  <Button onClick={() => setIsAddIncomeModalOpen(true)}>
                    <Plus size={16} className="mr-2" />
                    Add Income
                  </Button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Source
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Invoice
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {income.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              item.source === "service"
                                ? "bg-blue-100 text-blue-800"
                                : item.source === "parts"
                                ? "bg-green-100 text-green-800"
                                : "bg-purple-100 text-purple-800"
                            }`}
                          >
                            {item.source.charAt(0).toUpperCase() +
                              item.source.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          ${item.amount.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.invoiceId || "-"}
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

          {/* Expenses Tab */}
          {activeTab === "expenses" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="relative w-96">
                  <input
                    type="text"
                    placeholder="Search expense records..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <Search
                    size={18}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="secondary"
                    onClick={() => handleExportData("expenses")}
                  >
                    <Download size={16} className="mr-2" />
                    Export
                  </Button>
                  <Button onClick={() => setIsAddExpenseModalOpen(true)}>
                    <Plus size={16} className="mr-2" />
                    Add Expense
                  </Button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Payment Method
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {expenses.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              item.category === "Payroll"
                                ? "bg-red-100 text-red-800"
                                : item.category === "Inventory"
                                ? "bg-orange-100 text-orange-800"
                                : item.category === "Utilities"
                                ? "bg-yellow-100 text-yellow-800"
                                : item.category === "Rent"
                                ? "bg-purple-100 text-purple-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {item.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          ${item.amount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.paymentMethod}
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

          {/* Reports Tab */}
          {activeTab === "reports" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  Profit Analysis Reports
                </h3>
                <Button onClick={() => handleExportData("profit")}>
                  <Download size={16} className="mr-2" />
                  Export Report
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">
                    Profit Trend Analysis
                  </h4>
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`$${value}`, ""]} />
                        <Bar dataKey="income" fill="#00C49F" name="Income" />
                        <Bar
                          dataKey="expenses"
                          fill="#FF8042"
                          name="Expenses"
                        />
                        <Bar dataKey="profit" fill="#0F52BA" name="Profit" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-white rounded-lg p-6 border">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">
                      Key Metrics
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-600">
                          Average Monthly Profit
                        </p>
                        <p className="text-xl font-bold text-green-600">
                          $11,167
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">
                          Best Performing Month
                        </p>
                        <p className="text-xl font-bold text-blue-600">
                          June ($15,000)
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Growth Rate</p>
                        <p className="text-xl font-bold text-purple-600">
                          +114%
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">
                          Break-even Point
                        </p>
                        <p className="text-xl font-bold text-orange-600">
                          $47,000
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-6 border">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">
                      Recommendations
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                        <p className="text-sm text-gray-600">
                          Focus on service revenue - highest profit margin
                        </p>
                      </div>
                      <div className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                        <p className="text-sm text-gray-600">
                          Review payroll expenses for optimization
                        </p>
                      </div>
                      <div className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <p className="text-sm text-gray-600">
                          Increase parts sales to boost revenue
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Income Modal */}
      <Modal
        isOpen={isAddIncomeModalOpen}
        onClose={() => setIsAddIncomeModalOpen(false)}
        title="Add Income Record"
      >
        <div className="space-y-6">
          <Select
            label="Income Source"
            value={incomeForm.source}
            onChange={(e) =>
              setIncomeForm((prev) => ({ ...prev, source: e.target.value }))
            }
            options={[
              { value: "", label: "Select Source" },
              { value: "service", label: "Service Revenue" },
              { value: "parts", label: "Parts Sales" },
              { value: "other", label: "Other Income" },
            ]}
            required
          />

          <Input
            label="Description"
            value={incomeForm.description}
            onChange={(e) =>
              setIncomeForm((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            placeholder="Enter description"
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Amount"
              type="number"
              step="0.01"
              value={incomeForm.amount}
              onChange={(e) =>
                setIncomeForm((prev) => ({ ...prev, amount: e.target.value }))
              }
              placeholder="0.00"
              required
            />
            <Input
              label="Date"
              type="date"
              value={incomeForm.date}
              onChange={(e) =>
                setIncomeForm((prev) => ({ ...prev, date: e.target.value }))
              }
              required
            />
          </div>

          <Input
            label="Invoice ID (Optional)"
            value={incomeForm.invoiceId}
            onChange={(e) =>
              setIncomeForm((prev) => ({ ...prev, invoiceId: e.target.value }))
            }
            placeholder="INV-001"
          />

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              variant="secondary"
              onClick={() => setIsAddIncomeModalOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleAddIncome}>Add Income</Button>
          </div>
        </div>
      </Modal>

      {/* Add Expense Modal */}
      <Modal
        isOpen={isAddExpenseModalOpen}
        onClose={() => setIsAddExpenseModalOpen(false)}
        title="Add Expense Record"
      >
        <div className="space-y-6">
          <Select
            label="Expense Category"
            value={expenseForm.category}
            onChange={(e) =>
              setExpenseForm((prev) => ({ ...prev, category: e.target.value }))
            }
            options={[
              { value: "", label: "Select Category" },
              { value: "Payroll", label: "Payroll" },
              { value: "Inventory", label: "Inventory" },
              { value: "Utilities", label: "Utilities" },
              { value: "Rent", label: "Rent" },
              { value: "Maintenance", label: "Maintenance" },
              { value: "Marketing", label: "Marketing" },
              { value: "Other", label: "Other" },
            ]}
            required
          />

          <Input
            label="Description"
            value={expenseForm.description}
            onChange={(e) =>
              setExpenseForm((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            placeholder="Enter description"
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Amount"
              type="number"
              step="0.01"
              value={expenseForm.amount}
              onChange={(e) =>
                setExpenseForm((prev) => ({ ...prev, amount: e.target.value }))
              }
              placeholder="0.00"
              required
            />
            <Input
              label="Date"
              type="date"
              value={expenseForm.date}
              onChange={(e) =>
                setExpenseForm((prev) => ({ ...prev, date: e.target.value }))
              }
              required
            />
          </div>

          <Select
            label="Payment Method"
            value={expenseForm.paymentMethod}
            onChange={(e) =>
              setExpenseForm((prev) => ({
                ...prev,
                paymentMethod: e.target.value,
              }))
            }
            options={[
              { value: "", label: "Select Payment Method" },
              { value: "Cash", label: "Cash" },
              { value: "Credit Card", label: "Credit Card" },
              { value: "Bank Transfer", label: "Bank Transfer" },
              { value: "Online Payment", label: "Online Payment" },
              { value: "Check", label: "Check" },
            ]}
            required
          />

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              variant="secondary"
              onClick={() => setIsAddExpenseModalOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleAddExpense}>Add Expense</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Finance;
