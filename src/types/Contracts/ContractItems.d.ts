import { EmployeeType } from "../Employee";
import { Employee } from "../User/user";

export interface ContractItem {
  id: number;
  name: string;
  description: string;
  manager_id: number;
  manager: { id: number; name: string };
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
  contract_id: number;
  media: Medum2[];
  contract_item_employees?: ContractItemEmployee[];
  contract_sub_items: ContractSubItem[];
}

export interface ContractItemEmployee {
  id: number;
  contract_item_id: number;
  employee_id: number;
  created_at: string;
  updated_at: string;
  employee?: EmployeeType;
}
export interface ContractSubItem {
  id: number;
  contract_item_id: number;
  name: string;
  employee_id: number;
  is_progress_bar: number;
  is_processing: number;
  is_attachment: number;
  is_mission: number;
  is_letter: number;
  created_at: string;
  updated_at: string;
}
