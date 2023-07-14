import { createBrowserRouter } from "react-router-dom";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";

const router = createBrowserRouter([
  { path: "/", element: <LoginScreen /> },
  { path: "/Home", element: <HomeScreen /> },
]);
export default router;
