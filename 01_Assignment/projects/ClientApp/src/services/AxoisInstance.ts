import axios from "axios";

const axoisInstance = axios.create({
  baseURL: "http://localhost:7161",
});

export default axoisInstance;
