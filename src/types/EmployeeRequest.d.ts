import { EmployeeType } from "./Employee";

export interface EmployeeRequest {
  id: number;
  requestable_id: RequestableIdType;
  employee_id: number;
  created_at: string;
  updated_at: string;
  employee: EmployeeType;
  requestable: Requestable;
}

interface Requestable {
  id: RequestableIdType;
  date: string;
  employee_id: string;
}

export type RequestableIdType = -1 | 0 | 1;
