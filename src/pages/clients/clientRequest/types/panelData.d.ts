export interface PanelData {
  id: number;
  name: string;
  created_date?: string;
  type: "individual" | "company";
  branch_id: number;
  order_count?: number;
  step_id: number;
  branch_name: string;
  note?: string | null;
  form_id: number;
  order_type_name: string;
  step_status: string;
  step_status_id: number;
  order_step_form: [
    {
      id: number;
      collection: number;
      status: number;
      note: string;
      order_step_id: number;
      step_number: number;
      form_id: number;
      client_id: number;
      last_status_id: number;
      created_at?: string;
      updated_at?: string;
      deleted_at?: null;
      order_step: [
        {
          id: number;
          collection: 4;
          step_number: 1;
          branch_id: 31;
          management_id: 47;
          employee_id: 80;
          status: 0;
          accept: 0;
          approval: 0;
          period: 1;
          form_id: 1;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string;
          management?: {
            id: number;
            name: string;
          };
        }
      ];
    }
  ];
}
