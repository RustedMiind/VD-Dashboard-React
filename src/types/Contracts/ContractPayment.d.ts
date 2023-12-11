export interface ContractPayment {
  id: number;
  contract_id: string;
  name: string;
  amount: string;
  period: string;
  created_at: string;
  updated_at: string;
  status?: string;
  status_name?: string;
  // deleted_at: null;
}
