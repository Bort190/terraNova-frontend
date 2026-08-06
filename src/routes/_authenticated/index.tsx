import {createFileRoute} from '@tanstack/react-router'
import {DashboardPage} from "@/Pages/Dashboard";

export const Route = createFileRoute('/_authenticated/')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <div className="flex w-full min-h-screen">
            <DashboardPage/>
        </div>
    )
}
