import {useEffect, useState} from "react";
import type {Employee} from "@/axios/Types/EmployeeType.ts";
import {getAllEmployees} from "@/axios/Endpoints/getAllEmployees.ts";
import DataTable from "@/components/Table/Table.tsx";
import type {ColumnDef} from "@tanstack/react-table";
import {Button} from "@/components/ui/button.tsx";
import {handleAxiosError} from "@/axios/utils.ts";

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

const EmployeesOverviewPage = () => {
    const [data, setData] = useState<Employee[]>([])

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const employees = await getAllEmployees();

                    setData(employees);

            } catch (error) {
                handleAxiosError(error);
                console.error(error);
            }
        };

        fetchEmployees();
    }, []);

    return (
        <div className="p-2 bg-gray-100">
            <DataTable data={data} columns={columns} />
        </div>
    )

};

export default EmployeesOverviewPage;