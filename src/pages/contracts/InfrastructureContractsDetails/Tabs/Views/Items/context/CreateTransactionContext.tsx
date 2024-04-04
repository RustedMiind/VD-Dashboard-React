import { SetStateAction, useEffect, useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { ContractSubItem } from "../../../../../../../types/Contracts/ContractItems";

type childrenProps = {
  children: React.ReactNode;
};

export const CreateTransactionContext =
  createContext<CreateTransactionContextType>({
    contractSubItem: undefined,
    setContractSubItem: (data) => {},
    transactionId: undefined,
    setTransactionId: (num) => {},
    refresh: () => {},
  });

export function CreateTransactionContextProvider({ children }: childrenProps) {
  const [transactionId, setTransactionId] = useState<number>();
  const [contractSubItem, setContractSubItem] = useState<ContractSubItem>();

  const handleSetContractSubItem = (data: ContractSubItem) => {
    setContractSubItem(data);
  };
  const handleSetTransactionId = (num: number) => {
    if (num == -1) setTransactionId(undefined);
    setTransactionId(num);
  };
  return (
    <CreateTransactionContext.Provider
      value={{
        contractSubItem: contractSubItem,
        setContractSubItem: handleSetContractSubItem,
        transactionId: transactionId,
        setTransactionId: handleSetTransactionId,
        refresh: () => {},
      }}
    >
      {children}
    </CreateTransactionContext.Provider>
  );
}
type CreateTransactionContextType = {
  contractSubItem: ContractSubItem | undefined;
  setContractSubItem: (data: ContractSubItem) => void;
  transactionId: number | undefined;
  setTransactionId: (num: number) => void;
  refresh: () => void;
};
