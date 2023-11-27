import { ClientRequest } from "./ClientRequest.d";
import { Broker } from "./Broker.d";
import { Branch } from "./Branch.d";
import { Branch, Broker, ClientRequest, EmployeeType } from "./";

export type ContractRequest = {
  id: number;
  code: number;
  period: number;
  date: number;
  // card_image: null;
  details: string;
  type: ContractType;
  amount: number;
  client?: ClientRequest;
  employee: EmployeeType;
  contract_type_id: number;
  client_id: number;
  branch_id: number;
  management_id: number;
  status_id: number;
  employee_id: number;
  created_at: number;
  updated_at: number;
  // deleted_at: null;
  dateEnd: number;
  end_date_period: number;
  // tasks: {};
  // payments: {};
  // management: null;
  branch: Branch;
  // levers: null;
};

export type ContractType = {
  id: number;
  name: string;
  created_at: null;
  updated_at: null;
  deleted_at: null;
};

export type ContractDataType = {
  branches: Branch[];
  brokers: Broker[];
  client: ClientRequest[];
  contractType: ContractType[];
  management: Management[];
};

type Management = {
  // active:number;
  // branch_id: number;
  // created_at: string;
  // deleted_at: null;
  id: number;
  manager_id: number;
  name: string;
  // note: null;
  // parent_id: null;
  // type:string;
  // updated_at: string;
};
