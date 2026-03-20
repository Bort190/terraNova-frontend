import {useEffect, useState} from "react";
import {getAllEmployees} from "@/axios/Endpoints/getAllEmployees.tsx";
import type {Employee} from "@/axios/Types/EmployeeType.ts";
import {Card} from "@/components/ui/card.tsx";

const EmployeesListPage = () => {
    const [employees, setEmployees] = useState<Employee[] | null>(null)
    useEffect(() => {
        getAllEmployees().then((res) => {
                if (res.success) {
                    setEmployees(res.data)
                } else {
                    console.log(res.error)
                }
            }
        )
    }, []);

    return (
        <Card className={"w-full h-full bg-red-100"}>
            <table>
                <thead>
                <tr>
                    <td>ID</td>
                    <td>Vorname</td>
                    <td>Nachname</td>
                </tr>
                </thead>
                <tbody>
                {employees?.map((employee)=>(
                    <tr key={employee.id}>
                        <td>{employee.id}</td>
                        <td>{employee.first_name}</td>
                        <td>{employee.last_name}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </Card>
    );
};

export default EmployeesListPage;