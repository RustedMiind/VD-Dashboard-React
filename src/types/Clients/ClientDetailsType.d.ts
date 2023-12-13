import { Contract } from "../Contracts";
import { Branch } from "../Branch";
import { EmployeeType } from "../Employee";
import { ContractAttachment } from "./ContractAttachment";
import { ContractPayment } from "./ContractPayment";
import { ContractTask } from "./ContractTask";
import { ContractType } from "./ContractType";
import { Client } from "./Client";

export interface ClientDetailsType {
  contract_end: number;
  contract_late: number;
  contract_stop: number;
  contract_work: number;
  data: Contractuse[];
  payment: payment;
  msg: string;
}

interface payment {
  id: number;
  amount: number;
  amount_payment: number;
  amount_motabaky: number;
  amount_required: number;
}

interface Contractuse {
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
  client?: Client;
  levers?: ContractAttachment[];
  card_image?: string;
  Contract_status: string;
  // deleted_at: null;
  // end_date: null;
  // management: null;
}
