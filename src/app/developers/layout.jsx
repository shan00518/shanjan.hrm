import { EmployeeFormProvider } from "../../contexts/EmployeeFormContext";

export default function DevelopersLayout({ children }) {
  return <EmployeeFormProvider>{children}</EmployeeFormProvider>;
}