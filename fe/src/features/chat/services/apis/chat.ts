import axiosInstance from "../../../../services"
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

async function getChat(chatId: string){
  try {
    return await axiosInstance.get(CHAT.getChat(chatId), { withCredentials: true })
  } catch (error) {
    console.log("ERROR", error);
  }
}

async function searchChat(q: string){
  try {
    return await axiosInstance.get(CHAT.searchChat(), { withCredentials: true, params: { q }})
  } catch(error){
    console.log("ERROR", error);
    throw error
  }
}

export {
  sendMessage,
  deleteChat,
  getChat,
  searchChat
}
