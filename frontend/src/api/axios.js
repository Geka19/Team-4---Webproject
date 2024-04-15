// axios library for making HTTP requests
import axios from "./axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL, // API base URL
  headers: { "Content-Type": "application/json" }, // Default headers
});

export default axiosInstance;
