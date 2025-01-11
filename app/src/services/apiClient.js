// src/services/apiClient.js
import axios from "axios";
import CONSTANTS from "../constants";

const apiClient = axios.create({
  baseURL: CONSTANTS.BACKEND_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add an interceptor to attach authorization tokens
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Fetch token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
