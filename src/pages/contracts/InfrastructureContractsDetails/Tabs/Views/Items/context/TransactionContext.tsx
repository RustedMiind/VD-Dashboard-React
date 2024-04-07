import { createContext, useState } from "react";
import { TransactionType } from "../../../../../../../types/Contracts/ContractTransactionAttachment";
import axios from "axios";
import { ContractSubItem } from "../../../../../../../types/Contracts/ContractItems";
import { Api } from "../../../../../../../constants";

export interface TransactionContextType {
  refresh: (id?: number) => void;
  loading:boolean;
  transactions: TransactionType[];
}

export const TransactionContext = createContext<TransactionContextType>({
  refresh() {},
  loading:false,
  transactions: [],
});

export function TransactionContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  //TODO::declare and define component state and variables
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [loading, setLoading] = useState(false);

  // TODO::define helpers method
  // * This method will be refresh method in context :)
  const getTransactionData = async (id: number) => {
    try {
      setLoading(true);
      console.log("getTransactionData running", id);
      const { data } = await axios.get<{
        contract_sub_item: ContractSubItem;
      }>(Api(`employee/contract/items/show-subitem/${id}`));
      setTransactions(data.contract_sub_item.processing || []);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log("Error in fetch data::", err);
    }
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        loading,
        refresh: (id) => {
          if (id) getTransactionData(id);
        },
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}
