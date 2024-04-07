import { Dialog } from "@mui/material";
import CreateTransactionTab1 from "./step1/CreateTransactionTab1";
import CreateTransactionTab2 from "./step2/createTransactionTab2";
import { useContext, useState } from "react";
import { ContractDetailsContext } from "../../../../..";
import { CreateTransactionContext } from "../../context/CreateTransactionContext";
import { refreshComponentCxt } from "../../tabs/Transactions";

export default function CreateTransactionDialog(
  props: CreateTransactionDialogProps
) {
  // TODO::Declaration of component state and variables
  const transactionCxtData = useContext(CreateTransactionContext);
  const refreshComponentCxtData = useContext(refreshComponentCxt);
  const [operationProgress, setOperationProgress] = useState<"Step1" | "Step2">(
    "Step1"
  );

  // TODO::define helper methods
  const ViewActiveTab = () => {
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
    let id = -1;
    await props.setActiveSubItemId((prev) => {
      id = prev;
      return prev;
    });
    console.log("HandleClosee",id,refreshComponentCxtData.refresh)
    refreshComponentCxtData.refresh(id);
    props.setOpen(false);
  };

  // *return component ui
  return (
    <>
      <Dialog
        open={props.open}
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
