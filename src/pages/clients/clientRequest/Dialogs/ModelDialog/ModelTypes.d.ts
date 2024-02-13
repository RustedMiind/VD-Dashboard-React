export interface ModelType {
  client_id: number;
  status: ModelStatusType;
  note?: string;
}

type ModelStatusType = 100 | 33 | 99 | 1 | 2 | 0;
