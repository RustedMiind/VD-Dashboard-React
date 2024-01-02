import axios from "axios";
import { DbOptionType } from "../../../types/other/DbOptionType";
import { Organization } from "../../../types/other/Origanization";
import { Branch, Department, EmployeeType, Management } from "../../../types";
import { Api } from "../../../constants";

function getFormOptions(params?: Partial<ParamsType>): Promise<Response> {
  return new Promise((ressolve, reject) => {
    axios
      .get<Response>(Api("employee/tender/use"), { params })
      .then((res) => {
        ressolve(res.data);
      })
      .catch(reject);
  });
}

type ParamsType = {
  branch_id: string;
  management_id: string;
};

type Response = {
  type?: DbOptionType[];
  warranty?: DbOptionType[];
  apply?: DbOptionType[];
  warranty_file?: DbOptionType[];
  organization?: Organization[];
  banches?: Branch[];
  employees_management?: EmployeeType[];
  employees_branch?: EmployeeType[];
  departments: Department[];
  managements: Management[];
};

export default getFormOptions;
