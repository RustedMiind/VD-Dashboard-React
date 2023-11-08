import { EmployeeType } from "./Employee";

export interface EmployeeRequest {
  id: number;
  requestable_id: number;
  employee_id: number;
  created_at: string;
  updated_at: string;
  employee: EmployeeType;
}
