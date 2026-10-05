import DataTable from "@/components/Table/Table.tsx";
import {Card, CardContent, CardHeader} from "@/components/ui/card.tsx";
import type {HorseType} from "@/axios/Types/HorseType.ts";
import type {ColumnDef} from "@tanstack/react-table";
import {Button} from "@/components/ui/button.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import type {AppointmentType} from "@/axios/Types/AppointmentType.ts";
import {useEffect, useState} from "react";
import {getAllAppointments} from "@/axios/Endpoints/getAllAppointments.ts";
import {handleAxiosError} from "@/axios/utils.ts";

const dummyData: HorseType[] = [
    {
        id: 1,
        name: "Pferd 1",
        age: 2,
        type: "schwarz"
    },
    {
        id: 2,
        name: "Pferd 2",
        age: 4,
        type: "weiß"
    },
    {
        id: 3,
        name: "Pferd 3",
        age: 4,
        type: "weiß"
    },
    {
        id: 4,
        name: "Pferd 4",
        age: 4,
        type: "weiß"
    },
    {
        id: 5,
        name: "Pferd 5",
        age: 4,
        type: "weiß"
    }
]

const columns: ColumnDef<HorseType>[] = [
    {
        header: () => (<Button variant={"ghost"}>Name</Button>),
        accessorKey: 'name',
    },
    {
        header: () => (<Button variant={"ghost"}>Typ</Button>),
        accessorKey: 'type',
    }
]


const appointmentColumns: ColumnDef<AppointmentType>[] = [
    {
        header: () => (<Button variant={"ghost"}>Name</Button>),
        accessorKey: 'name'
    },
    {
        header: () => (<Button variant={"ghost"}>Typ</Button>),
        accessorKey: 'type'
    },
    {
        header: () => (<Button variant={"ghost"}>Datum</Button>),
        accessorKey: 'starts_at',
        accessorFn: (value) => new Date(value.starts_at).toLocaleDateString()
    }
]

export const DashboardPage = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [appointments, setAppointments] = useState<AppointmentType[]>([])
    useEffect(() => {

        const fetchAppointmentData = async () => {
            try {
                const appointments = await getAllAppointments();
                setAppointments(appointments.splice(0, 6))
                setIsLoading(false);
            } catch (e) {
                handleAxiosError(e)
                console.error(e)
            }
        }

        void fetchAppointmentData()

    }, []);


    return (
        <div className="w-full">
            <CardHeader>Dashboard</CardHeader>
            <div className={"flex gap-2"}>
                <Card className={"w-1/4"}>
                    <CardHeader>Übersicht</CardHeader>
                    <DataTable data={dummyData} columns={columns}/>
                </Card>

                <Card className={"w-1/2"}>
                    {isLoading ?
                        <>
                            <CardHeader>
                                <Skeleton className="h-4 w-1/3"/>
                            </CardHeader>
                            <CardContent>
                                <Skeleton className="aspect-video w-full"/>
                            </CardContent>
                        </>
                        :
                        <>
                            <CardHeader>Anstehende Termine</CardHeader>
                            <CardContent>
                                <DataTable data={appointments} columns={appointmentColumns}/>
                            </CardContent>
                        </>}
                </Card>

            </div>
        </div>
    );
};