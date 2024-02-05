import { ReducerAction } from "../../../../types";
import { Filter, OrderByType } from "../types";

const reducer = (state: Filter, action: ActionTypes): Filter => {
  switch (action.type) {
    case "SET_START_DATE":
      return { ...state, dateFrom: action.payload };
    case "SET_END_DATE":
      return { ...state, dateTo: action.payload };
    case "SET_ORDER_TYPE":
      return { ...state, typeOrder: action.payload };
    case "SET_ORDER_STATUS":
      return { ...state, status: action.payload };
    case "SET_DEPARTMENT":
      return { ...state, department_id: action.payload };
    case "SET_ORDER_BY_SORT":
      return { ...state, sortBy: action.payload };
    case "SET_SEARCH":
      return { ...state, search: action.payload };
    case "SET_ORDER_BY_CLIENT":
      return { ...state, typeClient: action.payload };
    case "SET_LIMIT":
      return { ...state, limit: action.payload };
    default:
      return state;
  }
};

interface StartDateActionType extends ReducerAction<string> {
  type: "SET_START_DATE";
}

interface EndDateActionType extends ReducerAction<string> {
  type: "SET_END_DATE";
}

interface OrderTypeActionType extends ReducerAction<number> {
  type: "SET_ORDER_TYPE";
}
interface StatusActionType extends ReducerAction<number | null | undefined> {
  type: "SET_ORDER_STATUS";
}
interface DepartmentActionType extends ReducerAction<number | null> {
  type: "SET_DEPARTMENT";
}
interface OrderBySortActionType extends ReducerAction<OrderByType> {
  type: "SET_ORDER_BY_SORT";
}

interface SearchActionType extends ReducerAction<string> {
  type: "SET_SEARCH";
}

interface OrderByClient extends ReducerAction<"individual" | "company"> {
  type: "SET_ORDER_BY_CLIENT";
}

interface Limit extends ReducerAction<number> {
  type: "SET_LIMIT";
}

export const FiltersInit: Filter = {
  dateFrom: "",
  dateTo: "",
  status: 0,
  department_id: 0,
  typeOrder: 0,
  search: "",
  sortBy: "desc",
  typeClient: "",
  limit: 10,
};

export type ActionTypes =
  | EndDateActionType
  | StartDateActionType
  | OrderTypeActionType
  | DepartmentActionType
  | StatusActionType
  | OrderBySortActionType
  | SearchActionType
  | OrderByClient
  | Limit;

export default reducer;
