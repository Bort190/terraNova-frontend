import {StrictMode, useEffect} from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {RouterProvider} from '@tanstack/react-router'
import {SidebarProvider} from "@/components/ui/sidebar.tsx";
import AuthProvider, {type AuthContextType, useAuth} from "@/Providers/AuthProvider.tsx";
import { router } from "./router";

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}
/* eslint-disable react-refresh/only-export-components */
const InnerApp = () => {
    const auth: AuthContextType = useAuth();
    useEffect(() => {
        router.invalidate();
    }, [auth.currentUser]);

    return (
        <SidebarProvider>
            <RouterProvider router={router} context={{auth}}/>
        </SidebarProvider>
    )
}

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement)
    root.render(
        <StrictMode>
            <AuthProvider>
                <InnerApp />
            </AuthProvider>
        </StrictMode>,
    )
}
