import apiClient from "./index";

export const getChannels = () => {
  return apiClient.get("/api/v1/channels");
};

export const createChannel = (channelData) => {
  return apiClient.post("/api/v1/channels", channelData);
};

export const deleteChannel = (id) => {
  return apiClient.delete(`/api/v1/channels/${id}`);
};

export const renameChannelApi = (id, data) => {
  return apiClient.patch(`/api/v1/channels/${id}`, data);
};
