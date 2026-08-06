import {createFileRoute} from '@tanstack/react-router'
import {LoginPage} from "@/Pages/Login";

export const Route = createFileRoute('/login')({

    component: RouteComponent,
})

function RouteComponent() {
    return (
        <div className="flex w-full min-h-screen items-center justify-center">
            <LoginPage/>
        </div>
        )
}
