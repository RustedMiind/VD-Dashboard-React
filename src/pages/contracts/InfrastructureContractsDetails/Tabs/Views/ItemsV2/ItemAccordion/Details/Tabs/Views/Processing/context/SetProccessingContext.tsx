import { createContext, useState } from "react";
import { ContractSubItem } from "../../../../../../../../../../../../types/Contracts/ContractItems";

export const SetProccessingContext = createContext<SetProccessingContextType>({
  transactionId: undefined,
  setTransactionId: (num) => {},
  refreshTransactionAttachments: () => {},
  commentId: undefined,
  setCommentId: (num) => {},
  subItem: undefined,
});

export function SetProccessingContextProvider({
  children,
  subItem,
}: {
  children: React.ReactNode;
  subItem: ContractSubItem;
}) {
  const [transactionId, setTransactionId] = useState<number>();
  const [commentId, setCommentId] = useState<number>();


  const handleSetCommentId = (num: number) => {
    if (num == -1) setCommentId(undefined);
    setCommentId(num);
  };

  const handleSetTransactionId = (num: number) => {
    if (num == -1) setTransactionId(undefined);
    setTransactionId(num);
  };

  return (
    <SetProccessingContext.Provider
      value={{
        transactionId: transactionId,
        setTransactionId: handleSetTransactionId,
        refreshTransactionAttachments: () => {},
        commentId: commentId,
        setCommentId: handleSetCommentId,
        subItem: subItem,
      }}
    >
      {children}
    </SetProccessingContext.Provider>
  );
}

type SetProccessingContextType = {
  transactionId: number | undefined;
  setTransactionId: (num: number) => void;
  commentId: number | undefined;
  setCommentId: (num: number) => void;
  refreshTransactionAttachments: () => void;
  subItem: ContractSubItem | undefined;
};
