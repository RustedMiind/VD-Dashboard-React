import { Contractor } from "../Contractors/Contractor";

export type Envoy = {
  id: number;
  name?: string;
  phone?: string;
  email?: string;
  created_at: string;
  updated_at: string;
  contractor_id?: number;
  contractor?: Contractor;
};
