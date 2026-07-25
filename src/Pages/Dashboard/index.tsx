import DataTable from "@/components/Table/Table.tsx";
import {Card, CardContent, CardHeader} from "@/components/ui/card.tsx";
import type {HorseType} from "@/axios/Types/HorseType.ts";
import type {ColumnDef} from "@tanstack/react-table";
import {Button} from "@/components/ui/button.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";

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

export const DashboardPage = () => {
    return (
        <div>
            <CardHeader>Dashboard</CardHeader>
            <div className={"flex gap-2"}>
                <Card className={"w-1/4"}>
                    <CardHeader>Übersicht</CardHeader>
                    <DataTable data={dummyData} columns={columns}/>
                </Card>
                <Card className="w-full max-w-xs">
                    <CardHeader>
                        <Skeleton className="h-4 w-2/3" />
                        <Skeleton className="h-4 w-1/2" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="aspect-video w-full" />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};