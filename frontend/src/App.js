import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/customers" element={<Customers />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
