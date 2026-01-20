import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",

});

api.interceptors.request.use((config) => {
  const userToken = localStorage.getItem("userToken");

  if (userToken) {
    config.headers.Authorization = `Bearer ${userToken}`;
  }

  return config;
});

export default api;
