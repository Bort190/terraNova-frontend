import {type ColumnDef, flexRender, getCoreRowModel, type RowData, useReactTable} from "@tanstack/react-table";
import {Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {useState} from "react";

type DataTableProps<TData extends RowData> = {
    data: TData[];
    columns: ColumnDef<TData>[];
}

const DataTable = <TData extends RowData> ({data, columns}:DataTableProps<TData>) => {
    const [hasFooter] = useState<boolean>(false)

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })


    return (
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
    )
};

export default DataTable
