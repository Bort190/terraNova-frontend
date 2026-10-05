import api from "@/axios/client.ts";
import type {Employee} from "@/axios/Types/EmployeeType.ts";
import type { LaravelResource} from "@/axios/Types/ApiResult.ts";

export async function getAllEmployees(): Promise<Employee[]> {
    const res = await api.get<LaravelResource<Employee[]>>("/employees");

    return res.data.data;
}

