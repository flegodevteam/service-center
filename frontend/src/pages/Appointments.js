import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Plus,
  Filter,
  Calendar as CalendarIcon,
  Clock,
  User,
  Car,
  Wrench,
} from "lucide-react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

// Sample data
const appointmentsData = [
  {
    id: 1,
    customer: "Michael Johnson",
    vehicle: "Toyota Camry (ABC-123)",
    service: "Oil Change",
    date: "2024-06-15",
    time: "09:30 AM",
    status: "scheduled",
    technician: "Robert Smith",
  },
  {
    id: 2,
    customer: "Sarah Williams",
    vehicle: "Honda Civic (XYZ-789)",
    service: "Brake Inspection",
    date: "2024-06-15",
    time: "10:45 AM",
    status: "in-progress",
    technician: "James Wilson",
  },
  {
    id: 3,
    customer: "David Martinez",
    vehicle: "Ford F-150 (DEF-456)",
    service: "Tire Rotation",
    date: "2024-06-16",
    time: "01:15 PM",
    status: "completed",
    technician: "Lisa Brown",
  },
  {
    id: 4,
    customer: "Jennifer Taylor",
    vehicle: "Nissan Altima (GHI-789)",
    service: "AC Repair",
    date: "2024-06-16",
    time: "03:30 PM",
    status: "scheduled",
    technician: "Robert Smith",
  },
  {
    id: 5,
    customer: "Robert Brown",
    vehicle: "BMW X5 (JKL-012)",
    service: "Full Service",
    date: "2024-06-17",
    time: "11:00 AM",
    status: "scheduled",
    technician: "James Wilson",
  },
];

const Appointments = () => {
  const [date, setDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedView, setSelectedView] = useState("list");
  const [isAddAppointmentModalOpen, setIsAddAppointmentModalOpen] =
    useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "in-progress":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredAppointments = appointmentsData.filter(
    (appointment) =>
      appointment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.service.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl font-bold text-gray-800">Appointments</h1>
        <p className="text-gray-600">
          Schedule and manage service appointments.
        </p>
      </motion.div>

      {/* Search and Actions */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search appointments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Search
            size={18}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
        </div>

        <div className="flex items-center space-x-2 w-full md:w-auto">
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setSelectedView("list")}
              className={`px-4 py-2 ${
                selectedView === "list"
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              List
            </button>
            <button
              onClick={() => setSelectedView("calendar")}
              className={`px-4 py-2 ${
                selectedView === "calendar"
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              Calendar
            </button>
          </div>

          <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center">
            <Filter size={16} className="mr-2" />
            <span>Filter</span>
          </button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsAddAppointmentModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
          >
            <Plus size={16} className="mr-2" />
            <span>Add Appointment</span>
          </motion.button>
        </div>
      </div>

      {/* Appointment Views */}
      {selectedView === "list" ? (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Date & Time
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Customer & Vehicle
                  </th>
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
                    Technician
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAppointments.map((appointment) => (
                  <motion.tr
                    key={appointment.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <div className="text-sm font-medium text-gray-900 flex items-center">
                          <CalendarIcon
                            size={14}
                            className="text-gray-400 mr-1"
                          />
                          {appointment.date}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center mt-1">
                          <Clock size={14} className="text-gray-400 mr-1" />
                          {appointment.time}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <div className="text-sm font-medium text-gray-900 flex items-center">
                          <User size={14} className="text-gray-400 mr-1" />
                          {appointment.customer}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center mt-1">
                          <Car size={14} className="text-gray-400 mr-1" />
                          {appointment.vehicle}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <Wrench size={14} className="text-gray-400 mr-1" />
                        <span>{appointment.service}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {appointment.technician}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                          appointment.status
                        )}`}
                      >
                        {appointment.status.charAt(0).toUpperCase() +
                          appointment.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button className="text-blue-600 hover:text-blue-900 px-2 py-1 rounded border border-blue-200 hover:bg-blue-50">
                          Details
                        </button>
                        {appointment.status === "scheduled" && (
                          <button className="text-green-600 hover:text-green-900 px-2 py-1 rounded border border-green-200 hover:bg-green-50">
                            Check In
                          </button>
                        )}
                        {appointment.status === "in-progress" && (
                          <button className="text-purple-600 hover:text-purple-900 px-2 py-1 rounded border border-purple-200 hover:bg-purple-50">
                            Job Card
                          </button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredAppointments.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-500">
                No appointments found matching your search.
              </p>
            </div>
          )}

          <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
            <div className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-medium">{filteredAppointments.length}</span>{" "}
              of <span className="font-medium">{appointmentsData.length}</span>{" "}
              appointments
            </div>
            <div className="flex items-center space-x-2">
              <button
                className="px-3 py-1 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                disabled
              >
                Previous
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded text-gray-700 hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <Calendar
              onChange={setDate}
              value={date}
              className="w-full border-0"
            />
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 lg:col-span-2">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Appointments for{" "}
              {date instanceof Date
                ? date.toLocaleDateString()
                : "Selected Date"}
            </h3>

            <div className="space-y-4">
              {filteredAppointments
                .filter(
                  (appointment) =>
                    appointment.date ===
                    (date instanceof Date
                      ? date.toISOString().split("T")[0]
                      : "")
                )
                .map((appointment) => (
                  <motion.div
                    key={appointment.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-800">
                          {appointment.time} - {appointment.service}
                        </p>
                        <p className="text-sm text-gray-600">
                          {appointment.customer}
                        </p>
                        <p className="text-sm text-gray-500">
                          {appointment.vehicle}
                        </p>
                      </div>
                      <div>
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                            appointment.status
                          )}`}
                        >
                          {appointment.status.charAt(0).toUpperCase() +
                            appointment.status.slice(1)}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
                      <div className="text-sm text-gray-500">
                        <span className="font-medium">Technician:</span>{" "}
                        {appointment.technician}
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900 text-sm">
                          Details
                        </button>
                        {appointment.status === "scheduled" && (
                          <button className="text-green-600 hover:text-green-900 text-sm">
                            Check In
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}

              {filteredAppointments.filter(
                (appointment) =>
                  appointment.date ===
                  (date instanceof Date ? date.toISOString().split("T")[0] : "")
              ).length === 0 && (
                <div className="text-center py-10">
                  <p className="text-gray-500">
                    No appointments scheduled for this date.
                  </p>
                  <button
                    onClick={() => setIsAddAppointmentModalOpen(true)}
                    className="mt-3 text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    + Add Appointment
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add Appointment Modal */}
      {isAddAppointmentModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-xl shadow-xl p-6 w-full max-w-2xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                Schedule New Appointment
              </h2>
              <button
                onClick={() => setIsAddAppointmentModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Customer
                  </label>
                  <select className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">Select a customer</option>
                    <option value="1">Michael Johnson</option>
                    <option value="2">Sarah Williams</option>
                    <option value="3">David Martinez</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Vehicle
                  </label>
                  <select className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">Select a vehicle</option>
                    <option value="1">Toyota Camry (ABC-123)</option>
                    <option value="2">Honda Civic (XYZ-789)</option>
                    <option value="3">Ford F-150 (DEF-456)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time
                  </label>
                  <input
                    type="time"
                    className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Service Type
                </label>
                <select className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">Select a service</option>
                  <option value="oil-change">Oil Change</option>
                  <option value="brake-inspection">Brake Inspection</option>
                  <option value="tire-rotation">Tire Rotation</option>
                  <option value="full-service">Full Service</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Assign Technician
                </label>
                <select className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">Select a technician</option>
                  <option value="robert-smith">Robert Smith</option>
                  <option value="james-wilson">James Wilson</option>
                  <option value="lisa-brown">Lisa Brown</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="Additional details or special instructions..."
                ></textarea>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsAddAppointmentModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Schedule Appointment
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Appointments;
