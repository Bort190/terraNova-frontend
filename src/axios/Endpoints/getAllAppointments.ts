import api from "../client.ts";
import type {LaravelResource} from "@/axios/Types/ApiResult.ts";
import type {AppointmentType} from "@/axios/Types/AppointmentType.ts";


export async function getAllAppointments(): Promise<AppointmentType[]> {

        const res = await api.get<LaravelResource<AppointmentType[]>>('/appointments');
        return  res.data.data;

}
