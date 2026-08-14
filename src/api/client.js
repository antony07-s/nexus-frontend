import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  timeout: 10000,
});

export const getServices = () => api.get("/services");
export const getProjects = (params) => api.get("/projects", { params });
export const getAwards = (params) => api.get("/awards", { params });
export const getBlogPosts = (params) => api.get("/blog", { params });
export const submitContactForm = (data) => api.post("/contact", data);

export default api;
