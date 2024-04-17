import axios from "axios";
import { z } from "zod";
import { Api } from "../../../constants";
import { serialize } from "object-to-formdata";

const schema = z.object({
  name: z.string(),
  description: z.string(),
  manager_id: z.number(),
  start_date: z.string(),
  end_date: z.string(),
  attachments: z.array(z.instanceof(File)),
  sub_items: z.array(
    z.object({
      name: z.string(),
      employee_id: z.number(),
      is_progress_bar: z.boolean(),
      is_processing: z.boolean(),
      is_attachment: z.boolean(),
    })
  ),
  employees: z.array(z.number()).optional(),
});

type SchemaType = z.infer<typeof schema>;

async function storeItem(contractId: number, data: SchemaType) {
  return axios.post(
    Api("employee/contract/items/store"),
    serialize({ ...data, contract_id: contractId }, { indices: true })
  );
}

export const storeContractItemSchema = schema;
export type StoreContractItemSchemaType = SchemaType;
export const storeContractItem = storeItem;
