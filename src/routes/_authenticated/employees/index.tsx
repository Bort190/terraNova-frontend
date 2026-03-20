import { createFileRoute } from '@tanstack/react-router'
import EmployeesListPage from "@/Pages/Employees/EmployeesListPage.tsx";

export const Route = createFileRoute('/_authenticated/employees/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <EmployeesListPage />
}
