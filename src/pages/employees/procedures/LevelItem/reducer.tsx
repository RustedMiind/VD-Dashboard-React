import { isStringAllNumbers } from "../../../../methods/isStringAllNumbers";
import { ReducerAction } from "../../../../types";
import { Step } from "../types";

function dispatch(state: Step) {
  return function (action: ActionTypes): Step {
    switch (action.type) {
      case "SET_DEPARTMENT":
        if (state.employee_id !== -1) return state;
        else {
          // if (action.payload === -1) {
          //   return { ...state, department_id: null };
          // } else
          return { ...state, department_id: action.payload };
        }
      case "SET_EMPLOYEE":
        if (state.department_id !== -1) return state;
        else {
          // if (action.payload === -1) {
          //   return { ...state, employee_id: null };
          // } else
          return { ...state, employee_id: action.payload };
        }
      case "SET_APPROVED":
        if (state.action === 1) {
          return { ...state, action: 3 };
        } else if (state.action === 2) {
          return { ...state, action: 0 };
        } else if (state.action === 3) {
          return { ...state, action: 1 };
        } else {
          return { ...state, action: 2 };
        }
      case "SET_ACCEPTED":
        if (state.action === 2) {
          return { ...state, action: 3 };
        } else if (state.action === 1) {
          return { ...state, action: 0 };
        } else if (state.action === 3) {
          return { ...state, action: 2 };
        } else {
          return { ...state, action: 1 };
        }
      case "SET_DURATION":
        if (isStringAllNumbers(action.payload)) {
          return { ...state, duration: parseInt(action.payload) || 0 };
        } else {
          return state;
        }
      case "SET_MODEL":
        return { ...state, model: action.payload };
      case "SET_RESET":
        return action.payload;
      default:
        return state;
    }
  };
}

interface ManagerActionType extends ReducerAction<number> {
  type: "SET_DEPARTMENT";
}
interface EmployeeActionType extends ReducerAction<number> {
  type: "SET_EMPLOYEE";
}
interface AcceptedActionType extends ReducerAction<0 | 1 | 2 | 3> {
  type: "SET_ACCEPTED";
}
interface ApprovedActionType extends ReducerAction<0 | 1 | 2 | 3> {
  type: "SET_APPROVED";
}
interface DurationActionType extends ReducerAction<string> {
  type: "SET_DURATION";
}
interface ModelActionType extends ReducerAction<1 | 2 | 3 | 4> {
  type: "SET_MODEL";
}
interface ModelActionResetType extends ReducerAction<Step> {
  type: "SET_RESET";
}

export type ActionTypes =
  | ManagerActionType
  | EmployeeActionType
  | AcceptedActionType
  | ApprovedActionType
  | DurationActionType
  | ModelActionType
  | ModelActionResetType;

export default dispatch;
