// src/services/authService.js
import apiClient from "./apiClient";
import CONSTANTS from "../constants";

const authService = {
  login: async (credentials) => {
    const response = await apiClient(CONSTANTS.BACKEND_URL.CHAT).post("/auth/login", credentials);
    return response.data; // Assume the API returns { token, user }
  },

  signUp: async (credentials) => {
    const response = await apiClient(CONSTANTS.BACKEND_URL.CHAT).post("/auth/signUp", credentials);
    return response.data; // Assume the API returns { token, user }
  },

  getCurrentUser: async () => {
    const response = await apiClient(CONSTANTS.BACKEND_URL.CHAT).get("/auth/me");
    return response.data; // Assume the API returns { token, user }
  },
};

export default authService;
