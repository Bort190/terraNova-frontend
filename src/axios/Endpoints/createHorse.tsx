import api from "../client.ts";
import {handleAxiosError} from "@/axios/utils.ts";


type CreateHorseType = {
    name: string;
    type?: string;
    date_of_birth?: Date|null;
}


export async function createHorse(data: CreateHorseType) {
    try {
        await api.post('/horses', data);


          return {success: true};

    } catch (err) {
        return handleAxiosError(err);
    }
}
