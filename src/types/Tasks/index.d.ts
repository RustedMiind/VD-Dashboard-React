import { TaskType } from "./Type.enum";

export type EmployeeTask = {
  id: number;
  taskable_type: TaskType;
  taskable_id: number;
  type: number;
  employee_id: number;
  created_at: string;
  updated_at: string;
  refrence_number: string;
  detailed_type?: string;
  last_status?: string;

  // Predict
  manager_name?: string;
  client_name?: string;
  apply_date?: string;
};
