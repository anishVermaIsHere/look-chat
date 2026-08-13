import axiosInstance from ".."
import { API_ENDPOINTS } from "@/services/apis/endpoints"

const { USER } = API_ENDPOINTS;

async function getSelf() {
  try {
    return await axiosInstance.get(USER.PROFILE, { withCredentials: true });
  } catch (error) {
    console.log("ERROR", error);
    return null
  }
}

export {
  getSelf
}