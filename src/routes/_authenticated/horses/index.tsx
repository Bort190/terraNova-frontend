import {createFileRoute} from '@tanstack/react-router'
import {OverviewPage} from "@/Pages/Horses";

export const Route = createFileRoute('/_authenticated/horses/')({
    component: RouteComponent,
})

function RouteComponent() {
    return <OverviewPage/>
}
