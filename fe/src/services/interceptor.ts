import { AppConfig } from "@/config/app-config"
import axios from "axios"
import { refresh } from "./apis/auth";
// import useAuthStore as authStore from "@/store/auth"

const axiosInstance = axios.create({
    baseURL: AppConfig.baseUrl,
    headers: {
        'Content-Type': 'application/json'
    }
});

// const { setAuth, clearAuth } = authStore.getState();

// async function refreshAccessToken() {
//   const { refreshToken } = getAuthStorage("_auth");
//   if (refreshToken) {
//     const resp = await axios.post(
//       `${process.env.NEXT_PUBLIC_BASE_URL}/api/token/refresh/`,
//       {},
//       {
//         headers: {
//           Authorization: `Bearer ${refreshToken}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     setAuth({ refreshToken, accessToken: resp.data.access });
//     return resp.data.access;
//   } else {
//     throw new Error("Logout");
//     clearAuth();
//   }
// }

axiosInstance.interceptors.request.use(
  (request) => {
    // let accessToken = authStore.getState().accessToken;
    // if (!accessToken && typeof window !== "undefined") {
    //   accessToken = getAuthStorage("_auth")?.accessToken;
    // }
    // if (accessToken) {
    //   request.headers["Authorization"] = `Bearer ${accessToken}`;
    // }
    return request;
  },
  (err) => {
    return Promise.reject(err);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (err) => {
    const originalRequest = err.config;
    try {
      if (err?.response?.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;
        const newAccessToken = await refresh();
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      }
    } catch (error) {
      console.log("Error", error);
      // clearAuth();
      return Promise.reject(err);
    }
    return Promise.reject(err);
  }
);



export default axiosInstance;