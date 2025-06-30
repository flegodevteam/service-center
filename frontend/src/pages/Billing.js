import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Plus,
  DollarSign,
  CreditCard,
  Download,
  Eye,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";

// Sample data
const invoicesData = [
  {
    id: "INV-2024-001",
    customer: "Michael Johnson",
    vehicle: "Toyota Camry (ABC-123)",
    date: "2024-06-15",
    amount: 95.75,
    jobCard: "JC-2024-001",
    paymentStatus: "paid",
    paymentMethod: "Credit Card",
  },
  {
    id: "INV-2024-002",
    customer: "Sarah Williams",
    vehicle: "Honda Civic (XYZ-789)",
    date: "2024-06-15",
    amount: 220.5,
    jobCard: "JC-2024-002",
    paymentStatus: "pending",
    paymentMethod: "Pending",
  },
  {
    id: "INV-2024-003",
    customer: "David Martinez",
    vehicle: "Ford F-150 (DEF-456)",
    date: "2024-06-14",
    amount: 150.0,
    jobCard: "JC-2024-003",
    paymentStatus: "paid",
    paymentMethod: "Cash",
  },
  {
    id: "INV-2024-004",
    customer: "Jennifer Taylor",
    vehicle: "Nissan Altima (GHI-789)",
    date: "2024-06-14",
    amount: 320.25,
    jobCard: "JC-2024-004",
    paymentStatus: "cancelled",
    paymentMethod: "Cancelled",
  },
  {
    id: "INV-2024-005",
    customer: "Robert Brown",
    vehicle: "BMW X5 (JKL-012)",
    date: "2024-06-13",
    amount: 485.0,
    jobCard: "JC-2024-005",
    paymentStatus: "paid",
    paymentMethod: "Mobile Payment",
  },
];

const getStatusColor = (status) => {
  switch (status) {
    case "paid":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case "paid":
      return <CheckCircle size={16} />;
    case "pending":
      return <Clock size={16} />;
    case "cancelled":
      return <XCircle size={16} />;
    default:
      return null;
  }
};

const Billing = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const filteredInvoices = invoicesData.filter(
    (invoice) =>
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.vehicle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedInvoiceData = invoicesData.find(
    (invoice) => invoice.id === selectedInvoice
  );

  // Calculate summary values
  const totalRevenue = invoicesData
    .filter((invoice) => invoice.paymentStatus === "paid")
    .reduce((sum, invoice) => sum + invoice.amount, 0);

  const pendingPayments = invoicesData
    .filter((invoice) => invoice.paymentStatus === "pending")
    .reduce((sum, invoice) => sum + invoice.amount, 0);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl font-bold text-gray-800">Billing & Payments</h1>
        <p className="text-gray-600">Manage invoices and process payments.</p>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-800">
                ${totalRevenue.toFixed(2)}
              </p>
            </div>
            <div className="rounded-full p-3 bg-green-100">
              <DollarSign size={20} className="text-green-700" />
            </div>
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
                Pending Payments
              </p>
              <p className="text-2xl font-bold text-gray-800">
                ${pendingPayments.toFixed(2)}
              </p>
            </div>
            <div className="rounded-full p-3 bg-yellow-100">
              <Clock size={20} className="text-yellow-700" />
            </div>
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
                Invoices This Month
              </p>
              <p className="text-2xl font-bold text-gray-800">
                {invoicesData.length}
              </p>
            </div>
            <div className="rounded-full p-3 bg-blue-100">
              <FileText size={20} className="text-blue-700" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Search and Actions */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search invoices..."
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
            <Plus size={16} className="mr-2" />
            <span>New Invoice</span>
          </motion.button>
        </div>
      </div>

      {/* Invoices */}
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
                      Invoice
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
                      Amount
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
                  {filteredInvoices.map((invoice) => (
                    <motion.tr
                      key={invoice.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      onClick={() => setSelectedInvoice(invoice.id)}
                      className={`hover:bg-gray-50 cursor-pointer ${
                        selectedInvoice === invoice.id ? "bg-blue-50" : ""
                      }`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <FileText size={20} className="text-blue-700" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {invoice.id}
                            </div>
                            <div className="text-sm text-gray-500">
                              {invoice.date}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {invoice.customer}
                        </div>
                        <div className="text-sm text-gray-500">
                          {invoice.vehicle}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          ${invoice.amount.toFixed(2)}
                        </div>
                        <div className="text-sm text-gray-500">
                          Job: {invoice.jobCard}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                            invoice.paymentStatus
                          )}`}
                        >
                          <span className="mr-1">
                            {getStatusIcon(invoice.paymentStatus)}
                          </span>
                          {invoice.paymentStatus === "paid"
                            ? "Paid"
                            : invoice.paymentStatus === "pending"
                            ? "Pending"
                            : "Cancelled"}
                        </span>
                        <div className="text-xs text-gray-500 mt-1">
                          {invoice.paymentMethod}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button className="p-1 rounded text-blue-600 hover:bg-blue-50">
                            <Eye size={16} />
                          </button>
                          <button className="p-1 rounded text-green-600 hover:bg-green-50">
                            <Download size={16} />
                          </button>
                          {invoice.paymentStatus === "pending" && (
                            <button className="p-1 rounded text-purple-600 hover:bg-purple-50">
                              <CreditCard size={16} />
                            </button>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredInvoices.length === 0 && (
              <div className="text-center py-10">
                <p className="text-gray-500">
                  No invoices found matching your search.
                </p>
              </div>
            )}

            <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
              <div className="text-sm text-gray-500">
                Showing{" "}
                <span className="font-medium">{filteredInvoices.length}</span>{" "}
                of <span className="font-medium">{invoicesData.length}</span>{" "}
                invoices
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

        {/* Invoice Details */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          {selectedInvoiceData ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">
                  Invoice Details
                </h2>
                <span
                  className={`px-2 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                    selectedInvoiceData.paymentStatus
                  )}`}
                >
                  {selectedInvoiceData.paymentStatus === "paid"
                    ? "Paid"
                    : selectedInvoiceData.paymentStatus === "pending"
                    ? "Pending"
                    : "Cancelled"}
                </span>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Invoice Number
                    </p>
                    <p className="text-base font-medium text-gray-900">
                      {selectedInvoiceData.id}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-500">Date</p>
                    <p className="text-base text-gray-900">
                      {selectedInvoiceData.date}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    Customer
                  </p>
                  <p className="text-base font-medium text-gray-900">
                    {selectedInvoiceData.customer}
                  </p>
                  <p className="text-sm text-gray-600">
                    {selectedInvoiceData.vehicle}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    Related Job Card
                  </p>
                  <p className="text-base font-medium text-blue-600">
                    {selectedInvoiceData.jobCard}
                  </p>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">
                    Service Summary
                  </h3>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Oil Change</span>
                      <span className="text-gray-900">$45.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        Air Filter Replacement
                      </span>
                      <span className="text-gray-900">$35.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Labor (1 hour)</span>
                      <span className="text-gray-900">$75.00</span>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 mt-4 pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="text-gray-900">
                        ${(selectedInvoiceData.amount * 0.9).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tax (10%)</span>
                      <span className="text-gray-900">
                        ${(selectedInvoiceData.amount * 0.1).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between font-medium text-base pt-2">
                      <span className="text-gray-800">Total</span>
                      <span className="text-gray-900">
                        ${selectedInvoiceData.amount.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">
                    Payment Information
                  </h3>

                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Status</span>
                      <span
                        className={`font-medium ${
                          selectedInvoiceData.paymentStatus === "paid"
                            ? "text-green-600"
                            : selectedInvoiceData.paymentStatus === "pending"
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      >
                        {selectedInvoiceData.paymentStatus === "paid"
                          ? "Paid"
                          : selectedInvoiceData.paymentStatus === "pending"
                          ? "Pending"
                          : "Cancelled"}
                      </span>
                    </div>
                    {selectedInvoiceData.paymentStatus === "paid" && (
                      <>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Method</span>
                          <span className="text-gray-900">
                            {selectedInvoiceData.paymentMethod}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Payment Date</span>
                          <span className="text-gray-900">
                            {selectedInvoiceData.date}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center">
                    <Download size={16} className="mr-2" />
                    <span>Download PDF</span>
                  </button>
                  {selectedInvoiceData.paymentStatus === "pending" && (
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center">
                      <CreditCard size={16} className="mr-2" />
                      <span>Process Payment</span>
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-10">
              <FileText size={48} className="text-gray-300 mb-4" />
              <p className="text-gray-500 text-center">
                Select an invoice to view details
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Billing;
