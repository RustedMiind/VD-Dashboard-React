import { Branch } from "../Branches";
import { Broker } from "../Brokers";
export interface Client {
  id: number;
  //   collection: null;
  name: string;
  type: "individual" | "company";
  from: string;
  email: string;
  phone: string;
  // "phone_verified_at": null,
  // "password": null,
  // "otp": null,
  // "otp_expire": null,
  lang: string;
  // "remember_token": null,
  branch_id: number;
  broker_id: number;
  // "status_id": null,
  // "client_request_id": null,
  agent_name: string;
  register_number: string;
  // "register_image": null,
  letter_head: string;
  card_id: null;
  card_image: string;
  // "image": null,
  // "gender": null,
  // "birth_date": null,
  active: number;
  confirmed: number;
  note: null;
  order_type: number;
  created_at: string;
  updated_at: string;
  // "deleted_at": null,
  broker?: Broker; // Assuming Broker is another interface
  // "status": null,
  branch?: Branch; // Assuming Branch is another interface
  contracts_count?: number;
  contract_status?: string;
  contract_status_id?: number;
}
