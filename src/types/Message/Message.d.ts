import { EmployeeType } from "../Employee";

export type Message = {
  id: number;
  sender_id: number;
  tender_id: number;
  message: string;
  created_at: string;
  updated_at: string;
  sender?: EmployeeType;
};
