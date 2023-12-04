import { ProceduresModelTypeCode } from "./ProceduresModel";

export interface Step {
  id: number;
  employee_id: number | null;
  department_id: number | null;
  action: 0 | 1 | 2 | 3;
  // 1 acception, 2 Approval, 3 Both
  duration: number;
  model: ProceduresModelTypeCode;
  type: number;
  deleted_at?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}
