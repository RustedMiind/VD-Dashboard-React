import axios from "axios";
import { Api } from "../constants";
import { DbOptionType } from "../types/other/DbOptionType";
import { ContractUse } from "../pages/contracts/SetContract/ContractDetailsContext";

/**
 * getUseData()
 * used to fetch use data whick contains
 * - attachments_types
 */
export async function getUseData() {
  let response = await axios
    .get<ContractUse>(Api("employee/contract/use"))
    .then((res) => {
      return res.data;
    });

  return response;
}

// declare type u want
// if u need use this method for get branches
// declare branches in this type
type returnedUsedData = {
  attachments_types: DbOptionType[];
};
