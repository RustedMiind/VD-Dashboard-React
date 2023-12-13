import { ReducerAction } from "../../../types";
import { VacationFormType } from "./types";

const reducer = (state: VacationFormType, action: ActionTypes) => {
  switch (action.type) {
    case "SET_DATE_FROM":
      return { ...state, date_from: action.payload };
    case "SET_DATE_TO":
      return { ...state, date_to: action.payload };
    case "SET_VACATION_ID":
      return { ...state, vacation_date_id: action.payload };
    case "SET_VACATION_NAME":
      return { ...state, vacation_name: action.payload };
    case "SET_NUMBER_DAYS":
      return { ...state, number_days: action.payload };
    case "SET_EMPLOYEES":
      return { ...state, exception_employees: action.payload };
    default:
      return state;
  }
};

interface DateFromActionType extends ReducerAction<string> {
  type: "SET_DATE_FROM";
}

interface DateToActionType extends ReducerAction<string> {
  type: "SET_DATE_TO";
}

interface VacationIdActionType extends ReducerAction<number> {
  type: "SET_VACATION_ID";
}

interface VacationNameActionType extends ReducerAction<string> {
  type: "SET_VACATION_NAME";
}

interface NumberDaysActionType extends ReducerAction<number> {
  type: "SET_NUMBER_DAYS";
}

interface EmployeeActionType extends ReducerAction<number[]> {
  type: "SET_EMPLOYEES";
}

export const VacationsInitial: VacationFormType = {
  date_from: "",
  date_to: "",
  vacation_name: "",
  vacation_date_id: 0,
  number_days: 0,
  exception_employees: [],
};

export type ActionTypes =
  | DateFromActionType
  | DateToActionType
  | VacationIdActionType
  | NumberDaysActionType
  | EmployeeActionType
  | VacationNameActionType;

export default reducer;
