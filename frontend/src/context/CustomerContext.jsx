import { createContext, useState } from "react";

export const CustomerContext = createContext();

export const CustomerProvider = ({ children }) => {
  const [customers, setCustomers] = useState([
    "Michael Johnson",
    "Sarah Williams",
    "David Martinez",
    "Jennifer Taylor",
    "Robert Brown",
  ]);
  return (
    <CustomerContext.Provider value={{ customers, setCustomers }}>
      {children}
    </CustomerContext.Provider>
  );
};
