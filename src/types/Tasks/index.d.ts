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
};
