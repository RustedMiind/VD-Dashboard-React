import { Media } from "../Media";
import { DbOptionType } from "../other/DbOptionType";
import { ContractType } from "./ContractType";

export type TansactionAttachmentType = {
  id: number;
  name?: string;
  processings_contract_sub_item_id: number;
  contract_attachment_type_id: number;
  description: string;
  created_at: string;
  updated_at: string;
  media?: Media[];
  attachment_type?: DbOptionType;
};

export interface TansactionReplyAttachmentType {
  id: number;
  comments_processing_contract_sub_item_id: number;
  contract_attachment_type_id?: number;
  description: string;
  created_at: string;
  updated_at: string;
  media: Media[];
  attachment_type?: DbOptionType;
}
export type TransactionComment = {
  comment: string;
  created_at: string;
  employee_id: number;
  id: number;
  note: string;
  processing_contract_sub_item_id: number;
  updated_at: string;
  attachment?: TansactionReplyAttachmentType[];
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
  attachment_type?: TansactionAttachmentType[];
  attachment?: TansactionAttachmentType[];
  comments_count?: number;
  comments?: TransactionComment[];
  system_logs?: DbOptionType[];
};
