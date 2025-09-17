import React, { useState, useContext, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  User,
  Car,
  Calendar,
  PenTool as Tool,
  Clipboard,
} from "lucide-react";
import { CustomerContext } from "../context/CustomerContext";
import { VehicleContext } from "../context/VehicleContext";
import JobCardsContext from "../context/JobCardsContext";
import { API_URL } from "../api/api";
import { useLocation } from "react-router-dom";
import axios from "axios";

const JobCards = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJobCard, setSelectedJobCard] = useState(null);
  const [isAddJobCardModalOpen, setIsAddJobCardModalOpen] = useState(false);
  const [newJobCard, setNewJobCard] = useState({
    customer: "",
    vehicle: "",
    vehicleType: "",
    serviceType: "",
    serviceLevel: "",
    serviceOption: "",
    date: "",
    status: "pending",
    technician: "",
    totalAmount: "",
  });
  const [errors, setErrors] = useState({});
  const { customers, fetchAllCustomers } = useContext(CustomerContext);
  const { vehicles, fetchAllVehicles } = useContext(VehicleContext);
  const { jobCards, addJobCard, fetchJobCards, total, totalPages } =
    useContext(JobCardsContext);
  const [currentPage, setCurrentPage] = useState(1);
  const jobCardsPerPage = 5;
  const location = useLocation();

  // Service config states
  const [serviceTypes, setServiceTypes] = useState([]);
  const [serviceLevels] = useState(["normal", "hard", "heavy"]);
  const [serviceLevelOptions, setServiceLevelOptions] = useState([]);
  const [vehicleTypes, setVehicleTypes] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("add") === "true") {
      setIsAddJobCardModalOpen(true);
    }
  }, [location.search]);

  useEffect(() => {
    fetchJobCards(currentPage, jobCardsPerPage);
  }, [currentPage, jobCardsPerPage, fetchJobCards]);

  useEffect(() => {
    fetchAllCustomers();
  }, [fetchAllCustomers]);

  useEffect(() => {
    fetchAllVehicles();
  }, [fetchAllVehicles]);

  // Fetch service config for dropdowns
  useEffect(() => {
    axios.get(`${API_URL}/service-config`).then((res) => {
      setServiceTypes(res.data.serviceTypes || []);
      setServiceLevelOptions(res.data.serviceLevelOptions || []);
      setVehicleTypes(res.data.vehicleTypes || []);
    });
  }, []);

  // Validate form
  const validate = () => {
    let err = {};
    if (!newJobCard.customer) err.customer = "Customer thevai";
    if (!newJobCard.vehicle) err.vehicle = "Vehicle thevai";
    if (!newJobCard.vehicleType) err.vehicleType = "Vehicle Type thevai";
    if (!newJobCard.serviceType) err.serviceType = "Service Type thevai";
    if (!newJobCard.serviceLevel) err.serviceLevel = "Service Level thevai";
    if (!newJobCard.serviceOption) err.serviceOption = "Service Option thevai";
    if (!newJobCard.date) err.date = "Date thevai";
    if (!newJobCard.technician) err.technician = "Technician thevai";
    if (!newJobCard.totalAmount || isNaN(newJobCard.totalAmount))
      err.totalAmount = "Amount sari illai";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  // Add Job Card
  const handleAddJobCard = () => {
    if (!validate()) return;
    addJobCard(newJobCard);
    setIsAddJobCardModalOpen(false);
    setNewJobCard({
      customer: "",
      vehicle: "",
      vehicleType: "",
      serviceType: "",
      serviceLevel: "",
      serviceOption: "",
      date: "",
      status: "pending",
      technician: "",
      totalAmount: "",
    });
    setErrors({});
    fetchJobCards(currentPage, jobCardsPerPage);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock size={16} />;
      case "in-progress":
        return <Tool size={16} />;
      case "completed":
        return <CheckCircle size={16} />;
      case "cancelled":
        return <AlertCircle size={16} />;
      default:
        return <FileText size={16} />;
    }
  };

  // Filter job cards based on search term
  const filteredJobCards = jobCards.filter((jobCard) => {
    const customerName = jobCard.customer?.name || jobCard.customer || "";
    const vehicle = jobCard.vehicle || {};
    const vehicleMake = vehicle.make || "";
    const vehicleModel = vehicle.model || "";
    const vehicleRegNumber = vehicle.regNumber || "";
    const vehicleText = `${vehicleMake} ${vehicleModel} ${vehicleRegNumber}`;

    return (
      (jobCard.id || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicleText.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Find selected job card data
  const selectedJobCardData = jobCards.find(
    (jobCard) => (jobCard._id || jobCard.id) === selectedJobCard
  );

  // Handle job card selection
  const handleDownloadJobCard = async (jobCardId) => {
    try {
      const response = await fetch(`${API_URL}/jobcards/${jobCardId}/pdf`, {
        method: "GET",
        headers: { Accept: "application/pdf" },
      });
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `jobcard_${jobCardId}.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
        alert("Job Card PDF downloaded!");
      } else {
        alert("Download failed");
      }
    } catch (err) {
      alert("Download failed");
    }
  };

  // Handle job card completion
  const handleMarkComplete = async (jobCardId) => {
    try {
      const res = await fetch(`${API_URL}/jobcards/${jobCardId}/complete`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (res.ok) {
        alert("Job Card marked as completed!");
        fetchJobCards(); // Refresh list
      } else {
        alert(data.message || "Failed to mark as complete");
      }
    } catch (err) {
      alert("Failed to mark as complete");
    }
  };

  useEffect(() => {
    // Service Type & Level இரண்டும் select பண்ணும்போது price fetch பண்ணும் logic
    if (newJobCard.serviceType && newJobCard.serviceLevel) {
      axios
        .get(`${API_URL}/service-config/pricing`)
        .then((res) => {
          const { basePrice, hardIncrease, heavyIncrease } = res.data;
          let price = Number(basePrice) || 0;
          if (newJobCard.serviceLevel === "hard") {
            price = price * (1 + (Number(hardIncrease) || 0) / 100);
          } else if (newJobCard.serviceLevel === "heavy") {
            price = price * (1 + (Number(heavyIncrease) || 0) / 100);
          }
          setNewJobCard((prev) => ({
            ...prev,
            totalAmount: price ? price.toFixed(2) : "",
          }));
        })
        .catch(() => {
          setNewJobCard((prev) => ({
            ...prev,
            totalAmount: "",
          }));
        });
    }
    // eslint-disable-next-line
  }, [newJobCard.serviceType, newJobCard.serviceLevel]);

  return (
    <div className="space-y-6">
      {/* Modal */}
      {isAddJobCardModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <div className="flex justify-between items-center ">
              <h2 className="text-lg font-bold mb-4">Add New Job Card</h2>
              <button
                onClick={() => setIsAddJobCardModalOpen(false)}
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

            <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-2">
              <div>
                <label className="block text-sm">Customer</label>
                <select
                  className="w-full border rounded px-2 py-1"
                  value={newJobCard.customer}
                  onChange={(e) =>
                    setNewJobCard({ ...newJobCard, customer: e.target.value })
                  }
                >
                  <option value="">Select</option>
                  {customers.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                {errors.customer && (
                  <span className="text-red-500 text-xs">
                    {errors.customer}
                  </span>
                )}
              </div>
              <div>
                <label className="block text-sm">Vehicle</label>
                <select
                  className="w-full border rounded px-2 py-1"
                  value={newJobCard.vehicle}
                  onChange={(e) =>
                    setNewJobCard({ ...newJobCard, vehicle: e.target.value })
                  }
                >
                  <option value="">Select</option>
                  {vehicles.map((v) => (
                    <option key={v._id} value={v._id}>
                      {v.make} {v.model} ({v.regNumber})
                    </option>
                  ))}
                </select>
                {errors.vehicle && (
                  <span className="text-red-500 text-xs">{errors.vehicle}</span>
                )}
              </div>
              {/* Vehicle Type Select */}
              <div>
                <label className="block text-sm">Vehicle Type</label>
                <select
                  className="w-full border rounded px-2 py-1"
                  value={newJobCard.vehicleType}
                  onChange={(e) =>
                    setNewJobCard({
                      ...newJobCard,
                      vehicleType: e.target.value,
                    })
                  }
                >
                  <option value="">Select</option>
                  {vehicleTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {errors.vehicleType && (
                  <span className="text-red-500 text-xs">
                    {errors.vehicleType}
                  </span>
                )}
              </div>
              {/* Add Service Type */}
              <div>
                <label className="block text-sm">Service Type</label>
                <select
                  className="w-full border rounded px-2 py-1"
                  value={newJobCard.serviceType}
                  onChange={(e) =>
                    setNewJobCard({
                      ...newJobCard,
                      serviceType: e.target.value,
                    })
                  }
                >
                  <option value="">Select</option>
                  {serviceTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {errors.serviceType && (
                  <span className="text-red-500 text-xs">
                    {errors.serviceType}
                  </span>
                )}
              </div>
              {/* Add Service Level */}
              <div>
                <label className="block text-sm">Service Level</label>
                <select
                  className="w-full border rounded px-2 py-1"
                  value={newJobCard.serviceLevel}
                  onChange={(e) =>
                    setNewJobCard({
                      ...newJobCard,
                      serviceLevel: e.target.value,
                    })
                  }
                >
                  <option value="">Select</option>
                  {serviceLevels.map((level) => (
                    <option key={level} value={level}>
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </option>
                  ))}
                </select>
                {errors.serviceLevel && (
                  <span className="text-red-500 text-xs">
                    {errors.serviceLevel}
                  </span>
                )}
              </div>
              {/* Add Service Option */}
              <div>
                <label className="block text-sm">Service Option</label>
                <select
                  className="w-full border rounded px-2 py-1"
                  value={newJobCard.serviceOption}
                  onChange={(e) =>
                    setNewJobCard({
                      ...newJobCard,
                      serviceOption: e.target.value,
                    })
                  }
                >
                  <option value="">Select</option>
                  {serviceLevelOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {errors.serviceOption && (
                  <span className="text-red-500 text-xs">
                    {errors.serviceOption}
                  </span>
                )}
              </div>
              <div>
                <label className="block text-sm">Date</label>
                <input
                  type="date"
                  className="w-full border rounded px-2 py-1"
                  value={newJobCard.date}
                  onChange={(e) =>
                    setNewJobCard({ ...newJobCard, date: e.target.value })
                  }
                />
                {errors.date && (
                  <span className="text-red-500 text-xs">{errors.date}</span>
                )}
              </div>
              <div>
                <label className="block text-sm">Technician</label>
                <input
                  type="text"
                  className="w-full border rounded px-2 py-1"
                  value={newJobCard.technician}
                  onChange={(e) =>
                    setNewJobCard({ ...newJobCard, technician: e.target.value })
                  }
                />
                {errors.technician && (
                  <span className="text-red-500 text-xs">
                    {errors.technician}
                  </span>
                )}
              </div>
              <div>
                <label className="block text-sm">Total Amount</label>
                <input
                  type="number"
                  className="w-full border rounded px-2 py-1"
                  value={newJobCard.totalAmount}
                  onChange={(e) =>
                    setNewJobCard({
                      ...newJobCard,
                      totalAmount: e.target.value,
                    })
                  }
                />
                {errors.totalAmount && (
                  <span className="text-red-500 text-xs">
                    {errors.totalAmount}
                  </span>
                )}
              </div>
              <div>
                <button
                  className="w-full bg-blue-600 text-white py-2 rounded mt-2"
                  onClick={handleAddJobCard}
                >
                  Add Job Card
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl font-bold text-gray-800">Job Cards</h1>
        <p className="text-gray-600">
          Manage service job cards and track work progress.
        </p>
      </motion.div>

      {/* Search and Actions */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search job cards..."
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
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
            onClick={() => setIsAddJobCardModalOpen(true)}
          >
            <FileText size={16} className="mr-2" />
            <span>New Job Card</span>
          </motion.button>
        </div>
      </div>

      {/* Job Cards Grid */}
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
                      Job Card
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
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredJobCards.map((jobCard) => (
                    <motion.tr
                      key={jobCard._id || jobCard.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      onClick={() =>
                        setSelectedJobCard(jobCard._id || jobCard.id)
                      }
                      className={`hover:bg-gray-50 cursor-pointer ${
                        selectedJobCard === (jobCard._id || jobCard.id)
                          ? "bg-blue-50"
                          : ""
                      }`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <FileText size={20} className="text-blue-700" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {jobCard.id}
                            </div>
                            <div className="text-sm text-gray-500">
                              {jobCard.date ? jobCard.date.slice(0, 10) : ""}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <div className="text-sm font-medium text-gray-900">
                            {typeof jobCard.customer === "object" &&
                            jobCard.customer !== null
                              ? jobCard.customer.name
                              : jobCard.customer}
                          </div>
                          <div className="text-sm text-gray-500">
                            {typeof jobCard.vehicle === "object" &&
                            jobCard.vehicle !== null
                              ? `${jobCard.vehicle.make} ${jobCard.vehicle.model} (${jobCard.vehicle.regNumber})`
                              : jobCard.vehicle}
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                            jobCard.status
                          )}`}
                        >
                          <span className="mr-1">
                            {getStatusIcon(jobCard.status)}
                          </span>
                          {jobCard.status.charAt(0).toUpperCase() +
                            jobCard.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        ${jobCard.totalAmount.toFixed(2)}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredJobCards.length === 0 && (
              <div className="text-center py-10">
                <p className="text-gray-500">
                  No job cards found matching your search.
                </p>
              </div>
            )}

            <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
              <div className="text-sm text-gray-500">
                Showing {filteredJobCards.length} of {total} job cards
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

        {/* Job Card Details */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          {selectedJobCardData ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">
                  Job Card Details
                </h2>
                <span
                  className={`px-2 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                    selectedJobCardData.status
                  )}`}
                >
                  {selectedJobCardData.status.charAt(0).toUpperCase() +
                    selectedJobCardData.status.slice(1)}
                </span>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    Job Card Information
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    {/* <div className="flex items-center mb-2">
                      <Clipboard size={16} className="text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-700">
                        {selectedJobCardData.id}
                      </span>
                    </div> */}
                    <div className="flex items-center">
                      <Calendar size={16} className="text-gray-400 mr-2" />
                      <span className="text-sm text-gray-700">
                        {selectedJobCardData.date
                          ? selectedJobCardData.date.slice(0, 10)
                          : ""}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    Customer & Vehicle
                  </h3>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <User size={16} className="text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-700">
                        {typeof selectedJobCardData.customer === "object" &&
                        selectedJobCardData.customer !== null
                          ? selectedJobCardData.customer.name
                          : selectedJobCardData.customer}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Car size={16} className="text-gray-400 mr-2" />
                      <span className="text-sm text-gray-700">
                        {typeof selectedJobCardData.vehicle === "object" &&
                        selectedJobCardData.vehicle !== null
                          ? `${selectedJobCardData.vehicle.make} ${selectedJobCardData.vehicle.model} (${selectedJobCardData.vehicle.regNumber})`
                          : selectedJobCardData.vehicle}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Service Information */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    Service Information
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <div>
                      <span className="text-sm text-gray-600">
                        Vehicle Type:
                      </span>{" "}
                      <span className="text-sm text-gray-800 font-medium">
                        {selectedJobCardData.vehicleType}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">
                        Service Type:
                      </span>{" "}
                      <span className="text-sm text-gray-800 font-medium">
                        {selectedJobCardData.serviceType}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">
                        Service Level:
                      </span>{" "}
                      <span className="text-sm text-gray-800 font-medium">
                        {selectedJobCardData.serviceLevel &&
                          selectedJobCardData.serviceLevel
                            .charAt(0)
                            .toUpperCase() +
                            selectedJobCardData.serviceLevel.slice(1)}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">
                        Service Option:
                      </span>{" "}
                      <span className="text-sm text-gray-800 font-medium">
                        {selectedJobCardData.serviceOption}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Technician Information */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    Technician
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center">
                      <Tool size={16} className="text-gray-400 mr-2" />
                      <span className="text-sm text-gray-700">
                        {selectedJobCardData.technician}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    Billing Summary
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Subtotal:</span>
                      <span className="text-sm text-gray-700">
                        ${(selectedJobCardData.totalAmount * 0.9).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Tax (10%):</span>
                      <span className="text-sm text-gray-700">
                        ${(selectedJobCardData.totalAmount * 0.1).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                      <span className="text-sm font-medium text-gray-700">
                        Total:
                      </span>
                      <span className="text-sm font-bold text-gray-900">
                        ${selectedJobCardData.totalAmount.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center"
                    onClick={() =>
                      handleDownloadJobCard(
                        selectedJobCardData._id || selectedJobCardData.id
                      )
                    }
                  >
                    <FileText size={16} className="mr-2" />
                    <span>Generate JobCard</span>
                  </button>
                  {selectedJobCardData.status !== "completed" && (
                    <button
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                      onClick={() =>
                        handleMarkComplete(
                          selectedJobCardData._id || selectedJobCardData.id
                        )
                      }
                    >
                      <CheckCircle size={16} className="mr-2" />
                      <span>Mark as Complete</span>
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-10">
              <FileText size={48} className="text-gray-300 mb-4" />
              <p className="text-gray-500 text-center">
                Select a job card to view details
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobCards;
