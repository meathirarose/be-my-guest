import axios from "axios";
import { logout } from "../redux/user/userSlice";
import store from "../redux/store";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

// Response interceptor to handle token expiration
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log("original request---------------------------------------------",originalRequest);

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      console.log("before---------------------------------------------");

      try {
        console.log("star generating---------------------------------------");

        const response = await axios.post(
          "http://localhost:4000/user-service/api/users/refresh-token",
          {},
          {
            withCredentials: true,
          }
        );
        const newAccessToken = response.data.accessToken;
        console.log("new access token --------------------------------------", newAccessToken);

        return apiClient(originalRequest);
      } catch (refreshError) {
        console.log("refresh failed ------------------------------------------");
        store.dispatch(logout());
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
