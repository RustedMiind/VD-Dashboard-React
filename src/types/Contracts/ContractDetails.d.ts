import { Media } from "../Media";

export interface ContractDetails {
  id: number;
  contract_id: number;
  number_parts: number;
  area?: number;
  location?: string;
  map?: string;
  website: number;
  application: number;
  online_service: number;
  created_at: string;
  updated_at: string;
  media: Media[];
}
