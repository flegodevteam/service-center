import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Clock,
  Users,
  Car,
  FileText,
  DollarSign,
  TrendingUp,
  Zap,
  AlertCircle,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router-dom";
import AppointmentContext from "../context/AppointmentContext";
import { CustomerContext } from "../context/CustomerContext";
import { VehicleContext } from "../context/VehicleContext";
import axios from "axios";
import { API_URL } from "../api/api";
import { useAuth } from "../context/AuthContext"; // Step 1: import

// Sample data for charts (can be replaced with real data)
const serviceData = [
  { name: "Jan", value: 12 },
  { name: "Feb", value: 19 },
  { name: "Mar", value: 13 },
  { name: "Apr", value: 22 },
  { name: "May", value: 28 },
  { name: "Jun", value: 25 },
];

const Dashboard = () => {
  const { user } = useAuth();
  const { appointments, loading, fetchAppointments } =
    useContext(AppointmentContext);
  const { total: totalCustomers, fetchCustomers } = useContext(CustomerContext);
  const { total: totalVehicles, fetchVehicles } = useContext(VehicleContext);

  const [todaysCount, setTodaysCount] = useState(0);
  const [revenueThisMonth, setRevenueThisMonth] = useState(0);
  const [serviceTrends, setServiceTrends] = useState([]);

  // Today's date string
  const todayStr = new Date().toISOString().split("T")[0];

  // Filter today's appointments
  const todaysAppointments = appointments.filter(
    (a) => a.date && a.date.slice(0, 10) === todayStr
  );

  useEffect(() => {
    // Fetch all appointments (for today's count)
    fetchAppointments(1, 1000);
    // Fetch total customers and vehicles (for stats)
    fetchCustomers(1, 1);
    fetchVehicles(1, 1);

    // Fetch revenue for this month
    axios.get(`${API_URL}/reports/monthly-revenue`).then((res) => {
      const month = new Date().toISOString().slice(0, 7); // "YYYY-MM"
      const monthData = res.data.data.find((d) => d._id === month);
      setRevenueThisMonth(monthData ? monthData.revenue : 0);
    });

    // Fetch today's appointments count (if backend supports direct count)
    axios
      .get(`${API_URL}/appointments?date=${todayStr}`)
      .then((res) => setTodaysCount(res.data.total || 0));
  }, [fetchAppointments, fetchCustomers, fetchVehicles, todayStr]);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch service trends
    axios.get(`${API_URL}/reports/service-stats`).then((res) => {
      setServiceTrends(
        res.data.data.map((d) => ({
          name: d._id,
          value: d.jobs,
        }))
      );
    });
  }, []);

  // Stats cards data
  const stats = [
    {
      title: "Today's Appointments",
      value: loading ? "..." : todaysAppointments.length || todaysCount,
      icon: <Clock size={20} className="text-blue-600" />,
    },
    {
      title: "Total Customers",
      value: totalCustomers?.toLocaleString() || "...",
      icon: <Users size={20} className="text-teal-600" />,
    },
    {
      title: "Vehicles Serviced",
      value: totalVehicles?.toLocaleString() || "...",
      icon: <Car size={20} className="text-purple-600" />,
    },
    {
      title: "Revenue This Month",
      value: revenueThisMonth ? `$${revenueThisMonth.toLocaleString()}` : "$0",
      icon: <DollarSign size={20} className="text-green-600" />,
    },
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">
          Welcome back! Here's what's happening today.
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm p-6 flex items-center"
          >
            <div className="rounded-full p-3 bg-gray-50">{stat.icon}</div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Appointments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm p-6 lg:col-span-2"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-800">
              Today's Appointments
            </h2>
            <a
              href="/appointments"
              className="text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              View all
            </a>
          </div>

          <div className="space-y-4">
            {loading ? (
              <div>Loading...</div>
            ) : todaysAppointments.length === 0 ? (
              <div className="text-gray-500 text-center py-6">
                No appointments scheduled for today.
              </div>
            ) : (
              todaysAppointments.map((appointment) => (
                <motion.div
                  key={appointment._id || appointment.id}
                  whileHover={{ scale: 1.01 }}
                  className="border border-gray-100 rounded-lg p-4 flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium text-gray-800">
                      {typeof appointment.customer === "object"
                        ? appointment.customer?.name
                        : appointment.customer}
                    </p>
                    <p className="text-sm text-gray-600">
                      {typeof appointment.vehicle === "object"
                        ? `${appointment.vehicle?.make} ${appointment.vehicle?.model} (${appointment.vehicle?.regNumber})`
                        : appointment.vehicle}
                    </p>
                    <div className="flex items-center mt-1">
                      <span className="text-xs font-medium px-2 py-1 bg-blue-50 text-blue-700 rounded-full">
                        {appointment.service}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {appointment.time}
                    </p>
                    {/* <button className="mt-2 text-xs font-medium text-teal-600 hover:text-teal-500">
                      Create Job Card
                    </button> */}
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-6">
            Quick Actions
          </h2>

          <div className="space-y-4">
            {/* Add New Customer: admin, manager, front-desk */}
            {["admin", "manager", "front-desk"].includes(user?.role) && (
              <button
                className="w-full flex items-center p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                onClick={() => navigate("/customers?add=true")}
              >
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white">
                  <Users size={16} />
                </div>
                <span className="ml-3 font-medium text-blue-700">
                  Add New Customer
                </span>
              </button>
            )}

            {/* Register New Vehicle: admin, manager, technician, front-desk */}
            {["admin", "manager", "technician", "front-desk"].includes(
              user?.role
            ) && (
              <button
                className="w-full flex items-center p-3 bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors"
                onClick={() => navigate("/vehicles?add=true")}
              >
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-teal-500 text-white">
                  <Car size={16} />
                </div>
                <span className="ml-3 font-medium text-teal-700">
                  Register New Vehicle
                </span>
              </button>
            )}

            {/* Schedule Appointment: admin, manager, front-desk */}
            {["admin", "manager", "front-desk"].includes(user?.role) && (
              <button
                className="w-full flex items-center p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
                onClick={() => navigate("/appointments?add=true")}
              >
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-purple-500 text-white">
                  <Clock size={16} />
                </div>
                <span className="ml-3 font-medium text-purple-700">
                  Schedule Appointment
                </span>
              </button>
            )}

            {/* Create Job Card: admin, manager, technician */}
            {["admin", "manager", "technician"].includes(user?.role) && (
              <button
                className="w-full flex items-center p-3 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors"
                onClick={() => navigate("/job-cards?add=true")}
              >
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-orange-500 text-white">
                  <FileText size={16} />
                </div>
                <span className="ml-3 font-medium text-orange-700">
                  Create Job Card
                </span>
              </button>
            )}
          </div>
        </motion.div>
      </div>

      {/* Charts and Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-6">
            Service Trends
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={serviceTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#0F52BA" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.7 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-6">
            Service Center Status
          </h2>

          <div className="space-y-5">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <TrendingUp size={18} className="text-green-500" />
                <span className="ml-2 text-gray-700">Daily Revenue</span>
              </div>
              <span className="font-semibold text-gray-900">$1,850</span>
            </div>

            <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 rounded-full"
                style={{ width: "75%" }}
              ></div>
            </div>

            <div className="flex justify-between items-center mt-6">
              <div className="flex items-center">
                <Zap size={18} className="text-orange-500" />
                <span className="ml-2 text-gray-700">Active Technicians</span>
              </div>
              <span className="font-semibold text-gray-900">4/6</span>
            </div>

            <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-orange-500 rounded-full"
                style={{ width: "66%" }}
              ></div>
            </div>

            <div className="flex justify-between items-center mt-6">
              <div className="flex items-center">
                <AlertCircle size={18} className="text-red-500" />
                <span className="ml-2 text-gray-700">Low Stock Items</span>
              </div>
              <span className="font-semibold text-gray-900">8 items</span>
            </div>

            <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-red-500 rounded-full"
                style={{ width: "40%" }}
              ></div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
