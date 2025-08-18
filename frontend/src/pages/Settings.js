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
  // const [newService, setNewService] = useState({
  //   name: "",
  //   category: "",
  //   basePrice: "",
  //   duration: "",
  //   isActive: true,
  // });
  const [serviceErrors, setServiceErrors] = useState({});
  const [isEditServiceModalOpen, setIsEditServiceModalOpen] = useState(false);
  const [editService, setEditService] = useState(null);
  const [editServiceErrors, setEditServiceErrors] = useState({});

  // Service Configuration State
  const handleServiceInputChange = (e) => {
    const { name, value } = e.target;
    setNewService((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const validateService = () => {
  //   let err = {};
  //   if (!newService.name) err.name = "Service name is required";
  //   if (!newService.category) err.category = "Category is required";
  //   if (!newService.basePrice) err.basePrice = "Base price is required";
  //   if (!newService.duration) err.duration = "Duration is required";
  //   setServiceErrors(err);
  //   return Object.keys(err).length === 0;
  // };

  // const handleAddService = async (e) => {
  //   e.preventDefault();
  //   if (!validateService()) return;
  //   try {
  //     const res = await axios.post(`${API_URL}/service-types`, {
  //       name: newService.name,
  //       category: newService.category,
  //       basePrice: parseFloat(newService.basePrice),
  //       duration: parseInt(newService.duration),
  //       isActive: newService.isActive,
  //     });
  //     setServiceTypes((prev) => [...prev, res.data.serviceType]);
  //     setIsAddServiceModalOpen(false);
  //     setNewService({
  //       name: "",
  //       category: "",
  //       basePrice: "",
  //       duration: "",
  //       isActive: true,
  //     });
  //     setServiceErrors({});
  //     toast.success("New service created successfully!");
  //   } catch (err) {
  //     toast.error(err.response?.data?.message || "Failed to add service");
  //   }
  // };

  //  Edit Service Functionality
  const handleEditServiceInputChange = (e) => {
    const { name, value } = e.target;
    setEditService((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateEditService = () => {
    let err = {};
    if (!editService.name) err.name = "Service name is required";
    if (!editService.category) err.category = "Category is required";
    if (!editService.basePrice) err.basePrice = "Base price is required";
    if (!editService.duration) err.duration = "Duration is required";
    setEditServiceErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleEditService = async (e) => {
    e.preventDefault();
    if (!validateEditService()) return;
    try {
      const res = await axios.put(
        `${API_URL}/service-types/${editService._id}`,
        {
          name: editService.name,
          category: editService.category,
          basePrice: parseFloat(editService.basePrice),
          duration: parseInt(editService.duration),
          isActive: editService.isActive,
        }
      );
      setServiceTypes((prev) =>
        prev.map((service) =>
          service._id === editService._id ? res.data.serviceType : service
        )
      );
      setIsEditServiceModalOpen(false);
      setEditService(null);
      setEditServiceErrors({});
      toast.success("Service updated successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update service");
    }
  };

  // Service Types State
  const [serviceTypes, setServiceTypes] = useState([]);

  // Fetch all service types
  const fetchServiceTypes = async () => {
    try {
      const res = await axios.get(`${API_URL}/service-types`);
      setServiceTypes(res.data.serviceTypes);
    } catch (err) {
      toast.error("Failed to fetch service types");
    }
  };

  // Add new service type
  const handleAddServiceType = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/service-types`, {
        name: newService.name,
      });
      setServiceTypes((prev) => [...prev, res.data.serviceType]);
      setIsAddServiceModalOpen(false);
      setNewService({ name: "" });
      toast.success("Service type added!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add service type");
    }
  };

  // Edit service type
  const handleEditServiceType = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${API_URL}/service-types/${editService._id}`,
        { name: editService.name }
      );
      setServiceTypes((prev) =>
        prev.map((s) => (s._id === editService._id ? res.data.serviceType : s))
      );
      setIsEditServiceModalOpen(false);
      setEditService(null);
      toast.success("Service type updated!");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to update service type"
      );
    }
  };

  // Delete service type
  const handleDeleteServiceType = async (id) => {
    if (window.confirm("Are you sure you want to delete this service type?")) {
      try {
        await axios.delete(`${API_URL}/service-types/${id}`);
        setServiceTypes((prev) => prev.filter((s) => s._id !== id));
        toast.success("Service type deleted!");
      } catch (err) {
        toast.error(
          err.response?.data?.message || "Failed to delete service type"
        );
      }
    }
  };

  const [servicePackages, setServicePackages] = useState([
    {
      id: 1,
      name: "Basic Maintenance",
      description: "Oil change + tire rotation",
      price: 75.0,
      discount: 5.0,
      isActive: true,
    },
    {
      id: 2,
      name: "Full Service",
      description: "Complete vehicle checkup",
      price: 200.0,
      discount: 25.0,
      isActive: true,
    },
  ]);

  // Notification Settings State
  const [notificationSettings, setNotificationSettings] = useState({
    emailEnabled: true,
    smsEnabled: true,
    appointmentReminders: true,
    serviceCompletion: true,
    inventoryAlerts: true,
    paymentReminders: true,
    emailTemplate: {
      appointmentConfirmation:
        "Dear {customerName}, your appointment for {serviceName} is confirmed for {date} at {time}.",
      serviceCompletion:
        "Dear {customerName}, your {vehicleName} service is complete. Total: ${amount}",
      paymentReminder:
        "Dear {customerName}, payment of ${amount} is due for invoice #{invoiceNumber}.",
    },
    smsTemplate: {
      appointmentReminder:
        "Reminder: Your appointment is tomorrow at {time} for {serviceName}.",
      serviceReady: "Your {vehicleName} is ready for pickup. Total: ${amount}",
    },
  });

  // Audit Logs State
  const [auditLogs, setAuditLogs] = useState([
    {
      id: 1,
      timestamp: "2024-06-15 10:30:15",
      user: "admin",
      action: "User Created",
      details: "Created new technician account: tech2",
      severity: "info",
    },
    {
      id: 2,
      timestamp: "2024-06-15 09:45:22",
      user: "manager1",
      action: "Service Updated",
      details: "Updated Oil Change price from $40 to $45",
      severity: "warning",
    },
    {
      id: 3,
      timestamp: "2024-06-15 08:15:33",
      user: "admin",
      action: "System Backup",
      details: "Database backup completed successfully",
      severity: "success",
    },
    {
      id: 4,
      timestamp: "2024-06-14 16:20:44",
      user: "tech1",
      action: "Login Failed",
      details: "Failed login attempt from IP: 192.168.1.100",
      severity: "error",
    },
    {
      id: 5,
      timestamp: "2024-06-14 14:30:55",
      user: "frontdesk",
      action: "Data Export",
      details: "Exported customer data (CSV format)",
      severity: "info",
    },
  ]);

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
    // { id: "notifications", label: "Notifications", icon: <Bell size={18} /> },
    // {
    //   id: "backup-restore",
    //   label: "Backup & Restore",
    //   icon: <Database size={18} />,
    // },
    // { id: "audit-logs", label: "Audit Logs", icon: <History size={18} /> },
    // {
    //   id: "system-config",
    //   label: "System Config",
    //   icon: <SettingsIcon size={18} />,
    // },
  ];

  // Fetch all users from backend
  useEffect(() => {
    if (activeTab === "user-management") {
      fetchUsers();
    }
  }, [activeTab]);

  // Fetch service types when service config tab is active
  useEffect(() => {
    if (activeTab === "service-config") {
      fetchServiceTypes();
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

  const handleCreateService = () => {
    const newService = {
      id: serviceTypes.length + 1,
      name: "New Service",
      category: "General",
      basePrice: 50.0,
      duration: 60,
      isActive: true,
    };
    setServiceTypes((prev) => [...prev, newService]);
    toast.success("New service created successfully!");
  };

  const handleDeleteService = async (serviceId) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      try {
        await axios.delete(`${API_URL}/service-types/${serviceId}`);
        setServiceTypes((prev) =>
          prev.filter((service) => service._id !== serviceId)
        );
        toast.success("Service deleted successfully!");
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to delete service");
      }
    }
  };

  const handleToggleService = (serviceId) => {
    setServiceTypes((prev) =>
      prev.map((service) =>
        service.id === serviceId
          ? { ...service, isActive: !service.isActive }
          : service
      )
    );
    toast.success("Service status updated!");
  };

  const handleCreatePackage = () => {
    const newPackage = {
      id: servicePackages.length + 1,
      name: "New Package",
      description: "Package description",
      price: 100.0,
      discount: 10.0,
      isActive: true,
    };
    setServicePackages((prev) => [...prev, newPackage]);
    toast.success("New package created successfully!");
  };

  const handleDeletePackage = (packageId) => {
    if (window.confirm("Are you sure you want to delete this package?")) {
      setServicePackages((prev) => prev.filter((pkg) => pkg.id !== packageId));
      toast.success("Package deleted successfully!");
    }
  };

  const handleSaveNotifications = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Notification settings saved successfully!");
    }, 1000);
  };

  const handleCreateBackup = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const backupFile = new Blob(["Database backup data"], {
        type: "application/sql",
      });
      const url = URL.createObjectURL(backupFile);
      const a = document.createElement("a");
      a.href = url;
      a.download = `backup-${new Date().toISOString().split("T")[0]}.sql`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success("Database backup created and downloaded!");
    }, 2000);
  };

  const handleRestoreBackup = () => {
    if (
      window.confirm(
        "Are you sure you want to restore from backup? This will overwrite current data."
      )
    ) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        toast.success("Database restored successfully!");
      }, 3000);
    }
  };

  const handleExportLogs = () => {
    const csvContent = [
      ["Timestamp", "User", "Action", "Details", "Severity"],
      ...auditLogs.map((log) => [
        log.timestamp,
        log.user,
        log.action,
        log.details,
        log.severity,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `audit-logs-${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Audit logs exported successfully!");
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "success":
        return "bg-green-100 text-green-800";
      case "warning":
        return "bg-yellow-100 text-yellow-800";
      case "error":
        return "bg-red-100 text-red-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case "success":
        return <CheckCircle size={16} />;
      case "warning":
        return <AlertTriangle size={16} />;
      case "error":
        return <XCircle size={16} />;
      default:
        return <FileText size={16} />;
    }
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

  // Predefined service options for each level
  const predefinedOptions = {
    normal: [
      "Basic Engine Check",
      "Oil Level Check",
      "Visual Inspection",
      "Basic Cleaning",
    ],
    hard: [
      "Replace Engine Oil",
      "Clean Air Filter",
      "Change Spark Plugs",
      "Battery Water Top-Up",
      "Brake Fluid Check",
    ],
    heavy: [
      "Complete Engine Overhaul",
      "Transmission Service",
      "Full Brake System Check",
      "Suspension Service",
      "Electrical System Diagnosis",
    ],
  };

  // Fetch vehicle types
  const fetchVehicleTypes = async () => {
    try {
      const res = await axios.get(`${API_URL}/service-types/vehicle-types`);
      setVehicleTypes(res.data.vehicleTypes);
    } catch (err) {
      console.error("Failed to fetch vehicle types:", err);
    }
  };

  // Calculate final prices
  const calculateFinalPrice = (basePrice, percentage) => {
    return basePrice * (1 + percentage / 100);
  };

  // Handle vehicle type selection
  const handleVehicleTypeChange = (vehicleType) => {
    setNewService((prev) => {
      const updatedTypes = prev.vehicleTypes.includes(vehicleType)
        ? prev.vehicleTypes.filter((type) => type !== vehicleType)
        : [...prev.vehicleTypes, vehicleType];

      return { ...prev, vehicleTypes: updatedTypes };
    });
  };

  // Handle service level toggle
  const handleServiceLevelToggle = (level) => {
    setNewService((prev) => ({
      ...prev,
      serviceLevels: {
        ...prev.serviceLevels,
        [level]: {
          ...prev.serviceLevels[level],
          isActive: !prev.serviceLevels[level].isActive,
        },
      },
    }));
  };

  // Handle percentage change
  const handlePercentageChange = (level, percentage) => {
    setNewService((prev) => ({
      ...prev,
      serviceLevels: {
        ...prev.serviceLevels,
        [level]: {
          ...prev.serviceLevels[level],
          percentageIncrease: parseInt(percentage) || 0,
        },
      },
    }));
  };

  // Add custom vehicle type
  const handleAddCustomVehicleType = () => {
    if (customVehicleType && !vehicleTypes.includes(customVehicleType)) {
      setVehicleTypes((prev) => [...prev, customVehicleType]);
      handleVehicleTypeChange(customVehicleType);
      setCustomVehicleType("");
    }
  };

  // Add option to service level
  const handleAddOption = (level) => {
    if (newOption.option && newOption.level === level) {
      setNewService((prev) => ({
        ...prev,
        serviceLevels: {
          ...prev.serviceLevels,
          [level]: {
            ...prev.serviceLevels[level],
            options: [...prev.serviceLevels[level].options, newOption.option],
          },
        },
      }));
      setNewOption({ level: "", option: "" });
    }
  };

  // Remove option from service level
  const handleRemoveOption = (level, optionIndex) => {
    setNewService((prev) => ({
      ...prev,
      serviceLevels: {
        ...prev.serviceLevels,
        [level]: {
          ...prev.serviceLevels[level],
          options: prev.serviceLevels[level].options.filter(
            (_, index) => index !== optionIndex
          ),
        },
      },
    }));
  };

  // Add predefined options
  const handleAddPredefinedOptions = (level) => {
    setNewService((prev) => ({
      ...prev,
      serviceLevels: {
        ...prev.serviceLevels,
        [level]: {
          ...prev.serviceLevels[level],
          options: [
            ...new Set([
              ...prev.serviceLevels[level].options,
              ...predefinedOptions[level],
            ]),
          ],
        },
      },
    }));
  };

  // Enhanced validation
  const validateService = () => {
    let err = {};
    if (!newService.name) err.name = "Service name is required";
    if (!newService.category) err.category = "Category is required";
    if (newService.vehicleTypes.length === 0)
      err.vehicleTypes = "Select at least one vehicle type";
    if (!newService.serviceLevels.normal.basePrice)
      err.basePrice = "Base price is required";

    setServiceErrors(err);
    return Object.keys(err).length === 0;
  };

  // Enhanced add service
  const handleAddService = async (e) => {
    e.preventDefault();
    if (!validateService()) return;

    try {
      const res = await axios.post(`${API_URL}/service-types`, newService);
      setServiceTypes((prev) => [...prev, res.data.serviceType]);
      setIsAddServiceModalOpen(false);

      // Reset form
      setNewService({
        name: "",
        category: "",
        vehicleTypes: [],
        serviceLevels: {
          normal: { isActive: true, basePrice: "", options: [] },
          hard: { isActive: false, percentageIncrease: 20, options: [] },
          heavy: { isActive: false, percentageIncrease: 40, options: [] },
        },
        isActive: true,
      });

      setServiceErrors({});
      toast.success("Service type created successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add service");
    }
  };

  // Load vehicle types when component mounts
  useEffect(() => {
    fetchVehicleTypes();
  }, []);

  // Service Configuration UI
  const renderServiceConfig = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">
          Service Configuration
        </h3>
        <button
          onClick={() => setIsAddServiceModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
        >
          <Plus size={16} className="mr-2" />
          Add New Service
        </button>
      </div>

      {/* Service Types List */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vehicle Types
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service Levels
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Base Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {serviceTypes.map((service) => (
                <tr key={service._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {service.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {service.category}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {service.vehicleTypes?.map((type, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {service.serviceLevels?.normal?.isActive && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Normal
                        </span>
                      )}
                      {service.serviceLevels?.hard?.isActive && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          Hard
                        </span>
                      )}
                      {service.serviceLevels?.heavy?.isActive && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Heavy
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    LKR {service.serviceLevels?.normal?.basePrice || 0}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setEditService(service);
                          setIsEditServiceModalOpen(true);
                        }}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteService(service._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Service Modal */}
      {isAddServiceModalOpen && (
        <div className="fixed -inset-y-full inset-x-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-800">
                  Add New Service
                </h3>
                <button
                  onClick={() => setIsAddServiceModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleAddService} className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Service Name *
                    </label>
                    <input
                      type="text"
                      value={newService.name}
                      onChange={(e) =>
                        setNewService((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter service name"
                    />
                    {serviceErrors.name && (
                      <span className="text-red-500 text-xs">
                        {serviceErrors.name}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category *
                    </label>
                    <select
                      value={newService.category}
                      onChange={(e) =>
                        setNewService((prev) => ({
                          ...prev,
                          category: e.target.value,
                        }))
                      }
                      className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select category</option>
                      <option value="Engine Service">Engine Service</option>
                      <option value="Oil Change">Oil Change</option>
                      <option value="Cleaning">Cleaning</option>
                      <option value="Brake Service">Brake Service</option>
                      <option value="Battery Service">Battery Service</option>
                      <option value="Other">Other</option>
                    </select>
                    {serviceErrors.category && (
                      <span className="text-red-500 text-xs">
                        {serviceErrors.category}
                      </span>
                    )}
                  </div>
                </div>

                {/* Vehicle Types Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Vehicle Types *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
                    {vehicleTypes.map((type) => (
                      <label key={type} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={newService.vehicleTypes.includes(type)}
                          onChange={() => handleVehicleTypeChange(type)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{type}</span>
                      </label>
                    ))}
                  </div>

                  {/* Custom Vehicle Type */}
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={customVehicleType}
                      onChange={(e) => setCustomVehicleType(e.target.value)}
                      placeholder="Add custom vehicle type"
                      className="flex-1 rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={handleAddCustomVehicleType}
                      className="px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                    >
                      Add
                    </button>
                  </div>

                  {serviceErrors.vehicleTypes && (
                    <span className="text-red-500 text-xs">
                      {serviceErrors.vehicleTypes}
                    </span>
                  )}
                </div>

                {/* Service Levels Configuration */}
                <div>
                  <h4 className="text-md font-medium text-gray-800 mb-3">
                    Service Levels & Pricing
                  </h4>

                  {/* Normal Level */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={newService.serviceLevels.normal.isActive}
                          onChange={() => handleServiceLevelToggle("normal")}
                          className="rounded border-gray-300 text-green-600 focus:ring-green-500 mr-2"
                        />
                        <span className="font-medium text-green-800">
                          Normal Level
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleAddPredefinedOptions("normal")}
                        className="text-xs px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                      >
                        Add Default Options
                      </button>
                    </div>

                    {newService.serviceLevels.normal.isActive && (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Base Price (LKR) *
                            </label>
                            <input
                              type="number"
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
                              className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                              placeholder="Enter base price"
                            />
                            {serviceErrors.basePrice && (
                              <span className="text-red-500 text-xs">
                                {serviceErrors.basePrice}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Options for Normal Level */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Service Options
                          </label>
                          <div className="flex items-center space-x-2 mb-2">
                            <input
                              type="text"
                              value={
                                newOption.level === "normal"
                                  ? newOption.option
                                  : ""
                              }
                              onChange={(e) =>
                                setNewOption({
                                  level: "normal",
                                  option: e.target.value,
                                })
                              }
                              placeholder="Add service option"
                              className="flex-1 rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                            <button
                              type="button"
                              onClick={() => handleAddOption("normal")}
                              className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                            >
                              Add
                            </button>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {newService.serviceLevels.normal.options.map(
                              (option, index) => (
                                <span
                                  key={index}
                                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
                                >
                                  {option}
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleRemoveOption("normal", index)
                                    }
                                    className="ml-1 text-green-600 hover:text-green-800"
                                  >
                                    <X size={12} />
                                  </button>
                                </span>
                              )
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Hard Level */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={newService.serviceLevels.hard.isActive}
                          onChange={() => handleServiceLevelToggle("hard")}
                          className="rounded border-gray-300 text-yellow-600 focus:ring-yellow-500 mr-2"
                        />
                        <span className="font-medium text-yellow-800">
                          Hard Level
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleAddPredefinedOptions("hard")}
                        className="text-xs px-2 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700"
                      >
                        Add Default Options
                      </button>
                    </div>

                    {newService.serviceLevels.hard.isActive && (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Percentage Increase (%)
                            </label>
                            <input
                              type="number"
                              value={
                                newService.serviceLevels.hard.percentageIncrease
                              }
                              onChange={(e) =>
                                handlePercentageChange("hard", e.target.value)
                              }
                              className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Base Price (LKR)
                            </label>
                            <input
                              type="number"
                              value={newService.serviceLevels.normal.basePrice}
                              readOnly
                              className="w-full rounded-lg border border-gray-300 py-2 px-3 bg-gray-50"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Final Price (Auto)
                            </label>
                            <input
                              type="number"
                              value={calculateFinalPrice(
                                parseFloat(
                                  newService.serviceLevels.normal.basePrice || 0
                                ),
                                newService.serviceLevels.hard.percentageIncrease
                              ).toFixed(2)}
                              readOnly
                              className="w-full rounded-lg border border-gray-300 py-2 px-3 bg-green-50 font-medium"
                            />
                          </div>
                        </div>

                        {/* Options for Hard Level */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Service Options
                          </label>
                          <div className="flex items-center space-x-2 mb-2">
                            <input
                              type="text"
                              value={
                                newOption.level === "hard"
                                  ? newOption.option
                                  : ""
                              }
                              onChange={(e) =>
                                setNewOption({
                                  level: "hard",
                                  option: e.target.value,
                                })
                              }
                              placeholder="Add service option"
                              className="flex-1 rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            />
                            <button
                              type="button"
                              onClick={() => handleAddOption("hard")}
                              className="px-3 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
                            >
                              Add
                            </button>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {newService.serviceLevels.hard.options.map(
                              (option, index) => (
                                <span
                                  key={index}
                                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"
                                >
                                  {option}
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleRemoveOption("hard", index)
                                    }
                                    className="ml-1 text-yellow-600 hover:text-yellow-800"
                                  >
                                    <X size={12} />
                                  </button>
                                </span>
                              )
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Heavy Level */}
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={newService.serviceLevels.heavy.isActive}
                          onChange={() => handleServiceLevelToggle("heavy")}
                          className="rounded border-gray-300 text-red-600 focus:ring-red-500 mr-2"
                        />
                        <span className="font-medium text-red-800">
                          Heavy Level
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleAddPredefinedOptions("heavy")}
                        className="text-xs px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Add Default Options
                      </button>
                    </div>

                    {newService.serviceLevels.heavy.isActive && (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Percentage Increase (%)
                            </label>
                            <input
                              type="number"
                              value={
                                newService.serviceLevels.heavy
                                  .percentageIncrease
                              }
                              onChange={(e) =>
                                handlePercentageChange("heavy", e.target.value)
                              }
                              className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Base Price (LKR)
                            </label>
                            <input
                              type="number"
                              value={newService.serviceLevels.normal.basePrice}
                              readOnly
                              className="w-full rounded-lg border border-gray-300 py-2 px-3 bg-gray-50"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Final Price (Auto)
                            </label>
                            <input
                              type="number"
                              value={calculateFinalPrice(
                                parseFloat(
                                  newService.serviceLevels.normal.basePrice || 0
                                ),
                                newService.serviceLevels.heavy
                                  .percentageIncrease
                              ).toFixed(2)}
                              readOnly
                              className="w-full rounded-lg border border-gray-300 py-2 px-3 bg-green-50 font-medium"
                            />
                          </div>
                        </div>

                        {/* Options for Heavy Level */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Service Options
                          </label>
                          <div className="flex items-center space-x-2 mb-2">
                            <input
                              type="text"
                              value={
                                newOption.level === "heavy"
                                  ? newOption.option
                                  : ""
                              }
                              onChange={(e) =>
                                setNewOption({
                                  level: "heavy",
                                  option: e.target.value,
                                })
                              }
                              placeholder="Add service option"
                              className="flex-1 rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                            <button
                              type="button"
                              onClick={() => handleAddOption("heavy")}
                              className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                            >
                              Add
                            </button>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {newService.serviceLevels.heavy.options.map(
                              (option, index) => (
                                <span
                                  key={index}
                                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800"
                                >
                                  {option}
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleRemoveOption("heavy", index)
                                    }
                                    className="ml-1 text-red-600 hover:text-red-800"
                                  >
                                    <X size={12} />
                                  </button>
                                </span>
                              )
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Pricing Summary Table */}
                  {newService.serviceLevels.normal.basePrice && (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <h5 className="font-medium text-gray-800 mb-3">
                        Pricing Summary
                      </h5>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                Service Level
                              </th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                Base Price (LKR)
                              </th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                % Increase
                              </th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                Final Price
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {newService.serviceLevels.normal.isActive && (
                              <tr>
                                <td className="px-4 py-2 text-sm font-medium text-green-900">
                                  Normal
                                </td>
                                <td className="px-4 py-2 text-sm text-gray-900">
                                  {newService.serviceLevels.normal.basePrice}
                                </td>
                                <td className="px-4 py-2 text-sm text-gray-900">
                                  0%
                                </td>
                                <td className="px-4 py-2 text-sm font-medium text-green-600">
                                  {newService.serviceLevels.normal.basePrice}
                                </td>
                              </tr>
                            )}
                            {newService.serviceLevels.hard.isActive && (
                              <tr>
                                <td className="px-4 py-2 text-sm font-medium text-yellow-900">
                                  Hard
                                </td>
                                <td className="px-4 py-2 text-sm text-gray-900">
                                  {newService.serviceLevels.normal.basePrice}
                                </td>
                                <td className="px-4 py-2 text-sm text-gray-900">
                                  +
                                  {
                                    newService.serviceLevels.hard
                                      .percentageIncrease
                                  }
                                  %
                                </td>
                                <td className="px-4 py-2 text-sm font-medium text-yellow-600">
                                  {calculateFinalPrice(
                                    parseFloat(
                                      newService.serviceLevels.normal
                                        .basePrice || 0
                                    ),
                                    newService.serviceLevels.hard
                                      .percentageIncrease
                                  ).toFixed(2)}
                                </td>
                              </tr>
                            )}
                            {newService.serviceLevels.heavy.isActive && (
                              <tr>
                                <td className="px-4 py-2 text-sm font-medium text-red-900">
                                  Heavy
                                </td>
                                <td className="px-4 py-2 text-sm text-gray-900">
                                  {newService.serviceLevels.normal.basePrice}
                                </td>
                                <td className="px-4 py-2 text-sm text-gray-900">
                                  +
                                  {
                                    newService.serviceLevels.heavy
                                      .percentageIncrease
                                  }
                                  %
                                </td>
                                <td className="px-4 py-2 text-sm font-medium text-red-600">
                                  {calculateFinalPrice(
                                    parseFloat(
                                      newService.serviceLevels.normal
                                        .basePrice || 0
                                    ),
                                    newService.serviceLevels.heavy
                                      .percentageIncrease
                                  ).toFixed(2)}
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>

                {/* Form Actions */}
                <div className="flex justify-end space-x-3 pt-4 border-t">
                  <button
                    type="button"
                    onClick={() => setIsAddServiceModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                  >
                    <Save size={16} className="mr-2" />
                    Save Service
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
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

      // case "notifications":
      //   return (
      //     <div className="space-y-6">
      //       <div className="flex justify-between items-center">
      //         <h3 className="text-lg font-semibold text-gray-800">
      //           Notification Settings
      //         </h3>
      //         <button
      //           onClick={handleSaveNotifications}
      //           disabled={loading}
      //           className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center disabled:opacity-50"
      //         >
      //           {loading ? (
      //             <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
      //           ) : (
      //             <Save size={16} className="mr-2" />
      //           )}
      //           Save Settings
      //         </button>
      //       </div>

      //       {/* Notification Channels */}
      //       <div className="bg-white border border-gray-200 rounded-lg p-6">
      //         <h4 className="text-md font-semibold text-gray-800 mb-4">
      //           Notification Channels
      //         </h4>
      //         <div className="space-y-4">
      //           <div className="flex items-center justify-between">
      //             <div className="flex items-center">
      //               <Mail size={20} className="text-gray-500 mr-3" />
      //               <div>
      //                 <p className="text-sm font-medium text-gray-900">
      //                   Email Notifications
      //                 </p>
      //                 <p className="text-xs text-gray-500">
      //                   Send notifications via email
      //                 </p>
      //               </div>
      //             </div>
      //             <label className="relative inline-flex items-center cursor-pointer">
      //               <input
      //                 type="checkbox"
      //                 checked={notificationSettings.emailEnabled}
      //                 onChange={(e) =>
      //                   setNotificationSettings((prev) => ({
      //                     ...prev,
      //                     emailEnabled: e.target.checked,
      //                   }))
      //                 }
      //                 className="sr-only peer"
      //               />
      //               <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
      //             </label>
      //           </div>

      //           <div className="flex items-center justify-between">
      //             <div className="flex items-center">
      //               <Smartphone size={20} className="text-gray-500 mr-3" />
      //               <div>
      //                 <p className="text-sm font-medium text-gray-900">
      //                   SMS Notifications
      //                 </p>
      //                 <p className="text-xs text-gray-500">
      //                   Send notifications via SMS
      //                 </p>
      //               </div>
      //             </div>
      //             <label className="relative inline-flex items-center cursor-pointer">
      //               <input
      //                 type="checkbox"
      //                 checked={notificationSettings.smsEnabled}
      //                 onChange={(e) =>
      //                   setNotificationSettings((prev) => ({
      //                     ...prev,
      //                     smsEnabled: e.target.checked,
      //                   }))
      //                 }
      //                 className="sr-only peer"
      //               />
      //               <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
      //             </label>
      //           </div>
      //         </div>
      //       </div>

      //       {/* Notification Types */}
      //       <div className="bg-white border border-gray-200 rounded-lg p-6">
      //         <h4 className="text-md font-semibold text-gray-800 mb-4">
      //           Notification Types
      //         </h4>
      //         <div className="space-y-4">
      //           {[
      //             {
      //               key: "appointmentReminders",
      //               label: "Appointment Reminders",
      //               desc: "Send reminders before scheduled appointments",
      //             },
      //             {
      //               key: "serviceCompletion",
      //               label: "Service Completion",
      //               desc: "Notify when a service job is completed",
      //             },
      //             {
      //               key: "inventoryAlerts",
      //               label: "Inventory Alerts",
      //               desc: "Notify when inventory items are low in stock",
      //             },
      //             {
      //               key: "paymentReminders",
      //               label: "Payment Reminders",
      //               desc: "Send payment due reminders",
      //             },
      //           ].map((item) => (
      //             <div
      //               key={item.key}
      //               className="flex items-center justify-between"
      //             >
      //               <div className="flex items-center">
      //                 <Bell size={20} className="text-gray-500 mr-3" />
      //                 <div>
      //                   <p className="text-sm font-medium text-gray-900">
      //                     {item.label}
      //                   </p>
      //                   <p className="text-xs text-gray-500">{item.desc}</p>
      //                 </div>
      //               </div>
      //               <label className="relative inline-flex items-center cursor-pointer">
      //                 <input
      //                   type="checkbox"
      //                   checked={notificationSettings[item.key]}
      //                   onChange={(e) =>
      //                     setNotificationSettings((prev) => ({
      //                       ...prev,
      //                       [item.key]: e.target.checked,
      //                     }))
      //                   }
      //                   className="sr-only peer"
      //                 />
      //                 <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
      //               </label>
      //             </div>
      //           ))}
      //         </div>
      //       </div>

      //       {/* Email Templates */}
      //       <div className="bg-white border border-gray-200 rounded-lg p-6">
      //         <h4 className="text-md font-semibold text-gray-800 mb-4">
      //           Email Templates
      //         </h4>
      //         <div className="space-y-4">
      //           <div>
      //             <label className="block text-sm font-medium text-gray-700 mb-1">
      //               Appointment Confirmation
      //             </label>
      //             <textarea
      //               value={
      //                 notificationSettings.emailTemplate.appointmentConfirmation
      //               }
      //               onChange={(e) =>
      //                 setNotificationSettings((prev) => ({
      //                   ...prev,
      //                   emailTemplate: {
      //                     ...prev.emailTemplate,
      //                     appointmentConfirmation: e.target.value,
      //                   },
      //                 }))
      //               }
      //               className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      //               rows={3}
      //             />
      //           </div>
      //           <div>
      //             <label className="block text-sm font-medium text-gray-700 mb-1">
      //               Service Completion
      //             </label>
      //             <textarea
      //               value={notificationSettings.emailTemplate.serviceCompletion}
      //               onChange={(e) =>
      //                 setNotificationSettings((prev) => ({
      //                   ...prev,
      //                   emailTemplate: {
      //                     ...prev.emailTemplate,
      //                     serviceCompletion: e.target.value,
      //                   },
      //                 }))
      //               }
      //               className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      //               rows={3}
      //             />
      //           </div>
      //         </div>
      //       </div>
      //     </div>
      //   );

      // case "backup-restore":
      //   return (
      //     <div className="space-y-6">
      //       <h3 className="text-lg font-semibold text-gray-800">
      //         Backup & Restore
      //       </h3>

      //       {/* Database Backup */}
      //       <div className="bg-white border border-gray-200 rounded-lg p-6">
      //         <div className="flex items-center justify-between mb-4">
      //           <div>
      //             <h4 className="text-md font-semibold text-gray-800">
      //               Database Backup
      //             </h4>
      //             <p className="text-sm text-gray-600">
      //               Create a backup of your database to protect your data
      //             </p>
      //           </div>
      //           <Database size={32} className="text-blue-600" />
      //         </div>

      //         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      //           <div className="bg-gray-50 p-4 rounded-lg">
      //             <div className="text-2xl font-bold text-gray-800">2.4 GB</div>
      //             <div className="text-sm text-gray-600">Database Size</div>
      //           </div>
      //           <div className="bg-gray-50 p-4 rounded-lg">
      //             <div className="text-2xl font-bold text-gray-800">15,847</div>
      //             <div className="text-sm text-gray-600">Total Records</div>
      //           </div>
      //           <div className="bg-gray-50 p-4 rounded-lg">
      //             <div className="text-2xl font-bold text-gray-800">
      //               June 14
      //             </div>
      //             <div className="text-sm text-gray-600">Last Backup</div>
      //           </div>
      //         </div>

      //         <div className="flex space-x-3">
      //           <button
      //             onClick={handleCreateBackup}
      //             disabled={loading}
      //             className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center disabled:opacity-50"
      //           >
      //             {loading ? (
      //               <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
      //             ) : (
      //               <Download size={16} className="mr-2" />
      //             )}
      //             Create Backup
      //           </button>
      //           <button
      //             onClick={handleRestoreBackup}
      //             disabled={loading}
      //             className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center disabled:opacity-50"
      //           >
      //             {loading ? (
      //               <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-700 mr-2"></div>
      //             ) : (
      //               <Upload size={16} className="mr-2" />
      //             )}
      //             Restore Backup
      //           </button>
      //         </div>
      //       </div>

      //       {/* Backup Schedule */}
      //       <div className="bg-white border border-gray-200 rounded-lg p-6">
      //         <h4 className="text-md font-semibold text-gray-800 mb-4">
      //           Automatic Backup Schedule
      //         </h4>
      //         <div className="space-y-4">
      //           <div className="flex items-center justify-between">
      //             <div>
      //               <p className="text-sm font-medium text-gray-900">
      //                 Enable Automatic Backups
      //               </p>
      //               <p className="text-xs text-gray-500">
      //                 Automatically create backups on a schedule
      //               </p>
      //             </div>
      //             <label className="relative inline-flex items-center cursor-pointer">
      //               <input
      //                 type="checkbox"
      //                 defaultChecked
      //                 className="sr-only peer"
      //               />
      //               <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
      //             </label>
      //           </div>

      //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      //             <div>
      //               <label className="block text-sm font-medium text-gray-700 mb-1">
      //                 Frequency
      //               </label>
      //               <select className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
      //                 <option>Daily</option>
      //                 <option>Weekly</option>
      //                 <option>Monthly</option>
      //               </select>
      //             </div>
      //             <div>
      //               <label className="block text-sm font-medium text-gray-700 mb-1">
      //                 Time
      //               </label>
      //               <input
      //                 type="time"
      //                 defaultValue="02:00"
      //                 className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      //               />
      //             </div>
      //           </div>
      //         </div>
      //       </div>

      //       {/* Recent Backups */}
      //       <div className="bg-white border border-gray-200 rounded-lg p-6">
      //         <h4 className="text-md font-semibold text-gray-800 mb-4">
      //           Recent Backups
      //         </h4>
      //         <div className="space-y-3">
      //           {[
      //             {
      //               date: "2024-06-15 02:00:00",
      //               size: "2.4 GB",
      //               status: "Success",
      //               type: "Automatic",
      //             },
      //             {
      //               date: "2024-06-14 02:00:00",
      //               size: "2.3 GB",
      //               status: "Success",
      //               type: "Automatic",
      //             },
      //             {
      //               date: "2024-06-13 14:30:00",
      //               size: "2.3 GB",
      //               status: "Success",
      //               type: "Manual",
      //             },
      //             {
      //               date: "2024-06-13 02:00:00",
      //               size: "2.3 GB",
      //               status: "Failed",
      //               type: "Automatic",
      //             },
      //           ].map((backup, index) => (
      //             <div
      //               key={index}
      //               className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
      //             >
      //               <div className="flex items-center">
      //                 <div
      //                   className={`w-3 h-3 rounded-full mr-3 ${
      //                     backup.status === "Success"
      //                       ? "bg-green-500"
      //                       : "bg-red-500"
      //                   }`}
      //                 ></div>
      //                 <div>
      //                   <div className="text-sm font-medium text-gray-900">
      //                     {backup.date}
      //                   </div>
      //                   <div className="text-xs text-gray-500">
      //                     {backup.size} • {backup.type}
      //                   </div>
      //                 </div>
      //               </div>
      //               <div className="flex items-center space-x-2">
      //                 <span
      //                   className={`px-2 py-1 text-xs font-semibold rounded-full ${
      //                     backup.status === "Success"
      //                       ? "bg-green-100 text-green-800"
      //                       : "bg-red-100 text-red-800"
      //                   }`}
      //                 >
      //                   {backup.status}
      //                 </span>
      //                 {backup.status === "Success" && (
      //                   <button className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50">
      //                     <Download size={16} />
      //                   </button>
      //                 )}
      //               </div>
      //             </div>
      //           ))}
      //         </div>
      //       </div>
      //     </div>
      //   );

      // case "audit-logs":
      //   return (
      //     <div className="space-y-6">
      //       <div className="flex justify-between items-center">
      //         <h3 className="text-lg font-semibold text-gray-800">
      //           Audit Logs
      //         </h3>
      //         <button
      //           onClick={handleExportLogs}
      //           className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
      //         >
      //           <Download size={16} className="mr-2" />
      //           Export Logs
      //         </button>
      //       </div>

      //       {/* Log Filters */}
      //       <div className="bg-white border border-gray-200 rounded-lg p-4">
      //         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      //           <div>
      //             <label className="block text-sm font-medium text-gray-700 mb-1">
      //               Date From
      //             </label>
      //             <input
      //               type="date"
      //               className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      //             />
      //           </div>
      //           <div>
      //             <label className="block text-sm font-medium text-gray-700 mb-1">
      //               Date To
      //             </label>
      //             <input
      //               type="date"
      //               className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      //             />
      //           </div>
      //           <div>
      //             <label className="block text-sm font-medium text-gray-700 mb-1">
      //               User
      //             </label>
      //             <select className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
      //               <option value="">All Users</option>
      //               <option value="admin">Admin</option>
      //               <option value="manager1">Manager</option>
      //               <option value="tech1">Technician</option>
      //             </select>
      //           </div>
      //           <div>
      //             <label className="block text-sm font-medium text-gray-700 mb-1">
      //               Severity
      //             </label>
      //             <select className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
      //               <option value="">All Levels</option>
      //               <option value="info">Info</option>
      //               <option value="warning">Warning</option>
      //               <option value="error">Error</option>
      //               <option value="success">Success</option>
      //             </select>
      //           </div>
      //         </div>
      //       </div>

      //       {/* Audit Log Entries */}
      //       <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      //         <div className="overflow-x-auto">
      //           <table className="min-w-full divide-y divide-gray-200">
      //             <thead className="bg-gray-50">
      //               <tr>
      //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      //                   Timestamp
      //                 </th>
      //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      //                   User
      //                 </th>
      //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      //                   Action
      //                 </th>
      //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      //                   Details
      //                 </th>
      //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      //                   Severity
      //                 </th>
      //               </tr>
      //             </thead>
      //             <tbody className="bg-white divide-y divide-gray-200">
      //               {auditLogs.map((log) => (
      //                 <tr key={log.id} className="hover:bg-gray-50">
      //                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
      //                     {log.timestamp}
      //                   </td>
      //                   <td className="px-6 py-4 whitespace-nowrap">
      //                     <div className="flex items-center">
      //                       <User size={16} className="text-gray-400 mr-2" />
      //                       <span className="text-sm font-medium text-gray-900">
      //                         {log.user}
      //                       </span>
      //                     </div>
      //                   </td>
      //                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
      //                     {log.action}
      //                   </td>
      //                   <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
      //                     {log.details}
      //                   </td>
      //                   <td className="px-6 py-4 whitespace-nowrap">
      //                     <span
      //                       className={`px-2 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${getSeverityColor(
      //                         log.severity
      //                       )}`}
      //                     >
      //                       <span className="mr-1">
      //                         {getSeverityIcon(log.severity)}
      //                       </span>
      //                       {log.severity}
      //                     </span>
      //                   </td>
      //                 </tr>
      //               ))}
      //             </tbody>
      //           </table>
      //         </div>
      //       </div>

      //       {/* Log Statistics */}
      //       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      //         <div className="bg-white border border-gray-200 rounded-lg p-4">
      //           <div className="flex items-center">
      //             <div className="flex-shrink-0">
      //               <FileText size={24} className="text-blue-600" />
      //             </div>
      //             <div className="ml-3">
      //               <div className="text-lg font-semibold text-gray-900">
      //                 1,247
      //               </div>
      //               <div className="text-sm text-gray-500">Total Logs</div>
      //             </div>
      //           </div>
      //         </div>
      //         <div className="bg-white border border-gray-200 rounded-lg p-4">
      //           <div className="flex items-center">
      //             <div className="flex-shrink-0">
      //               <CheckCircle size={24} className="text-green-600" />
      //             </div>
      //             <div className="ml-3">
      //               <div className="text-lg font-semibold text-gray-900">
      //                 1,156
      //               </div>
      //               <div className="text-sm text-gray-500">Success</div>
      //             </div>
      //           </div>
      //         </div>
      //         <div className="bg-white border border-gray-200 rounded-lg p-4">
      //           <div className="flex items-center">
      //             <div className="flex-shrink-0">
      //               <AlertTriangle size={24} className="text-yellow-600" />
      //             </div>
      //             <div className="ml-3">
      //               <div className="text-lg font-semibold text-gray-900">
      //                 78
      //               </div>
      //               <div className="text-sm text-gray-500">Warnings</div>
      //             </div>
      //           </div>
      //         </div>
      //         <div className="bg-white border border-gray-200 rounded-lg p-4">
      //           <div className="flex items-center">
      //             <div className="flex-shrink-0">
      //               <XCircle size={24} className="text-red-600" />
      //             </div>
      //             <div className="ml-3">
      //               <div className="text-lg font-semibold text-gray-900">
      //                 13
      //               </div>
      //               <div className="text-sm text-gray-500">Errors</div>
      //             </div>
      //           </div>
      //         </div>
      //       </div>
      //     </div>
      //   );

      // case "system-config":
      //   return (
      //     <div className="space-y-6">
      //       <h3 className="text-lg font-semibold text-gray-800">
      //         System Configuration
      //       </h3>

      //       {/* General Settings */}
      //       <div className="bg-white border border-gray-200 rounded-lg p-6">
      //         <h4 className="text-md font-semibold text-gray-800 mb-4">
      //           General Settings
      //         </h4>
      //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      //           <div>
      //             <label className="block text-sm font-medium text-gray-700 mb-1">
      //               System Name
      //             </label>
      //             <input
      //               type="text"
      //               defaultValue="AutoService Center Management"
      //               className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      //             />
      //           </div>
      //           <div>
      //             <label className="block text-sm font-medium text-gray-700 mb-1">
      //               Time Zone
      //             </label>
      //             <select className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
      //               <option>UTC-5 (Eastern Time)</option>
      //               <option>UTC-6 (Central Time)</option>
      //               <option>UTC-7 (Mountain Time)</option>
      //               <option>UTC-8 (Pacific Time)</option>
      //             </select>
      //           </div>
      //           <div>
      //             <label className="block text-sm font-medium text-gray-700 mb-1">
      //               Date Format
      //             </label>
      //             <select className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
      //               <option>MM/DD/YYYY</option>
      //               <option>DD/MM/YYYY</option>
      //               <option>YYYY-MM-DD</option>
      //             </select>
      //           </div>
      //           <div>
      //             <label className="block text-sm font-medium text-gray-700 mb-1">
      //               Currency
      //             </label>
      //             <select className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
      //               <option>USD ($)</option>
      //               <option>EUR (€)</option>
      //               <option>GBP (£)</option>
      //               <option>CAD ($)</option>
      //             </select>
      //           </div>
      //         </div>
      //       </div>

      //       {/* Security Settings */}
      //       <div className="bg-white border border-gray-200 rounded-lg p-6">
      //         <h4 className="text-md font-semibold text-gray-800 mb-4">
      //           Security Settings
      //         </h4>
      //         <div className="space-y-4">
      //           <div className="flex items-center justify-between">
      //             <div>
      //               <p className="text-sm font-medium text-gray-900">
      //                 Require Strong Passwords
      //               </p>
      //               <p className="text-xs text-gray-500">
      //                 Enforce minimum 8 characters with mixed case and numbers
      //               </p>
      //             </div>
      //             <label className="relative inline-flex items-center cursor-pointer">
      //               <input
      //                 type="checkbox"
      //                 defaultChecked
      //                 className="sr-only peer"
      //               />
      //               <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
      //             </label>
      //           </div>

      //           <div className="flex items-center justify-between">
      //             <div>
      //               <p className="text-sm font-medium text-gray-900">
      //                 Session Timeout
      //               </p>
      //               <p className="text-xs text-gray-500">
      //                 Automatically log out inactive users
      //               </p>
      //             </div>
      //             <select className="rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
      //               <option>30 minutes</option>
      //               <option>1 hour</option>
      //               <option>2 hours</option>
      //               <option>4 hours</option>
      //             </select>
      //           </div>

      //           <div className="flex items-center justify-between">
      //             <div>
      //               <p className="text-sm font-medium text-gray-900">
      //                 Two-Factor Authentication
      //               </p>
      //               <p className="text-xs text-gray-500">
      //                 Require 2FA for admin accounts
      //               </p>
      //             </div>
      //             <label className="relative inline-flex items-center cursor-pointer">
      //               <input type="checkbox" className="sr-only peer" />
      //               <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
      //             </label>
      //           </div>
      //         </div>
      //       </div>

      //       {/* Performance Settings */}
      //       <div className="bg-white border border-gray-200 rounded-lg p-6">
      //         <h4 className="text-md font-semibold text-gray-800 mb-4">
      //           Performance Settings
      //         </h4>
      //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      //           <div>
      //             <label className="block text-sm font-medium text-gray-700 mb-1">
      //               Cache Duration (minutes)
      //             </label>
      //             <input
      //               type="number"
      //               defaultValue="30"
      //               className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      //             />
      //           </div>
      //           <div>
      //             <label className="block text-sm font-medium text-gray-700 mb-1">
      //               Max File Upload Size (MB)
      //             </label>
      //             <input
      //               type="number"
      //               defaultValue="10"
      //               className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      //             />
      //           </div>
      //           <div>
      //             <label className="block text-sm font-medium text-gray-700 mb-1">
      //               Records Per Page
      //             </label>
      //             <select className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
      //               <option>10</option>
      //               <option>25</option>
      //               <option>50</option>
      //               <option>100</option>
      //             </select>
      //           </div>
      //           <div>
      //             <label className="block text-sm font-medium text-gray-700 mb-1">
      //               Log Retention (days)
      //             </label>
      //             <input
      //               type="number"
      //               defaultValue="90"
      //               className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      //             />
      //           </div>
      //         </div>
      //       </div>

      //       {/* System Information */}
      //       <div className="bg-white border border-gray-200 rounded-lg p-6">
      //         <h4 className="text-md font-semibold text-gray-800 mb-4">
      //           System Information
      //         </h4>
      //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      //           <div className="space-y-3">
      //             <div className="flex justify-between">
      //               <span className="text-sm text-gray-600">Version</span>
      //               <span className="text-sm font-medium text-gray-900">
      //                 v2.1.0
      //               </span>
      //             </div>
      //             <div className="flex justify-between">
      //               <span className="text-sm text-gray-600">Last Updated</span>
      //               <span className="text-sm font-medium text-gray-900">
      //                 June 15, 2024
      //               </span>
      //             </div>
      //             <div className="flex justify-between">
      //               <span className="text-sm text-gray-600">
      //                 Database Version
      //               </span>
      //               <span className="text-sm font-medium text-gray-900">
      //                 PostgreSQL 14.2
      //               </span>
      //             </div>
      //             <div className="flex justify-between">
      //               <span className="text-sm text-gray-600">Server Uptime</span>
      //               <span className="text-sm font-medium text-gray-900">
      //                 15 days, 8 hours
      //               </span>
      //             </div>
      //           </div>
      //           <div className="space-y-3">
      //             <div className="flex justify-between">
      //               <span className="text-sm text-gray-600">Total Users</span>
      //               <span className="text-sm font-medium text-gray-900">
      //                 24
      //               </span>
      //             </div>
      //             <div className="flex justify-between">
      //               <span className="text-sm text-gray-600">
      //                 Active Sessions
      //               </span>
      //               <span className="text-sm font-medium text-gray-900">8</span>
      //             </div>
      //             <div className="flex justify-between">
      //               <span className="text-sm text-gray-600">Storage Used</span>
      //               <span className="text-sm font-medium text-gray-900">
      //                 2.4 GB / 10 GB
      //               </span>
      //             </div>
      //             <div className="flex justify-between">
      //               <span className="text-sm text-gray-600">
      //                 License Status
      //               </span>
      //               <span className="text-sm font-medium text-green-600">
      //                 Active (Pro Plan)
      //               </span>
      //             </div>
      //           </div>
      //         </div>
      //       </div>

      //       {/* Save Button */}
      //       <div className="flex justify-end">
      //         <button
      //           onClick={() =>
      //             toast.success("System configuration saved successfully!")
      //           }
      //           className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
      //         >
      //           <Save size={16} className="mr-2" />
      //           Save Configuration
      //         </button>
      //       </div>
      //     </div>
      //   );

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
