export interface StepStatusData {
  id: number;
  name: string;
  created_date?: string;
  type: "individual" | "company";
  branch_id: number;
  order_type: number;
  order_step_form: [
    {
      id: number;
      status: number;
      note: string;
      order_step_id: number;
      end_date?: string;
      client_id: number;
      statuses: number;
      order_step: [];
    }
  ];
}
