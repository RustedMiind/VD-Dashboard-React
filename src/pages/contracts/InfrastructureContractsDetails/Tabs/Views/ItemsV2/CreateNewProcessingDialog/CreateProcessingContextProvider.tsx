import { createContext, useState } from "react";
import { TransactionType } from "../../../../../../../types/Contracts/ContractTransactionAttachment";
import { useSnackbar } from "notistack";
import { getContractProcessing } from "../../../../../../../methods/api/contracts/getProcessing";
import CreateNewProcessingDialog from ".";

let onSubmitSucess: (() => void) | undefined;
const setOnSubmitSucess = (cb: () => void) => {
  onSubmitSucess = cb;
};

export type OpenCreateProcessingContextType = {
  step: number;
  processing?: TransactionType;
  refreshProcessing: (processingId?: number) => void;
  openCreateDialog: (subItemId: number) => void;
  closeDialog: () => void;
  toNextStep: () => void;
  createDialogOpened: boolean;
  contractSubItemId?: number;
  OnSubmitSucess: (cb: () => void) => void;
  openUpdateDialog: ({
    step,
    processingId,
  }: {
    step: number;
    processingId: number;
  }) => void;
};
export const OpenCreateProcessingContext =
  createContext<OpenCreateProcessingContextType>({
    openCreateDialog() {},
    openUpdateDialog() {},
    refreshProcessing() {},
    step: 1,
    toNextStep() {},
    closeDialog() {},
    createDialogOpened: false,
    OnSubmitSucess: setOnSubmitSucess,
  });

function OpenCreateProcessingContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [step, setStep] = useState(1);
  const [processing, setProcessing] = useState<TransactionType | undefined>(
    undefined
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [contractSubItemId, setContractSubItemId] = useState<
    undefined | number
  >(undefined);
  const { enqueueSnackbar } = useSnackbar();
  const getProcessing = async (
    processingId: number | undefined = processing?.id
  ) => {
    try {
      console.log("processingId", processingId, processing);
      if (!processingId) throw new Error("No Process Id Provided");
      const fetchedProcessing = await getContractProcessing(processingId);
      setProcessing(fetchedProcessing?.data.processing);
      return fetchedProcessing?.data.processing;
    } catch (error) {
      enqueueSnackbar(
        "تعذر في تحميل بيانات المعاملة، الرجاء المحاولة مرة اخري",
        { variant: "error" }
      );
    }
  };

  const toNextStep = async (processingId?: number) => {
    await getProcessing(processingId);
    setStep((prevStep) => prevStep + 1);
  };

  console.log("context processing", processing);

  return (
    <OpenCreateProcessingContext.Provider
      value={{
        refreshProcessing: getProcessing,
        openCreateDialog(subItemId) {
          setStep(1);
          setContractSubItemId(subItemId);
          setDialogOpen(true);
          setProcessing(undefined);
        },
        createDialogOpened: dialogOpen,
        openUpdateDialog({ processingId, step = 1 }) {
          setContractSubItemId(undefined);
          setStep(step);
          getProcessing(processingId).then(() => {
            setDialogOpen(true);
          });
        },
        OnSubmitSucess: setOnSubmitSucess,
        toNextStep,
        step: step,
        processing: processing,
        closeDialog() {
          setDialogOpen(false);
          setProcessing(undefined);
          onSubmitSucess?.();
        },
        contractSubItemId,
      }}
    >
      <CreateNewProcessingDialog />
      {children}
    </OpenCreateProcessingContext.Provider>
  );
}

export default OpenCreateProcessingContextProvider;
