import { ReducerAction } from "../../../../../../types";

export function reducer(
  state: AddTaskFormType,
  action: ActionTypes
): AddTaskFormType {
  switch (action.type) {
    case "SET_NAME":
      return { ...state, name: action.payload };
    case "SET_AMOUNT":
      return { ...state, amount: action.payload };
    case "SET_PERIOD":
      return { ...state, period: action.payload };
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
interface ResetActionType extends ReducerAction<undefined> {
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
