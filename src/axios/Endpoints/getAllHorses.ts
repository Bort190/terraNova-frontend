import api from "../client.ts";
import type {HorseType} from "../Types/HorseType.ts";
import type {ApiResult, LaravelResource} from "@/axios/Types/ApiResult.ts";
import {handleAxiosError} from "@/axios/utils.ts";


export async function getAllHorses(): Promise<ApiResult<HorseType[]>> {
    try {
        const res = await api.get<LaravelResource<HorseType[]>>('/horses');
        return {status: true, data: res.data.data};
    } catch (err) {
        return handleAxiosError(err);
    }
}
