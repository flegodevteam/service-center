import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Demo users for different roles
const demoUsers = {
  admin: {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
  },
  manager: {
    id: "2",
    name: "Manager User",
    email: "manager@example.com",
    role: "manager",
  },
  technician: {
    id: "3",
    name: "Technician User",
    email: "technician@example.com",
    role: "technician",
  },
  frontDesk: {
    id: "4",
    name: "Front Desk User",
    email: "frontdesk@example.com",
    role: "front-desk",
  },
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      let demoUser = null;

      switch (email) {
        case "admin@example.com":
          demoUser = demoUsers.admin;
          break;
        case "manager@example.com":
          demoUser = demoUsers.manager;
          break;
        case "technician@example.com":
          demoUser = demoUsers.technician;
          break;
        case "frontdesk@example.com":
          demoUser = demoUsers.frontDesk;
          break;
        default:
          break;
      }

      if (demoUser && password === "password") {
        setUser(demoUser);
        localStorage.setItem("user", JSON.stringify(demoUser));
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
