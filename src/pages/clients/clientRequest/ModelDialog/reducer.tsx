import { ReducerAction } from "../../../../types";
import { ModelFormType, ModelStatusType } from "./ModelFormType";

export const ModelFormInitial: ModelFormType = {};

export function reducer(
  state: ModelFormType,
  action: FormActionTypes
): ModelFormType {
  switch (action.type) {
    case "SET_STATUS":
      return { ...state, status: action.payload };
    case "SET_NOTE":
      return { ...state, note: action.payload };
    case "SET_EMPLOYEE_ID":
      return { ...state, employee_id: action.payload };
    case "SET_RESET":
      return ModelFormInitial;
    default:
      return state;
  }
}

interface SetStatus extends ReducerAction<ModelStatusType> {
  type: "SET_STATUS";
}
interface SetEmployeeId extends ReducerAction<number | undefined> {
  type: "SET_EMPLOYEE_ID";
}
interface SetNote extends ReducerAction<string | undefined> {
  type: "SET_NOTE";
}
interface SetReset extends ReducerAction<null | undefined> {
  type: "SET_RESET";
}

type FormActionTypes = SetStatus | SetEmployeeId | SetNote | SetReset;
