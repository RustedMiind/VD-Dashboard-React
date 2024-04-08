import { Dialog } from "@mui/material";
import CreateTransactionTab1 from "./step1/CreateTransactionTab1";
import CreateTransactionTab2 from "./step2/createTransactionTab2";
import { useContext, useState } from "react";
import { ContractDetailsContext } from "../../../../..";
import { CreateTransactionContext } from "../../context/CreateTransactionContext";
import { TransactionContext } from "../../context/TransactionContext";

export default function CreateTransactionDialog(
  props: CreateTransactionDialogProps
) {
  // TODO::Declaration of component state and variables
  const transactionCxtData = useContext(CreateTransactionContext);
  const TransactionContextData = useContext(TransactionContext);
  let { refresh } = TransactionContextData;
  const [operationProgress, setOperationProgress] = useState<"Step1" | "Step2">(
    "Step1"
  );

  // TODO::define helper methods
  const ViewActiveTab = () => {
    if (TransactionContextData.open) return <CreateTransactionTab2 />;
    else
      switch (operationProgress) {
        case "Step1":
          return (
            <CreateTransactionTab1
              setOperationProgress={setOperationProgress}
              setActiveSubItemId={props.setActiveSubItemId}
            />
          );
        case "Step2":
          return <CreateTransactionTab2 />;
      }
  };
  const handleClose = async () => {
    setOperationProgress("Step1");
    // refresh here
    let id = -1;
    await props.setActiveSubItemId((prev) => {
      id = prev;
      return prev;
    });
    if (!TransactionContextData.open) refresh(id);
    TransactionContextData.handleClose();
    props.setOpen(false);
  };

  // *return component ui
  return (
    <>
      <Dialog
        open={props.open || TransactionContextData.open}
        onClose={() => handleClose()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth={"md"}
        fullWidth={true}
        component={"form"}
      >
        <ViewActiveTab />
      </Dialog>
    </>
  );
}

type CreateTransactionDialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveSubItemId: React.Dispatch<React.SetStateAction<number>>;
};
