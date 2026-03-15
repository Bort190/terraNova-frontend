import {StrictMode} from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {routeTree} from './routeTree.gen'
import {RouterProvider, createRouter} from '@tanstack/react-router'
import {SidebarProvider} from "@/components/ui/sidebar.tsx";
import AuthProvider, {type AuthContextType, useAuth} from "@/utils/AuthProvider.tsx";

const router = createRouter({
    context: {
        auth: undefined!
    },
    routeTree
})

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}
/* eslint-disable react-refresh/only-export-components */
const InnerApp = () => {
    const auth: AuthContextType = useAuth();
    return (
        <SidebarProvider>
            <RouterProvider router={router} context={{auth}}/>
        </SidebarProvider>
    )
}

// Render the app
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
