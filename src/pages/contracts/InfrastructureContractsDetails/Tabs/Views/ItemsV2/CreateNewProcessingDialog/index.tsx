import { Dialog, DialogContent, DialogProps, DialogTitle } from "@mui/material";
import CreateForm from "./CreateForm";
import { createContext, useContext, useMemo, useState } from "react";
import SaveAttachementsForm from "./SaveAttachementsForm";
import { TransactionType } from "../../../../../../../types/Contracts/ContractTransactionAttachment";
import { getContractProcessing } from "../../../../../../../methods/api/contracts/getProcessing";
import { useSnackbar } from "notistack";
import { OpenCreateProcessingContext } from "./CreateProcessingContextProvider";

function CreateNewProcessingDialog() {
  const { step, toNextStep, processing, createDialogOpened, closeDialog } =
    useContext(OpenCreateProcessingContext);

  const renderedForm = useMemo(() => {
    let rendered: React.ReactNode;
    switch (step) {
      case 1:
        rendered = <CreateForm onClose={closeDialog} onSuccess={toNextStep} />;
        break;
      case 2:
        rendered = processing ? <SaveAttachementsForm /> : <></>;
        break;
      default:
        break;
    }
    return rendered;
  }, [step, processing?.id]);

  return (
    <Dialog
      open={createDialogOpened}
      onClose={closeDialog}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>اضافة معاملة جديدة</DialogTitle>
      {renderedForm}
    </Dialog>
  );
}

export default CreateNewProcessingDialog;
