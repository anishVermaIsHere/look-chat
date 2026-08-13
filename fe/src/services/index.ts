import { AppConfig } from "@/config/app-config"
import axios from "axios"

const axiosInstance = axios.create({
  baseURL: `${AppConfig.baseUrl}/api/v1`,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default axiosInstance;