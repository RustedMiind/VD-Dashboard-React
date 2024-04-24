import { createContext, useEffect, useState } from "react";
import { ContractSubItem } from "../../../../../../../../../../../../types/Contracts/ContractItems";
import {
  TansactionAttachmentType,
  TransactionType,
} from "../../../../../../../../../../../../types/Contracts/ContractTransactionAttachment";
import axios from "axios";
import { Api } from "../../../../../../../../../../../../constants";

export const SetProccessingContext = createContext<SetProccessingContextType>({
  transactionId: undefined,
  setTransactionId: (num) => {},
  refreshTransactionAttachments: () => {},
  commentId: undefined,
  setCommentId: (num) => {},
  subItem: undefined,
  transactionsAttachments: [],
  showAttachments: false,
  setShowAttachments: (val: boolean) => {},
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
  const [showAttachments, setShowAttachments] = useState(false);
  const [transactionsAttachments, setTransactionsAttachments] = useState<
    TansactionAttachmentType[]
  >([]);

  const handleSetCommentId = (num: number) => {
    if (num == -1) setCommentId(undefined);
    setCommentId(num);
  };

  const handleSetShowAttachments = (val: boolean) => {
    setShowAttachments(val);
  };

  const handleSetTransactionId = (num: number) => {
    if (num == -1) setTransactionId(undefined);
    setTransactionId(num);
  };

  useEffect(() => {
    if (transactionId && transactionId != -1) {
      let url = `employee/contract/items/processing/${transactionId}`;
      fetchProccessingAttachments(url);
    }
  }, [transactionId]);

  const fetchProccessingAttachments = async (url: string) => {
    setTransactionsAttachments([]);
    let response = await axios
      .get<{ processing: TransactionType }>(Api(url))
      .then((res) => {
        return res.data;
      });
    setTransactionsAttachments(response.processing.attachment);
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
        transactionsAttachments,
        showAttachments,
        setShowAttachments: handleSetShowAttachments,
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
  transactionsAttachments: TansactionAttachmentType[];
  showAttachments: boolean;
  setShowAttachments: (val: boolean) => void;
};
