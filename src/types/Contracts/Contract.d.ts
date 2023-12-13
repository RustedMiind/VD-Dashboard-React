import { Branch } from "../Branch";
import { EmployeeType } from "../Employee";
import { ContractAttachment } from "./ContractAttachment";
import { ContractPayment } from "./ContractPayment";
import { ContractTask } from "./ContractTask";
import { ContractType } from "./ContractType";

export interface Contract {
  id: number;
  code: string;
  period: string;
  date: string;
  details: string;
  type: ContractType;
  amount: number;
  contract_type_id: number;
  client_id: number;
  branch_id: number;
  management_id: number;
  status_id: number;
  employee_id: number;
  created_at: string;
  updated_at: string;
  dateEnd: string;
  end_date_period: number;
  employee?: EmployeeType;
  tasks?: ContractTask[];
  payments?: ContractPayment[];
  branch?: Branch;
  client?: ClientRequest;
  levers?: ContractAttachment[];
  card_image?: string;
  Contract_status: string;
  // deleted_at: null;
  // end_date: null;
  // management: null;
}
