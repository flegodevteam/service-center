import React, { useState, useRef, useEffect } from "react";
import { Bell, Menu, Search } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";

const Header = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  // Dropdown வெளியே கிளிக் செய்தால் மூட
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  return (
    <header className="bg-white border-b sticky top-0 z-10">
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={toggleSidebar}
            className="md:hidden text-gray-500 hover:text-gray-700"
          >
            <Menu size={24} />
          </button>

          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-80 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Bell size={20} className="text-gray-600" />
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                3
              </span>
            </button>
          </motion.div>

          <div className="relative" ref={menuRef}>
            <button
              className="flex items-center space-x-2"
              onClick={() => setShowMenu((prev) => !prev)}
            >
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-700 font-semibold">
                  {user?.name?.charAt(0) || "U"}
                </span>
              </div>
              <span className="text-sm font-medium text-gray-700 hidden md:inline">
                {user?.name || "User"}
              </span>
            </button>

            <div
              className={`absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ${
                showMenu ? "" : "hidden"
              }`}
            >
              <a
                href="#profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Your Profile
              </a>
              <a
                href="#settings"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Settings
              </a>
              <button
                onClick={logout}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
