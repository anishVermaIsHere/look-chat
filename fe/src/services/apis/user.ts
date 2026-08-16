import axiosInstance from ".."
import { API_ENDPOINTS } from "@/services/apis/endpoints"

const { USER } = API_ENDPOINTS;

async function getSelf() {
  try {
    return await axiosInstance.get(USER.profile(), { withCredentials: true });
  } catch (error) {
    console.log("ERROR", error);
    return null
  }
}

async function getUserChats(userId: string) {
  try {
    return await axiosInstance.get(USER.chats(userId), { withCredentials: true });
  } catch (error) {
    console.log("ERROR", error);
    return null;
  }
}

export {
  getSelf,
  getUserChats
}