import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api/`,
    withCredentials: true,
    timeout: 1000,
    headers: {
        "Content-Type": "application/json",
    }
});
export default api;
