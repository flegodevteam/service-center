import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../api/api";

export const VehicleContext = createContext();

export const VehicleProvider = ({ children }) => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // Vehicles fetch panna useEffect
  const fetchVehicles = async (page = 1, limit = 5) => {
    try {
      const res = await axios.get(
        `${API_URL}/vehicles?page=${page}&limit=${limit}`
      );
      setVehicles(res.data.vehicles);
      setTotal(res.data.total);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Vehicle fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  // Vehicle add panna function
  const addVehicle = async (vehicleData) => {
    const res = await axios.post(`${API_URL}/vehicles`, vehicleData);
    setVehicles((prev) => [...prev, res.data.vehicle]);
  };

  const updateVehicle = async (vehicleData) => {
    const res = await axios.put(
      `${API_URL}/vehicles/${vehicleData._id}`,
      vehicleData
    );
    setVehicles((prev) =>
      prev.map((v) => (v._id === vehicleData._id ? res.data.vehicle : v))
    );
  };

  const deleteVehicle = async (vehicleId) => {
    await axios.delete(`${API_URL}/vehicles/${vehicleId}`);
    setVehicles((prev) => prev.filter((v) => v._id !== vehicleId));
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  return (
    <VehicleContext.Provider
      value={{
        vehicles,
        setVehicles,
        addVehicle,
        updateVehicle,
        deleteVehicle,
        fetchVehicles,
        loading,
        total,
        totalPages,
      }}
    >
      {children}
    </VehicleContext.Provider>
  );
};
