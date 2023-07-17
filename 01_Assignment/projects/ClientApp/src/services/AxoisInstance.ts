import axios from "axios";
import AuthStorage from "./auth/AuthStorage";

const axoisInstance = axios.create({
  baseURL: "http://localhost:7161",
});

export default axoisInstance;
