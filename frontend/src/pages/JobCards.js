import React, { useState } from "react";
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

// Sample data
const jobCardsData = [
  {
    id: "JC-2024-001",
    customer: "Michael Johnson",
    vehicle: "Toyota Camry (ABC-123)",
    date: "2024-06-15",
    services: ["Oil Change", "Air Filter Replacement"],
    status: "completed",
    technician: "Robert Smith",
    totalAmount: 95.75,
  },
  {
    id: "JC-2024-002",
    customer: "Sarah Williams",
    vehicle: "Honda Civic (XYZ-789)",
    date: "2024-06-15",
    services: ["Brake Inspection", "Brake Pad Replacement"],
    status: "in-progress",
    technician: "James Wilson",
    totalAmount: 220.5,
  },
  {
    id: "JC-2024-003",
    customer: "David Martinez",
    vehicle: "Ford F-150 (DEF-456)",
    date: "2024-06-14",
    services: ["Tire Rotation", "Wheel Alignment"],
    status: "completed",
    technician: "Lisa Brown",
    totalAmount: 150.0,
  },
  {
    id: "JC-2024-004",
    customer: "Jennifer Taylor",
    vehicle: "Nissan Altima (GHI-789)",
    date: "2024-06-14",
    services: ["AC Repair", "Coolant Flush"],
    status: "pending",
    technician: "Robert Smith",
    totalAmount: 320.25,
  },
  {
    id: "JC-2024-005",
    customer: "Robert Brown",
    vehicle: "BMW X5 (JKL-012)",
    date: "2024-06-13",
    services: ["Full Service", "Spark Plug Replacement"],
    status: "completed",
    technician: "James Wilson",
    totalAmount: 485.0,
  },
];

const JobCards = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJobCard, setSelectedJobCard] = useState(null);

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

  const filteredJobCards = jobCardsData.filter(
    (jobCard) =>
      jobCard.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      jobCard.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      jobCard.vehicle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedJobCardData = jobCardsData.find(
    (jobCard) => jobCard.id === selectedJobCard
  );

  return (
    <div className="space-y-6">
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
                of <span className="font-medium">{jobCardsData.length}</span>{" "}
                job cards
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
