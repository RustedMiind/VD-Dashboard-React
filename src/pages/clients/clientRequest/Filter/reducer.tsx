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
    case "SET_ORDER_BY":
      return { ...state, orderBy: action.payload };
    case "SET_SEARCH":
      return { ...state, search: action.payload };
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
interface OrderByActionType extends ReducerAction<OrderByType> {
  type: "SET_ORDER_BY";
}

interface SearchActionType extends ReducerAction<string> {
  type: "SET_SEARCH";
}

export const FiltersInit: Filter = {
  dateFrom: "",
  dateTo: "",
  orderBy: "desc",
};

export type ActionTypes =
  | EndDateActionType
  | StartDateActionType
  | OrderTypeActionType
  | BranchActionType
  | StatusActionType
  | OrderByActionType
  | SearchActionType;

export default reducer;
