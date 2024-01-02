import { ReducerAction } from "../../../../../../types";
import { TenderTask } from "../../../../../../types/Tenders/TenderTask";

export function reducer(
  state: TenderManagersState,
  action: ActionTypes
): TenderManagersState {
  switch (action.type) {
    case "SET_MANAGER_ID":
      return { ...state, managerId: action.payload };
    case "SET_APPROVAL_END_DATE":
      return { ...state, approvalEndDate: action.payload };
    case "SET_PURCHASE_MANAGER_ID":
      return { ...state, purchaseManagerId: action.payload };
    case "SET_PURCHASE_DATE":
      return { ...state, purchaseDate: action.payload };
    case "SET_TECHNICAL_MANAGER":
      return { ...state, technicalManager: action.payload };
    case "SET_TECHNICAL_END_DATE":
      return { ...state, technecalEndDate: action.payload };
    case "SET_TECHNICAL_ALTERNATIVE":
      return { ...state, technicalAlternative: action.payload };
    case "SET_TECHNICAL_ALTERNATIVE_END_DATE":
      return { ...state, technicalAlternativeEndDate: action.payload };
    case "SET_REQUIRED_FILES":
      if (state.requiredFiles.includes(action.payload)) {
        return {
          ...state,
          requiredFiles: state.requiredFiles.filter(
            (x) => x !== action.payload
          ),
        };
      } else {
        return {
          ...state,
          requiredFiles: [...state.requiredFiles, action.payload],
        };
      }
    case "SET_NOTES":
      return { ...state, notes: action.payload };
    case "SET_FINANCIAL_MANAGER":
      return { ...state, financialManager: action.payload };
    case "SET_FINANCIAL_END_DATE":
      return { ...state, financialEndDate: action.payload };
    case "SET_APPLY_MANAGER":
      return { ...state, applyManager: action.payload };
    case "SET_APPLY_DATE":
      return { ...state, applyDate: action.payload };
    case "EXTRACT_DTO":
      return createDtoToState(action.payload);
    default:
      return state;
  }
}

export function createDtoToState(dto: TenderTask): TenderManagersState {
  return {
    managerId: dto.eng_employee_id.toString(),
    approvalEndDate: dto.end_dete_accept,
    purchaseManagerId: dto.eng_employee_id_buy_tender.toString(),
    purchaseDate: dto.dete_buy_tender,
    technicalManager: dto.eng_employee_id_technical.toString(),
    technecalEndDate: dto.end_dete_technical,
    technicalAlternative: dto.employee_id_trace.toString(), // Add appropriate property from PostDto if available
    technicalAlternativeEndDate: dto.end_dete_trace,
    requiredFiles:
      dto.tender_warranties?.map((x) => x.warranty_id.toString()) || [],
    notes: dto.note,
    financialManager: dto.eng_employee_id_file_finacial.toString(),
    financialEndDate: dto.dete_file_finacial,
    applyManager: dto.eng_employee_id_apply_tender.toString(),
    applyDate: dto.dete_apply_tender,
  };
}

export function stateToPostDto(
  state: TenderManagersState,
  id: string
): PostDto {
  return {
    tender_id: id,
    dete_apply_tender: state.applyDate,
    end_dete_accept: state.approvalEndDate,
    dete_buy_tender: state.purchaseDate,
    dete_file_finacial: state.financialEndDate,
    employee_id_trace: state.technicalAlternative,
    end_dete_technical: state.technecalEndDate,
    end_dete_trace: state.technicalAlternativeEndDate,
    eng_employee_id: state.managerId,
    eng_employee_id_apply_tender: state.applyManager,
    eng_employee_id_buy_tender: state.purchaseManagerId,
    eng_employee_id_file_finacial: state.financialManager,
    warranty_id: state.requiredFiles,
    eng_employee_id_technical: state.technicalManager,
    note: state.notes,
  };
}

type PostDto = {
  tender_id: string;
  eng_employee_id: string;
  end_dete_accept: string;
  eng_employee_id_buy_tender: string;
  dete_buy_tender: string;
  eng_employee_id_technical: string;
  end_dete_technical: string;
  employee_id_trace: string;
  end_dete_trace: string;
  note: string;
  eng_employee_id_file_finacial: string;
  warranty_id: string[];
  dete_file_finacial: string;
  eng_employee_id_apply_tender: string;
  dete_apply_tender: string;
};

type TenderManagersState = {
  managerId: string;
  approvalEndDate: string;
  purchaseManagerId: string;
  purchaseDate: string;
  technicalManager: string;
  technecalEndDate: string;
  technicalAlternative: string;
  technicalAlternativeEndDate: string;
  requiredFiles: string[];
  notes: string;
  financialManager: string;
  financialEndDate: string;
  applyManager: string;
  applyDate: string;
};

export const initialTenderManagersState: TenderManagersState = {
  managerId: "",
  approvalEndDate: "",
  purchaseManagerId: "",
  purchaseDate: "",
  technicalManager: "",
  technecalEndDate: "",
  technicalAlternative: "",
  technicalAlternativeEndDate: "",
  requiredFiles: [],
  notes: "",
  financialManager: "",
  financialEndDate: "",
  applyManager: "",
  applyDate: "",
};

interface SetManagerId extends ReducerAction<string, "SET_MANAGER_ID"> {}
interface SetApprovalEndDate
  extends ReducerAction<string, "SET_APPROVAL_END_DATE"> {}
interface SetPurchaseManagerId
  extends ReducerAction<string, "SET_PURCHASE_MANAGER_ID"> {}
interface SetPurchaseDate extends ReducerAction<string, "SET_PURCHASE_DATE"> {}
interface SetTechnicalManager
  extends ReducerAction<string, "SET_TECHNICAL_MANAGER"> {}
interface SetTechnicalEndDate
  extends ReducerAction<string, "SET_TECHNICAL_END_DATE"> {}
interface SetTechnicalAlternative
  extends ReducerAction<string, "SET_TECHNICAL_ALTERNATIVE"> {}
interface SetTechnicalAlternativeEndDate
  extends ReducerAction<string, "SET_TECHNICAL_ALTERNATIVE_END_DATE"> {}
interface SetRequiredFiles
  extends ReducerAction<string, "SET_REQUIRED_FILES"> {}
interface SetNotes extends ReducerAction<string, "SET_NOTES"> {}
interface SetFinancialManager
  extends ReducerAction<string, "SET_FINANCIAL_MANAGER"> {}
interface SetFinancialEndDate
  extends ReducerAction<string, "SET_FINANCIAL_END_DATE"> {}
interface SetApplyManager extends ReducerAction<string, "SET_APPLY_MANAGER"> {}
interface SetApplyDate extends ReducerAction<string, "SET_APPLY_DATE"> {}
interface ExtractDto extends ReducerAction<TenderTask, "EXTRACT_DTO"> {}

type ActionTypes =
  | SetManagerId
  | SetApprovalEndDate
  | SetPurchaseManagerId
  | SetPurchaseDate
  | SetTechnicalManager
  | SetTechnicalEndDate
  | SetTechnicalAlternative
  | SetTechnicalAlternativeEndDate
  | SetRequiredFiles
  | SetNotes
  | SetFinancialManager
  | SetFinancialEndDate
  | SetApplyManager
  | SetApplyDate
  | ExtractDto;
