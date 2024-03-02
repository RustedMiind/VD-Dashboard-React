import { Order } from "../../pages/clients/clientRequest/types";
import { OrderStep } from "../ClientRequests";
import { Department } from "../Department";
import { Client } from "./Client";

export interface ClientRequestType {
  id: number;
  collection: number;
  status: number;
  note: string;
  step_status_id: number; // Adjusted type to accommodate both types from original interfaces
  order_step_id: number;
  step_number: number;
  form_id: number;
  client_id: number;
  employee_id: number;
  department: Department;
  department_id: number;
  last_status_id: number;
  created_at: string; // Changed from original type "2024-02-04T08:05:06.000000Z" to string
  updated_at: string; // Changed from original type "2024-02-04T08:05:06.000000Z" to string
  deleted_at: null;
  type_id: number;
  order_id: number;
  orderStep: number;
  order_step_form?: Partial<StepStatus>[]; // Adjusted property name to match both interfaces
  step_status: string;
  order: Order;
  order_step: OrderStep[];
  employee?: EmployeeType; // Added "?" to make it optional as it was in one of the interfaces
}

interface Order {
  id: number;
  client_id: number;
  order_type_id: number;
  created_at: string; // Changed from original type "2024-02-04T08:05:06.000000Z" to string
  updated_at: string; // Changed from original type "2024-02-04T08:05:06.000000Z" to string
  deleted_at: null;
  collection: number;
  client: Client;
  order_type: OrderType;
}

interface OrderType {
  id: number;
  name: string;
}

interface OrderStep {
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
  deleted_at: null;
}
