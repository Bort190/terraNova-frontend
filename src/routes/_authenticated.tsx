import {createFileRoute, Outlet, redirect, useNavigate} from '@tanstack/react-router'
import { SidebarInset} from "@/components/ui/sidebar.tsx";
import {AppSidebar} from "@/components/AppSidebar.tsx";
import {useEffect} from "react";
import {useAuth} from "@/Providers/AuthProvider.tsx";

export const Route = createFileRoute('/_authenticated')({
    beforeLoad: ({ context }) => {
        if (context.auth.isLoading) return;
        if (!context.auth.currentUser) {
            throw redirect({
                to: '/login'
            })
        }
    },
  component: RouteComponent,
})

function RouteComponent() {
    const {isLoading, currentUser} = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (!isLoading && !currentUser) {
            navigate({ to: "/login" });
        }
    }, [currentUser, isLoading, navigate]);

  return (
      <>
          <AppSidebar />
          <SidebarInset>
              <Outlet />
          </SidebarInset>
      </>

  )
}
