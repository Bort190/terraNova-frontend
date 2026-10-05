import {createFileRoute} from '@tanstack/react-router'
import {HorsesOverviewPage} from "@/Pages/Horses/HorsesOverviewPage.tsx";

export const Route = createFileRoute('/_authenticated/horses/')({
    component: RouteComponent,
})

function RouteComponent() {
    return <HorsesOverviewPage/>
}
