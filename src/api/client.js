import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("nexus_admin_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getServices = () => api.get("/services");
export const getProjects = (params) => api.get("/projects", { params });
export const getProjectBySlug = (slug) => api.get(`/projects/${slug}`);
export const getAwards = (params) => api.get("/awards", { params });
export const getBlogPosts = (params) => api.get("/blog", { params });
export const submitContactForm = (data) => api.post("/contact", data);

export const loginAdmin = (username, password) => api.post("/auth/login", { username, password });

export const createProject = (data) => api.post("/projects", data);
export const updateProject = (id, data) => api.put(`/projects/${id}`, data);
export const deleteProject = (id) => api.delete(`/projects/${id}`);

export const createService = (data) => api.post("/services", data);
export const updateService = (id, data) => api.put(`/services/${id}`, data);
export const deleteService = (id) => api.delete(`/services/${id}`);

export const createAward = (data) => api.post("/awards", data);
export const updateAward = (id, data) => api.put(`/awards/${id}`, data);
export const deleteAward = (id) => api.delete(`/awards/${id}`);

export const createBlogPost = (data) => api.post("/blog", data);
export const updateBlogPost = (id, data) => api.put(`/blog/${id}`, data);
export const deleteBlogPost = (id) => api.delete(`/blog/${id}`);

export default api;