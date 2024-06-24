import axiosClient from "./axiosClient";

export const signin = async (email: string, password: string) => {
  const response = await axiosClient.post("/auth/login", { email, password });
  return response.data;
};

export const signup = async (userData: { email: string; password: string; membername: string }) => {
  const response = await axiosClient.post("/auth/register", userData);
  return response.data;
};

export const fetchMemberProfile = async () => {
  const member = JSON.parse(localStorage.getItem("user") || "");
  if (!member?._id) {
    throw new Error("No member ID found in localStorage");
  }
  const response = await axiosClient.get(`/members/${member._id}`);
  return response.data;
};

export const updateMemberInfo = async (id: string, memberData: { membername: string; YOB: number }) => {
  const response = await axiosClient.patch(`/members/${id}`, memberData);
  return response.data;
};
