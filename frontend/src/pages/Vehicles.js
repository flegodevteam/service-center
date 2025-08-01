import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Plus,
  Filter,
  Car,
  User,
  Calendar,
  PenTool as Tool,
  Clock,
  MoreVertical,
  Edit,
  Trash2,
} from "lucide-react";
import { useContext } from "react";
import { CustomerContext } from "../context/CustomerContext";
import { VehicleContext } from "../context/VehicleContext";
import { useLocation } from "react-router-dom";

const Vehicles = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddVehicleModalOpen, setIsAddVehicleModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null); // Removed type annotation
  const [vehicleErrors, setVehicleErrors] = useState({});
  const [newVehicle, setNewVehicle] = useState({
    make: "",
    model: "",
    year: "",
    regNumber: "",
    vin: "",
    owner: "",
    lastService: "",
    nextService: "",
    status: "active",
    notes: "",
  });
  const { customers, fetchAllCustomers } = useContext(CustomerContext);
  const {
    vehicles,
    setVehicles,
    addVehicle,
    updateVehicle,
    deleteVehicle,
    fetchVehicles,
    loading,
    total,
    totalPages,
  } = useContext(VehicleContext);
  const [isEditVehicleModalOpen, setIsEditVehicleModalOpen] = useState(false);
  const [editVehicle, setEditVehicle] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const vehiclesPerPage = 5;
  const currentVehicles = vehicles;
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("add") === "true") {
      setIsAddVehicleModalOpen(true);
    }
  }, [location.search]);

  useEffect(() => {
    fetchVehicles(currentPage, vehiclesPerPage);
  }, [currentPage, vehiclesPerPage, fetchVehicles]);

  useEffect(() => {
    fetchAllCustomers();
  }, [fetchAllCustomers]);

  const validateVehicle = () => {
    const errors = {};
    if (!newVehicle.make) errors.make = "Make is required";
    if (!newVehicle.model) errors.model = "Model is required";
    if (
      !newVehicle.year ||
      newVehicle.year < 1900 ||
      newVehicle.year > new Date().getFullYear() + 1
    )
      errors.year = "Valid year is required";
    if (!newVehicle.regNumber)
      errors.regNumber = "Registration number is required";
    if (!newVehicle.vin) errors.vin = "VIN is required";
    if (!newVehicle.owner) errors.owner = "Owner is required";
    if (!newVehicle.lastService)
      errors.lastService = "Last Service Date is required";
    if (!newVehicle.nextService)
      errors.nextService = "Next Service Date is required";
    setVehicleErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle adding a new vehicle - API call use pannu
  const handleAddVehicle = async () => {
    if (!validateVehicle()) return;
    try {
      // Owner name-a customer ID-a convert pannanum
      const selectedCustomer = customers.find(
        (c) => c.name === newVehicle.owner
      );
      const vehicleData = {
        ...newVehicle,
        owner: selectedCustomer?._id || selectedCustomer?.id, // customer ID thevai
      };

      await addVehicle(vehicleData);
      setIsAddVehicleModalOpen(false);
      setNewVehicle({
        make: "",
        model: "",
        year: "",
        regNumber: "",
        vin: "",
        owner: "",
        lastService: "",
        nextService: "",
        status: "active",
        notes: "",
      });
    } catch (err) {
      setVehicleErrors({ api: "Failed to add vehicle" });
    }
  };

  // Filter vehicles based on search term
  const filteredVehicles = vehicles.filter(
    (vehicle) =>
      vehicle.make?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.regNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (vehicle.owner?.name || vehicle.owner)
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  const selectedVehicleData = vehicles.find(
    (vehicle) => (vehicle._id || vehicle.id) === selectedVehicle
  );

  const getStatusColor = (status) => {
    // Removed type annotation for status
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl font-bold text-gray-800">Vehicles</h1>
        <p className="text-gray-600">
          Manage vehicle information and service history.
        </p>
      </motion.div>
      {/* Search and Actions */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search vehicles..."
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
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center">
            <Filter size={16} className="mr-2" />
            <span>Filter</span>
          </button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsAddVehicleModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
          >
            <Plus size={16} className="mr-2" />
            <span>Add Vehicle</span>
          </motion.button>
        </div>
      </div>
      {/* Vehicles Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Vehicle
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Owner
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Last Service
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
                  {filteredVehicles.map((vehicle) => (
                    <motion.tr
                      key={vehicle._id || vehicle.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      onClick={() =>
                        setSelectedVehicle(vehicle._id || vehicle.id)
                      }
                      className={`hover:bg-gray-50 cursor-pointer ${
                        selectedVehicle === (vehicle._id || vehicle.id)
                          ? "bg-blue-50"
                          : ""
                      }`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <Car size={20} className="text-blue-700" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {vehicle.make} {vehicle.model} ({vehicle.year})
                            </div>
                            <div className="text-sm text-gray-500">
                              {vehicle.regNumber}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-900">
                          <User size={16} className="text-gray-400 mr-2" />
                          <span>
                            {vehicle.owner?.name ||
                              (typeof vehicle.owner === "string"
                                ? vehicle.owner
                                : "Unknown Owner")}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {vehicle.lastService
                            ? vehicle.lastService.slice(0, 10)
                            : ""}
                        </div>
                        <div className="text-xs text-gray-500">
                          Next:{" "}
                          {vehicle.nextService
                            ? vehicle.nextService.slice(0, 10)
                            : ""}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                            vehicle.status
                          )}`}
                        >
                          {vehicle.status === "active" ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            className="text-blue-600 hover:text-blue-900"
                            onClick={() => {
                              setSelectedVehicle(vehicle._id || vehicle.id);
                              setIsAddVehicleModalOpen(false);
                              setIsEditVehicleModalOpen(true);
                              setEditVehicle(vehicle);
                              setVehicleErrors({});
                            }}
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            className="text-red-600 hover:text-red-900"
                            onClick={async () => {
                              if (
                                window.confirm(
                                  "Are you sure you want to delete this vehicle?"
                                )
                              ) {
                                await deleteVehicle(vehicle._id || vehicle.id);
                              }
                            }}
                          >
                            <Trash2 size={16} />
                          </button>
                          <div className="relative group">
                            {/* <button className="text-gray-500 hover:text-gray-700">
                              <MoreVertical size={16} />
                            </button> */}
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block z-10">
                              <a
                                href="#service-history"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                Service History
                              </a>
                              <a
                                href="#schedule"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                Schedule Service
                              </a>
                              <a
                                href="#create-job"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                Create Job Card
                              </a>
                            </div>
                          </div>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredVehicles.length === 0 && (
              <div className="text-center py-10">
                <p className="text-gray-500">
                  No vehicles found matching your search.
                </p>
              </div>
            )}
            <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
              <div className="text-sm text-gray-500">
                Showing {currentVehicles.length} of {total} vehicles
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
        </div>

        {/* Vehicle Details */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          {selectedVehicleData ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">
                  Vehicle Details
                </h2>
                <span
                  className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                    selectedVehicleData.status
                  )}`}
                >
                  {selectedVehicleData.status === "active"
                    ? "Active"
                    : "Inactive"}
                </span>
              </div>

              <div className="flex items-center">
                <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
                  <Car size={32} className="text-blue-700" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {selectedVehicleData.make} {selectedVehicleData.model}
                  </h3>
                  <p className="text-gray-600">
                    {selectedVehicleData.year} • {selectedVehicleData.regNumber}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">
                    Vehicle Information
                  </h4>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">
                        Registration
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        {selectedVehicleData.regNumber}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">VIN</span>
                      <span className="text-sm font-medium text-gray-900">
                        {selectedVehicleData.vin}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Make</span>
                      <span className="text-sm font-medium text-gray-900">
                        {selectedVehicleData.make}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Model</span>
                      <span className="text-sm font-medium text-gray-900">
                        {selectedVehicleData.model}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Year</span>
                      <span className="text-sm font-medium text-gray-900">
                        {selectedVehicleData.year}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">
                    Owner
                  </h4>
                  <div className="bg-gray-50 rounded-lg p-4 flex items-center">
                    <User size={20} className="text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {selectedVehicleData.owner?.name ||
                          selectedVehicleData.owner}
                      </p>
                      <button className="mt-1 text-xs text-blue-600 hover:text-blue-500">
                        View Customer Details
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">
                    Service Information
                  </h4>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div className="flex items-center">
                      <Tool size={18} className="text-gray-400 mr-2" />
                      <div>
                        <p className="text-xs text-gray-600">Last Service</p>
                        <p className="text-sm font-medium text-gray-900">
                          {selectedVehicleData.lastService
                            ? selectedVehicleData.lastService.slice(0, 10)
                            : ""}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Calendar size={18} className="text-gray-400 mr-2" />
                      <div>
                        <p className="text-xs text-gray-600">
                          Next Service Due
                        </p>
                        <p className="text-sm font-medium text-gray-900">
                          {selectedVehicleData.nextService
                            ? selectedVehicleData.nextService.slice(0, 10)
                            : ""}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Clock size={18} className="text-gray-400 mr-2" />
                      <div>
                        <p className="text-xs text-gray-600">
                          Maintenance Reminder
                        </p>
                        <p className="text-sm font-medium text-gray-900">
                          Enabled
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col space-y-2 pt-4">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center">
                  <Calendar size={16} className="mr-2" />
                  <span>Schedule Service</span>
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center justify-center">
                  <Tool size={16} className="mr-2" />
                  <span>View Service History</span>
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-10">
              <Car size={48} className="text-gray-300 mb-4" />
              <p className="text-gray-500 text-center">
                Select a vehicle to view details
              </p>
            </div>
          )}
        </div>
      </div>
      {/* Add Vehicle Modal */}
      {isAddVehicleModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-[5%] shadow-xl p-6 w-full max-w-lg max-h-[90vh] "
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                Add New Vehicle
              </h2>
              <button
                onClick={() => setIsAddVehicleModalOpen(false)}
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
                </svg>{" "}
              </button>
            </div>

            <form
              className="space-y-6 pl-2 pr-2 overflow-y-auto max-h-[70vh]"
              onSubmit={(e) => {
                e.preventDefault();
                handleAddVehicle();
              }}
            >
              <div>
                <h3 className="text-md font-medium text-gray-800 mb-3">
                  Vehicle Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Make
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter vehicle make"
                      value={newVehicle.make}
                      onChange={(e) =>
                        setNewVehicle({ ...newVehicle, make: e.target.value })
                      }
                    />
                    {vehicleErrors.make && (
                      <span className="text-red-500 text-xs">
                        {vehicleErrors.make}
                      </span>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Model
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter vehicle model"
                      value={newVehicle.model}
                      onChange={(e) =>
                        setNewVehicle({ ...newVehicle, model: e.target.value })
                      }
                    />
                    {vehicleErrors.model && (
                      <span className="text-red-500 text-xs">
                        {vehicleErrors.model}
                      </span>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Year
                    </label>
                    <input
                      type="number"
                      className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter year"
                      value={newVehicle.year}
                      onChange={(e) =>
                        setNewVehicle({ ...newVehicle, year: e.target.value })
                      }
                    />
                    {vehicleErrors.year && (
                      <span className="text-red-500 text-xs">
                        {vehicleErrors.year}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Registration Number
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter registration number"
                    value={newVehicle.regNumber}
                    onChange={(e) =>
                      setNewVehicle({
                        ...newVehicle,
                        regNumber: e.target.value,
                      })
                    }
                  />
                  {vehicleErrors.regNumber && (
                    <span className="text-red-500 text-xs">
                      {vehicleErrors.regNumber}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    VIN
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter VIN"
                    value={newVehicle.vin}
                    onChange={(e) =>
                      setNewVehicle({ ...newVehicle, vin: e.target.value })
                    }
                  />
                  {vehicleErrors.vin && (
                    <span className="text-red-500 text-xs">
                      {vehicleErrors.vin}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-md font-medium text-gray-800 mb-3">
                  Owner Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Select Owner
                    </label>
                    <select
                      className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={newVehicle.owner}
                      onChange={(e) =>
                        setNewVehicle({ ...newVehicle, owner: e.target.value })
                      }
                    >
                      <option value="">Select a customer</option>
                      {customers.map((customer) => (
                        <option
                          key={customer._id || customer.id}
                          value={customer.name}
                        >
                          {customer.name}
                        </option>
                      ))}
                    </select>
                    {vehicleErrors.owner && (
                      <span className="text-red-500 text-xs">
                        {vehicleErrors.owner}
                      </span>
                    )}
                    <p className="mt-2 text-sm text-gray-500">
                      Can't find the customer?{" "}
                      <a
                        href="#add-customer"
                        className="text-blue-600 hover:text-blue-500"
                      >
                        Add a new customer
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-md font-medium text-gray-800 mb-3">
                  Service Dates
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Service Date
                    </label>
                    <input
                      type="date"
                      className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={newVehicle.lastService}
                      onChange={(e) =>
                        setNewVehicle({
                          ...newVehicle,
                          lastService: e.target.value,
                        })
                      }
                    />
                    {vehicleErrors.lastService && (
                      <span className="text-red-500 text-xs">
                        {vehicleErrors.lastService}
                      </span>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Next Service Date
                    </label>
                    <input
                      type="date"
                      className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={newVehicle.nextService}
                      onChange={(e) =>
                        setNewVehicle({
                          ...newVehicle,
                          nextService: e.target.value,
                        })
                      }
                    />
                    {vehicleErrors.nextService && (
                      <span className="text-red-500 text-xs">
                        {vehicleErrors.nextService}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-md font-medium text-gray-800 mb-3">
                  Additional Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Notes
                    </label>
                    <textarea
                      className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={3}
                      placeholder="Enter any additional information about the vehicle..."
                      value={newVehicle.notes}
                      onChange={(e) =>
                        setNewVehicle({ ...newVehicle, notes: e.target.value })
                      }
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 ">
                <button
                  type="button"
                  onClick={() => setIsAddVehicleModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add Vehicle
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Edit Vehicle Modal */}
      {isEditVehicleModalOpen && editVehicle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-[5%] shadow-xl p-6 w-full max-w-lg max-h-[90vh]"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Edit Vehicle</h2>
              <button
                onClick={() => setIsEditVehicleModalOpen(false)}
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
                </svg>{" "}
              </button>
            </div>
            <form
              className="space-y-6 pl-2 pr-2 overflow-y-auto max-h-[70vh]"
              onSubmit={(e) => {
                e.preventDefault();
                handleAddVehicle();
              }}
            >
              <div>
                <h3 className="text-md font-medium text-gray-800 mb-3">
                  Vehicle Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Make
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter vehicle make"
                      value={editVehicle.make}
                      onChange={(e) =>
                        setEditVehicle({ ...editVehicle, make: e.target.value })
                      }
                    />
                    {vehicleErrors.make && (
                      <span className="text-red-500 text-xs">
                        {vehicleErrors.make}
                      </span>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Model
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter vehicle model"
                      value={editVehicle.model}
                      onChange={(e) =>
                        setEditVehicle({
                          ...editVehicle,
                          model: e.target.value,
                        })
                      }
                    />
                    {vehicleErrors.model && (
                      <span className="text-red-500 text-xs">
                        {vehicleErrors.model}
                      </span>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Year
                    </label>
                    <input
                      type="number"
                      className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter year"
                      value={editVehicle.year}
                      onChange={(e) =>
                        setEditVehicle({ ...editVehicle, year: e.target.value })
                      }
                    />
                    {vehicleErrors.year && (
                      <span className="text-red-500 text-xs">
                        {vehicleErrors.year}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Registration Number
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter registration number"
                    value={editVehicle.regNumber}
                    onChange={(e) =>
                      setEditVehicle({
                        ...editVehicle,
                        regNumber: e.target.value,
                      })
                    }
                  />
                  {vehicleErrors.regNumber && (
                    <span className="text-red-500 text-xs">
                      {vehicleErrors.regNumber}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    VIN
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter VIN"
                    value={editVehicle.vin}
                    onChange={(e) =>
                      setEditVehicle({ ...editVehicle, vin: e.target.value })
                    }
                  />
                  {vehicleErrors.vin && (
                    <span className="text-red-500 text-xs">
                      {vehicleErrors.vin}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-md font-medium text-gray-800 mb-3">
                  Owner Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Select Owner
                    </label>
                    <select
                      className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={editVehicle.owner}
                      onChange={(e) =>
                        setEditVehicle({
                          ...editVehicle,
                          owner: e.target.value,
                        })
                      }
                    >
                      <option value="">Select a customer</option>
                      {customers.map((customer) => (
                        <option
                          key={customer._id || customer.id}
                          value={customer._id || customer.id}
                        >
                          {customer.name}
                        </option>
                      ))}
                    </select>
                    {vehicleErrors.owner && (
                      <span className="text-red-500 text-xs">
                        {vehicleErrors.owner}
                      </span>
                    )}
                    <p className="mt-2 text-sm text-gray-500">
                      Can't find the customer?{" "}
                      <a
                        href="#add-customer"
                        className="text-blue-600 hover:text-blue-500"
                      >
                        Add a new customer
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-md font-medium text-gray-800 mb-3">
                  Service Dates
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Service Date
                    </label>
                    <input
                      type="date"
                      className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={editVehicle.lastService}
                      onChange={(e) =>
                        setEditVehicle({
                          ...editVehicle,
                          lastService: e.target.value,
                        })
                      }
                    />
                    {vehicleErrors.lastService && (
                      <span className="text-red-500 text-xs">
                        {vehicleErrors.lastService}
                      </span>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Next Service Date
                    </label>
                    <input
                      type="date"
                      className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={editVehicle.nextService}
                      onChange={(e) =>
                        setEditVehicle({
                          ...editVehicle,
                          nextService: e.target.value,
                        })
                      }
                    />
                    {vehicleErrors.nextService && (
                      <span className="text-red-500 text-xs">
                        {vehicleErrors.nextService}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-md font-medium text-gray-800 mb-3">
                  Additional Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Notes
                    </label>
                    <textarea
                      className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={3}
                      placeholder="Enter any additional information about the vehicle..."
                      value={editVehicle.notes}
                      onChange={(e) =>
                        setEditVehicle({
                          ...editVehicle,
                          notes: e.target.value,
                        })
                      }
                    ></textarea>
                  </div>
                </div>
              </div>
            </form>
            <button
              onClick={async () => {
                // Validate fields if needed
                await updateVehicle(editVehicle);
                setIsEditVehicleModalOpen(false);
                setEditVehicle(null);
              }}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Save Changes
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Vehicles;
