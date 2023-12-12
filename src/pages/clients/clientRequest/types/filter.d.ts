export interface Filter {
  dateFrom?: string | null;
  dateTo?: string | null;
  department_id?: number | null;
  typeOrder?: string | null;
  search?: string | null;
  status?: number | null;
  sortBy?: OrderByType;
  typeClient?: "individual" | "company" | "";
  limit?: number;
}

export type OrderByType = "desc" | null;
