import { createContext, useState } from "react";

const JobCardsContext = createContext();

const initialJobCards = [
  {
    id: "JC-2024-001",
    customer: "Michael Johnson",
    vehicle: "Toyota Camry (ABC-123)",
    date: "2024-06-15",
    services: ["Oil Change", "Air Filter Replacement"],
    status: "completed",
    technician: "Robert Smith",
    totalAmount: 95.75,
  },
  {
    id: "JC-2024-002",
    customer: "Sarah Williams",
    vehicle: "Honda Civic (XYZ-789)",
    date: "2024-06-15",
    services: ["Brake Inspection", "Brake Pad Replacement"],
    status: "in-progress",
    technician: "James Wilson",
    totalAmount: 220.5,
  },
  {
    id: "JC-2024-003",
    customer: "David Martinez",
    vehicle: "Ford F-150 (DEF-456)",
    date: "2024-06-14",
    services: ["Tire Rotation", "Wheel Alignment"],
    status: "completed",
    technician: "Lisa Brown",
    totalAmount: 150.0,
  },
  {
    id: "JC-2024-004",
    customer: "Jennifer Taylor",
    vehicle: "Nissan Altima (GHI-789)",
    date: "2024-06-14",
    services: ["AC Repair", "Coolant Flush"],
    status: "pending",
    technician: "Robert Smith",
    totalAmount: 320.25,
  },
  {
    id: "JC-2024-005",
    customer: "Robert Brown",
    vehicle: "BMW X5 (JKL-012)",
    date: "2024-06-13",
    services: ["Full Service", "Spark Plug Replacement"],
    status: "completed",
    technician: "James Wilson",
    totalAmount: 485.0,
  },
];

export const JobCardsProvider = ({ children }) => {
  const [jobCards, setJobCards] = useState(initialJobCards);

  const addJobCard = (jobCard) => {
    setJobCards((prev) => [
      {
        ...jobCard,
        id: `JC-${Date.now()}`,
        services:
          typeof jobCard.services === "string"
            ? jobCard.services.split(",").map((s) => s.trim())
            : jobCard.services,
        totalAmount: parseFloat(jobCard.totalAmount),
      },
      ...prev,
    ]);
  };

  return (
    <JobCardsContext.Provider value={{ jobCards, addJobCard }}>
      {children}
    </JobCardsContext.Provider>
  );
};

export default JobCardsContext;
