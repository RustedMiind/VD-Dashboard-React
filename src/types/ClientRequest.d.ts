export interface ClientRequest {
  id: number;
  name: string;
  phone: string;
  email: string;
  card_id: string;
  branch: Branch;
  Contract_status: string;
}

interface Branch {
  name: string;
}
