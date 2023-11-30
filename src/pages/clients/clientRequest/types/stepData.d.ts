export interface StepData {
  id: number;
  name: string;
  created_date: string;
  type: "individual" | "company";
  branch_id: number;
  step_id: number;
  branch_name: string;
  note: null;
  form_id: number;
  order_type_name: string;
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
      created_at: string;
      updated_at: string;
      deleted_at: null;
      order_step: [
        {
          id: number;
          collection: number;
          step_number: number;
          branch_id: number;
          department_id: number;
          employee_id: number;
          status: number;
          accept: number;
          approval: number;
          period: number;
          form_id: number;
          created_at: string;
          updated_at: string;
          deleted_at: null;
          department: {
            id: number;
            name: string;
          };
        }
      ];
    }
  ];
}
