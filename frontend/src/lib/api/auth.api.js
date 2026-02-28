import axios_instance from "../axios/axios-instance";

export const userRegisterAPI = async (data) => {
    const response = await axios_instance.post("/auth/register", data);
    return response.data;
};
export const userLoginAPI = async (data) => {
    const response = await axios_instance.post("/auth/login", data);
    return response.data;
};

export const logoutAPI = async () => {
  const res = await axios_instance.post('/auth/logout');
  return res.data;
};