import React from "react";
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

// Sample data for charts
const serviceData = [
  { name: "Jan", value: 12 },
  { name: "Feb", value: 19 },
  { name: "Mar", value: 13 },
  { name: "Apr", value: 22 },
  { name: "May", value: 28 },
  { name: "Jun", value: 25 },
];

const Dashboard = () => {
  const stats = [
    {
      title: "Today's Appointments",
      value: "12",
      icon: <Clock size={20} className="text-blue-600" />,
    },
    {
      title: "Total Customers",
      value: "1,248",
      icon: <Users size={20} className="text-teal-600" />,
    },
    {
      title: "Vehicles Serviced",
      value: "3,427",
      icon: <Car size={20} className="text-purple-600" />,
    },
    {
      title: "Revenue This Month",
      value: "$24,300",
      icon: <DollarSign size={20} className="text-green-600" />,
    },
  ];

  const upcomingAppointments = [
    {
      id: 1,
      customer: "Michael Johnson",
      vehicle: "Toyota Camry (ABC-123)",
      time: "09:30 AM",
      service: "Oil Change",
    },
    {
      id: 2,
      customer: "Sarah Williams",
      vehicle: "Honda Civic (XYZ-789)",
      time: "10:45 AM",
      service: "Brake Inspection",
    },
    {
      id: 3,
      customer: "David Martinez",
      vehicle: "Ford F-150 (DEF-456)",
      time: "01:15 PM",
      service: "Tire Rotation",
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
            {upcomingAppointments.map((appointment) => (
              <motion.div
                key={appointment.id}
                whileHover={{ scale: 1.01 }}
                className="border border-gray-100 rounded-lg p-4 flex items-center justify-between"
              >
                <div>
                  <p className="font-medium text-gray-800">
                    {appointment.customer}
                  </p>
                  <p className="text-sm text-gray-600">{appointment.vehicle}</p>
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
                  <button className="mt-2 text-xs font-medium text-teal-600 hover:text-teal-500">
                    Create Job Card
                  </button>
                </div>
              </motion.div>
            ))}
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
            <button className="w-full flex items-center p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white">
                <Users size={16} />
              </div>
              <span className="ml-3 font-medium text-blue-700">
                Add New Customer
              </span>
            </button>

            <button className="w-full flex items-center p-3 bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-teal-500 text-white">
                <Car size={16} />
              </div>
              <span className="ml-3 font-medium text-teal-700">
                Register New Vehicle
              </span>
            </button>

            <button className="w-full flex items-center p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-purple-500 text-white">
                <Clock size={16} />
              </div>
              <span className="ml-3 font-medium text-purple-700">
                Schedule Appointment
              </span>
            </button>

            <button className="w-full flex items-center p-3 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-orange-500 text-white">
                <FileText size={16} />
              </div>
              <span className="ml-3 font-medium text-orange-700">
                Create Job Card
              </span>
            </button>
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
              <BarChart data={serviceData}>
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
