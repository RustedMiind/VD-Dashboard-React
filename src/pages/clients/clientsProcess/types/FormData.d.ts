export interface FormData {
  contractForm: [];
  department: [];
  department_workAt: [
    {
      active: number;
      created_at: string;
      deleted_at: null;
      id: number;
      management_id: number;
      manager_id: number;
      name: string;
      note: null;
      parent_id: null;
      type: string;
      updated_at: string;
      work_ats: [
        {
          created_at: string;
          departmentName: string;
          employee: {
            name: string;
            id: number;
          };
          employeeName: string;
          employee_id: number;
          id: number;
          updated_at: string;
          workable_id: number;
          workable_type: string;
        }
      ];
    }
  ];
  employees: [];
  stetues: [];
  typeOrder: [];
}
