// src/services/authService.js
import apiClient from "./apiClient";

const authService = {
  login: async (credentials) => {
    const response = await apiClient.post("/auth/login", credentials);
    return response.data; // Assume the API returns { token, user }
  },

  signUp: async (credentials) => {
    const response = await apiClient.post("/auth/signUp", credentials);
    return response.data; // Assume the API returns { token, user }
  },

  getCurrentUser: async () => {
    const response = await apiClient.get("/auth/me");
    return response.data; // Assume the API returns { token, user }
  },
};

export default authService;
