import axios from "axios";
import { Api } from "../../../constants";

const deleteItem = async (contractItemId: number) => {
  return await axios.delete(
    Api(`employee/contract/items/:contract-item/${contractItemId}`)
  );
};

export const deleteContractItem = deleteItem;
