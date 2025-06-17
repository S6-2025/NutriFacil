import api from "./api";

export const getUserProfile = async () => {
  const response = await api.get("/user/profile");
  return response.data;
};

export const updateUserProfile = async (profileData: any) => {
  const response = await api.patch("/user/profile", profileData);
  return response.data;
};

export const registerUser = async (userData: any) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

export const loginUser = async (credentials: { username: string; password: string }) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};
