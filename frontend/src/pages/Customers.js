import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Plus,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Phone,
  Mail,
  Car,
} from "lucide-react";

// Sample data
const customersData = [
  {
    id: 1,
    name: "Michael Johnson",
    email: "michael@example.com",
    phone: "(555) 123-4567",
    address: "123 Main St, City",
    vehicles: 2,
    lastService: "15 May 2024",
    status: "active",
  },
  {
    id: 2,
    name: "Sarah Williams",
    email: "sarah@example.com",
    phone: "(555) 987-6543",
    address: "456 Oak Ave, Town",
    vehicles: 1,
    lastService: "3 Jun 2024",
    status: "active",
  },
  {
    id: 3,
    name: "David Martinez",
    email: "david@example.com",
    phone: "(555) 567-8901",
    address: "789 Pine Rd, Village",
    vehicles: 3,
    lastService: "27 Apr 2024",
    status: "inactive",
  },
  {
    id: 4,
    name: "Jennifer Taylor",
    email: "jennifer@example.com",
    phone: "(555) 234-5678",
    address: "101 Elm Blvd, County",
    vehicles: 1,
    lastService: "9 Jun 2024",
    status: "active",
  },
  {
    id: 5,
    name: "Robert Brown",
    email: "robert@example.com",
    phone: "(555) 345-6789",
    address: "202 Maple Dr, District",
    vehicles: 2,
    lastService: "22 May 2024",
    status: "active",
  },
];

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddCustomerModalOpen, setIsAddCustomerModalOpen] = useState(false);
  const [customers, setCustomers] = useState(customersData);

  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    vehicles: 1,
    lastService: "",
    status: "active",
  });

  const handleAddCustomer = () => {
    const id = customers.length + 1;
    setCustomers([...customers, { ...newCustomer, id }]);
    setIsAddCustomerModalOpen(false);
    setNewCustomer({
      name: "",
      email: "",
      phone: "",
      address: "",
      vehicles: 1,
      lastService: "",
      status: "active",
    });
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl font-bold text-gray-800">Customers</h1>
        <p className="text-gray-600">
          Manage your customer information and track their vehicles.
        </p>
      </motion.div>

      {/* Search and Actions */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search customers..."
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
            onClick={() => setIsAddCustomerModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
          >
            <Plus size={16} className="mr-2" />
            <span>Add Customer</span>
          </motion.button>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vehicles
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Service
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
              {filteredCustomers.map((customer) => (
                <motion.tr
                  key={customer.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-700 font-semibold">
                          {customer.name.charAt(0)}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {customer.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {customer.address}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col space-y-1">
                      <div className="text-sm text-gray-900 flex items-center">
                        <Phone size={14} className="text-gray-400 mr-1" />
                        {customer.phone}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <Mail size={14} className="text-gray-400 mr-1" />
                        {customer.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 flex items-center">
                    <Car size={16} className="text-gray-400 mr-2" />
                    {customer.vehicles}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {customer.lastService}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        customer.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {customer.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Edit size={16} />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 size={16} />
                      </button>
                      <div className="relative group">
                        <button className="text-gray-500 hover:text-gray-700">
                          <MoreVertical size={16} />
                        </button>
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block z-10">
                          <a
                            href="#view-profile"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            View Profile
                          </a>
                          <a
                            href="#schedule"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Schedule Appointment
                          </a>
                          <a
                            href="#service-history"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Service History
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

        {filteredCustomers.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500">
              No customers found matching your search.
            </p>
          </div>
        )}

        <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
          <div className="text-sm text-gray-500">
            Showing {filteredCustomers.length} of {customers.length} customers
          </div>
          <div className="flex items-center space-x-2">
            <button
              className="px-3 py-1 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
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

      {/* Add Customer Modal */}
      {isAddCustomerModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-xl shadow-xl p-6 w-full max-w-2xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                Add New Customer
              </h2>
              <button
                onClick={() => setIsAddCustomerModalOpen(false)}
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

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full border rounded px-4 py-2"
                value={newCustomer.name}
                onChange={(e) =>
                  setNewCustomer({ ...newCustomer, name: e.target.value })
                }
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full border rounded px-4 py-2"
                value={newCustomer.email}
                onChange={(e) =>
                  setNewCustomer({ ...newCustomer, email: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Phone"
                className="w-full border rounded px-4 py-2"
                value={newCustomer.phone}
                onChange={(e) =>
                  setNewCustomer({ ...newCustomer, phone: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Address"
                className="w-full border rounded px-4 py-2"
                value={newCustomer.address}
                onChange={(e) =>
                  setNewCustomer({ ...newCustomer, address: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="Number of Vehicles"
                className="w-full border rounded px-4 py-2"
                value={newCustomer.vehicles}
                onChange={(e) =>
                  setNewCustomer({
                    ...newCustomer,
                    vehicles: parseInt(e.target.value),
                  })
                }
              />
              <input
                type="date"
                placeholder="Last Service Date"
                className="w-full border rounded px-4 py-2"
                value={newCustomer.lastService}
                onChange={(e) =>
                  setNewCustomer({
                    ...newCustomer,
                    lastService: e.target.value,
                  })
                }
              />
              <select
                className="w-full border rounded px-4 py-2"
                value={newCustomer.status}
                onChange={(e) =>
                  setNewCustomer({ ...newCustomer, status: e.target.value })
                }
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <button
                onClick={handleAddCustomer}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Save Customer
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Customers;
