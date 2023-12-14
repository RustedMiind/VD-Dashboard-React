import { EmployeeType } from "../Employee";

export interface Vacation {
  created_at: string;
  date_from: string;
  date_to: string;
  id: number;
  name: string;
  number_days: number;
  status: -1;
  vacation_date_id: number;
  employees?: EmployeeType[];
  // updated_at: null;
}
