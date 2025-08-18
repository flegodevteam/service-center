import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Plus,
  Filter,
  Package,
  AlertTriangle,
  BarChart2,
  Truck,
} from "lucide-react";
import InventoryContext from "../context/InventoryContext";

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
  const [errors, setErrors] = useState({});
  const { inventory, addItem } = useContext(InventoryContext);

  const filteredInventory = inventory.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const lowStockItems = inventory.filter(
    (item) => item.status === "low-stock" || item.status === "out-of-stock"
  );

  // Validation
  const validate = () => {
    let err = {};
    if (!newItem.id) err.id = "Item ID is required";
    if (!newItem.name) err.name = "Name is required";
    if (!newItem.category) err.category = "Category is required";
    if (newItem.stock === "" || isNaN(newItem.stock) || newItem.stock < 0)
      err.stock = "Valid stock is required";
    if (
      newItem.minStock === "" ||
      isNaN(newItem.minStock) ||
      newItem.minStock < 0
    )
      err.minStock = "Valid min stock is required";
    if (newItem.price === "" || isNaN(newItem.price) || newItem.price < 0)
      err.price = "Valid price is required";
    if (!newItem.location) err.location = "Location is required";
    if (!newItem.status) err.status = "Status is required";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

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

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!validate()) return;
    addItem(newItem);
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
    setErrors({});
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
                {inventory.length}
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
                {inventory
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
        <div className="fixed -inset-y-full inset-x-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-[5%] shadow-xl p-6 w-full max-w-lg max-h-[90vh] "
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                Add New Inventory Item
              </h2>
              <button
                onClick={() => setIsAddItemModalOpen(false)}
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
              onSubmit={handleAddItem}
              className="space-y-6 pl-2 pr-2 overflow-y-auto max-h-[70vh]"
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
                {errors.id && (
                  <span className="text-red-500 text-xs">{errors.id}</span>
                )}
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
                {errors.name && (
                  <span className="text-red-500 text-xs">{errors.name}</span>
                )}
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
                {errors.category && (
                  <span className="text-red-500 text-xs">
                    {errors.category}
                  </span>
                )}
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
                  {errors.stock && (
                    <span className="text-red-500 text-xs">{errors.stock}</span>
                  )}
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
                  {errors.minStock && (
                    <span className="text-red-500 text-xs">
                      {errors.minStock}
                    </span>
                  )}
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
                {errors.price && (
                  <span className="text-red-500 text-xs">{errors.price}</span>
                )}
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
                {errors.location && (
                  <span className="text-red-500 text-xs">
                    {errors.location}
                  </span>
                )}
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
                {errors.status && (
                  <span className="text-red-500 text-xs">{errors.status}</span>
                )}
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
