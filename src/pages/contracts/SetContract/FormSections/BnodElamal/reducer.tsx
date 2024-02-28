import { Domain } from "../../../../../constants";
import { Contract, ReducerAction } from "../../../../../types";

export const contractIntial: ContractItemsType = {
  contract_item_title:"",
  contract_item_description:"",
  contract_item_start_date:"",
  contract_item_end_date:"",
  contract_item_user:"",
  contract_item_name:"",
  contract_item_eng:"",
  contract_item_allowance:"",
  employee_id: 0,
};

export function reducer(state: FormData, action: ActionTypes): FormData {
  switch (action.type) {
    case "CONTRACT_ITEM_TITLE":
      return { ...state, contract_item_title: action.payload };
    case "CONTRACT_ITEM_DESCRIPTION":
      return { ...state, contract_item_description: action.payload };
    case "START_DATE":
      return { ...state, contract_item_start_date: action.payload };
    case "END_DATE":
      return { ...state, contract_item_end_date: action.payload };
    case "CONTRACT_ITEM_USER":
      return { ...state, contract_item_user: action.payload };
    case "CONTRACT_ITEM_NAME":
      return { ...state, contract_item_name: action.payload };
    case "CONTRACT_ITEM_ENG":
      return { ...state, contract_item_eng: action.payload };
      case 'ADD_ALLOWANCE_VALUE':
        return { ...state, contract_item_allowance: action.payload };
        case "EMPLOYEE_ID":
          return { ...state, employee_id: action.payload };
   
    case "DTO_TO_FORM":
      return {
        contract_item_title: action.payload.contract_item_title,
        contract_item_description: action.payload.contract_item_description,
        contract_item_start_date: action.payload.contract_item_start_date,
        contract_item_end_date: action.payload.contract_item_end_date,
        contract_item_user: action.payload.contract_item_user,
        contract_item_name: action.payload.contract_item_name,
        contract_item_eng: action.payload.contract_item_eng,
        contract_item_allowance: action.payload.contract_item_allowance,
        employee_id: action.payload.employee_id,

      };

    case "SET_ALL":
      return { ...state, ...action.payload };

    default:
      return state;
  }
}

interface ContractItemTitleActionType extends ReducerAction<string> {
  type: "CONTRACT_ITEM_TITLE";
}
interface ContractItemDescriptionActionType extends ReducerAction<string> {
  type: "CONTRACT_ITEM_DESCRIPTION";
}
interface ContractItemStartDateActionType extends ReducerAction<string> {
  type: "START_DATE";
}
interface ContractItemEndDateActionType extends ReducerAction<string> {
  type: "END_DATE";
}
interface ContractItemUserActionType extends ReducerAction<string> {
  type: "CONTRACT_ITEM_USER";
}
interface ContractItemNameActionType extends ReducerAction<string> {
  type: "CONTRACT_ITEM_NAME";
}
interface ContractItemEngActionType extends ReducerAction<string> {
  type: "CONTRACT_ITEM_ENG";
}
interface ContractItemAllowanceActionType extends ReducerAction<string> {
  type: "ADD_ALLOWANCE_VALUE";
}
interface EmployeeIDActionType extends ReducerAction<number> {
  type: "EMPLOYEE_ID";
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
interface CardImageUrlActionType extends ReducerAction<string | undefined> {
  type: "CARD_IMAGE_URL";
}
interface DtoToFormActionType extends ReducerAction<Contract> {
  type: "DTO_TO_FORM";
}
interface SetAllActionType extends ReducerAction<Partial<ContractItemsType>> {
  type: "SET_ALL";
}

export type ActionTypes =
  | ContractItemTitleActionType
  | ContractItemDescriptionActionType
  | ContractItemStartDateActionType
  | ContractItemEndDateActionType
  | ContractItemUserActionType
  | ContractItemNameActionType
  | ContractItemEngActionType
  | ContractItemAllowanceActionType




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
  | SetAllActionType;

export interface BaseContractType {
  code: number | null;
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
}

export interface ContractItemsType {
  contract_item_title: string | null;
  contract_item_description: string | null;
  contract_item_start_date: string | null;
  contract_item_end_date: string | null;
  contract_item_user: string | null;
  contract_item_name: string | null;
  contract_item_eng: string | null;
  contract_item_allowance: string | null;
  employee_id: number;

}


export type FormData = ContractItemsType;
