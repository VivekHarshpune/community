// src/axiosConfig.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // This uses the base URL from the .env file
  headers: {
    'Content-Type': 'application/json', // Ensures the request body is in JSON format
  },
});

export default axiosInstance;
