import { ReducerAction } from "../../../../types";
import { StepType } from "../types/Step";

const dispatch = (state: StepType) => {
  return function (action: ActionType): StepType {
    switch (action.type) {
      case "SET_MANAGEMENT":
        return { ...state, department_id: action.payload };
      case "SET_EMPLOYEE":
        return { ...state, employee_id: action.payload };
      case "SET_ACCEPT":
        if (state.accept === 1) {
          return { ...state, accept: 0 };
        } else {
          return { ...state, accept: 1 };
        }
      case "SET_APPROVAL":
        if (state.approval === 1) {
          return { ...state, approval: 0 };
        } else {
          return { ...state, approval: 1 };
        }
      case "SET_DURATION":
        return { ...state, period: parseInt(action.payload) || 0 };
      case "SET_MODEL":
        return { ...state, form_id: action.payload };
      case "SET_RESET":
        return action.payload;
      default:
        return state;
    }
  };
};

interface SetManagement extends ReducerAction<number> {
  type: "SET_MANAGEMENT";
}

interface SetEmployee extends ReducerAction<number> {
  type: "SET_EMPLOYEE";
}

interface SetAccept extends ReducerAction<number> {
  type: "SET_ACCEPT";
}

interface SetApproval extends ReducerAction<number> {
  type: "SET_APPROVAL";
}

interface SetDuration extends ReducerAction<string> {
  type: "SET_DURATION";
}

interface SetModel extends ReducerAction<number> {
  type: "SET_MODEL";
}

interface SetReset extends ReducerAction<StepType> {
  type: "SET_RESET";
}

export type ActionType =
  | SetManagement
  | SetEmployee
  | SetAccept
  | SetApproval
  | SetDuration
  | SetModel
  | SetReset;

export default dispatch;
