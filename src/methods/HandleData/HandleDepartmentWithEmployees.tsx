import { EmployeeType } from "../../types";

function HandleDepartmentWithEmployees(obj: []): DepartmentWithEmployeesType[] {
  const result = [];
  for (const departmentId in obj) {
    if (obj.hasOwnProperty(departmentId)) {
      const employees = obj[departmentId] as EmployeeType[];
      result.push({
        departmentId,
        employees,
      });
    }
  }
  return result;
}

export type DepartmentWithEmployeesType = {
  departmentId: string;
  employees: EmployeeType[];
};

export default HandleDepartmentWithEmployees;
