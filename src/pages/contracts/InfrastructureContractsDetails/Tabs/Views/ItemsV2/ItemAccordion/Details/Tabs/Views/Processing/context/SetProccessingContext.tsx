import { createContext, useState } from "react";
import { ContractSubItem } from "../../../../../../../../../../../../types/Contracts/ContractItems";

export const SetProccessingContext = createContext<SetProccessingContextType>({
  subItemId: undefined,
  setSubItemId: (num) => {},
  transactionId: undefined,
  setTransactionId: (num) => {},
  refreshTransactionAttachments: () => {},
  commentId: undefined,
  setCommentId: (num) => {},
  subItem: undefined,
  setSubItem: (data) => {},
});

export function SetProccessingContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [transactionId, setTransactionId] = useState<number>();
  const [subItemId, setSubItemId] = useState<number>();
  const [commentId, setCommentId] = useState<number>();
  const [subItem, setSubItem] = useState<ContractSubItem | undefined>();

  const handleSetSubItemId = (num: number) => {
    if (num == -1) setSubItemId(undefined);
    setSubItemId(num);
  };

  const handleSetCommentId = (num: number) => {
    if (num == -1) setCommentId(undefined);
    setCommentId(num);
  };

  const handleSetTransactionId = (num: number) => {
    if (num == -1) setTransactionId(undefined);
    setTransactionId(num);
  };
  const handleSetSubItem = (data: ContractSubItem | undefined) => {
    setSubItem(data);
  };

  return (
    <SetProccessingContext.Provider
      value={{
        subItemId: subItemId,
        setSubItemId: handleSetSubItemId,
        transactionId: transactionId,
        setTransactionId: handleSetTransactionId,
        refreshTransactionAttachments: () => {},
        commentId: commentId,
        setCommentId: handleSetCommentId,
        subItem: subItem,
        setSubItem: handleSetSubItem,
      }}
    >
      {children}
    </SetProccessingContext.Provider>
  );
}

type SetProccessingContextType = {
  subItemId: number | undefined;
  setSubItemId: (num: number) => void;
  transactionId: number | undefined;
  setTransactionId: (num: number) => void;
  commentId: number | undefined;
  setCommentId: (num: number) => void;
  refreshTransactionAttachments: () => void;
  subItem: ContractSubItem | undefined;
  setSubItem: (data: ContractSubItem | undefined) => void;
};
