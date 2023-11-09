export interface Step {
  id: number;
  employee_id: number;
  department_id: number;
  action: 0 | 1 | 2 | 3;
  // 1 acception, 2 Approval, 3 Both
  duration: number;
  model: 1 | 2 | 3 | 4;
  type: number;
  deleted_at?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}
