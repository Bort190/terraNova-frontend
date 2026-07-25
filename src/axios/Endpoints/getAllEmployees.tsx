import api from "@/axios/client.ts";
import type {Employee} from "@/axios/Types/EmployeeType.ts";
import type {ApiResult, LaravelResource} from "@/axios/Types/ApiResult.ts";
import {handleAxiosError} from "@/axios/utils.ts";

export async function getAllEmployees(): Promise<ApiResult<Employee[]>> {
    try {
        const res = await api.get<LaravelResource<Employee[]>>('/employees');
        return {status: true, data: res.data.data};
    } catch (err) {
        return handleAxiosError(err);
    }
}

