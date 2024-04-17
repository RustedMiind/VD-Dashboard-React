import axios from "axios";
import { Api } from "../../../constants";

const deleteItem = async (contractItemId: number) => {
  return await axios.delete(Api(`employee/contract/items/${contractItemId}`));
};

export const deleteContractItem = deleteItem;
