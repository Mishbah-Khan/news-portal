import { axios_instance } from '../axios/axios-instance';

export const getAllNewsAPI = async () => {
  const response = await axios_instance.get('/all-news');
  return response.data.data;
};

export const getLatestNewsAPI = async () => {
  const response = await axios_instance.get('/latest-news');
  return response.data.data;
};

export const getSingleNewsAPI = async (id) => {
  const response = await axios_instance.get(`/news/${id}`);
  return response.data.data;
};

export const getMyNewsAPI = async () => {
  const response = await axios_instance.get('/my-news');
  return response.data.data;
};

export const createNewsAPI = async (data) => {
  const response = await axios_instance.post('/create-news', data);
  return response.data;
};

export const deleteNewsAPI = async (id) => {
  const response = await axios_instance.delete(`/my-news/${id}`);
  return response.data.data;
};

export const updateNewsAPI = async ({ id, formData }) => {
  const response = await axios_instance.put(`/my-news/${id}`, formData);
  return response.data;
};

export const getMyDashboardStatsAPI = async () => {
  const response = await axios_instance.get('/my-dashboard-stats');
  return response.data.data;
};