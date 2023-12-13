import { Contract, ContractPayment } from "../Contracts";

export interface ClientDetailsType {
  contract_end: number;
  contract_late: number;
  contract_stop: number;
  contract_work: number;
  data: Contract[];
  payment: ContractPayment;
  msg: string;
}
