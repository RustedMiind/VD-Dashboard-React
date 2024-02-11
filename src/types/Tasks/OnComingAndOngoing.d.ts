export type OnComingAndOngoing = {
  incoming: InComing[];
  is_manager: true;
  ongoing: [];
};

export type InComing = {
  id: number;
  taskable_type: string;
  taskable_id: number;
  type: number;
  employee_id: number;
  created_at: string;
  updated_at: string;
};
export type Ingoing = {
  id: number;
  taskable_type: string;
  taskable_id: number;
  type: number;
  employee_id: number;
  created_at: string;
  updated_at: string;
};
