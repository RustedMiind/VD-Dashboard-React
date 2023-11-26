export interface ModelFormType {
  status?: ModelStatusType;
  note?: string;
  employee_id?: number;
}

type ModelStatusType = 0 | 1 | 2;
