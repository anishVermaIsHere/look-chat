import axiosInstance from "../interceptor"
import type { SendMessageSchema } from "@/schemas/common"
import { API_ENDPOINTS } from "@/services/apis/endpoints"

async function sendMessage(payload: SendMessageSchema) {
  try {
    return await axiosInstance.post(API_ENDPOINTS.CHAT.SEND_MESSAGE, payload, { withCredentials: true });
  } catch (error) {
    console.log("ERROR", error)
  }
}

export {
  sendMessage
}
