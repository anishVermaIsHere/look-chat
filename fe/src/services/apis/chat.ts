import axiosInstance from ".."
import type { SendMessageSchema } from "@/schemas/common"
import { API_ENDPOINTS } from "@/services/apis/endpoints"

const { CHAT } = API_ENDPOINTS;

async function sendMessage(payload: SendMessageSchema) {
  try {
    return await axiosInstance.post(CHAT.sendMessage(), payload, { withCredentials: true });
  } catch (error) {
    console.log("ERROR", error);
  }
}

async function deleteChat(chatId: string){
  try {
    return await axiosInstance.delete(CHAT.deleteChat(chatId), { withCredentials: true })
  } catch(error)  {
    console.log("ERROR", error);
  }
}

export {
  sendMessage,
  deleteChat
}
