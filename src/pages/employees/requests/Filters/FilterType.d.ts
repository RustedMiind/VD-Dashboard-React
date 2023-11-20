export type FilterType = {
  edate?: string;
  sdate?: string;
  order: OrderByType;
  status?: string;
  department_id?: number;
};
export type OrderByType = "desc" | "asc";
