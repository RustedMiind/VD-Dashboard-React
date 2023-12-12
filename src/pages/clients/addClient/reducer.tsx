import { Domain } from "../../../constants";
import { ReducerAction } from "../../../types";
import { Client } from "../../../types/Clients/Client";

export const companyInitial: CompanyFormType = {
  type: "company",
  agent_name: "",
  branch_id: "0",
  broker_id: "0",
  register_number: null,
  card_image: null,
  letter_head: "",
  phone: "",
  email: "",
  name: "",
  cardImageUrl: "",
  check_phone: "check",
};
export const individualInitial: IndividualFormType = {
  type: "individual",
  branch_id: "0",
  broker_id: "0",
  card_id: null,
  card_image: null,
  letter_head: "",
  name: "",
  phone: "",
  email: "",
  cardImageUrl: "",
  check_phone: "check",
};

export function reducer(state: FormData, action: ActionTypes): FormData {
  switch (action.type) {
    case "TYPE":
      if (action.payload === "company") {
        return companyInitial;
      } else if (action.payload === "individual") {
        return individualInitial;
      } else {
        return state;
      }
    case "NAME":
      return { ...state, name: action.payload };
    // case "COMPANY_NAME":
    //   return { ...state, company_name: action.payload };
    case "CARD_ID":
      return { ...state, card_id: action.payload };
    case "REGISTER_NUMBER":
      return { ...state, register_number: action.payload };
    case "PHONE_NUMBER":
      return { ...state, phone: action.payload };
    case "EMAIL":
      return { ...state, email: action.payload };
    case "BRANCH_ID":
      return { ...state, branch_id: action.payload };
    case "BROKER_ID":
      return { ...state, broker_id: action.payload };
    case "LETTER_HEAD":
      return { ...state, letter_head: action.payload };
    case "CARD_IMAGE":
      return { ...state, card_image: action.payload };
    case "AGENT_NAME":
      return { ...state, agent_name: action.payload };
    case "CHECK_PHONE":
      return { ...state, check_phone: action.payload };
    case "SET_TYPE_WITH_CHECK":
      if (action.payload.type === "company") {
        return {
          branch_id: action.payload.branch_id,
          broker_id: action.payload.broker_id,
          name: action.payload.name,
          card_image: null,
          register_number: action.payload.register_number,
          email: action.payload.email,
          agent_name: action.payload.agent_name,
          letter_head: action.payload.letter_head,
          phone: action.payload.phone,
          type: "company",
          cardImageUrl: action.payload.card_image as unknown as string,
          check_phone: action.payload.check_phone,
        };
      } else if (action.payload.type === "individual") {
        return {
          branch_id: action.payload.branch_id,
          broker_id: action.payload.broker_id,
          card_image: null,
          cardImageUrl: action.payload.card_image as unknown as string,
          email: action.payload.email,
          name: action.payload.name,
          phone: action.payload.phone,
          type: "individual",
          card_id: action.payload.card_id,
          letter_head: action.payload.letter_head,
          check_phone: action.payload.check_phone,
        };
      } else return state;
    case "SET_DTO":
      if (action.payload.type === "company") {
        return {
          branch_id: action.payload.branch_id.toString(),
          broker_id: action.payload.broker_id.toString(),
          name: action.payload.name,
          card_image: null,
          register_number: action.payload.register_number,
          email: action.payload.email,
          agent_name: action.payload.agent_name,
          letter_head: action.payload.letter_head,
          phone: action.payload.phone,
          type: "company",
          cardImageUrl: Domain(
            ("storage/" + action.payload.card_image) as unknown as string
          ),
          check_phone: null,
        };
      } else if (action.payload.type === "individual") {
        return {
          branch_id: action.payload.branch_id?.toString(),
          broker_id: action.payload.broker_id?.toString(),
          card_image: null,
          cardImageUrl: Domain(
            ("storage/" + action.payload.card_image) as unknown as string
          ),
          email: action.payload.email,
          name: action.payload.name,
          phone: action.payload.phone,
          type: "individual",
          card_id: action.payload.card_id,
          letter_head: action.payload.letter_head,
          check_phone: null,
        };
      } else return state;
    case "CARD_IMAGE_URL":
      return { ...state, cardImageUrl: action.payload };
    default:
      return state;
  }
}

interface TypeActionType extends ReducerAction<"individual" | "company"> {
  type: "TYPE";
}
interface NameActionType extends ReducerAction<string> {
  type: "NAME";
}

interface CardIdActionType extends ReducerAction<string> {
  type: "CARD_ID";
}
interface RegisterNumberActionType extends ReducerAction<string> {
  type: "REGISTER_NUMBER";
}
interface PhoneNumberActionType extends ReducerAction<string> {
  type: "PHONE_NUMBER";
}
interface EmailActionType extends ReducerAction<string> {
  type: "EMAIL";
}
interface BranchActionType extends ReducerAction<string> {
  type: "BRANCH_ID";
}
interface BrokerIdActionType extends ReducerAction<string> {
  type: "BROKER_ID";
}
interface LetterHeadActionType extends ReducerAction<string> {
  type: "LETTER_HEAD";
}
interface CardImageActionType extends ReducerAction<File | null> {
  type: "CARD_IMAGE";
}
interface AgentNameActionType extends ReducerAction<string> {
  type: "AGENT_NAME";
}
interface CheckPhoneActionType extends ReducerAction<"check" | null> {
  type: "CHECK_PHONE";
}
interface SetFormWithCheckAcionType extends ReducerAction<FormData> {
  type: "SET_TYPE_WITH_CHECK";
}
interface CardImageUrlActionType extends ReducerAction<string | undefined> {
  type: "CARD_IMAGE_URL";
}
interface SetDtoToFormActionType extends ReducerAction<Client> {
  type: "SET_DTO";
}

export type ActionTypes =
  | TypeActionType
  | RegisterNumberActionType
  | NameActionType
  | CardIdActionType
  | PhoneNumberActionType
  | EmailActionType
  | BranchActionType
  | BrokerIdActionType
  | LetterHeadActionType
  | CardImageActionType
  | AgentNameActionType
  | SetFormWithCheckAcionType
  | CardImageUrlActionType
  | CheckPhoneActionType
  | SetDtoToFormActionType;
// | CompanyNameActionType
// | SetFormCompanyAcionType
// | SetFormIndividualAcionType;

export interface BaseFormData {
  id?: number;
  name: string;
  card_id?: string | null;
  register_number?: string | null;
  phone: string;
  branch_id: string;
  broker_id: string;
  letter_head: string;
  card_image?: File | null;
  email: string;
  agent_name?: string;
  cardImageUrl?: string;
  check_phone?: "check" | null;
}

export interface IndividualFormType extends BaseFormData {
  type: "individual";
}

export interface CompanyFormType extends BaseFormData {
  type: "company";
}

export type FormData = IndividualFormType | CompanyFormType;
