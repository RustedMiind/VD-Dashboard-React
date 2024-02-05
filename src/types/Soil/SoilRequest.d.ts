import { Client } from "../Clients";
import { Media } from "../Media";

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
};

type SoilOrder = {
  client_id: number;
  deleted_at: null;
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
  //   created_at: "2024-02-04T08:05:06.000000Z";
  //   updated_at: "2024-02-04T13:05:26.000000Z";
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
