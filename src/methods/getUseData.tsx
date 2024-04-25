import axios from "axios";
import { Api } from "../constants";
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
