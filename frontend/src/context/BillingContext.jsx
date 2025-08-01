import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../api/api";

const BillingContext = createContext();

export const BillingProvider = ({ children }) => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch invoices from backend
  const fetchInvoices = async (page = 1, limit = 5) => {
    try {
      const res = await axios.get(
        `${API_URL}/invoices?page=${page}&limit=${limit}`
      );
      setInvoices(res.data.invoices);
      setTotal(res.data.total);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Invoices fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  // Add invoice via API
  const addInvoice = async (invoiceData) => {
    invoiceData.amount = parseFloat(invoiceData.amount);
    const res = await axios.post(`${API_URL}/invoices`, invoiceData);
    setInvoices((prev) => [...prev, res.data.invoice]);
  };

  return (
    <BillingContext.Provider
      value={{
        invoices,
        addInvoice,
        loading,
        fetchInvoices,
        total,
        totalPages,
      }}
    >
      {children}
    </BillingContext.Provider>
  );
};

export default BillingContext;
