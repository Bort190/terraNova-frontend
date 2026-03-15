import {createFileRoute} from '@tanstack/react-router'
import {CreateHorsePage} from "@/Pages/Horses/CreateHorsePage.tsx";

export const Route = createFileRoute('/_authenticated/horses/create')({
    component: RouteComponent,
})

function RouteComponent() {
    return <CreateHorsePage/>
}
