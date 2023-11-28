import { EmployeeType } from "../Employee";

export interface ContractTask {
  id: number;
  name: string;
  period: number;
  amount: number;
  employees?: EmployeeType;
  employee_id: number;
  contract_id: number;
  created_at: string;
  updated_at: string;
  // deleted_at: null;
}
