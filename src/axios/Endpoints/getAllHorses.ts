import api from "../client.ts";
import type {HorseType} from "../Types/HorseType.ts";
import axios from "axios";

type genericResponse<T> = {
    data: T
}

type Result<T> =
    | { success: true; data: T }
    | { success: false; error: string };

export async function getAllHorses(): Promise<Result<HorseType[]>> {
    try {
        const res = await api.get<genericResponse<HorseType[]>>('/horses');
        return {success: true, data: res.data.data};
    } catch (err) {
        const message = axios.isAxiosError(err)
            ? err.response?.data?.message ?? err.message
            : "Unknown error";
        return {success: false, error: message};
    }
}
