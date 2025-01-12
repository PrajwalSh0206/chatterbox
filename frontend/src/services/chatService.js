// src/services/authService.js
import apiClient from "./apiClient";
import CONSTANTS from "../constants";

const chatService = {
  createChatId: async (data) => {
    const response = await apiClient(CONSTANTS.BACKEND_URL.CHAT).post("/chat/create", data);
    return response.data;
  },

  fetchTopMessage: async (data) => {
    const response = await apiClient(CONSTANTS.BACKEND_URL.CHAT).get(`/message/${data}`);
    return response.data;
  },
};

export default chatService;
