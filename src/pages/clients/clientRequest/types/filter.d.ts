export interface Filter {
  dateFrom?: string | null;
  dateTo?: string | null;
  statusOrder?: number | null;
  branch_id?: number | null;
  typeOrder?: string | null;
  search?: string | null;
  orderBy?: OrderByType | null;
}

export type OrderByType = "desc" | "asc";
