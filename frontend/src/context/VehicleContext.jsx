import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../api/api";

export const VehicleContext = createContext();

export const VehicleProvider = ({ children }) => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Vehicles fetch panna useEffect
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await axios.get(`${API_URL}/vehicles`);
        setVehicles(res.data.vehicles);
      } catch (err) {
        console.error("Vehicle fetch error", err);
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
  }, []);

  // Vehicle add panna function
  const addVehicle = async (vehicleData) => {
    const res = await axios.post(`${API_URL}/vehicles`, vehicleData);
    setVehicles((prev) => [...prev, res.data.vehicle]);
  };

  return (
    <VehicleContext.Provider
      value={{ vehicles, setVehicles, addVehicle, loading }}
    >
      {children}
    </VehicleContext.Provider>
  );
};
