import axios from "axios";
import { Api } from "../../../constants";
import { TransactionType } from "../../../types/Contracts/ContractTransactionAttachment";

const getProcessing = async (processingId: number) => {
  return await axios.get<{ processing?: TransactionType }>(
    Api(`employee/contract/items/processing/${processingId}`)
  );
};

export const getContractProcessing = getProcessing;
