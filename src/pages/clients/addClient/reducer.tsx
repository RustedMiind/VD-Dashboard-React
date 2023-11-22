export const companyInitial: CompanyFormType = {
  type: "company",
  agent_name: "",
  branch_id: 0,
  broker_id: 0,
  register_number: null,
  card_image: null,
  letter_head: "",
  phone: "",
  email: "",
  name: "",
};
export const individualInitial: IndividualFormType = {
  type: "individual",
  branch_id: 0,
  broker_id: 0,
  card_id: null,
  card_image: null,
  letter_head: "",
  name: "",
  phone: "",
  email: "",
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
        };
      } else if (action.payload.type === "individual") {
        return {
          branch_id: action.payload.branch_id,
          broker_id: action.payload.broker_id,
          card_image: null,
          email: action.payload.email,
          name: action.payload.name,
          phone: action.payload.phone,
          type: "individual",
          card_id: action.payload.card_id,
          letter_head: action.payload.letter_head,
        };
      } else return state;

    default:
      return state;
  }
}

interface ReducerAction<P> {
  type: string;
  payload: P;
}
interface TypeActionType extends ReducerAction<"individual" | "company"> {
  type: "TYPE";
}
interface NameActionType extends ReducerAction<string> {
  type: "NAME";
}

interface CardIdActionType extends ReducerAction<number | null> {
  type: "CARD_ID";
}
interface RegisterNumberActionType extends ReducerAction<number | null> {
  type: "REGISTER_NUMBER";
}
interface PhoneNumberActionType extends ReducerAction<string> {
  type: "PHONE_NUMBER";
}
interface EmailActionType extends ReducerAction<string> {
  type: "EMAIL";
}
interface BranchActionType extends ReducerAction<number> {
  type: "BRANCH_ID";
}
interface BrokerIdActionType extends ReducerAction<number> {
  type: "BROKER_ID";
}
interface LetterHeadActionType extends ReducerAction<string> {
  type: "LETTER_HEAD";
}
interface CardImageActionType extends ReducerAction<File> {
  type: "CARD_IMAGE";
}
interface AgentNameActionType extends ReducerAction<string> {
  type: "AGENT_NAME";
}
interface SetFormWithCheckAcionType extends ReducerAction<FormData> {
  type: "SET_TYPE_WITH_CHECK";
}

export type ActionTypes =
  | TypeActionType
  | RegisterNumberActionType
  | NameActionType
  // | CompanyNameActionType
  | CardIdActionType
  | PhoneNumberActionType
  | EmailActionType
  | BranchActionType
  | BrokerIdActionType
  | LetterHeadActionType
  | CardImageActionType
  | AgentNameActionType
  | SetFormWithCheckAcionType;
// | SetFormCompanyAcionType
// | SetFormIndividualAcionType;

export interface BaseFormData {
  name: string;
  card_id?: number | null;
  register_number?: number | null;
  phone: string;
  branch_id: number;
  broker_id: number;
  letter_head: string;
  card_image: File | null;
  email: string;
  agent_name?: string;
}

export interface IndividualFormType extends BaseFormData {
  type: "individual";
}

export interface CompanyFormType extends BaseFormData {
  type: "company";
}

export type FormData = IndividualFormType | CompanyFormType;