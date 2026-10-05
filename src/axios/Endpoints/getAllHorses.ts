import api from "../client.ts";
import type {HorseType} from "../Types/HorseType.ts";
import type { LaravelResource} from "@/axios/Types/ApiResult.ts";


export async function getAllHorses(): Promise<HorseType[]> {
    const res = await api.get<LaravelResource<HorseType[]>>('/horses');

    return res.data.data;
}
