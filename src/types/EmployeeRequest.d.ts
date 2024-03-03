import { EmployeeRequestType } from "../pages/employees/requests/EmployeeRequest.enum";
import { DepartmentEmployee } from "./DepartmentEmployee";
import { EmployeeType } from "./Employee";
import { RequestDetails } from "./RequestDetails";
import { Requestable } from "./Requestable";

export interface EmployeeRequest {
  id: number;
  employee?: EmployeeType;
  car_type?: string;
  number_car?: string;
  employee_id: number;
  created_at: string;
  updated_at: string;
  typeInArabic?: string;
  name?: string;
  responsible?: string;
  time_from?: string;
  time_to?: string;
  time_valid_in_seconds?: string;
  time_valid_to?: string;
  latitude?: string;
  longitude?: string;
  address?: string;
  project_name?: string;
  description?: string;
  amount?: number;
  type: EmployeeRequestType;
  duration?: string;
  date?: string;
  salary_first?: number;
  requestable?: Requestable;
  exchange_date?: string;
  steps_of_approval?: StepOfApproval[];
  requestable_type?: string;
  requestable_id?: number;
  status: RequestStatusType;
  departmentName?: string;
  nextStep?: NextStep;
  checkedSteps: StepOfApproval[] | null;
}

interface NextStep {
  id: number;
  employee_id: number;
  department_id: number;
  employeeName: string;
  departmentName: string;
  action: number;
  duration: number;
  model: ProceduresModelTypeCode;
  type: number;
  hasAccess: boolean;
}

export type LastAdvance = {
  amount: number;
  balance: number;
};

export type KeyToArabic = { name: string; key: string };

export type KeyWithArabic = {
  name: string;
  value: unknown;
  key: string;
};
/*
{
    "id": 112,
    "employee_id": 30,
    "department_id": 146,
    "action": 3,
    "duration": 12323,
    "model": 2,
    "type": 6,
    "deleted_at": null,
    "created_at": null,
    "updated_at": null,
    "hasAccess": false,
    "model_details": {
        "general_request_id": 251,
        "steps_of_approval_id": 112,
        "note": null,
        "alternative_employee_id": null,
        "status": -1,
        "updated_at": "2023-11-15 21:34:24"
    }
}
*/

export interface StepOfApproval {
  id: number;
  employee_id: number;
  employee?: EmployeeType;
  employeeName?: string;
  department_id: number;
  departmentName?: string;
  department?: DepartmentEmployee;
  action: number;
  duration: number;
  model: number;
  model_details?: ModelDetails;
  type: number;
  deleted_at?: string;
  created_at?: string;
}

interface ModelDetails {
  created_at: string;
  updated_at: string;
  general_request_id: 159;
  steps_of_approval_id: 40;
  note?: string;
  alternative_employee_id?: null;
  status: number;
}

/*
steps_of_approval: [
    {
        "id": 40,
        "employee_id": 52,
        "department_id": 147,
        "action": 3,
        "duration": 123,
        "model": 1,
        "type": 3,
        "deleted_at": null,
        "created_at": null,
        "updated_at": null,
        "model_details": {
            "general_request_id": 159,
            "steps_of_approval_id": 40,
            "note": null,
            "alternative_employee_id": null,
            "status": -1
        }
    }
]
*/

/*
{
    "id": 40,
    "employee_id": 52,
    "department_id": 147,
    "action": 3,
    "duration": 123,
    "model": 1,
    "type": 3,
    "deleted_at": null,
    "created_at": null,
    "updated_at": null,
    "model_details": {
        "general_request_id": 159,
        "steps_of_approval_id": 40,
        "note": null,
        "alternative_employee_id": null,
        "status": -1
    }
}
*/

export type RequestStatusType = -1 | 0 | 1;
// -1 Pending
// 0 Ignored
// 1 Approved
