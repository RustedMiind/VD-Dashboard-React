import Dialog from "@mui/material/Dialog";
import { useContext, useState } from "react";
import { SetProccessingContext } from "../../context/SetProccessingContext";
import ReplyProccessingStep1 from "./step-1";
import ReplyProccessingStep2 from "./step-2";
import ReplyProccessingStep3 from "./step-3";

export default function ReplyProccessing({
  open,
  setOpen,
}: ReplyProccessingProps) {
  //TODO::define our component state variables
  const SetProccessingContextData = useContext(SetProccessingContext);
  const [operationProgress, setOperationProgress] = useState<
    "Step1" | "Step2" | "Step3"
  >("Step1");

  //TODO::define helper functions
  const handleClose = () => {
    setOpen(false);
    //refresh here
    setOperationProgress("Step1");
  };
  const ViewActiveTab = () => {
    switch (operationProgress) {
      case "Step1":
        return (
          <ReplyProccessingStep1
            handleClose={handleClose}
            setOperationProgress={setOperationProgress}
          />
        );
      case "Step2":
        return (
          <ReplyProccessingStep2 setOperationProgress={setOperationProgress} />
        );
      case "Step3":
        return <ReplyProccessingStep3 />;
    }
  };

  //*return ui.
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
    </>
  );
}

type ReplyProccessingProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
