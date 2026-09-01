import {createFileRoute, Outlet, redirect, } from '@tanstack/react-router'
import { SidebarInset} from "@/components/ui/sidebar.tsx";
import {AppSidebar} from "@/components/AppSidebar.tsx";
import {Card} from "@/components/ui/card.tsx";

export const Route = createFileRoute('/_authenticated')({
    beforeLoad: ({ context }) => {
        if (!context.auth.currentUser) {
            throw redirect({
                to: '/login'
            })
        }
    },
  component: RouteComponent,
})

function RouteComponent() {


  return (
      <div className="flex w-full min-h-screen">
          <AppSidebar />
          <SidebarInset>
              <Card className={"p-6 m-3"}>
                  <Outlet />
              </Card>
          </SidebarInset>
      </div>

  )
}
