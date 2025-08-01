import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../api/api";

export const CustomerContext = createContext();

export const CustomerProvider = ({ children }) => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0); // total customers
  const [totalPages, setTotalPages] = useState(1); // total pages

  const fetchCustomers = async (page = 1, limit = 5) => {
    try {
      const res = await axios.get(
        `${API_URL}/customers?page=${page}&limit=${limit}`
      );
      setCustomers(res.data.customers);
      setTotal(res.data.total); // total customers
      setTotalPages(res.data.totalPages); // total pages
    } catch (err) {
      console.error("Customer fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
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
