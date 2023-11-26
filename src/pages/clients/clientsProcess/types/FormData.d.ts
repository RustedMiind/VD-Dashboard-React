import { EmployeeType } from "../../../../types";
import { Management } from "../../../../types/Management";

export interface FormData {
  Management: Management[];
  employees: EmployeeType[];
  contractForm: ContractForm[];
}
