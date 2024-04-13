// axios library for making HTTP requests
import axios from "./axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL, // Set the base URL for all requests made through this instance
  headers: { "Content-Type": "application/json" }, // Ensure JSON content type for all requests
  withCredentials: true, // Include credentials in requests (e.g., cookies, authorization headers)
});

export default axiosInstance;
