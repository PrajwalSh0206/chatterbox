// src/services/authService.js
import apiClient from "./apiClient";
import CONSTANTS from "../constants";

const analyzeService = {
  analyze: async (data) => {
    const response = await apiClient(CONSTANTS.BACKEND_URL.ANALYSIS).post("/analyze", data);
    return response.data; // Assume the API returns { token, user }
  },
};

export default analyzeService;
