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

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/job-cards" element={<JobCards />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/billing" element={<Billing />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
