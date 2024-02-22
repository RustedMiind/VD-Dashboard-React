import { Contractor } from "../Contractors/Contractor";
import { WorkOrderType } from "./WorkOrderType";

export type work_instruction = {
  id: number;
  reference_number: string;
  type_work_instruction_id: string;
  costable_id: number;
  expected_cost: string;
  real_cost: string;
  latitude: string;
  longitude: string;
  contractor_id: number;
  period: number;
  status: number;
  start_date: string;
  created_at: string;
  updated_at: string;
  contractor: Contractor | null;
  type_work_instruction: WorkOrderType | null;
};
