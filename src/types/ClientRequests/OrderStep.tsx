export interface OrderStep {
  id: number;
  collection: number;
  step_number: number;
  branch_id: null | number;
  department_id: number;
  employee_id: number;
  status: number;
  accept: number;
  approval: number;
  period: number;
  form_id: number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
  employees: {
    id: number;
    name: string;
    first_name: string;
    second_name: string;
    last_name: string;
  };
  department: {
    id: number;
    name: string;
  };
}
