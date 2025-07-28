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
    <div className="space-y-6">
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
                <button
                  onClick={() => setReportType("revenue")}
                  className={`block px-4 py-2 text-sm text-left w-full hover:bg-gray-100 ${
                    reportType === "revenue"
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-700"
                  }`}
                >
                  Revenue Report
                </button>
                <button
                  onClick={() => setReportType("service")}
                  className={`block px-4 py-2 text-sm text-left w-full hover:bg-gray-100 ${
                    reportType === "service"
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-700"
                  }`}
                >
                  Service Analysis
                </button>
                <button
                  onClick={() => setReportType("inventory")}
                  className={`block px-4 py-2 text-sm text-left w-full hover:bg-gray-100 ${
                    reportType === "inventory"
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-700"
                  }`}
                >
                  Inventory Usage
                </button>
                <button
                  onClick={() => setReportType("technician")}
                  className={`block px-4 py-2 text-sm text-left w-full hover:bg-gray-100 ${
                    reportType === "technician"
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-700"
                  }`}
                >
                  Technician Performance
                </button>
              </div>
            </div>

            <div className="relative group">
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center">
                <Calendar size={16} className="mr-2" />
                <span>Date Range</span>
                <ChevronDown size={16} className="ml-2" />
              </button>

              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block z-10">
                <button
                  onClick={() => setDateRange("week")}
                  className={`block px-4 py-2 text-sm text-left w-full hover:bg-gray-100 ${
                    dateRange === "week"
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-700"
                  }`}
                >
                  Last 7 Days
                </button>
                <button
                  onClick={() => setDateRange("month")}
                  className={`block px-4 py-2 text-sm text-left w-full hover:bg-gray-100 ${
                    dateRange === "month"
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-700"
                  }`}
                >
                  Last 30 Days
                </button>
                <button
                  onClick={() => setDateRange("quarter")}
                  className={`block px-4 py-2 text-sm text-left w-full hover:bg-gray-100 ${
                    dateRange === "quarter"
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-700"
                  }`}
                >
                  Last 3 Months
                </button>
                <button
                  onClick={() => setDateRange("year")}
                  className={`block px-4 py-2 text-sm text-left w-full hover:bg-gray-100 ${
                    dateRange === "year"
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-700"
                  }`}
                >
                  Last 12 Months
                </button>
                <button
                  onClick={() => setDateRange("custom")}
                  className={`block px-4 py-2 text-sm text-left w-full hover:bg-gray-100 ${
                    dateRange === "custom"
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-700"
                  }`}
                >
                  Custom Range
                </button>
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
                <div className="rounded-full p-3 bg-purple-100">
                  <FileText size={20} className="text-purple-700" />
                </div>
              </div>
              <div className="flex items-center mt-2 text-sm">
                <TrendingUp size={16} className="text-green-500 mr-1" />
                <span className="text-green-500 font-medium">+8.7%</span>
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
                    New Customers
                  </p>
                  <p className="text-2xl font-bold text-gray-800">142</p>
                </div>
                <div className="rounded-full p-3 bg-yellow-100">
                  <LineChart size={20} className="text-yellow-700" />
                </div>
              </div>
              <div className="flex items-center mt-2 text-sm">
                <TrendingUp size={16} className="text-green-500 mr-1" />
                <span className="text-green-500 font-medium">+15.3%</span>
                <span className="text-gray-500 ml-1">vs last period</span>
              </div>
            </motion.div>
          </div>

          {/* Revenue Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              className="bg-white rounded-xl shadow-sm p-6 lg:col-span-2"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Monthly Revenue
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} />
                    <Bar dataKey="revenue" fill="#0F52BA" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.6 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Service Distribution
              </h3>
              <div className="h-80 " >
                <ResponsiveContainer width="150%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={serviceTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {serviceTypeData.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [`${value}%`, "Percentage"]}
                    />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          {/* Top Services Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.7 }}
            className="bg-white rounded-xl shadow-sm overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">
                Top Performing Services
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Service
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Jobs
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Revenue
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Avg. Value
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Growth
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        Oil Change
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">215</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">$10,750</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">$50.00</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-green-600 flex items-center">
                        <TrendingUp size={16} className="mr-1" />
                        12.5%
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        Brake Service
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">98</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">$19,600</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">$200.00</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-green-600 flex items-center">
                        <TrendingUp size={16} className="mr-1" />
                        8.2%
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        Tire Service
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">87</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">$13,050</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">$150.00</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-green-600 flex items-center">
                        <TrendingUp size={16} className="mr-1" />
                        15.7%
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        Engine Repair
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">42</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">$31,500</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">$750.00</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-green-600 flex items-center">
                        <TrendingUp size={16} className="mr-1" />
                        5.3%
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        AC Service
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">36</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">$9,000</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">$250.00</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-green-600 flex items-center">
                        <TrendingUp size={16} className="mr-1" />
                        18.9%
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      )}

      {reportType !== "revenue" && (
        <div className="bg-white rounded-xl shadow-sm p-16 flex flex-col items-center justify-center">
          <PieChart size={48} className="text-gray-300 mb-4" />
          <p className="text-gray-500 text-center text-lg mb-2">
            Report in development
          </p>
          <p className="text-gray-400 text-center">
            This report type will be available soon!
          </p>
        </div>
      )}
    </div>
  );
};

export default Reports;
