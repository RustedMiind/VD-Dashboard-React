export interface EmployeeExcType {
  id: number;
  name: string;
  first_name: string;
  second_name: string;
  last_name: string;
  full_name?: string | null;
  user_id: number;
  shift_id: number;
  email: string;
  phone: string;
  country_id: number;
  city_id: number;
  address: string;
  draft: number;
  has_overtime: number;
  deleted_at?: string | null;
  created_at?: string;
  updated_at?: string;
}
