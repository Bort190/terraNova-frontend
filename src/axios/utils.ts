import axios from "axios";
import type {FailResult} from "@/axios/Types/ApiResult.ts";

export function handleAxiosError(err: unknown): FailResult {
    if (axios.isAxiosError(err)) {
        if (err.response?.status === 422) {
            return {
                status: false,
                type: "validation",
                messages: err.response.data.errors,
            };
        }
        return {
            status: false,
            type: "server",
            message: err.response?.data?.message ?? err.message,
        };
    }
    return { status: false, type: "server", message: "Unknown error" };
}