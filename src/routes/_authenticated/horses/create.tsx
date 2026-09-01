import {createFileRoute} from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/horses/create')({
    component: RouteComponent,
})

function RouteComponent() {
    return <div>Hier entsteht eine Seite</div>
}
