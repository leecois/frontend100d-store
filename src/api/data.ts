import axiosClient from './axiosClient';

export const fetchData = async (endpoint: string, params: object) => {
  const response = await axiosClient.get(`/${endpoint}`, { params });
  return response.data;
};
