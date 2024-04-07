import Dialog from "@mui/material/Dialog";
import EditTransactionD3 from "./step2-createComment";
import ReplyTransactionTab1 from "./step1-chooseTransaction";
import { useState } from "react";
import ReplyTransactionTab2 from "./step2-createComment";
import ReplyTransactionTab3 from "./step3-transactionAttachments";

export default function EditTransitionD2({
  open,
  setOpen,
}: EditTransitionD2Props) {
  //TODO::define our component state variables
  const [operationProgress, setOperationProgress] = useState<
    "Step1" | "Step2" | "Step3"
  >("Step1");

  //TODO::define helper functions
  const handleClose = () => {
    setOpen(false);
  };
  const ViewActiveTab = () => {
    switch (operationProgress) {
      case "Step1":
        return (
          <ReplyTransactionTab1
            handleClose={handleClose}
            setOperationProgress={setOperationProgress}
          />
        );
      case "Step2":
        return (
          <ReplyTransactionTab2 setOperationProgress={setOperationProgress} />
        );
      case "Step3":
        return <ReplyTransactionTab3 />;
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          sx: {
            width: "100vw",
            minHeight: 300,
          },
        }}
      >
        <ViewActiveTab />
      </Dialog>
      {/* <EditTransactionD3
        open={openNextEditD}
        setOpen={setOpenNextEditD}
        transactionId={transactionId}
      /> */}
    </>
  );
}

type EditTransitionD2Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
