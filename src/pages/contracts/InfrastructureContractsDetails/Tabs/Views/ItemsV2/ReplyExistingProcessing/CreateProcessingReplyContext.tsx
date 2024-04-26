import { createContext, useState } from "react";
import {
  TransactionComment,
  TransactionType,
} from "../../../../../../../types/Contracts/ContractTransactionAttachment";
import { useSnackbar } from "notistack";
import { getContractProcessing } from "../../../../../../../methods/api/contracts/getProcessing";
import ReplyExistingProcessingDialog from ".";
import { getContractProcessingReply } from "../../../../../../../methods/api/contracts/getProcessingReply";

let onSubmitSucess: (() => void) | undefined;
const setOnSubmitSucess = (cb: () => void) => {
  onSubmitSucess = cb;
};

export type CreateProcessingReplyContextType = {
  step: number;
  comment?: TransactionComment;
  refreshComment: (commentId?: number) => void;
  openCreateDialog: (processingId: number) => void;
  closeDialog: () => void;
  toNextStep: () => void;
  dialogOpened: boolean;
  OnSubmitSucess: (cb: () => void) => void;
  processingId?: number;
  openUpdateDialog: ({
    step,
    processingId,
  }: {
    step: number;
    processingId: number;
  }) => void;
};
export const CreateProcessingReplyContext =
  createContext<CreateProcessingReplyContextType>({
    openCreateDialog() {},
    openUpdateDialog() {},
    dialogOpened: false,
    refreshComment() {},
    step: 1,
    toNextStep() {},
    closeDialog() {},
    OnSubmitSucess: setOnSubmitSucess,
  });

function CreateProcessingReplyContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [step, setStep] = useState(1);
  const [comment, setComment] = useState<TransactionComment | undefined>(
    undefined
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [processingId, setProcessingId] = useState<undefined | number>(
    undefined
  );
  const { enqueueSnackbar } = useSnackbar();
  const getProcessingReply = async (
    commentId: number | undefined = comment?.id
  ) => {
    try {
      console.log("commentId", commentId, comment);
      if (!commentId) throw new Error("No Comment Id Provided");
      const fetchedProcessingReply = await getContractProcessingReply(
        commentId
      );
      setComment(fetchedProcessingReply?.data.comment_processing);
      return fetchedProcessingReply?.data.comment_processing;
    } catch (error) {
      enqueueSnackbar("تعذر في تحميل بيانات الرد، الرجاء المحاولة مرة اخري", {
        variant: "error",
      });
    }
  };

  const toNextStep = async (commentId?: number) => {
    if (commentId) await getProcessingReply(commentId);
    setStep((prevStep) => prevStep + 1);
  };

  console.log("context processing reply", comment);

  return (
    <CreateProcessingReplyContext.Provider
      value={{
        refreshComment: getProcessingReply,
        openCreateDialog(processingId) {
          setStep(1);
          setProcessingId(processingId);
          setDialogOpen(true);
          setComment(undefined);
        },
        dialogOpened: dialogOpen,
        openUpdateDialog({ processingId, step = 1 }) {
          setProcessingId(undefined);
          setStep(step);
          getProcessingReply(processingId).then(() => {
            setDialogOpen(true);
          });
        },
        OnSubmitSucess: setOnSubmitSucess,
        toNextStep,
        step,
        comment,
        closeDialog() {
          setDialogOpen(false);
          setComment(undefined);
          onSubmitSucess?.();
        },
        processingId,
      }}
    >
      <ReplyExistingProcessingDialog />
      {children}
    </CreateProcessingReplyContext.Provider>
  );
}

export default CreateProcessingReplyContextProvider;
