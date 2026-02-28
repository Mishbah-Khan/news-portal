import axios from 'axios';

export const axios_instance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
});

axios_instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('user-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios_instance;
