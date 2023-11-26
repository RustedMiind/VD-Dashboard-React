import { ReducerAction } from "../../../../types";
import { RequestStatusType } from "../types/ProceduresModel";
import { FilterType, OrderByType } from "./FilterType";

function reducer(state: FilterType, action: ActionTypes): FilterType {
  switch (action.type) {
    case "SET_END_DATE":
      return { ...state, edate: action.payload };
    case "SET_START_DATE":
      return { ...state, sdate: action.payload };
    case "SET_ORDER_BY":
      return { ...state, order: action.payload };
    case "SET_STATUS":
      return { ...state, status: action.payload };
    case "SET_DEPARTMENT":
      return { ...state, department_id: action.payload };
    default:
      return state;
  }
}

interface EndDateActionType extends ReducerAction<string> {
  type: "SET_END_DATE";
}
interface StartDateActionType extends ReducerAction<string> {
  type: "SET_START_DATE";
}
interface OrderByActionType extends ReducerAction<OrderByType> {
  type: "SET_ORDER_BY";
}
interface StatusActionType
  extends ReducerAction<RequestStatusType | undefined> {
  type: "SET_STATUS";
}
interface DepartmentActionType extends ReducerAction<number | null> {
  type: "SET_DEPARTMENT";
}

export const FiltersInit: FilterType = {
  edate: "",
  sdate: "",
  order: "desc",
};

export type ActionTypes =
  | EndDateActionType
  | StartDateActionType
  | OrderByActionType
  | DepartmentActionType
  | StatusActionType;

export default reducer;
