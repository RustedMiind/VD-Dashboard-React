import { EmployeeType } from "./Employee";
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
  type?: number;
  duration?: string;
  date?: string;
  salary_first?: number;
  requestable?: Requestable;
}

export type KeyToArabic = { name: string; key: string };

export type KeyWithArabic = {
  name: string;
  value: unknown;
  key: string;
};
