import { createFileRoute } from '@tanstack/react-router'
import {CreateAppointmentPage} from "../../Pages/Appointments/createAppointmentPage.tsx";

export const Route = createFileRoute('/appointments/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return <CreateAppointmentPage />
}
