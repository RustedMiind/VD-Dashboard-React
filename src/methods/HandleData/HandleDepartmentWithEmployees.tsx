import { DepartmentEmployee } from "../../types/DepartmentEmployee";

function HandleDepartmentWithEmployees(obj: []): DepartmentWithEmployeesType[] {
  const result = [];
  for (const departmentId in obj) {
    if (obj.hasOwnProperty(departmentId)) {
      const employees = obj[departmentId] as DepartmentEmployee[];
      if (employees.length) {
        result.push({
          departmentId: parseInt(departmentId),

          employees,
          departmentName: employees[0]?.departmentName,
        });
      }
    }
  }
  return result;
}

export type DepartmentWithEmployeesType = {
  departmentId: number;
  departmentName: string;
  employees: DepartmentEmployee[];
};

export default HandleDepartmentWithEmployees;
