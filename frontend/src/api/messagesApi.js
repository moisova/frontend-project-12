import apiClient from "./index";

export const getMessages = () => {
  return apiClient.get("/api/v1/messages");
};

export const sendMessage = ({ body, channelId, username }) => {
  return apiClient.post("/api/v1/messages", { body, channelId, username });
};
