import axiosInstance from "../interceptor"
import type { LoginSchema } from "@/schemas/common"

async function login(credentials: LoginSchema) {
  try {
    return await axiosInstance.post(`/api/v1/auth/login`, credentials, { withCredentials: true });
  } catch (error) {
    console.log("ERROR", error)
  }
}

async function getSelf() {
  try {
    return await axiosInstance.get(`/api/v1/users/profile`, { withCredentials: true });
  } catch (error) {
    console.log("ERROR", error);
    return null
  }
}

async function refresh(){

}

async function logout(){

}

export { login, logout, refresh, getSelf }
