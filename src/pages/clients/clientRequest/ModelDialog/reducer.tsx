import { ReducerAction } from "../../../../types";
import { ModelStatusType, ModelType } from "./ModelTypes";

export const ModelFormInitialState: ModelType = {
  order_step_id: 0,
  form_id: 0,
  client_id: 0,
  branch_id: 0,
  collection: 0,
  status: 0,
  note: "",
};

export const reducer = (
  state: ModelType,
  action: FormActionTypes
): ModelType => {
  switch (action.type) {
    case "SET_STEP_ID":
      return { ...state, order_step_id: action.payload };
    case "SET_FORM_ID":
      return { ...state, form_id: action.payload };
    case "SET_CLIENT_ID":
      return { ...state, client_id: action.payload };
    case "SET_BRANCH_ID":
      return { ...state, branch_id: action.payload };
    case "SET_COLLECTION":
      return { ...state, collection: action.payload };
    case "SET_STATUS":
      return { ...state, status: action.payload };
    case "SET_NOTE":
      return { ...state, note: action.payload };
    case "SET_RESET":
      return ModelFormInitialState;
    default:
      return state;
  }
};

interface SetStepId extends ReducerAction<number> {
  type: "SET_STEP_ID";
}
interface SetFormId extends ReducerAction<number> {
  type: "SET_FORM_ID";
}
interface SetClientId extends ReducerAction<number> {
  type: "SET_CLIENT_ID";
}
interface SetReset extends ReducerAction<null | undefined> {
  type: "SET_RESET";
}
interface SetBranchId extends ReducerAction<number> {
  type: "SET_BRANCH_ID";
}
interface SetCollection extends ReducerAction<number> {
  type: "SET_COLLECTION";
}
interface SetStatus extends ReducerAction<ModelStatusType> {
  type: "SET_STATUS";
}
interface SetNote extends ReducerAction<string> {
  type: "SET_NOTE";
}

type FormActionTypes =
  | SetStepId
  | SetFormId
  | SetClientId
  | SetBranchId
  | SetCollection
  | SetStatus
  | SetNote
  | SetReset;
