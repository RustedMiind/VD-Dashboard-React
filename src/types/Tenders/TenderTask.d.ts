import { EmployeeType } from "../Employee";
import { DbOptionType } from "../other/DbOptionType";
export interface TenderTask {
  id: number;
  tender_id?: number;
  eng_employee_id?: number;
  end_dete_accept?: string;
  eng_employee_id_buy_tender?: number;
  dete_buy_tender?: string;
  eng_employee_id_technical?: number;
  end_dete_technical?: string;
  employee_id_trace?: number;
  end_dete_trace?: string;
  note?: string;
  eng_employee_id_file_finacial?: number;
  dete_file_finacial?: string;
  eng_employee_id_apply_tender?: number;
  dete_apply_tender?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
  task_tender_warranties?: (DbOptionType & { warranty_id: number })[];
  eng_employee_apply_tender?: EmployeeType;
  eng_employee_file_finacial?: EmployeeType;
  employee_trace?: EmployeeType;
  eng_employee_technical?: EmployeeType;
  eng_employee_buy_tender?: EmployeeType;
  eng_employee?: EmployeeType;
}
