import React, { useState, useContext } from "react";
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

const JobCards = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJobCard, setSelectedJobCard] = useState(null);
  const [isAddJobCardModalOpen, setIsAddJobCardModalOpen] = useState(false);
  const [newJobCard, setNewJobCard] = useState({
    customer: "",
    vehicle: "",
    date: "",
    services: "",
    status: "pending",
    technician: "",
    totalAmount: "",
  });
  const [errors, setErrors] = useState({});
  const { customers } = useContext(CustomerContext);
  const { vehicles } = useContext(VehicleContext);
  const { jobCards, addJobCard } = useContext(JobCardsContext);

  // Validate form
  const validate = () => {
    let err = {};
    if (!newJobCard.customer) err.customer = "Customer thevai";
    if (!newJobCard.vehicle) err.vehicle = "Vehicle thevai";
    if (!newJobCard.date) err.date = "Date thevai";
    if (!newJobCard.services) err.services = "Service thevai";
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
      date: "",
      services: "",
      status: "pending",
      technician: "",
      totalAmount: "",
    });
    setErrors({});
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

  const filteredJobCards = jobCards.filter(
    (jobCard) =>
      jobCard.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      jobCard.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      jobCard.vehicle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedJobCardData = jobCards.find(
    (jobCard) => jobCard.id === selectedJobCard
  );

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

            <div className="space-y-3">
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
                  {customers.map((c, i) => (
                    <option key={i} value={c.name ? c.name : c}>
                      {c.name ? c.name : c}
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
                  {vehicles.map((v, i) => (
                    <option
                      key={i}
                      value={`${v.make} ${v.model} (${v.regNumber})`}
                    >
                      {v.make} {v.model} ({v.regNumber})
                    </option>
                  ))}
                </select>
                {errors.vehicle && (
                  <span className="text-red-500 text-xs">{errors.vehicle}</span>
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
                <label className="block text-sm">
                  Services (comma separated)
                </label>
                <input
                  type="text"
                  className="w-full border rounded px-2 py-1"
                  placeholder="eg: Oil Change, Brake Check"
                  value={newJobCard.services}
                  onChange={(e) =>
                    setNewJobCard({ ...newJobCard, services: e.target.value })
                  }
                />
                {errors.services && (
                  <span className="text-red-500 text-xs">
                    {errors.services}
                  </span>
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
                      Services
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
                      key={jobCard.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      onClick={() => setSelectedJobCard(jobCard.id)}
                      className={`hover:bg-gray-50 cursor-pointer ${
                        selectedJobCard === jobCard.id ? "bg-blue-50" : ""
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
                              {jobCard.date}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <div className="text-sm font-medium text-gray-900">
                            {jobCard.customer}
                          </div>
                          <div className="text-sm text-gray-500">
                            {jobCard.vehicle}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-wrap gap-1">
                          {jobCard.services.map((service, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800"
                            >
                              {service}
                            </span>
                          ))}
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
                Showing{" "}
                <span className="font-medium">{filteredJobCards.length}</span>{" "}
                of <span className="font-medium">{jobCards.length}</span> job
                cards
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
                    <div className="flex items-center mb-2">
                      <Clipboard size={16} className="text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-700">
                        {selectedJobCardData.id}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Calendar size={16} className="text-gray-400 mr-2" />
                      <span className="text-sm text-gray-700">
                        {selectedJobCardData.date}
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
                        {selectedJobCardData.customer}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Car size={16} className="text-gray-400 mr-2" />
                      <span className="text-sm text-gray-700">
                        {selectedJobCardData.vehicle}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    Services Performed
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <ul className="space-y-2">
                      {selectedJobCardData.services.map((service, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle
                            size={16}
                            className="text-green-500 mr-2 mt-0.5"
                          />
                          <span className="text-sm text-gray-700">
                            {service}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

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
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center">
                    <FileText size={16} className="mr-2" />
                    <span>Generate Invoice</span>
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
                    <CheckCircle size={16} className="mr-2" />
                    <span>Mark as Complete</span>
                  </button>
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
