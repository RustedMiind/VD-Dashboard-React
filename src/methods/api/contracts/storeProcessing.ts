import axios from "axios";
import { z } from "zod";
import { Api } from "../../../constants";
import { serialize } from "object-to-formdata";
import { TransactionType } from "../../../types/Contracts/ContractTransactionAttachment";

const schema = z.object({
  order_num: z.string().min(3),
  letter_num: z.string().min(3),
  subject: z.string().min(3),
  receiver: z.string().min(3),
});

type SchemaType = z.infer<typeof schema>;

async function storeProcessing(subItemId: number, data: SchemaType) {
  return axios.post<{ processing: TransactionType }>(
    Api(`employee/contract/items/processing/store`),
    serialize(
      {
        ...data,
        contract_sub_item_id: subItemId,
      },
      { indices: true, booleansAsIntegers: true }
    )
  );
}

export const storeContractProcessingSchema = schema;
export type StoreContractProcessingSchemaType = SchemaType;
export const storeContractProcessing = storeProcessing;
