export interface ContractPayment {
  id: number;
  contract_id: number;
  name: string;
  amount: number;
  period: number;
  created_at: string;
  updated_at: string;
  // status: null;
  // deleted_at: null;
}
