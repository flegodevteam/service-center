import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Car,
  Calendar,
  FileText,
  Package,
  CreditCard,
  BarChart2,
  Settings,
  X,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { user } = useAuth();

  const allNavItems = [
    {
      to: "/",
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard",
      roles: ["admin", "manager", "technician", "front-desk"],
    },
    {
      to: "/customers",
      icon: <Users size={20} />,
      label: "Customers",
      roles: ["admin", "manager", "front-desk"],
    },
    {
      to: "/vehicles",
      icon: <Car size={20} />,
      label: "Vehicles",
      roles: ["admin", "manager", "technician", "front-desk"],
    },
    {
      to: "/appointments",
      icon: <Calendar size={20} />,
      label: "Appointments",
      roles: ["admin", "manager", "front-desk"],
    },
    {
      to: "/job-cards",
      icon: <FileText size={20} />,
      label: "Job Cards",
      roles: ["admin", "manager", "technician"],
    },
    {
      to: "/inventory",
      icon: <Package size={20} />,
      label: "Inventory",
      roles: ["admin", "manager", "technician"],
    },
    {
      to: "/billing",
      icon: <CreditCard size={20} />,
      label: "Billing",
      roles: ["admin", "manager", "front-desk"],
    },
    {
      to: "/reports",
      icon: <BarChart2 size={20} />,
      label: "Reports",
      roles: ["admin", "manager"],
    },
    {
      to: "/settings",
      icon: <Settings size={20} />,
      label: "Settings",
      roles: ["admin"],
    },
  ];

  const navItems = allNavItems.filter(
    (item) => user && item.roles.includes(user.role)
  );

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed md:static inset-y-0 left-0 w-64 bg-white shadow-lg z-30 overflow-y-auto"
          >
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center space-x-2">
                <Car className="text-blue-700" size={24} />
                <h1 className="text-xl font-bold text-gray-800">AutoService</h1>
              </div>
              <button onClick={toggleSidebar} className="md:hidden">
                <X size={20} />
              </button>
            </div>

            <div className="p-4 border-b">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-700 font-semibold">
                    {user?.name?.charAt(0) || "U"}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-800">
                    {user?.name || "User"}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">
                    {user?.role || "Staff"}
                  </p>
                </div>
              </div>
            </div>

            <nav className="p-2">
              <ul className="space-y-1">
                {navItems.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                          isActive
                            ? "bg-blue-50 text-blue-700"
                            : "text-gray-700 hover:bg-gray-100"
                        }`
                      }
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      <aside className="hidden md:block w-64 bg-white shadow-lg overflow-y-auto">
        <div className="flex items-center p-4 border-b">
          <Car className="text-blue-700" size={24} />
          <h1 className="text-xl font-bold text-gray-800 ml-2">AutoService</h1>
        </div>

        <div className="p-4 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-700 font-semibold">
                {user?.name?.charAt(0) || "U"}
              </span>
            </div>
            <div>
              <p className="font-medium text-gray-800">
                {user?.name || "User"}
              </p>
              <p className="text-xs text-gray-500 capitalize">
                {user?.role || "Staff"}
              </p>
            </div>
          </div>
        </div>

        <nav className="p-2">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`
                  }
                >
                  {item.icon}
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
