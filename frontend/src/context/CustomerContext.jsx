import { createContext, useState, useCallback } from "react";
import axios from "axios";
import { API_URL } from "../api/api";

export const CustomerContext = createContext();

export const CustomerProvider = ({ children }) => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0); // total customers
  const [totalPages, setTotalPages] = useState(1); // total pages

  const fetchCustomers = useCallback(async () => {
    try {
      setLoading(true);
      // Fetch all customers at once with a large limit
      const res = await axios.get(
        `${API_URL}/customers?page=1&limit=10000`
      );
      setCustomers(res.data.customers || []);
      setTotal(res.data.total || 0); // total customers
      setTotalPages(res.data.totalPages || 1); // total pages
    } catch (err) {
      console.error("Customer fetch error", err);
      setCustomers([]);
      setTotal(0);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }, []);

  // Customer add panna function
  const addCustomer = async (customerData) => {
    const res = await axios.post(`${API_URL}/customers`, customerData);
    setCustomers((prev) => [...prev, res.data.customer]);
  };

  const updateCustomer = async (customerData) => {
    const res = await axios.put(
      `${API_URL}/customers/${customerData._id}`,
      customerData
    );
    setCustomers((prev) =>
      prev.map((c) => (c._id === customerData._id ? res.data.customer : c))
    );
  };

  const deleteCustomer = async (customerId) => {
    await axios.delete(`${API_URL}/customers/${customerId}`);
    setCustomers((prev) => prev.filter((c) => c._id !== customerId));
  };

  const fetchAllCustomers = async () => {
    try {
      const res = await axios.get(`${API_URL}/customers?limit=1000`);
      setCustomers(res.data.customers);
    } catch (err) {
      console.error("Customer fetch error", err);
    }
  };

  return (
    <CustomerContext.Provider
      value={{
        customers,
        setCustomers,
        addCustomer,
        updateCustomer,
        deleteCustomer,
        fetchCustomers,
        fetchAllCustomers,
        loading,
        total,
        totalPages,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};
