 export interface ContractItems {
    name: string;
    description: string;
    manager_id: string;
    contract_id: string;
    start_date: string;
    end_date: string;
    sub_items: SubItem[];
  }
  
  
  type SubItem = {
    name: string;
    employee_id: string;
    is_progress_bar: "1" | "0";
    is_processing: "1" | "0";
    is_attachment: "0" | "1";
  };