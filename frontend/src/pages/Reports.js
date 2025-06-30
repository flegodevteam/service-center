import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Download,
  ChevronDown,
  FileText,
  DollarSign,
  Calendar,
  BarChart2,
  PieChart,
  LineChart,
  TrendingUp,
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
} from "recharts";

// Sample data for charts
const revenueData = [
  { month: "Jan", revenue: 14500 },
  { month: "Feb", revenue: 16800 },
  { month: "Mar", revenue: 18200 },
  { month: "Apr", revenue: 17500 },
  { month: "May", revenue: 19200 },
  { month: "Jun", revenue: 20500 },
];

const serviceTypeData = [
  { name: "Oil Change", value: 35 },
  { name: "Brake Service", value: 20 },
  { name: "Tire Service", value: 15 },
  { name: "Engine Repair", value: 10 },
  { name: "AC Service", value: 8 },
  { name: "Other", value: 12 },
];

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#82ca9d",
];

const topServices = [
  { name: "Oil Change", count: 350, revenue: 7000 },
  { name: "Brake Service", count: 200, revenue: 4000 },
  { name: "Tire Service", count: 150, revenue: 3000 },
  { name: "Engine Repair", count: 100, revenue: 5000 },
  { name: "AC Service", count: 80, revenue: 1600 },
];

const Reports = () => {
  const [reportType, setReportType] = useState("revenue");
  const [dateRange, setDateRange] = useState("month");

  const getReportTitle = () => {
    switch (reportType) {
      case "revenue":
        return "Revenue Report";
      case "service":
        return "Service Analysis";
      case "inventory":
        return "Inventory Usage";
      case "technician":
        return "Technician Performance";
      default:
        return "Report";
    }
  };

  const getDateRangeText = () => {
    switch (dateRange) {
      case "week":
        return "Last 7 Days";
      case "month":
        return "Last 30 Days";
      case "quarter":
        return "Last 3 Months";
      case "year":
        return "Last 12 Months";
      default:
        return "Custom Range";
    }
  };

  return (
    <div className="space-y-6 p-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl font-bold text-gray-800">
          Reports & Analytics
        </h1>
        <p className="text-gray-600">
          Gain insights into your service center's performance.
        </p>
      </motion.div>

      {/* Report Controls */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              {getReportTitle()}
            </h2>
            <p className="text-gray-600">{getDateRangeText()}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative group">
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center">
                <FileText size={16} className="mr-2" />
                <span>Report Type</span>
                <ChevronDown size={16} className="ml-2" />
              </button>

              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block z-10">
                {["revenue", "service", "inventory", "technician"].map(
                  (type) => (
                    <button
                      key={type}
                      onClick={() => setReportType(type)}
                      className={`block px-4 py-2 text-sm text-left w-full hover:bg-gray-100 ${
                        reportType === type
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-700"
                      }`}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}{" "}
                      {type === "revenue"
                        ? "Report"
                        : type === "service"
                        ? "Analysis"
                        : type === "inventory"
                        ? "Usage"
                        : "Performance"}
                    </button>
                  )
                )}
              </div>
            </div>

            <div className="relative group">
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center">
                <Calendar size={16} className="mr-2" />
                <span>Date Range</span>
                <ChevronDown size={16} className="ml-2" />
              </button>

              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block z-10">
                {["week", "month", "quarter", "year", "custom"].map((range) => (
                  <button
                    key={range}
                    onClick={() => setDateRange(range)}
                    className={`block px-4 py-2 text-sm text-left w-full hover:bg-gray-100 ${
                      dateRange === range
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-700"
                    }`}
                  >
                    {range === "week"
                      ? "Last 7 Days"
                      : range === "month"
                      ? "Last 30 Days"
                      : range === "quarter"
                      ? "Last 3 Months"
                      : range === "year"
                      ? "Last 12 Months"
                      : "Custom Range"}
                  </button>
                ))}
              </div>
            </div>

            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
              <Download size={16} className="mr-2" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Report Content */}
      {reportType === "revenue" && (
        <div className="space-y-6">
          {/* Revenue Summary Cards */}
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
                    Total Revenue
                  </p>
                  <p className="text-2xl font-bold text-gray-800">$106,700</p>
                </div>
                <div className="rounded-full p-3 bg-blue-100">
                  <DollarSign size={20} className="text-blue-700" />
                </div>
              </div>
              <div className="flex items-center mt-2 text-sm">
                <TrendingUp size={16} className="text-green-500 mr-1" />
                <span className="text-green-500 font-medium">+12.5%</span>
                <span className="text-gray-500 ml-1">vs last period</span>
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
                    Average Job Value
                  </p>
                  <p className="text-2xl font-bold text-gray-800">$185.50</p>
                </div>
                <div className="rounded-full p-3 bg-green-100">
                  <BarChart2 size={20} className="text-green-700" />
                </div>
              </div>
              <div className="flex items-center mt-2 text-sm">
                <TrendingUp size={16} className="text-green-500 mr-1" />
                <span className="text-green-500 font-medium">+5.2%</span>
                <span className="text-gray-500 ml-1">vs last period</span>
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
                    Jobs Completed
                  </p>
                  <p className="text-2xl font-bold text-gray-800">576</p>
                </div>
                <div className="rounded-full p-3 bg-yellow-100">
                  <FileText size={20} className="text-yellow-700" />
                </div>
              </div>
              <div className="flex items-center mt-2 text-sm">
                <TrendingUp size={16} className="text-red-500 mr-1" />
                <span className="text-red-500 font-medium">-2.1%</span>
                <span className="text-gray-500 ml-1">vs last period</span>
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
                    Average Revenue/Day
                  </p>
                  <p className="text-2xl font-bold text-gray-800">$3,540</p>
                </div>
                <div className="rounded-full p-3 bg-purple-100">
                  <LineChart size={20} className="text-purple-700" />
                </div>
              </div>
              <div className="flex items-center mt-2 text-sm">
                <TrendingUp size={16} className="text-green-500 mr-1" />
                <span className="text-green-500 font-medium">+8.7%</span>
                <span className="text-gray-500 ml-1">vs last period</span>
              </div>
            </motion.div>
          </div>

          {/* Revenue Bar Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Monthly Revenue
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={revenueData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#3182ce" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Top Services Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.7 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Top Services
            </h3>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-2 px-3 text-sm font-medium text-gray-600">
                    Service
                  </th>
                  <th className="py-2 px-3 text-sm font-medium text-gray-600">
                    Jobs Completed
                  </th>
                  <th className="py-2 px-3 text-sm font-medium text-gray-600">
                    Revenue
                  </th>
                </tr>
              </thead>
              <tbody>
                {topServices.map(({ name, count, revenue }, index) => (
                  <tr
                    key={name}
                    className={index % 2 === 0 ? "bg-gray-50" : ""}
                  >
                    <td className="py-2 px-3 text-gray-700">{name}</td>
                    <td className="py-2 px-3 text-gray-700">{count}</td>
                    <td className="py-2 px-3 text-gray-700">
                      ${revenue.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      )}

      {/* Placeholder for other report types */}
      {(reportType === "service" ||
        reportType === "inventory" ||
        reportType === "technician") && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-sm p-6 text-center text-gray-600"
        >
          <p>
            Detailed reports for <strong>{getReportTitle()}</strong> coming
            soon!
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default Reports;
