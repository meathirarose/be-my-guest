import axios from "axios";
import { logout } from "../redux/user/userSlice";
import store from "../redux/store";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {

          await axios.post(
          `${import.meta.env.VITE_BASE_URL}/user-service/api/users/refresh-token`,
          {},
          {
            withCredentials: true,
          }
        );

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        store.dispatch(logout());
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;