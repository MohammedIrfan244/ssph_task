import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if(error.response) {
            if (error.response.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                toast.error("Session expired. Please log in again.");
                window.location.href = "/auth/login";
            }
        }
        return Promise.reject(error);
    }
)

export default api;