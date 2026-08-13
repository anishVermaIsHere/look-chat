import axiosInstance from ".."
import type { LoginSchema } from "@/schemas/common"
import { API_ENDPOINTS } from "@/services/apis/endpoints"

const { AUTH } = API_ENDPOINTS;

async function login(credentials: LoginSchema) {
  try {
    return await axiosInstance.post(AUTH.LOGIN, credentials, { withCredentials: true });
  } catch (error) {
    console.log("ERROR", error)
  }
}

async function logout(){
  try {
    return await axiosInstance.post(AUTH.LOGOUT, {}, { withCredentials: true });
  } catch (error) {
    console.log("ERROR", error)
  }
}

export { login, logout }
