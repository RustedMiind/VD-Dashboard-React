import { isStringAllNumbers } from "../../../../../../methods";
import { ReducerAction, TenderData } from "../../../../../../types";

export function reducer(
  state: TenderDataState,
  action: ActionTypes
): TenderDataState {
  switch (action.type) {
    case "SET_BRANCH_ID":
      return {
        ...state,
        managementId: "",
        departmentId: "",
        branchId: action.payload,
      };
    case "SET_MANAGEMENT_ID":
      return { ...state, managementId: action.payload };
    case "SET_REFERENCE_NUMBER":
      return isStringAllNumbers(action.payload)
        ? { ...state, referenceNumber: action.payload }
        : state;
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
      return isStringAllNumbers(action.payload)
        ? { ...state, price: action.payload }
        : state;
    case "SET_TYPE_ID":
      return { ...state, typeId: action.payload };
    case "SET_DEPARTMENT_ID":
      return { ...state, departmentId: action.payload };
    case "SET_ACTIVITY":
      return { ...state, activity: action.payload };
    case "SET_CONTRACT_DURATION":
      return isStringAllNumbers(action.payload)
        ? { ...state, contractDuration: action.payload }
        : state;
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
    case "EXTRACT_DTO":
      return dtoToState(action.payload);
    default:
      return state;
  }
}

export function dtoToState(dto: TenderData): TenderDataState {
  console.log(dto, "dto");
  return {
    branchId: `${dto.management?.branch_id || ""}`,
    managementId: `${dto.management_id || ""}`,
    referenceNumber: dto.code_reference.toString(),
    number: dto.code_tender.toString(),
    name: dto.name,
    applyDate: dto.strat_date,
    governmentalOrganizationId: dto.organization_id.toString(),
    endDate: dto.end_date,
    price: dto.price.toString(),
    typeId: dto.type_id.toString(),
    departmentId: dto.department_id?.toString() || "",
    activity: dto.activity || "",
    contractDuration: dto.period.toString(),
    applyTypeId: dto.apply_id.toString(),
    requiredWarranty: dto.tender_warranties.map((x) =>
      x.warranty_id.toString()
    ),
  };
}

export function stateToPostDto(state: TenderDataState): PostDto {
  return {
    branch_id: state.branchId,
    code_reference: state.referenceNumber,
    department_id: state.departmentId,
    end_date: state.endDate,
    strat_date: state.applyDate,
    management_id: state.managementId,
    name: state.name,
    organization_id: state.governmentalOrganizationId,
    price: state.price,
    type_id: state.typeId,
    warranty_id: state.requiredWarranty,
    activity: state.activity,
    code_tender: state.number,
    period: state.contractDuration,
    apply_id: state.applyTypeId,
  };
}

type PostDto = {
  department_id: string;
  type_id: string;
  branch_id: string;
  management_id: string;
  code_reference: string;
  code_tender: string;
  activity: string;
  period: string;
  name: string;
  strat_date: string;
  end_date: string;
  organization_id: string;
  price: string;
  warranty_id: string[];
  apply_id: string;
};

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
interface ExtractDto extends ReducerAction<TenderData, "EXTRACT_DTO"> {}

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
  | SetReset
  | ExtractDto;
