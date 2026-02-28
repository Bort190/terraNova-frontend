import {StrictMode} from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {routeTree} from './routeTree.gen'
import {RouterProvider, createRouter} from '@tanstack/react-router'
import {SidebarProvider} from "@/components/ui/sidebar.tsx";

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

// Render the app
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement)
    root.render(
        <StrictMode>
            <SidebarProvider>
                <RouterProvider router={router} context={{auth: {isLoggedIn: true}}}/>
            </SidebarProvider>
        </StrictMode>,
    )
}
