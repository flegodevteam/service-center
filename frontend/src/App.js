import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Vehicles from "./pages/Vehicles";
import Appointments from "./pages/Appointments";
import JobCards from "./pages/JobCards";
import Inventory from "./pages/Inventory";
import Billing from "./pages/Billing";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Unauthorized from "./pages/Unauthorized";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { CustomerProvider } from "./context/CustomerContext";
import { VehicleProvider } from "./context/VehicleContext";
import { AppointmentProvider } from "./context/AppointmentContext";
import { JobCardsProvider } from "./context/JobCardsContext";
import { InventoryProvider } from "./context/InventoryContext";
import { BillingProvider } from "./context/BillingContext";

function App() {
  return (
    <AuthProvider>
      <CustomerProvider>
        <VehicleProvider>
          <AppointmentProvider>
            <JobCardsProvider>
              <InventoryProvider>
                <BillingProvider>
                  <Router>
                    <Toaster position="top-right" />
                    <Routes>
                      <Route path="/login" element={<Login />} />
                      <Route path="/unauthorized" element={<Unauthorized />} />

                      <Route
                        element={
                          <ProtectedRoute>
                            <Layout />
                          </ProtectedRoute>
                        }
                      >
                        {/* Dashboard - accessible to all authenticated users */}
                        <Route path="/" element={<Dashboard />} />

                        {/* Admin only routes */}
                        <Route
                          path="/settings"
                          element={
                            <ProtectedRoute allowedRoles={["admin"]}>
                              <Settings />
                            </ProtectedRoute>
                          }
                        />

                        {/* Admin & Manager Routes */}
                        <Route
                          path="/reports"
                          element={
                            <ProtectedRoute allowedRoles={["admin", "manager"]}>
                              <Reports />
                            </ProtectedRoute>
                          }
                        />

                        {/* Front Desk Routes */}
                        <Route
                          path="/customers"
                          element={
                            <ProtectedRoute
                              allowedRoles={["admin", "manager", "front-desk"]}
                            >
                              <Customers />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/appointments"
                          element={
                            <ProtectedRoute
                              allowedRoles={["admin", "manager", "front-desk"]}
                            >
                              <Appointments />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/billing"
                          element={
                            <ProtectedRoute
                              allowedRoles={["admin", "manager", "front-desk"]}
                            >
                              <Billing />
                            </ProtectedRoute>
                          }
                        />

                        {/* Technician Routes */}
                        <Route
                          path="/job-cards"
                          element={
                            <ProtectedRoute
                              allowedRoles={["admin", "manager", "technician"]}
                            >
                              <JobCards />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/inventory"
                          element={
                            <ProtectedRoute
                              allowedRoles={["admin", "manager", "technician"]}
                            >
                              <Inventory />
                            </ProtectedRoute>
                          }
                        />

                        {/* Shared Routes */}
                        <Route
                          path="/vehicles"
                          element={
                            <ProtectedRoute
                              allowedRoles={[
                                "admin",
                                "manager",
                                "technician",
                                "front-desk",
                              ]}
                            >
                              <Vehicles />
                            </ProtectedRoute>
                          }
                        />
                      </Route>
                    </Routes>
                  </Router>
                </BillingProvider>
              </InventoryProvider>
            </JobCardsProvider>
          </AppointmentProvider>
        </VehicleProvider>
      </CustomerProvider>
    </AuthProvider>
  );
}

export default App;
