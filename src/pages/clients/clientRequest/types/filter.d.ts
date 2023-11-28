export interface Filter {
  dateFrom?: string | null;
  dateTo?: string | null;
  statusOrder?: number | null;
  branch_id?: number | null;
  typeOrder?: string | null;
  search?: string | null;
  sortBy?: OrderByType | null;
  typeClient?: "individual" | "company" | "";
}

export type OrderByType = "desc" | "asc";
