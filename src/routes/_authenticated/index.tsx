import {createFileRoute} from '@tanstack/react-router'
import {DashboardPage} from "@/Pages/Dashboard";

export const Route = createFileRoute('/_authenticated/')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <DashboardPage/>
    )
}
