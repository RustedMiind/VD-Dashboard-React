import { Dialog } from "@mui/material";
import CreateTransactionTab1 from "./step1/CreateTransactionTab1";
import CreateTransactionTab2 from "./step2/createTransactionTab2";
import { useContext, useState } from "react";
import { ContractDetailsContext } from "../../../../..";
import { CreateTransactionContext } from "../../context/CreateTransactionContext";

export default function CreateTransactionDialog(
  props: CreateTransactionDialogProps
) {
  // TODO::Declaration of component state and variables
  const transactionCxtData = useContext(CreateTransactionContext);
  const [operationProgress, setOperationProgress] = useState<"Step1" | "Step2">(
    "Step1"
  );

  // TODO::define helper methods
  const ViewActiveTab = () => {
    switch (operationProgress) {
      case "Step1":
        return (
          <CreateTransactionTab1 setOperationProgress={setOperationProgress} />
        );
      case "Step2":
        return <CreateTransactionTab2 />;
    }
  };

  // *return component ui
  return (
    <>
      <Dialog
        open={props.open}
        onClose={() => {
          props.setActiveSubItemId(-1);
          setOperationProgress("Step1");
          // refresh();
          console.log(
            "transactionCxtData.contractSubItem?.id",
            transactionCxtData.contractSubItem?.id
          );
          props.setActiveSubItemId((prev) => prev);
          props.setOpen(false);
        }}
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
