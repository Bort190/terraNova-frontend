import { createFileRoute } from '@tanstack/react-router'
import {CreateAppointmentPage} from "@/Pages/Appointments/CreateAppointmentPage.tsx";

export const Route = createFileRoute('/_authenticated/appointments/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return <CreateAppointmentPage />
}
