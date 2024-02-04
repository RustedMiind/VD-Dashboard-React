import { RequestStatusType } from "../../procedures/types";

export type FilterType = {
  edate?: string | null;
  sdate?: string | null;
  order: OrderByType | null;
  status?: RequestStatusType | null;
  department_id?: string | null;
};
export type OrderByType = "desc" | "asc";
