import { Branch } from "./Branch";
import { Broker } from "./Brokers";
import { Contract } from "./Contract";

export interface ClientRequest {
  id: number;
  type: string;
  name: string;
  phone: string;
  email: string;
  card_id: string;
  branch_id: number;
  contracts: Contract[];
  branch: Branch;
  Contract_status: string;
  agent_name: string | null;
  letter_head: string;
  card_image: File;
  register_number: null;
  status: null;
  broker: null;
  status_id: null;
  broker_id: null;
}
