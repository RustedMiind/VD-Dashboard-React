import { Contract } from "../Contracts";
import { SoilOrder } from "../Soil/SoilRequest";
import { Client } from "./Client";

export interface ClientDetailsType {
  contract_end: number;
  contract_late: number;
  contract_stop: number;
  contract_work: number;
  data?: (Contract & {
    remaining_time?: string;
    completion_rate?: string;
    soil_order: SoilOrder;
  })[];
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
