import api from "../client.ts";
import axios from "axios";


type CreateAppointmentType = {
    name: string;
    type?: string;
    description?: string;
    start_date?: Date;
    duration?: number;
}


export async function createAppointment(data: CreateAppointmentType) {
    try {

        console.log("submitted", data);
        await api.post('/horses', data);


        //  return {success: true};

    } catch (err) {
        const message = axios.isAxiosError(err)
            ? err.response?.data?.message ?? err.message
            : "Unknown error";
        return {success: false, error: message};
    }
}
