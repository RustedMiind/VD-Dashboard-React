import { Media } from "../Media";
import { DbOptionType } from "../other/DbOptionType";
import { ContractType } from "./ContractType";

export type TansactionAttachmentType = {
  id: number;
  processings_contract_sub_item_id: number;
  contract_attachment_type_id: number;
  description: string;
  created_at: string;
  updated_at: string;
  media?: Media[];
  attachment_type?: DbOptionType;
};
export type TransactionType = {
  id: number;
  contract_sub_item_id: number;
  order_num: string;
  letter_num: string;
  subject: string;
  receiver: string;
  created_at: string;
  updated_at: string;
  attachment: TansactionAttachmentType[];
};
