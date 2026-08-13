
const AUTH_BASE = "/auth";
const CHAT_BASE = "/chat";
const USER_BASE = "/users";

export const API_ENDPOINTS = {
  AUTH: {
    BASE: AUTH_BASE,
    REGISTER: `${AUTH_BASE}/register`,
    LOGIN: `${AUTH_BASE}/login`,
    LOGOUT: `${AUTH_BASE}/logout`
  },
  USER: {
    PROFILE: `${USER_BASE}/profile`
  },
  CHAT: {
    BASE: CHAT_BASE,
    SEND_MESSAGE: `${CHAT_BASE}`,
  },
};