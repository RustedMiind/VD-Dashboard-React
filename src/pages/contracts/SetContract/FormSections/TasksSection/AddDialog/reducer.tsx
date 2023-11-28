import { isStringAllNumbers } from "../../../../../../methods";
import { ReducerAction } from "../../../../../../types";

export function reducer(
  state: AddTaskFormType,
  action: ActionTypes
): AddTaskFormType {
  switch (action.type) {
    case "SET_NAME":
      return { ...state, name: action.payload };
    case "SET_AMOUNT":
      if (isStringAllNumbers(action.payload))
        return { ...state, amount: action.payload };
      else return state;
    case "SET_PERIOD":
      if (isStringAllNumbers(action.payload))
        return { ...state, period: action.payload };
      else return state;
    case "SET_EMPLOYEE_ID":
      return { ...state, employee_id: action.payload };
    case "SET_RESET":
      return AddTaskFormInit;
    default:
      return state;
  }
}

interface NameActionType extends ReducerAction<string> {
  type: "SET_NAME";
}
interface PeriodActionType extends ReducerAction<string> {
  type: "SET_PERIOD";
}
interface AmountActionType extends ReducerAction<string> {
  type: "SET_AMOUNT";
}
interface ManagerActionType extends ReducerAction<string> {
  type: "SET_EMPLOYEE_ID";
}
interface ResetActionType extends ReducerAction<undefined | null> {
  type: "SET_RESET";
}

export const AddTaskFormInit: AddTaskFormType = {
  amount: "",
  employee_id: "",
  name: "",
  period: "",
};

export type ActionTypes =
  | AmountActionType
  | PeriodActionType
  | NameActionType
  | ManagerActionType
  | ResetActionType;

export type AddTaskFormType = {
  name: string;
  period: string;
  amount: string;
  employee_id: string;
};
