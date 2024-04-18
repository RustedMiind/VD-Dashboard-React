import axios from "axios";
import { z } from "zod";
import { Api } from "../../../constants";
import { serialize } from "object-to-formdata";
import { ContractItem } from "../../../types/Contracts/ContractItems";

const schema = z.object({
  name: z.string().min(4),
  description: z.string().min(4),
  manager_id: z.number().gt(0, { message: "يجب اختيار مسؤول عن البند الفرعي" }),
  start_date: z.string().min(4, { message: "يجب ادخال تاريخ البداية" }),
  end_date: z.string().min(4, { message: "يجب ادخال تاريخ النخاية" }),
  attachments: z.array(z.instanceof(File)),
  sub_items: z
    .array(
      z.object({
        name: z.string().min(2),
        employee_id: z
          .number()
          .gt(0, { message: "يجب اختيار مسؤول عن البند الفرعي" }),
        is_progress_bar: z.boolean(),
        is_processing: z.boolean(),
        is_attachment: z.boolean(),
        is_letter: z.boolean(),
        is_mission: z.boolean(),
      })
    )
    .min(1),
  employees: z.array(z.number()).optional(),
});

type SchemaType = z.infer<typeof schema>;

export const contractSubItemInital: SchemaType["sub_items"][number] = {
  employee_id: -1,
  is_attachment: false,
  is_letter: false,
  is_mission: false,
  is_processing: false,
  is_progress_bar: false,
  name: "",
};

const initialValue: SchemaType = {
  name: "",
  description: "",
  manager_id: -1,
  start_date: "",
  end_date: "",
  attachments: [],
  sub_items: [contractSubItemInital],
  employees: [],
};

async function storeItem(
  contractDetails: {
    id: number;
    itemId?: number;
  },

  data: SchemaType,
  employees?: number[]
) {
  return axios.post(
    Api(
      contractDetails.itemId
        ? `employee/contract/items/${contractDetails.itemId}`
        : "employee/contract/items/store"
    ),
    serialize(
      {
        ...data,
        contract_id: contractDetails.id,
        employees,
      },
      { indices: true, booleansAsIntegers: true }
    )
  );
}

export const contractItemToStoreSchema = (item: ContractItem): SchemaType => {
  return {
    attachments: [],
    description: item.description,
    end_date: item.end_date,
    manager_id: item.manager_id || -1,
    name: item.name,
    start_date: item.start_date,
    sub_items: item.contract_sub_items?.map(
      ({
        employee_id,
        is_attachment,
        is_letter,
        is_mission,
        is_processing,
        is_progress_bar,
        name,
      }) => ({
        employee_id,
        is_attachment: Boolean(is_attachment),
        is_letter: Boolean(is_letter),
        is_mission: Boolean(is_mission),
        is_processing: Boolean(is_processing),
        is_progress_bar: Boolean(is_progress_bar),
        name,
      })
    ),
  };
};

export const storeContractItemSchema = schema;
export type StoreContractItemSchemaType = SchemaType;
export const storeContractItem = storeItem;
export const contractItemSchemaInitial = initialValue;
