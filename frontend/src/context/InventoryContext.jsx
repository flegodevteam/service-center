import { createContext, useState } from "react";

const InventoryContext = createContext();

const initialInventory = [
  {
    id: "P001",
    name: "Engine Oil Filter",
    category: "Filters",
    stock: 45,
    minStock: 10,
    price: 12.99,
    location: "A-12",
    status: "in-stock",
  },
  {
    id: "P002",
    name: "Brake Pads (Front)",
    category: "Brakes",
    stock: 8,
    minStock: 10,
    price: 35.5,
    location: "B-05",
    status: "low-stock",
  },
  {
    id: "P003",
    name: "Spark Plugs",
    category: "Ignition",
    stock: 32,
    minStock: 15,
    price: 8.75,
    location: "C-09",
    status: "in-stock",
  },
  {
    id: "P004",
    name: "Air Filter",
    category: "Filters",
    stock: 16,
    minStock: 8,
    price: 15.25,
    location: "A-14",
    status: "in-stock",
  },
  {
    id: "P005",
    name: "Wiper Blades",
    category: "Exterior",
    stock: 0,
    minStock: 5,
    price: 22.0,
    location: "D-03",
    status: "out-of-stock",
  },
  {
    id: "P006",
    name: "Coolant 1L",
    category: "Fluids",
    stock: 7,
    minStock: 10,
    price: 9.99,
    location: "E-02",
    status: "low-stock",
  },
  {
    id: "P007",
    name: "Transmission Fluid",
    category: "Fluids",
    stock: 12,
    minStock: 5,
    price: 14.5,
    location: "E-03",
    status: "in-stock",
  },
];

export const InventoryProvider = ({ children }) => {
  const [inventory, setInventory] = useState(initialInventory);

  const addItem = (item) => {
    setInventory((prev) => [
      { ...item, price: parseFloat(item.price), stock: Number(item.stock), minStock: Number(item.minStock) },
      ...prev,
    ]);
  };

  return (
    <InventoryContext.Provider value={{ inventory, addItem }}>
      {children}
    </InventoryContext.Provider>
  );
};

export default InventoryContext;