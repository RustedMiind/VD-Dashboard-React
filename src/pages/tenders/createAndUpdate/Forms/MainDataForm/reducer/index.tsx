import { ReducerAction } from "../../../../../../types";

export function reducer(
  state: TenderDataState,
  action: ActionTypes
): TenderDataState {
  switch (action.type) {
    case "SET_BRANCH_ID":
      return { ...state, branchId: action.payload };
    case "SET_MANAGEMENT_ID":
      return { ...state, managementId: action.payload };
    case "SET_REFERENCE_NUMBER":
      return { ...state, referenceNumber: action.payload };
    case "SET_NUMBER":
      return { ...state, number: action.payload };
    case "SET_NAME":
      return { ...state, name: action.payload };
    case "SET_APPLY_DATE":
      return { ...state, applyDate: action.payload };
    case "SET_GOVERNMENTAL_ORGANIZATION_ID":
      return { ...state, governmentalOrganizationId: action.payload };
    case "SET_END_DATE":
      return { ...state, endDate: action.payload };
    case "SET_PRICE":
      return { ...state, price: action.payload };
    case "SET_TYPE_ID":
      return { ...state, typeId: action.payload };
    case "SET_DEPARTMENT_ID":
      return { ...state, departmentId: action.payload };
    case "SET_ACTIVITY":
      return { ...state, activity: action.payload };
    case "SET_CONTRACT_DURATION":
      return { ...state, contractDuration: action.payload };
    case "SET_APPLY_TYPE_ID":
      return { ...state, applyTypeId: action.payload };
    case "TOGGLE_WARRANTY_ID":
      const warrantyId = action.payload;
      if (state.requiredWarranty.includes(warrantyId)) {
        return {
          ...state,
          requiredWarranty: state.requiredWarranty.filter(
            (wr) => warrantyId !== wr
          ),
        };
      } else {
        return {
          ...state,
          requiredWarranty: [...state.requiredWarranty, action.payload],
        };
      }
    case "SET_OBJECT":
      return { ...state, ...action.payload };
    case "SET_RESET":
      return { ...initialTenderDataState, ...action.payload };
    default:
      return state;
  }
}

type TenderDataState = {
  branchId: string;
  managementId: string;
  referenceNumber: string;
  number: string;
  name: string;
  applyDate: string;
  governmentalOrganizationId: string;
  endDate: string;
  price: string;
  typeId: string;
  departmentId: string;
  activity: string;
  contractDuration: string;
  applyTypeId: string;
  requiredWarranty: string[];
};

export const initialTenderDataState: TenderDataState = {
  branchId: "",
  managementId: "",
  referenceNumber: "",
  number: "",
  name: "",
  applyDate: "",
  governmentalOrganizationId: "",
  endDate: "",
  price: "",
  typeId: "",
  departmentId: "",
  activity: "",
  contractDuration: "",
  applyTypeId: "",
  requiredWarranty: [],
};

interface SetBranchId extends ReducerAction<string, "SET_BRANCH_ID"> {}
interface SetManagementId extends ReducerAction<string, "SET_MANAGEMENT_ID"> {}
interface SetReferenceNumber
  extends ReducerAction<string, "SET_REFERENCE_NUMBER"> {}
interface SetNumber extends ReducerAction<string, "SET_NUMBER"> {}
interface SetName extends ReducerAction<string, "SET_NAME"> {}
interface SetApplyDate extends ReducerAction<string, "SET_APPLY_DATE"> {}
interface SetGovernmentalOrganizationId
  extends ReducerAction<string, "SET_GOVERNMENTAL_ORGANIZATION_ID"> {}
interface SetEndDate extends ReducerAction<string, "SET_END_DATE"> {}
interface SetPrice extends ReducerAction<string, "SET_PRICE"> {}
interface SetTypeId extends ReducerAction<string, "SET_TYPE_ID"> {}
interface SetDepartmentId extends ReducerAction<string, "SET_DEPARTMENT_ID"> {}
interface SetActivity extends ReducerAction<string, "SET_ACTIVITY"> {}
interface SetContractDuration
  extends ReducerAction<string, "SET_CONTRACT_DURATION"> {}
interface SetApplyTypeId extends ReducerAction<string, "SET_APPLY_TYPE_ID"> {}
interface ToggleWarrantyId
  extends ReducerAction<string, "TOGGLE_WARRANTY_ID"> {}
interface SetPartial
  extends ReducerAction<Partial<TenderDataState>, "SET_OBJECT"> {}
interface SetReset
  extends ReducerAction<Partial<TenderDataState>, "SET_RESET"> {}

type ActionTypes =
  | SetBranchId
  | SetManagementId
  | SetReferenceNumber
  | SetNumber
  | SetName
  | SetApplyDate
  | SetGovernmentalOrganizationId
  | SetEndDate
  | SetPrice
  | SetTypeId
  | SetDepartmentId
  | SetActivity
  | SetContractDuration
  | SetApplyTypeId
  | ToggleWarrantyId
  | SetPartial
  | SetReset;
