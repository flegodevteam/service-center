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
import { useLocation } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../api/api";

const Appointments = () => {
  const [date, setDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedView, setSelectedView] = useState("list");
  const [isAddAppointmentModalOpen, setIsAddAppointmentModalOpen] =
    useState(false);
  const { customers, fetchAllCustomers } = useContext(CustomerContext);
  const { vehicles, fetchAllVehicles } = useContext(VehicleContext);
  const {
    appointments,
    addAppointment,
    fetchAppointments,
    total,
    totalPages,
    getAppointmentById,
    updateAppointmentStatus,
  } = useContext(AppointmentContext);
  const [currentPage, setCurrentPage] = useState(1);
  const appointmentsPerPage = 5;

  // Service config states
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [serviceTypes, setServiceTypes] = useState([]);
  const [serviceLevels] = useState(["normal", "hard", "heavy"]);
  const [serviceLevelOptions, setServiceLevelOptions] = useState([]);

  useEffect(() => {
    fetchAppointments(currentPage, appointmentsPerPage);
  }, [currentPage, appointmentsPerPage, fetchAppointments]);

  const [appointmentForm, setAppointmentForm] = useState({
    customer: "",
    vehicle: "",
    vehicleType: "",
    serviceType: "",
    serviceLevel: "",
    serviceOption: "",
    date: "",
    time: "",
    technician: "",
    notes: "",
  });
  const [appointmentErrors, setAppointmentErrors] = useState({});
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [appointmentDetails, setAppointmentDetails] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("add") === "true") {
      setIsAddAppointmentModalOpen(true);
    }
  }, [location.search]);

  // Fetch service config for dropdowns
  useEffect(() => {
    axios.get(`${API_URL}/service-config`).then((res) => {
      setVehicleTypes(res.data.vehicleTypes || []);
      setServiceTypes(res.data.serviceTypes || []);
      setServiceLevelOptions(res.data.serviceLevelOptions || []);
    });
  }, []);

  useEffect(() => {
    fetchAllCustomers();
  }, [fetchAllCustomers]);

  useEffect(() => {
    fetchAllVehicles();
  }, [fetchAllVehicles]);

  const validateAppointment = () => {
    const errors = {};
    if (!appointmentForm.customer) errors.customer = "Customer is required";
    if (!appointmentForm.vehicle) errors.vehicle = "Vehicle is required";
    if (!appointmentForm.vehicleType)
      errors.vehicleType = "Vehicle Type is required";
    if (!appointmentForm.serviceType)
      errors.serviceType = "Service Type is required";
    if (!appointmentForm.serviceLevel)
      errors.serviceLevel = "Service Level is required";
    if (!appointmentForm.serviceOption)
      errors.serviceOption = "Service Option is required";
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
      vehicleType: appointmentForm.vehicleType,
      serviceType: appointmentForm.serviceType,
      serviceLevel: appointmentForm.serviceLevel,
      serviceOption: appointmentForm.serviceOption,
      date: appointmentForm.date,
      time: appointmentForm.time,
      technician: appointmentForm.technician,
      notes: appointmentForm.notes,
    });
    setIsAddAppointmentModalOpen(false);
    setAppointmentForm({
      customer: "",
      vehicle: "",
      vehicleType: "",
      serviceType: "",
      serviceLevel: "",
      serviceOption: "",
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
      (appointment.serviceType || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  });

  // Details button click handler
  const handleShowDetails = async (id) => {
    setIsDetailsOpen(true);
    setAppointmentDetails(null); // loading state
    const details = await getAppointmentById(id);
    setAppointmentDetails(details);
  };

  const handleCheckIn = async (id) => {
    await updateAppointmentStatus(id, "in-progress");
    fetchAppointments(currentPage, appointmentsPerPage); // Refresh list
  };

  // Job Card button click (for now, just alert or navigate)
  const handleJobCard = async (id) => {
    await updateAppointmentStatus(id, "completed");
    fetchAppointments(currentPage, appointmentsPerPage); // Refresh list
  };

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
                    key={appointment._id || appointment.id}
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
                      <div className="flex flex-col text-sm text-gray-900">
                        <div className="flex items-center">
                          <Wrench size={14} className="text-gray-400 mr-1" />
                          <span>
                            {appointment.vehicleType}
                            {appointment.vehicleType &&
                            (appointment.serviceType ||
                              appointment.serviceLevel ||
                              appointment.serviceOption)
                              ? " | "
                              : ""}
                            {appointment.serviceType}
                            {appointment.serviceType &&
                            (appointment.serviceLevel ||
                              appointment.serviceOption)
                              ? " | "
                              : ""}
                            {appointment.serviceLevel &&
                              appointment.serviceLevel.charAt(0).toUpperCase() +
                                appointment.serviceLevel.slice(1)}
                            {appointment.serviceLevel &&
                            appointment.serviceOption
                              ? " | "
                              : ""}
                            {appointment.serviceOption}
                          </span>
                        </div>
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
                        <button
                          className="text-blue-600 hover:text-blue-900 text-sm"
                          onClick={() =>
                            handleShowDetails(appointment.id || appointment._id)
                          }
                        >
                          Details
                        </button>
                        {appointment.status === "scheduled" && (
                          <button
                            className="text-green-600 hover:text-green-900 px-2 py-1 rounded border border-green-200 hover:bg-green-50"
                            onClick={() =>
                              handleCheckIn(appointment.id || appointment._id)
                            }
                          >
                            Check In
                          </button>
                        )}
                        {appointment.status === "in-progress" && (
                          <button
                            className="text-purple-600 hover:text-purple-900 px-2 py-1 rounded border border-purple-200 hover:bg-purple-50"
                            onClick={() =>
                              handleJobCard(appointment.id || appointment._id)
                            }
                          >
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

          {/* Appointment Details Side Panel */}
          {isDetailsOpen && (
            <div className="fixed top-0 right-0 w-full max-w-md h-full bg-white shadow-lg z-50 overflow-y-auto transition-all duration-300">
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-xl font-bold text-gray-800">
                  Appointment Details
                </h2>
                <button
                  onClick={() => setIsDetailsOpen(false)}
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
              {!appointmentDetails ? (
                <div className="p-6 text-center text-gray-500">Loading...</div>
              ) : (
                <div className="p-6 space-y-4">
                  <div>
                    <span className="font-medium text-gray-700">Date:</span>{" "}
                    {appointmentDetails.date?.slice(0, 10)} <br />
                    <span className="font-medium text-gray-700">
                      Time:
                    </span>{" "}
                    {appointmentDetails.time}
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Customer:</span>{" "}
                    {appointmentDetails.customer?.name} <br />
                    <span className="font-medium text-gray-700">
                      Phone:
                    </span>{" "}
                    {appointmentDetails.customer?.phone} <br />
                    <span className="font-medium text-gray-700">
                      Email:
                    </span>{" "}
                    {appointmentDetails.customer?.email}
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Vehicle:</span>{" "}
                    {appointmentDetails.vehicle
                      ? `${appointmentDetails.vehicle.make} ${appointmentDetails.vehicle.model} (${appointmentDetails.vehicle.regNumber})`
                      : ""}
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Service:</span>
                    <div className="ml-2 mt-1 flex flex-col text-gray-800 text-sm">
                      <span>
                        Vehicle Type: {appointmentDetails.vehicleType || "-"}
                      </span>
                      <span>
                        Service Type: {appointmentDetails.serviceType || "-"}
                      </span>
                      <span>
                        Service Level:{" "}
                        {appointmentDetails.serviceLevel
                          ? appointmentDetails.serviceLevel
                              .charAt(0)
                              .toUpperCase() +
                            appointmentDetails.serviceLevel.slice(1)
                          : "-"}
                      </span>
                      <span>
                        Service Option:{" "}
                        {appointmentDetails.serviceOption || "-"}
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">
                      Technician:
                    </span>{" "}
                    {appointmentDetails.technician}
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Status:</span>{" "}
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        appointmentDetails.status
                      )}`}
                    >
                      {appointmentDetails.status?.charAt(0).toUpperCase() +
                        appointmentDetails.status?.slice(1)}
                    </span>
                  </div>
                  {appointmentDetails.notes && (
                    <div>
                      <span className="font-medium text-gray-700">Notes:</span>{" "}
                      {appointmentDetails.notes}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

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
        <div className="fixed -inset-y-full inset-x-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
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
              <div className="flex flex-col space-y-3 max-h-[60vh] overflow-y-auto pr-2">
                {/* Customer */}
                <div className="flex flex-col gap-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Customer
                  </label>
                  <select
                    className="w-full border rounded px-2 py-1"
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

                {/* Vehicle */}
                <div className="flex flex-col gap-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Vehicle
                  </label>
                  <select
                    className="w-full border rounded px-2 py-1"
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

                {/* Vehicle Type */}
                <div className="flex flex-col gap-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Vehicle Type
                  </label>
                  <select
                    className="w-full border rounded px-2 py-1"
                    value={appointmentForm.vehicleType}
                    onChange={(e) =>
                      setAppointmentForm({
                        ...appointmentForm,
                        vehicleType: e.target.value,
                      })
                    }
                  >
                    <option value="">Select vehicle type</option>
                    {vehicleTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {appointmentErrors.vehicleType && (
                    <span className="text-red-500 text-xs">
                      {appointmentErrors.vehicleType}
                    </span>
                  )}
                </div>

                {/* Service Type */}
                <div className="flex flex-col gap-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Service Type
                  </label>
                  <select
                    className="w-full border rounded px-2 py-1"
                    value={appointmentForm.serviceType}
                    onChange={(e) =>
                      setAppointmentForm({
                        ...appointmentForm,
                        serviceType: e.target.value,
                      })
                    }
                  >
                    <option value="">Select service type</option>
                    {serviceTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {appointmentErrors.serviceType && (
                    <span className="text-red-500 text-xs">
                      {appointmentErrors.serviceType}
                    </span>
                  )}
                </div>

                {/* Service Level */}
                <div className="flex flex-col gap-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Service Level
                  </label>
                  <select
                    className="w-full border rounded px-2 py-1"
                    value={appointmentForm.serviceLevel}
                    onChange={(e) =>
                      setAppointmentForm({
                        ...appointmentForm,
                        serviceLevel: e.target.value,
                      })
                    }
                  >
                    <option value="">Select service level</option>
                    {serviceLevels.map((level) => (
                      <option key={level} value={level}>
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </option>
                    ))}
                  </select>
                  {appointmentErrors.serviceLevel && (
                    <span className="text-red-500 text-xs">
                      {appointmentErrors.serviceLevel}
                    </span>
                  )}
                </div>

                {/* Service Option */}
                <div className="flex flex-col gap-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Service Option
                  </label>
                  <select
                    className="w-full border rounded px-2 py-1"
                    value={appointmentForm.serviceOption}
                    onChange={(e) =>
                      setAppointmentForm({
                        ...appointmentForm,
                        serviceOption: e.target.value,
                      })
                    }
                  >
                    <option value="">Select service option</option>
                    {serviceLevelOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {appointmentErrors.serviceOption && (
                    <span className="text-red-500 text-xs">
                      {appointmentErrors.serviceOption}
                    </span>
                  )}
                </div>

                <div className="flex justify-between gap-4 ">
                  {" "}
                  {/* Date */}
                  <div className="w-1/2">
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
                  {/* Time */}
                  <div className="w-1/2">
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

                {/* Notes */}
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
