import axios from "axios";

// Use the environment variable to get the base URL
const BASE_URL = process.env.REACT_APP_API_BASE_URL; // https://team4-api.sustainability.it.ntnu.no

// Create an axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export default api;
