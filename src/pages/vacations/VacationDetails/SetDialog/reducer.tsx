import { ReducerAction, Vacation } from "../../../../types";
import { VacationFormType } from "./VacationFormType";

const reducer = (
  state: VacationFormType,
  action: ActionTypes
): VacationFormType => {
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
    case "ADD_EMPLOYEE":
      if (state.exception_employees.includes(action.payload)) {
        return state;
      }
      return {
        ...state,
        exception_employees: [...state.exception_employees, action.payload],
      };
    case "REMOVE_EMPLOYEE":
      return {
        ...state,
        exception_employees: state.exception_employees.filter(
          (employeeId) => employeeId !== action.payload
        ),
      };
    case "SET_ALL":
      return action.payload;
    case "SET_RESET":
      return VacationsInitial;
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
interface AddEmployeeActionType extends ReducerAction<number> {
  type: "ADD_EMPLOYEE";
}
interface RemoveEmployeeActionType extends ReducerAction<number> {
  type: "REMOVE_EMPLOYEE";
}

interface SetAllActionType extends ReducerAction<VacationFormType> {
  type: "SET_ALL";
}

interface SetResetActionType extends ReducerAction<unknown> {
  type: "SET_RESET";
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
  | AddEmployeeActionType
  | RemoveEmployeeActionType
  | VacationNameActionType
  | SetAllActionType
  | SetResetActionType;

export default reducer;

export function StateToCreateDto(
  state: VacationFormType,
  vacationDateId: number | string
) {
  return {
    date_from: state.date_from,
    date_to: state.date_to,
    name: state.vacation_name,
    vacation_date_id: vacationDateId,
    exception_employees: state.exception_employees,
    number_days: state.number_days,
  };
}

export function DtoToStateType(dto: Vacation): VacationFormType {
  return {
    date_from: dto.date_from,
    date_to: dto.date_to,
    exception_employees: dto.employees?.map((employee) => employee.id) || [],
    number_days: dto.number_days,
    vacation_name: dto.name,
    vacation_date_id: dto.vacation_date_id,
  };
}
