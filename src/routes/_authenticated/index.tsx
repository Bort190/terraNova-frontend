import {createFileRoute} from '@tanstack/react-router'
import {DashboardPage} from "@/Pages/Dashboard/DashboardPage.tsx";

export const Route = createFileRoute('/_authenticated/')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <div className="flex w-full min-h-full">
            <DashboardPage/>
        </div>
    )
}
