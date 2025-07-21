import { createContext, useState } from "react";

// Initial sample vehicles data (copy from your Vehicles.js)
const initialVehicles = [
  {
    id: 1,
    make: "Toyota",
    model: "Camry",
    year: 2020,
    regNumber: "ABC-123",
    vin: "JT2BF22K1X0123456",
    owner: "Michael Johnson",
    lastService: "15 May 2024",
    nextService: "15 Nov 2024",
    status: "active",
  },
  {
    id: 2,
    make: "Honda",
    model: "Civic",
    year: 2019,
    regNumber: "XYZ-789",
    vin: "2HGFC2F52KH123456",
    owner: "Sarah Williams",
    lastService: "3 Jun 2024",
    nextService: "3 Dec 2024",
    status: "active",
  },
  {
    id: 3,
    make: "Ford",
    model: "F-150",
    year: 2021,
    regNumber: "DEF-456",
    vin: "1FTEW1EP5MFA12345",
    owner: "David Martinez",
    lastService: "27 Apr 2024",
    nextService: "27 Oct 2024",
    status: "active",
  },
  {
    id: 4,
    make: "Nissan",
    model: "Altima",
    year: 2018,
    regNumber: "GHI-789",
    vin: "1N4AL3AP2JC123456",
    owner: "Jennifer Taylor",
    lastService: "9 Jun 2024",
    nextService: "9 Dec 2024",
    status: "inactive",
  },
];

export const VehicleContext = createContext();

export const VehicleProvider = ({ children }) => {
  const [vehicles, setVehicles] = useState(initialVehicles);

  return (
    <VehicleContext.Provider value={{ vehicles, setVehicles }}>
      {children}
    </VehicleContext.Provider>
  );
};
