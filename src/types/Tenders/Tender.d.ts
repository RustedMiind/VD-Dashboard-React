import { DB_Boolean, Department, Management } from "../";
import { DbOptionType } from "../other/DbOptionType";
import { TenderEntityStatus, TenderItemStatus } from "./Status.enum";
import { TenderAmounts } from "./TenderAmount";
import { TenderFile } from "./TenderFile";
import { TenderTask } from "./TenderTask";

export type TenderFormOptions = {};

export type Tender = {
  id: number;
  step_num: number;
  is_done: DB_Boolean;
  eng_employee_status: TenderApprovalStatus;
  eng_employee_date?: string;
  eng_employee_note?: string;
  buy_status: TenderPay;
  buy_tender?: TenderPayment;
  buy_date?: string;
  buy_note?: string;
  technical_status: TenderItemStatus;
  technical_date?: string;
  technical_note?: string;
  file_finacial_status: TenderItemStatus;
  file_finacial_date?: string;
  file_finacial_note?: string;
  apply_status: TenderItemStatus;
  apply_date?: string;
  apply_note?: string;
  trace_status: TenderItemStatus;
  trace_date?: string;
  trace_note?: string;
  tenderdata?: TenderData;
  tender_tasks?: TenderTask;
  tender_files?: TenderFile[];
  tender_amounts?: TenderAmounts[];
  user_type?: number[];
  directorate_status?: TenderEntityStatus;
  eng?: DB_Boolean;
  created_at?: string;
  updated_at?: string;
  pictures?: Images;
  // deleted_at: null;
};

export type TenderPayment = {
  id: number;
  department_id?: number;
  tender_id: number;
  employee_id?: number;
  bank_account?: string;
  payment_number?: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
};

export type TenderData = {
  id: number;
  tender_id: number;
  tender_type_id: number;
  department_id?: number;
  code_reference?: number;
  code_tender?: number;
  name?: string;
  strat_date?: string;
  end_date?: string;
  organization_id?: number;
  price?: number;
  type_id?: number;
  department?: Department;
  activity?: string;
  period: number;
  tender_applies: (DbOptionType & {
    apply_id: number;
    apply?: DbOptionType;
  })[];
  created_at: string;
  updated_at: string;
  organization?: Organization;
  tender_warranties?: (DbOptionType & {
    warranty_id: number;
    warranties?: DbOptionType;
  })[];
  apply?: DbOptionType;
  management_id?: number;
  management?: Management;
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

type Images = {
  eng_employee?: Media[];
  file_finacial_tender?: Media[];
  technical_tender?: Media[];
  employee_trace?: Media[];
  buy_tender?: Media[];
  apply_tender?: Media[];
};
