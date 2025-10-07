import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, Car, Calendar, Menu } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const MobileNavigation = ({ toggleSidebar }) => {
  const { user } = useAuth();

  // Define navigation items with their required roles
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
      to: "/more",
      icon: <Menu size={20} />,
      label: "More",
      roles: ["admin", "manager", "technician", "front-desk"],
    },
  ];

  // Filter navigation items based on user role
  const navItems = allNavItems.filter(
    (item) => user && item.roles.includes(user.role)
  );

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-10">
      <ul className="flex justify-around">
        {navItems.map((item) => (
          <li key={item.to}>
            {item.to === "/more" ? (
              <button
                onClick={toggleSidebar}
                className="flex flex-col items-center py-2 px-3 text-gray-600"
                type="button"
              >
                {item.icon}
                <span className="text-xs mt-1">{item.label}</span>
              </button>
            ) : (
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex flex-col items-center py-2 px-3 ${
                    isActive ? "text-blue-700" : "text-gray-600"
                  }`
                }
              >
                {item.icon}
                <span className="text-xs mt-1">{item.label}</span>
              </NavLink>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MobileNavigation;
