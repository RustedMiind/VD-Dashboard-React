import { Dialog } from "@mui/material";
import CreateTransactionTab1 from "./CreateTransactionTab1";
import CreateTransactionTab2 from "./createTransactionTab2";
import { useState } from "react";

export default function CreateTransactionDialog(props: CreateTransactionDialogProps) {
  // TODO::Declaration of component state and variables
  const [operationProgress, setOperationProgress] = useState<"Step1" | "Step2">(
    "Step1"
  );

  // TODO::define helper methods
  const ViewActiveTab = () => {
    switch (operationProgress) {
      case "Step1":
        return (
          <CreateTransactionTab1
            activePandId={props.activePandId}
            setOperationProgress={setOperationProgress}
          />
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
        onClose={() => props.setOpen(false)}
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
  activePandId: number;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
