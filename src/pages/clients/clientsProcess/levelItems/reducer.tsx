import { StepType } from "../types/Step";

const dispatch = (state: StepType) => {
  return function (action: any): StepType {
    switch (action.type) {
      case "SET_MANAGEMENT":
        console.log(action.payload);
        return { ...state, management_id: action.payload };
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

export default dispatch;
