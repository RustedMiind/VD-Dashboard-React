export interface ProceduresModel {
  status: -1 | 0 | 1 | 2;
  note?: string;
  id: number;
}

export interface FinancialModel extends ProceduresModel {
  id: 1;
}

export interface AlternativeEmployeeModel extends ProceduresModel {
  id: 2;
  employeeId: number;
}

export interface ApprovalModel extends ProceduresModel {
  id: 3;
}

export interface AcceptionModel extends ProceduresModel {
  id: 4;
}

export type ProceduresModelsType =
  | FinancialModel
  | AlternativeEmployeeModel
  | ApprovalModel
  | AcceptionModel;
