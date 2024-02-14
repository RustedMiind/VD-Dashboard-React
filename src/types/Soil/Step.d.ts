import { Department } from "../Department";
import { EmployeeType } from "../Employee";
import { SoilRequest } from "./SoilRequest";
export type Step = {
  accept: number;
  approval: number;
  branch_id: number;
  collection: number;
  created_at: string;
  deleted_at: string;
  department_id: number;
  employee_id: number;
  employees: EmployeeType;
  form: Form;
  form_id: number;
  id: number;
  order_steps_form: OrderStepsForm;
  period: number;
  step_number: number;
  type_id: number;
  updated_at: string;
  is_current: boolean;
  has_accses: boolean;
};

type Form = {
  created_at: string;
  deleted_at: string;
  id: number;
  name: string;
  order_type_id: number;
  updated_at: string;
};

type OrderStepsForm = {
  client_id: number;
  collection: number;
  created_at: string;
  deleted_at: string;
  department: Department;
  department_id: number;
  employee: EmployeeType;
  employee_id: number;
  form_id: number;
  id: number;
  last_status_id: number;
  note: string;
  order: SoilRequest;
  order_id: number;
  order_step_id: number;
  status: number;
  step_number: number;
  type_id: number;
  updated_at: string;
};
