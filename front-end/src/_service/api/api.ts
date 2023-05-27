import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("@token");

  if (token) {
    const headers = { Authorization: `Bearer ${token}`, ...config.headers };
    config.headers = headers;
  }

  return config;
});

export default api;
