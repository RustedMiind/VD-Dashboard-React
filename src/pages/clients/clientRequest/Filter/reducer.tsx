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
      return { ...state, statusOrder: action.payload };
    case "SET_BRANCH":
      return { ...state, branch_id: action.payload };
    case "SET_ORDER_BY_SORT":
      return { ...state, sortBy: action.payload };
    case "SET_SEARCH":
      return { ...state, search: action.payload };
    case "SET_ORDER_BY_CLIENT":
      return { ...state, typeClient: action.payload };
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

interface OrderTypeActionType extends ReducerAction<string> {
  type: "SET_ORDER_TYPE";
}
interface StatusActionType extends ReducerAction<number | null | undefined> {
  type: "SET_ORDER_STATUS";
}
interface BranchActionType extends ReducerAction<number | null> {
  type: "SET_BRANCH";
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

export const FiltersInit: Filter = {
  dateFrom: "",
  dateTo: "",
  statusOrder: 0,
  branch_id: 0,
  typeOrder: "",
  search: "",
  sortBy: "desc",
  typeClient: "",
};

export type ActionTypes =
  | EndDateActionType
  | StartDateActionType
  | OrderTypeActionType
  | BranchActionType
  | StatusActionType
  | OrderBySortActionType
  | SearchActionType
  | OrderByClient;

export default reducer;
