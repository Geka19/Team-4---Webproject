import axios from "axios";

// Use the environment variable to get the base URL
const BASE_URL = "http://localhost:8084";

// Create an axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export default api;
