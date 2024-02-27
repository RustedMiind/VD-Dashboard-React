export interface EmployeeType {
  id: number;
  name: string;
  first_name?: string;
  second_name?: string;
  last_name?: string;
  full_name?: string;
  user_id: number;
  shift_id: number;
  email: string;
  phone: string;
  country_id: number;
  city_id: number;
  address: string;
  has_overtime: 1;
  deleted_at?: string;
  created_at: string;
  updated_at: string;
  draft: number;
  work_at?: EmployeeWorkAt;
}

export type EmployeeWorkAt = {
  created_at: string;
  departmentName: string;
  employee?: EmployeeType;
  employeeName: string;
  employee_id: number;
  id: number;
  updated_at: string;
  workable_id: number;
  workable_type: string;
};
