import { ReducerAction } from "../../../../types";
import { ModelStatusType, ModelType } from "./ModelTypes";

export const ModelFormInitialState: ModelType = {
  client_id: 0,
  status: 0,
  note: "",
};

export const reducer = (
  state: ModelType,
  action: FormActionTypes
): ModelType => {
  switch (action.type) {
    case "SET_CLIENT_ID":
      return { ...state, client_id: action.payload };
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

interface SetClientId extends ReducerAction<number> {
  type: "SET_CLIENT_ID";
}
interface SetReset extends ReducerAction<null | undefined> {
  type: "SET_RESET";
}
interface SetStatus extends ReducerAction<ModelStatusType> {
  type: "SET_STATUS";
}
interface SetNote extends ReducerAction<string> {
  type: "SET_NOTE";
}

type FormActionTypes = SetClientId | SetStatus | SetNote | SetReset;
