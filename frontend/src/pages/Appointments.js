import React, { useState, useContext, useEffect } from "react";
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
import { CustomerContext } from "../context/CustomerContext";
import { VehicleContext } from "../context/VehicleContext";
import AppointmentContext from "../context/AppointmentContext";

const Appointments = () => {
  const [date, setDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedView, setSelectedView] = useState("list");
  const [isAddAppointmentModalOpen, setIsAddAppointmentModalOpen] =
    useState(false);
  const { customers } = useContext(CustomerContext);
  const { vehicles } = useContext(VehicleContext);
  const { appointments, addAppointment, fetchAppointments, total, totalPages } =
    useContext(AppointmentContext);
  const [currentPage, setCurrentPage] = useState(1);
  const appointmentsPerPage = 5;

  useEffect(() => {
    fetchAppointments(currentPage, appointmentsPerPage);
  }, [currentPage, appointmentsPerPage, fetchAppointments]);

  const [appointmentForm, setAppointmentForm] = useState({
    customer: "",
    vehicle: "",
    service: "",
    date: "",
    time: "",
    technician: "",
    notes: "",
  });
  const [appointmentErrors, setAppointmentErrors] = useState({});

  const validateAppointment = () => {
    const errors = {};
    if (!appointmentForm.customer) errors.customer = "Customer is required";
    if (!appointmentForm.vehicle) errors.vehicle = "Vehicle is required";
    if (!appointmentForm.service) errors.service = "Service type is required";
    if (!appointmentForm.date) errors.date = "Date is required";
    if (!appointmentForm.time) errors.time = "Time is required";
    if (!appointmentForm.technician)
      errors.technician = "Technician is required";
    setAppointmentErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddAppointment = () => {
    if (!validateAppointment()) return;
    addAppointment({
      customer: appointmentForm.customer,
      vehicle: appointmentForm.vehicle,
      service: appointmentForm.service,
      date: appointmentForm.date,
      time: appointmentForm.time,
      technician: appointmentForm.technician,
      notes: appointmentForm.notes,
    });
    setIsAddAppointmentModalOpen(false);
    setAppointmentForm({
      customer: "",
      vehicle: "",
      service: "",
      date: "",
      time: "",
      technician: "",
      notes: "",
    });
    setAppointmentErrors({});
  };

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

  const filteredAppointments = appointments.filter((appointment) => {
    const customerName =
      typeof appointment.customer === "object" && appointment.customer !== null
        ? appointment.customer.name
        : appointment.customer || "";
    const vehicleName =
      typeof appointment.vehicle === "object" && appointment.vehicle !== null
        ? `${appointment.vehicle.make} ${appointment.vehicle.model} (${appointment.vehicle.regNumber})`
        : appointment.vehicle || "";
    return (
      customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (appointment.service || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  });
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

                          {appointment.date
                            ? appointment.date.slice(0, 10)
                            : ""}
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
                          {/* Fix: Only show name if object and not null */}
                          {typeof appointment.customer === "object" &&
                          appointment.customer !== null
                            ? appointment.customer.name
                            : appointment.customer || ""}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center mt-1">
                          <Car size={14} className="text-gray-400 mr-1" />
                          {typeof appointment.vehicle === "object" &&
                          appointment.vehicle !== null
                            ? `${appointment.vehicle.make} ${appointment.vehicle.model} (${appointment.vehicle.regNumber})`
                            : appointment.vehicle || ""}
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
              Showing {filteredAppointments.length} of {total} appointments
            </div>
            <div className="flex items-center space-x-2">
              <button
                className="px-3 py-1 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                Previous
              </button>
              <span className="text-sm px-2">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="px-3 py-1 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
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

            <form
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                handleAddAppointment();
              }}
            >
              {" "}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Customer
                  </label>
                  <select
                    value={appointmentForm.customer}
                    onChange={(e) =>
                      setAppointmentForm({
                        ...appointmentForm,
                        customer: e.target.value,
                      })
                    }
                  >
                    <option value="">Select a customer</option>
                    {customers.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                  {appointmentErrors.customer && (
                    <span className="text-red-500 text-xs">
                      {appointmentErrors.customer}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Vehicle
                  </label>
                  <select
                    value={appointmentForm.vehicle}
                    onChange={(e) =>
                      setAppointmentForm({
                        ...appointmentForm,
                        vehicle: e.target.value,
                      })
                    }
                  >
                    <option value="">Select a vehicle</option>
                    {vehicles.map((v) => (
                      <option key={v._id} value={v._id}>
                        {v.make} {v.model} ({v.regNumber})
                      </option>
                    ))}
                  </select>
                  {appointmentErrors.vehicle && (
                    <span className="text-red-500 text-xs">
                      {appointmentErrors.vehicle}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={appointmentForm.date}
                    onChange={(e) =>
                      setAppointmentForm({
                        ...appointmentForm,
                        date: e.target.value,
                      })
                    }
                  />
                  {appointmentErrors.date && (
                    <span className="text-red-500 text-xs">
                      {appointmentErrors.date}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time
                  </label>
                  <input
                    type="time"
                    className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={appointmentForm.time}
                    onChange={(e) =>
                      setAppointmentForm({
                        ...appointmentForm,
                        time: e.target.value,
                      })
                    }
                  />
                  {appointmentErrors.time && (
                    <span className="text-red-500 text-xs">
                      {appointmentErrors.time}
                    </span>
                  )}
                </div>
              </div>
              {/* Service Type input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Service Type
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter service type"
                  value={appointmentForm.service}
                  onChange={(e) =>
                    setAppointmentForm({
                      ...appointmentForm,
                      service: e.target.value,
                    })
                  }
                />
                {appointmentErrors.service && (
                  <span className="text-red-500 text-xs">
                    {appointmentErrors.service}
                  </span>
                )}
              </div>
              {/* Technician input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Assign Technician
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter technician name"
                  value={appointmentForm.technician}
                  onChange={(e) =>
                    setAppointmentForm({
                      ...appointmentForm,
                      technician: e.target.value,
                    })
                  }
                />
                {appointmentErrors.technician && (
                  <span className="text-red-500 text-xs">
                    {appointmentErrors.technician}
                  </span>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="Additional details or special instructions..."
                  value={appointmentForm.notes}
                  onChange={(e) =>
                    setAppointmentForm({
                      ...appointmentForm,
                      notes: e.target.value,
                    })
                  }
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
                  type="submit"
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
