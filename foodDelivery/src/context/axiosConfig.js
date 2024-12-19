import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:4000", // Update with your API base URL
});

// Add a request interceptor to include the token in all requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("Token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response, // Pass successful responses as is
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized errors
      alert("Your session has expired. Please log in again.");
      localStorage.removeItem("Token"); // Clear token from localStorage
      window.location.href = "/"; // Optional: Redirect to login page
    }
    return Promise.reject(error);
  }
);

export { axiosInstance };
