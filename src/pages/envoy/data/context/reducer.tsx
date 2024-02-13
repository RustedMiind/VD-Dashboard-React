import { EnvoysStateType } from ".";
import { ReducerAction } from "../../../../types";
import { Envoy } from "../../../../types/Envoys/Envoy";

export function reducer(
  state: EnvoysStateType,
  action: Action
): EnvoysStateType {
  const { envoys } = state;

  switch (action.type) {
    case "SET_ENVOYS":
      return {
        envoys: action.payload,
        status: "none",
      };
    case "SET_LOADING":
      return {
        status: "loading",
      };
    case "SET_ERROR":
      return {
        status: "error",
      };
    default:
      return state;
  }
}

type SetEnvoysAction = ReducerAction<Envoy[], "SET_ENVOYS">;
type SetLoadingAction = ReducerAction<undefined, "SET_LOADING">;
type SetErrorAction = ReducerAction<undefined, "SET_ERROR">;

type Action = SetEnvoysAction | SetLoadingAction | SetErrorAction;
