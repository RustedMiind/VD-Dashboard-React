import { Client } from "../../../../../types/Clients";
import { MapType } from "../../../../../types/Soil";

export interface LocationFormOptionsType {
  success: boolean;
  msg?: string;
  type_order?: TypeOrder[];
  soilArea?: SoilArea[];
  soilFloor?: SoilFloor[];
  map?: MapType[];
  clients?: Client[];
}

export interface TypeOrder {
  id: number;
  name: string;
  license: number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface SoilArea {
  id: number;
  area_from: number;
  area_to: number;
  number: number;
  minimum: number;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface SoilFloor {
  id: number;
  number_floors: number;
  depth: number;
  minimum: number;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface StoreFormBody {
  number_bodies: number;
  number_floor: number;
  total_price: number;
  order_type_id: number;
  license_id: number;
  map: number;
  client_id: number;
  payment: string;
  depth: number;
  area_id: number;
  floor_id: number;
  price: number;
  lat: number;
  long: number;
}
