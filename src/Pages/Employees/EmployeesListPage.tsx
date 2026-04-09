import {useState} from "react";
import {createColumnHelper, flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";

//TData
type User = {
    firstName: string
    lastName: string
    age: number
    visits: number
    progress: number
    status: string
}

const dummyData: User[] =
    [
        {
            "firstName": "Tanner",
            "lastName": "Linsley",
            "age": 33,
            "visits": 100,
            "progress": 50,
            "status": "Married"
        },
        {
            "firstName": "Kevin",
            "lastName": "Vandy",
            "age": 27,
            "visits": 200,
            "progress": 100,
            "status": "Single"
        }
    ]


const columnHelper = createColumnHelper<User>()

const columns = [
    {
        accessorKey: 'firstName',
    },
    columnHelper.accessor((row) => row.lastName, {
        id: 'lastName',
        cell: (info) => <i>{info.getValue()}</i>,
        header: () => <span>Last Name</span>,
    }),
    columnHelper.accessor('age', {
        header: () => 'Age',
        cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor('visits', {
        header: () => <span>Visits</span>,
    }),
    columnHelper.accessor('status', {
        header: 'Status',
    }),
    columnHelper.accessor('progress', {
        header: 'Profile Progress',
    }),
]

const EmployeesListPage = () => {
    const [data] = useState<User[]>(dummyData)
    const [hasFooter] = useState<boolean>(false)


    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    // const [employees, setEmployees] = useState<Employee[] | null>(null)
    // useEffect(() => {
    //     getAllEmployees().then((res) => {
    //             if (res.success) {
    //                 setEmployees(res.data)
    //             } else {
    //                 console.log(res.error)
    //             }
    //         }
    //     )
    // }, []);

    return (
        <div className="p-2 bg-gray-300">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext(),
                                        )}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
                {hasFooter && <TableFooter>
                    {table.getFooterGroups().map((footerGroup) => (
                        <TableRow key={footerGroup.id}>
                            {footerGroup.headers.map((header) => (
                                <TableHead key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.footer,
                                            header.getContext(),
                                        )}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableFooter>}
            </Table>
        </div>
    )

};

export default EmployeesListPage;