import axios from "axios";
import { Api } from "../../../constants";
import { TransactionComment } from "../../../types/Contracts/ContractTransactionAttachment";

const getProcessingReply = async (commentId: number) => {
  return await axios.get<{ comment_processing?: TransactionComment }>(
    Api(`employee/contract/items/comment-processing/${commentId}`)
  );
};

export const getContractProcessingReply = getProcessingReply;
