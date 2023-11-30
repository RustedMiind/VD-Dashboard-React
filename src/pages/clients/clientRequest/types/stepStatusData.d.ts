export interface StepStatusData {
  id: number;
  name: string;
  created_date: string;
  type: "individual" | "company";
  branch_id: number;
  order_type: number;
  order_step_form: [
    {
      id: number;
      end_date: string;
      client_id: number;
      note?: string | null;
      order_step_id: number;
      status: number;
      statuses?: null;
      order_step: [
        {
          id: number;
          department_id: number;
          employee_id: number;
          employees: {
            id: number;
            name: string;
            first_name: string;
            second_name: string;
            last_name: string;
          };
          department: {
            id: number;
            name: string;
          };
        }
      ];
    }
  ];
}

export interface StepStatuses {
  id: number;
  end_date: string;
  client_id: number;
  note?: string | null;
  order_step_id: number;
  status: number;
  statuses?: null;
  order_step: [
    {
      id: number;
      department_id: number;
      employee_id: number;
      employees: {
        id: number;
        name: string;
        first_name: string;
        second_name: string;
        last_name: string;
      };
      department: {
        id: number;
        name: string;
      };
    }
  ];
}
