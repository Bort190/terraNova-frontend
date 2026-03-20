import api from "@/axios/client.ts";
import axios from "axios";
import type {Employee} from "@/axios/Types/EmployeeType.ts";

type genericResponse<T> = {
    data: T
}

type Result<T> =
    | { success: true; data: T }
    | { success: false; error: string };

export async function getAllEmployees() {
    try {
        const res = await api.get<genericResponse<Employee[]>>('/employees');
        return {success: true, data: res.data.data};
    } catch (err) {
        const message = axios.isAxiosError(err)
            ? err.response?.data?.message ?? err.message
            : "Unknown error";
        return {success: false, error: message};
    }
}

