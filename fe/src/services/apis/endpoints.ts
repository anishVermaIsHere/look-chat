
const AUTH_BASE = "/auth";
const CHAT_BASE = "/chat";
const USER_BASE = "/users";

export const API_ENDPOINTS = {
  AUTH: {
    base: AUTH_BASE,
    register: () => `${AUTH_BASE}/register`,
    login: () => `${AUTH_BASE}/login`,
    logout: () => `${AUTH_BASE}/logout`
  },
  USER: {
    base: USER_BASE,
    profile: () => `${USER_BASE}/profile`,
    chats: (userId: string)=> `${USER_BASE}/${userId}/chats`
  },
  CHAT: {
    base: CHAT_BASE,
    sendMessage: () => CHAT_BASE,
    deleteChat: (chatId: string) => `${CHAT_BASE}/${chatId}`
  },
};