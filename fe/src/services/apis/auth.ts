import axiosInstance from ".."
import type { LoginSchema, RegisterSchema } from "@/schemas/common"
import { API_ENDPOINTS } from "@/services/apis/endpoints"

const { AUTH } = API_ENDPOINTS;

async function signup(credentials: Omit<RegisterSchema,"confirmPassword">) {
  try {
    return await axiosInstance.post(AUTH.register(), credentials, { withCredentials: true });
  } catch (error) {
    console.log("ERROR", error)
  }
}


async function login(credentials: LoginSchema) {
  try {
    return await axiosInstance.post(AUTH.login(), credentials, { withCredentials: true });
  } catch (error) {
    console.log("ERROR", error)
  }
}

async function logout(){
  try {
    return await axiosInstance.post(AUTH.logout(), {}, { withCredentials: true });
  } catch (error) {
    console.log("ERROR", error)
  }
}

export { signup, login, logout }
