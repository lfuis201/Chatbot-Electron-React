import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api", // URL base de tu backend
  timeout: 10000, // 10 segundos de timeout
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
