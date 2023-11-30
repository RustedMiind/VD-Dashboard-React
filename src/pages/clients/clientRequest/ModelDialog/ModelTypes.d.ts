export interface ModelType {
  order_step_id: number;
  form_id: number;
  client_id: number;
  branch_id: number;
  collection: number;
  status: ModelStatusType;
  note?: string;
}

type ModelStatusType = 100 | 99 | 33 | 0;
