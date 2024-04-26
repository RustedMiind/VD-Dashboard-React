import axios from "axios";
import { z } from "zod";
import { Api } from "../../../constants";
import { serialize } from "object-to-formdata";
import { TransactionComment } from "../../../types/Contracts/ContractTransactionAttachment";

const schema = z.object({
  comment: z.string().min(3),
  note: z.string().optional(),
});

type SchemaType = z.infer<typeof schema>;

async function storeProcessingReply(processingId: number, data: SchemaType) {
  return axios.post<{ comment_processing: TransactionComment }>(
    Api(`employee/contract/items/comment-processing/store`),
    serialize(
      {
        ...data,
        processing_contract_sub_item_id: processingId,
      },
      { indices: true, booleansAsIntegers: true }
    )
  );
}

export const storeContractProcessingReplySchema = schema;
export type StoreContractProcessingReplySchemaType = SchemaType;
export const storeContractProcessingReply = storeProcessingReply;
