import { EmployeeType } from "../Employee";
import { Media } from "../Media";
import { Employee } from "../User/user";
import { DbOptionType } from "../other/DbOptionType";
import { TransactionType } from "./ContractTransactionAttachment";

export interface SystemLogType {
  created_at: string;
  id: number;
  laravel_through_key: number;
  modelable_id: number;
  modelable_type: string;
  name: string;
  time: string;
  updated_at: string;
  user_id: number;
}

export interface ContractItem {
  id: number;
  name: string;
  description: string;
  achievement_percentage?: number;
  manager_id?: number;
  manager?: EmployeeType;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
  contract_id: number;
  media?: Media[];
  contract_item_employees?: ContractItemEmployee[];
  contract_sub_items: ContractSubItem[];
  system_logs?: SystemLogType[];
}

export interface ContractItemEmployee {
  id: number;
  contract_item_id: number;
  employee_id: number;
  created_at: string;
  updated_at: string;
  employee?: EmployeeType;
}

export interface ContractSubItemAttachment {
  contract_sub_item_id: number;
  created_at: string;
  employee_id: number;
  id: number;
  media: Media[];
  updated_at: string;
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
  achievement_percentage?: number;
  processing?: TransactionType[];
  attachments?: ContractSubItemAttachment[];
}
