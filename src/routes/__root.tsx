import {createRootRouteWithContext, Outlet} from '@tanstack/react-router'
import {TanStackRouterDevtools} from '@tanstack/react-router-devtools'
import type {AuthContextType} from "@/utils/AuthProvider.tsx";


type MyRouterContext = {
    auth: AuthContextType;
}

const RootLayout = () => (

    <div className="flex h-screen w-full">
        <Outlet/>
        <TanStackRouterDevtools/>
    </div>
)

export const Route = createRootRouteWithContext<MyRouterContext>()({component: RootLayout})