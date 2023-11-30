export interface ContractAttachment {
  id: string;
  name: string;
  period: string;
  type: string;
  card_image: string;
  contract_id: string;
  created_at: string;
  updated_at: string;
  // "deleted_at": null,
  card_path: string;
}
export type ContractLever = ContractAttachment;
