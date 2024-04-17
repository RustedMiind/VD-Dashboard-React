import axios from "axios";
import { Api } from "../../../constants";
import { ContractItem } from "../../../types/Contracts/ContractItems";

const getItem = async (itemId: number) => {
  return await axios.get<{ contract_item?: ContractItem }>(
    Api(`employee/contract/items/${itemId}`)
  );
};

export const getContractItem = getItem;
