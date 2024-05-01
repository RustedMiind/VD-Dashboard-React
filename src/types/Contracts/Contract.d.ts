import { Branch } from "../Branches";
import { EmployeeType } from "../Employee";
import { ContractAttachment } from "./ContractAttachment";
import { ContractPayment } from "./ContractPayment";
import { ContractTask } from "./ContractTask";
import { ContractType } from "./ContractType";
import { ContractItem } from "./ContractItems";
import { DB_Boolean } from "../DB_Boolean";
import { Client } from "../Clients";
import { Employee } from "../User/user";
import { ContractDetails } from "./ContractDetails";

export interface Contract {
  id: number;
  code: string;
  period: string;
  date: string;
  end_date: string; // Resolve conflict in property names
  card_image?: string; // Optional property
  details: string;
  owner: string;
  engineering_office: string;
  type: ContractType; // Resolving property type conflict
  amount: number; // Adjusting type to handle both string and number
  contract_type_id: number;
  client_id: number;
  branch_id: number;
  management_id: number; // Adjusting type to handle both string and number
  status_id: number; // Resolving property type conflict
  employee_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: null; // Resolving property type conflict
  last_status: string;
  order_id?: number;
  payed?: number;
  remaining?: number;
  is_done: DB_Boolean;
  dateEnd: string; // Resolving conflict in property names
  end_date_period: number;
  Contract_status: number | string; // Resolving property type conflict
  client?: Client; // Resolving optional property conflict
  employee?: EmployeeType; // Resolving optional property conflict
  tasks?: ContractTask[]; // Resolving optional property conflict
  payments?: ContractPayment[]; // Resolving optional property conflict
  management?: Management; // Resolving optional property conflict
  branch?: Branch; // Assuming both interfaces use the same type
  levers?: ContractAttachment[]; // Resolving optional property conflict
  contract_details?: ContractDetails; // Assuming both interfaces use the same type
  contract_items?: ContractItem[]; // Resolving optional property conflict
  contract_direct_entry_sub_type?: ContractDirectEntrySubType; // Assuming both interfaces use the same type
  achievement_percentage: number;
  contract_type?: number;
}

type Management = {
  active: number;
  branch_id: number;
  branch?: Branch;
  childrens: Childrens[];
  created_at: string;
  deleted_at: null;
  directChildren: number;
  id: number;
  manager_id: number;
  name: string;
  note: null;
  parent_id: null;
  type: string;
  updated_at: string;
};
export type Childrens = {
  active: number;
  branch_id: number;
  childrens: Childrens[];
  created_at: string;
  deleted_at: null;
  directChildren: number;
  id: number;
  manager_id: number;
  name: string;
  note: null;
  parent_id: number;
  type: string;
  updated_at: string;
};

export interface ContractDirectEntrySubType {
  id: number;
  direct_entry_type_id?: number;
  name: string;
  contract_direct_entry_type?: ContractDirectEntryType;
}

export interface ContractDirectEntryType {
  id: number;
  name: string;
}
