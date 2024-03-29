import { Media } from "../Media";

export type TakeActionFiles = {
  client_id: number;
  collection: number;
  department_id: number;
  employee_id: number;
  form_id: number;
  id: number;
  last_status_id: number;
  media: Media[];
  note: "";
  order_id: number;
  order_step_id: number;
  pictures: [];
  status: number;
  step_number: number;
  type_id: number;
  created_at: string;
  updated_at: string;
  end_date: null;
  form_name: null;
  deleted_at: null;
};
type IncomingFiles = {
  area_id: number;
  client_id: number;
  created_at: string;
  depth: number;
  floor_id: number;
  id: number;
  license_id: number;
  map: number;
  media: Media[];
  number_bodies: number;
  order_id: number;
  order_type_id: number;
  payment: string;
  pictures: [];
  price: number;
  status: number;
  status_name: string;
  total_price: number;
  updated_at: string;
  payment_status: null;
  deleted_at: null;
};
