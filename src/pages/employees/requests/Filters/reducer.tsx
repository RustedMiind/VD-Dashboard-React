import { ReducerAction } from "../../../../types";
import { FilterType, OrderByType } from "./FilterType";

function reducer(state: FilterType, action: ActionTypes): FilterType {
  switch (action.type) {
    case "SET_END_DATE":
      return { ...state, edate: action.payload };
    case "SET_START_DATE":
      return { ...state, sdate: action.payload };
    case "SET_ORDER_BY":
      return { ...state, order: action.payload };
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

export const FiltersInit: FilterType = {
  edate: "",
  sdate: "",
  order: "desc",
};

export type ActionTypes =
  | EndDateActionType
  | StartDateActionType
  | OrderByActionType;

export default reducer;
