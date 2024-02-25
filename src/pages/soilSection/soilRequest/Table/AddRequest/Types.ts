import { Client } from "../../../../../types/Clients";

export interface LocationFormOptionsType {
  success: boolean;
  msg?: string;
  type_order?: TypeOrder[];
  soilArea?: SoilArea[];
  soilFloor?: SoilFloor[];
  map?: unknown;
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
