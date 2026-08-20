import apiClient from "./index";

export const loginUser = (credentials) => {
  return apiClient.post("/api/v1/login", credentials);
};

export const signupUser = (data) => {
  return apiClient.post("/api/v1/signup", data);
};
