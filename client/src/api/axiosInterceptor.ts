import axios from "axios";
import { logout } from "../redux/user/userSlice";
import store from "../redux/store";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

// Response interceptor to handle token expiration
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log("original request---------------------------------------------",originalRequest);

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      console.log("before---------------------------------------------");

      try {
        console.log("start generating---------------------------------------");

        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/user-service/api/users/refresh-token`,
          {},
          {
            withCredentials: true,
          }
        );
        const newAccessToken = response.data.accessToken;
        console.log("new access token --------------------------------------", newAccessToken);

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.log("refresh failed ------------------------------------------");
        store.dispatch(logout());
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;