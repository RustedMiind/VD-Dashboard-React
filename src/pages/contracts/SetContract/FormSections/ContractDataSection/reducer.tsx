import { Domain } from "../../../../../constants";
import { Contract, ReducerAction } from "../../../../../types";

export const contractIntial: BaseContractType = {
  code: "",
  date: "",
  amount: null,
  period: null,
  details: "",
  type: 0,
  contract_type_id: 0,
  client_id: 0,
  branch_id: 0,
  card_image: null,
  management_id: 0,
  employee_id: 0,
  cardImageUrl: "",
  engineering_office: "",
  owner: "",
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
      return {
        ...state,
        management_id: 0,
        employee_id: 0,
        branch_id: action.payload,
      };
    case "CARD_IMAGE":
      return { ...state, card_image: action.payload };
    case "EMPLOYEE_ID":
      return { ...state, employee_id: action.payload };
    case "MANAGEMENT_ID":
      return { ...state, employee_id: 0, management_id: action.payload };
    case "OWNER":
      return { ...state, owner: action.payload };
    case "ENGINEERING_OFFICE":
      return { ...state, engineering_office: action.payload };

    case "DTO_TO_FORM":
      console.log("action", action);
      return {
        amount: action.payload.amount,
        period: parseInt(action.payload.period),
        date: action.payload.date,
        client_id: action.payload.client_id,
        cardImageUrl: action.payload.card_image
          ? (Domain(
              "storage/" + action.payload.card_image
            ) as unknown as string)
          : undefined,
        branch_id: action.payload.branch_id,
        code: action.payload.code,
        contract_type_id: action.payload.contract_type_id,
        details: action.payload.details,
        employee_id: action.payload.employee_id,
        management_id: action.payload.management_id,
        type: action.payload.type?.id,
        card_image: null,
        owner: action.payload.owner,
        engineering_office: action.payload.engineering_office,
      };

    case "SET_ALL":
      return { ...state, ...action.payload };
    case "CARD_IMAGE_URL":
      return { ...state, cardImageUrl: action.payload };
    default:
      return state;
  }
}

interface CodeActionType extends ReducerAction<string> {
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
interface CardImageUrlActionType extends ReducerAction<string | undefined> {
  type: "CARD_IMAGE_URL";
}
interface DtoToFormActionType extends ReducerAction<Contract> {
  type: "DTO_TO_FORM";
}
interface SetAllActionType extends ReducerAction<Partial<BaseContractType>> {
  type: "SET_ALL";
}

interface OwnerActionType extends ReducerAction<string> {
  type: "OWNER";
}
interface EngineerOfficeActionType extends ReducerAction<string> {
  type: "ENGINEERING_OFFICE";
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
  | CardImageUrlActionType
  | EmployeeIDActionType
  | DtoToFormActionType
  | SetAllActionType
  | OwnerActionType
  | EngineerOfficeActionType;

export interface BaseContractType {
  code: string;
  date: string;
  card_image: File | null;
  type: number | null;
  details: string;
  contract_type_id: number | null;
  client_id: number;
  branch_id: number;
  management_id: number;
  employee_id: number;
  amount: number | null;
  period: number | null;
  cardImageUrl?: string;
  engineering_office: string;
  owner: string;
}

export type FormData = BaseContractType;
