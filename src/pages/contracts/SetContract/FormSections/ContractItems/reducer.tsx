import { Domain } from "../../../../../constants";
import { Reducer } from "react";

export interface ContractItemsState {
  name: string;
  description: string;
  manager_id: string;
  start_date: string;
  end_date: string;
  sub_items: SubItem[];
  attachments: File[];
}

export type SubItem = {
  name: string;
  employee_id: string;
  is_progress_bar: "1" | "0";
  is_processing: "1" | "0";
  is_attachment: "0" | "1";
};

type Payload = {
  index: number;
  subItem: SubItem;
};

export type ActionTypes =
  | { type: "UPDATE_NAME"; payload: string }
  | { type: "UPDATE_DESCRIPTION"; payload: string }
  | { type: "UPDATE_MANAGER_ID"; payload: string }
  | { type: "UPDATE_CONTRACT_ID"; payload: string }
  | { type: "UPDATE_START_DATE"; payload: string }
  | { type: "UPDATE_END_DATE"; payload: string }
  | { type: "ADD_SUB_ITEM"; payload: Payload }
  | { type: "REMOVE_SUB_ITEM"; payload: number }
  | { type: "ADD_ATTACHMENT"; payload: File[] }
  | { type: "SET_CONTRACT_ITEMS"; payload: ContractItemsState[] };

const contractItemsIntial: ContractItemsState = {
  name: "",
  description: "",
  manager_id: "",
  // contract_id: id  || '',
  start_date: "",
  end_date: "",
  sub_items: [],
  attachments: [],
};

const reducer: Reducer<ContractItemsState, ActionTypes> = (state, action) => {
  switch (action.type) {
    case "UPDATE_NAME":
      return {
        ...state,
        name: action.payload,
      };
    case "UPDATE_DESCRIPTION":
      return {
        ...state,
        description: action.payload,
      };
    case "UPDATE_MANAGER_ID":
      return {
        ...state,
        manager_id: action.payload,
      };
    case "UPDATE_CONTRACT_ID":
      return {
        ...state,
        contract_id: action.payload,
      };
    case "UPDATE_START_DATE":
      return {
        ...state,
        start_date: action.payload,
      };
    case "UPDATE_END_DATE":
      return {
        ...state,
        end_date: action.payload,
      };
    case "ADD_SUB_ITEM":
      const { index, subItem } = action.payload;
      const updatedSubItems = [...state.sub_items];
      const subItemWithDefaults = {
        ...subItem,
        is_progress_bar: subItem.is_progress_bar || "0",
        is_processing: subItem.is_processing || "0",
        is_attachment: subItem.is_attachment || 0,
      };
      updatedSubItems[index] = subItemWithDefaults;
      return {
        ...state,
        sub_items: updatedSubItems,
      };

    case "REMOVE_SUB_ITEM":
      return {
        ...state,
        sub_items: state.sub_items.filter(
          (_, index) => index !== action.payload
        ),
      };
    case "ADD_ATTACHMENT":
      return {
        ...state,
        attachments: [...state.attachments, ...action.payload],
      };

    case "SET_CONTRACT_ITEMS":
      return {
        ...state,
        contractItems: action.payload,
      };

    default:
      return state;
  }
};

export { contractItemsIntial, reducer };
