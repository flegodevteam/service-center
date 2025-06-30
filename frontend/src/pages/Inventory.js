import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Plus,
  Filter,
  Package,
  AlertTriangle,
  TrendingDown,
  BarChart2,
  ArrowUp,
  ArrowDown,
  Truck,
  X,
} from "lucide-react";

// Sample data
const inventoryData = [
  {
    id: "P001",
    name: "Engine Oil Filter",
    category: "Filters",
    stock: 45,
    minStock: 10,
    price: 12.99,
    location: "A-12",
    status: "in-stock",
  },
  {
    id: "P002",
    name: "Brake Pads (Front)",
    category: "Brakes",
    stock: 8,
    minStock: 10,
    price: 35.5,
    location: "B-05",
    status: "low-stock",
  },
  {
    id: "P003",
    name: "Spark Plugs",
    category: "Ignition",
    stock: 32,
    minStock: 15,
    price: 8.75,
    location: "C-09",
    status: "in-stock",
  },
  {
    id: "P004",
    name: "Air Filter",
    category: "Filters",
    stock: 16,
    minStock: 8,
    price: 15.25,
    location: "A-14",
    status: "in-stock",
  },
  {
    id: "P005",
    name: "Wiper Blades",
    category: "Exterior",
    stock: 0,
    minStock: 5,
    price: 22.0,
    location: "D-03",
    status: "out-of-stock",
  },
  {
    id: "P006",
    name: "Coolant 1L",
    category: "Fluids",
    stock: 7,
    minStock: 10,
    price: 9.99,
    location: "E-02",
    status: "low-stock",
  },
  {
    id: "P007",
    name: "Transmission Fluid",
    category: "Fluids",
    stock: 12,
    minStock: 5,
    price: 14.5,
    location: "E-03",
    status: "in-stock",
  },
];

const getStatusColor = (status) => {
  switch (status) {
    case "in-stock":
      return "bg-green-100 text-green-800";
    case "low-stock":
      return "bg-yellow-100 text-yellow-800";
    case "out-of-stock":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);

  // Form state for Add Item Modal
  const [newItem, setNewItem] = useState({
    id: "",
    name: "",
    category: "",
    stock: 0,
    minStock: 0,
    price: 0,
    location: "",
    status: "in-stock",
  });

  const filteredInventory = inventoryData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const lowStockItems = inventoryData.filter(
    (item) => item.status === "low-stock" || item.status === "out-of-stock"
  );

  // Handler for form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({
      ...prev,
      [name]:
        name === "stock" || name === "minStock" || name === "price"
          ? Number(value)
          : value,
    }));
  };

  // Handler for submitting new item (just console logs here, replace with your logic)
  const handleAddItem = () => {
    console.log("Adding new item:", newItem);
    // You would add to your inventory here and reset the form & close modal
    setIsAddItemModalOpen(false);
    setNewItem({
      id: "",
      name: "",
      category: "",
      stock: 0,
      minStock: 0,
      price: 0,
      location: "",
      status: "in-stock",
    });
  };

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl font-bold text-gray-800">
          Inventory Management
        </h1>
        <p className="text-gray-600">
          Track and manage spare parts and consumables.
        </p>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Items</p>
              <p className="text-2xl font-bold text-gray-800">
                {inventoryData.length}
              </p>
            </div>
            <div className="rounded-full p-3 bg-blue-100">
              <Package size={20} className="text-blue-700" />
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
                Low Stock Items
              </p>
              <p className="text-2xl font-bold text-gray-800">
                {lowStockItems.length}
              </p>
            </div>
            <div className="rounded-full p-3 bg-yellow-100">
              <AlertTriangle size={20} className="text-yellow-700" />
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
              <p className="text-sm font-medium text-gray-600">Total Value</p>
              <p className="text-2xl font-bold text-gray-800">
                $
                {inventoryData
                  .reduce((acc, item) => acc + item.price * item.stock, 0)
                  .toFixed(2)}
              </p>
            </div>
            <div className="rounded-full p-3 bg-green-100">
              <BarChart2 size={20} className="text-green-700" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Pending Orders
              </p>
              <p className="text-2xl font-bold text-gray-800">3</p>
            </div>
            <div className="rounded-full p-3 bg-purple-100">
              <Truck size={20} className="text-purple-700" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Search and Actions */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search inventory..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Search
            size={18}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
        </div>

        <div className="flex items-center space-x-3">
          <button
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow"
            onClick={() => setIsAddItemModalOpen(true)}
          >
            <Plus size={16} />
            Add Item
          </button>
          <button
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg"
            title="Filter (not implemented)"
          >
            <Filter size={16} />
            Filter
          </button>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-3 border border-gray-300">ID</th>
              <th className="text-left p-3 border border-gray-300">Name</th>
              <th className="text-left p-3 border border-gray-300">Category</th>
              <th className="text-right p-3 border border-gray-300">Stock</th>
              <th className="text-right p-3 border border-gray-300">
                Min Stock
              </th>
              <th className="text-right p-3 border border-gray-300">
                Price ($)
              </th>
              <th className="text-left p-3 border border-gray-300">Location</th>
              <th className="text-center p-3 border border-gray-300">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredInventory.length > 0 ? (
              filteredInventory.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="p-3 border border-gray-300">{item.id}</td>
                  <td className="p-3 border border-gray-300">{item.name}</td>
                  <td className="p-3 border border-gray-300">
                    {item.category}
                  </td>
                  <td className="p-3 border border-gray-300 text-right">
                    {item.stock}
                  </td>
                  <td className="p-3 border border-gray-300 text-right">
                    {item.minStock}
                  </td>
                  <td className="p-3 border border-gray-300 text-right">
                    {item.price.toFixed(2)}
                  </td>
                  <td className="p-3 border border-gray-300">
                    {item.location}
                  </td>
                  <td className="p-3 border border-gray-300 text-center">
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        item.status
                      )}`}
                    >
                      {item.status.replace("-", " ").toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center p-4 text-gray-500">
                  No items found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Item Modal */}
      {isAddItemModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative"
          >
            <button
              onClick={() => setIsAddItemModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
            <h2 className="text-xl font-semibold mb-4">
              Add New Inventory Item
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddItem();
              }}
              className="space-y-4"
            >
              <div>
                <label
                  htmlFor="id"
                  className="block text-sm font-medium text-gray-700"
                >
                  Item ID
                </label>
                <input
                  type="text"
                  id="id"
                  name="id"
                  value={newItem.id}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newItem.name}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category
                </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={newItem.category}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label
                    htmlFor="stock"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Stock
                  </label>
                  <input
                    type="number"
                    id="stock"
                    name="stock"
                    value={newItem.stock}
                    onChange={handleInputChange}
                    min={0}
                    required
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="minStock"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Min Stock
                  </label>
                  <input
                    type="number"
                    id="minStock"
                    name="minStock"
                    value={newItem.minStock}
                    onChange={handleInputChange}
                    min={0}
                    required
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700"
                >
                  Price ($)
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={newItem.price}
                  onChange={handleInputChange}
                  min={0}
                  step="0.01"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700"
                >
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={newItem.location}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700"
                >
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={newItem.status}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="in-stock">In Stock</option>
                  <option value="low-stock">Low Stock</option>
                  <option value="out-of-stock">Out of Stock</option>
                </select>
              </div>
              <div className="pt-4 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsAddItemModalOpen(false)}
                  className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                >
                  Add Item
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Inventory;
