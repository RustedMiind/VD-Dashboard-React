import { Department } from "../../../../types";
import { Order, OrderStep, OrderType } from "./panelData";

type StepData = {
  client_id: number;
  collection: number;
  department: Department;
  department_id: number;
  employee_id: number;
  form_id: number;
  id: number;
  last_status_id: number;
  note: string;
  order: Order;
  order_id: number;
  order_step: OrderStep[];
  order_step_id: number;
  status: number;
  step_number: number;
  type_id: number;
  deleted_at: null;
  created_at: string;
  updated_at: string;
};
