import { createFileRoute } from '@tanstack/react-router'
import {AppointmentListPage} from "../../Pages/Appointments/AppointmentListPage.tsx";

export const Route = createFileRoute('/appointments/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <AppointmentListPage />
}