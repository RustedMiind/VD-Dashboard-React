export type FilterType = {
  edate?: string;
  sdate?: string;
  order: OrderByType;
};
export type OrderByType = "desc" | "asc";
