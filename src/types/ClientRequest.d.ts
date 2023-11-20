import { Branch } from "./Branch";
import { Contract } from "./Contract";

export interface ClientRequest {
  id: 1;
  type: "individual";
  name: "client";
  company_name: "company";
  phone: "01098281638";
  email: "client@vision.com";
  card_id: "1234567890";
  register_number: null;
  branch_id: 1;
  broker_id: null;
  status_id: null;
  Contract_status: "منتهي";
  broker: null;
  status: null;
  contracts: Contract[];
  branch: Branch;
  agent_name: string | null;
}
