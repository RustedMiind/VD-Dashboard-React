import { OrderStep } from "../../../../types/ClientRequests";
import { PanelData } from "./panelData";

export interface StepStatusData extends PanelData {
  id: number;
  name: string;
  created_date: string;
  type: "individual" | "company";
  branch_id: number;
  step_id: number;
  branch_name: string;
  note: string;
  form_id: number;
  order_type_name: string;
  order_step_form: Partial<StepStatus>[];
}

export interface StepStatus {
  id: number;
  collection?: number;
  client_id: number;
  end_date: string;
  note: string;
  order_step: OrderStep[];
  order_step_id: number;
  status: number;
  employee: {
    address: string;
    city_id: number;
    country_id: number;
    created_at?: string | null;
    deleted_at?: string | null;
    draft: number;
    email: string;
    first_name: string;
    full_name?: string | null;
    has_overtime: number;
    id: number;
    last_name: string;
    name: string;
    phone: string;
    second_name: string;
    shift_id: number;
    updated_at: string;
    user_id: number;
  };
  employee_id: number;
  statuses: {
    id: number;
    name: string;
  };
}
