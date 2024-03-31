import { isStringAllNumbers } from "../../../../../../methods";
import { ReducerAction } from "../../../../../../types";

// Define the new action types
interface NameActionType extends ReducerAction<string> {
  type: "SET_NAME";
}
interface PeriodActionType extends ReducerAction<string> {
  type: "SET_CODE";
}
interface AmountActionType extends ReducerAction<string> {
  type: "SET_TYPE";
}
interface FileActionType extends ReducerAction<File | undefined> {
  type: "SET_FILE";
}
interface ResetActionType extends ReducerAction<unknown> {
  type: "SET_RESET";
}

interface SetAllActionType
  extends ReducerAction<Partial<AddAttachmentFormType>> {
  type: "SET_ALL";
}

// Update ActionTypes union type to include the new StatusActionType
export type ActionTypes =
  | AmountActionType
  | PeriodActionType
  | NameActionType
  | FileActionType
  | ResetActionType
  | SetAllActionType; // Include the new action type

// Extend the existing AddAttachmentFormType to include the 'status' property and remove 'employee_id'
export type AddAttachmentFormType = {
  name: string;
  code: string;
  type: string;
  file: File | undefined;
};

// Update the reducer function to handle the new 'status' property
export function reducer(
  state: AddAttachmentFormType,
  action: ActionTypes
): AddAttachmentFormType {
  switch (action.type) {
    case "SET_NAME":
      return { ...state, name: action.payload };
    case "SET_CODE":
      return { ...state, code: action.payload };
    case "SET_TYPE":
      return { ...state, type: action.payload };
    case "SET_FILE":
      return { ...state, file: action.payload };
    case "SET_RESET":
      return AddAttachmentFormInit;
    case "SET_ALL":
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

// Initialize AddAttachmentFormType with the new 'status' property
export const AddAttachmentFormInit: AddAttachmentFormType = {
  file: undefined,
  name: "",
  code: "",
  type: "", // Include the new 'status' property with an initial value
};
