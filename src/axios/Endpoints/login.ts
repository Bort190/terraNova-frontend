import api from "@/axios/client.ts";
import axios from "axios";

export async function login(email: string, password: string) {

    try {
        await axios.get(`${import.meta.env.VITE_API_URL}/sanctum/csrf-cookie`, {
            withCredentials: true
        });
        const res = await api.post('/login', {
            email,
            password
        });
        return {success: true, data: res.data.data};
    } catch (err) {
        const message = axios.isAxiosError(err)
            ? err.response?.data?.message ?? err.message
            : "Unknown error";
        return {success: false, error: message};
    }
}
