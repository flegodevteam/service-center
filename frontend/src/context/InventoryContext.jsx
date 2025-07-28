import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../api/api";

const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch inventory from backend
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const res = await axios.get(`${API_URL}/inventory`);
        setInventory(res.data.items);
      } catch (err) {
        console.error("Inventory fetch error", err);
      } finally {
        setLoading(false);
      }
    };
    fetchInventory();
  }, []);

  // Add inventory item via API
  const addItem = async (itemData) => {
    itemData.price = parseFloat(itemData.price);
    itemData.stock = Number(itemData.stock);
    itemData.minStock = Number(itemData.minStock);
    const res = await axios.post(`${API_URL}/inventory`, itemData);
    setInventory((prev) => [...prev, res.data.item]);
  };

  return (
    <InventoryContext.Provider value={{ inventory, addItem, loading }}>
      {children}
    </InventoryContext.Provider>
  );
};

export default InventoryContext;
