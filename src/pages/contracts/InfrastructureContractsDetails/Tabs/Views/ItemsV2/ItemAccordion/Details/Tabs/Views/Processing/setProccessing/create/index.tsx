import { Dialog } from "@mui/material";
import { useContext, useState } from "react";
import CreateNewProccessingStep1 from "./step-1";
import CreateNewProccessingStep2 from "./step-2";
import { ContractItemContext } from "../../../../../../ItemContext";
export default function CreateNewProccessDialog(
  props: CreateNewProccessDialogProps
) {
  // TODO::Declaration of component state and variables
  const ContractItemContextData = useContext(ContractItemContext);
  const [operationProgress, setOperationProgress] = useState<"Step1" | "Step2">(
    "Step1"
  );

  // TODO::define helper methods
  const ViewActiveTab = () => {
    switch (operationProgress) {
      case "Step1":
        return (
          <CreateNewProccessingStep1
            setOperationProgress={setOperationProgress}
          />
        );
      case "Step2":
        return <CreateNewProccessingStep2 />;
    }
  };

  const handleClose = async () => {
    setOperationProgress("Step1");
    // refresh here
    ContractItemContextData?.fetchItemDetails?.({
      soft: true,
      optimized: false,
    });
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

type CreateNewProccessDialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
