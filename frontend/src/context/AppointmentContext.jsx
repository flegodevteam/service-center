import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../api/api";

const AppointmentContext = createContext();

export const AppointmentProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch appointments from backend
  const fetchAppointments = async (page = 1, limit = 5) => {
    try {
      const res = await axios.get(
        `${API_URL}/appointments?page=${page}&limit=${limit}`
      );
      setAppointments(res.data.appointments);
      setTotal(res.data.total);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Appointment fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Add appointment via API
  const addAppointment = async (appointmentData) => {
    const res = await axios.post(`${API_URL}/appointments`, appointmentData);
    setAppointments((prev) => [...prev, res.data.appointment]);
  };

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        addAppointment,
        loading,
        fetchAppointments,
        total,
        totalPages,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

export default AppointmentContext;
