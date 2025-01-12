// src/services/authService.js
import apiClient from "./apiClient";

const chatService = {
  createChatId: async (data) => {
    const response = await apiClient.post("/chat/create", data);
    return response.data;
  },

  fetchTopMessage: async (data) => {
    const response = await apiClient.get(`/message/${data}`);
    return response.data;
  },
};

export default chatService;
