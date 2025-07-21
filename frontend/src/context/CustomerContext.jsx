import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../api/api";

export const CustomerContext = createContext();

export const CustomerProvider = ({ children }) => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Customers fetch panna useEffect
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await axios.get(`${API_URL}/customers`);
        setCustomers(res.data.customers);
      } catch (err) {
        console.error("Customer fetch error", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  // Customer add panna function
  const addCustomer = async (customerData) => {
    const res = await axios.post(`${API_URL}/customers`, customerData);
    setCustomers((prev) => [...prev, res.data.customer]);
  };

  return (
    <CustomerContext.Provider
      value={{ customers, setCustomers, addCustomer, loading }}
    >
      {children}
    </CustomerContext.Provider>
  );
};
