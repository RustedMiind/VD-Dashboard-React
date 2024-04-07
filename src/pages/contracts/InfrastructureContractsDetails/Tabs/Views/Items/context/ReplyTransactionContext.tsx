import { createContext, useState } from "react";
import { TransactionType } from "../../../../../../../types/Contracts/ContractTransactionAttachment";
import axios from "axios";
import { ContractSubItem } from "../../../../../../../types/Contracts/ContractItems";
import { Api } from "../../../../../../../constants";

export interface ReplyTransactionContextType {
  transactionId: number;
  commentId: number;
  handleSetCommentId: (id: number) => void;
  handleSetTransactionId: (id: number) => void;
}

export const ReplyTransactionContext =
  createContext<ReplyTransactionContextType>({
    transactionId: -1,
    commentId: -1,
    handleSetCommentId(id) {},
    handleSetTransactionId(id) {},
  });

export function ReplyTransactionContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  //TODO::declare and define component state and variables
  const [transactionId, setTransactionId] = useState<number>(-1);
  const [commentId, setCommentId] = useState<number>(-1);

  // TODO::define helpers method
  // * This method will be refresh method in context :)
  const handleSetTransactionId = (id: number) => {
    setTransactionId(id);
  };
  const handleSetCommentId = (id: number) => {
    setCommentId(id);
  };

  return (
    <ReplyTransactionContext.Provider
      value={{
        transactionId,
        commentId,
        handleSetCommentId,
        handleSetTransactionId,
      }}
    >
      {children}
    </ReplyTransactionContext.Provider>
  );
}
