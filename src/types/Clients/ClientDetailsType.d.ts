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
  data: Contract[];
  payment?: Payment;
  msg: string;
  client?: Client;
}

interface Payment {
  id: number;
  amount: number;
  amount_payment: number;
  amount_motabaky: number;
  amount_required: number;
}
