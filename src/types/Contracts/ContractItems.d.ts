import { EmployeeType } from "../Employee";
import { Media } from "../Media";
import { Employee } from "../User/user";
import { DbOptionType } from "../other/DbOptionType";

export interface ContractItem {
  id: number;
  name: string;
  description: string;
  manager_id: number;
  manager?: DbOptionType;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
  contract_id: number;
  media?: Media[];
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
  achievement_percentage?: string;
  processing?: TransactionType[];
}
