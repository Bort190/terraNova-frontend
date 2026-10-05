import { createFileRoute } from '@tanstack/react-router'
import EmployeesOverviewPage from "@/Pages/Employees/EmployeesOverviewPage.tsx";

export const Route = createFileRoute('/_authenticated/employees/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <EmployeesOverviewPage />
}
