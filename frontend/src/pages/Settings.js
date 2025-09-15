import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  User,
  Building,
  Bell,
  Lock,
  Server,
  Clock,
  Mail,
  Smartphone,
  Printer,
  Plus,
  Edit2,
  Trash2,
  Save,
  Download,
  Upload,
  Shield,
  Activity,
  Settings as SettingsIcon,
  Users,
  Wrench,
  Package,
  DollarSign,
  Eye,
  EyeOff,
  AlertTriangle,
  CheckCircle,
  XCircle,
  FileText,
  Database,
  History,
  Key,
  Zap,
  X,
  Edit,
  Trash,
} from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { API_URL } from "../api/api";

const Settings = () => {
  const SERVICE_CONFIG_API = `${API_URL}/service-config`;
  const [activeTab, setActiveTab] = useState("user-management");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    role: "technician",
    status: "active",
    password: "",
    confirmPassword: "",
  });
  const [userErrors, setUserErrors] = useState({});
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [editUserErrors, setEditUserErrors] = useState({});

  // User Management State
  const [users, setUsers] = useState([]);

  // service management state
  const [isAddServiceModalOpen, setIsAddServiceModalOpen] = useState(false);
  const [serviceErrors, setServiceErrors] = useState({});
  const [isEditServiceModalOpen, setIsEditServiceModalOpen] = useState(false);
  const [editService, setEditService] = useState(null);
  const [editServiceErrors, setEditServiceErrors] = useState({});
  const [serviceTypesList, setServiceTypesList] = useState([
    "Engine Service",
    "Oil Change",
    "Full Body Wash",
    "Interior Cleaning",
    "Brake Check",
    "Battery Service",
  ]);
  const [customServiceType, setCustomServiceType] = useState("");

  const tabs = [
    {
      id: "user-management",
      label: "User Management",
      icon: <Users size={18} />,
    },
    {
      id: "service-config",
      label: "Service Configuration",
      icon: <Wrench size={18} />,
    },
  ];

  // Fetch all users from backend
  useEffect(() => {
    if (activeTab === "user-management") {
      fetchUsers();
    }
  }, [activeTab]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API_URL}/users`);
      setUsers(
        res.data.users.map((u) => ({
          id: u._id,
          username: u.name,
          email: u.email,
          role: u.role,
          status: "active", // If you have status in schema, use u.status
          lastLogin: "Never", // If you have lastLogin, use u.lastLogin
        }))
      );
    } catch (err) {
      toast.error("Failed to fetch users");
    }
  };

  // Add User Modal validation
  const validateUser = () => {
    let err = {};
    if (!newUser.username) err.username = "Username is required";
    if (!newUser.email) err.email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(newUser.email)) err.email = "Invalid email";
    if (!newUser.password) err.password = "Password is required";
    if (newUser.password.length < 6)
      err.password = "Password must be at least 6 characters";
    if (newUser.password !== newUser.confirmPassword)
      err.confirmPassword = "Passwords do not match";
    setUserErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleUserInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add new user (register)
  const handleAddUser = async (e) => {
    e.preventDefault();
    if (!validateUser()) return;
    try {
      await axios.post(`${API_URL}/auth/register`, {
        name: newUser.username,
        email: newUser.email,
        password: newUser.password,
        role: newUser.role,
      });
      setIsAddUserModalOpen(false);
      setNewUser({
        username: "",
        email: "",
        role: "technician",
        status: "active",
        password: "",
        confirmPassword: "",
      });
      setUserErrors({});
      toast.success("New user created successfully!");
      fetchUsers();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create user");
    }
  };

  // Edit User Modal validation
  const validateEditUser = () => {
    let err = {};
    if (!editUser.username) err.username = "Username is required";
    if (!editUser.email) err.email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(editUser.email)) err.email = "Invalid email";
    setEditUserErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleEditUserInputChange = (e) => {
    const { name, value } = e.target;
    setEditUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Edit user
  const handleEditUser = async (e) => {
    e.preventDefault();
    if (!validateEditUser()) return;
    try {
      await axios.put(`${API_URL}/users/${editUser.id}`, {
        name: editUser.username,
        email: editUser.email,
        role: editUser.role,
        // status: editUser.status, // If you add status in backend
      });
      setIsEditUserModalOpen(false);
      setEditUser(null);
      setEditUserErrors({});
      toast.success("User updated successfully!");
      fetchUsers();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update user");
    }
  };

  const handleDeleteUser = async (userId) => {
    // Find the user to delete
    const userToDelete = users.find((u) => u.id === userId);
    if (userToDelete?.role === "admin") {
      toast.error("Admin user cannot be deleted!");
      return;
    }
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`${API_URL}/users/${userId}`);
        toast.success("User deleted successfully!");
        fetchUsers();
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to delete user");
      }
    }
  };

  const handleToggleUserStatus = (userId) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId
          ? {
              ...user,
              status: user.status === "active" ? "inactive" : "active",
            }
          : user
      )
    );
    toast.success("User status updated!");
  };

  // Enhanced service management state
  const [newService, setNewService] = useState({
    name: "",
    category: "",
    vehicleTypes: [],
    serviceLevels: {
      normal: {
        isActive: true,
        basePrice: "",
        options: [],
      },
      hard: {
        isActive: false,
        percentageIncrease: 20,
        options: [],
      },
      heavy: {
        isActive: false,
        percentageIncrease: 40,
        options: [],
      },
    },
    isActive: true,
  });

  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [customVehicleType, setCustomVehicleType] = useState("");
  const [newOption, setNewOption] = useState({ level: "", option: "" });

  const fetchServiceConfig = async () => {
    const res = await axios.get(SERVICE_CONFIG_API);
    const config = res.data;
    setVehicleTypes(config.vehicleTypes || []);
    setServiceTypesList(config.serviceTypes || []);
    setNewService((prev) => ({
      ...prev,
      serviceLevelOptions: config.serviceLevelOptions || [],
    }));
  };

  useEffect(() => {
    if (activeTab === "service-config") {
      fetchServiceConfig();
    }
  }, [activeTab]);

  // Add vehicle type
  const handleAddVehicleType = async () => {
    if (customVehicleType) {
      await axios.post(`${SERVICE_CONFIG_API}/vehicle-type`, {
        type: customVehicleType,
      });
      fetchServiceConfig();
      setCustomVehicleType("");
    }
  };

  // Delete vehicle type
  const handleDeleteVehicleType = async (type) => {
    await axios.delete(`${SERVICE_CONFIG_API}/vehicle-type/${type}`);
    fetchServiceConfig();
  };

  // Add service type
  const handleAddServiceType = async () => {
    if (customServiceType) {
      await axios.post(`${SERVICE_CONFIG_API}/service-type`, {
        type: customServiceType,
      });
      fetchServiceConfig();
      setCustomServiceType("");
    }
  };

  // Delete service type
  const handleDeleteServiceType = async (type) => {
    await axios.delete(`${SERVICE_CONFIG_API}/service-type/${type}`);
    fetchServiceConfig();
  };

  // Add service level option
  const handleAddServiceLevelOption = async () => {
    if (newOption.option) {
      await axios.post(`${SERVICE_CONFIG_API}/service-level-option`, {
        option: newOption.option,
      });
      fetchServiceConfig();
      setNewOption({ option: "" });
    }
  };

  // Delete service level option
  const handleDeleteServiceLevelOption = async (option) => {
    await axios.delete(`${SERVICE_CONFIG_API}/service-level-option/${option}`);
    fetchServiceConfig();
  };

  // Service Configuration UI
  const renderServiceConfig = () => (
    <div className="space-y-8">
      {/* 1. Vehicle Type Section */}
      <div className="bg-white border rounded-lg p-6">
        <h4 className="font-semibold text-gray-800 mb-3">
          1. Add Vehicle Type
        </h4>
        <div className="flex items-center space-x-2 mb-3">
          <input
            type="text"
            value={customVehicleType}
            onChange={(e) => setCustomVehicleType(e.target.value)}
            placeholder="Enter vehicle type"
            className="flex-1 rounded-lg border border-gray-300 py-2 px-3"
          />
          <button
            type="button"
            onClick={handleAddVehicleType}
            className="px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Add
          </button>
        </div>
        {/* Show all vehicle types as tags with remove button */}
        <div className="flex flex-wrap gap-2">
          {vehicleTypes.map((type, idx) => (
            <span
              key={type}
              className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium"
            >
              {type}
              <button
                type="button"
                onClick={() => handleDeleteVehicleType(type)}
                className="ml-2 text-blue-600 hover:text-blue-900"
              >
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
        {serviceErrors.vehicleTypes && (
          <span className="text-red-500 text-xs">
            {serviceErrors.vehicleTypes}
          </span>
        )}
      </div>

      {/* 2. Service Type Section */}
      <div className="bg-white border rounded-lg p-6">
        <h4 className="font-semibold text-gray-800 mb-3">
          2. Add Service Type
        </h4>
        <div className="flex items-center space-x-2 mb-3">
          <input
            type="text"
            value={customServiceType}
            onChange={(e) => setCustomServiceType(e.target.value)}
            placeholder="Enter service type"
            className="flex-1 rounded-lg border border-gray-300 py-2 px-3"
          />
          <button
            type="button"
            onClick={handleAddServiceType}
            className="px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Add
          </button>
        </div>
        {/* Show all service types as tags with remove button */}
        <div className="flex flex-wrap gap-2">
          {serviceTypesList.map((type, idx) => (
            <span
              key={type}
              className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium"
            >
              {type}
              <button
                type="button"
                onClick={() => handleDeleteServiceType(type)}
                className="ml-2 text-blue-600 hover:text-blue-900"
              >
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
        {serviceErrors.category && (
          <span className="text-red-500 text-xs">{serviceErrors.category}</span>
        )}
      </div>

      {/* 3. Service Level Section */}
      <div className="bg-white border rounded-lg p-6">
        <h4 className="font-semibold text-gray-800 mb-3">
          3. Add Service Level
        </h4>
        <div className="flex flex-wrap gap-2">
          {["normal", "hard", "heavy"].map((level) => (
            <span
              key={level}
              className={`inline-flex items-center px-3 py-1 rounded-full bg-${
                level === "normal"
                  ? "green"
                  : level === "hard"
                  ? "yellow"
                  : "red"
              }-100 text-${
                level === "normal"
                  ? "green"
                  : level === "hard"
                  ? "yellow"
                  : "red"
              }-800 text-sm font-medium`}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </span>
          ))}
        </div>
      </div>

      {/* 4. Service Level Options Section */}
      <div className="bg-white border rounded-lg p-6">
        <h4 className="font-semibold text-gray-800 mb-3">
          4. Service Level Options
        </h4>
        <div className="flex items-center space-x-2 mb-3">
          <input
            type="text"
            value={newOption.option}
            onChange={(e) => setNewOption({ option: e.target.value })}
            placeholder="Enter service level option"
            className="flex-1 rounded-lg border border-gray-300 py-2 px-3"
          />
          <button
            type="button"
            onClick={handleAddServiceLevelOption}
            className="px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Add
          </button>
        </div>
        {/* Show all service level options as tags with remove button */}
        <div className="flex flex-wrap gap-2">
          {(newService.serviceLevelOptions || []).map((option, idx) => (
            <span
              key={idx}
              className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium"
            >
              {option}
              <button
                type="button"
                onClick={() => handleDeleteServiceLevelOption(option)}
                className="ml-2 text-blue-600 hover:text-blue-900"
              >
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* 5. Pricing Configuration Section */}
      <div className="bg-white border rounded-lg p-6">
        <h4 className="font-semibold text-gray-800 mb-3">
          5. Pricing Configuration
        </h4>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-2 px-4 border">Service Level</th>
                <th className="py-2 px-4 border">Base Price (LKR)</th>
                <th className="py-2 px-4 border">% Increase</th>
                <th className="py-2 px-4 border">Final Price</th>
              </tr>
            </thead>
            <tbody>
              {/* Normal */}
              <tr>
                <td className="py-2 px-4 border font-medium">Normal</td>
                <td className="py-2 px-4 border">
                  <input
                    type="number"
                    min="0"
                    value={newService.serviceLevels.normal.basePrice}
                    onChange={(e) =>
                      setNewService((prev) => ({
                        ...prev,
                        serviceLevels: {
                          ...prev.serviceLevels,
                          normal: {
                            ...prev.serviceLevels.normal,
                            basePrice: e.target.value,
                          },
                        },
                      }))
                    }
                    className="w-24 border rounded px-2 py-1"
                    placeholder="0"
                  />
                </td>
                <td className="py-2 px-4 border text-center">0%</td>
                <td className="py-2 px-4 border font-semibold">
                  {newService.serviceLevels.normal.basePrice
                    ? Number(
                        newService.serviceLevels.normal.basePrice
                      ).toLocaleString()
                    : "0"}
                </td>
              </tr>
              {/* Hard */}
              <tr>
                <td className="py-2 px-4 border font-medium">Hard</td>
                <td className="py-2 px-4 border">
                  {newService.serviceLevels.normal.basePrice
                    ? Number(
                        newService.serviceLevels.normal.basePrice
                      ).toLocaleString()
                    : "0"}
                </td>
                <td className="py-2 px-4 border">
                  <input
                    type="number"
                    min="0"
                    value={newService.serviceLevels.hard.percentageIncrease}
                    onChange={(e) =>
                      setNewService((prev) => ({
                        ...prev,
                        serviceLevels: {
                          ...prev.serviceLevels,
                          hard: {
                            ...prev.serviceLevels.hard,
                            percentageIncrease: e.target.value,
                          },
                        },
                      }))
                    }
                    className="w-16 border rounded px-2 py-1"
                    placeholder="20"
                  />
                  %
                </td>
                <td className="py-2 px-4 border font-semibold">
                  {newService.serviceLevels.normal.basePrice
                    ? (
                        Number(newService.serviceLevels.normal.basePrice) *
                        (1 +
                          Number(
                            newService.serviceLevels.hard.percentageIncrease ||
                              0
                          ) /
                            100)
                      ).toLocaleString(undefined, { maximumFractionDigits: 2 })
                    : "0"}
                </td>
              </tr>
              {/* Heavy */}
              <tr>
                <td className="py-2 px-4 border font-medium">Heavy</td>
                <td className="py-2 px-4 border">
                  {newService.serviceLevels.normal.basePrice
                    ? Number(
                        newService.serviceLevels.normal.basePrice
                      ).toLocaleString()
                    : "0"}
                </td>
                <td className="py-2 px-4 border">
                  <input
                    type="number"
                    min="0"
                    value={newService.serviceLevels.heavy.percentageIncrease}
                    onChange={(e) =>
                      setNewService((prev) => ({
                        ...prev,
                        serviceLevels: {
                          ...prev.serviceLevels,
                          heavy: {
                            ...prev.serviceLevels.heavy,
                            percentageIncrease: e.target.value,
                          },
                        },
                      }))
                    }
                    className="w-16 border rounded px-2 py-1"
                    placeholder="40"
                  />
                  %
                </td>
                <td className="py-2 px-4 border font-semibold">
                  {newService.serviceLevels.normal.basePrice
                    ? (
                        Number(newService.serviceLevels.normal.basePrice) *
                        (1 +
                          Number(
                            newService.serviceLevels.heavy.percentageIncrease ||
                              0
                          ) /
                            100)
                      ).toLocaleString(undefined, { maximumFractionDigits: 2 })
                    : "0"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            onClick={() => {
              // Save pricing config to backend (implement as needed)
              axios
                .post(`${SERVICE_CONFIG_API}/pricing`, {
                  basePrice: newService.serviceLevels.normal.basePrice,
                  hardIncrease:
                    newService.serviceLevels.hard.percentageIncrease,
                  heavyIncrease:
                    newService.serviceLevels.heavy.percentageIncrease,
                })
                .then(() => toast.success("Pricing configuration saved!"))
                .catch(() => toast.error("Failed to save pricing config"));
            }}
          >
            Save Pricing
          </button>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "user-management":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">
                User Management
              </h3>
              <button
                onClick={() => setIsAddUserModalOpen(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
              >
                <Plus size={16} className="mr-2" />
                Create User
              </button>
            </div>
            {isAddUserModalOpen && (
              <div className="fixed -inset-y-full inset-x-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white rounded-[5%] shadow-xl p-6 w-full max-w-lg max-h-[90vh]"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800">
                      Add New User
                    </h2>
                    <button
                      onClick={() => setIsAddUserModalOpen(false)}
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
                    onSubmit={handleAddUser}
                    className="space-y-6 pl-2 pr-2 overflow-y-auto max-h-[70vh]"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Username
                      </label>
                      <input
                        type="text"
                        name="username"
                        value={newUser.username}
                        onChange={handleUserInputChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                      {userErrors.username && (
                        <span className="text-red-500 text-xs">
                          {userErrors.username}
                        </span>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={newUser.email}
                        onChange={handleUserInputChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                      {userErrors.email && (
                        <span className="text-red-500 text-xs">
                          {userErrors.email}
                        </span>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Role
                      </label>
                      <select
                        name="role"
                        value={newUser.role}
                        onChange={handleUserInputChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="admin">Admin</option>
                        <option value="manager">Manager</option>
                        <option value="technician">Technician</option>
                        <option value="front-desk">Front Desk</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Status
                      </label>
                      <select
                        name="status"
                        value={newUser.status}
                        onChange={handleUserInputChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={newUser.password}
                        onChange={handleUserInputChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                      {userErrors.password && (
                        <span className="text-red-500 text-xs">
                          {userErrors.password}
                        </span>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={newUser.confirmPassword}
                        onChange={handleUserInputChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                      {userErrors.confirmPassword && (
                        <span className="text-red-500 text-xs">
                          {userErrors.confirmPassword}
                        </span>
                      )}
                    </div>
                    <div className="pt-4 flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => setIsAddUserModalOpen(false)}
                        className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                      >
                        Create User
                      </button>
                    </div>
                  </form>
                </motion.div>
              </div>
            )}
            <div className="bg-white overflow-hidden border border-gray-200 rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Login
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <User size={20} className="text-blue-700" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {user.username}
                            </div>
                            <div className="text-sm text-gray-500">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800 capitalize">
                          {user.role.replace("-", " ")}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleToggleUserStatus(user.id)}
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            user.status === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {user.status}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.lastLogin}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                            onClick={() => {
                              setEditUser(user);
                              setEditUserErrors({});
                              setIsEditUserModalOpen(true);
                            }}
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* // Place this Edit User Modal after your Add User Modal: */}
            {isEditUserModalOpen && editUser && (
              <div className="fixed -inset-y-full inset-x-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white rounded-[5%] shadow-xl p-6 w-full max-w-lg max-h-[90vh]"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800">
                      Edit User
                    </h2>
                    <button
                      onClick={() => setIsEditUserModalOpen(false)}
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
                    onSubmit={handleEditUser}
                    className="space-y-6 pl-2 pr-2 overflow-y-auto max-h-[70vh]"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Username
                      </label>
                      <input
                        type="text"
                        name="username"
                        value={editUser.username}
                        onChange={handleEditUserInputChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                      {editUserErrors.username && (
                        <span className="text-red-500 text-xs">
                          {editUserErrors.username}
                        </span>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={editUser.email}
                        onChange={handleEditUserInputChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                      {editUserErrors.email && (
                        <span className="text-red-500 text-xs">
                          {editUserErrors.email}
                        </span>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Role
                      </label>
                      <select
                        name="role"
                        value={editUser.role}
                        onChange={handleEditUserInputChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="admin">Admin</option>
                        <option value="manager">Manager</option>
                        <option value="technician">Technician</option>
                        <option value="front-desk">Front Desk</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Status
                      </label>
                      <select
                        name="status"
                        value={editUser.status}
                        onChange={handleEditUserInputChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                    <div className="pt-4 flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => setIsEditUserModalOpen(false)}
                        className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </motion.div>
              </div>
            )}

            {/* Role Permissions Matrix */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-md font-semibold text-gray-800 mb-4">
                Role Permissions Matrix
              </h4>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-4">Feature</th>
                      <th className="text-center py-2 px-4">Admin</th>
                      <th className="text-center py-2 px-4">Manager</th>
                      <th className="text-center py-2 px-4">Technician</th>
                      <th className="text-center py-2 px-4">Front Desk</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {[
                      {
                        feature: "Dashboard",
                        admin: true,
                        manager: true,
                        technician: true,
                        frontDesk: true,
                      },
                      {
                        feature: "Customers",
                        admin: true,
                        manager: true,
                        technician: false,
                        frontDesk: true,
                      },
                      {
                        feature: "Vehicles",
                        admin: true,
                        manager: true,
                        technician: true,
                        frontDesk: true,
                      },
                      {
                        feature: "Appointments",
                        admin: true,
                        manager: true,
                        technician: false,
                        frontDesk: true,
                      },
                      {
                        feature: "Job Cards",
                        admin: true,
                        manager: true,
                        technician: true,
                        frontDesk: false,
                      },
                      {
                        feature: "Inventory",
                        admin: true,
                        manager: true,
                        technician: true,
                        frontDesk: false,
                      },
                      {
                        feature: "Billing",
                        admin: true,
                        manager: true,
                        technician: false,
                        frontDesk: true,
                      },
                      {
                        feature: "Reports",
                        admin: true,
                        manager: true,
                        technician: false,
                        frontDesk: false,
                      },
                      {
                        feature: "Settings",
                        admin: true,
                        manager: false,
                        technician: false,
                        frontDesk: false,
                      },
                    ].map((perm, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-2 px-4 font-medium">
                          {perm.feature}
                        </td>
                        <td className="text-center py-2 px-4">
                          {perm.admin ? (
                            <CheckCircle
                              size={16}
                              className="text-green-600 mx-auto"
                            />
                          ) : (
                            <XCircle
                              size={16}
                              className="text-red-600 mx-auto"
                            />
                          )}
                        </td>
                        <td className="text-center py-2 px-4">
                          {perm.manager ? (
                            <CheckCircle
                              size={16}
                              className="text-green-600 mx-auto"
                            />
                          ) : (
                            <XCircle
                              size={16}
                              className="text-red-600 mx-auto"
                            />
                          )}
                        </td>
                        <td className="text-center py-2 px-4">
                          {perm.technician ? (
                            <CheckCircle
                              size={16}
                              className="text-green-600 mx-auto"
                            />
                          ) : (
                            <XCircle
                              size={16}
                              className="text-red-600 mx-auto"
                            />
                          )}
                        </td>
                        <td className="text-center py-2 px-4">
                          {perm.frontDesk ? (
                            <CheckCircle
                              size={16}
                              className="text-green-600 mx-auto"
                            />
                          ) : (
                            <XCircle
                              size={16}
                              className="text-red-600 mx-auto"
                            />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case "service-config":
        return renderServiceConfig();

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl font-bold text-gray-800">
          Admin & System Settings
        </h1>
        <p className="text-gray-600">
          Comprehensive configuration and management of the entire system.
        </p>
      </motion.div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-4 whitespace-nowrap border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? "border-blue-600 text-blue-700 bg-blue-50"
                    : "border-transparent text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderTabContent()}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
