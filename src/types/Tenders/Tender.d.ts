import { DB_Boolean, Department } from "../";
import { DbOptionType } from "../other/DbOptionType";
import { TenderAmounts } from "./TenderAmount";
import { TenderFile } from "./TenderFile";
import { TenderTask } from "./TenderTask";

export type TenderFormOptions = {};

export type Tender = {
  id: number;
  step_num: number;
  is_done: number;
  eng_employee_status: number;
  buy_status: number;
  technical_status: number;
  file_finacial_status: number;
  apply_status: number;
  tenderdata?: TenderData;
  tender_tasks?: TenderTask;
  tender_files?: TenderFile[];
  tender_amounts?: TenderAmounts[];
  // created_at: "2024-01-03T16:33:09.000000Z";
  // updated_at: "2024-01-03T18:12:24.000000Z";
  // deleted_at: null;
};

export type TenderData = {
  id: number;
  tender_id: number;
  tender_type_id: number;
  department_id: number;
  code_reference: number;
  code_tender: number;
  name: string;
  strat_date: string;
  end_date: string;
  organization_id: number;
  price: number;
  type_id: number;
  department?: Department;
  activity?: string;
  period: number;
  apply_id: number;
  created_at: string;
  updated_at: string;
  organization: Organization;
  tender_warranties: (DbOptionType & { warranty_id: number })[];
  // "deleted_at": null
};

type Organization = {
  // created_at: "2024-01-01T18:36:29.000000Z";
  // deleted_at: null;
  id: number;
  name: string;
  number: number;
  // updated_at: "2024-01-01T18:36:29.000000Z";
};
