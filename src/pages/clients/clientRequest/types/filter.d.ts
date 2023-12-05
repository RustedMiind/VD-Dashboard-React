export interface Filter {
  dateFrom?: string | null;
  dateTo?: string | null;
  branch_id?: number | null;
  typeOrder?: string | null;
  search?: string | null;
  statusOrder?: number | null;
  sortBy?: OrderByType;
  typeClient?: "individual" | "company" | "";
}

export type OrderByType = "desc" | null;
