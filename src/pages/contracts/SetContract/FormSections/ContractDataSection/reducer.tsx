import { ReducerAction } from "../../../../../types";

export const contractIntial: BaseContractType = {
  code: 0,
  date: "",
  amount: 0,
  period: 0,
  details: "",
  type: 0,
  contract_type_id: 0,
  client_id: 0,
  branch_id: 0,
  card_image: null,
  management_id: 0,
  employee_id: 0,
};

export function reducer(state: FormData, action: ActionTypes): FormData {
  switch (action.type) {
    case "CODE":
      return { ...state, code: action.payload };
    case "DATE":
      return { ...state, date: action.payload };
    case "AMOUNT":
      return { ...state, amount: action.payload };
    case "PERIOD":
      return { ...state, period: action.payload };
    case "TYPE":
      return { ...state, type: action.payload };
    case "DETAILS":
      return { ...state, details: action.payload };
    case "CONTRACT_TYPE_ID":
      return { ...state, contract_type_id: action.payload };
    case "CLIENT_ID":
      return { ...state, client_id: action.payload };
    case "BRANCH_ID":
      return { ...state, branch_id: action.payload };
    case "CARD_IMAGE":
      return { ...state, card_image: action.payload };
    case "EMPLOYEE_ID":
      return { ...state, employee_id: action.payload };
    case "MANAGEMENT_ID":
      return { ...state, management_id: action.payload };
    case "SET_ALL":
      return { ...state, ...action.payload };

    default:
      return state;
  }
}

interface CodeActionType extends ReducerAction<number> {
  type: "CODE";
}
interface DateActionType extends ReducerAction<string> {
  type: "DATE";
}
interface AmountActionType extends ReducerAction<number> {
  type: "AMOUNT";
}
interface PeriodActionType extends ReducerAction<number> {
  type: "PERIOD";
}
interface TypeActionType extends ReducerAction<number> {
  type: "TYPE";
}
interface DetailsActionType extends ReducerAction<string> {
  type: "DETAILS";
}
interface ContractTypeIDActionType extends ReducerAction<number> {
  type: "CONTRACT_TYPE_ID";
}
interface ClientIDActionType extends ReducerAction<number> {
  type: "CLIENT_ID";
}
interface BranchIDActionType extends ReducerAction<number> {
  type: "BRANCH_ID";
}
interface CardImageActionType extends ReducerAction<File> {
  type: "CARD_IMAGE";
}
interface ManagementIDActionType extends ReducerAction<number> {
  type: "MANAGEMENT_ID";
}
interface EmployeeIDActionType extends ReducerAction<number> {
  type: "EMPLOYEE_ID";
}
interface SetAllActionType extends ReducerAction<BaseContractType> {
  type: "SET_ALL";
}

export type ActionTypes =
  | CodeActionType
  | DateActionType
  | AmountActionType
  | PeriodActionType
  | TypeActionType
  | DetailsActionType
  | ContractTypeIDActionType
  | ClientIDActionType
  | BranchIDActionType
  | CardImageActionType
  | ManagementIDActionType
  | EmployeeIDActionType
  | SetAllActionType;

export interface BaseContractType {
  code: number;
  date: string;
  card_image: File | null;
  type: number | null;
  details: string;
  contract_type_id: number;
  client_id: number;
  branch_id: number;
  management_id: number;
  employee_id: number;
  amount: number;
  period: number;
}

export type FormData = BaseContractType;
