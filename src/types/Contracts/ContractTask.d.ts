import { EmployeeType } from "../Employee";

export interface ContractTask {
  id: string;
  name: string;
  period: string;
  amount: string;
  employees?: EmployeeType;
  employee_id: string;
  contract_id: string;
  created_at: string;
  updated_at: string;
  // deleted_at: null;
}
