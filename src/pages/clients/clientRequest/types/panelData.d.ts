import { Branch, Department, EmployeeType } from "../../../../types";
import { Client } from "../../../../types/Clients";
import { ClientRequestType } from "../../../../types/Clients/ClientRequestType";

export interface PanelData extends ClientRequestType {}

type Order = {
  id: number;
  client_id: number;
  order_type_id: number;
  license_id: number;
  created_at: "2024-02-04T08:05:06.000000Z";
  updated_at: "2024-02-04T08:05:06.000000Z";
  deleted_at: null;
  collection: number;
  client: Client;
  order_type: OrderType;
};

type OrderType = {
  id: number;
  name: string;
  // license: 1;
  // created_at: null;
  // updated_at: null;
  // deleted_at: null;
};
type OrderStep = {
  id: number;
  collection: number;
  step_number: number;
  branch_id: null;
  department_id: number;
  employee_id: number;
  type_id: number;
  accept: number;
  approval: number;
  period: number;
  form_id: number;
  // created_at: "2024-02-04T07:55:42.000000Z";
  // updated_at: "2024-02-04T07:55:42.000000Z";
  deleted_at: null;
};
