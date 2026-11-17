import {useEffect, useState} from "react";
import {getAllAppointments} from "@/axios/Endpoints/getAllAppointments.ts";
import {Page, PageHeader} from "@/components/Page/Page.tsx";
import {Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {CirclePlus} from "lucide-react";
import {handleAxiosError} from "@/axios/utils.ts";
import type {AppointmentType} from "@/axios/Types/AppointmentType.ts";
import {CreateAppointmentForm} from "@/components/Forms/CreateAppointmentForm.tsx";

export const AppointmentsOverviewPage = () => {
    const [appointments, setAppointments] = useState<AppointmentType[]>([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const appointments = await getAllAppointments();

                setAppointments(appointments);

            } catch (error) {
                handleAxiosError(error);
                console.error(error);
            }
        };

        void fetchAppointments();
    }, []);


    return (
        <Page>
            <PageHeader title={"Termine"}/>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button size="icon" variant="secondary"><CirclePlus/></Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogTitle>Neuen Eintrag erstellen</DialogTitle>
                    <DialogDescription>
                        Erstellen Sie hier einen neuen Eintrag
                    </DialogDescription>
                    <CreateAppointmentForm onSuccess={() => setOpen(false)}/>
                </DialogContent>
            </Dialog>
            <div className={"grid grid-cols-5 gap-4"}>
                {appointments?.map((appointment) => (
                    <div key={appointment.id}>
                        <h1>{appointment.name}</h1>
                        <h2>{appointment.type}</h2>
                        <h3>{new Date(appointment.starts_at).toLocaleString()}</h3>
                    </div>

                ))}
            </div>
        </Page>
    );
};
