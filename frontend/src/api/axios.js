import axios from "axios";

let BASE_URL;

if (process.env.NODE_ENV === "production") {
  BASE_URL = "http://backend:8094";
} else {
  BASE_URL = "http://localhost:8085";
}

// Create an axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export default api;
