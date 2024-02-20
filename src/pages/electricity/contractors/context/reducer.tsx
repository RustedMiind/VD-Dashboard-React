import { ContractorsStateType } from ".";
import { ReducerAction } from "../../../../types";
import { Contractor } from "../../../../types/Contractors/Contractor";

export function reducer(
  state: ContractorsStateType,
  action: Action
): ContractorsStateType {
  const { contractors } = state;

  switch (action.type) {
    case "SET_CONTRACTORS":
      return {
        contractors: action.payload,
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

type SetContractorsAction = ReducerAction<Contractor[], "SET_CONTRACTORS">;
type SetLoadingAction = ReducerAction<undefined, "SET_LOADING">;
type SetErrorAction = ReducerAction<undefined, "SET_ERROR">;

type Action = SetContractorsAction | SetLoadingAction | SetErrorAction;
