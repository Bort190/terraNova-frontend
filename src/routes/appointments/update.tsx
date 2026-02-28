import { createFileRoute } from '@tanstack/react-router'
import {UpdateAppointmentPage} from "../../Pages/Appointments/updateAppointmentPage.tsx";

export const Route = createFileRoute('/appointments/update')({
  component: RouteComponent,
})

function RouteComponent() {
  return <UpdateAppointmentPage/>
}
