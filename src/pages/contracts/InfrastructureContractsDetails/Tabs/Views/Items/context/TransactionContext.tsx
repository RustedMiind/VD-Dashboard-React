import { createContext, useState } from "react";
import { TransactionType } from "../../../../../../../types/Contracts/ContractTransactionAttachment";
import axios from "axios";
import {
  ContractItem,
  ContractSubItem,
} from "../../../../../../../types/Contracts/ContractItems";
import { Api } from "../../../../../../../constants";

export interface TransactionContextType {
  refresh: (id?: number) => void;
  loading: boolean;
  transactions: TransactionType[];
  currentMainItem: ContractItem | undefined;
  // open transaction setting
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  subItem?: ContractSubItem;
}

export const TransactionContext = createContext<TransactionContextType>({
  refresh() {},
  loading: false,
  transactions: [],
  currentMainItem: undefined,
  // open transaction setting
  open: false,
  handleOpen: () => {},
  handleClose: () => {},
});

export function TransactionContextProvider({
  currentMainItem,
  children,
}: {
  currentMainItem: ContractItem;
  children: React.ReactNode;
}) {
  //TODO::declare and define component state and variables
  const [subItem, setSubItem] = useState<ContractSubItem | undefined>();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const transactions: TransactionType[] = subItem?.processing || [];

  // TODO::define helpers method
  // * This method will be refresh method in context :)
  const getTransactionData = async (id: number) => {
    try {
      setLoading(true);
      console.log("getTransactionData running", id);
      const { data } = await axios.get<{
        contract_sub_item: ContractSubItem;
      }>(Api(`employee/contract/items/show-subitem/${id}`));
      setSubItem(data.contract_sub_item);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log("Error in fetch data::", err);
    }
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        subItem: subItem,
        loading,
        refresh: (id) => {
          if (id) getTransactionData(id);
        },
        currentMainItem,
        open,
        handleOpen,
        handleClose,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}
