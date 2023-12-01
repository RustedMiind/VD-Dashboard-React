import { isStringAllNumbers } from "../../../../../../methods";
import { ReducerAction } from "../../../../../../types";

// Define the new action types
interface NameActionType extends ReducerAction<string> {
  type: "SET_NAME";
}
interface PeriodActionType extends ReducerAction<string> {
  type: "SET_PERIOD";
}
interface AmountActionType extends ReducerAction<string> {
  type: "SET_AMOUNT";
}
interface ResetActionType extends ReducerAction<any> {
  type: "SET_RESET";
}
interface SetAllActionType extends ReducerAction<Partial<AddPaymentFormType>> {
  type: "SET_ALL";
}
interface StatusActionType extends ReducerAction<string> {
  type: "SET_STATUS";
}

// Update ActionTypes union type to include the new StatusActionType
export type ActionTypes =
  | AmountActionType
  | PeriodActionType
  | NameActionType
  | ResetActionType
  | SetAllActionType
  | StatusActionType; // Include the new action type

// Extend the existing AddPaymentFormType to include the 'status' property and remove 'employee_id'
export type AddPaymentFormType = {
  name: string;
  period: string;
  amount: string;
  status: string; // Include the new 'status' property
};

// Update the reducer function to handle the new 'status' property
export function reducer(
  state: AddPaymentFormType,
  action: ActionTypes
): AddPaymentFormType {
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
    case "SET_RESET":
      return AddTaskFormInit;
    case "SET_ALL":
      return { ...state, ...action.payload };
    case "SET_STATUS":
      return { ...state, status: action.payload }; // Handle setting the 'status' property
    default:
      return state;
  }
}

// Initialize AddPaymentFormType with the new 'status' property
export const AddTaskFormInit: AddPaymentFormType = {
  amount: "",
  name: "",
  period: "",
  status: "", // Include the new 'status' property with an initial value
};
