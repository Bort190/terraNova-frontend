import {useEffect, useState} from "react";
import type {Employee} from "@/axios/Types/EmployeeType.ts";
import {getAllEmployees} from "@/axios/Endpoints/getAllEmployees.tsx";
import DataTable from "@/components/Table/Table.tsx";
import type {ColumnDef} from "@tanstack/react-table";
import {Button} from "@/components/ui/button.tsx";

const columns: ColumnDef<Employee>[] = [
    {
        header: () => (<Button variant={"ghost"} >Vorname</Button>),
        accessorKey: 'first_name',
    },
    {
        header: () => (<Button variant={"ghost"} >Nachname</Button>),
        accessorKey: 'last_name',
    }
]

const EmployeesListPage = () => {
    const [data, setData] = useState<Employee[]>([])


    useEffect(() => {
        getAllEmployees().then((res) => {
                if (res.status) {
                    setData(res.data)
                } else  {
                if (res.type === "validation") {
                    console.log(res.messages); // ✅ Objekt mit Feldern
                } else {
                    console.log(res.message);  // ✅ einfacher string
                }
            }
            }
        )
    }, []);

    return (
        <div className="p-2 bg-gray-100">
            <DataTable data={data} columns={columns} />
        </div>
    )

};

export default EmployeesListPage;