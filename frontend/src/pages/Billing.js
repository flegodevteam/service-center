import React, { useState, useContext, useEffect } from "react";
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
import BillingContext from "../context/BillingContext";
import { CustomerContext } from "../context/CustomerContext";
import { VehicleContext } from "../context/VehicleContext";
import { API_URL } from "../api/api";

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
  const [isAddInvoiceModalOpen, setIsAddInvoiceModalOpen] = useState(false);
  const [newInvoice, setNewInvoice] = useState({
    customer: "",
    vehicle: "",
    date: "",
    amount: "",
    paymentStatus: "pending",
    paymentMethod: "Pending",
  });
  const [errors, setErrors] = useState({});
  const { customers, fetchAllCustomers } = useContext(CustomerContext);
  const { vehicles, fetchAllVehicles } = useContext(VehicleContext);
  const { invoices, addInvoice, fetchInvoices, total, totalPages } =
    useContext(BillingContext);
  const [currentPage, setCurrentPage] = useState(1);
  const invoicesPerPage = 5;

  useEffect(() => {
    fetchInvoices(currentPage, invoicesPerPage);
  }, [currentPage, invoicesPerPage, fetchInvoices]);

  const filteredInvoices = invoices.filter((invoice) => {
    const customerName =
      typeof invoice.customer === "object" && invoice.customer !== null
        ? invoice.customer.name
        : invoice.customer || "";
    const vehicleName =
      typeof invoice.vehicle === "object" && invoice.vehicle !== null
        ? `${invoice.vehicle.make} ${invoice.vehicle.model} (${invoice.vehicle.regNumber})`
        : invoice.vehicle || "";
    return (
      (invoice.id || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicleName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const selectedInvoiceData = invoices.find(
    (invoice) => (invoice._id || invoice.id) === selectedInvoice
  );

  // Summary
  const totalRevenue = invoices
    .filter((invoice) => invoice.paymentStatus === "paid")
    .reduce((sum, invoice) => sum + invoice.amount, 0);

  const pendingPayments = invoices
    .filter((invoice) => invoice.paymentStatus === "pending")
    .reduce((sum, invoice) => sum + invoice.amount, 0);

  // Validation
  const validate = () => {
    const err = {};
    if (!newInvoice.customer) err.customer = "Customer is required";
    if (!newInvoice.vehicle) err.vehicle = "Vehicle is required";
    if (!newInvoice.date) err.date = "Date is required";
    if (
      !newInvoice.amount ||
      isNaN(newInvoice.amount) ||
      newInvoice.amount <= 0
    )
      err.amount = "Valid amount required";
    if (!newInvoice.paymentStatus) err.paymentStatus = "Status required";
    if (!newInvoice.paymentMethod)
      err.paymentMethod = "Payment method required";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleAddInvoice = (e) => {
    e.preventDefault();
    if (!validate()) return;
    addInvoice(newInvoice);
    setIsAddInvoiceModalOpen(false);
    setNewInvoice({
      customer: "",
      vehicle: "",
      date: "",
      amount: "",
      paymentStatus: "pending",
      paymentMethod: "Pending",
    });
    setErrors({});
  };

  const [downloading, setDownloading] = useState(false);

  const handleDownloadPDF = async (invoiceId) => {
    setDownloading(true);
    try {
      const response = await fetch(`${API_URL}/invoices/${invoiceId}/pdf`, {
        method: "GET",
        headers: {
          Accept: "application/pdf",
        },
      });

      console.log("PDF Download response:", response.status, response.ok);

      const blob = await response.blob();

      // ✅ Fallback: Check content type
      if (blob.type === "application/pdf") {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `invoice_${invoiceId}.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
        alert("PDF downloaded successfully!");
      } else {
        alert("Download failed: Received non-PDF file.");
      }
    } catch (err) {
      alert("PDF download failed");
      console.error(err);
    } finally {
      setDownloading(false);
    }
  };

  const [processing, setProcessing] = useState(false);

  const handleProcessPayment = async (invoiceId) => {
    setProcessing(true);
    try {
      const res = await fetch(`${API_URL}/invoices/${invoiceId}/pay`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ paymentMethod: "Cash" }), // Or get from user input
      });
      const data = await res.json();
      if (res.ok) {
        alert("Payment processed successfully!");
        fetchInvoices(); // Refresh invoice list
      } else {
        alert(data.message || "Payment failed");
      }
    } catch (err) {
      alert("Payment failed");
    } finally {
      setProcessing(false);
    }
  };

  useEffect(() => {
    fetchAllCustomers();
  }, [fetchAllCustomers]);

  useEffect(() => {
    fetchAllVehicles();
  }, [fetchAllVehicles]);

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
                LKR {totalRevenue.toFixed(2)}
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
                LKR {pendingPayments.toFixed(2)}
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
                {invoices.length}
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
            onClick={() => setIsAddInvoiceModalOpen(true)}
          >
            <Plus size={16} className="mr-2" />
            <span>New Invoice</span>
          </motion.button>
        </div>
      </div>

      {/* Invoices Table & Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Invoice
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer & Vehicle
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredInvoices.map((invoice) => (
                    <motion.tr
                      key={invoice._id || invoice.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      onClick={() =>
                        setSelectedInvoice(invoice._id || invoice.id)
                      }
                      className={`hover:bg-gray-50 cursor-pointer ${
                        selectedInvoice === (invoice._id || invoice.id)
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
                              {invoice.id}
                            </div>
                            <div className="text-sm text-gray-500">
                              {invoice.date ? invoice.date.slice(0, 10) : ""}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {typeof invoice.customer === "object" &&
                          invoice.customer !== null
                            ? invoice.customer.name
                            : invoice.customer}
                        </div>
                        <div className="text-sm text-gray-500">
                          {typeof invoice.vehicle === "object" &&
                          invoice.vehicle !== null
                            ? `${invoice.vehicle.make} ${invoice.vehicle.model} (${invoice.vehicle.regNumber})`
                            : invoice.vehicle}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          LKR {invoice.amount.toFixed(2)}
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
                Showing {filteredInvoices.length} of {total} invoices
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
                      {selectedInvoiceData.date
                        ? selectedInvoiceData.date.slice(0, 10)
                        : ""}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    Customer
                  </p>
                  <p className="text-base font-medium text-gray-900">
                    {typeof selectedInvoiceData.customer === "object" &&
                    selectedInvoiceData.customer !== null
                      ? selectedInvoiceData.customer.name
                      : selectedInvoiceData.customer}
                  </p>
                  <p className="text-sm text-gray-600">
                    {typeof selectedInvoiceData.vehicle === "object" &&
                    selectedInvoiceData.vehicle !== null
                      ? `${selectedInvoiceData.vehicle.make} ${selectedInvoiceData.vehicle.model} (${selectedInvoiceData.vehicle.regNumber})`
                      : selectedInvoiceData.vehicle}
                  </p>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">
                    Service Summary
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Oil Change</span>
                      <span className="text-gray-900">45.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        Air Filter Replacement
                      </span>
                      <span className="text-gray-900">35.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Labor (1 hour)</span>
                      <span className="text-gray-900">75.00</span>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 mt-4 pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="text-gray-900">
                        LKR {(selectedInvoiceData.amount * 0.9).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tax (10%)</span>
                      <span className="text-gray-900">
                        LKR {(selectedInvoiceData.amount * 0.1).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between font-medium text-base pt-2">
                      <span className="text-gray-800">Total</span>
                      <span className="text-gray-900">
                        LKR {selectedInvoiceData.amount.toFixed(2)}
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
                            {selectedInvoiceData.date
                              ? selectedInvoiceData.date.slice(0, 10)
                              : ""}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center"
                    onClick={() =>
                      handleDownloadPDF(
                        selectedInvoiceData._id || selectedInvoiceData.id
                      )
                    }
                    disabled={downloading}
                  >
                    <Download size={16} className="mr-2" />
                    <span>
                      {downloading ? "Downloading..." : "Download PDF"}
                    </span>
                  </button>
                  {selectedInvoiceData.paymentStatus === "pending" && (
                    <button
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
                      onClick={() =>
                        handleProcessPayment(
                          selectedInvoiceData._id || selectedInvoiceData.id
                        )
                      }
                      disabled={processing}
                    >
                      <CreditCard size={16} className="mr-2" />
                      <span>
                        {processing ? "Processing..." : "Process Payment"}
                      </span>
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

      {/* Add Invoice Modal */}
      {isAddInvoiceModalOpen && (
        <div className="fixed -inset-y-full inset-x-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-xl shadow-xl p-6 w-full max-w-2xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                Add New Invoice
              </h2>
              <button
                onClick={() => setIsAddInvoiceModalOpen(false)}
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

            <form className="space-y-4" onSubmit={handleAddInvoice}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Customer
                </label>
                <select
                  className="w-full border rounded px-4 py-2"
                  value={newInvoice.customer}
                  onChange={(e) =>
                    setNewInvoice({ ...newInvoice, customer: e.target.value })
                  }
                >
                  <option value="">Select a customer</option>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vehicle
                </label>
                <select
                  className="w-full border rounded px-4 py-2"
                  value={newInvoice.vehicle}
                  onChange={(e) =>
                    setNewInvoice({ ...newInvoice, vehicle: e.target.value })
                  }
                >
                  <option value="">Select a vehicle</option>
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  placeholder="Date"
                  className="w-full border rounded px-4 py-2"
                  value={newInvoice.date}
                  onChange={(e) =>
                    setNewInvoice({ ...newInvoice, date: e.target.value })
                  }
                />
                {errors.date && (
                  <span className="text-red-500 text-xs">{errors.date}</span>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount
                </label>
                <input
                  type="number"
                  placeholder="Amount"
                  className="w-full border rounded px-4 py-2"
                  value={newInvoice.amount}
                  onChange={(e) =>
                    setNewInvoice({ ...newInvoice, amount: e.target.value })
                  }
                />
                {errors.amount && (
                  <span className="text-red-500 text-xs">{errors.amount}</span>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Status
                </label>
                <select
                  className="w-full border rounded px-4 py-2"
                  value={newInvoice.paymentStatus}
                  onChange={(e) =>
                    setNewInvoice({
                      ...newInvoice,
                      paymentStatus: e.target.value,
                      paymentMethod:
                        e.target.value === "paid"
                          ? "Cash"
                          : e.target.value === "cancelled"
                          ? "Cancelled"
                          : "Pending",
                    })
                  }
                >
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                {errors.paymentStatus && (
                  <span className="text-red-500 text-xs">
                    {errors.paymentStatus}
                  </span>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Method
                </label>
                <input
                  type="text"
                  placeholder="Payment Method"
                  className="w-full border rounded px-4 py-2"
                  value={newInvoice.paymentMethod}
                  onChange={(e) =>
                    setNewInvoice({
                      ...newInvoice,
                      paymentMethod: e.target.value,
                    })
                  }
                  disabled={newInvoice.paymentStatus !== "paid"}
                />
                {errors.paymentMethod && (
                  <span className="text-red-500 text-xs">
                    {errors.paymentMethod}
                  </span>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Save Invoice
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Billing;
