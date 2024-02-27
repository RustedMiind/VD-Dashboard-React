import { EmployeeRequestType } from "../pages/employees/requests/EmployeeRequest.enum";
import { EmployeeType } from "./Employee";
import { StepOfApproval } from "./EmployeeRequest";
import { Requestable } from "./Requestable";

export interface RequestDetails {
  employee?: EmployeeType;
  id: number;
  car_type?: string;
  number_car?: string;
  employee_id: number;
  created_at?: string;
  updated_at?: string;
  typeInArabic?: string;
  name?: string;
  responsible?: string;
  time_from?: string;
  time_to?: string;
  time_valid_in_seconds?: string;
  time_valid_to?: string;
  latitude?: string;
  longitude?: string;
  address?: string;
  project_name?: string;
  description?: string;
  amount?: number;
  type?: EmployeeRequestType;
  duration?: string;
  date?: string;
  salary_first?: number;
  requestable?: Requestable;
  exchange_date?: string;
  steps_of_approval?: StepOfApproval[];
  requestable_type?: string;
}

export type LastAdvance = {
  amount: number;
  balance: number;
};

export type KeyToArabic = { name: string; key: string };

export type KeyWithArabic = {
  name: string;
  value: unknown;
  key: string;
};
