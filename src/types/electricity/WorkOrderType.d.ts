export type procedure = {
  id: number;
  name: string;
  type_work_instruction_id: number;
  created_at: string;
  updated_at: string;
};

export type WorkOrderType = {
  id: number;
  name: string;
  reference_number: number;
  description: string;
  created_at: string;
  updated_at: string;
  procedures: procedure[];
};
