import  { createContext, useState } from "react";

const AppointmentContext = createContext();

const initialAppointments = [
  {
    id: 1,
    customer: "Michael Johnson",
    vehicle: "Toyota Camry (ABC-123)",
    service: "Oil Change",
    date: "2024-06-15",
    time: "09:30 AM",
    status: "scheduled",
    technician: "Robert Smith",
  },
  {
    id: 2,
    customer: "Sarah Williams",
    vehicle: "Honda Civic (XYZ-789)",
    service: "Brake Inspection",
    date: "2024-06-15",
    time: "10:45 AM",
    status: "in-progress",
    technician: "James Wilson",
  },
  {
    id: 3,
    customer: "David Martinez",
    vehicle: "Ford F-150 (DEF-456)",
    service: "Tire Rotation",
    date: "2024-06-16",
    time: "01:15 PM",
    status: "completed",
    technician: "Lisa Brown",
  },
  {
    id: 4,
    customer: "Jennifer Taylor",
    vehicle: "Nissan Altima (GHI-789)",
    service: "AC Repair",
    date: "2024-06-16",
    time: "03:30 PM",
    status: "scheduled",
    technician: "Robert Smith",
  },
];

export const AppointmentProvider = ({ children }) => {
  const [appointments, setAppointments] = useState(initialAppointments);

  const addAppointment = (appointment) => {
    setAppointments((prev) => [
      ...prev,
      {
        ...appointment,
        id: prev.length + 1,
        status: "scheduled",
      },
    ]);
  };

  return (
    <AppointmentContext.Provider value={{ appointments, addAppointment }}>
      {children}
    </AppointmentContext.Provider>
  );
};

export default AppointmentContext;
