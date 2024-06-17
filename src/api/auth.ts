import axiosClient from "./axiosClient";

export const signin = async (email: string, password: string) => {
  const response = await axiosClient.post("/auth/login", { email, password });
  return response.data;
};

export const signup = async (userData: {
  email: string;
  password: string;
  membername: string;
}) => {
  const response = await axiosClient.post("/auth/signup", userData);
  return response.data;
};

export const fetchUserProfile = async () => {
  const response = await axiosClient.get("/profile");
  return response.data;
};
