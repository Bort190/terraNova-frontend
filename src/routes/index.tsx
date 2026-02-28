import {createFileRoute, redirect} from '@tanstack/react-router'
import {DashboardPage} from "@/Pages/Dashboard";

export const Route = createFileRoute('/')({
    beforeLoad: ({ context }) => {
        if (!context.auth.isLoggedIn) {
            throw redirect({ to: '/login' })
        }
    },
    component: RouteComponent,
})

function RouteComponent() {


    return (
        <DashboardPage/>
    )
}
