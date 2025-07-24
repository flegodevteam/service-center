import { createContext, useState } from "react";

const BillingContext = createContext();

const initialInvoices = [
  {
    id: "INV-2024-001",
    customer: "Michael Johnson",
    vehicle: "Toyota Camry (ABC-123)",
    date: "2024-06-15",
    amount: 95.75,
    paymentStatus: "paid",
    paymentMethod: "Credit Card",
  },
  {
    id: "INV-2024-002",
    customer: "Sarah Williams",
    vehicle: "Honda Civic (XYZ-789)",
    date: "2024-06-15",
    amount: 220.5,
    paymentStatus: "pending",
    paymentMethod: "Pending",
  },
  {
    id: "INV-2024-003",
    customer: "David Martinez",
    vehicle: "Ford F-150 (DEF-456)",
    date: "2024-06-14",
    amount: 150.0,
    paymentStatus: "paid",
    paymentMethod: "Cash",
  },
  {
    id: "INV-2024-004",
    customer: "Jennifer Taylor",
    vehicle: "Nissan Altima (GHI-789)",
    date: "2024-06-14",
    amount: 320.25,
    paymentStatus: "cancelled",
    paymentMethod: "Cancelled",
  },
  {
    id: "INV-2024-005",
    customer: "Robert Brown",
    vehicle: "BMW X5 (JKL-012)",
    date: "2024-06-13",
    amount: 485.0,
    paymentStatus: "paid",
    paymentMethod: "Mobile Payment",
  },
];

export const BillingProvider = ({ children }) => {
  const [invoices, setInvoices] = useState(initialInvoices);

  const addInvoice = (invoice) => {
    setInvoices((prev) => [
      {
        ...invoice,
        id: `INV-${Date.now()}`,
        amount: parseFloat(invoice.amount),
      },
      ...prev,
    ]);
  };

  return (
    <BillingContext.Provider value={{ invoices, addInvoice }}>
      {children}
    </BillingContext.Provider>
  );
};

export default BillingContext;
