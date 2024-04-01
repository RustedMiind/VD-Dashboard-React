import { ContractType } from "./ContractType";

export interface ContractAttachment {
  id: string;
  name: string;
  code: string;
  type: string;
  card_image: string;
  contract_id: string;
  created_at: string;
  updated_at: string;
  contract_lever_attachment_type: ContractType;
  // "deleted_at": null,
  card_path: string;
}
export type ContractLever = ContractAttachment;
