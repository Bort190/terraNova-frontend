import { createFileRoute } from '@tanstack/react-router'
import {AppointmentsOverviewPage} from "@/Pages/Appointments/AppointmentsOverviewPage.tsx";

export const Route = createFileRoute('/_authenticated/appointments/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <AppointmentsOverviewPage />
}