import { Client } from "../Clients";
import { Media } from "../Media";
import { City, Floor, Position } from "./Soil";

type SoilRequest = {
  client: Client;
  client_id: number;
  collection: 7;
  deleted_at: null;
  id: number;
  license_id: number;
  order_type_id: number;
  soil_order: SoilOrder;
  created_at: string;
  updated_at: string;
  serial_number: number;
};

type SoilOrder = {
  client_id: number;
  depth: number;
  id: number;
  license: License;
  license_id: number;
  map: string;
  media: Media[];
  number_bodies: number;
  order_id: number;
  order_type_id: number;
  pictures: [];
  price: number;
  status: number;
  status_name: string;
  total_price: number;
  type_order: type_order;
  soil_location_map: Map;
  payment: string;
  soil_floor: Floor;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  payment_status: null;
  long: number;
  lat: number;
};

type License = {
  id: number;
  name: string;
  deleted_at: null;
  created_at: null;
  updated_at: null;
};
type type_order = {
  name: string;
  license: number;
  id: number;
  created_at: null;
  deleted_at: null;
  updated_at: null;
};
type Map = {
  area: 0;
  created_at: "2024-02-04T13:50:07.000000Z";
  deleted_at: null;
  id: 37;
  map: Position[];
  minimum_price: 800;
  price: 1000;
  soil_location: SoilLocation;
};
type SoilLocation = {
  building_system: string;
  location_name: string;
  city_id: number;
  id: number;
  status: number;
  city: City;
  deleted_at: null;
  created_at: "2024-02-04T13:50:07.000000Z";
  updated_at: "2024-02-04T22:15:35.000000Z";
};
