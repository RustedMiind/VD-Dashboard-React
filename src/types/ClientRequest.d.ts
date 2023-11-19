import { Branch, Contract } from "./";

export interface ClientRequest {
  id: number;
  name: string;
  phone: string;
  email: string;
  card_id: string;
  branch: Branch;
  contracts: Contract[];
  Contract_status: string;
}
