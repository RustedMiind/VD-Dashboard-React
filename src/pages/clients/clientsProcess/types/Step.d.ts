export interface StepType {
  id?: number;
  employee_id: number;
  department_id: number | null | 0;
  accept?: 0 | 1;
  approval?: 0 | 1;
  period: number;
  form_id: number;
  branch_id: number;
  type_id: number;
  deleted_at?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}
