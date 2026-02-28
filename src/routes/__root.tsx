import {createRootRoute, Outlet} from '@tanstack/react-router'
import {TanStackRouterDevtools} from '@tanstack/react-router-devtools'
import {AppSidebar} from "@/components/AppSidebar.tsx";
import {SidebarInset, SidebarTrigger} from "@/components/ui/sidebar.tsx";
import Container from "@/components/Container.tsx";

const RootLayout = () => (

    <div className="flex h-screen w-full">
        <AppSidebar/>
        <SidebarInset>
            <main className="flex flex-col flex-1 overflow-auto">
                <SidebarTrigger/>
                <Container>
                    <Outlet/>
                </Container>
            </main>
        </SidebarInset>

        <TanStackRouterDevtools/>
    </div>
)

export const Route = createRootRoute({component: RootLayout})