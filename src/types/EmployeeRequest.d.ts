import { EmployeeType } from "./Employee";

export interface EmployeeRequest {
  id: number;
  requestable_id: RequestableIdType;
  requestable_type: string;
  employee_id: number;
  created_at: string;
  updated_at: string;
  employee: EmployeeType;
  requestable: Requestable;
  nextStep: NextStep | null;
  steps_of_approval: StepOfApproval[] | null;
  status: RequestStatusType;
  departmentName: string | null;
}

interface Requestable {
  id: RequestableIdType;
  date: string;
  employee_id: string;
}

interface NextStep {
  id: number;
  employee_id: number;
  department_id: number;
  action: number;
  duration: number;
  model: ProceduresModelTypeCode;
  type: number;
  hasAccess: boolean;
}
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

interface StepOfApproval {
  id: number;
  employee_id: number;
  department_id: number;
  action: number;
  duration: number;
  model: number;
  type: number;
  deleted_at?: string;
  created_at?: string;
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
