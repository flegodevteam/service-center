import React, { useState } from "react";
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
} from "lucide-react";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [isSmsEnabled, setIsSmsEnabled] = useState(true);
  const [isEmailEnabled, setIsEmailEnabled] = useState(true);

  const tabs = [
    { id: "profile", label: "Profile", icon: <User size={18} /> },
    { id: "company", label: "Company", icon: <Building size={18} /> },
    { id: "notifications", label: "Notifications", icon: <Bell size={18} /> },
    { id: "security", label: "Security", icon: <Lock size={18} /> },
    { id: "system", label: "System", icon: <Server size={18} /> },
  ];

  const technicians = [
    {
      id: 1,
      name: "Suriya",
      role: "Senior Technician",
      specialization: "Engine, Transmission",
      status: "active",
    },
    {
      id: 2,
      name: "Vijay",
      role: "Technician",
      specialization: "Brakes, Suspension",
      status: "active",
    },
    {
      id: 3,
      name: "Dhanush",
      role: "Junior Technician",
      specialization: "General Maintenance",
      status: "inactive",
    },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-700 text-2xl font-semibold">A</span>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Admin User
                </h3>
                <p className="text-gray-600">admin@example.com</p>
                <button className="mt-2 text-sm text-blue-600 hover:text-blue-500">
                  Change Photo
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  value="Admin"
                  className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  value="User"
                  className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value="admin@example.com"
                  className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value="+94 123 456 7890"
                  className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Title
                </label>
                <input
                  type="text"
                  value="Service Center Manager"
                  className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Save Changes
              </button>
            </div>
          </div>
        );

      case "company":
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
                <Building size={32} className="text-blue-700" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  AutoService Center
                </h3>
                <p className="text-gray-600">Service Center Management</p>
                <button className="mt-2 text-sm text-blue-600 hover:text-blue-500">
                  Change Logo
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  value="AutoService Center"
                  className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Business Type
                </label>
                <select className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Automobile Service Center</option>
                  <option>Auto Repair Shop</option>
                  <option>Car Dealership</option>
                  <option>Specialized Service Center</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value="+94 123 456 7890"
                  className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value="info@autoservice.com"
                  className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  value="123 Service Road, Autoville, AV 12345"
                  className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tax ID / Business Number
                </label>
                <input
                  type="text"
                  value="TAX-12345678"
                  className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Currency
                </label>
                <select className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>USD ($)</option>
                  <option>EUR (€)</option>
                  <option>GBP (£)</option>
                  <option>CAD ($)</option>
                </select>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Technicians
              </h3>
              <div className="bg-white overflow-hidden border border-gray-200 rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Role
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Specialization
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
                    {technicians.map((tech) => (
                      <tr key={tech.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {tech.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {tech.role}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {tech.specialization}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              tech.status === "active"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {tech.status === "active" ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">
                              <Edit2 size={16} />
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="px-6 py-3 border-t border-gray-200">
                  <button className="text-sm text-blue-600 hover:text-blue-500 flex items-center">
                    <Plus size={16} className="mr-1" />
                    Add Technician
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Save Changes
              </button>
            </div>
          </div>
        );

      case "notifications":
        return (
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Notification Settings
                </h3>
                <div className="relative inline-block w-12 mr-2 align-middle select-none">
                  <input
                    type="checkbox"
                    id="toggle-notifications"
                    name="toggle-notifications"
                    checked={isNotificationsEnabled}
                    onChange={() =>
                      setIsNotificationsEnabled(!isNotificationsEnabled)
                    }
                    className="checked:bg-blue-600 outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                  />
                  <label
                    htmlFor="toggle-notifications"
                    className="block h-6 overflow-hidden bg-gray-300 rounded-full cursor-pointer"
                  ></label>
                </div>
              </div>

              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4 flex justify-between items-center">
                  <div className="flex items-center">
                    <Bell size={20} className="text-gray-500 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Appointment Reminders
                      </p>
                      <p className="text-xs text-gray-500">
                        Send reminders before scheduled appointments
                      </p>
                    </div>
                  </div>
                  <div className="relative inline-block w-12 mr-2 align-middle select-none">
                    <input
                      type="checkbox"
                      id="toggle-appointments"
                      name="toggle-appointments"
                      checked={isNotificationsEnabled}
                      className="checked:bg-blue-600 outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                      disabled={!isNotificationsEnabled}
                    />
                    <label
                      htmlFor="toggle-appointments"
                      className={`block h-6 overflow-hidden rounded-full cursor-pointer ${
                        isNotificationsEnabled ? "bg-gray-300" : "bg-gray-200"
                      }`}
                    ></label>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4 flex justify-between items-center">
                  <div className="flex items-center">
                    <Clock size={20} className="text-gray-500 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Service Completion
                      </p>
                      <p className="text-xs text-gray-500">
                        Notify when a service job is completed
                      </p>
                    </div>
                  </div>
                  <div className="relative inline-block w-12 mr-2 align-middle select-none">
                    <input
                      type="checkbox"
                      id="toggle-completion"
                      name="toggle-completion"
                      checked={isNotificationsEnabled}
                      className="checked:bg-blue-600 outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                      disabled={!isNotificationsEnabled}
                    />
                    <label
                      htmlFor="toggle-completion"
                      className={`block h-6 overflow-hidden rounded-full cursor-pointer ${
                        isNotificationsEnabled ? "bg-gray-300" : "bg-gray-200"
                      }`}
                    ></label>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4 flex justify-between items-center">
                  <div className="flex items-center">
                    <Server size={20} className="text-gray-500 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Inventory Alerts
                      </p>
                      <p className="text-xs text-gray-500">
                        Notify when inventory items are low in stock
                      </p>
                    </div>
                  </div>
                  <div className="relative inline-block w-12 mr-2 align-middle select-none">
                    <input
                      type="checkbox"
                      id="toggle-inventory"
                      name="toggle-inventory"
                      checked={isNotificationsEnabled}
                      className="checked:bg-blue-600 outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                      disabled={!isNotificationsEnabled}
                    />
                    <label
                      htmlFor="toggle-inventory"
                      className={`block h-6 overflow-hidden rounded-full cursor-pointer ${
                        isNotificationsEnabled ? "bg-gray-300" : "bg-gray-200"
                      }`}
                    ></label>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Notification Channels
              </h3>

              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4 flex justify-between items-center">
                  <div className="flex items-center">
                    <Mail size={20} className="text-gray-500 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Email Notifications
                      </p>
                      <p className="text-xs text-gray-500">
                        Receive notifications via email
                      </p>
                    </div>
                  </div>
                  <div className="relative inline-block w-12 mr-2 align-middle select-none">
                    <input
                      type="checkbox"
                      id="toggle-email"
                      name="toggle-email"
                      checked={isEmailEnabled}
                      onChange={() => setIsEmailEnabled(!isEmailEnabled)}
                      className="checked:bg-blue-600 outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                    />
                    <label
                      htmlFor="toggle-email"
                      className="block h-6 overflow-hidden bg-gray-300 rounded-full cursor-pointer"
                    ></label>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4 flex justify-between items-center">
                  <div className="flex items-center">
                    <Smartphone size={20} className="text-gray-500 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        SMS Notifications
                      </p>
                      <p className="text-xs text-gray-500">
                        Receive notifications via SMS
                      </p>
                    </div>
                  </div>
                  <div className="relative inline-block w-12 mr-2 align-middle select-none">
                    <input
                      type="checkbox"
                      id="toggle-sms"
                      name="toggle-sms"
                      checked={isSmsEnabled}
                      onChange={() => setIsSmsEnabled(!isSmsEnabled)}
                      className="checked:bg-blue-600 outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                    />
                    <label
                      htmlFor="toggle-sms"
                      className="block h-6 overflow-hidden bg-gray-300 rounded-full cursor-pointer"
                    ></label>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4 flex justify-between items-center">
                  <div className="flex items-center">
                    <Printer size={20} className="text-gray-500 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Print Notifications
                      </p>
                      <p className="text-xs text-gray-500">
                        Automatically print job cards and invoices
                      </p>
                    </div>
                  </div>
                  <div className="relative inline-block w-12 mr-2 align-middle select-none">
                    <input
                      type="checkbox"
                      id="toggle-print"
                      name="toggle-print"
                      className="checked:bg-blue-600 outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                    />
                    <label
                      htmlFor="toggle-print"
                      className="block h-6 overflow-hidden bg-gray-300 rounded-full cursor-pointer"
                    ></label>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Save Changes
              </button>
            </div>
          </div>
        );

      case "security":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Change Password
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Password must be at least 8 characters long and include a
                    combination of letters, numbers, and special characters.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="pt-2">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Update Password
                  </button>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Two-Factor Authentication
              </h3>

              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Enable Two-Factor Authentication
                      </p>
                      <p className="text-xs text-gray-500">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <div className="relative inline-block w-12 mr-2 align-middle select-none">
                      <input
                        type="checkbox"
                        id="toggle-2fa"
                        name="toggle-2fa"
                        className="checked:bg-blue-600 outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                      />
                      <label
                        htmlFor="toggle-2fa"
                        className="block h-6 overflow-hidden bg-gray-300 rounded-full cursor-pointer"
                      ></label>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Two-factor authentication adds an additional layer of
                    security to your account by requiring more than just a
                    password to sign in.
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Account Access
              </h3>

              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-900 mb-2">
                    Session Management
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    You are currently signed in on this device. You can sign out
                    of all other devices if you suspect unauthorized access.
                  </p>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                    Sign Out All Other Devices
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case "system":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                System Settings
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time Zone
                  </label>
                  <select className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Pacific Time (US & Canada)</option>
                    <option>Mountain Time (US & Canada)</option>
                    <option>Central Time (US & Canada)</option>
                    <option>Eastern Time (US & Canada)</option>
                    <option>UTC</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date Format
                  </label>
                  <select className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>MM/DD/YYYY</option>
                    <option>DD/MM/YYYY</option>
                    <option>YYYY-MM-DD</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Language
                  </label>
                  <select className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>English (US)</option>
                    <option>English (UK)</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Data Management
              </h3>

              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-900 mb-2">
                    Database Backup
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    Create a backup of your database to protect your data. We
                    recommend doing this regularly.
                  </p>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mr-3">
                    Create Backup
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                    Restore from Backup
                  </button>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-900 mb-2">
                    Export Data
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    Export your data in various formats for external use or
                    analysis.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                      Export as CSV
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                      Export as Excel
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                      Export as PDF
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                System Information
              </h3>

              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Version</span>
                  <span className="text-sm font-medium text-gray-900">
                    1.0.0
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Last Updated</span>
                  <span className="text-sm font-medium text-gray-900">
                    June 15, 2024
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Database Size</span>
                  <span className="text-sm font-medium text-gray-900">
                    245 MB
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Users</span>
                  <span className="text-sm font-medium text-gray-900">8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">License</span>
                  <span className="text-sm font-medium text-green-600">
                    Active (Pro Plan)
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Save Changes
              </button>
            </div>
          </div>
        );

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
        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
        <p className="text-gray-600">
          Manage your account and application preferences.
        </p>
      </motion.div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="flex border-b border-gray-200">
          <div className="w-64 border-r border-gray-200 bg-gray-50 p-4 hidden md:block">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-4 py-3 w-full rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span className="mr-3">{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="flex overflow-x-auto border-b border-gray-200 md:hidden">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-3 whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-b-2 border-blue-600 text-blue-700"
                    : "text-gray-700 hover:text-gray-900"
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="flex-1 p-6">{renderTabContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
