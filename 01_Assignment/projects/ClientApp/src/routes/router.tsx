import { createBrowserRouter } from "react-router-dom";

import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import Dashboard from "../screens/Dashboard";
import ProductTabScreen from "../screens/Products/ProductTabScreen";
import InventoryTabScreen from "../screens/Inventory/InventoryTabScreen";
import CartsScreen from "../screens/Carts/CartsScreen";

const router = createBrowserRouter([
  { path: "/", element: <LoginScreen /> },
  {
    path: "/home",
    element: <HomeScreen />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "products", element: <ProductTabScreen /> },
      { path: "inventory", element: <InventoryTabScreen /> },
      { path: "carts", element: <CartsScreen /> },
    ],
  },
]);
export default router;
