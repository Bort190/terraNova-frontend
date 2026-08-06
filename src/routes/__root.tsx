import {createRootRouteWithContext, Outlet} from '@tanstack/react-router'
import {TanStackRouterDevtools} from '@tanstack/react-router-devtools'
import type {AuthContextType} from "@/Providers/AuthProvider.tsx";

type MyRouterContext = {
    auth: AuthContextType;
}

const RootLayout = () => (

    <>
        <Outlet/>
        <TanStackRouterDevtools position={"bottom-right"}/>
    </>
)

export const Route = createRootRouteWithContext<MyRouterContext>()({component: RootLayout})