
const AUTH_BASE = "/auth";
const CHAT_BASE = "/chat";

export const API_ENDPOINTS = {
  AUTH: {
    BASE: AUTH_BASE,
    REGISTER: `${AUTH_BASE}/register`,
    LOGIN: `${AUTH_BASE}/login`,
  },

  CHAT: {
    BASE: CHAT_BASE,
    SEND_MESSAGE: `${CHAT_BASE}`,
  },
};