export interface EmployeeType {
  id: number;
  name: string;
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
}
