import {useEffect} from "react";
import {getAllAppointments} from "@/axios/Endpoints/getAllAppointments.ts";

export const AppointmentsOverviewPage = () => {


    useEffect(() => {

            getAllAppointments().then(appointment => console.log("appointments", appointment))


    }, []);



    return (
        <div>
            some appointments
        </div>
    );
};
