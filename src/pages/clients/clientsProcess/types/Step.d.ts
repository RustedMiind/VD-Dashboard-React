export interface StepType {
  employee_id: number;
  management_id: number;
  accept?: 0 | 1;
  approval?: 0 | 1;
  period: number;
  form_id: number;
  branch_id: number;
  deleted_at?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}
