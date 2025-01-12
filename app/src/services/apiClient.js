// src/services/apiClient.js
import axios from "axios";

function apiClient(url) {
  let apiClient = axios.create({
    baseURL: url,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  });

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

  return apiClient;
}

export default apiClient;
