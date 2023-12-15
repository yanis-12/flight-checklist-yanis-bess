import axios from "axios";
import API_CONFIG from "../config/config";

const api = axios.create({
  baseURL: API_CONFIG.baseURL,
  headers: {
    "Content-Type": "application/json",
    token: API_CONFIG.token,
  },
});

export default api;
