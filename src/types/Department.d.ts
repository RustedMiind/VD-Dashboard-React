import { Management } from "./Contracts";

export interface Department {
  id: number;
  name: string;
  type: string;
  management_id: number;
  manager_id: number | null;
  parent_id: number | null;
  note: null | string;
  active: unknown;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  management?: Management;
}
