import {
  Branch,
  Broker,
  ClientRequest,
  EmployeeType,
} from "../../../../../types";
import { ContractType, Management } from "../../../../../types/ContractRequest";

export type SelectOptions = {
  branches?: Branch[];
  brokers?: Broker[];
  client?: ClientRequest[];
  contractType?: ContractType[];
  management?: Management[];
  employees?: EmployeeType[];
};
