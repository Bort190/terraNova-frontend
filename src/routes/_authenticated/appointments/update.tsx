import { createFileRoute } from '@tanstack/react-router'
import {UpdateAppointmentPage} from "@/Pages/Appointments/UpdateAppointmentPage.tsx";

export const Route = createFileRoute('/_authenticated/appointments/update')({
  component: RouteComponent,
})

function RouteComponent() {
  return <UpdateAppointmentPage/>
}
