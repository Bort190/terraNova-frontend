import {createFileRoute, Outlet, redirect} from '@tanstack/react-router'
import { SidebarInset} from "@/components/ui/sidebar.tsx";
import {AppSidebar} from "@/components/AppSidebar.tsx";

export const Route = createFileRoute('/_authenticated')({
    beforeLoad: ({ context }) => {
        if (!context.auth.currentUser) {
            throw redirect({ to: '/login' })
        }
    },
  component: RouteComponent,
})

function RouteComponent() {
  return (
      <>
          <AppSidebar />
          <SidebarInset>
              <Outlet />
          </SidebarInset>
      </>

  )
}
